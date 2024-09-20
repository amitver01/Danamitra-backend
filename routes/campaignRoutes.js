const express = require('express');
const router = express.Router();
const { createCampaign, deleteCampaign , campaign } = require('../controllers/campaignController');
const protectRoute = require('../middleware/authMiddleware');
router.post('/create', protectRoute ,createCampaign);
router.post('/delete', protectRoute ,deleteCampaign);
router.get('/campaign', campaign);

module.exports = router;
