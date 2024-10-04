const express = require("express");
const router = express.Router();
const {
    createActivityCategory,
    readActivityCategories,
    updateActivityCategory,
    deleteActivityCategory
} = require("../controllers/ActivityCategoryController");

// POST - Create a new category
router.post("/", createActivityCategory);

// GET - Read all categories
router.get("/", readActivityCategories);

// PUT - Update an existing category
router.put("/", updateActivityCategory);

// DELETE - Delete a category
router.delete("/:activityType", deleteActivityCategory);

module.exports = router;