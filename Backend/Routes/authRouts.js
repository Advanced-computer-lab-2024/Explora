const express = require('express')
const router = express.Router()
const cors = require('cors')
const {test, registerUser} = require('../controllers/authController')

//middleware
router.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)
router.get('/', test)
router.post('/register', registerUser)
module.exports = router