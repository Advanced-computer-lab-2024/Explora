
const User = require('../models/User');
const test = (req, res) => {
    res.send('Hello, World!');
}
const registerUser = async (req, res) => {
    try {
        const {name, password} = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({ error: 'Password is required and should be atleast 8 characters long' });
        }
        const user = await User.create ({name: name, password: password});
        return res.json({ user });

    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    
};


module.exports = {
    test,
    registerUser
}