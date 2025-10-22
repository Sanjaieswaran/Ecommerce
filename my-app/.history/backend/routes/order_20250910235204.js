const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ------------------- PLACE NEW ORDER -------------------
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

// ------------------- GET ORDERS BY USER -------------------
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Populate productId with name, price, and image
    const orders = await Order.find({ userId })
      .populate('items.productId', 'name price image')
      .sort({ createdAt: -1 });

    // Format orders for frontend
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      createdAt: order.createdAt,
      totalAmount: order.totalPrice,
      items: order.items.map(item => ({
        quantity: item.quantity,
        product: item.productId, // contains name, price, image
      })),
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

module.exports = router;
