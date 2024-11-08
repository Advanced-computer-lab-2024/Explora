// controllers/userController.js
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcryptjs');
const {asyncWrapper} = require('../middleware/upload');
const User = require('../models/User');
const Seller = require('../models/Seller');
const TourGuide = require('../models/Tour_Guide_Profile');
const Advertiser = require('../models/Advertiser');
const Tourist = require('../models/touristModel');
const Product = require('../models/Products');
const Activity = require('../models/Activity');
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
};



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
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);        
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
        const token = createToken(newUser.name); 
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); 
        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (err) {
        console.error("Registration error:", err); // Log the error
        res.status(500).json({ error: err.message });
    }
});

// Login a user

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;        
        const user = await User.findOne({ username }); 
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect Username or Password' });
        }
        if(isMatch){
            const token = createToken(user.name);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ message: 'Logged in successfully!', user });
        }
      
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logout a user
const logout = async (req, res) => {
    //res.cookie('jwt', '', { maxAge: 1 });
    res.clearCookie('jwt');  // clears the cookie in the browser
    res.status(200).json({ message: 'Logged out successfully' });
}

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

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.status = status; 
        await user.save(); 
        res.status(200).json(user);

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const viewRequests = async (req, res) => {
    try {
        const users = await User.find({
            role: { $in: ["Seller", "TourGuide", "Advertiser"] }  // Correct usage
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const filterByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const users = await User.find({
            role: { $in: ["Seller", "TourGuide", "Advertiser"] }, // Matches any of these roles
            status // Filter by the status from params
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the user
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // If the user is a seller, set isDeleted of their products to true
        if (user.role === "Seller") {
            const products = await Product.updateMany(
                { seller: id },          // Find all products associated with this seller
                { $set: { isDeleted: true } } // Set isDeleted to true for these products
            );
        }
        if (user.role === "TourGuide") {

        }

        res.status(200).json({ message: "User and associated products deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};









// Additional user controller functions can be defined here...

module.exports = {
    registerUser,
    viewUsers,
    getUserid,
    getRoleByUsername,
    loginUser,
    downloadIDFile,
    downloadCertificateFile,
    downloadTaxFile,
    updateStatus,
    viewRequests,
    filterByStatus,
    logout
    // Add other controller methods like loginUser, getUserProfile, etc.
};
