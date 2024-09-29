require('dotenv').config();

const express = require("express");
const adminRoutes = require('./Backend/Routes/AdminRoutes');
const productsRoutes = require('./Backend/Routes/ProductsRoutes');
const governorRoutes = require('./Backend/Routes/GovernorRoutes');
const activityCategoriesRoute = require('./Backend/Routes/ActivityCategoryRoutes');
const PrefrenceTagRoute = require('./Backend/Routes/PrefrenceTagRoute');
const profileRoutes = require('./Backend/Routes/tour_guide_profile');
const itineraryRoutes = require('./Backend/Routes/tour_guide_itinerary');
const activityRoutes = require('./Backend/Routes/tour_guide_activites');

const mongoose = require('mongoose'); 
mongoose.set('strictQuery', false); // disable strict query 

//express application
const app = express();

//middleware
app.use(express.json()) //checks if the request contains data and passes that data to the request object

// routes
app.use('/Admin',adminRoutes);
app.use('/Products',productsRoutes);
app.use('/Governor', governorRoutes)
app.use('/ActivityCategories', activityCategoriesRoute)
app.use('/PrefrenceTag', PrefrenceTagRoute)
app.use('/Tour_Guide_Profile', profileRoutes); 
app.use('/Tour_Guide_Itinerary', itineraryRoutes); 
app.use('/Tour_Guide_Activites', activityRoutes); 




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
    console.error('MongoDB connection failed', err);
});


