import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import './App.css';
import SellerPage from './pages/SellerPage';
import Signin from './pages/Signin';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  console.log('User state in App.js:', user);

  // Load user from localStorage on page reload
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Add product to cart
  const AddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Update quantity
  const UpdateQuantity = (productId, action) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            if (action === 'increase') {
              return { ...item, quantity: item.quantity + 1 };
            }
            if (action === 'decrease') {
              return { ...item, quantity: item.quantity - 1 };
            }
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
      <Router>
        <Header cartCount={cartCount} user={user} handleLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route path="/*" element={<Main AddToCart={AddToCart} cartItems={cartItems} UpdateQuantity={UpdateQuantity} setUser={setUser} />} />
            <Route path="/seller" element={user && user.role === 'seller' ? <SellerPage /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={<Signin setUser={setUser} />} />
          </Routes>
        </div>
        <footer>
          <p>&copy; 2025 My Store. All rights reserved.</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
