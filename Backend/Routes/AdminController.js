const express = require("express");
const router = express.Router();
router.get('/', (req,res) => {
    res.json({msg:'get all admins'});
})

router.get('/:id', (req, res) => {
    res.json({msg: `get admin with id ${req.params.id}`});
})

router.post('/', (req, res) => {
    res.json({msg: 'add new admin'});
})

router.delete('/:id', (req, res) => {
    res.json({msg: `delete admin with id ${req.params.id}`});
})

router.patch('/:id', (req, res) => {
    res.json({msg: `update admin with id ${req.params.id}`});
})


module.exports = router;