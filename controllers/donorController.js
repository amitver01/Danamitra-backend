const Donor = require('../models/donorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Donor
const registerDonor = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let donor = await Donor.findOne({ email });
    if (donor) {
      return res.status(400).json({ message: 'Donor already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    donor = new Donor({ name, email, password:hashedPassword });
    await donor.save();

    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ donor , token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Donor
const loginDonor = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }


    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ donor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerDonor,
  loginDonor,
};
