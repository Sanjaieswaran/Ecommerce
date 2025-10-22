import React from 'react';

const CartSummary = ({ totalItems, totalPrice, handleBuyNow }) => {
  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ₹{totalPrice}</p>
      <button
        onClick={() => handleBuyNow()}
        className="btn btn-primary"
      >
        Buy All
      </button>
    </div>
  );
};

export default CartSummary;
