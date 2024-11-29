const express = require('express');
const Sales = require('../models/Sales');
const router = express.Router();

// Get full sales report for a specific tour guide
router.get('/sales-report', async (req, res) => {
    try {
        const { tourGuideId } = req.query; // Ensure you're fetching tourGuideId

        if (!tourGuideId) {
            return res.status(400).json({ message: 'Tour Guide ID is required' });
        }

        const sales = await Sales.find({ tourGuideId }).sort({ date: -1 });

        const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);

        res.status(200).json({ sales, totalRevenue });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// router.get('/sales-report/:tourGuideId', async (req, res) => {
//     try {
//         const { tourGuideId } = req.params;

//         if (!tourGuideId) {
//             return res.status(400).json({ message: 'Tour Guide ID is required' });
//         }

//         // Fetch all sales records for the given tour guide
//         const sales = await Sales.find({ tourGuideId }).sort({ date: -1 });

//         // Calculate total revenue
//         const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);

//         res.status(200).json({ sales, totalRevenue });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
module.exports = router;
