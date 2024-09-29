const express = require("express");
const router = express.Router();
const{
    createProduct,
    allProducts,
    productsByName   
} = require("../controllers/ProductController");

router.get("/",allProducts)
router.post("/",createProduct)
router.get('/:name', productsByName)

module.exports = router;

