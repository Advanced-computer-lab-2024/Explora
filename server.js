
require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose'); 

const activityRoutes = require('./modules/routes/activity');
const touristRoutes = require('./modules/routes/tourist');
const userRoutes = require('./routes/user'); // Import the user routes
const advertiserRoutes = require('./routes/advertiser'); // Import advertiser routes

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI; // Use the environment variable
mongoose.set('strictQuery', false); // disable strict query 
app.use(express.json()) //checks if the request contains data and passes that da

// routes
app.use('/advertisers', advertiserRoutes);
app.use('/activities', activityRoutes);
app.use('/tourists', touristRoutes);
app.use('/users', userRoutes);

//connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
