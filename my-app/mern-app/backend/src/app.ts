import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import itemRoutes from './routes/items';
import { connectDB } from './db';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use('/api/items', itemRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});