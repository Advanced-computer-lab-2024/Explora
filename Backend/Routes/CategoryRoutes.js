const express = require('express');
const { getAllCategories } = require('../controllers/categoryController');
const router = express.Router();

// GET all categories
router.get('/', getAllCategories);

module.exports = router;
