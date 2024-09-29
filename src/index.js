const express = require('express');
const mongoose = require('mongoose');
const profileRoutes = require('./routes/touristRouter'); // Correct path to your router

const app = express();

// Middleware
app.use(express.json());
app.use('/api/profile', profileRoutes); // Mount the profile route

// MongoDB connection
mongoose
  .connect("mongodb+srv://admin:fesweyxo03@youssefapi.qeuz7.mongodb.net/your_database_name?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!");
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error.message);
  });
