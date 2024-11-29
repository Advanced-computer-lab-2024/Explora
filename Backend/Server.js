require('dotenv').config();


const express = require("express");
const path = require('path');
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
const salesRoutes = require('./Routes/sales');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Disable strict query

// Express application
const app = express();
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
