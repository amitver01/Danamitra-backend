const express = require('express');
const router = express.Router();
const { createCampaign, deleteCampaign } = require('../controllers/campaignController');

router.post('/create', createCampaign);
router.post('/delete', deleteCampaign);

module.exports = router;
