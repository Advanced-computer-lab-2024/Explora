const express = require("express");
const router = express.Router();
const { authenticateUser } = require('../middleware/AuthMiddleware'); // Adjust the path as necessary

const{
    deleteAdminAccount,
    createAdminAccount,
    getAllAdminAccounts,
    changePassword  ,
    viewDeleteRequests,
    filterByStatus,
    acceptRequest,
    deleteUser
} = require("../controllers/AdminController");

router.delete("/:username",deleteAdminAccount)
router.post("/",createAdminAccount)
router.get("/", getAllAdminAccounts)
router.get("/", getAllAdminAccounts)
router.put("/change-password", changePassword);
router.get("/delete-requests", viewDeleteRequests);
router.get("/delete-requests/filter/:status", filterByStatus);
router.put("/accept-request/:id", acceptRequest);
router.delete("/delete-user/:id", deleteUser);




module.exports = router; 