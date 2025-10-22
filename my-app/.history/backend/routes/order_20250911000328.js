const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/Order');

// Place order
router.post('/place', async (req, res) => {
  try {
    const { userId, items, totalPrice, shippingDetails } = req.body;

    if (!userId || !items || items.length === 0 || !totalPrice || !shippingDetails) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const validatedItems = items.map(item => ({
      productId: mongoose.Types.ObjectId(item.id || item.productId),
      quantity: item.quantity || 1
    }));

    const newOrder = new Order({
      userId: mongoose.Types.ObjectId(userId),
      items: validatedItems,
      totalPrice,
      shippingDetails
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

// Get orders by user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId })
      .populate('items.productId', 'name price image')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

module.exports = router;
