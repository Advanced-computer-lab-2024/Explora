
const { CgPassword } = require('react-icons/cg');
const Seller = require('../models/Seller');
const Itinerary = require('../models/Tour_Guide_Itinerary'); // Assuming itineraries are stored in this model
const Activity = require('../controllers/activityController')

const createSeller = async (req, res) => {
    try {
        const { username, email,password, description, products, isAccepted } = req.body;

        const seller = new Seller({
            username,
            email,
            password,
            description,
            products,
            isAccepted
        });

        await seller.save();
        res.status(201).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSellerById = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) return res.status(404).json({ message: "Seller not found" });
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSeller = async (req, res) => {
    try {
        const { username, email, description, products, isAccepted } = req.body;
        const seller = await Seller.findById(req.params.id);

        if (!seller) return res.status(404).json({ message: "Seller not found" });

        seller.username = username || seller.username;
        seller.email = email || seller.email;
        seller.description = description || seller.description;
        seller.products = products || seller.products;
        seller.isAccepted = isAccepted;

        await seller.save();
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSeller = async (req, res) => {
    try {
        const sellerId = req.params.id;

        // Check for any upcoming itineraries with paid bookings
        const upcomingItineraries = await Itinerary.find({
            tourGuideId: sellerId,
            availableDates: { $gte: new Date() },  // Only upcoming dates
            hasBookings: true // Assuming 'hasBookings' implies paid bookings
        });

        if (upcomingItineraries.length > 0) {
            return res.status(400).json({
                message: "Cannot delete profile; there are upcoming itineraries with paid bookings associated with it."
            });
        }
        const getUpcomingActivities = await Activity.find({
            advirtiserId: sellerId,
            availableDates: { $gte: new Date() },  // Only upcoming dates
            hasBookings: true // Assuming 'hasBookings' implies paid bookings
        });

        if (getUpcomingActivities.length > 0) {
            return res.status(400).json({
                message: "Cannot delete profile; there are upcoming activites with paid bookings associated with it."
            });
        }

        

        // If no upcoming itineraries with bookings, proceed with deletion
        const deletedSeller = await Seller.findByIdAndDelete(sellerId);

        if (!deletedSeller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        res.status(200).json({ message: "Seller deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSeller,
    getAllSellers,
    getSellerById,
    updateSeller,
    deleteSeller
};
