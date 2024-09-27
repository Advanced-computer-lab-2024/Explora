const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const profileRoutes = require('./modules/routes/profile');

const app = express();

// Middleware
app.use(express.json());
app.use('/api/profile', profileRoutes); // Mount the profile route

mongoose
  .connect(
    "mongodb+srv://maruma1682003:Explora@cluster0.3y3hn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then(() => {
    console.log("Connected to database!");
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });