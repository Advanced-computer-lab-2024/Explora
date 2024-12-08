Title: Create Tour Guide Profile
Route: (http://localhost:4000/api/tour_guide_profile/register)
Request Method: POST
Request:
Body Parameters:
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
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Get Tour Guide Profile by ID
Route: http://localhost:4000/api/tour_guide_profile/:id
Request Method: GET
Request:
{
  "id": "string"
}
Body Parameters: None
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Update Tour Guide Profile
Route: http://localhost:4000/api/tour_guide_profile/me/:id
Request Method: PUT
Request:
Body Parameters:
{
  "email": "new_email@example.com",
  "newPassword": "new_password",
  "name": "New Name",
  "mobile": "0123456789",
  "yearsOfExperience": 5,
  "previousWork": "New Work Details",
  "isAccepted": true
}
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Create a New Itinerary
Route: http://localhost:4000/api/tour_guide_itinerary/
Request Method: POST
Request:
Body Parameters:
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
Expected Response Example:
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
-------------------------------------------------------------------------------------------
Title: Get Itineraries by Tour Guide ID
Route: (http://localhost:4000/api/tour_guide_itinerary)
Request Method: GET
Request:
Query Parameters:
{
  "tourGuideId": "6748fae835a3fa0479d4a088"
}
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Update an Itinerary by ID
Route: http://localhost:4000/api/tour_guide_itinerary/:id
Request Method: PUT
Request:
URL Parameter:
    "_id": "6754bb26420909de67705299"
Request Body:
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
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Delete an Itinerary by ID
Route: http://localhost:4000/api/tour_guide_itinerary/:id
Request Method: DELETE
Request:
URL Parameter:
id : "6754bb26420909de67705299"
Expected Response:
{
  "msg": "Itinerary removed successfully"
}
-------------------------------------------------------------------------------------------
Title: Get Itinerary by ID
Route: http://localhost:4000/api/tour_guide_itinerary/:id
Request Method: GET
Request:
URL Parameter:
id: "6754bb26420909de67705299"
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Request Account Deletion
Route: http://localhost:4000/Request/requestDeletion
Request Method: POST
Request: 
{
  "username": "john_doe",
  "email": "john@example.com",
  "reason": "No longer needed"
}
Expected Response:
{
  "message": "Deletion request submitted"
}
-------------------------------------------------------------------------------------------
Title: Deactivate Itinerary
Route: http://localhost:4000/api/tour_guide_itinerary/:id/deactivate
Request Method: PUT
Request:
URL Parameter:
id: "6749a7a40d9e637f9c7cc0b8"
Expected Response:
{
  "message": "Itinerary deactivated successfully."
}
-------------------------------------------------------------------------------------------
Title: Accept Terms
Route: http://localhost:4000/api/tour_guide_profile/accept-terms/:id
Request Method: PUT
Request:
URL Parameter:
id: "6748fae835a3fa0479d4a088"
Expected Response:
{
  "msg": "Terms accepted successfully"
}
-------------------------------------------------------------------------------------------
Title: Rate and Comment on a Tour Guide
Route: http://localhost:4000/reviews/rateTourGuide
Request Method: POST
Request:
Body Parameters:
{
"touristId": "674d0772a54a6ecc374e2f35",
"tourGuideId": "674cfa7ea54a6ecc374e2ea9",
"rating": 5,
"comment": "very good" 
}
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Rate and Comment on an Itinerary
Route: http://localhost:4000/reviews/rateItinerary
Request Method: POST
Request:
Body Parameters:
{
"touristId": "674d0772a54a6ecc374e2f35",
"itineraryId": "6754bb26420909de67705299",
"rating": 5,
"comment": "very good" 
}
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Get Previous Itineraries
Route: http://localhost:4000/api/tour_guide_itinerary/previous
Request Method: GET
Request:
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Get All Itineraries
Route: http://localhost:4000/api/tour_guide_itinerary/all
Request Method: GET
Request:
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Get Upcoming Itineraries
Route: http://localhost:4000/api/tour_guide_itinerary/upcoming
Request Method: GET
Request:
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Get Loyalty Points for a User
Route: http://localhost:4000/users/loyalty-points/:userId
Request Method: GET
Request:
URL Parameter:
userId: "674d0772a54a6ecc374e2f35"
Expected Response:
{
    "loyaltyPoints": 250019312.5
}
-------------------------------------------------------------------------------------------
Title: Book a Ticket for an Itinerary
Route: http://localhost:4000/ticket/book
Request Method: POST
Request:
Body Parameters:
{
  "userId": "tourist_user_id",
  "itineraryId": "itinerary_id",
  "numberOfTickets": "number_of_tickets"
}
Expected Response:
{
  "message": "Booking and sale recorded successfully",
  "booking": {
    "_id": "booking_id",
    "tourist": "tourist_user_id",
    "itinerary": "itinerary_id",
    "numberOfTickets": "number_of_tickets",
    "totalPrice": "total_price",
    "tourGuideId": "tour_guide_id"
  },
  "sale": {
    "_id": "sale_id",
    "tourGuideId": "tour_guide_id",
    "itineraryId": "itinerary_id",
    "touristId": "tourist_user_id",
    "amount": "total_price"
  },
  "loyaltyPoints": "tourist_loyalty_points"
}
-------------------------------------------------------------------------------------------
Title: User Login
Route: http://localhost:4000/api/auth/
Request Method: POST
Request:
Body Parameters:
{
  "username": "user_username",
  "password": "user_password"
}
Expected Response:
{
  "token": "jwt_token_here",
  "role": "user_role",
  "userId": "user_id"
}
-------------------------------------------------------------------------------------------
Title: Fetch Sales Records for a Tour Guide
Route: http://localhost:4000/api/
Request Method: GET
Query Parameters:
tourGuideId: 674cfa7ea54a6ecc374e2ea9
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Fetch Tourists Who Booked a Tour Guide's Itinerary
Route: http://localhost:4000/api/report/
Request Method: GET
Query Parameters:
tourGuideId: 674cfa7ea54a6ecc374e2ea9
Expected Response:
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
-------------------------------------------------------------------------------------------
Title: Flag or Unflag an Itinerary
Route: http://localhost:4000/api/itineraries/:id/flag
Request Method: PATCH
Path Parameters 
id: 67324673bd5e0b9fdcdba05c
Expected Response:
{
  "message": "Itinerary flagged successfully"
}
Notification: 
{
  "userId": "tourGuideId",
  "message": "Your itinerary 'Itinerary Title' has been flagged.",
  "itineraryId": "itineraryId"
}
Email:
{
    Subject: Itinerary has been Flagged

    Dear Tour Guide Name,

    Your itinerary titled "Itinerary Title" has been flagged.  
    Please review it.

    Sincerely,  
    Explora Team
}
-------------------------------------------------------------------------------------------
itle: Fetch Notifications for a User
Route: (http://localhost:4000/api/notifications/notifications)
Request Method: GET
Request:
Query Parameters:
{
  "userId": "string" 
}
Expected Response:
[
  {
    "_id": "notification_id",
    "userId": "user_id",
    "message": "Notification message",
    "createdAt": "2024-06-08T12:00:00Z"
  }
]
-------------------------------------------------------------------------------------------
Title: Mark Notification as Read
Route: http://localhost:4000/api/notifications/:id/read
Request Method: PATCH
Request:
URL Parameters:
{
  "id": "string" // Notification ID
}
Expected Response:
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
-------------------------------------------------------------------------------------------



