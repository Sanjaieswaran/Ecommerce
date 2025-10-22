const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice: { type: Number, required: true },
  shippingDetails: {
    email: String,
    contactNumber: String,
    address: String,
    city: String,
    zip: String,
    state: String,
    postalCode: String,
    country: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
