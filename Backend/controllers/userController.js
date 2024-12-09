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
const TourismGovernor = require('../models/Governor');
const Admin = require('../models/Admin');
const Product = require('../models/Products');
const Activity = require('../models/Activity');
const maxAge = 3 * 24 * 60 * 60;
const createToken = (_id) => {
    return jwt.sign({ _id }, 'supersecret', {
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

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);  // 'hash' contains the hashed password

        let newUser;

        if (role === "Tourist") {
            newUser = new Tourist({
                username,
                email,
                password,  // Use 'hash' here
                role,
                mobileNumber,
                nationality,
                job,
                dateOfBirth: new Date(dateOfBirth)  // Convert to Date object
            });
        } else if (role === "Seller") {
            newUser = new Seller({
                username,
                email,
                password,  // Use 'hash' here
                role,
                idFile,
                taxFile,
                imageFile
            });
        } else if (role === "TourGuide") {
            newUser = new TourGuide({
                username,
                email,
                password,  // Use 'hash' here
                role,
                idFile,
                certificatesFile,
                imageFile
            });
        } else if (role === "Advertiser") {
            newUser = new Advertiser({
                username,
                email,
                password,  // Use 'hash' here
                role,
                idFile,
                taxFile,
                imageFile
            });
        } else {
            // If the role is not one of the above, fallback to a generic user
            newUser = new User({ username, password: hash, role });
        }

        // Save the new user
        await newUser.save();

        // Generate a token for the new user
        const token = createToken(newUser._id); 

        // Set the JWT cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); 
        
        // Send success response
        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (err) {
        console.error("Registration error:", err); // Log the error
        res.status(500).json({ error: err.message });
    }
});

// Login a user

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // Log the password from the request and the hashed password from the database
        console.log('Password from request:', password);
        console.log('Password stored in database (hashed):', user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ message: 'Invalid password' });
        }
        const payload = {
            user: {
                id: user._id, // Include relevant user information in the payload
                role: user.role, // Include the role for role-based routing
            },
        };


        const token = createToken(user.username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
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
    //res.contentType('application/pdf');  // Ensure the content type is PDF for a PDF file

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

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // If the user is a Seller, check for upcoming itineraries and activities
        if (user.role === "Admin"){
            const admins = await User.find({ role: "Admin" });
            if (admins.length > 1) {
                return res.status(400).json({
                    message: "Cannot delete admin profile; there are other admin accounts."
                });
            }
        }
        if (user.role === "Tourist") {
            // cancel bookings 
            // delete any pemding complaints 
            // delete any reviews
            // cancel any itineraries
            // cancel any activities

        }
        if (user.role === "Seller") {
            const products = await Product.find({ seller: id });
            if (products.length > 0) {
                await Product.updateMany({ seller: id }, { $set: { isDeleted: true } });
            }
        }
        // If the user is a TourGuide, add any additional deletion logic here
        if (user.role === "TourGuide") {
            // deactivate iteneraries and activities
            
        }

        if(user.role === "Advertiser") {
            // deactivate activities

        }
        // Proceed with deleting the user from the database
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User and associated data deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Change user password
const changePassword = async (req, res) => {
  const { username, password, newPassword } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the current password (hashed password comparison)
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Check if the new password is different from the old one
    if (password === newPassword) {
      return res.status(400).json({ message: "New password cannot be the same as the old one" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller method to update loyalty points
const updateLoyaltyPoints = async (req, res) => {
    const { points } = req.body;  // Points to add or subtract
    const { userId } = req.query; // Extract userId from the URL parameter

    try {
        const user = await User.findById(userId); // Find the user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });  // If user doesn't exist, return error
        }

        // Call method to update loyalty points
        await user.updateLoyaltyPoints(points);

        // Return the updated loyalty points and level
        res.status(200).json({
            message: 'Loyalty points updated successfully',
            loyaltyPoints: user.loyaltyPoints,
            loyaltyLevel: user.loyaltyLevel
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Additional user controller functions can be defined here...

module.exports = {
    registerUser,
    viewUsers,
    updateLoyaltyPoints,
    getUserid,
    getRoleByUsername,
    downloadIDFile,
    downloadCertificateFile,
    downloadTaxFile,
    updateStatus,
    viewRequests,
    filterByStatus,
    logout,
    login,
    changePassword,
    deleteUser
    // Add other controller methods like loginUser, getUserProfile, etc.
};
