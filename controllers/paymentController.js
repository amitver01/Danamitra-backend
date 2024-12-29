const express = require('express');
const Stripe = require('stripe');
require('dotenv').config(); // Load environment variables from .env file
const router = express.Router();

// Initialize Stripe with the secret key from environment variables
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { campaignId, amount } = req.body; // Expect campaign ID and amount from the frontend
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `Donation for Campaign ${campaignId}`, // Customize the campaign name
            },
            unit_amount: amount * 100, // Stripe uses the smallest currency unit (paise for INR)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ url: session.url }); // Return the session URL
  } catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

module.exports = router;
