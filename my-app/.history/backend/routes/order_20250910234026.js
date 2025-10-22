const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders/place – Create a new order
router.post('/place', async (req, res) => {
  try {
    const { userId, items, totalPrice, shippingDetails } = req.body;

    if (!userId || !items || items.length === 0 || !totalPrice || !shippingDetails) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const validatedItems = items.map(item => ({
      productId: item.id || item.productId,
      name: item.name,
      price: item.price,
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
    console.error("Order Error:", error);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

// GET /api/orders/user/:userId – Fetch all orders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId })
      .populate('items.productId', 'name price')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

module.exports = router;
