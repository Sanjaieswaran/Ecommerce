// Using destructuring to import Schema and model from mongoose
const { Schema, model } = require('mongoose');

// Defining the cart item schema
const cartItemSchema = new Schema({
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

// Defining the cart schema
const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  }, // associate cart with a user
  items: [cartItemSchema],
}, { timestamps: true });

// Exporting the Cart model
module.exports = model('Cart', cartSchema);