// Load environment variables from the .env file in the Backend folder
require('dotenv').config({ path: './Backend/.env' });

const express = require("express");
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

// Disable strict query in mongoose
mongoose.set('strictQuery', false);

// Create express app
const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(cors()); // Enable CORS

// Import routes
const adminRoutes = require('./Routes/AdminRoutes');
const productsRoutes = require('./Routes/ProductsRoutes');
const governorRoutes = require('./Routes/GovernorRoutes');
const sellerRoutes = require('./Routes/SellerRoutes');
const activityCategoriesRoute = require('./Routes/ActivityCategoryRoutes');
const PrefrenceTagRoute = require('./Routes/PrefrenceTagRoute');
const touristRoutes = require('./Routes/touristRouter');
const MuseumRoutes = require('./Routes/MuseumRoutes'); // New Museum Routes
const activityRoutes = require('./Routes/activity'); // New Activity Routes
const tour_guide_itineraryRoutes = require('./Routes/tour_guide_itinerary');
const tour_guide_profileRoutes = require('./Routes/tour_guide_profile');
const userRoutes = require('./Routes/userRoute');

// Define routes
app.use('/Governor', governorRoutes);
app.use('/Seller', sellerRoutes);
app.use('/Admin', adminRoutes);
app.use('/Products', productsRoutes);
app.use('/ActivityCategories', activityCategoriesRoute);
app.use('/PrefrenceTag', PrefrenceTagRoute);
app.use('/uploads', express.static(path.join(__dirname, '../images')));

app.use('/api/tourists', touristRoutes); // Tourists management
app.use('/api/governor', governorRoutes); // Governor profiles management
app.use('/api/museums', MuseumRoutes); // Museum routes for managing museums
app.use('/api/activities', activityRoutes); // Activity management
app.use('/api/tour_guide_itinerary', tour_guide_itineraryRoutes); // Itinerary management
app.use('/users', userRoutes); // User routes
app.use('/api/tour_guide_profile', tour_guide_profileRoutes); // Tour guide profiles management

// Simple route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// MongoDB connection string
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1); // Exit the app if no MongoDB URI is provided
}

// Debugging: Log MongoDB URI to ensure it's being read correctly
console.log("Connecting to MongoDB:", mongoUri);

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(async () => {
    // Listen for requests
    const port = process.env.PORT || 4000; // Fallback to port 4000 if not specified in .env
    app.listen(port, async () => {
      console.log(`Server is listening at http://localhost:${port}`);

      // Dynamically import the 'open' package to avoid ERR_REQUIRE_ESM
      const { default: open } = await import('open');
      open(`http://localhost:${port}`);  // Automatically open the server URL in the default browser
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the app if connection fails
  });
