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
{
  "status": "string"
}
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
{
  "email": "string"
}
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
{
  "email": "string",
  "code": "string"
}
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
{
  "username": "string",
  "email": "string",
  "password": "string"
}
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
{
  "activityType": "string"
}
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
{
  "newActivityType": "string"
}
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
{
  "tag": "string"
}
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
{
  "newTag": "string"
}
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
{
  "title": "string",
  "body": "string"
}
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
{
  "status": "string"
}
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
{
  "reply": "string"
}
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
{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number"
}
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
{
  "review": "string",
  "rating": "number"
}
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
{
  "rating": "number"
}
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
{
  "productId": "string"
}
Responses:
    201 Created:
    Product added to cart successfully.
    {
    "message": "Product added to cart",
    "cart": { ... }
    }
    404 Not Found: Product not found.
    500 Internal Server Error: Server error.
-----------------------------------------------------------
### Remove an Item from the Cart
URL: http://localhost:5173/cart/remove/:touristId
Method: DELETE
Description: Removes a product from the cart of the specified tourist.
Parameters: touristId (path): The ID of the tourist.
Request Body:
{
  "productId": "string"
}
Responses:
    200 OK: Product removed from cart successfully.
    {
    "message": "Product removed from cart",
    "cart": { ... }
    }
    404 Not Found: Product or cart not found.
    500 Internal Server Error: Server error.
-----------------------------------------------------------
### Update the Quantity of an Item in the Cart
URL: http://localhost:5173/cart/update/:touristId
Method: PUT
Description:Updates the quantity of a specific product in the tourist's cart. If the quantity is 0, the product is removed.
Parameters: touristId (path): The ID of the tourist.
Request Body:
{
  "productId": "string",
  "quantity": number
}
Responses:
    200 OK: Product quantity updated successfully.
    {
    "message": "Product quantity updated",
    "cart": { ... }
    }
    404 Not Found: Product or cart not found.
    400 Bad Request: Quantity cannot be less than 0.
    500 Internal Server Error: Server error.
-----------------------------------------------------------
URL: http://localhost:5173/cart/:touristId
Method: GET
Description: Fetches the cart of the specified tourist, including all items and the total price.
Parameters: touristId (path): The ID of the tourist.
Responses:
    200 OK: Cart fetched successfully.
    {
    "cartItems": [...],
    "totalPrice": number
    }
    404 Not Found: Cart not found.
    500 Internal Server Error: Server error.
-----------------------------------------------------------
Get All Orders for a Specific Tourist
URL:
http://<your-server-url>/orders/:touristId

Method:
GET

Description:
Retrieves all orders for a specific tourist.

Parameters:

touristId (path): The ID of the tourist.
Responses:

200 OK:
Orders retrieved successfully.
json
Copy code
{
  "orders": [...]
}
404 Not Found:
No orders found for the given tourist ID.
500 Internal Server Error:
Server error.
-----------------------------------------------------------
Checkout and Pay for an Order
URL:
http://<your-server-url>/orders/checkoutAndPay

Method:
POST

Description:
Combines checkout and payment, supporting multiple payment methods (credit card, wallet, etc.).

Request Body:

json
Copy code
{
  "userId": "string",
  "addressId": "string",
  "frontendUrl": "string",
  "paymentMethod": "string",
  "promoCode": "string"
}
Responses:

200 OK:
Order placed successfully with payment.
json
Copy code
{
  "message": "Order placed successfully",
  "order": { ... }
}
400 Bad Request:
Insufficient wallet balance or invalid promo code.
404 Not Found:
Address or product not found.
500 Internal Server Error:
Server error.
---------------------------------------------------------
Cancel an Order
URL:
http://<your-server-url>/orders/cancel/:orderId

Method:
PUT

Description:
Cancels a specific order and refunds if applicable.

Parameters:

orderId (path): The ID of the order to cancel.
Responses:

200 OK:
Order canceled successfully.
json
Copy code
{
  "message": "Order cancelled successfully",
  "order": { ... }
}
400 Bad Request:
Missing order ID.
404 Not Found:
Order not found.
500 Internal Server Error:
Server error.
-----------------------------------------------------------
Filter Orders by Status
URL:
http://<your-server-url>/orders/filterByStatus/:touristId

Method:
GET

Description:
Filters orders for a specific tourist by their status.

Parameters:

touristId (path): The ID of the tourist.
status (query): The order status to filter by.
Responses:

200 OK:
Orders filtered by status.
json
Copy code
{
  "orders": [...]
}
400 Bad Request:
Missing status parameter.
404 Not Found:
No orders found for the specified status.
500 Internal Server Error:
Server error.
-----------------------------------------------------------
-----------------------------------------------------------
Add Item to Wishlist
Endpoint: /wishlist/add/:touristId
Method: POST
Description: Adds a product to the user's wishlist.
Request Parameters:
touristId (URL parameter): The ID of the tourist.
Request Body (JSON):
{
  "productId": "string"
}
Response (Success):
{
  "message": "Product added to wishlist",
  "wishlist": { /* Wishlist object */ }
}
-----------------------------------------------------------
Get Wishlist
Endpoint: /wishlist/:touristId
Method: GET
Description: Retrieves the wishlist for the specified tourist.
Request Parameters:
touristId (URL parameter): The ID of the tourist.
Response (Success):
{
  "_id": "wishlistId",
  "touristId": "string",
  "items": [ /* Array of wishlist items */ ]
}
-----------------------------------------------------------
Delete Item from Wishlist
Endpoint: /wishlist/delete
Method: DELETE
Description: Removes a product from the user's wishlist.
Request Body (JSON):
{
  "touristId": "string",
  "productId": "string"
}
Response (Success):
{
  "message": "Product removed from wishlist",
  "wishlist": { /* Updated wishlist object */ }
}
----------------------------------------------------------
Toggle Wishlist Item
Endpoint: /wishlist/toggle
Method: POST
Description: Adds or removes a product from the wishlist based on its current state.
Request Body (JSON):
{
  "touristId": "string",
  "productId": "string"
}
Response (Added):
{
  "message": "Product added to wishlist",
  "wishlist": { /* Wishlist object */ }
}
Response (Removed):
{
  "message": "Product removed from wishlist",
  "wishlist": { /* Updated wishlist object */ }
}
----------------------------------------------------------
-----------------------------------------------------------
Create a New Address
Endpoint: /addresses/:touristId
Method: POST
Description: Creates a new address for the specified tourist.
Request Parameters: touristId (URL parameter): The ID of the tourist.
Request Body (JSON):
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
Response (Success):
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
-----------------------------------------------------------
Delete Address by ID
Endpoint: /addresses/:addressId
Method: DELETE
Description: Deletes a specific address using its ID.
Request Parameters: addressId (URL parameter): The ID of the address to delete.
Response (Success):
{
  "message": "Address deleted successfully"
}
-----------------------------------------------------------
View Tourist's Addresses
Endpoint: /addresses/user/:touristId
Method: GET
Description: Retrieves all addresses associated with a specific tourist.
Request Parameters: touristId (URL parameter): The ID of the tourist.
Response (Success):
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
-----------------------------------------------------------