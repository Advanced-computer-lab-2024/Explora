require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Import your route files
const placesRoutes = require('./routes/placesRoutes'); // Route for places
const touristRoutes = require('./routes/touristRouter'); // Route for tourists
const profileRoutes = require('./routes/profileRouter'); // Adjust the path as needed
const GovernorRoutes = require('./routes/GovernorRoutes'); // Adjust the path as needed
const acitivityRoutes = require('./routes/activity'); // Adjust the path as needed

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Mount the routes
app.use('/api/places', placesRoutes);      // For managing places
app.use('/api/tourists', touristRoutes);   // For managing tourists
app.use('/api/profiles', profileRoutes);   // For managing profiles
app.use('/api/Governor', GovernorRoutes);   // For managing profiles
app.use('/api/activity', acitivityRoutes);   // For managing profiles

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI + 'ExploraDB') // Include your database name
  .then(() => {
    console.log("Connected to database!");
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error.message);
  });
