const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Address = require('../models/Address');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddressId, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Verify the shipping address belongs to the user
    const shippingAddress = await Address.findById(shippingAddressId);
    if (!shippingAddress || shippingAddress.user.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: 'Invalid shipping address' });
    }
    
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress: shippingAddressId,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      // COD orders should remain unpaid until delivery
      isPaid: false,
      isDelivered: false
    });
    
    const createdOrder = await order.save();
    
    // Clear user's cart after successful order creation
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { products: [] } }
    );
    
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('shippingAddress');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product')
      .populate('shippingAddress');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('shippingAddress')
      .populate('orderItems.product', 'name thumbnail')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments({});
    const totalPages = Math.ceil(totalOrders / limit);

    res.json({
      orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update order status (e.g., paid, delivered)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const { status } = req.body;
    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update order payment status
// @route   PUT /api/orders/:id/payment
// @access  Private
const updateOrderPaymentStatus = async (req, res) => {
  try {
    const { paymentIntentId, isPaid, paidAt } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify order belongs to user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update payment status
    order.isPaid = isPaid;
    order.paidAt = paidAt;
    if (paymentIntentId) {
      order.paymentResult = {
        id: paymentIntentId,
        status: 'completed',
        update_time: new Date().toISOString(),
      };
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  updateOrderPaymentStatus,
};
