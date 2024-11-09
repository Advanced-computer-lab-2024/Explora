const express = require("express");
const router = express.Router();
const { authenticateUser } = require('../middleware/AuthMiddleware'); // Adjust the path as necessary

const{
    deleteAdminAccount,
    createAdminAccount,
    getAllAdminAccounts,
    changePassword  
} = require("../controllers/AdminController");

router.delete("/:username",deleteAdminAccount)
router.post("/",createAdminAccount)
router.get("/", getAllAdminAccounts)
router.get("/", getAllAdminAccounts)
router.put("/change-password", changePassword);



module.exports = router; 