// routes/user.js

const express = require('express');
const User = require('../models/User'); // Import the User model
const {upload} = require('../middleware/upload');
const { registerUser,
        viewUsers, 
        getUserid, 
        getRoleByUsername, 
        login, 
        logout,
        downloadIDFile,
        downloadCertificateFile,
        downloadTaxFile,
        updateStatus,
        viewRequests,
        filterByStatus,
        changePassword,
        deleteUser
    } = require('../controllers/userController'); // Import the controller

const router = express.Router();

// Route to register a new user
router.get('/role/:username', getRoleByUsername);
router.get('/requests', viewRequests);
router.get('/filterByStatus/:status', filterByStatus);
router.post('/register', upload.fields([{ name: 'idFile', maxCount: 1 }, { name: 'certificatesFile', maxCount: 1 }, { name: 'taxFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]), registerUser);
router.post ('/login', login)
router.get('/logout', logout)
router.get('/:username', getUserid)
router.get ('/login', login)
router.post('/changePassword', changePassword); // New route for changing password

// Additional user routes can go here...
router.get('/',viewUsers)
router.get('/ID/:id', downloadIDFile )
router.get('/Certificate/:id', downloadCertificateFile )
router.get('/Tax/:id', downloadTaxFile )
router.put('/updateStatus/:id', updateStatus);
router.post('/change-password', changePassword); // New route for changing password
router.delete('/:id', deleteUser); // New route for deleting user


module.exports = router;
