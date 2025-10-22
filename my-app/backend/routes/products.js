const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Route to get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Route to create a new product
router.post('/', async (req, res) => {
  try {
    const { name, price, category, image, stock } = req.body;
    const newProduct = new Product({ name, price, category, image, stock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Route to update a product
router.put('/:id', async (req, res) => {
  try {
    const { name, price, category, image, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, image, stock },
      { new: true } // Return the updated document
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Route to delete a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Route to seed the database with sample products (for development purposes)
router.post('/seed', async (req, res) => {
  try {
    const sampleProducts = [
      { name: 'OnePlus TV', price: 20000, category: 'home', image: 'images/1+tv.jpeg', stock: 10 },
      { name: 'Preethi Mixture', price: 2500, category: 'home', image: 'images/preethi.jpeg', stock: 15 },
      { name: 'MI Washing Machine', price: 15000, category: 'home', image: 'images/miw.jpeg', stock: 5 },
      { name: 'Realme AC', price: 35000, category: 'home', image: 'images/relme.jpeg', stock: 3 },
      { name: 'Sony Speaker', price: 4000, category: 'home', image: 'images/sony.jpeg', stock: 8 },
      { name: 'Pickachu Mobile', price: 10, category: 'mobiles', image: 'images/pickachu.jpg', stock: 25 },
      { name: 'OnePlus', price: 25000, category: 'mobiles', image: 'images/1+.jpeg', stock: 7 },
      { name: 'Apple', price: 70000,category: 'mobiles', image: 'images/apple.jpeg', stock: 4 },
    ];

    // Clear existing products and insert the sample products
    await Product.deleteMany({});
    const insertedProducts = await Product.insertMany(sampleProducts);

    res.status(201).json(insertedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to seed products' });
  }
});

module.exports = router;