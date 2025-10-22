// Using destructuring to import Schema and model from mongoose
const { Schema, model } = require('mongoose');

// Defining the product schema
const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  stock: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Exporting the Product model
module.exports = model('Product', productSchema);