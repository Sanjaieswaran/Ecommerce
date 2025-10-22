const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Route to add or update a user's cart
router.post('/add', async (req, res) => {
  const { userId, items } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // If cart exists, update the items
      cart.items = items;
    } else {
      // If cart does not exist, create a new one
      cart = new Cart({ userId, items });
    }

    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Route to get a user's cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      // If no cart is found, return an empty cart
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

module.exports = router;