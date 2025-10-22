import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

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
        <Main
          AddToCart={AddToCart}
          cartItems={cartItems}
          UpdateQuantity={UpdateQuantity}
          setUser={setUser}
        />
      </Router>

      <footer>
        <p>&copy; 2025 Online Store</p>
      </footer>
    </div>
  );
}

export default App;