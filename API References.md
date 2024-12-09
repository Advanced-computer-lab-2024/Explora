# Add Rating to Product

- Route: POST /addRating/:id
- Parameters: id

#### Expected Response:
```json
{
  "msg": "Rating added successfully",
  "product": {
    "_id": "12345",
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "reviews": [
      {
        "rating": 4,
        "comment": "No comment provided"
      }
    ],
    "averageRating": 4.0
  }
}
```
-----------------------------------
# Add Review to Product

- Route: POST /addReview/:id
- Parameters:id

### Expected Response:
```json
{
  "msg": "Review added successfully",
  "product": {
    "_id": "12345",
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "reviews": [
      {
        "user": "John Doe",
        "comment": "Great product!"
      }
    ]
  }
}
```
-----------------------------------
# Get New Users Per Month

- Route: GET /new-users-per-month
- Parameters:None

### Expected Response:
```json
[
  {
    "_id": {
      "year": 2024,
      "month": 12
    },
    "count": 50
  },
  {
    "_id": {
      "year": 2024,
      "month": 11
    },
    "count": 40
  },
  {
    "_id": {
      "year": 2024,
      "month": 10
    },
    "count": 30
  }
]
```
-----------------------------------
# Cancel Order

- Route: PATCH /:touristId/orders/:orderId/cancel
- Parameters:touristId,orderId

### Expected Response:
```json
{
  "message": "Order canceled successfully",
  "walletBalance": 500,
  "refundAmount": 200
}
```
-----------------------------------
# View Order Details

- Route: GET /:touristId/orders/:orderId
- Parameters:orderId

### Expected Response:
```json
{
  "orderDetails": {
    "_id": "12345",
    "userId": "touristId123",
    "products": [
      {
        "productId": {
          "name": "Product Name",
          "price": 100
        },
        "quantity": 2
      }
    ],
    "deliveryAddress": {
      "street": "123 Main St",
      "city": "City Name",
      "country": "Country Name"
    },
    "orderStatus": "pending",
    "totalPrice": 200,
    "createdAt": "2024-12-01T00:00:00Z",
    "updatedAt": "2024-12-02T00:00:00Z"
  },
  "orderStatus": "pending",
  "createdAt": "2024-12-01T00:00:00Z",
  "updatedAt": "2024-12-02T00:00:00Z"
}
```
-----------------------------------
# View All Orders for a Tourist

- Route: GET /:touristId/orders
- Parameters:touristId

### Expected Response:
```json
{
  "currentOrders": [
    {
      "_id": "order123",
      "orderStatus": "pending",
      "totalPrice": 200,
      "createdAt": "2024-12-01T00:00:00Z"
    }
  ],
  "pastOrders": [
    {
      "_id": "order124",
      "orderStatus": "completed",
      "totalPrice": 150,
      "createdAt": "2024-11-15T00:00:00Z"
    }
  ]
}
```
-----------------------------------
# Create a Museums or Historical Place

- Route: POST /

- Parameters: 
-- name (String, required, unique)
-- description (String, required)
--pictures (Array of Strings, optional)
--location (String, required)
--openingHours (String, required)
--ticketPrices (Object, required)
--native (Number, required)
--foreigner (Number, required)
--student (Number, required)
--tags (Array of Strings, optional)

###Expected Response:
```json
{
  "_id": "12345",
  "name": "Art and History Museum",
  "description": "A museum showcasing art and history.",
  "pictures": ["https://example.com/picture1.jpg", "https://example.com/picture2.jpg"],
  "location": "Downtown, City",
  "openingHours": "9 AM - 5 PM",
  "ticketPrices": {
    "native": 10,
    "foreigner": 15,
    "student": 5
  },
  "tags": ["Museums", "Monuments"],
  "__v": 0
}
```
-----------------------------------
# Get All Museums and Historical Places

- Route: GET /museums
- Parameters: None

### Expected Response:
```json 
[
  {
    "_id": "12345",
    "name": "Art and History Museum",
    "description": "A museum showcasing art and history.",
    "pictures": ["https://example.com/picture1.jpg"],
    "location": "Downtown, City",
    "openingHours": "9 AM - 5 PM",
    "ticketPrices": {
      "native": 10,
      "foreigner": 15,
      "student": 5
    },
    "tags": ["Museums", "Monuments"]
  }
]
```
-----------------------------------
# Get Museum or Historical Place by Name

- Route: GET /:name
- Parameters: name (String, required)

### Expected Response:

```json
{
  "_id": "12345",
  "name": "Art and History Museum",
  "description": "A museum showcasing art and history.",
  "pictures": ["https://example.com/picture1.jpg"],
  "location": "Downtown, City",
  "openingHours": "9 AM - 5 PM",
  "ticketPrices": {
    "native": 10,
    "foreigner": 15,
    "student": 5
  },
  "tags": ["Museums", "Monuments"]
}
```
-----------------------------------
# Update Museum or Historical Place by ID

- Route: PUT /:id
- Parameters:nid (String, required)

### Expected Response:
```json 
{
  "_id": "12345",
  "name": "Updated Museum Name",
  "description": "Updated description.",
  "pictures": ["https://example.com/updated-picture.jpg"],
  "location": "New Location",
  "openingHours": "10 AM - 6 PM",
  "ticketPrices": {
    "native": 12,
    "foreigner": 18,
    "student": 6
  },
  "tags": ["Museums"]
}
```
-----------------------------------
# Delete Museum or Historical Place by ID

- Route: DELETE /:id
- Parameters:bid (String, required)

### Expected Response:
```json
{
  "message": "Museum not found"
}
```
-----------------------------------
# Create Tour Guide Profile Route: 

