# Project Process Documentation

This document outlines the key processes, code structure, database connection, and data sharing mechanisms within this e-commerce project, focusing on the backend and its interaction with the frontend.

## 1. Backend Structure and Processes

The backend of this application is built using Node.js with the Express.js framework. It follows a modular structure to organize different functionalities:

*   **`server.js`**: This is the entry point of the backend application. It initializes the Express app, sets up middleware (CORS, body-parser), connects to the MongoDB database, and mounts the various API routes.
*   **`routes/`**: This directory contains separate files for different API endpoints (e.g., `auth.js`, `cart.js`, `order.js`, `contact.js`). Each file defines the HTTP methods (GET, POST, PUT, DELETE) and their corresponding logic for specific resources.
*   **`models/`**: This directory holds Mongoose schemas and models. Each file here defines the structure and validation rules for a specific data collection in MongoDB (e.g., `User.js`, `Product.js`, `Cart.js`, `Order.js`, `Contact.js`).

## 2. Database Connection

The application uses **MongoDB** as its database, connected via the **Mongoose** ODM (Object Data Modeling) library.

*   **Configuration**: The MongoDB connection URI is stored as an environment variable (`MONGO_URI`) and accessed using the `dotenv` package. This keeps sensitive information out of the codebase.
*   **Connection Logic (`server.js`)**:
    ```javascript
    // MongoDB connection
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log("✅ MongoDB Connected"))
      .catch(err => console.error("❌ MongoDB Error:", err));
    ```
    This code snippet in `server.js` establishes the connection to the MongoDB database. It attempts to connect using the `MONGO_URI` and logs a success or error message to the console.

## 3. Code Explanation: Contact Form Submission Example

Let's trace the process of a user submitting the contact form:

*   **Frontend (`src/contact.js`)**:
    *   The `Contact` React component renders a form with fields for `name`, `email`, and `message`.
    *   When the user submits the form, the `handleSubmit` function is triggered.
    *   This function prevents the default form submission behavior.
    *   It then makes an asynchronous `POST` request to the backend endpoint `http://localhost:5000/api/contact`.
    *   The form data (`name`, `email`, `message`) is sent as a JSON string in the request body.
    *   It handles the response from the backend, showing an alert based on success or failure.

    ```javascript
    // Excerpt from src/contact.js
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });

        const data = await res.json();
        if (res.ok) {
          alert('Message sent! We will contact you soon.');
          setForm({ name: '', email: '', message: '' });
        } else {
          alert(data.msg || 'Failed to send message.');
        }
      } catch (err) {
        console.error(err);
        alert('Server error. Please try again later.');
      }
    };
    ```

*   **Backend Route (`backend/routes/contact.js`)**:
    *   The `server.js` file routes requests to `/api/contact` to this file.
    *   It defines a `POST` endpoint (`/`) that receives the incoming request.
    *   It extracts `name`, `email`, and `message` from `req.body`.
    *   Basic validation checks if all fields are present.
    *   A new `Contact` document is created using the `Contact` Mongoose model.
    *   The `save()` method is called on the new document to persist it to the MongoDB database.
    *   A JSON response is sent back to the frontend indicating success or an error.

    ```javascript
    // Excerpt from backend/routes/contact.js
    const express = require('express');
    const router = express.Router();
    const Contact = require('../models/Contact');

    router.post('/', async (req, res) => {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }

      try {
        const newContact = new Contact({
          name,
          email,
          message,
        });

        const contact = await newContact.save();
        res.json({ msg: 'Contact form submitted successfully', contact });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });
    ```

*   **Mongoose Model (`backend/models/Contact.js`)**:
    *   This file defines the schema for the `Contact` collection in MongoDB.
    *   It specifies that `name`, `email`, and `message` are strings and are required.
    *   A `date` field is automatically added with a default value of the current timestamp.

    ```javascript
    // Excerpt from backend/models/Contact.js
    const mongoose = require('mongoose');

    const ContactSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    });

    module.exports = mongoose.model('Contact', ContactSchema);
    ```

## 4. Data Sharing (Frontend-Backend Communication)

Data is primarily shared between the frontend and backend using **RESTful API principles** and **JSON** (JavaScript Object Notation).

*   **API Endpoints**: The backend exposes various API endpoints (e.g., `/api/auth`, `/api/cart`, `/api/order`, `/api/contact`).
*   **HTTP Methods**: Standard HTTP methods (GET, POST, PUT, DELETE) are used to perform CRUD (Create, Read, Update, Delete) operations on resources.
*   **Request/Response Body**:
    *   **Frontend to Backend**: Data sent from the frontend to the backend (e.g., form submissions, user credentials) is typically included in the request body as a JSON payload. The `body-parser` middleware on the backend automatically parses this JSON.
    *   **Backend to Frontend**: The backend sends responses back to the frontend, usually as JSON objects. These objects contain data (e.g., user information, product lists, confirmation messages) and status codes (e.g., 200 OK, 400 Bad Request, 500 Internal Server Error).
*   **Authentication (JWT)**: For authenticated routes, a JSON Web Token (JWT) is used.
    *   Upon successful login, the backend issues a JWT to the frontend.
    *   The frontend stores this token (e.g., in `localStorage`).
    *   For subsequent authenticated requests, the frontend includes this JWT in the `Authorization` header (e.g., `Bearer <token>`).
    *   The backend then verifies the token to authenticate the user before processing the request.

This documentation provides a high-level overview of the project's architecture and data flow.
