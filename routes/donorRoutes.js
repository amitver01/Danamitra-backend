const express = require('express');
const router = express.Router();
const { registerDonor, loginDonor , searchDonor} = require('../controllers/donorController');

router.post('/register', registerDonor);
router.post('/login', loginDonor);
router.post('/searchDonor' , searchDonor)

module.exports = router;
