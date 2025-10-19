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
      success_url: `${process.env.CLIENT_URL}/order-success?orderId=${orderId}`,
      cancel_url: `${process.env.CLIENT_URL}/order-cancel?orderId=${orderId}`,
    });

    
    res.json({

      url: paymentIntent.url
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Handle Stripe webhook
// @route   POST /api/payments/webhook
// @access  Public
const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await updateOrderPaymentStatus(session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// Helper function to update order payment status
const updateOrderPaymentStatus = async (session) => {
  try {
    // Extract orderId from success_url
    const successUrl = session.success_url;
    const orderId = new URL(successUrl).searchParams.get('orderId');

    if (!orderId) {
      console.log('No orderId found in session');
      return;
    }

    // Update order payment status
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        isPaid: true,
        paidAt: new Date(),
        paymentResult: {
          id: session.payment_intent,
          status: session.payment_status,
          email_address: session.customer_details?.email
        }
      },
      { new: true }
    );

    if (order) {
      console.log(`Order ${orderId} payment status updated successfully`);
    } else {
      console.log(`Order ${orderId} not found`);
    }
  } catch (error) {
    console.error('Error updating order payment status:', error);
  }
};

module.exports = { createPaymentIntent, handleStripeWebhook };