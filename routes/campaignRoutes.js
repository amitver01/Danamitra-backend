const express = require('express');
const router = express.Router();
const { createCampaign, deleteCampaign , campaign , searchCampaignsByCategory } = require('../controllers/campaignController');
const protectRoute = require('../middleware/authMiddleware');
router.post('/create', protectRoute ,createCampaign);
router.post('/delete', protectRoute ,deleteCampaign);
router.get('/campaign', campaign);
router.get('/searchCategory' , searchCampaignsByCategory);

module.exports = router;
