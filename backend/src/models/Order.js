const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  
},{ _id: false ,versionKey:false});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'pending' }, // e.g. pending, paid, delivered
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
