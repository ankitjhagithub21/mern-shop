const express = require('express');
const router = express.Router();
const { createPaymentIntent, handleStripeWebhook } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// @desc    Create Stripe payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
router.post('/create-payment-intent', protect, createPaymentIntent);

// @desc    Handle Stripe webhook
// @route   POST /api/payments/webhook
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

module.exports = router;