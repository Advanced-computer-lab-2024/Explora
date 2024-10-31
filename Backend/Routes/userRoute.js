// routes/user.js

const express = require('express');
const {upload} = require('../middleware/upload');
const { registerUser,
        viewUsers, 
        getUserid, 
        getRoleByUsername, 
        loginUser, 
        downloadIDFile,
        downloadCertificateFile,
        downloadTaxFile
    } = require('../controllers/userController'); // Import the controller

const router = express.Router();

// Route to register a new user
router.post('/register', upload.fields([{ name: 'idFile', maxCount: 1 }, { name: 'certificatesFile', maxCount: 1 }, { name: 'taxFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]), registerUser);
router.post ('/login', loginUser)
router.get('/:username', getRoleByUsername)
router.get('/',viewUsers)
router.get('/downloadID/:id', downloadIDFile )
router.get('/downloadCertificate/:id', downloadCertificateFile )
router.get('/downloadTax/:id', downloadTaxFile )



// Additional user routes can go here...

module.exports = router;
