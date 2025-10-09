const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// @desc    Create Stripe payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
router.post('/create-payment-intent', protect, createPaymentIntent);

module.exports = router;