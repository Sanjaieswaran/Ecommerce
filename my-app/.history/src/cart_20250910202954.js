import React, { useState } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import CheckoutForm from './components/CheckoutForm';
import './cart.css';

const Cart = ({ cartItems, UpdateQuantity, clearCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBuyNow = async (product = null) => {
    if (!product) { // If "Buy All" is clicked
      setShowCheckout(true);
      return; // Stop here, let CheckoutForm handle the actual order placement
    }
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (!userId) { // Add this check
      alert('Please log in to buy now.');
      return;
    }

    let itemsToOrder = [];

    if (product) {
      // Single product buy now
      itemsToOrder = [{
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      }];
    } else {
      // All cart items
      itemsToOrder = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
    }

    const totalOrderPrice = itemsToOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      const res = await fetch('http://localhost:5000/api/order/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, items: itemsToOrder, totalPrice: totalOrderPrice }),
      });

      const data = await res.json();
      alert(data.message);

      // Clear cart if ordering all items
      if (!product) clearCart();

    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    }
  };

  const handlePlaceOrder = async (shippingDetails) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (!userId) {
      alert('Please log in to place an order.');
      return;
    }

    const itemsToOrder = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const totalOrderPrice = itemsToOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      console.log("Sending order data:", { userId, items: itemsToOrder, totalPrice: totalOrderPrice, shippingDetails });
      const res = await fetch('http://localhost:5000/api/order/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          items: itemsToOrder,
          totalPrice: totalOrderPrice,
          shippingDetails,
        }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        clearCart();
        setShowCheckout(false);
      }

    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {showCheckout ? (
            <CheckoutForm
              onPlaceOrder={handlePlaceOrder}
              cartItems={cartItems}
              totalPrice={totalPrice}
            />
          ) : (
            <>
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    UpdateQuantity={UpdateQuantity}
                    handleBuyNow={handleBuyNow}
                  />
                ))}
              </ul>
              <CartSummary
                totalItems={totalItems}
                totalPrice={totalPrice}
                handleBuyNow={handleBuyNow}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;