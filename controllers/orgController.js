const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Organization = require('../models/orgModel'); 

const registerOrg = async (req, res) => {
  const { name, email, password, phone, address, website, description } = req.body;

  try {

    let organization = await Organization.findOne({ email });
    if (organization) {
      return res.status(400).json({ message: 'Organization already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    organization = new Organization({
      name,
      email,
      password: hashedPassword, 
      phone,
      address,
      website,
      description,
    });
    await organization.save();

    const token = jwt.sign({ id: organization._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
    organization
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const loginOrg = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the organization exists
      const organization = await Organization.findOne({ email });
      if (!organization) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, organization.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
   
      const token = jwt.sign({ id: organization._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({
        organization , token
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const searchOrg = async (req, res) => {
    const { _id } = req.body;
  
    // Validate the _id is present
    if (!_id) {
      return res.status(400).json({ message: 'Organization ID is required' });
    }
  
    try {
      // Search for the donor by _id
      const organization = await Organization.findById(_id);
      
      // If no donor is found, return a 404 error
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
  
      // Return the donor data
      res.status(200).json({ organization });
    } catch (error) {
      // Handle server errors
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

module.exports = {
    registerOrg,
    loginOrg,
    searchOrg
  };