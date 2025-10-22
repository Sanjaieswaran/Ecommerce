const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Route to place a new order
router.post('/place', async (req, res) => {
  try {
    const { userId, items, totalPrice, shippingDetails } = req.body;

    console.log("Received order data:", req.body);

    // Basic validation
    if (!userId || !items || items.length === 0 || !totalPrice || !shippingDetails) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    // Validate and map items to ensure they have the required properties
    const validatedItems = items.map(item => {
      if (!item.id && !item.productId) {
        throw new Error('Each item must have a productId');
      }
      return {
        productId: item.id || item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      };
    });

    // Create a new order
    const newOrder = new Order({
      userId,
      items: validatedItems,
      totalPrice,
      shippingDetails,
    });

    console.log("Saving Order:", newOrder); // For debugging purposes
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

// Route to get orders by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Find orders for the user and populate product details
    const orders = await Order.find({ userId }).populate('items.productId', 'name price');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

module.exports = router;