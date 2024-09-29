const touristModel = require('../models/tourestModel.js');
const { default: mongoose } = require('mongoose');

const getTourist = async (req, res) => {
    //retrieve tourist info from the database
    try {
      const { email } = req.params; // assuming the email is passed as a URL parameter
      const tourist = await touristModel.findOne({ email: email }); // find by email
  
      if (!tourist) {
        return res.status(404).json({ message: "Tourist not found" });
      }
  
      res.status(200).json(tourist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const createTourist = async (req, res) => {
    try {
        const { email, username, password, mobileNumber, nationality, dateOfBirth, job, wallet } = req.body;

        const newTourist = new Tourist({
            email,
            username,
            password,
            mobileNumber,
            nationality,
            dateOfBirth,
            job,
            wallet
        });

        const savedTourist = await newTourist.save();

        res.status(201).json(savedTourist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
   const updateTourist = async (req, res) => {
    try {
      const { email, password, mobileNumber, nationality, dateOfBirth, job } = req.body;
  
      const updatedTourist = await Tourist.findOneAndUpdate(
        { email: req.params.email },  // Find by email
        {
          password,
          mobileNumber,
          nationality,
          dateOfBirth,
          job,
          wallet
        },
        { new: true, runValidators: true }  // Return the updated document, ensure validation
      );
  
      if (!updatedTourist) {
        return res.status(404).json({ message: `No tourist found with email ${req.params.email}` });
      }
  
      res.status(200).json(updatedTourist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
 
 
 
 
 module.exports = { getTourist, updateTourist,createTourist};
 