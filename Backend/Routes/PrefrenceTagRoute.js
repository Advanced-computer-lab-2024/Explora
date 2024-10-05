const express = require("express");
const router = express.Router();
const {
    createPrefrenceTag,
    readPrefrenceTag,
    updatePrefrenceTag,
    deletePrefrenceTag
} = require("../controllers/PrefrenceTagController");

// POST - Create a new category
router.post("/", createPrefrenceTag);

// GET - Read all categories
router.get("/", readPrefrenceTag);

// PUT - Update an existing category
router.put("/", updatePrefrenceTag);

// DELETE - Delete a category
router.delete("/:tag", deletePrefrenceTag);

module.exports = router;