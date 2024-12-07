Tourist Endpoint Documentation:
 
 Title:Update the Tourist's Information
 Route:https://localhost:4000/api/tourists/update/:id
 Request Method: PUT
 Request:
 Parameter:id
 {
    "name": "Updated Name",
    "email": "updated@example.com"
}
 Expected Response:{
    "_id": "60f3b3b3b3b3b3b3b3b3b3b3",
    "name": "Updated Name",
    "email": "updated@example.com",
    "dob": "1990-01-01"
}
-----------------------------------------
Title: Retrieve Tourist by ID
Route: https://localhost:4000/api/tourists/id/:id
Request Method: GET
Parameter:id
{
    "_id": "60f3b3b3b3b3b3b3b3b3b3b3",
    "name": "Tourist Name",
    "email": "tourist@example.com",
    "dob": "1990-01-01"
}
-----------------------------------------------
Title: Retrieve Upcoming Activities
Route: http://localhost:4000/api/activity/upcoming
Request Method: GET
Request:
No parameters required.
Expected Response:
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
-----------------------------
Title: Retrieve Upcoming Itineraries
Route: http://localhost:4000/api/tour_guide_itinerary/upcoming
Request Method: GET
Request:
No parameters required.
Expected Response:

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
-----------------------------------------
Title: Retrieve All Touristic Sites
Route: https://localhost:4000/api/museums/museums
Request Method: GET
Request:
No parameters required.
Expected Response:

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
-------------------------------------
Title: Retrieve All Products
Route: https://localhost:4000/Products/
Request Method: GET
Request:
No parameters required.
Expected Response:

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
-----------------------------------
Title: Book Flight Using Wallet
Route: http://localhost:4000/flights/bookWallet
Request Method: POST
Request:
Body Parameters:
{
    "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
    "searchId": "123456",
    "flightId": "abcdef",
    "promoCode": "DISCOUNT20"
}
Expected Response:
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
---------------------------------
Title: Book Transportation Using Wallet
Route: http://localhost:4000/transportationBook/bookWallet
Request Method: POST
Request:
Body Parameters:
{
    "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
    "transportationId": "abcdef12345",
    "seats": 3,
    "promoCode": "TRANSPROMO20"
}
Expected Response:
{
    "tourist": "60f3b3b3b3b3b3b3b3b3b3b3",
    "transportation": "abcdef12345",
    "method": "Bus",
    "seatsBooked": 3,
    "totalPrice": 150
}
------------------------------
Title: Book Hotel Using Wallet
Route: http://localhost:4000/hotels/bookWallet
Request Method: POST
Request:
Body Parameters:
{
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "searchId": "search123",
  "hotelId": "hotelabc123",
  "promoCode": "HOTELPROMO10"
}
Expected Response:
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
---------------------------------------
Title: Book Activity Using Wallet
Route: http://localhost:4000/api/activity/bookWallet
Request Method: POST
Request:
Body Parameters:
{
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "activityId": "activityabc123",
  "promoCode": "ACTIVITYPROMO20"
}
Expected Response:
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
---------------------------------
Title: Book Itinerary Using Wallet
Route: http://localhost:4000/api/tour_guide_itinerary/bookWallet
Request Method: POST
Body Parameters:
{
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3",
  "itineraryId": "60e1a7c5f91f4b4b1e4623ad",
  "promoCode": "DISCOUNT20"
}
Expected Response:
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
-------------------------------------
Title: Get Upcoming Booked Itineraries
Route: http://localhost:4000/api/tour_guide_itinerary/upcomingBookedItineraries/:touristId
Params:touristId
Request Method: GET
Expected Response:
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
----------------------------------
Title: Get Past Booked Itineraries
Route: http://localhost:4000/api/tour_guide_itinerary/pastBookedItineraries/:touristId
Request Method: GET
params:touristId
Expected Response:
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
----------------------------------
Title: Cancel and Refund Itinerary
Route: http://localhost:4000/api/tour_guide_itinerary/return
Request Method: DELETE
Request Body:
{
  "itineraryId": "60e1a7c5f91f4b4b1e4623ad",
  "touristId": "60f3b3b3b3b3b3b3b3b3b3b3"
}
Response:{
  "message": "Itinerary canceled and money refunded"
}
----------------------------------
Title: Remove Bookmarked Event
Route: http://localhost:4000/api/tour_guide_itinerary/bookmark/:touristId/:eventId
Request Method: DELETE
Request Parameters:
touristId: ID of the tourist
eventId: ID of the event to be removed from bookmarks
----------------------------------
Title: Bookmark Event
Route: http://localhost:4000/api/tour_guide_itinerary/bookmark/:touristId
Request Method: POST
Request Body:
{
  "eventId": "event_id_here"
}
Request Parameters:
touristId: ID of the tourist
Response:
{
  "message": "Activity bookmarked successfully"
}
or
{
  "message": "Itinerary bookmarked successfully"
}
--------------------------------------
Title: Get Notifications for a Tourist
Route: http://localhost:4000/api/tour_guide_itinerary/notification/:id
Request Method: GET
Request Parameters:
id: touristId (ID of the tourist)
Response:{
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
-----------------------------------
