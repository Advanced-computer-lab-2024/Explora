const express = require("express");
const router = express.Router();

// Import routes
const {
    createAddress,
    getAllAddresses,
    deleteAddressById,
    viewAddresses,
} = require("../controllers/AddressController");

// GET - Get all addresses

router.get("/", getAllAddresses);

// POST - Create a new address

router.post("/:touristId", createAddress);

// DELETE - Delete an address by ID

router.delete("/:addressId", deleteAddressById);

// GET - View addresses by tourist ID

router.get("/user/:touristId", viewAddresses);

module.exports = router;