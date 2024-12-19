[API documentation.postman_collection.json](https://github.com/user-attachments/files/18200760/API.documentation.postman_collection.json)
# Explora

Explora is a travel booking site which allows the user to find and book hotel, transportation and activities and buy products.
## Motivation

Our motivation was to create an all in one website for all the user's needs, starting from booking the hotels and transportation all the way to buying products, we also wanted to make it as easy as it can be and to give the user the opportunity to give feedback on every experience they had starting from the activities to the products.

## Build Status

- The payment is accepted when you book with stripe as soon as you get redirected to the page before you add any payment details.
## Code Style

Key Style Rules:

- Indentation: Use 4 spaces for indentation.
- Semicolons: Always include semicolons at the end of statements.

Quotes:

- Use double quotes (") for imports.
- Use single quotes (') for other strings.

Naming Conventions:

- Use camelCase for variables and functions (e.g., deleteAdminAccount).
- Use PascalCase for classes (e.g., User, Admin).

Spacing:

- Include spaces around operators and after keywords (e.g., if, try, catch).
- Separate functions with a blank line for clarity.

Error Handling:

- Wrap all asynchronous code in try...catch blocks to manage errors effectively.

## Tech/Framework used

This project is built using modern JavaScript technologies and frameworks to ensure scalability, maintainability, and performance. Below is an overview of the key technologies and frameworks used:

Backend:
- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A lightweight framework for building RESTful APIs and handling HTTP requests and responses.
Database:
- MongoDB: A NoSQL database used to store user and administrative data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB, providing schema-based data modeling and query-building functionality.
Authentication & Security:
- bcrypt: For hashing and verifying user passwords securely.
- jsonwebtoken: For generating and validating JSON Web Tokens (JWT) for authentication.
Other Dependencies:
- dotenv: For managing environment variables securely (if used).
- ESLint: For maintaining consistent code style (optional, recommended).

To understand this project, familiarity with the following concepts/technologies is recommended:

JavaScript (ES6+ syntax)
RESTful API design
MongoDB database structure
Node.js modules and package management (npm)
Authentication techniques (e.g., JWT, password hashing)


## Code Examples

## Example 1
```json
router.post('/bookWallet', async (req, res) => {
  const { touristId, searchId, flightId, promoCode } = req.body;

  try {
    // Find the tourist user
    const tourist = await User.findById(touristId);
    if (!tourist || tourist.role !== 'Tourist') {
      return res.status(400).json({ message: 'Invalid tourist user' });
    }

    const touristEmail = tourist.email; // Get the tourist's email dynamically

    // Check if the flight is in the cache using the searchId and flightId
    const cachedFlights = flightCache[searchId];  // Get flights based on searchId

    if (!cachedFlights) {
      return res.status(404).json({ message: 'No flights found for this searchId' });
    }

    const selectedFlight = cachedFlights.find(flight => flight.id === flightId);

    if (!selectedFlight) {
      return res.status(404).json({ message: 'Flight not found in this search results' });
    }

    // Check if the user has already booked the selected flight
    const existingBooking = await FlightTicket.findOne({
      tourist: touristId,
      flightNumber: ${selectedFlight.itineraries[0].segments[0].departure.iataCode}${selectedFlight.itineraries[0].segments[0].arrival.iataCode}${flightId}
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this flight' });
    }

    // Check if the user has enough wallet balance
    if (!tourist.wallet || tourist.wallet < selectedFlight.price.total) {
      return res.status(400).json({ message: 'You do not have enough credits in your wallet to book this flight' });
    }

    // Initialize price to full price
    let discountedPrice = selectedFlight.price.total;

    // Check if promo code exists and is valid
    if (promoCode) {
      const promoCodeRecord = await TouristPromoCode.findOne({ tourist: touristId, code: promoCode });

      if (!promoCodeRecord) {
        return res.status(400).json({ message: 'Invalid or expired promo code' });
      }

      // Apply the promo code discount
      const discountAmount = promoCodeRecord.discount * discountedPrice;
      discountedPrice = selectedFlight.price.total - discountAmount;

      // Ensure discounted price is valid
      if (discountedPrice < 0) {
        return res.status(400).json({ message: 'Discounted price is invalid' });
      }

      // Deduct the discounted price from the tourist's wallet
      tourist.wallet -= discountedPrice;
      await tourist.save(); // Save the updated tourist

      // Delete the promo code since it's used
      await TouristPromoCode.deleteOne({ tourist: touristId, code: promoCode });
    } else {
      // If no promo code, deduct full price
      tourist.wallet -= selectedFlight.price.total;
      await tourist.save(); // Save the updated tourist
    }

    // Extract flight details
    const flightSegment = selectedFlight.itineraries[0].segments[0];
    const origin = flightSegment.departure.iataCode;
    const destination = flightSegment.arrival.iataCode;
    const date = flightSegment.departure.at;
    const flightNumber = ${origin}${destination}${flightId};  // Generate flight number from origin, destination, and flightId
    const time = flightSegment.departure.at;  // Assuming this is the departure time
    const duration = selectedFlight.itineraries[0].duration;  // Duration from itineraries
    const arrivalTime = flightSegment.arrival.at;  // Arrival time

    // Create a new flight booking using the discounted price
    const flightTicket = new FlightTicket({
      tourist: touristId,
      origin,
      destination,
      date,
      flightNumber,
      time,
      duration,
      arrivalTime,
      price: discountedPrice  // Use discounted price here
    });

    // Save the booking
    const savedFlightTicket = await flightTicket.save();

    // Send a payment receipt email to the tourist's email
    const mailOptions = {
      from: 'explora.donotreply@gmail.com', // Sender address
      to: touristEmail,            // Dynamic email based on the tourist's record
      subject: 'Flight Booking Receipt',
      text: Dear ${tourist.username},\n\nYour flight has been successfully booked!\n\nDetails:\n- Flight Number: ${flightNumber}\n- Origin: ${origin}\n- Destination: ${destination}\n- Date: ${date}\n- Time: ${time}\n- Duration: ${duration}\n- Price: ${discountedPrice} USD\n\nThank you for booking with us!\n\nBest regards,\nExplora
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Respond with the booking confirmation, including discounted price
    res.status(201).json({
      message: 'Flight booked successfully',
      bookingDetails: savedFlightTicket,
      discountedPrice: discountedPrice
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error booking flight', error: err.message });
  }
});
```
This code snippet is part of a flight booking system, where a tourist user can book a flight from available search results using a wallet balance and potentially apply a promo code for a discount. Here’s a breakdown of the main functionality:

- Input Validation:
It starts by validating the input, checking if the tourist exists and has the right role (Tourist).
It checks if the flightId exists in the cached flight results (based on searchId).
- Booking Logic:
If the selected flight is not already booked by the tourist, it proceeds. 
Then, it checks if the tourist has enough credits in their wallet to pay for the flight. 
If a promo code is provided, it validates the promo code, applies the discount, and ensures that the discounted price is valid.
If no promo code is applied, the tourist is charged the full price.
- Booking Creation:
A new FlightTicket document is created with flight details and the final price (discounted or full price).
The tourist’s wallet is updated, deducting the flight cost.
- Email Notification:
A booking receipt is sent to the tourist’s email with flight details and payment confirmation.
- Error Handling:
The code includes error handling for invalid users, flights, or promo codes and catches any errors during the process to return a proper message.
Simplified Explanation:
This API route allows a tourist to book a flight by:

Verifying if they exist and can afford the flight.
Checking for a valid promo code to apply a discount.
Confirming that the flight isn’t already booked.
Deducting the final cost from the tourist’s wallet and saving the booking.
Sending a booking confirmation email.
What to highlight in the "Code Snippets" section:
Tourist validation: Ensuring the user is a tourist and exists in the database.
Promo code application: Handling discount logic if a valid promo code is used.
Booking creation: Creating a booking entry and updating the tourist's wallet.
Email notification: Sending a confirmation email after successful booking.
This snippet illustrates how to process a flight booking, validate user inputs, apply discounts, and ensure the tourist has enough funds before confirming the booking.

## Example 2
```json
//http://localhost:4000/api/tour_guide_itinerary/upcoming
router.get('/upcoming', async (req, res) => {
  try {
    // Get today's date and remove the time component for accurate comparisons
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Query the database for itineraries with availableDates equal to or later than today
    const upcomingItineraries = await Itinerary.find({
      availableDates: { $gte: today }
    });

    // If no itineraries are found
    if (upcomingItineraries.length === 0) {
      return res.status(404).json({ message: 'No upcoming itineraries found.' });
    }

    // Return the list of upcoming itineraries
    res.status(200).json(upcomingItineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

Here’s how you can write a Code Snippet for this route that retrieves upcoming itineraries:

Code Snippet: Get Upcoming Itineraries
javascript
Copy code
// Route to get all upcoming itineraries that are available to be booked
router.get('/upcoming', async (req, res) => {
  try {
    // Get today's date and set the time to midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Remove time part for accurate date comparison

    // Query the database for itineraries with availableDates greater than or equal to today
    const upcomingItineraries = await Itinerary.find({
      availableDates: { $gte: today }  // Only itineraries with future available dates
    });

    // If no itineraries are found, return a 404 error
    if (upcomingItineraries.length === 0) {
      return res.status(404).json({ message: 'No upcoming itineraries found.' });
    }

    // Return the list of upcoming itineraries
    res.status(200).json(upcomingItineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
```
#### What This Code Does:
- Sets the current date: It ensures the comparison is done without the time part (just the date).
- Fetches itineraries: Queries the database for itineraries where availableDates are greater than or equal to today.
- Handles no results: Returns a 404 error if no itineraries are found for booking.
- Sends the results: If itineraries are found, it sends them back in the response.
- Brief Explanation: This API endpoint is used to fetch all itineraries that are available to be booked starting from today. It does so by comparing the availableDates of each itinerary with the current date. If no itineraries are found, it returns a 404 response; otherwise, it returns the list of available itineraries.

- Usage: This code can be used in the part of your application where users can see upcoming tours or trips available for booking, making sure only future itineraries are listed.

## Screenshots
![PHOTO-2024-12-09-07-09-32 4](https://github.com/user-attachments/assets/5cbb5668-91be-46ae-91c6-4b7fea64c30c)
![PHOTO-2024-12-09-07-09-33 2](https://github.com/user-attachments/assets/778561d9-3e46-41c7-8996-0f8ebf3c6bf2)
![PHOTO-2024-12-09-07-09-34 2](https://github.com/user-attachments/assets/dab06e42-8b2e-4dbd-bfba-3c179c30eb5d)
![PHOTO-2024-12-09-07-09-29](https://github.com/user-attachments/assets/096c23e3-9647-459a-a741-d721d79c4e21)
![PHOTO-2024-12-09-07-09-36 3](https://github.com/user-attachments/assets/f35a9ec3-c940-442b-9a21-af1a8a0102aa)
![PHOTO-2024-12-09-07-09-34 3](https://github.com/user-attachments/assets/f50cfcc4-99ed-4e0f-a8fd-ab224607ea1a)
![PHOTO-2024-12-09-07-09-30 4](https://github.com/user-attachments/assets/bc6a8143-b87d-4f00-911f-2b67fa219e97)
![PHOTO-2024-12-09-07-09-36 2](https://github.com/user-attachments/assets/1a677a49-671b-4868-8488-73451601ceba)
![PHOTO-2024-12-09-07-09-36](https://github.com/user-attachments/assets/47c4e21f-953a-423f-a0fe-e249b10eac82)
![PHOTO-2024-12-09-07-09-31 2](https://github.com/user-attachments/assets/ff8ba476-5be0-4056-bc60-6d69c0d51e35)
![PHOTO-2024-12-09-07-09-31](https://github.com/user-attachments/assets/c5970f6c-0d10-484a-be3e-cd70c5eed27e)
![PHOTO-2024-12-09-07-09-35 4](https://github.com/user-attachments/assets/12c8bfae-b8bb-4289-a0ee-fc559efd077f)
![PHOTO-2024-12-09-07-09-35](https://github.com/user-attachments/assets/1d60d97a-2dd9-4e50-80a8-98a93f84d020)
![PHOTO-2024-12-09-07-09-35 2](https://github.com/user-attachments/assets/eca80820-3262-4272-8d36-2b060f6c6598)
![PHOTO-2024-12-09-07-09-32 3](https://github.com/user-attachments/assets/7af36c1d-e1fa-4dbc-9250-0d22cfdc8317)
![PHOTO-2024-12-09-07-09-33 3](https://github.com/user-attachments/assets/25351554-cc67-49fa-91b4-6be9c1f6f988)
![PHOTO-2024-12-09-07-09-35 5](https://github.com/user-attachments/assets/01be99ad-d806-4a6e-a4b5-c276e9330383)
![PHOTO-2024-12-09-07-09-31 3](https://github.com/user-attachments/assets/b3dc577f-4d17-49ae-99bd-960646553ecb)
![PHOTO-2024-12-09-07-09-34 4](https://github.com/user-attachments/assets/f6bf4d7c-7b4c-4497-a805-1f6d0c69bc01)
![PHOTO-2024-12-09-07-09-33](https://github.com/user-attachments/assets/527240a9-f4ec-4a96-8d52-4d2272950c55)
![PHOTO-2024-12-09-07-09-32](https://github.com/user-attachments/assets/25ef065c-8b51-4b82-8a15-b5287d005dfe)
![PHOTO-2024-12-09-07-09-35 3](https://github.com/user-attachments/assets/da0823d8-77db-449a-b6bd-8925345d71ee)
![PHOTO-2024-12-09-07-09-34](https://github.com/user-attachments/assets/f961dd85-f4cd-4ee1-b1fe-44e9f8b9d9f5)
![PHOTO-2024-12-09-07-09-32 2](https://github.com/user-attachments/assets/be5e05f8-791a-44e8-b1c9-27e2fa126b72)
![PHOTO-2024-12-09-07-09-30 3](https://github.com/user-attachments/assets/6d7aa434-b010-4f7b-9810-d29e84bca9e3)
![PHOTO-2024-12-09-07-09-30 2](https://github.com/user-attachments/assets/34a722aa-3d82-4541-9e0f-c8c22cdc0718)
![PHOTO-2024-12-09-07-09-30](https://github.com/user-attachments/assets/7549540f-c77e-4d85-970e-320d28f81b60)


## Installation

- [VS Code](https://code.visualstudio.com/download) - Download the version for your OS
- [Node](https://nodejs.org) - Download the version for your OS
- [Nodemon](https://www.npmjs.com/) - Search for the package
- [Express](https://www.npmjs.com/) - Search for the package
- [Mongoose](https://www.npmjs.com/) - Search for the package
- [React](https://www.npmjs.com/) - Search for the package
- [Git](https://www.npmjs.com/) - Search for the package
- [Axios](https://www.npmjs.com/) - Search for the package

After installing, run the following terminal command:

```bash
npm install
```

```bash
cd backend
node Server.js
```

```
cd reactjs-creatingbuttons
npm run dev
```
Click the link that pops up after you run those two, it should look something like this: http://localhost:5173/
rns the sum.

## [API reference](https://github.com/Advanced-computer-lab-2024/Explora/blob/main/API%20References.md)

Click the above link to see all our API references.
## Tests

This project includes various tests to ensure functionality, reliability, and security. Below is an overview of the tests you can perform, along with code examples:

Types of Tests
- Unit Tests: Verify individual functions and components (e.g., password hashing, user creation).

- Integration Tests: Test interactions between different modules (e.g., API endpoints and database).

- End-to-End (E2E) Tests: Simulate real-world user interactions with the API.

Testing Frameworks
- Postman: A JavaScript testing framework used for unit and integration tests.
- React: For testing HTTP endpoints.

## json Test routes
[Uploading API do{
	"info": {
		"_postman_id": "b872e6d7-ff6d-49cf-b230-036065367589",
		"name": "API documentation",
		"description": "# 📄 Get started here\n\nThis template contains a boilerplate for documentation that you can quickly customize and reuse.\n\n## 🔖 How to use this template\n\n- Replace the content given brackets (()) with your API's details.\n- Tips are formatted in `codespan` - feel free to read and remove them.\n    \n\n---\n\n`Start with a brief overview of what your API offers.`\n\nThe ((product name)) provides many API products, tools, and resources that enable you to ((add product value here)).\n\n`You can also list the APIs you offer, link to the relevant pages, or do both in this section.`\n\n## **Getting started guide**\n\n`List the steps or points required to start using your APIs. Make sure to cover everything required to reach success with your API as quickly as possible.`\n\nTo start using the ((add APIs here)), you need to -\n\n`The points given below are from The Postman API's documentation. You can reference it to write your own getting started guide.`\n\n- You must use a valid API Key to send requests to the API endpoints. You can get your API key from Postman's [integrations dashboard](https://go.postman.co/settings/me/api-keys).\n- The API has [rate and usage limits](https://learning.postman.com/docs/developer/postman-api/postman-api-rate-limits/).\n- The API only responds to HTTPS-secured communications. Any requests sent via HTTP return an HTTP 301 redirect to the corresponding HTTPS resources.\n- The API returns request responses in JSON format. When an API request returns an error, it is sent in the JSON response as an error key.\n    \n\n## Authentication\n\n`Add details on the authorization keys/tokens required, steps that cover how to get them, and the relevant error codes.`\n\nThe ((product name)) API uses ((add your API's authorization type)) for authentication.\n\n`The details given below are from the Postman API's documentation. You can reference it to write your own authentication section.`\n\nPostman uses API keys for authentication. You can generate a Postman API key in the [API keys](https://postman.postman.co/settings/me/api-keys) section of your Postman account settings.\n\nYou must include an API key in each request to the Postman API with the X-Api-Key request header.\n\n### Authentication error response\n\nIf an API key is missing, malformed, or invalid, you will receive an HTTP 401 Unauthorized response code.\n\n## Rate and usage limits\n\n`Use this section to cover your APIs' terms of use. Include API limits, constraints, and relevant error codes, so consumers understand the permitted API usage and practices.`\n\n`The example given below is from The Postman API's documentation. Use it as a reference to write your APIs' terms of use.`\n\nAPI access rate limits apply at a per-API key basis in unit time. The limit is 300 requests per minute. Also, depending on your plan, you may have usage limits. If you exceed either limit, your request will return an HTTP 429 Too Many Requests status code.\n\nEach API response returns the following set of headers to help you identify your use status:\n\n| Header | Description |\n| --- | --- |\n| `X-RateLimit-Limit` | The maximum number of requests that the consumer is permitted to make per minute. |\n| `X-RateLimit-Remaining` | The number of requests remaining in the current rate limit window. |\n| `X-RateLimit-Reset` | The time at which the current rate limit window resets in UTC epoch seconds. |\n\n### 503 response\n\nAn HTTP `503` response from our servers indicates there is an unexpected spike in API access traffic. The server is usually operational within the next five minutes. If the outage persists or you receive any other form of an HTTP `5XX` error, [contact support](https://support.postman.com/hc/en-us/requests/new/).\n\n### **Need some help?**\n\n`Add links that customers can refer to whenever they need help.`\n\nIn case you have questions, go through our tutorials ((link to your video or help documentation here)). Or visit our FAQ page ((link to the relevant page)).\n\nOr you can check out our community forum, there’s a good chance our community has an answer for you. Visit our developer forum ((link to developer forum)) to review topics, ask questions, and learn from others.\n\n`You can also document or add links to libraries, code examples, and other resources needed to make a request.`",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "40550232"
	},
	"item": [
		{
			"name": "User",
			"item": [
				{
					"name": "Get authenticated user",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									""
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://api.getpostman.com/me",
							"protocol": "https",
							"host": [
								"api",
								"getpostman",
								"com"
							],
							"path": [
								"me"
							]
						},
						"description": "Gets information about the authenticated user."
					},
					"response": [
						{
							"name": "Successful Response",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/me",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"me"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"name": "Content-Type",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"user\": {\n        \"id\": 12345678,\n        \"username\": \"taylor-lee\",\n        \"email\": \"taylor.lee@example.com\",\n        \"fullName\": \"Taylor Lee\",\n        \"avatar\": \"https://example.com/user/r5u9qpvmujfjf6lbqmga.jpg\",\n        \"isPublic\": true\n    },\n    \"operations\": [\n        {\n            \"name\": \"mock_usage\",\n            \"limit\": 1000000,\n            \"usage\": 110276,\n            \"overage\": 0\n        },\n        {\n            \"name\": \"monitor_request_runs\",\n            \"limit\": 10000000,\n            \"usage\": 1141750,\n            \"overage\": 0\n        },\n        {\n            \"name\": \"api_usage\",\n            \"limit\": 1000000,\n            \"usage\": 16240,\n            \"overage\": 0\n        },\n        {\n            \"name\": \"custom_domains\",\n            \"limit\": 25,\n            \"usage\": 25,\n            \"overage\": 0\n        },\n        {\n            \"name\": \"serverless_requests\",\n            \"limit\": 10000,\n            \"usage\": 0,\n            \"overage\": 0\n        },\n        {\n            \"name\": \"integrations\",\n            \"limit\": 5000,\n            \"usage\": 1018,\n            \"overage\": 0\n        },\n        {\n            \"name\": \"cloud_agent_requests\",\n            \"limit\": 1000000,\n            \"usage\": 1615,\n            \"overage\": 0\n        }\n    ]\n}"
						},
						{
							"name": "Rate Limit Exceeded",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/me",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"me"
									]
								}
							},
							"status": "Too Many Requests",
							"code": 429,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": \"rateLimited\",\n    \"message\": \"Rate limit exceeded. Please retry after 1669048687\"\n}"
						}
					]
				},
				{
					"name": "http://localhost:4000/users/",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": []
						},
						"url": {
							"raw": "http://localhost:4000/users/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"users",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "http://localhost:4000/users/forget-password",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n       \"productId\" : \"673067aa7592b7d5eb38e44e\",\r\n       \"touristId\" : \"67322cdfa472e2e7d22de84a\"\r\n\r\n}\r\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/users/forget-password",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"users",
								"forget-password"
							]
						}
					},
					"response": []
				},
				{
					"name": "http://localhost:4000/users/login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n       \"username\" : \"mennatallah\",\r\n       \"password\" : \"pass\"\r\n\r\n}\r\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/users/login",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"users",
								"login"
							]
						}
					},
					"response": []
				},
				{
					"name": "http://localhost:4000/users/login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n       \"username\" : \"admin\",\r\n       \"password\" : \"pass\"\r\n\r\n}\r\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/users/login",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"users",
								"login"
							]
						}
					},
					"response": []
				},
				{
					"name": "http://localhost:4000/users/login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n       \"username\" : \"mary\",\r\n       \"password\" : \"mary\"\r\n\r\n}\r\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/users/login",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"users",
								"login"
							]
						}
					},
					"response": []
				},
				{
					"name": "http://localhost:4000/users/verify-email",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"email\": \"mennahalawa1770@gmail.com\",\r\n    \"code\" : \"1650\"\r\n\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/users/verify-email",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"users",
								"verify-email"
							]
						}
					},
					"response": []
				},
				{
					"name": "http://localhost:4000/users/requests",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n       \"username\" : \"mary\",\r\n       \"password\" : \"mary\"\r\n\r\n}\r\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/users/requests",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"users",
								"requests"
							]
						}
					},
					"response": []
				},
				{
					"name": "http://localhost:4000/users/logout",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n       \"username\" : \"mary\",\r\n       \"password\" : \"mary\"\r\n\r\n}\r\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/users/logout",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"users",
								"logout"
							]
						}
					},
					"response": []
				},
				{
					"name": "http://localhost:4000/users/Certificate/67324c54bd5e0b9fdcdba0e0",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n       \"username\" : \"mary\",\r\n       \"password\" : \"mary\"\r\n\r\n}\r\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/users/Certificate/67324c54bd5e0b9fdcdba0e0",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"users",
								"Certificate",
								"67324c54bd5e0b9fdcdba0e0"
							]
						}
					},
					"response": []
				}
			],
			"description": "The `/me` endpoints let you manage information about the authenticated user."
		},
		{
			"name": "Collections",
			"item": [
				{
					"name": "wishlist",
					"item": [
						{
							"name": "http://localhost:4000/wishlist/67322cdfa472e2e7d22de84a",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"productId\" : \"673067aa7592b7d5eb38e44e\"\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/wishlist/67322cdfa472e2e7d22de84a",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"wishlist",
										"67322cdfa472e2e7d22de84a"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/wishList/toggle",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"productId\" : \"673067aa7592b7d5eb38e44e\",\r\n       \"touristId\" : \"67322cdfa472e2e7d22de84a\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/wishList/toggle",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"wishList",
										"toggle"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/wishlist/67322cdfa472e2e7d22de84a",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"productId\" : \"673067aa7592b7d5eb38e44e\"\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/wishlist/67322cdfa472e2e7d22de84a",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"wishlist",
										"67322cdfa472e2e7d22de84a"
									]
								}
							},
							"response": []
						}
					],
					"description": "manages wishlistc creating, updating and deleting items"
				},
				{
					"name": "cart",
					"item": [
						{
							"name": "http://localhost:4000/cart/remove/67322cdfa472e2e7d22de84a",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"productId\" : \"673067aa7592b7d5eb38e44e\"\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/cart/remove/67322cdfa472e2e7d22de84a",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"cart",
										"remove",
										"67322cdfa472e2e7d22de84a"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/cart/67322cdfa472e2e7d22de84a",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"productId\" : \"673067aa7592b7d5eb38e44e\"\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/cart/67322cdfa472e2e7d22de84a",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"cart",
										"67322cdfa472e2e7d22de84a"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/cart/67322cdfa472e2e7d22de84a",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"productId\" : \"673067aa7592b7d5eb38e44e\"\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/cart/67322cdfa472e2e7d22de84a",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"cart",
										"67322cdfa472e2e7d22de84a"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/cart/remove/67322cdfa472e2e7d22de84a",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"productId\" : \"673067aa7592b7d5eb38e44e\"\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/cart/remove/67322cdfa472e2e7d22de84a",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"cart",
										"remove",
										"67322cdfa472e2e7d22de84a"
									]
								}
							},
							"response": []
						}
					],
					"description": "adds to cart, delete from cart, and update quantity"
				},
				{
					"name": "activity category",
					"item": [
						{
							"name": "http://localhost:4000/ActivityCategories/",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"activity\" : \"hiking\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/ActivityCategories/",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"ActivityCategories",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/ActivityCategories/6702f5f97ac8a7880464035c",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"activityType\" : \"hiking\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/ActivityCategories/6702f5f97ac8a7880464035c",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"ActivityCategories",
										"6702f5f97ac8a7880464035c"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/ActivityCategories/hiking",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"activityType\" : \"hiking\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/ActivityCategories/hiking",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"ActivityCategories",
										"hiking"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/ActivityCategories/hiking",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"activityType\" : \"hiking\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/ActivityCategories/hiking",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"ActivityCategories",
										"hiking"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/ActivityCategories/act",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"activityType\" : \"hiking\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/ActivityCategories/act",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"ActivityCategories",
										"act"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/ActivityCategories/act",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"newActivityType\" : \"hiking\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/ActivityCategories/act",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"ActivityCategories",
										"act"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/ActivityCategories/",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"activityType\" : \"hiking\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/ActivityCategories/",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"ActivityCategories",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/ActivityCategories/",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"activityType\" : \"hiking\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/ActivityCategories/",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"ActivityCategories",
										""
									]
								}
							},
							"response": []
						}
					],
					"description": "add, update and delete"
				},
				{
					"name": "preferance tag",
					"item": [
						{
							"name": "http://localhost:4000/PrefrenceTag/",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"activityType\" : \"hiking\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/PrefrenceTag/",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"PrefrenceTag",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/PrefrenceTag/beach",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"tag\" : \"beach\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/PrefrenceTag/beach",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"PrefrenceTag",
										"beach"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/PrefrenceTag/beache",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"newTag\" : \"beach\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/PrefrenceTag/beache",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"PrefrenceTag",
										"beache"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/PrefrenceTag/",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"tag\" : \"beach\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/PrefrenceTag/",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"PrefrenceTag",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/PrefrenceTag/beache",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"newTag\" : \"beach\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/PrefrenceTag/beache",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"PrefrenceTag",
										"beache"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/PrefrenceTag/",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"tag\" : \"adventure\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/PrefrenceTag/",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"PrefrenceTag",
										""
									]
								}
							},
							"response": []
						}
					]
				},
				{
					"name": "products",
					"item": [
						{
							"name": "http://localhost:4000/products",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"newTag\" : \"beach\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/products",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"products"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/products/archiveProducts",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"newTag\" : \"beach\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/products/archiveProducts",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"products",
										"archiveProducts"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/products/sortByRating?order=high",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"newTag\" : \"beach\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/products/sortByRating?order=high",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"products",
										"sortByRating"
									],
									"query": [
										{
											"key": "order",
											"value": "high"
										}
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/products/quantity&sales",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"newTag\" : \"beach\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/products/quantity&sales",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"products",
										"quantity&sales"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/products/availableProducts",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"newTag\" : \"beach\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/products/availableProducts",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"products",
										"availableProducts"
									]
								}
							},
							"response": []
						},
						{
							"name": "http://localhost:4000/products/archiveProduct/673068f67592b7d5eb38e462",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n       \"newTag\" : \"beach\"\r\n\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:4000/products/archiveProduct/673068f67592b7d5eb38e462",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "4000",
									"path": [
										"products",
										"archiveProduct",
										"673068f67592b7d5eb38e462"
									]
								}
							},
							"response": []
						}
					],
					"description": "create view and update products"
				},
				{
					"name": "Create a collection",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									""
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"{{collectionName}}\",\n            \"schema\": \"{{collectionSchemaUrl}}\"\n        },\n        \"item\": [\n            {\n                \"request\": {}\n            }\n        ]\n    }\n}"
						},
						"url": {
							"raw": "https://api.getpostman.com/collections",
							"protocol": "https",
							"host": [
								"api",
								"getpostman",
								"com"
							],
							"path": [
								"collections"
							],
							"query": [
								{
									"key": "workspace",
									"value": "{{workspaceId}}",
									"description": "Optional. A workspace ID in which to create the collection.\n\nIf you do not include this query parameter, the system creates the collection in your \"My Workspace\" workspace.",
									"disabled": true
								}
							]
						},
						"description": "Creates a collection using the [Postman Collection v2 schema format](https://schema.postman.com/json/collection/v2.1.0/docs/index.html). Include a `collection` object in the request body that contains the following required properties:\n\n*   `info` — An **object** that contains the following properties:\n    *   `name` — A **string** value that contains the collection's name.\n    *   `schema` — A **string** that contains a URL to the collection's schema. For example, the `https://schema.getpostman.com/collection/v1` URL.\n*   `item` — An **object** that contains the HTTP request and response information.\n    *   `request` — An **object** that contains the collection's request information. For a complete list of values, refer to the `definitions.request` entry in the [collection.json schema file](https://schema.postman.com/json/collection/v2.1.0/collection.json). If you pass an empty object for this value, the system defaults to an untitled GET request.\n\n**Note:**\n\n*   For a complete list of available property values for this endpoint, use the following references available in the [collection.json schema file](https://schema.postman.com/json/collection/v2.1.0/collection.json):\n    *   `info` object — Use the `definitions.info` entry.\n    *   `item` object — Use the `definitions.items` entry.\n*   For all other possible values, refer to the [collection.json schema file](https://schema.postman.com/json/collection/v2.1.0/collection.json)."
					},
					"response": [
						{
							"name": "Successful Response",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Content-Type",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"Test Collection\",\n            \"description\": \"This collection makes a request to the Postman Echo service to get a list of request headers sent by an HTTP client.\",\n            \"schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\"\n        },\n        \"item\": [\n            {\n                \"name\": \"Test GET Response\",\n                \"event\": [\n                    {\n                        \"listen\": \"test\",\n                        \"script\": {\n                            \"id\": \"7d2334fc-a84a-4c3d-b26c-7529afa4c0ae\",\n                            \"exec\": [\n                                \"pm.test(\\\"Status code is 200\\\", function () {\",\n                                \"    pm.response.to.have.status(200);\",\n                                \"});\"\n                                ],\n                            \"type\": \"text/javascript\"\n                            }\n                        }\n                    ],\n                \"request\": {\n                    \"url\": \"https://echo.getpostman.com/headers\",\n                    \"method\": \"GET\",\n                    \"header\": [\n                        {\n                            \"key\": \"Content-Type\",\n                            \"value\": \"application/json\"\n                        }\n                    ]\n                }\n            }\n        ]\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://api.getpostman.com/collections",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections"
									],
									"query": [
										{
											"key": "workspace",
											"value": "1f0df51a-8658-4ee8-a2a1-d2567dfa09a9",
											"description": "Optional. A workspace ID in which to create the collection.\n\nIf you do not include this query parameter, the system creates the collection in your \"My Workspace\" workspace.",
											"disabled": true
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"name": "Content-Type",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"collection\": {\n        \"id\": \"12ece9e1-2abf-4edc-8e34-de66e74114d2\",\n        \"name\": \"Test Collection\",\n        \"uid\": \"12345678-12ece9e1-2abf-4edc-8e34-de66e74114d2\"\n    }\n}"
						},
						{
							"name": "Bad Request",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Content-Type",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"Test Collection\",\n            \"description\": \"This collection makes a request to the Postman Echo service to get a list of request headers sent by an HTTP client.\",\n            \"schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\"\n        },\n        \"item\": [\n            {\n                \"name\": \"Test GET Response\",\n                \"event\": [\n                    {\n                        \"listen\": \"test\",\n                        \"script\": {\n                            \"id\": \"7d2334fc-a84a-4c3d-b26c-7529afa4c0ae\",\n                            \"exec\": [\n                                \"pm.test(\\\"Status code is 200\\\", function () {\",\n                                \"    pm.response.to.have.status(200);\",\n                                \"});\"\n                                ],\n                            \"type\": \"text/javascript\"\n                            }\n                        }\n                    ],\n                \"request\": {\n                    \"url\": \"https://echo.getpostman.com/headers\",\n                    \"method\": \"GET\",\n                    \"header\": [\n                        {\n                            \"key\": \"Content-Type\",\n                            \"value\": \"application/json\"\n                        }\n                    ]\n                }\n            }\n        ]\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://api.getpostman.com/collections",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections"
									],
									"query": [
										{
											"key": "workspace",
											"value": "1f0df51a-8658-4ee8-a2a1-d2567dfa09a9",
											"description": "Optional. A workspace ID in which to create the collection.\n\nIf you do not include this query parameter, the system creates the collection in your \"My Workspace\" workspace.",
											"disabled": true
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"name": "Content-Type",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": {\n        \"name\": \"instanceFoundError\",\n        \"message\": \"The specified item already exists.\",\n        \"details\": {\n            \"item\": \"collection\",\n            \"id\": \"12ece9e1-2abf-4edc-8e34-de66e74114d2\"\n        }\n    }\n}"
						},
						{
							"name": "Malformed Request",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Content-Type",
										"value": "application/json",
										"name": "Content-Type",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"collection\": {\n        \"item\": [\n            {\n                \"name\": \"Test GET Response\",\n                \"event\": [\n                    {\n                        \"listen\": \"test\",\n                        \"script\": {\n                            \"id\": \"7d2334fc-a84a-4c3d-b26c-7529afa4c0ae\",\n                            \"exec\": [\n                                \"pm.test(\\\"Status code is 200\\\", function () {\",\n                                \"    pm.response.to.have.status(200);\",\n                                \"});\"\n                                ],\n                            \"type\": \"text/javascript\"\n                            }\n                        }\n                    ],\n                \"request\": {\n                    \"url\": \"https://echo.getpostman.com/headers\",\n                    \"method\": \"GET\",\n                    \"header\": [\n                        {\n                            \"key\": \"Content-Type\",\n                            \"value\": \"application/json\"\n                        }\n                    ]\n                }\n            }\n        ]\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://api.getpostman.com/collections",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections"
									],
									"query": [
										{
											"key": "workspace",
											"value": "1f0df51a-8658-4ee8-a2a1-d2567dfa09a9",
											"description": "Optional. A workspace ID in which to create the collection.\n\nIf you do not include this query parameter, the system creates the collection in your \"My Workspace\" workspace.",
											"disabled": true
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": {\n        \"name\": \"malformedRequestError\",\n        \"message\": \"Found 1 errors with the supplied collection.\",\n        \"details\": [\n            \": must have required property 'info'\"\n        ]\n    }\n}"
						},
						{
							"name": "Rate Limit Exceeded",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Content-Type",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"collection\": {\n        \"item\": [\n            {\n                \"name\": \"Test GET Response\",\n                \"event\": [\n                    {\n                        \"listen\": \"test\",\n                        \"script\": {\n                            \"id\": \"7d2334fc-a84a-4c3d-b26c-7529afa4c0ae\",\n                            \"exec\": [\n                                \"pm.test(\\\"Status code is 200\\\", function () {\",\n                                \"    pm.response.to.have.status(200);\",\n                                \"});\"\n                                ],\n                            \"type\": \"text/javascript\"\n                            }\n                        }\n                    ],\n                \"request\": {\n                    \"url\": \"https://echo.getpostman.com/headers\",\n                    \"method\": \"GET\",\n                    \"header\": [\n                        {\n                            \"key\": \"Content-Type\",\n                            \"value\": \"application/json\"\n                        }\n                    ]\n                }\n            }\n        ]\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://api.getpostman.com/collections",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections"
									],
									"query": [
										{
											"key": "workspace",
											"value": "1f0df51a-8658-4ee8-a2a1-d2567dfa09a9",
											"description": "Optional. A workspace ID in which to create the collection.\n\nIf you do not include this query parameter, the system creates the collection in your \"My Workspace\" workspace.",
											"disabled": true
										}
									]
								}
							},
							"status": "Too Many Requests",
							"code": 429,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"description": ""
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": \"rateLimited\",\n    \"message\": \"Rate limit exceeded. Please retry after 1669048687\"\n}"
						}
					]
				},
				{
					"name": "Get a collection",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									""
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://api.getpostman.com/collections/{{collectionId}}",
							"protocol": "https",
							"host": [
								"api",
								"getpostman",
								"com"
							],
							"path": [
								"collections",
								"{{collectionId}}"
							],
							"query": [
								{
									"key": "access_key",
									"value": "{{accessKey}}",
									"description": "Optional. A collection's read-only access key. Using this query parameter does not require an API key to call the endpoint.",
									"disabled": true
								}
							]
						},
						"description": "Gets information about a collection. For a complete list of this endpoint's possible values, use the [collection.json schema file](https://schema.postman.com/json/collection/v2.1.0/collection.json)."
					},
					"response": [
						{
							"name": "Successful Response",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"name": "Content-Type",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"Test Collection\",\n            \"description\": \"This is a test collection that makes a tiny request to Postman Echo service to get the list of request headers sent by a HTTP client.\",\n            \"_postman_id\": \"12ece9e1-2abf-4edc-8e34-de66e74114d2\",\n            \"schema\": \"https://schema.getpostman.com/json/collection/v2.0.0/collection.json\",\n            \"updatedAt\": \"2022-06-16T20:21:13.000Z\",\n            \"fork\": {\n                \"label\": \"Test Fork\",\n                \"createdAt\": \"2022-06-16T19:51:44.069Z\",\n                \"from\": \"12345678-12ece9e1-2abf-4edc-8e34-de66e74114d2\"\n            }\n        },\n        \"item\": [\n            {\n                \"name\": \"Test GET Response\",\n                \"id\": \"82ee981b-e19f-962a-401e-ea34ebfb4848\",\n                \"event\": [\n                    {\n                        \"listen\": \"test\",\n                        \"script\": {\n                            \"id\": \"7d2334fc-a84a-4c3d-b26c-7529afa4c0ae\",\n                            \"exec\": [\n                                \"pm.test(\\\"Status code is 200\\\", function () {\",\n                                \"    pm.response.to.have.status(200);\",\n                                \"});\"\n                            ],\n                            \"type\": \"text/javascript\"\n                        }\n                    }\n                ],\n                \"request\": {\n                    \"url\": \"https://echo.getpostman.com/headers\",\n                    \"method\": \"GET\",\n                    \"header\": [\n                        {\n                            \"key\": \"Content-Type\",\n                            \"value\": \"application/json\"\n                        }\n                    ]\n                },\n                \"response\": []\n            }\n        ]\n    }\n}"
						},
						{
							"name": "Get Collection with Access Token",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2?access_key={{accessKey}}",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									],
									"query": [
										{
											"key": "access_key",
											"value": "{{accessKey}}"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"Test Collection\",\n            \"description\": \"This is a test collection that makes a tiny request to Postman Echo service to get the list of request headers sent by a HTTP client.\",\n            \"_postman_id\": \"12ece9e1-2abf-4edc-8e34-de66e74114d2\",\n            \"schema\": \"https://schema.getpostman.com/json/collection/v2.0.0/collection.json\",\n            \"updatedAt\": \"2022-06-16T20:21:13.000Z\",\n            \"fork\": {\n                \"label\": \"Test Fork\",\n                \"createdAt\": \"2022-06-16T19:51:44.069Z\",\n                \"from\": \"12345678-12ece9e1-2abf-4edc-8e34-de66e74114d2\"\n            }\n        },\n        \"item\": [\n            {\n                \"name\": \"Test GET Response\",\n                \"id\": \"82ee981b-e19f-962a-401e-ea34ebfb4848\",\n                \"event\": [\n                    {\n                        \"listen\": \"test\",\n                        \"script\": {\n                            \"id\": \"7d2334fc-a84a-4c3d-b26c-7529afa4c0ae\",\n                            \"exec\": [\n                                \"pm.test(\\\"Status code is 200\\\", function () {\",\n                                \"    pm.response.to.have.status(200);\",\n                                \"});\"\n                            ],\n                            \"type\": \"text/javascript\"\n                        }\n                    }\n                ],\n                \"request\": {\n                    \"url\": \"https://echo.getpostman.com/headers\",\n                    \"method\": \"GET\",\n                    \"header\": [\n                        {\n                            \"key\": \"Content-Type\",\n                            \"value\": \"application/json\"\n                        }\n                    ]\n                },\n                \"response\": []\n            }\n        ]\n    }\n}"
						},
						{
							"name": "Not Found",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [],
							"cookie": [],
							"body": "{\n    \"error\": {\n        \"name\": \"instanceNotFoundError\",\n        \"message\": \"We could not find the collection you are looking for\"\n    }\n}"
						},
						{
							"name": "Rate Limit Exceeded",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "Too Many Requests",
							"code": 429,
							"_postman_previewlanguage": "json",
							"header": [],
							"cookie": [],
							"body": "{\n    \"error\": \"rateLimited\",\n    \"message\": \"Rate limit exceeded. Please retry after 1669048687\"\n}"
						}
					]
				},
				{
					"name": "Delete a collection",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									""
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "https://api.getpostman.com/collections/{{collectionId}}",
							"protocol": "https",
							"host": [
								"api",
								"getpostman",
								"com"
							],
							"path": [
								"collections",
								"{{collectionId}}"
							]
						},
						"description": "Deletes a collection."
					},
					"response": [
						{
							"name": "Successful Response",
							"originalRequest": {
								"method": "DELETE",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"collection\": {\n        \"id\": \"12ece9e1-2abf-4edc-8e34-de66e74114d2\",\n        \"uid\": \"12345678-12ece9e1-2abf-4edc-8e34-de66e74114d2\"\n    }\n}"
						},
						{
							"name": "Not Found",
							"originalRequest": {
								"method": "DELETE",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"name": "Content-Type",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": {\n        \"name\": \"instanceNotFoundError\",\n        \"message\": \"The specified item does not exist.\",\n        \"details\": {\n            \"item\": \"collection\",\n            \"id\": \"12ece9e1-2abf-4edc-8e34-de66e74114d2\"\n        }\n    }\n}"
						},
						{
							"name": "Rate Limit Exceeded",
							"originalRequest": {
								"method": "DELETE",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "Too Many Requests",
							"code": 429,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": \"rateLimited\",\n    \"message\": \"Rate limit exceeded. Please retry after 1669048687\"\n}"
						}
					]
				},
				{
					"name": "Update a collection",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									""
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "PUT",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"{{collectionName}}\",\n            \"schema\": \"{{collectionSchemaUrl}}\"\n        },\n        \"item\": [\n            {\n                \"request\": {}\n            }\n        ]\n    }\n}"
						},
						"url": {
							"raw": "https://api.getpostman.com/collections/{{collectionId}}",
							"protocol": "https",
							"host": [
								"api",
								"getpostman",
								"com"
							],
							"path": [
								"collections",
								"{{collectionId}}"
							]
						},
						"description": "Updates a collection using the [Postman Collection v2 schema format](https://schema.postman.com/json/collection/v2.1.0/docs/index.html). Include a `collection` object in the request body that contains the following required properties:\n\n- `info` — An **object** that contains the following properties:\n    - `name` — A **string** value that contains the collection's name.\n    - `schema` — A **string** that contains a URL to the collection's schema. For example, the `https://schema.getpostman.com/collection/v1` URL.\n- `item` — An **object** that contains the HTTP request and response information.\n    - `request` — An **object** that contains the collection's request information. For a complete list of values, refer to the `definitions.request` entry in the [collection.json schema file](https://schema.postman.com/json/collection/v2.1.0/collection.json). If you pass an empty object for this value, the system defaults to an untitled GET request.\n\n**Note:**\n\n- For a complete list of available property values for this endpoint, use the following references available in the [collection.json schema file](https://schema.postman.com/json/collection/v2.1.0/collection.json):\n    - `info` object — Use the `definitions.info` entry.\n    - `item` object — Use the `definitions.items` entry.\n- For all other possible values, refer to the [collection.json schema file](https://schema.postman.com/json/collection/v2.1.0/collection.json).\n    \n\n### Important\n\nUse caution when using this endpoint. The system will replace the existing collection with the values passed in the request body."
					},
					"response": [
						{
							"name": "Successful Response",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Content-Type",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"Test Collection\",\n            \"description\": \"This collection makes a request to the Postman Echo service to get a list of request headers sent by an HTTP client.\",\n            \"schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\"\n        },\n        \"item\": [\n            {\n                \"name\": \"Test POST Response\",\n                \"event\": [\n                    {\n                        \"listen\": \"test\",\n                        \"script\": {\n                            \"id\": \"7d2334fc-a84a-4c3d-b26c-7529afa4c0ae\",\n                            \"exec\": [\n                                \"pm.test(\\\"Status code is 200\\\", function () {\",\n                                \"    pm.response.to.have.status(200);\",\n                                \"});\"\n                                ],\n                            \"type\": \"text/javascript\"\n                            }\n                        }\n                    ],\n                \"request\": {\n                    \"url\": \"https://echo.getpostman.com/headers\",\n                    \"method\": \"POST\",\n                    \"header\": [\n                        {\n                            \"key\": \"Content-Type\",\n                            \"value\": \"application/json\"\n                        }\n                    ]\n                }\n            }\n        ]\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"name": "Content-Type",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"collection\": {\n        \"id\": \"12ece9e1-2abf-4edc-8e34-de66e74114d2\",\n        \"name\": \"Test Collection\",\n        \"uid\": \"12345678-12ece9e1-2abf-4edc-8e34-de66e74114d2\"\n    }\n}"
						},
						{
							"name": "Forbidden",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Content-Type",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"Test Collection\",\n            \"description\": \"This collection makes a request to the Postman Echo service to get a list of request headers sent by an HTTP client.\",\n            \"schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\"\n        },\n        \"item\": [\n            {\n                \"name\": \"Test POST Response\",\n                \"event\": [\n                    {\n                        \"listen\": \"test\",\n                        \"script\": {\n                            \"id\": \"7d2334fc-a84a-4c3d-b26c-7529afa4c0ae\",\n                            \"exec\": [\n                                \"pm.test(\\\"Status code is 200\\\", function () {\",\n                                \"    pm.response.to.have.status(200);\",\n                                \"});\"\n                                ],\n                            \"type\": \"text/javascript\"\n                            }\n                        }\n                    ],\n                \"request\": {\n                    \"url\": \"https://echo.getpostman.com/headers\",\n                    \"method\": \"POST\",\n                    \"header\": [\n                        {\n                            \"key\": \"Content-Type\",\n                            \"value\": \"application/json\"\n                        }\n                    ]\n                }\n            }\n        ]\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "Forbidden",
							"code": 403,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": {\n        \"name\": \"forbiddenError\",\n        \"message\": \"You do not have enough permissions to perform this action.\"\n    }\n}"
						},
						{
							"name": "Not Found",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Content-Type",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"Test Collection\",\n            \"description\": \"This collection makes a request to the Postman Echo service to get a list of request headers sent by an HTTP client.\",\n            \"schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\"\n        },\n        \"item\": [\n            {\n                \"name\": \"Test POST Response\",\n                \"event\": [\n                    {\n                        \"listen\": \"test\",\n                        \"script\": {\n                            \"id\": \"7d2334fc-a84a-4c3d-b26c-7529afa4c0ae\",\n                            \"exec\": [\n                                \"pm.test(\\\"Status code is 200\\\", function () {\",\n                                \"    pm.response.to.have.status(200);\",\n                                \"});\"\n                                ],\n                            \"type\": \"text/javascript\"\n                            }\n                        }\n                    ],\n                \"request\": {\n                    \"url\": \"https://echo.getpostman.com/headers\",\n                    \"method\": \"POST\",\n                    \"header\": [\n                        {\n                            \"key\": \"Content-Type\",\n                            \"value\": \"application/json\"\n                        }\n                    ]\n                }\n            }\n        ]\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"name": "Content-Type",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": {\n        \"name\": \"instanceNotFoundError\",\n        \"message\": \"The specified item does not exist.\",\n        \"details\": {\n            \"item\": \"collection\",\n            \"id\": \"12ece9e1-2abf-4edc-8e34-de66e74114d2\"\n        }\n    }\n}"
						},
						{
							"name": "Malformed Request",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Content-Type",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"Test Collection\"\n        }\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"name": "Content-Type",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": {\n        \"name\": \"malformedRequestError\",\n        \"message\": \"Found 2 errors with the supplied collection.\",\n        \"details\": [\n            \": must have required property 'item'\",\n            \"info: must have required property 'schema'\"\n        ]\n    }\n}"
						},
						{
							"name": "Collection ID Mismatch",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Content-Type",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"Test Collection\",\n            \"description\": \"This collection makes a request to the Postman Echo service to get a list of request headers sent by an HTTP client.\",\n            \"schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\"\n        },\n        \"item\": [\n            {\n                \"name\": \"Test POST Response\",\n                \"event\": [\n                    {\n                        \"listen\": \"test\",\n                        \"script\": {\n                            \"id\": \"7d2334fc-a84a-4c3d-b26c-7529afa4c0ae\",\n                            \"exec\": [\n                                \"pm.test(\\\"Status code is 200\\\", function () {\",\n                                \"    pm.response.to.have.status(200);\",\n                                \"});\"\n                                ],\n                            \"type\": \"text/javascript\"\n                            }\n                        }\n                    ],\n                \"request\": {\n                    \"url\": \"https://echo.getpostman.com/headers\",\n                    \"method\": \"POST\",\n                    \"header\": [\n                        {\n                            \"key\": \"Content-Type\",\n                            \"value\": \"application/json\"\n                        }\n                    ]\n                }\n            }\n        ]\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"name": "Content-Type",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": {\n        \"name\": \"collectionMismatchError\",\n        \"message\": \"The collection ID in the path does not match the collection ID in the request body.\"\n    }\n}"
						},
						{
							"name": "Rate Limit Exceeded",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Content-Type",
										"value": "application/json"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"collection\": {\n        \"info\": {\n            \"name\": \"Test Collection\",\n            \"description\": \"This collection makes a request to the Postman Echo service to get a list of request headers sent by an HTTP client.\",\n            \"schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\"\n        },\n        \"item\": [\n            {\n                \"name\": \"Test POST Response\",\n                \"event\": [\n                    {\n                        \"listen\": \"test\",\n                        \"script\": {\n                            \"id\": \"7d2334fc-a84a-4c3d-b26c-7529afa4c0ae\",\n                            \"exec\": [\n                                \"pm.test(\\\"Status code is 200\\\", function () {\",\n                                \"    pm.response.to.have.status(200);\",\n                                \"});\"\n                                ],\n                            \"type\": \"text/javascript\"\n                            }\n                        }\n                    ],\n                \"request\": {\n                    \"url\": \"https://echo.getpostman.com/headers\",\n                    \"method\": \"POST\",\n                    \"header\": [\n                        {\n                            \"key\": \"Content-Type\",\n                            \"value\": \"application/json\"\n                        }\n                    ]\n                }\n            }\n        ]\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://api.getpostman.com/collections/12ece9e1-2abf-4edc-8e34-de66e74114d2",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections",
										"12ece9e1-2abf-4edc-8e34-de66e74114d2"
									]
								}
							},
							"status": "Too Many Requests",
							"code": 429,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": \"rateLimited\",\n    \"message\": \"Rate limit exceeded. Please retry after 1669048687\"\n}"
						}
					]
				},
				{
					"name": "Get all collections",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									""
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://api.getpostman.com/collections",
							"protocol": "https",
							"host": [
								"api",
								"getpostman",
								"com"
							],
							"path": [
								"collections"
							],
							"query": [
								{
									"key": "workspace",
									"value": "{{workspaceId}}",
									"description": "Optional. A workspace ID.",
									"disabled": true
								}
							]
						},
						"description": "Gets all of your [collections](https://www.getpostman.com/docs/collections). The response includes all of your subscribed collections."
					},
					"response": [
						{
							"name": "Successful Response",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/collections",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections"
									],
									"query": [
										{
											"key": "workspace",
											"value": "1f0df51a-8658-4ee8-a2a1-d2567dfa09a9",
											"description": "Optional. A workspace ID.",
											"disabled": true
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"collections\": [\n        {\n            \"id\": \"dac5eac9-148d-a32e-b76b-3edee9da28f7\",\n            \"name\": \"Cloud API\",\n            \"owner\": \"12345678\",\n            \"createdAt\": \"2022-04-12T10:29:46.000Z\",\n            \"updatedAt\": \"2022-04-12T10:29:56.000Z\",\n            \"uid\": \"12345678-dac5eac9-148d-a32e-b76b-3edee9da28f7\",\n            \"isPublic\": true\n        },\n        {\n            \"id\": \"12ece9e1-2abf-4edc-8e34-de66e74114d2\",\n            \"name\": \"Test Collection\",\n            \"owner\": \"12345678\",\n            \"createdAt\": \"2022-01-13T10:21:46.000Z\",\n            \"updatedAt\": \"2022-02-12T11:29:56.000Z\",\n            \"uid\": \"12345678-12ece9e1-2abf-4edc-8e34-de66e74114d2\",\n            \"isPublic\": false,\n            \"fork\": {\n                \"label\": \"Test Fork\",\n                \"createdAt\": \"2022-06-16T19:51:44.069Z\",\n                \"from\": \"12345678-12ece9e1-2abf-4edc-8e34-de66e74114d2\"\n            }\n        },\n        {\n            \"id\": \"f695cab7-6878-eb55-7943-ad88e1ccfd65\",\n            \"name\": \"Postman Echo\",\n            \"owner\": \"12345678\",\n            \"createdAt\": \"2021-04-11T09:18:26.000Z\",\n            \"updatedAt\": \"2022-05-01T15:29:32.000Z\",\n            \"uid\": \"12345678-f695cab7-6878-eb55-7943-ad88e1ccfd65\",\n            \"isPublic\": true\n        }\n    ]\n}"
						},
						{
							"name": "Filter by Workspace",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/collections?workspace=1f0df51a-8658-4ee8-a2a1-d2567dfa09a9",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections"
									],
									"query": [
										{
											"key": "workspace",
											"value": "1f0df51a-8658-4ee8-a2a1-d2567dfa09a9",
											"description": "Optional. A workspace ID."
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"collections\": [\n        {\n            \"id\": \"dac5eac9-148d-a32e-b76b-3edee9da28f7\",\n            \"name\": \"Cloud API\",\n            \"owner\": \"12345678\",\n            \"createdAt\": \"2022-04-12T10:29:46.000Z\",\n            \"updatedAt\": \"2022-04-12T10:29:56.000Z\",\n            \"uid\": \"12345678-dac5eac9-148d-a32e-b76b-3edee9da28f7\",\n            \"isPublic\": true\n        }\n    ]\n}"
						},
						{
							"name": "Rate Limit Exceeded",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://api.getpostman.com/collections",
									"protocol": "https",
									"host": [
										"api",
										"getpostman",
										"com"
									],
									"path": [
										"collections"
									],
									"query": [
										{
											"key": "workspace",
											"value": "1f0df51a-8658-4ee8-a2a1-d2567dfa09a9",
											"description": "Optional. A workspace ID.",
											"disabled": true
										}
									]
								}
							},
							"status": "Too Many Requests",
							"code": 429,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json",
									"description": {
										"content": "",
										"type": "text/plain"
									}
								}
							],
							"cookie": [],
							"body": "{\n    \"error\": \"rateLimited\",\n    \"message\": \"Rate limit exceeded. Please retry after 1669048687\"\n}"
						}
					]
				},
				{
					"name": "http://localhost:4000/orders/",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"userId\" : \"67322cdfa472e2e7d22de84a\",\r\n    \"frontendUrl\": \"http://localhost:5173/\",\r\n    \"addressId\": \"6746612b6321139085d8f002\",\r\n    \"paymentMethod\": \"wallet\"\r\n\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/orders/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"orders",
								""
							]
						}
					},
					"response": []
				}
			],
			"description": "The `/collections` endpoints let you manage your [collections](https://learning.postman.com/docs/sending-requests/intro-to-collections/)."
		}
	],
	"auth": {
		"type": "apikey",
		"apikey": [
			{
				"key": "key",
				"value": "X-API-Key",
				"type": "string"
			},
			{
				"key": "value",
				"value": "{{token}}",
				"type": "string"
			}
		]
	},
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "baseUrl",
			"value": "https://farming-simulator.pstmn.io"
		}
	]
}cumentation.postman_collection.json…]()


## Contribute

Want to contribute? Great!

Send us a email at explora.contribute@gmail.com
## Credits

[![License](https://img.shields.io/badge/License-Apache_2.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)  

[![License](https://img.shields.io/badge/License-Amadeus-yellowgreen.svg)](https://github.com/amadeus4dev/amadeus-code-examples/blob/master/LICENSE)

[![License](https://img.shields.io/badge/License-Stripe-yellowgreen.svg)](https://stripe.com/legal/spc/licenses)
## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

