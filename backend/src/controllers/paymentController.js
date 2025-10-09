
const Order = require("../models/Order");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
  const { orderId } = req.body;

  try {
    // Find order & verify ownership
    const order = await Order.findById(orderId).populate("orderItems.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }


    const line_items = order.orderItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.name,
          images: [item.product.thumbnail],
        },
        unit_amount: item.product.price * 100
      },
      quantity: item.quantity
    }));


    // Create Stripe Checkout Session
    const paymentIntent = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order-success`,
      cancel_url: `${process.env.FRONTEND_URL}/order-cancel`,
    });

    
    res.json({

      url: paymentIntent.url
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPaymentIntent };