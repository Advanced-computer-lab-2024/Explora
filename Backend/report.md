Title:Add Rating to Product

Route:POST /addRating/:id

Parameters:id

Expected Response:
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
------------------------------------------------------------------------------------------
Title: Add Review to Product

Route: POST /addReview/:id

Parameters:id

Expected Response:
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
------------------------------------------------------------------------------------------
Title: Get New Users Per Month

Route: GET /new-users-per-month

Parameters:None

Expected Response:
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
------------------------------------------------------------------------------------------
Title: Cancel Order

Route: PATCH /:touristId/orders/:orderId/cancel

Parameters:touristId,orderId

Expected Response:
{
  "message": "Order canceled successfully",
  "walletBalance": 500,
  "refundAmount": 200
}
------------------------------------------------------------------------------------------
Title: View Order Details

Route: GET /:touristId/orders/:orderId


Parameters:orderId

Expected Response:
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
------------------------------------------------------------------------------------------
Title: View All Orders for a Tourist

Route: GET /:touristId/orders

Parameters:touristId

Expected Response:
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
------------------------------------------------------------------------------------------
Title: Create a Museums or Historical Place

Route: POST /

Parameters: name (String, required, unique),description (String, required),pictures (Array of Strings, optional),location (String, required),openingHours (String, required),ticketPrices (Object, required),native (Number, required),foreigner (Number, required),student (Number, required),tags (Array of Strings, optional)
Expected Response:
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
------------------------------------------------------------------------------------------
Title: Get All Museums and Historical Places

Route: GET /museums

Parameters: None

Expected Response:
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
------------------------------------------------------------------------------------------
Title: Get Museum or Historical Place by Name

Route: GET /:name

Parameters: name (String, required)

Expected Response:
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
------------------------------------------------------------------------------------------
Title: Update Museum or Historical Place by ID

Route: PUT /:id

Parameters:nid (String, required)

Expected Response:
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
------------------------------------------------------------------------------------------
Title: Delete Museum or Historical Place by ID

Route: DELETE /:id

Parameters:bid (String, required)

Expected Response:
{
  "message": "Museum not found"
}
