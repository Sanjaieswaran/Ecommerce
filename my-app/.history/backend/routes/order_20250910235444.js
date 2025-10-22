const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders/place
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

    const newOrder = new Order({ userId, items: validatedItems, totalPrice, shippingDetails });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
});

// GET /api/orders/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId })
      .populate('items.productId', 'name price image') // include product image
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map(order => ({
      _id: order._id,
      createdAt: order.createdAt,
      totalAmount: order.totalPrice,
      items: order.items.map(item => ({
        quantity: item.quantity,
        product: item.productId,
      })),
    }));

    res.status(200).json(formattedOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
});

module.exports = router;
