const { Schema, model } = require('mongoose');

const orderItemSchema = new Schema({
  productId: {
    type: String, // Use string to avoid ObjectId issues
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const shippingDetailsSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
});

const orderSchema = new Schema({
  userId: { type: String, required: true },
  items: { type: [orderItemSchema], required: true },
  totalPrice: { type: Number, required: true },
  shippingDetails: { type: shippingDetailsSchema, required: true },
}, { timestamps: true });

module.exports = model('Order', orderSchema);
