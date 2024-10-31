const express = require("express");
const router = express.Router();
const {upload}= require('../middleware/upload');
const{
    createProduct,
    allProducts,
    productsByName ,
    availableProducts,
    searchProducts,
    filteredProducts,
    sortProducts,
    updateProduct,
    addReview,
    viewQuantityAndSales,
    archiveProduct
} = require("../controllers/ProductController");

router.get('/', allProducts);                            
router.get('/quantity&sales', viewQuantityAndSales);       
router.post('/upload', upload.single('image'), createProduct);
router.get('/availableProducts', availableProducts);    
router.get('/filterByPrice', filteredProducts);          
router.get('/sortByRating', sortProducts);               
router.put('/updateProduct/:id', updateProduct);          
router.get('/productByName/:name', productsByName);     
router.get('/:name', searchProducts);                     
router.put('/addReview/:id', addReview);  
router.put('/archiveProduct/:id', archiveProduct);





module.exports = router;

