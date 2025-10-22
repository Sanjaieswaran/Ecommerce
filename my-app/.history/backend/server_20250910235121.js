const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// ------------------- MIDDLEWARE -------------------
app.use(cors());
app.use(bodyParser.json());

// ------------------- ROUTES -------------------
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');       // Orders routes
const contactRoutes = require('./routes/contact');   // Contact routes

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);       // Plural 'orders' matches frontend fetch
app.use('/api/contact', contactRoutes);

// ------------------- DATABASE -------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ------------------- TEST ROUTE -------------------
app.get('/', (req, res) => {
  res.send('Backend is working ✅');
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
