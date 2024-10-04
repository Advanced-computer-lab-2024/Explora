require('dotenv').config();


const express = require("express");
const path = require('path');
const cors = require('cors');

const adminRoutes = require('./Routes/AdminRoutes');
const productsRoutes = require('./Routes/ProductsRoutes');
const governorRoutes = require('./Routes/GovernorRoutes');
const activityCategoriesRoute = require('./Routes/ActivityCategoryRoutes');
const PrefrenceTagRoute = require('./Routes/PrefrenceTagRoute');

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


