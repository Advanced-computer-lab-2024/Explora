require('dotenv').config();

const express = require("express");
const path = require('path');
const cors = require('cors');


const adminRoutes = require('./Routes/AdminRoutes');
const productsRoutes = require('./Routes/ProductsRoutes');
const governorRoutes = require('./Routes/GovernorRoutes');
const activityCategoriesRoute = require('./Routes/ActivityCategoryRoutes');
const PrefrenceTagRoute = require('./Routes/PrefrenceTagRoute');
const touristRoutes = require('./Routes/touristRouter'); // Route for tourists
const profileRoutes = require('./Routes/profileRouter'); // Adjust the path as needed
const MuseumRoutes = require('./Routes/MuseumRoutes'); // Adjust the path as needed
const acitivityRoutes = require('./Routes/activity'); // Adjust the path as needed
const tour_guide_itineraryRoutes = require('./Routes/tour_guide_itinerary'); // Adjust the path as needed
const userRoute = require('./Routes/userRoute'); // Adjust the path as necessary



const mongoose = require('mongoose'); 
mongoose.set('strictQuery', false); // disable strict query 

//express application
const app = express();


//middleware
app.use(express.json()) //checks if the request contains data and passes that data to the request object
app.use(cors());

// routes
app.use('/Admin',adminRoutes);
app.use('/Products',productsRoutes);
app.use('/Governor', governorRoutes)
app.use('/ActivityCategories', activityCategoriesRoute)
app.use('/PrefrenceTag', PrefrenceTagRoute)
app.use('/uploads', express.static(path.join(__dirname, '../images')));

app.use('/api/tourists', touristRoutes);   // For managing tourists
app.use('/api/profiles', profileRoutes);   // For managing profiles
app.use('/api/Governor', MuseumRoutes);   // For managing profiles
app.use('/api/activity', acitivityRoutes);   // For managing profiles
app.use('/api/tour_guide_itinerary', tour_guide_itineraryRoutes);   // For managing profiles
app.use('/api/user', userRoute);

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


