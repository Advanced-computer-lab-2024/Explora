const Complaint = require ('../models/ComplaintModel');

const addComplaint = async (req, res) => {
    try {
        const { user } = req.params;
        const { title, body, status, date } = req.body;
        if (!title || !body) {
            return res.status(400).json({ error: "Title and body are required fields." });
        }
        const complaint = await Complaint.create({
            user,
            title,
            body,
            status,
            date,
        });
        res.status(201).json(complaint);
    } catch (err) {
        console.error("Error creating complaint:", err); // Optional: log the error
        res.status(400).json({ error: err.message });
    }
};

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().select('title status');
        res.status(200).json(complaints);
    } catch (err) {
        console.error("Error retrieving complaints:", err);
        res.status(500).json({ error: err.message });
    }
};

const getComplaintById = async (req, res) => {
    try {
        const {id} = req.params;
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ error: "Complaint not found." });
        }
        res.status(200).json(complaint);
    } catch (err) {
        console.error("Error retrieving complaint:", err);
        res.status(500).json({ error: err.message });
    }
};

const updateComplaintStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
        if (!complaint) {
            return res.status(404).json({ error: "Complaint not found." });
        }
        res.status(200).json(complaint);
    } catch (err) {
        console.error("Error updating complaint status:", err);
        res.status(500).json({ error: err.message });
    }
};

const replyToComplaint = async (req, res) => {
    try {
        const {id} = req.params;
        const {reply} = req.body;
        const complaint = await Complaint.findByIdAndUpdate(id, { reply }, { new: true });
        if (!complaint) {
            return res.status(404).json({ error: "Complaint not found." });
        }
        res.status(200).json(complaint);
    } catch (err) {
        console.error("Error replying to complaint:", err);
        res.status(500).json({ error: err.message });
    }
}

const sortByDate = async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ date: -1 });
        res.status(200).json(complaints);
    } catch (err) {
        console.error("Error sorting complaints by date:", err);
        res.status(500).json({ error: err.message });
    }
}
const sortAndFilterComplaints = async (req, res) => {
    try {
        const { status, order = 'desc' } = req.query; // Default to descending order
        const sortOrder = order === 'asc' ? 1 : -1;

        // Build a filter object
        const filter = {};
        if (status) {
            filter.status = status;
        }
        const complaints = await Complaint.find(filter).sort({ date: sortOrder });
        res.status(200).json(complaints);
    } catch (err) {
        console.error("Error sorting and filtering complaints:", err);
        res.status(500).json({ error: err.message });
    }
};

const myComplaints = async (req, res) => {
    try {
        const { user } = req.params;
        const complaints = await Complaint.find({ user });
        res.status(200).json(complaints);
    } catch (err) {
        console.error("Error retrieving user's complaints:", err);
        res.status(500).json({ error: err.message });
    }
}









module.exports = {
    addComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaintStatus,
    replyToComplaint,
    sortByDate,
    sortAndFilterComplaints,
    myComplaints

}