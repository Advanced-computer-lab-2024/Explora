// routes/user.js

const express = require('express');
const {upload} = require('../middleware/upload');
const { registerUser,
        viewUsers, 
        getUserid, 
        getRoleByUsername, 
        loginUser, 
        logout,
        downloadIDFile,
        downloadCertificateFile,
        downloadTaxFile,
        updateStatus,
        viewRequests,
        filterByStatus,
    } = require('../controllers/userController'); // Import the controller

const router = express.Router();

// Route to register a new user
router.get('/role/:username', getRoleByUsername);
router.get('/requests', viewRequests);
router.get('/filterByStatus/:status', filterByStatus);
router.post('/register', upload.fields([{ name: 'idFile', maxCount: 1 }, { name: 'certificatesFile', maxCount: 1 }, { name: 'taxFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]), registerUser);
router.post ('/login', loginUser)
router.get('/logout', logout)
router.get('/:username', getUserid)
router.get('/',viewUsers)
router.get('/downloadID/:id', downloadIDFile )
router.get('/downloadCertificate/:id', downloadCertificateFile )
router.get('/downloadTax/:id', downloadTaxFile )
router.put('/updateStatus/:id', updateStatus);







// Additional user routes can go here...

module.exports = router;
