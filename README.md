
# Explora

Explora is a travel booking site which allows the user to find and book hotel, transportation and activities and buy products.
## Motivation

Our motivation was to create an all in one website for all the user's needs, starting from booking the hotels and transportation all the way to buying products, we also wanted to make it as easy as it can be and to give the user the opportunity to give feedback on every experience they had starting from the activities to the products.

## Build Status

- The payment is accepted when you book with stripe as soon as you get redirected to the page before you add any payment details.
- The change password using otp method doesn't work as expected. 
- The admin/seller fails to filter sails report.

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

## Features

- User Authentication: Secure system for user registration and login to ensure account safety.
- Credit Card and Wallet Payments: Tourists can make payments for services using credit cards or wallets. For product purchases, a cash-on-delivery option is also available.
- Itinerary Returns: Tourists can cancel their booked activities or itineraries up to two days before the scheduled date.
- Tour Guide Contributions: Tour guides can add itineraries for users to view and book directly through the system.
- Advertiser Contributions: Advertisers can list activities for tourists to view and book seamlessly.
- Tourism Site Management: Governors can add touristic sites for users to explore.
- Product Sales and Insights: Sellers can add products for tourists to view and buy, with access to a sales graph for tracking performance.
- Ticket Booking: Simplified process for booking tickets for various transportation modes.
- Activity Booking: Users can book activities and tours at their destination easily.
- Payment Integration: Secure and reliable payment gateways for bookings and transactions.
- Itinerary Management: User-friendly interface for creating, editing, and managing travel itineraries.
- Activity Scheduling: Convenient scheduling and management of travel activities.
- Notifications and Emails: Users receive timely notifications and email confirmations for bookings, reminders, and special offers.
- Search and Filter: Advanced search and filter options to refine travel plans and explore activities.
- Customer Support: Integrated support for resolving user issues efficiently.
- User Profiles: Comprehensive management of personal information and travel preferences.
- Admin Dashboard: Detailed dashboard for administrators to manage users, bookings, and platform content.
- Currency Converter: Built-in tool to assist with international transactions.
- Favorites: Bookmark favorite itineraries and activities for easy access.
- Flight and Hotel Booking: Direct integration with services for booking flights and accommodations.
- Sharing: Users can share activities and itineraries by link and email.
- Review and Ratings: Provide feedback and rate travel services or experiences.
- Responsive Design: Fully optimized for both desktop and mobile devices.
- Travel Recommendations: Personalized suggestions based on user preferences and history.
- Loyalty Program: Earn and redeem rewards through a points-based loyalty program.
- Favorites Management: Explore and manage wishlists or carts for products.
- Promo Codes and Gifts: Receive rewards and promo codes to enhance user satisfaction.
- API Integration: Connect with third-party APIs for extended functionality.
- User-Friendly Interface: Simple and intuitive design for a seamless user experience.
- Booking History: View past~ bookings and travel itineraries.
- Upcoming Booking : View upcoming bookings and travel itineraries.

## Code Examples

## Example 1
```
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
```
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

Here are a few tests:

