// routes/profile.js

const express = require('express');
const router = express.Router();
const { createTourist, getTourist, updateTourist, allTourists, deleteTourist, signUp, login, logout, changePassword } = require('../controllers/touristController');
const Tourist = require('../models/touristModel');
const { authenticateUser } = require('../middleware/AuthMiddleware'); // Adjust the path as necessary

router.get('/id/:id', async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.params.id);
        if (!tourist) return res.status(404).json({ error: 'Tourist not found' });
        res.status(200).json(tourist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Route for getting a tourist by email
router.get('/email/:email', getTourist);
router.get('/', allTourists);
router.post("/signup", signUp);
router.post('/login', login)
router.get('/logout', logout);
router.put("/change-password", changePassword);

// Route for updating a tourist
router.put('/:id', updateTourist);

// Register new tourist
router.post('/register', createTourist) ;
router.delete('/:id', deleteTourist) ;



    // Hash password before saving to the database
    // const hashedPassword = await bcrypt.hash(password, 10);

    // const newTourist = new Tourist({
    //     email,
    //     username,
    //     password: hashedPassword,
    //     mobileNumber,
    //     nationality,
    //     dob,
    //     occupation
    // });

    


// Prevent DOB updates
router.put('/update/:id', async (req, res) => {
    const updates = { ...req.body };

    // Prevent changing DOB
    if (updates.dob) {
        return res.status(400).json({ error: "DOB cannot be updated." });
    }

    try {
        const updatedTourist = await Tourist.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.status(200).json(updatedTourist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Check age before allowing booking
router.post('/book', async (req, res) => {
    const touristId = req.body.touristId;

    try {
        const tourist = await Tourist.findById(touristId);
        if (!tourist) return res.status(404).json({ error: 'Tourist not found' });

        // Calculate age
        const currentDate = new Date();
        const birthDate = new Date(tourist.dob);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }

        // Restrict booking for users under 18
        if (age < 18) {
            return res.status(403).json({ error: "You must be 18 or older to book." });
        }

        // Proceed with booking logic (add your booking logic here)
        res.status(200).json({ message: "Booking successful!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Tourist details (for example)


module.exports = router;
