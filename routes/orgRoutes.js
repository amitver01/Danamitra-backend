const express = require('express');
const router = express.Router();
const { registerOrg, loginOrg , searchOrg } = require('../controllers/orgController');

router.post('/register', registerOrg);
router.post('/login', loginOrg);
router.post('/search' , searchOrg);

module.exports = router;
