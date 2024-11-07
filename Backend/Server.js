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
const MuseumRoutes = require('./Routes/MuseumRoutes'); // Adjust the path as needed
const activityRoutes = require('./Routes/activity'); 
const tour_guide_itineraryRoutes = require('./Routes/tour_guide_itinerary'); // Adjust the path as needed
const tour_guide_profileRoutes = require('./Routes/tour_guide_profile'); // Adjust the path as needed
const userRoutes = require('./Routes/userRoute');
const advertiserRoutes = require('./Routes/advertiserRoute');
const reviewRoutes = require('./Routes/reviewRoutes');
const categoryRoutes = require('./Routes/CategoryRoutes'); // Adjust path as needed
const authRoute = require('./Routes/LoginRoute'); // Path to the new auth route

const mongoose = require('mongoose'); 
mongoose.set('strictQuery', false); // disable strict query 

//express application
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',  // your frontend URL
  credentials: true,                // allow cookies to be sent
}));

// routes
app.use('/Governor', governorRoutes)
app.use('/Seller', sellerRoutes);
app.use('/Admin',adminRoutes);
app.use('/Products',productsRoutes);
app.use('/ActivityCategories', activityCategoriesRoute)
app.use('/PrefrenceTag', PrefrenceTagRoute)
app.use('/uploads', express.static(path.join(__dirname, '../images')));
app.use('/api/categories', categoryRoutes); // Add this line to your routes
app.use('/api/tourists', touristRoutes);   // For managing tourists
app.use('/api/Governor', MuseumRoutes);   // For managing profiles
app.use('/api/activity', activityRoutes); 
app.use('/api/tour_guide_itinerary', tour_guide_itineraryRoutes);   // For managing profiles
app.use('/users', userRoutes); 
app.use('/api/tour_guide_profile', tour_guide_profileRoutes);   // For managing profiles
app.use('/api/advertisers', advertiserRoutes); // This should be included
app.use('/reviews', reviewRoutes);
app.use('/api/auth', authRoute);

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
//listen for requests
const port = process.env.PORT; // define port number 
 // connect to port 
 app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
})
.catch(err => {
    console.log(err)
});
