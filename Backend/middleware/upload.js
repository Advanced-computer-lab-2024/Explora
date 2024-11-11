const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
});

const fileFilter = (req, res, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type. Only JPEG, PNG, and PDF are allowed.'), false); // Reject the file

    }
};

// Create the multer instance
const upload = multer({ 
    storage: storage ,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
    // fileFilter: fileFilter
});


const asyncWrapper = (fn) => {  
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };

};

module.exports = {upload, asyncWrapper};
