// Using destructuring to import Schema and model from mongoose
const { Schema, model } = require('mongoose');

// Defining the order item schema
const orderItemSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Defining the shipping details schema
const shippingDetailsSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Defining the order schema
const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: [orderItemSchema],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingDetails: { // Add shipping details
    type: shippingDetailsSchema,
    required: true,
  },
}, { timestamps: true });

// Exporting the Order model
module.exports = model('Order', orderSchema);