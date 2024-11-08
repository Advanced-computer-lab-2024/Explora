const express = require("express");
const router = express.Router();
const {
    addComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaintStatus,
    replyToComplaint,
    sortByDate,
    sortAndFilterComplaints,
    myComplaints
} = require("../controllers/ComplaintsController");

// POST - Create a new complaint
router.post("/:user", addComplaint);

// GET - Sort complaints by date
router.get("/sortdate", sortByDate);

// GET - Filter and sort complaints based on user, activity, and status
router.get("/sort", sortAndFilterComplaints);


// GET - Read all complaints
router.get("/", getAllComplaints);

// GET - Read a specific complaint
router.get("/:id", getComplaintById);

// GET - Read all complaints for a specific user
router.get("/user/:user", myComplaints);


// PUT - Update the status of a complaint
router.put("/status/:id", updateComplaintStatus);

// PUT - Reply to a complaint
router.put("/reply/:id", replyToComplaint);

router.get("/myComplaints/:user", myComplaints);



module.exports = router;
