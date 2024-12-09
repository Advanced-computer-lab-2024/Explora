require('dotenv').config();

const express = require("express");
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { authenticateUser } = require('./middleware/AuthMiddleware');
const adminRoutes = require('./Routes/AdminRoutes');
const productsRoutes = require('./Routes/ProductsRoutes');
const governorRoutes = require('./Routes/GovernorRoutes');
const sellerRoutes = require('./Routes/SellerRoutes');
const activityCategoriesRoute = require('./Routes/ActivityCategoryRoutes');
const PrefrenceTagRoute = require('./Routes/PrefrenceTagRoute');
const touristRoutes = require('./Routes/touristRouter'); // Route for tourists
const MuseumRoutes = require('./Routes/MuseumRoutes'); // Adjusted path
const activityRoutes = require('./Routes/activity');
const AdvertiserActivityRoutes = require('./Routes/ActivityRoutes');
const tour_guide_itineraryRoutes = require('./Routes/tour_guide_itinerary');
const tour_guide_profileRoutes = require('./Routes/tour_guide_profile');
const userRoutes = require('./Routes/userRoute');
const advertiserRoutes = require('./Routes/advertiserRoute');
const reviewRoutes = require('./Routes/reviewRoutes');
const categoryRoutes = require('./Routes/CategoryRoutes');
const authRoute = require('./Routes/LoginRoute');
const req = require('./Routes/deletionRequest');
const preferences = require('./Routes/VacationPreferences');
const transportationRoutes = require('./Routes/transportation'); // Adjust the path as needed
const transBookRoutes = require('./Routes/transportationBook'); // Adjust the path as needed
const flightRoutes = require('./Routes/flightRoutes'); // Adjust the path as needed
const hotelRoutes = require('./Routes/hotelRoutes');
const complaintsRoute = require('./Routes/ComplaintsRoutes');
const salesRoutes = require('./Routes/tour_guide_sales');
const notificationsRoute = require('./Routes/notification');
const bookingTicket = require('./Routes/book');
const touristReport = require('./Routes/tour_guide_tourist');
const promoCodeRoutes = require('./Routes/promoCodeRoutes');
const wishListRoute = require('./Routes/WishListRoutes'); // Adjust the path as needed
const cartRoutes = require('./Routes/cartRoutes');
const ordersRoute = require('./Routes/ordersRoute'); // Adjust the path as needed
const AddressRoute = require('./Routes/AddressRoutes'); // Adjust the path as needed
const advertiserSales = require('./Routes/advertiser_sales');  // Import Advertiser Sales route
const sellerSales = require('./Routes/seller_sales');  // Import Seller Sales route
const advertiserTourist = require('./Routes/advertiser_tourist');  // Import Advertiser Tourist route
const anotification = require('./Routes/anotification');  // Import Anotification route
const anotification2 = require('./Routes/anotification2');  // Import Anotification2 route
const book2 = require('./Routes/book2');  // Import Book2 route
//const purchase = require('./Routes/purchase');  // Import Purchase route
const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Disable strict query

// Express application
const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Set up socket.io
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,               // Allow cookies to be sent
}));

// Routes
app.use('/Governor', governorRoutes);
app.use('/Seller', sellerRoutes);
app.use('/Admin', adminRoutes);
app.use('/Products', productsRoutes);
app.use('/ActivityCategories', activityCategoriesRoute);
app.use('/PrefrenceTag', PrefrenceTagRoute);
app.use('/uploads', express.static(path.join(__dirname, 'images'))); // Fixed path
app.use('/api/categories', categoryRoutes);
app.use('/api/tourists', touristRoutes);
app.use('/api/museums', MuseumRoutes); // Adjusted route for museums
app.use('/api/activity', activityRoutes);
app.use('/api/tour_guide_itinerary', tour_guide_itineraryRoutes);
app.use('/users', userRoutes);
app.use('/api/tour_guide_profile', tour_guide_profileRoutes);
app.use('/api/advertisers', advertiserRoutes);
app.use('/reviews', reviewRoutes);
app.use('/api/auth', authRoute);
app.use('/Request', req);
app.use('/preferences', preferences);
app.use('/transportation', transportationRoutes);   // For managing profiles
app.use('/transportationBook', transBookRoutes);   // For managing profiles
app.use('/flights', flightRoutes);   // For managing profiles
app.use('/hotels', hotelRoutes);
app.use('/complaints',complaintsRoute);
app.use('/Activity', AdvertiserActivityRoutes);
app.use('/api', salesRoutes);
app.use('/api/notifications', notificationsRoute);  // Mount the route
app.use('/ticket', bookingTicket);
app.use('/api/report', touristReport);
app.use('/wishList', wishListRoute);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoute);
app.use('/addresses',AddressRoute);
app.use('/api', advertiserSales);  // Register the Advertiser Sales route
app.use('/api', sellerSales);  // Register the Seller Sales route
app.use('/api/advertiser_tourist', advertiserTourist);  // Register the Advertiser Tourist route
app.use('/api/anotification', anotification);  // Register the Anotification route
app.use('/api/anotification2', anotification2);  // Register the Anotification2 route
app.use('/api/ticketact', book2);  // Register the Book2 route
//app.use('/api/buy', purchase);  // Register the Purchase route
app.use('/promoCode', promoCodeRoutes);

// Handle socket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//connect to MongoDB
console.log('Mongo URI:', process.env.MONGO_URI); // Log the URI to check if it is correctly loaded
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    const port = process.env.PORT || 4000; // Fallback to port 4000 if undefined
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