- Title: Create Tour Guide Profile
- Route: (http://localhost:4000/api/tour_guide_profile/register)
- Request Method: POST
- Request:
- Body Parameters:
```json
{
  "username": "sis",       
  "email": "sis@gmail.com",          
  "password": "sis",       
  "name": "sasa",           
  "mobile": "010052525",         
  "yearsOfExperience": 5, 
  "previousWork": "non",   
  "termsAccepted": "true", 
  "image": "file"             
}
```
- Expected Response:
```json
{
    "username": "sis",
    "password": "$2b$10$yJ.ODT7r3PwDPvtqXX/O8OCDOvX1Zo.Wb7CDzxdV8ognlQlOugKRu",
    "loyaltyPoints": 0,
    "loyaltyLevel": 0,
    "role": "TourGuide",
    "_id": "6754b5cf0ee2b9fdc6014dd6",
    "email": "sis@gmail.com",
    "tourists": [],
    "name": "sasa",
    "mobile": "010052525",
    "yearsOfExperience": 5,
    "previousWork": "non",
    "isAccepted": true,
    "termsAccepted": true,
    "rating": 0,
    "status": "Pending",
    "createdAt": "2024-12-07T20:53:35.862Z",
    "updatedAt": "2024-12-07T20:53:35.862Z",
    "__v": 0
}
```
-------------------------------------------------------------------------------------------
- Title: Get Tour Guide Profile by ID
- Route: http://localhost:4000/api/tour_guide_profile/:id
- Request Method: GET
- Request:
```
  "id": "string"
```
Body Parameters: None
Expected Response:
```json
{
  "loyaltyPoints": 0,
  "loyaltyLevel": 0,
  "_id": "6748fae835a3fa0479d4a088",
  "username": "mimi",
  "password": "$2b$10$/.0EcrIBO9ZF4IPDQaSF7eFoEeF2sL7IQcMFtSdjRa/Mhi2H07HYy",
  "role": "TourGuide",
  "email": "maruma1682003@gmail.com",
  "tourists": [],
  "previousWork": "",
  "isAccepted": true,
  "termsAccepted": false,
  "rating": 0,
  "idFile": "uploads\\1732836072168.png",
  "certificatesFile": "uploads\\1732836072181.png",
  "imageFile": "uploads\\1732836072188.png",
  "status": "Accepted",
  "createdAt": "2024-11-28T23:21:12.555Z",
  "updatedAt": "2024-12-01T23:52:05.955Z",
  "__v": 0
}
```
-------------------------------------------------------------------------------------------
- Title: Update Tour Guide Profile
- Route: http://localhost:4000/api/tour_guide_profile/me/:id
- Request Method: PUT
- Request:
- Body Parameters:
```json
{
  "email": "new_email@example.com",
  "newPassword": "new_password",
  "name": "New Name",
  "mobile": "0123456789",
  "yearsOfExperience": 5,
  "previousWork": "New Work Details",
  "isAccepted": true
}
```
- Expected Response:
```json
{
  "_id": "6748fae835a3fa0479d4a088",
  "username": "mimi",
  "email": "new_email@example.com",
  "password": "$2b$10$hashed_password_string",
  "name": "New Name",
  "mobile": "0123456789",
  "yearsOfExperience": 5,
  "previousWork": "New Work Details",
  "isAccepted": true,
  "profilePicture": "uploads/path_to_new_picture.png",
  "loyaltyPoints": 0,
  "loyaltyLevel": 0,
  "role": "TourGuide",
  "tourists": [],
  "rating": 0,
  "status": "Accepted",
  "createdAt": "2024-11-28T23:21:12.555Z",
  "updatedAt": "2024-12-01T23:52:05.955Z",
  "__v": 0
}
```
-------------------------------------------------------------------------------------------
- Title: Create a New Itinerary
- Route: http://localhost:4000/api/tour_guide_itinerary/
- Request Method: POST
- Request:
- Body Parameters:
```json
{
  "tourGuideName": "John Doe",
  "tourGuideId": "6748fae835a3fa0479d4a088",
  "activities": [
    {
      "duration": 120,
      "date": "2024-07-01",
      "time": "10:00"
    },
    {
      "duration": 90,
      "date": "2024-07-02",
      "time": "14:00"
    }
  ],
  "locations": "Cairo, Giza Pyramids, Egyptian Museum",
  "timeline": "2-day cultural tour covering major attractions",
  "duration": 2,
  "language": "English",
  "price": 150,
  "availableDates": ["2024-07-01", "2024-07-02"],
  "availableTimes": ["10:00", "14:00"],
  "accessibility": true,
  "pickupLocation": "Cairo Airport",
  "dropoffLocation": "Giza Pyramids",
  "hasBookings": false,
  "tags": ["cultural", "history", "adventure"]
}
```
Expected Response:
```json
{
    "tourGuideName": "John Doe",
    "tourGuideId": "6748fae835a3fa0479d4a088",
    "activities": [
        {
            "duration": 120,
            "date": "2024-07-01T00:00:00.000Z",
            "time": "10:00",
            "_id": "6754b7c1420909de67705296"
        },
        {
            "duration": 90,
            "date": "2024-07-02T00:00:00.000Z",
            "time": "14:00",
            "_id": "6754b7c1420909de67705297"
        }
    ],
    "locations": "Cairo, Giza Pyramids, Egyptian Museum",
    "timeline": "2-day cultural tour covering major attractions",
    "duration": 2,
    "language": "English",
    "price": 150,
    "availableDates": [
        "2024-07-01T00:00:00.000Z",
        "2024-07-02T00:00:00.000Z"
    ],
    "availableTimes": [
        "10:00",
        "14:00"
    ],
    "accessibility": true,
    "pickupLocation": "Cairo Airport",
    "dropoffLocation": "Giza Pyramids",
    "hasBookings": false,
    "isActive": true,
    "tags": [
        "cultural",
        "history",
        "adventure"
    ],
    "rating": 0,
    "isDeleted": false,
    "flagged": false,
    "_id": "6754b7c1420909de67705295",
    "__v": 0
}
```
-------------------------------------------------------------------------------------------
- Title: Get Itineraries by Tour Guide ID
- Route: (http://localhost:4000/api/tour_guide_itinerary)
- Request Method: GET
- Request:
- Query Parameters:
```
    "tourGuideId": "6748fae835a3fa0479d4a088"
```
Expected Response:
```json
[ 
    {
        "_id": "6749a7a40d9e637f9c7cc0b8",
        "tourGuideName": "Mimi",
        "tourGuideId": "6748fae835a3fa0479d4a088",
        "activities": [
            {
                "duration": 10,
                "date": "2024-11-30T00:00:00.000Z",
                "time": "13:40",
                "_id": "6749a7a40d9e637f9c7cc0b9"
            }
        ],
        "locations": "Germany",
        "timeline": "Morning ",
        "duration": 5,
        "language": "English",
        "price": 500,
        "availableDates": [
            "2024-12-05T00:00:00.000Z"
        ],
        "availableTimes": [
            "13:35"
        ],
        "accessibility": false,
        "pickupLocation": "Cairo",
        "dropoffLocation": "Berlin",
        "hasBookings": true,
        "isActive": true,
        "tags": [],
        "rating": 0,
        "isDeleted": false,
        "flagged": false,
        "__v": 0
    }
]
```
-------------------------------------------------------------------------------------------
- Title: Update an Itinerary by ID
- Route: http://localhost:4000/api/tour_guide_itinerary/:id
- Request Method: PUT
- Request:
- URL Parameter:
```
    "_id": "6754bb26420909de67705299"
```
- Request Body:
```json
{
  "tourGuideName": "John Doe",
  "activities": [
    {
      "duration": 180,
      "date": "2024-08-01T00:00:00.000Z",
      "time": "11:00"
    }
  ],
  "locations": "Luxor, Karnak Temple",
  "timeline": "3-day ancient sites tour",
  "duration": 3,
  "language": "French",
  "price": 300,
  "availableDates": ["2024-08-01T00:00:00.000Z"],
  "availableTimes": ["11:00"],
  "accessibility": true,
  "pickupLocation": "Luxor Airport",
  "dropoffLocation": "Karnak Temple",
  "hasBookings": false,
  "tags": ["ancient", "cultural"]
}
```
- Expected Response:
```json
{
    "_id": "6754bb26420909de67705299",
    "tourGuideName": "John Doe",
    "tourGuideId": "6748fae835a3fa0479d4a088",
    "activities": [
        {
            "duration": 180,
            "date": "2024-08-01T00:00:00.000Z",
            "time": "11:00",
            "_id": "6754c2c100cbdf40181f909b"
        }
    ],
    "locations": "Luxor, Karnak Temple",
    "timeline": "3-day ancient sites tour",
    "duration": 3,
    "language": "French",
    "price": 300,
    "availableDates": [
        "2024-08-01T00:00:00.000Z"
    ],
    "availableTimes": [
        "11:00"
    ],
    "accessibility": true,
    "pickupLocation": "Luxor Airport",
    "dropoffLocation": "Karnak Temple",
    "hasBookings": false,
    "isActive": true,
    "tags": [
        "ancient",
        "cultural"
    ],
    "rating": 0,
    "isDeleted": false,
    "flagged": false,
    "__v": 1
}
```
-------------------------------------------------------------------------------------------
- Title: Delete an Itinerary by ID
- Route: http://localhost:4000/api/tour_guide_itinerary/:id
- Request Method: DELETE
- Request:
- URL Parameter:
```
    id : "6754bb26420909de67705299"
```
Expected Response:
```json
{
  "msg": "Itinerary removed successfully"
}
```
-------------------------------------------------------------------------------------------
- Title: Get Itinerary by ID
- Route: http://localhost:4000/api/tour_guide_itinerary/:id
- Request Method: GET
- Request:
- URL Parameter:
```
    id: "6754bb26420909de67705299"
```
Expected Response:
```json
{
    "_id": "6754bb26420909de67705299",
    "tourGuideName": "John Doe",
    "tourGuideId": "6748fae835a3fa0479d4a088",
    "activities": [
        {
            "duration": 180,
            "date": "2024-08-01T00:00:00.000Z",
            "time": "11:00",
            "_id": "6754c2c100cbdf40181f909b"
        }
    ],
    "locations": "Luxor, Karnak Temple",
    "timeline": "3-day ancient sites tour",
    "duration": 3,
    "language": "French",
    "price": 300,
    "availableDates": [
        "2024-08-01T00:00:00.000Z"
    ],
    "availableTimes": [
        "11:00"
    ],
    "accessibility": true,
    "pickupLocation": "Luxor Airport",
    "dropoffLocation": "Karnak Temple",
    "hasBookings": false,
    "isActive": true,
    "tags": [
        "ancient",
        "cultural"
    ],
    "rating": 0,
    "isDeleted": false,
    "flagged": false,
    "__v": 1
}
```
-------------------------------------------------------------------------------------------
- Title: Request Account Deletion
- Route: http://localhost:4000/Request/requestDeletion
- Request Method: POST
- Request: 
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "reason": "No longer needed"
}
```
Expected Response:
```json
{
  "message": "Deletion request submitted"
}
```
-------------------------------------------------------------------------------------------
- Title: Deactivate Itinerary
- Route: http://localhost:4000/api/tour_guide_itinerary/:id/deactivate
- Request Method: PUT
- Request:
- URL Parameter:
```
id: "6749a7a40d9e637f9c7cc0b8"
```
Expected Response:
```json
{
  "message": "Itinerary deactivated successfully."
}
```
-------------------------------------------------------------------------------------------
- Title: Accept Terms
- Route: http://localhost:4000/api/tour_guide_profile/accept-terms/:id
- Request Method: PUT
- Request:
- URL Parameter:
```
    id: "6748fae835a3fa0479d4a088"
```
Expected Response:
```json
{
  "msg": "Terms accepted successfully"
}
```
-------------------------------------------------------------------------------------------
- Title: Rate and Comment on a Tour Guide
- Route: http://localhost:4000/reviews/rateTourGuide
- Request Method: POST
- Request:
- Body Parameters:
```json
{
    "touristId": "674d0772a54a6ecc374e2f35",
    "tourGuideId": "674cfa7ea54a6ecc374e2ea9",
    "rating": 5,
    "comment": "very good" 
}
```
Expected Response:
```json
{
    "msg": "Review added successfully",
    "review": {
        "tourGuide": "674cfa7ea54a6ecc374e2ea9",
        "tourist": "674d0772a54a6ecc374e2f35",
        "rating": 5,
        "comment": "very good",
        "_id": "6754e71ff92fc61705823126",
        "date": "2024-12-08T00:23:59.226Z"
    }
}
```
-------------------------------------------------------------------------------------------
- Title: Rate and Comment on an Itinerary
- Route: http://localhost:4000/reviews/rateItinerary
- Request Method: POST
- Request:
- Body Parameters:
```json
{
"touristId": "674d0772a54a6ecc374e2f35",
"itineraryId": "6754bb26420909de67705299",
"rating": 5,
"comment": "very good" 
}
```
Expected Response:
```json
{
    "msg": "Rating and comment added successfully",
    "itinerary": {
        "_id": "6754bb26420909de67705299",
        "tourGuideName": "John Doe",
        "tourGuideId": "6748fae835a3fa0479d4a088",
        "activities": [
            {
                "duration": 180,
                "date": "2024-08-01T00:00:00.000Z",
                "time": "11:00",
                "_id": "6754c2c100cbdf40181f909b"
            }
        ],
        "locations": "Luxor, Karnak Temple",
        "timeline": "3-day ancient sites tour",
        "duration": 3,
        "language": "French",
        "price": 300,
        "availableDates": [
            "2024-08-01T00:00:00.000Z"
        ],
        "availableTimes": [
            "11:00"
        ],
        "accessibility": true,
        "pickupLocation": "Luxor Airport",
        "dropoffLocation": "Karnak Temple",
        "hasBookings": false,
        "isActive": true,
        "tags": [
            "ancient",
            "cultural"
        ],
        "rating": 5,
        "isDeleted": false,
        "flagged": false,
        "__v": 1,
        "comment": "very good"
    }
}
```
-------------------------------------------------------------------------------------------
- Title: Get Previous Itineraries
- Route: http://localhost:4000/api/tour_guide_itinerary/previous
- Request Method: GET
- Request:
- Expected Response:
```json
{
        "_id": "67324673bd5e0b9fdcdba05c",
        "tourGuideName": "John Doe",
        "activities": [
            {
                "duration": 120,
                "date": "2024-11-15T10:00:00.000Z",
                "time": "10:00 AM",
                "_id": "67324673bd5e0b9fdcdba05d"
            }
        ],
        "locations": "Paris, France",
        "timeline": "Full Day Tour",
        "duration": 1,
        "language": "English",
        "price": 150,
        "availableDates": [
            "2024-11-15T00:00:00.000Z",
            "2024-11-16T00:00:00.000Z"
        ],
        "availableTimes": [
            "10:00 AM",
            "2:00 PM"
        ],
        "accessibility": true,
        "pickupLocation": "Paris Hotel",
        "dropoffLocation": "Eiffel Tower",
        "hasBookings": false,
        "isActive": true,
        "tags": [
            "tour",
            "adventure",
            "paris"
        ],
        "rating": 0,
        "isDeleted": false,
        "flagged": true,
        "__v": 0
    }
```
-------------------------------------------------------------------------------------------
- Title: Get All Itineraries
- Route: http://localhost:4000/api/tour_guide_itinerary/all
- Request Method: GET
- Request:
- Expected Response:
```json
{
        "_id": "6754bb26420909de67705299",
        "tourGuideName": "John Doe",
        "tourGuideId": "6748fae835a3fa0479d4a088",
        "activities": [
            {
                "duration": 180,
                "date": "2024-08-01T00:00:00.000Z",
                "time": "11:00",
                "_id": "6754c2c100cbdf40181f909b"
            }
        ],
        "locations": "Luxor, Karnak Temple",
        "timeline": "3-day ancient sites tour",
        "duration": 3,
        "language": "French",
        "price": 300,
        "availableDates": [
            "2024-08-01T00:00:00.000Z"
        ],
        "availableTimes": [
            "11:00"
        ],
        "accessibility": true,
        "pickupLocation": "Luxor Airport",
        "dropoffLocation": "Karnak Temple",
        "hasBookings": false,
        "isActive": true,
        "tags": [
            "ancient",
            "cultural"
        ],
        "rating": 5,
        "isDeleted": false,
        "flagged": false,
        "__v": 1,
        "comment": "very good"
    }
```
-------------------------------------------------------------------------------------------
- Title: Get Upcoming Itineraries
- Route: http://localhost:4000/api/tour_guide_itinerary/upcoming
- Request Method: GET
- Request:
- Expected Response:
```json
{
        "_id": "6752f084f3d7174904885e23",
        "tourGuideName": "EZZ",
        "tourGuideId": "6751e64314a67da81e2b08e9",
        "activities": [],
        "locations": "Egypt",
        "timeline": "December",
        "duration": 2,
        "language": "Egypt",
        "price": 499,
        "availableDates": [
            "2024-12-31T00:00:00.000Z"
        ],
        "availableTimes": [
            "14:22"
        ],
        "accessibility": false,
        "pickupLocation": "Airport",
        "dropoffLocation": "Egypt",
        "hasBookings": true,
        "isActive": true,
        "tags": [],
        "rating": 0,
        "isDeleted": false,
        "flagged": true,
        "__v": 0
    }
```
-------------------------------------------------------------------------------------------
- Title: Get Loyalty Points for a User
- Route: http://localhost:4000/users/loyalty-points/:userId
- Request Method: GET
- Request:
- URL Parameter:
```
userId: "674d0772a54a6ecc374e2f35"
```
Expected Response:
```json
{
    "loyaltyPoints": 250019312.5
}
```
-------------------------------------------------------------------------------------------
- Title: User Login
- Route: http://localhost:4000/api/auth/
- Request Method: POST
- Request:
- Body Parameters:
```json
{
  "username": "user_username",
  "password": "user_password"
}
```
Expected Response:
```json
{
  "token": "jwt_token_here",
  "role": "user_role",
  "userId": "user_id"
}
```
-------------------------------------------------------------------------------------------
- Title: Fetch Sales Records for a Tour Guide
- Route: http://localhost:4000/api/
- Request Method: GET
- Query Parameters:
```
    tourGuideId: 674cfa7ea54a6ecc374e2ea9
```
- Expected Response:
```json
{
    "message": "Sales records retrieved successfully",
    "sales": [
        {
            "_id": "674dc4eb4526b9cae9d05cb8",
            "tourGuideId": "674cfa7ea54a6ecc374e2ea9",
            "itineraryId": {
                "_id": "674cfaefa54a6ecc374e2eb4",
                "locations": "India",
                "price": 150,
                "availableDates": [
                    "2025-03-01T00:00:00.000Z"
                ]
            },
            "touristId": {
                "_id": "674d0772a54a6ecc374e2f35",
                "username": "didi",
                "email": "didi@gmail"
            },
            "amount": 150,
            "date": "2024-12-02T14:32:11.458Z",
            "__v": 0
        },
    ]
}
```
-------------------------------------------------------------------------------------------
- Title: Fetch Tourists Who Booked a Tour Guide's Itinerary
- Route: http://localhost:4000/api/report/
- Request Method: GET
- Query Parameters:
```
tourGuideId: 674cfa7ea54a6ecc374e2ea9
```
- Expected Response:
```json
{
    "message": "Tourists who booked the itinerary",
    "touristDetails": [
        {
            "touristName": "didi",
            "itineraryLocations": "India",
            "itineraryDate": [
                "2025-03-01T00:00:00.000Z"
            ]
        },
    ] 
}
```
-------------------------------------------------------------------------------------------
- Title: Flag or Unflag an Itinerary
- Route: http://localhost:4000/api/itineraries/:id/flag
- Request Method: PATCH
- Path Parameters 
```
id: 67324673bd5e0b9fdcdba05c
```
- Expected Response:
```json
{
  "message": "Itinerary flagged successfully"
}
```
Notification: 
```json
{
  "userId": "tourGuideId",
  "message": "Your itinerary 'Itinerary Title' has been flagged.",
  "itineraryId": "itineraryId"
}
```
Email:

>    Subject: Itinerary has been Flagged

>    Dear Tour Guide Name,  
>
>    Your itinerary titled "Itinerary Title" has been flagged.  
>    Please review it.
>
>    Sincerely,  
>    Explora Team
}
-------------------------------------------------------------------------------------------
- Title: Fetch Notifications for a User
- Route: (http://localhost:4000/api/notifications/notifications)
- Request Method: GET
- Request:
- Query Parameters:
```
  "userId": "string" 
```
- Expected Response:
```json
[
  {
    "_id": "notification_id",
    "userId": "user_id",
    "message": "Notification message",
    "createdAt": "2024-06-08T12:00:00Z"
  }
]
```
-------------------------------------------------------------------------------------------
- Title: Mark Notification as Read
- Route: http://localhost:4000/api/notifications/:id/read
- Request Method: PATCH
- Request:
- URL Parameters:
```
  "id": "string" // Notification ID
```
- Expected Response:
```json
{
  "message": "Notification marked as read.",
  "notification": {
    "_id": "664ff3b4cde92f0012a7ab3c",
    "userId": "664a6b21cde92f0012a7a001",
    "message": "Your itinerary has been flagged.",
    "read": true,
    "createdAt": "2024-06-01T08:00:00.000Z",
    "updatedAt": "2024-06-01T09:00:00.000Z"
  }
}
```
-------------------------------------------------------------------------------------------
## How to Use

A Guide for Tourists, Tour Guides, Advertisers, Sellers, Tourism Governors, and Admins  
Welcome to Explora!   Follow these simple steps to make the most out of your travel experience:
 
For Tourists
1. Sign Up
- Create a new account as a tourist to access personalized features.
2. Profile Management
- Update and View Profile: Easily edit and view your profile information.
- Change Password: Securely update your account password whenever needed.
- Account Deletion: Request account deletion if you no longer wish to use our services.
3. Bookings
- Book Tickets: Effortlessly book flights, transportation, hotels, itineraries, and activities.
- View My Bookings:
o Access details of your upcoming and previous bookings for itineraries, activities, flights, transportation, and hotels.
4. Complaints Management
- Issue Complaints: Submit any concerns or issues you face.
- Track Complaints: View and manage all previously issued complaints.
5. Bookmarks and Wishlist’s
- Bookmark Itineraries and Activities: Save itineraries and activities that interest you for easy access.
- Wishlist Products: Add products to your Wishlist and view your Wishlist items.
- View Purchased Products: Keep track of all products you have purchased.
6. Notifications
- Stay updated with real-time notifications about itineraries or activities you are interested in, including reminders for upcoming releases.
7. Explore and Discover
- Discover exciting destinations, activities, and itineraries tailored to your preferences.
- Browse Products: Explore our wide range of travel products and offerings to suit your travel needs.
8. Cart and Checkout
- Add to Cart: Select and add products to your cart for purchase.
- Checkout: Proceed to checkout to complete your purchases.
- Payment Options: Choose your preferred payment method — via wallet or VISA.
9. Notifications and Updates
- Receive timely updates about new products, bookings, and special offers.
 
For Tour Guides
1. Sign Up
- Create a new account as a tour guide to offer itineraries and services.
2. Profile Management
- Update and View Profile: Easily edit and view your profile information.
- Change Password: Securely update your account password whenever needed.
- Account Deletion: Request account deletion if you no longer wish to use our services.
3. Itinerary Management
- Create Itinerary: Create new itineraries for tourists to book.
- Manage Itineraries: Edit, update, delete and manage your itineraries and bookings.
4. View Statistics
- Access statistics on tourist ratings, preferences, and feedback regarding your itineraries.
5. Notifications
- Receive real-time notifications when:
o One of your itineraries gets flagged for review.
 
For Advertisers
1. Sign Up
- Create a new account as an advertiser.
2. Profile Management
- Update and View Profile: Easily edit and view your profile information.
- Change Password: Securely update your account password whenever needed.
- Account Deletion: Request account deletion if you no longer wish to use our services.
3. Activity Management
- Create Activity: Create new activities for tourists to book.
- Manage Activities: Edit, update, delete and manage your activities and bookings.
4. View Statistics
- Access statistics on tourist ratings, preferences, and feedback regarding your activities.
5. Notifications
- Receive real-time notifications when:
o One of your activities gets flagged for review.
 
For Sellers
1. Sign Up
- Create a new account as a seller.
2. Profile Management
- Update and View Profile: Easily edit and view your profile information.
- Change Password: Securely update your account password whenever needed.
- Account Deletion: Request account deletion if you no longer wish to use our services.
3. Product Management
- Add Products: Add new products for tourists to purchase.
- Manage Products: Edit, update, delete and manage your products and orders.
- View Revenue: View revenue generated from your products.
4. Notifications
- Receive real-time notifications when:
o One of your products is out of stock.
 
For Admins
1. User Management
- Manage Users: Oversee users, roles, and permissions.
2. Dashboard and Analytics
- View Dashboard: Access detailed analytics and statistics on platform usage.
3. Content Management
- Manage Content: Oversee and manage products, activities, and itineraries.
- Resolve Complaints: Handle and resolve user complaints and issues.
- Create Promos: Generate promotional codes for users.
4. View Revenue
- Access insights on revenue generated across the platform.
5. Add Tourism Governors
- Add and manage tourism governors within the system.
 
For Tourism Governors
1. Add Places
- Add new tourist attractions and historical locations.
2. Manage Places
- Edit, update, and manage tourist attractions and historical sites.
 
Start Exploring with Explora
Embark on your next adventure with Explora – whether you're a tourist, tour guide, advertiser, seller, admin, or tourism governor, we make travel planning seamless and enjoyable!

## Contribute

Want to contribute? Great!

Send us a email at explora.contribute@gmail.com
## Credits

[![License](https://img.shields.io/badge/Apache_2.0-orange)](https://www.apache.org/)  

[![License](https://img.shields.io/badge/Amadeus-darkblue)](https://amadeus.com/en)

[![License](https://img.shields.io/badge/Stripe-lightblue)](https://stripe.com/)

[![License](https://img.shields.io/badge/Postman-orange)](https://www.postman.com/)

[![License](https://img.shields.io/badge/ExchangeRate--API-red)](https://www.exchangerate-api.com/)

[![License](https://img.shields.io/badge/Bootstrap-purple)](https://getbootstrap.com/)

[![License](https://img.shields.io/badge/MongoDB_Atlas-green)](https://www.mongodb.com/products/platform/atlas-database)

[![License](https://img.shields.io/badge/Nodemailer-blue)](https://www.nodemailer.com/)




## License

[![License: MIT](https://img.shields.io/badge/MIT-yellow)](https://opensource.org/licenses/MIT)  
