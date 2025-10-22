const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place a new order
router.post('/place', async (req, res) => {
  try {
    const { userId, items, totalPrice, shippingDetails } = req.body;

    if (!userId || !items || items.length === 0 || !totalPrice || !shippingDetails) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const validatedItems = items.map(item => ({
      productId: item.id || item.productId,
      name: item.name || 'No Name',
      price: item.price || 0,
      image: item.image || 'https://via.placeholder.com/100',
      quantity: item.quantity || 1,
    }));

    const newOrder = new Order({
      userId,
      items: validatedItems,
      totalPrice,
      shippingDetails,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

// Get orders by user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

module.exports = router;
