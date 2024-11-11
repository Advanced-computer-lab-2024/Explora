const express = require("express");
const router = express.Router();
const { authenticateUser } = require('../middleware/AuthMiddleware'); // Adjust the path as necessary
const deletionRequest = require("../models/DeletionRequest"); // Adjust the path as necessary
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
router.delete("/delete-user/:username", deleteUser);

router.delete("/all", (req, res) => {

    // delete all requests
    DeletionRequest.deleteMany({}, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
    })




module.exports = router; 