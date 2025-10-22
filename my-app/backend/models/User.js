// Using destructuring to import Schema and model from mongoose
const { Schema, model } = require('mongoose');

// Defining the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'seller'],
    default: 'user',
  },
}, { timestamps: true });

// Exporting the User model
module.exports = model('User', userSchema);