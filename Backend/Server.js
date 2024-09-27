require('dotenv').config();

const express = require("express");
const adminRoutes = require('./Routes/AdminController');
const mongoose = require('mongoose'); 
mongoose.set('strictQuery', false); // disable strict query 

//express application
const app = express();

//middleware
app.use(express.json()) //checks if the request contains data and passes that data to the request object

// routes
app.use('/Admin',adminRoutes);

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


