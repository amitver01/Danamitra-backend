const express=require('express');
const router=express.Router();

const checkout_session=require('../controllers/paymentController');

router.post('/checkout_session' , checkout_session);

module.exports = router;