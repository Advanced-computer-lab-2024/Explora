
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

## Contribute

Want to contribute? Great!

Send us a email at explora.contribute@gmail.com
## Credits

[![License](https://img.shields.io/badge/License-Apache_2.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)  

[![License](https://img.shields.io/badge/License-Amadeus-yellowgreen.svg)](https://github.com/amadeus4dev/amadeus-code-examples/blob/master/LICENSE)

[![License](https://img.shields.io/badge/License-Stripe-yellowgreen.svg)](https://stripe.com/legal/spc/licenses)
## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