- Route: /api/tour_guide_profile/register
- Request Method: POST 

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
"__v": 0 }
```
-----------------------------------
# Get Tour Guide Profile by ID 
- Route: /api/tour_guide_profile/:id 
- Request Method: GET Request: { "id": "string"}
- Body Parameters: None 
- Expected Response: 
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
"idFile": "uploads\1732836072168.png",
"certificatesFile":
"uploads\1732836072181.png",
"imageFile": "uploads\1732836072188.png",
"status": "Accepted",
"createdAt": "2024-11-28T23:21:12.555Z",
"updatedAt": "2024-12-01T23:52:05.955Z",
"__v": 0 
}
```
-----------------------------------
# Update Tour Guide Profile 
- Route: /api/tour_guide_profile/me/:id
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
Expected Response: 
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
-----------------------------------
# Create a New Itinerary
- Route: /api/tour_guide_itinerary/
- Request Method: POST 
- Request: 
- Body Parameters: 
```json
{
"tourGuideName": "John Doe",
"tourGuideId": "6748fae835a3fa0479d4a088",
"activities": [ { "duration": 120, "date": "2024-07-01", "time": "10:00" }, { "duration": 90, "date": "2024-07-02", "time": "14:00" } ], "locations": "Cairo, Giza Pyramids, Egyptian Museum", "timeline": "2-day cultural tour covering major attractions", "duration": 2, "language": "English", "price": 150, "availableDates": ["2024-07-01", "2024-07-02"], "availableTimes": ["10:00", "14:00"], "accessibility": true, "pickupLocation": "Cairo Airport", "dropoffLocation": "Giza Pyramids", "hasBookings": false, "tags": ["cultural", "history", "adventure"] 
}
```
Expected Response Example: 
```json
{ 
"tourGuideName": "John Doe",
"tourGuideId": "6748fae835a3fa0479d4a088", 
"activities":
[
    { 
    "duration": 120, 
    "date": "2024-07-01T00:00:00.000Z",
    "time": "10:00",
    "_id": "6754b7c1420909de67705296"
    },
    { "duration": 90,
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
"availableDates": 
[
    "2024-07-01T00:00:00.000Z",
    "2024-07-02T00:00:00.000Z" 
], 
"availableTimes":
[
    "10:00",
    "14:00" 
], 
"accessibility": true, 
"pickupLocation": "Cairo Airport", 
"dropoffLocation": "Giza Pyramids", 
"hasBookings": false,
"isActive": true, 
"tags": 
[
    "cultural",
    "history",
    "adventure"
],
"rating": 0,
"isDeleted": false, 
"flagged": false, 
"_id": "6754b7c1420909de67705295",
"__v": 0 }
```
-----------------------------------
# Get Itineraries by Tour Guide ID
- Route: /api/tour_guide_itinerary 
- Request Method: GET 
- Request: 
- Query Parameters: { "tourGuideId": "6748fae835a3fa0479d4a088" } 
- Expected Response:
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
        "availableDates": [ "2024-12-05T00:00:00.000Z" ], 
        "availableTimes": [ "13:35" ], 
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
-----------------------------------
# Update an Itinerary by ID 
- Route: http://localhost:4000/api/tour_guide_itinerary/:id 
- Request Method: PUT 
- Request: URL Parameter: "_id": "6754bb26420909de67705299" 
- Request Body: 
```json 
{ 
"tourGuideName": "John Doe", 
"activities":   [
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
Expected Response: 
```json
{ 
"_id": "6754bb26420909de67705299", 
"tourGuideName": "John Doe",
"tourGuideId": "6748fae835a3fa0479d4a088",
"activities":   [
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
"availableDates": [ "2024-08-01T00:00:00.000Z" ], 
"availableTimes": [ "11:00" ], 
"accessibility": true, 
"pickupLocation": "Luxor Airport", 
"dropoffLocation": "Karnak Temple", 
"hasBookings": false, 
"isActive": true, 
"tags": [ "ancient", "cultural" ], 
"rating": 0, 
"isDeleted": false, 
"flagged": false, 
"__v": 1 
}
```
-----------------------------------
# Delete an Itinerary by ID 
- Route: /api/tour_guide_itinerary/:id 
- Request Method: DELETE 
- Request: URL Parameter: id : "6754bb26420909de67705299" 
- Expected Response: 
```json
{ 
"msg": "Itinerary removed successfully" 
}
```
-----------------------------------
# Get Itinerary by ID 
- Route: /api/tour_guide_itinerary/:id 
- Request Method: GET
- Request: URL Parameter: id: "6754bb26420909de67705299" 
- Expected Response:
```json
{
"_id": "6754bb26420909de67705299",
"tourGuideName": "John Doe",
"tourGuideId": "6748fae835a3fa0479d4a088",
"activities":   [
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
"availableDates": [ "2024-08-01T00:00:00.000Z" ],
"availableTimes": [ "11:00" ],
"accessibility": true,
"pickupLocation": "Luxor Airport",
"dropoffLocation": "Karnak Temple",
"hasBookings": false, 
"isActive": true,
"tags": [ "ancient", "cultural" ],
"rating": 0,
"isDeleted": false,
"flagged": false,
"__v": 1 
}
```
-----------------------------------
# Request Account Deletion 
- Route: Request/requestDeletion
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
-----------------------------------
# Deactivate Itinerary 
- Route: /api/tour_guide_itinerary/:id/deactivate
- Request Method: PUT
- Request: URL Parameter: id: "6749a7a40d9e637f9c7cc0b8"
- Expected Response: 
```json
{
"message": "Itinerary deactivated successfully."
}
```
-----------------------------------
# Accept Terms 
- Route: /api/tour_guide_profile/accept-terms/:id
- Request Method: PUT
- Request: URL Parameter: id: "6748fae835a3fa0479d4a088"
- Expected Response: 
```json 
{
"msg": "Terms accepted successfully"
}
```
-----------------------------------
# Rate and Comment on a Tour Guide
- Route: /reviews/rateTourGuide
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
"review":   {
                "tourGuide": "674cfa7ea54a6ecc374e2ea9", 
                "tourist": "674d0772a54a6ecc374e2f35", 
                "rating": 5, 
                "comment": "very good",
                "_id": "6754e71ff92fc61705823126", 
                "date": "2024-12-08T00:23:59.226Z"
            }
}
```
-----------------------------------
# Rate and Comment on an Itinerary 
- Route: reviews/rateItinerary 
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
"itinerary":    {
                    "_id": "6754bb26420909de67705299",
                    "tourGuideName": "John Doe",
                    "tourGuideId": "6748fae835a3fa0479d4a088",
                    "activities":   [
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
                    "availableDates": [ "2024-08-01T00:00:00.000Z" ], 
                    "availableTimes": [ "11:00" ], 
                    "accessibility": true, 
                    "pickupLocation": "Luxor Airport", 
                    "dropoffLocation": "Karnak Temple", 
                    "hasBookings": false, 
                    "isActive": true, 
                    "tags": [ "ancient", "cultural" ], 
                    "rating": 5, 
                    "isDeleted": false, 
                    "flagged": false, 
                    "__v": 1, 
                    "comment": 
                    "very good" 
                } 
}
```
# Get Previous Itineraries
- Route: /api/tour_guide_itinerary/previous 
- Request Method: GET 
- Request: 
- Expected Response: 
```json
{
"_id": "67324673bd5e0b9fdcdba05c", 
"tourGuideName": "John Doe", 
"activities":   [
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
"availableDates": [ "2024-11-15T00:00:00.000Z", "2024-11-16T00:00:00.000Z" ], "availableTimes": [ "10:00 AM", "2:00 PM" ], 
"accessibility": true, 
"pickupLocation": "Paris Hotel", 
"dropoffLocation": "Eiffel Tower", 
"hasBookings": false, 
"isActive": true, 
"tags": [ "tour", "adventure", "paris" ], 
"rating": 0, 
"isDeleted": false, 
"flagged": true, 
"__v": 0 }

```
# Get All Itineraries
- Route: /api/tour_guide_itinerary/all
- Request Method: GET 
- Request: 
- Expected Response:
```json
{
"_id": "6754bb26420909de67705299",
"tourGuideName": "John Doe",
"tourGuideId": "6748fae835a3fa0479d4a088",
"activities":   [
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
"availableDates": [ "2024-08-01T00:00:00.000Z" ], 
"availableTimes": [ "11:00" ], 
"accessibility": true, 
"pickupLocation": "Luxor Airport", 
"dropoffLocation": "Karnak Temple", 
"hasBookings": false, 
"isActive": true, 
"tags": [ "ancient", "cultural" ], 
"rating": 5, 
"isDeleted": false, 
"flagged": false, 
"__v": 1, 
"comment": "very good" 
}
```
-----------------------------------
# Get Upcoming Itineraries 
- Route: /api/tour_guide_itinerary/upcoming
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
"availableDates": [ "2024-12-31T00:00:00.000Z" ],
"availableTimes": [ "14:22" ], 
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
-----------------------------------
# Get Loyalty Points for a User
- Route: /users/loyalty-points/:userId
- Request Method: GET
- Request: URL Parameter: userId: "674d0772a54a6ecc374e2f35"
- Expected Response: 
```json
{
"loyaltyPoints": 250019312.5
}
```
-----------------------------------
# User Login
- Route: /api/auth/
- Request Method: POST
- Request: Body Parameters: 
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
-----------------------------------
# Fetch Sales Records for a Tour Guide 
- Route: /api/ 
- Request Method: GET 
- Query Parameters: tourGuideId: 674cfa7ea54a6ecc374e2ea9 
- Expected Response: 
```json
{
"message": "Sales records retrieved successfully", 
"sales":
        [
        {
        "_id": "674dc4eb4526b9cae9d05cb8", 
        "tourGuideId": "674cfa7ea54a6ecc374e2ea9", 
        "itineraryId":  {
                            "_id": "674cfaefa54a6ecc374e2eb4", 
                            "locations": "India", 
                            "price": 150, 
                            "availableDates": [ "2025-03-01T00:00:00.000Z" ]
                        },
        "touristId":    {
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
-----------------------------------
# Fetch Tourists Who Booked a Tour Guide's Itinerary
- Route: /api/report/ 
- Request Method: GET 
- Query Parameters: tourGuideId: 674cfa7ea54a6ecc374e2ea9 
- Expected Response: 
```json
{ 
"message": "Tourists who booked the itinerary", 
"touristDetails": [ 
                        {
                        "touristName": "didi", 
                        "itineraryLocations": "India", 
                        "itineraryDate": [ "2025-03-01T00:00:00.000Z" ] 
                        },
                    ]
}
```
-----------------------------------
# Flag or Unflag an Itinerary 
- Route: http://localhost:4000/api/itineraries/:id/flag
- Request Method: PATCH Path 
- Parameters id: 67324673bd5e0b9fdcdba05c 
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
    "message": "Your itinerary 'Itinerary Title' has been flagged.", "itineraryId": "itineraryId" 
}
```
Email:
```json
{ 
        Subject: Itinerary has been Flagged

            Dear Tour Guide Name,
            
                Your itinerary titled "Itinerary Title" has been flagged.  
                Please review it.
            
            Sincerely,  
            Explora Team
}
```
-----------------------------------
# Fetch Notifications for a User
- Route: /api/notifications/notifications
- Request Method: GET 
- Request: Query Parameters: { "userId": "string" } 
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
-----------------------------------
# Mark Notification as Read 
- Route: http://localhost:4000/api/notifications/:id/read 
- Request Method: PATCH 
- Request: URL Parameters: { "id": "string" } // Notification ID
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
-----------------------------------
# Update the Tourist's Information
- Route:https://localhost:4000/api/tourists/update/:id
- Request Method: PUT
- Request:
- Parameter:id
 { "name": "Updated Name", "email": "updated@example.com"}
 
Expected Response:
```json
{
    "_id": "60f3b3b3b3b3b3b3b3b3b3b3",
    "name": "Updated Name",
    "email": "updated@example.com",
    "dob": "1990-01-01"
}
```
-----------------------------------
# Retrieve Tourist by ID
- Route: https://localhost:4000/api/tourists/id/:id
- Request Method: GET
- Parameter:id
```json
{
    "_id": "60f3b3b3b3b3b3b3b3b3b3b3",
    "name": "Tourist Name",
    "email": "tourist@example.com",
    "dob": "1990-01-01"
}
```
-----------------------------------
# Retrieve Upcoming Activities
- Route: http://localhost:4000/api/activity/upcoming
- Request Method: GET
- Request: No parameters required.
- Expected Response:
``` json
[
    {
        "_id": "60f3b3b3b3b3b3b3b3b3b3b3",
        "name": "Hiking Trip",
        "date": "2024-12-10",
        "location": "Mountain Trails",
        "category": "Outdoor",
        "tags": ["adventure", "nature"]
    },
    {
        "_id": "60f3b3b3b3b3b3b3b3b3b3b4",
        "name": "Cooking Workshop",
        "date": "2024-12-15",
        "location": "Downtown Kitchen",
        "category": "Learning",
        "tags": ["cooking", "skills"]
    }
]
```
-----------------------------------
# Retrieve Upcoming Itineraries
- Route: http://localhost:4000/api/tour_guide_itinerary/upcoming
- Request Method: GET
- Request: No parameters required.
- Expected Response:
```json
[
    {
        "_id": "60f3b3b3b3b3b3b3b3b3b3b3",
        "title": "Historic City Tour",
        "availableDates": "2024-12-10",
        "guideName": "John Doe",
        "location": "Old Town",
        "tags": ["history", "culture"]
    },
    {
        "_id": "60f3b3b3b3b3b3b3b3b3b3b4",
        "title": "Sunset Beach Walk",
        "availableDates": "2024-12-15",
        "guideName": "Jane Smith",
        "location": "Seaside",
        "tags": ["nature", "relaxation"]
    }
]
```
-----------------------------------
# Retrieve All Touristic Sites
- Route: https://localhost:4000/api/museums/museums
- Request Method: GET
- Request: No parameters required.
Expected Response:
```json
[
    {
        "_id": "60f3b3b3b3b3b3b3b3b3b3b3",
        "name": "Art Museum",
        "location": "Downtown",
        "description": "A museum featuring modern and classical art exhibits.",
        "tags": ["art", "culture", "history"]
    },
    {
        "_id": "60f3b3b3b3b3b3b3b3b3b3b4",
        "name": "Natural History Museum",
        "location": "City Center",
        "description": "Explore the history of life on Earth through stunning exhibits.",
        "tags": ["history", "nature", "education"]
    }
]
```
-----------------------------------
# Retrieve All Products
- Route: https://localhost:4000/Products/
- Request Method: GET
- Request: No parameters required.
Expected Response:
```json
[
    {
        "_id": "60f3b3b3b3b3b3b3b3b3b3b3",
        "name": "Laptop",
        "price": 1200,
        "description": "A high-performance laptop for professionals.",
        "image": "http://localhost:4000/laptop.jpg"
    },
    {
        "_id": "60f3b3b3b3b3b3b3b3b3b3b4",
        "name": "Smartphone",
        "price": 800,
        "description": "A smartphone with the latest features.",
        "image": "http://localhost:4000/smartphone.jpg"
    }
]
```
-----------------------------------
# Book Flight Using Wallet
- Route: http://localhost:4000/flights/bookWallet
- Request Method: POST
- Request:
- Body Parameters:
```json
{
    "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
    "searchId": "123456",
    "flightId": "abcdef",
    "promoCode": "DISCOUNT20"
}
```
Expected Response:
```json
{
    "message": "Flight booked successfully",
    "bookingDetails": {
        "_id": "60f3b3b3b3b3b3b3b3b3b3b3",
        "tourist": "60f3b3b3b3b3b3b3b3b3b3b3",
        "origin": "JFK",
        "destination": "LHR",
        "date": "2024-12-15T10:00:00Z",
        "flightNumber": "JFKLHRabcdef",
        "time": "2024-12-15T10:00:00Z",
        "duration": "7h 30m",
        "arrivalTime": "2024-12-15T17:30:00Z",
        "price": 1000
    },
    "discountedPrice": 800
}
```
-----------------------------------
# Book Transportation Using Wallet
- Route: http://localhost:4000/transportationBook/bookWallet
- Request Method: POST
- Request:
- Body Parameters:
```json
{
    "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
    "transportationId": "abcdef12345",
    "seats": 3,
    "promoCode": "TRANSPROMO20"
}
```
Expected Response:
```json
{
    "tourist": "60f3b3b3b3b3b3b3b3b3b3b3",
    "transportation": "abcdef12345",
    "method": "Bus",
    "seatsBooked": 3,
    "totalPrice": 150
}
```
-----------------------------------
# Book Hotel Using Wallet
- Route: http://localhost:4000/hotels/bookWallet
- Request Method: POST
- Request:
- Body Parameters:
```json
{
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "searchId": "search123",
  "hotelId": "hotelabc123",
  "promoCode": "HOTELPROMO10"
}
```
Expected Response:
```json
{
  "message": "Hotel booked successfully",
  "bookingDetails": {
    "id": "reservationid12345",
    "tourist": "60f3b3b3b3b3b3b3b3b3b3b3",
    "cityCode": "NYC",
    "checkInDate": "2024-12-10",
    "checkOutDate": "2024-12-15",
    "hotelName": "Grand Central Hotel",
    "reservationNumber": "hotelabc123-60f3b3b3b3b3b3b3b3b3b3b3-1634234567890",
    "price": "150.00 $"
  }
}
```
-----------------------------------
# Book Activity Using Wallet
- Route: http://localhost:4000/api/activity/bookWallet
- Request Method: POST
- Request:
- Body Parameters:
```json
{
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "activityId": "activityabc123",
  "promoCode": "ACTIVITYPROMO20"
}
```
Expected Response:
```json
{
  "tourist": "60f3b3b3b3b3b3b3b3b3b3b3",
  "activity": "activityabc123",
  "name": "City Tour",
  "date": "2024-12-10",
  "time": "10:00 AM",
  "rating": 4.5,
  "location": "Downtown City",
  "price": 80.00,
  "category": "Sightseeing",
  "tags": ["tour", "sightseeing", "city"],
  "_id": "bookingid12345"
}
```
-----------------------------------
# Book Itinerary Using Wallet
- Route: http://localhost:4000/api/tour_guide_itinerary/bookWallet
- Request Method: POST
- Body Parameters:
```json
{
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "itineraryId": "60e1a7c5f91f4b4b1e4623ad",
  "promoCode": "DISCOUNT20"
}
```
Expected Response:
```json
{
  "_id": "bookingid12345",
  "tourist": "60f3b3b3b3b3b3b3b3b3b3b3",
  "itinerary": "60e1a7c5f91f4b4b1e4623ad",
  "tourGuideName": "John Doe",
  "activities": ["Sightseeing", "Museum Visit"],
  "locations": ["City Center", "Old Town"],
  "timeline": ["09:00 AM - Start", "05:00 PM - End"],
  "duration": 2,
  "language": "English",
  "price": 150.00,
  "availableDates": ["2024-12-12"],
  "pickupLocation": "Tourist Hotel",
  "dropoffLocation": "Tourist Hotel",
  "tags": ["history", "culture"],
  "rating": 4.5
}
```
-----------------------------------
# Get Upcoming Booked Itineraries
- Route: http://localhost:4000/api/tour_guide_itinerary/upcomingBookedItineraries/:touristId
- Params:touristId
- Request Method: GET
- Expected Response:
```json
{
  "futureItineraries": [
    {
      "_id": "bookingid12345",
      "tourist": "60f3b3b3b3b3b3b3b3b3b3b3",
      "itinerary": {
        "_id": "60e1a7c5f91f4b4b1e4623ad",
        "tourGuideName": "John Doe",
        "locations": ["City Center", "Old Town"],
        "duration": 2,
        "price": 150.00,
        "availableDates": ["2024-12-12"]
      }
    },
    {
      "_id": "bookingid67890",
      "tourist": "60f3b3b3b3b3b3b3b3b3b3b3",
      "itinerary": {
        "_id": "60e1a7c5f91f4b4b1e4623ae",
        "tourGuideName": "Jane Smith",
        "locations": ["Beach", "Museum"],
        "duration": 3,
        "price": 180.00,
        "availableDates": ["2024-12-15"]
      }
    }
  ]
}
```
-----------------------------------
# Get Past Booked Itineraries
- Route: http://localhost:4000/api/tour_guide_itinerary/pastBookedItineraries/:touristId
- Request Method: GET
- params:touristId
- Expected Response:
```json
{
  "pastItineraries": [
    {
      "_id": "bookingid12345",
      "tourist": "60f3b3b3b3b3b3b3b3b3b3b3",
      "itinerary": {
        "_id": "60e1a7c5f91f4b4b1e4623ad",
        "tourGuideName": "John Doe",
        "locations": ["City Center", "Old Town"],
        "duration": 2,
        "price": 150.00,
        "availableDates": ["2024-12-01"]
      }
    },
    {
      "_id": "bookingid67890",
      "tourist": "60f3b3b3b3b3b3b3b3b3b3b3",
      "itinerary": {
        "_id": "60e1a7c5f91f4b4b1e4623ae",
        "tourGuideName": "Jane Smith",
        "locations": ["Beach", "Museum"],
        "duration": 3,
        "price": 180.00,
        "availableDates": ["2024-11-25"]
      }
    }
  ]
}
```
-----------------------------------
# Cancel and Refund Itinerary
- Route: http://localhost:4000/api/tour_guide_itinerary/return
- Request Method: DELETE
- Request Body:
```json
{
  "itineraryId": "60e1a7c5f91f4b4b1e4623ad",
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3"
}
```
Response:
```json
{
  "message": "Itinerary canceled and money refunded"
}
```
----------------------------------
# Remove Bookmarked Event
- Route: http://localhost:4000/api/tour_guide_itinerary/bookmark/:touristId/:eventId
- Request Method: DELETE
- Request Parameters:
---touristId: ID of the tourist
---eventId: ID of the event to be removed from bookmarks
----------------------------------
# Bookmark Event
- Route: http://localhost:4000/api/tour_guide_itinerary/bookmark/:touristId
- Request Method: POST
- Request Body:
```json
{
  "eventId": "event_id_here"
}
```
Request Parameters: touristId: ID of the tourist
Response:
```json
{
  "message": "Activity bookmarked successfully"
}
```
or
```json
{
  "message": "Itinerary bookmarked successfully"
}
```
--------------------------------------
# Book Flight Using Stripe
Route: http://localhost:4000/flights/bookStripe
Request Method: POST
Request Parameters:
```json
{
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "searchId": "searchabc123",
  "flightId": "flightxyz456",
  "frontendUrl": "http://localhost:3000",
  "promoCode": "FLIGHTPROMO20"
}
```
Response:
```json
{
  "url": "https://checkout.stripe.com/session/abc12345"
}
```
--------------------------------------
# Book Hotel Using Stripe
- Route: http://localhost:4000/hotels/bookStripe
- Request Method: POST
- Request Parameters:
```json
{
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "searchId": "searchabc123",
  "hotelId": "hotelxyz456",
  "frontendUrl": "http://localhost:3000",
  "promoCode": "HOTELPROMO20"
}
```
Response:
```json
{
  "url": "https://checkout.stripe.com/session/abc12345"
}
```
----------------------------------------
# Book Itinerary Using Stripe
- Route: http://localhost:4000/tour_guide_itinerary/bookStripe
- Request Method: POST
- Request Parameters:
```json
{
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "itineraryId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "frontendUrl": "http://localhost:3000",
  "promoCode": "PROMO20"
}
```
Response:
```json
{
  "url": "https://checkout.stripe.com/session/abc12345"
}
```
-------------------------------------
# Book activity Using Stripe
- Route: http://localhost:4000/activity/bookStripe
- Request Method: POST
- Request Parameters:
```json
{
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "activityId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "frontendUrl": "http://localhost:3000",
  "promoCode": "PROMO20"
}
```
Response:
```json
{
  "url": "https://checkout.stripe.com/session/abc12345"
}
```
---------------------------------------
# Book Transportation Using Stripe
- Route: http://localhost:4000/transportationBooking/bookStripe
- Request Method: POST
- Request Parameters:
```json
{
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "transportationId": "60f3b3b3b3b3b3b3b3b3b3b3",
  seats:1 //default 1 
  "frontendUrl": "http://localhost:3000",
  "promoCode": "PROMO20"
}
```
Response:
```json
{
  "url": "https://checkout.stripe.com/session/abc12345"
}
```
---------------------------------------
# Get Notifications for a Tourist
- Route: http://localhost:4000/api/tour_guide_itinerary/notification/:id
- Request Method: GET
- Request Parameters: id: touristId (ID of the tourist)
- Response:
```json
{
  "notifications": [
    {
      "_id": "notification_id_here",
      "tourist": "tourist_id_here",
      "event": "activity",
      "date": "2024-12-12T00:00:00.000Z",
      "message": "The event that you bookmarked has started taking bookings!"
    },
    {
      "_id": "notification_id_here",
      "tourist": "tourist_id_here",
      "event": "itinerary",
      "date": "2024-12-15T00:00:00.000Z",
      "message": "The event that you bookmarked has started taking bookings!"
    }
  ]
}
```
-----------------------------------
# Get Sales for a Specific Advertiser,
- route: "http://localhost:4000/api/sal",
- request_method": "GET",
- request:
- query parameters: "advertiserId": "string // The ID of the advertiser whose sales are to be retrieved."
expected response:
```json
{
    "message": "Sales records retrieved successfully",
    "sales": [
      {
        "_id": "624fae28fbb5f30005c3ad1a",
        "advertiserId": "5b3b6a7e0d6b720013ae8002",
        "touristId": {
          "_id": "609e1bc8b72f4c00001cd6b1",
          "username": "tourist_username",
          "email": "tourist@example.com"
        },
        "activityId": {
          "_id": "609e1bb6b72f4c00001cd6a5",
          "name": "Hiking Tour",
          "price": 100,
          "date": "2024-05-15T08:00:00.000Z",
          "location": "Mountain Range"
        },
        "amount": 100
      }
    ]
}
```
-----------------------------------------------   
# Get Sales for a Specific Seller
- route: "http://localhost:4000/api/sellersales",
- request method: GET
- request: 
- query parameters: "seller": "string // The ID of the seller whose sales are to be retrieved."
- expected response:
```json
{
    "message": "Sales records retrieved successfully",
    "sales": [
    {
        "_id": "634b80e1e34e4d002d8c99b6",
        "seller": "603e72f13e5f1d001f9e9c9d",
        "touristId": {
          "_id": "609e1bc8b72f4c00001cd6b1",
          "username": "tourist_username",
          "email": "tourist@example.com"
    },
        "productId": {
          "_id": "608b0cf64f1c1e001f3f9d3f",
          "name": "Trekking Backpack",
          "price": 50
        },
        "amount": 50,
      }
    ]
}
```
-----------------------------------------------   
# Get Tourists Who Booked a Specific Advertiser's Activity
- route: "http://localhost:4000/api/report2/
- request method: GET
- request: 
- query parameters: "advertiserId": "string // The ID of the advertiser whose bookings are to be fetched."
- expected response:
```json
{
    "message": "Tourists who booked the activity",
    "touristDetails": [
      {
        "touristName": "John Doe",
        "touristEmail": "john.doe@example.com",
        "itineraryLocations": "Mountain Trek",
        "itineraryDate": "2024-06-15T08:00:00.000Z"
      }
    ]
```
-----------------------------------------------   
# Get Notifications for advertiser
- route: "http://localhost:4000/api/anotifications
- request method: GET
- request:
- query parameters: "userId": "string // The ID of the user whose notifications are to be retrieved.
- expected response:
```json
{
    "message": "Notifications retrieved successfully",
    "anotifications": [
      {
        "_id": "64adf5b0b7f9a2f01e9c1234",
        "userId": "64adf5b0b7f9a2f01e9c1111",
        "message": "Your tour is confirmed.",
        "read": false,
        "createdAt": "2024-06-10T08:30:00.000Z",
        "updatedAt": "2024-06-10T08:35:00.000Z"
      }
    ]
  }
```
-----------------------------------------------   
# Mark Notification as Read for advertisers
- route: "http://localhost:4000/api/anotifications/:id/aread
- request_method: PATCH
- request: url parameters: "id": "string // The ID of the notification to be marked as read.
- expected response: 
```json
{
    "message": "Notification marked as read.",
    "anotification": {
      "_id": "64adf5b0b7f9a2f01e9c1234",
      "userId": "64adf5b0b7f9a2f01e9c1111",
      "message": "Your tour is confirmed.",
      "read": true,
      "createdAt": "2024-06-10T08:30:00.000Z",
      "updatedAt": "2024-06-10T08:35:00.000Z"
    }
}
```
-----------------------------------------------
# Get Notifications for a Seller
- route: "http://localhost:4000/api/anotifications2"
- request method: GET
- request: query_parameters": userId: string // The ID of the user whose notifications are to be retrieved.
- expected response: 
```json
{
    "message": "Notifications retrieved successfully",
    "anotifications": [
      {
        "_id": "64adf5b0b7f9a2f01e9c1234",
        "userId": "64adf5b0b7f9a2f01e9c1111",
        "message": "Your tour is confirmed.",
        "read": false,
        "createdAt": "2024-06-10T08:30:00.000Z",
        "updatedAt": "2024-06-10T08:35:00.000Z"
      }
    ]
}
```
-----------------------------------------------
# Mark Notification as Read for seller
- route: http://localhost:4000/api/anotifications2/:id/aread2
- request method: PATCH
- request: url_parameters: id: string // The ID of the notification to be marked as read
- expected response: 
```json
{
    "message": "Notification marked as read.",
    "anotification": {
      "_id": "64adf5b0b7f9a2f01e9c1234",
      "userId": "64adf5b0b7f9a2f01e9c1111",
      "message": "Your tour is confirmed.",
      "read": true,
      "createdAt": "2024-06-10T08:30:00.000Z",
      "updatedAt": "2024-06-10T08:35:00.000Z"
    }
}
```
-----------------------------------------------   
# Book Tickets for Activities
- route: http://localhost:4000/ticketact/bookact
- request method: POST
- request: body: 
```json
{
      "userId": "string // The ID of the tourist who is booking the activity",
      "activityId": "string // The ID of the activity being booked",
      "numberOfTickets": "number // The number of tickets to be booked"
}
```
expected response:
```json
{
    "message": "Booking and sale recorded successfully",
    "booking": {
      "_id": "64adf5b0b7f9a2f01e9c1234",
      "tourist": "64adf5b0b7f9a2f01e9c1111",
      "activity": "64adf5b0b7f9a2f01e9c2222",
      "numberOfTickets": 2,
      "totalPrice": 200,
      "advertiserId": "64adf5b0b7f9a2f01e9c3333",
      "createdAt": "2024-06-10T08:00:00.000Z",
      "updatedAt": "2024-06-10T08:10:00.000Z"
    },
    "sale": {
      "_id": "64adf5b0b7f9a2f01e9c4444",
      "advertiserId": "64adf5b0b7f9a2f01e9c3333",
      "activityId": "64adf5b0b7f9a2f01e9c2222",
      "touristId": "64adf5b0b7f9a2f01e9c1111",
      "amount": 200,
      "createdAt": "2024-06-10T08:00:00.000Z"
    },
    "loyaltyPoints": 500
  }
```
-----------------------------------------------   
# Purchase Product
- Route: http://localhost:4000/buy/purchase
- request_method: POST
- request: body:
```json
{
      "userId": "string // The ID of the tourist who is purchasing the product",
      "productId": "string // The ID of the product being purchased",
      "quantity": "number // The number of units of the product being purchased"
}
```
expected response: 
```json
{
    "message": "Purchase recorded successfully.",
    "purchase": {
      "_id": "64adf5b0b7f9a2f01e9c1234",
      "tourist": "64adf5b0b7f9a2f01e9c1111",
      "product": "64adf5b0b7f9a2f01e9c2222",
      "quantity": 3,
      "totalPrice": 150,
      "seller": "64adf5b0b7f9a2f01e9c3333",
      "createdAt": "2024-06-10T08:00:00.000Z",
      "updatedAt": "2024-06-10T08:10:00.000Z"
    },
    "sale": {
      "_id": "64adf5b0b7f9a2f01e9c4444",
      "seller": "64adf5b0b7f9a2f01e9c3333",
      "productId": "64adf5b0b7f9a2f01e9c2222",
      "touristId": "64adf5b0b7f9a2f01e9c1111",
      "amount": 150,
      "createdAt": "2024-06-10T08:00:00.000Z"
    }
}
```
-----------------------------------------------   
### View All Users
URL: http://localhost:5173/users
Method: GET
Description: Fetches a list of all users.
Responses:
    200: List of users.
    500: Internal server error.
-----------------------------------------------   
### Download ID File
URL: http://localhost:5173/users/ID/:id
Method: GET
Description: Downloads the ID file associated with a user.
Responses:
    200: File downloaded.
    404: User not found.
    500: Internal server error.
------------------------------------------------
### Download Certificate File
URL: http://localhost:5173/users/Certificate/:id
Method: GET
Description: Downloads the certificates file for a user.
Responses:
    200: File downloaded.
    404: User not found.
    500: Internal server error.
------------------------------------------------
### Download Tax File
URL: http://localhost:5173/users/Tax/:id
Method: GET
Description: Downloads the tax file for a user.
Responses:
    200: File downloaded.
    404: User not found.
    500: Internal server error.
-------------------------------------------------
### Update User Status
URL: http://localhost:5173/users/updateStatus/:id
Method: PUT
Description: Updates the status of a user.
Request Body:
```json
{
  "status": "string"
}
```
Responses:
    200: Status updated.
    404: User not found.
    500: Internal server error.
----------------------------------------------------
### Delete User
URL: http://localhost:5173/users/:id
Method: DELETE
Description: Deletes a user and performs cleanup tasks based on role.
Responses:
    200: User deleted.
    404: User not found.
    500: Internal server error.
----------------------------------------------------
### Send Email Verification Code
URL: /http://localhost:5173/users/forget-password
Method: POST
Description: Sends a reset password email with a verification code.
Request Body:
```json
{
  "email": "string"
}
```
Responses:
    200: Email sent.
    404: User not found.
    500: Internal server error.
-------------------------------------------------------
### Verify Code
URL: http://localhost:5173/users/verify-email
Method: POST
Description: Verifies the code sent for password reset.
Request Body:
```json
{
  "email": "string",
  "code": "string"
}
```
Responses:
    200: Verification successful.
    400: Invalid or expired code.
    404: User not found.
    500: Internal server error.
-------------------------------------------------------
-------------------------------------------------------
### Create Admin Account
URL: http://localhost:5173/Admins
Method: POST
Description: Creates a new admin account.
Request Body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
Responses:
    201: Admin created successfully.
    400: Invalid input.
    500: Internal server error.
---------------------------------------------------------
### Delete Admin Account
URL: http://localhost:5173/Admins/:username
Method: DELETE
Description: Deletes an admin account by username.
Responses:
    200: Admin deleted successfully.
    404: Admin not found.
    500: Internal server error.
-----------------------------------------------------------
### View Deletion Requests
URL: http://localhost:5173/Admins/delete-requests
Method: GET
Description: Retrieves all user deletion requests.
Responses:
    200: List of deletion requests.
    500: Internal server error.
-----------------------------------------------------------
### Accept Deletion Request
URL: http://localhost:5173/Admins/accept-request/:id
Method: PUT
Description: Marks a deletion request as resolved.
Responses:
    200: Request marked as resolved.
    404: Request not found.
    500: Internal server error.
-----------------------------------------------------------
### Delete User
URL: http://localhost:5173/Admins/delete-user/:username
Method: DELETE
Description: Deletes a user account and its corresponding deletion request.
Responses:
    200: User and request deleted successfully.
    404: User or request not found.
    500: Internal server error.
----------------------------------------------------------
----------------------------------------------------------
### Create Activity Category
URL: http://localhost:5173/ActivityCategories
Method: POST
Description: Creates a new activity category.
Request Body:
```json
{
  "activityType": "string"
}
```
Responses:
    201: Activity category created successfully.
    400: Activity category already exists.
    500: Internal server error.
----------------------------------------------------------
### Get All Activity Categories
URL: http://localhost:5173/ActivityCategories
Method: GET
Description: Fetches all activity categories.
Responses:
    200: List of activity categories.
    500: Internal server error.
----------------------------------------------------------
### Update Activity Category
URL: http://localhost:5173/ActivityCategories/:activityType
Method: PUT
Description: Updates an existing activity category.
Request Parameters:
activityType (string): The current name of the activity category to update.
Request Body:
```json
{
  "newActivityType": "string"
}
```
Responses:
    200: Activity category updated successfully.
    400: New activity type is required.
    404: Activity category not found.
    500: Internal server error.
----------------------------------------------------------
----------------------------------------------------------
### Create a Preference Tag
URL: http://localhost:5173/PrefrenceTag
Method: POST
Description: Creates a new preference tag.
Request Body:
```json
{
  "tag": "string"
}
```
Responses:
201: Preference tag created successfully.
400: Preference tag already exists or invalid input.
500: Internal server error.
--------------------------------------------------------
### Read All Preference Tags
URL: http://localhost:5173/PrefrenceTag
Method: GET
Description: Retrieves all preference tags.
Responses:
200: List of all preference tags.
500: Internal server error.
--------------------------------------------------------
### Update a Preference Tag
URL: http://localhost:5173/PrefrenceTag/:oldTag
Method: PUT
Description: Updates an existing preference tag.
Request Parameters:
oldTag: The current tag to be updated.
Request Body:
```json
{
  "newTag": "string"
}
```
Responses:
200: Preference tag updated successfully.
400: New tag is required.
404: Preference tag not found.
500: Internal server error.
-----------------------------------------------------
### Delete a Preference Tag
URL: http://localhost:5173/PrefrenceTag/:tag
Method: DELETE
Description: Deletes a preference tag.
Request Parameters:
tag: The tag to be deleted.
Responses:
200: Preference tag deleted successfully.
404: Preference tag not found.
500: Internal server error.
-----------------------------------------------------
-----------------------------------------------------
### Add Complaint
URL: http://localhost:5173/complaints/:user
Method: POST
Description: Adds a new complaint for a user.
Request Parameters:
user (string): The ID of the user creating the complaint.
Request Body:
```json
{
  "title": "string",
  "body": "string"
}
```
Responses:
    201: Complaint created successfully.
    400: Title and body are required.
    500: Internal server error.
-----------------------------------------------------------
### Get All Complaints
URL: http://localhost:5173/complaints
Method: GET
Description: Fetches all complaints.
Responses:
    200: List of complaints.
    500: Internal server error.
----------------------------------------------------------
### Get Complaint by ID
URL: http://localhost:5173/complaints/:id
Method: GET
Description: Fetches a specific complaint by its ID.
Request Parameters:
id (string): The ID of the complaint to fetch.
Responses:
    200: Complaint details.
    404: Complaint not found.
    500: Internal server error.
-----------------------------------------------------------
### Update Complaint Status
URL: http://localhost:5173/complaints/status/:id
Method: PUT
Description: Updates the status of a specific complaint.
Request Parameters:
id (string): The ID of the complaint to update.
Request Body:
```json
{
  "status": "string"
}
```
Responses:
    200: Complaint status updated successfully.
    404: Complaint not found.
    500: Internal server error.
-----------------------------------------------------------
### Reply to Complaint
URL: http://localhost:5173/complaints/reply/:id
Method: PUT
Description: Adds a reply to a specific complaint.
Request Parameters:
id (string): The ID of the complaint to reply to.
Request Body:
```json
{
  "reply": "string"
}
```
Responses:
    200: Complaint replied to successfully.
    404: Complaint not found.
    500: Internal server error.
-----------------------------------------------------------
### Sort Complaints by Date
URL: http://localhost:5173/complaints/sortdate
Method: GET
Description: Fetches all complaints sorted by date.
Responses:
    200: List of complaints sorted by date.
    500: Internal server error.
-----------------------------------------------------------
### Sort and Filter Complaints
URL: http://localhost:5173/complaints/sort
Method: GET
Description: Fetches complaints sorted and filtered by status and order.
Request Query Parameters:
order (string): asc or desc (default: desc).
status (string): Complaint status (default: All).
Responses:
    200: List of sorted and filtered complaints.
    500: Internal server error.
-----------------------------------------------------------
### Get Complaints by User
URL: http://localhost:5173/complaints/user/:user
Method: GET
Description: Fetches all complaints for a specific user.
Request Parameters:
user (string): The ID of the user whose complaints to fetch.
Responses:
    200: List of complaints for the user.
    500: Internal server error.
-----------------------------------------------------------
----------------------------------------------------------
### Create a New Product
URL: http://localhost:5173/Products/upload
Method: POST
Description: Creates a new product with an uploaded image.
Request Body:
image: The product image file (uploaded).
Responses:
    201: Product created successfully.
    400: Invalid input or file upload error.
    500: Internal server error.
-----------------------------------------------------------
### Get All Products
URL: http://localhost:5173/Products/
Method: GET
Description: Fetches a list of all products.
Responses:
    200: List of all products.
    500: Internal server error.
-----------------------------------------------------------
### Get Archived Products
URL: http://localhost:5173/Products/archiveProducts
Method: GET
Description: Retrieves all archived products.
Responses:
    200: List of archived products.
    500: Internal server error.
-----------------------------------------------------------
### Get Unarchived Products
URL: http://localhost:5173/Products/unarchivedProducts
Method: GET
Description: Retrieves all unarchived products.
Responses:
    200: List of unarchived products.
    500: Internal server error.
----------------------------------------------------------
### Sort Products by Rating
URL: http://localhost:5173/Products/sortByRating
Method: GET
Description: Retrieves products sorted by their rating.
Responses:
    200: Sorted list of products by rating.
    500: Internal server error.
-----------------------------------------------------------
### Filter Products by Price
URL: http://localhost:5173/Products/filterByPrice
Method: GET
Description: Filters products based on price range.
Responses:
    200: Filtered list of products.
    500: Internal server error.
--------------------------------------------------------
### Search Products by Name
URL: http://localhost:5173/Products/:name
Method: GET
Description: Searches for products by name.
Parameters:
name (path): The name of the product to search for.
Responses:
    200: List of matching products.
    404: No products found.
    500: Internal server error.
--------------------------------------------------------
### View Quantity and Sales
URL: http://localhost:5173/Products/quantity&sales
Method: GET
Description: Retrieves quantity and sales information for all products.
Responses:
    200: Quantity and sales data.
    500: Internal server error.
----------------------------------------------------------
### Get Product by Name
URL: http://localhost:5173/Products/productByName/:name
Method: GET
Description: Retrieves a product by its name.
Parameters:
name (path): The name of the product to retrieve.
Responses:
    200: Product details.
    404: Product not found.
    500: Internal server error.
----------------------------------------------------------
### Update a Product
URL: http://localhost:5173/Products/updateProduct/:id
Method: PUT
Description: Updates details of a specific product.
Parameters:
id (path): The ID of the product to update.
Request Body:
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number"
}
```
Responses:
    200: Product updated successfully.
    404: Product not found.
    400: Invalid input.
    500: Internal server error.
----------------------------------------------------------
### Add a Review to a Product
URL: http://localhost:5173/Products/addReview/:id
Method: POST
Description: Adds a review to a specific product.
Parameters:
id (path): The ID of the product.
Request Body:
```json
{
  "review": "string",
  "rating": "number"
}
```
Responses:
    201: Review added successfully.
    404: Product not found.
    400: Invalid review input.
    500: Internal server error.
-----------------------------------------------------------
### Add a Rating to a Product
URL: http://localhost:5173/Products/addRating/:id
Method: POST
Description: Adds a rating to a specific product.
Parameters:
id (path): The ID of the product.
Request Body:
```json
{
  "rating": "number"
}
```
Responses:
    201: Rating added successfully.
    404: Product not found.
    400: Invalid rating input.
    500: Internal server error.
-----------------------------------------------------------
### Archive/Unarchive a Product
URL: http://localhost:5173/Products/archiveProduct/:id
Method: PUT
Description: Archives/Unarchives (toggles) a specific product by ID.
Parameters:
id (path): The ID of the product to toggle.
Responses:
    200: Product archived successfully.
    404: Product not found.
    500: Internal server error.
-----------------------------------------------------------
-----------------------------------------------------------
### Add an Item to the Cart
URL: http://localhost:5173/cart/add/:touristId
Method: POST
Description: Adds a product to the cart of the specified tourist. If the cart doesn't exist, it is created.
Parameters: touristId (path): The ID of the tourist.
Request Body:
```json
{
  "productId": "string"
}
```
Responses:
201 Created:
Product added to cart successfully.
```json
{
"message": "Product added to cart",
"cart": { ... }
}
```
404 Not Found: Product not found.
500 Internal Server Error: Server error.
-----------------------------------------------------------
### Remove an Item from the Cart
URL: http://localhost:5173/cart/remove/:touristId
Method: DELETE
Description: Removes a product from the cart of the specified tourist.
Parameters: touristId (path): The ID of the tourist.
Request Body:
```json
{
  "productId": "string"
}
```
Responses:
200 OK: Product removed from cart successfully.
```json
{
"message": "Product removed from cart",
"cart": { ... }
}
```
404 Not Found: Product or cart not found.
500 Internal Server Error: Server error.
-----------------------------------------------------------
### Update the Quantity of an Item in the Cart
URL: http://localhost:5173/cart/update/:touristId
Method: PUT
Description:Updates the quantity of a specific product in the tourist's cart. If the quantity is 0, the product is removed.
Parameters: touristId (path): The ID of the tourist.
Request Body:
```json
{
  "productId": "string",
  "quantity": number
}
```
Responses:
200 OK: Product quantity updated successfully.
```json
{
"message": "Product quantity updated",
"cart": { ... }
}
```
404 Not Found: Product or cart not found.
400 Bad Request: Quantity cannot be less than 0.
500 Internal Server Error: Server error.
-----------------------------------------------------------
### View tourist's cart
URL: http://localhost:5173/cart/:touristId
Method: GET
Description: Fetches the cart of the specified tourist, including all items and the total price.
Parameters: touristId (path): The ID of the tourist.
Responses:
    200 OK: Cart fetched successfully.
```json
{
"cartItems": [...],
"totalPrice": number
}
```
404 Not Found: Cart not found.
500 Internal Server Error: Server error.
-----------------------------------------------------------
### Get All Orders for a Specific Tourist
URL: http://http://localhost:5173/orders/:touristId
Method: GET
Description: Retrieves all orders for a specific tourist.
Parameters: touristId (path): The ID of the tourist.
Responses:
  200 OK: Orders retrieved successfully.
  ```json
  {
    "orders": [...]
  }
  ```
  404 Not Found:No orders found for the given tourist ID.
  500 Internal Server Error: Server error.
-----------------------------------------------------------
### Checkout and Pay for an Order
URL: http://http://localhost:5173/orders/checkoutAndPay
Method: POST
Description: Combines checkout and payment, supporting multiple payment methods (credit card, wallet, etc.).
Request Body:
```json
{
  "userId": "string",
  "addressId": "string",
  "frontendUrl": "string",
  "paymentMethod": "string",
  "promoCode": "string"
}
```
Responses:
  200 OK: Order placed successfully with payment.
  ```json
{
    "message": "Order placed successfully",
    "order": { ... }
}
  ```
  400 Bad Request: Insufficient wallet balance or invalid promo code.
  404 Not Found: Address or product not found.
  500 Internal Server Error: Server error.
---------------------------------------------------------
### Cancel an Order
URL:
http://http://localhost:5173/orders/cancel/:orderId
Method: PUT
Description: Cancels a specific order and refunds if applicable.
Parameters:
orderId (path): The ID of the order to cancel.
Responses:
200 OK:
Order canceled successfully.
```json
{
  "message": "Order cancelled successfully",
  "order": { ... }
}
```
400 Bad Request:
Missing order ID.
404 Not Found:
Order not found.
500 Internal Server Error:
Server error.
-----------------------------------------------------------
### Filter Orders by Status
URL: http://http://localhost:5173/orders/filterByStatus/:touristId
Method: GET
Description:
Filters orders for a specific tourist by their status.
Parameters: touristId (path): The ID of the tourist.
status (query): The order status to filter by.
Responses:
200 OK:
Orders filtered by status.
```json
{
  "orders": [...]
}
```
400 Bad Request: Missing status parameter.
404 Not Found: No orders found for the specified status.
500 Internal Server Error: Server error.
-----------------------------------------------------------
-----------------------------------------------------------
### Add Item to Wishlist
Endpoint: http://localhost:5173/wishlist/add/:touristId
Method: POST
Description: Adds a product to the user's wishlist.
Request Parameters:
touristId (URL parameter): The ID of the tourist.
Request Body (JSON):
```json
{
  "productId": "string"
}
```
Response (Success):
```json
{
  "message": "Product added to wishlist",
  "wishlist": { /* Wishlist object */ }
}
```
-----------------------------------------------------------
### Get Wishlist
Endpoint: http://localhost:5173/wishlist/:touristId
Method: GET
Description: Retrieves the wishlist for the specified tourist.
Request Parameters:
touristId (URL parameter): The ID of the tourist.
Response (Success):
```json
{
  "_id": "wishlistId",
  "touristId": "string",
  "items": [ /* Array of wishlist items */ ]
}
```
-----------------------------------------------------------
### Delete Item from Wishlist
Endpoint: http://localhost:5173/wishlist/delete
Method: DELETE
Description: Removes a product from the user's wishlist.
Request Body (JSON):
```json
{
  "touristId": "string",
  "productId": "string"
}
```
Response (Success):
```json
{
  "message": "Product removed from wishlist",
  "wishlist": { /* Updated wishlist object */ }
}
```
----------------------------------------------------------
### Toggle Wishlist Item
Endpoint: http://localhost:5173/wishlist/toggle
Method: POST
Description: Adds or removes a product from the wishlist based on its current state.
Request Body (JSON):
```json
{
  "touristId": "string",
  "productId": "string"
}
```
Response (Added):
```json
{
  "message": "Product added to wishlist",
  "wishlist": { /* Wishlist object */ }
}
```
Response (Removed):
```json
{
  "message": "Product removed from wishlist",
  "wishlist": { /* Updated wishlist object */ }
}
```
----------------------------------------------------------
-----------------------------------------------------------
### Create a New Address
Endpoint: http://localhost:5173/addresses/:touristId
Method: POST
Description: Creates a new address for the specified tourist.
Request Parameters: touristId (URL parameter): The ID of the tourist.
Request Body (JSON):
```json
{
  "street": "string",
  "city": "string",
  "state": "string",
  "zipCode": "string",
  "neighborhood": "string",
  "apartment": "string",
  "building": "string",
  "floor": "string"
}
```
Response (Success):
```json
{
  "_id": "addressId",
  "user": "touristId",
  "street": "string",
  "city": "string",
  "state": "string",
  "zipCode": "string",
  "neighborhood": "string",
  "apartment": "string",
  "building": "string",
  "floor": "string"
}
```
-----------------------------------------------------------
### Delete Address by ID
Endpoint: http://localhost:5173/addresses/:addressId
Method: DELETE
Description: Deletes a specific address using its ID.
Request Parameters: addressId (URL parameter): The ID of the address to delete.
Response (Success):
```json
{
  "message": "Address deleted successfully"
}
```
-----------------------------------------------------------
### View Tourist's Addresses
Endpoint: http://localhost:5173/addresses/user/:touristId
Method: GET
Description: Retrieves all addresses associated with a specific tourist.
Request Parameters: touristId (URL parameter): The ID of the tourist.
Response (Success):
```json
[
  {
    "_id": "addressId",
    "user": "touristId",
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "neighborhood": "string",
    "apartment": "string",
    "building": "string",
    "floor": "string"
  }
]
```
-----------------------------------------------------------
