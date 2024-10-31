// controllers/userController.js
const jwt = require('jsonwebtoken');
const path = require('path');
const {asyncWrapper} = require('../middleware/upload');
const User = require('../models/User');
const Seller = require('../models/Seller');
const TourGuide = require('../models/Tour_Guide_Profile');
const Advertiser = require('../models/Advertiser');
const Tourist = require('../models/touristModel');
const {
    hashPassword,
    comparePassword
} = require('../middleware/AuthMiddleware');


// Register a new user
const registerUser = asyncWrapper(async (req, res) => {
    const { username, email, password, role, mobileNumber, nationality, job, dateOfBirth } = req.body;
    
    // Access uploaded files
    const idFile = req.files['idFile'] ? req.files['idFile'][0].path : null;
    const certificatesFile = req.files['certificatesFile'] ? req.files['certificatesFile'][0].path : null;
    const taxFile = req.files['taxFile'] ? req.files['taxFile'][0].path : null;
    const imageFile = req.files['imageFile'] ? req.files['imageFile'][0].path : null;



    try {
        // Check if the username or email already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password and create the new user
        const hashedPassword = await hashPassword(password);
        let newUser;

        if (role === "Tourist") {
            newUser = new Tourist({
                username,
                email,
                password: hashedPassword,
                role,
                mobileNumber,
                nationality,
                job,
                dateOfBirth: new Date(dateOfBirth) // Convert to Date object
            });
        } else if (role === "Seller") {
            newUser = new Seller({ username, email, password: hashedPassword, role, idFile, taxFile, imageFile});
        } else if (role === "TourGuide") {
            newUser = new TourGuide({ 
                username, 
                email, 
                password: hashedPassword, 
                role, 
                idFile, 
                certificatesFile,
                imageFile
            });
        } else if (role === "Advertiser") {
            newUser = new Advertiser({ username, email, password: hashedPassword, role, idFile, taxFile, imageFile });
        } else {
            newUser = new User({ username, password: hashedPassword, role });
        }


        // Save the new user
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (err) {
        console.error("Registration error:", err); // Log the error
        res.status(500).json({ error: err.message });
    }
});

// view all users 
const viewUsers = async (req, res) => {
        try {
            const user = await User.find({});
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({msg: err.message});
        }
}

const getUserid = async (req, res) => {
    try {
        const username = req.params.username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send({ msg: 'User not found' });
      }
      res.send({ _id: user._id }); // Send back the user's ObjectId
    } catch (error) {
      res.status(500).send({ msg: 'Error fetching user', error });
    }
}

const getRoleByUsername = async (req, res) => {
    try {
        const username = req.params.username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.send({ role: user.role });    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Login a user

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Received request:', req.body); // Log incoming data for debugging
        
        const user = await User.findOne({ username }); // Find user in the database by username
        
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Incorrect Username or Password' });
        }
        
        // Generate and send back a JWT token
        if(match){
        jwt.sign({username: user.username, id: user.id}, process.env.JWT_SECRET, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token',token).json(user)
        })
    }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const downloadIDFile = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    // No need to redeclare `User` here, it is already imported
    const user = await User.findById(id);  // Use lowercase 'user' to avoid confusion with the model

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    const file = user.idFile;  // Access the 'idFile' field of the user
    const filePath = path.join(__dirname, `../${file}`);  // Use proper path resolution
    res.download(filePath);
});

const downloadCertificateFile = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    // No need to redeclare `User` here, it is already imported
    const user = await User.findById(id);  // Use lowercase 'user' to avoid confusion with the model

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    const file = user.certificatesFile;  // Access the 'idFile' field of the user
    const filePath = path.join(__dirname, `../${file}`);  // Use proper path resolution
    res.download(filePath);
});

const downloadTaxFile = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    // No need to redeclare `User` here, it is already imported
    const user = await User.findById(id);  // Use lowercase 'user' to avoid confusion with the model

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    const file = user.taxFile;  // Access the 'idFile' field of the user
    const filePath = path.join(__dirname, `../${file}`);  // Use proper path resolution
    res.download(filePath);
});


// Additional user controller functions can be defined here...

module.exports = {
    registerUser,
    viewUsers,
    getUserid,
    getRoleByUsername,
    loginUser,
    downloadIDFile,
    downloadCertificateFile,
    downloadTaxFile
    // Add other controller methods like loginUser, getUserProfile, etc.
};
