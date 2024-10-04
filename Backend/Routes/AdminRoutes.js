const express = require("express");
const router = express.Router();
const{
    deleteAdminAccount,
    createAdminAccount,
    getAllAdminAccounts    
} = require("../controllers/AdminController");

router.delete("/:username",deleteAdminAccount)
router.post("/",createAdminAccount)
router.get("/", getAllAdminAccounts)
router.get("/", getAllAdminAccounts)



module.exports = router; 