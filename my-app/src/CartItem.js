import React from 'react';

const CartItem = ({ item, UpdateQuantity, handleBuyNow }) => {
  return (
    <li className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <strong>{item.name}</strong>
        <p>₹{item.price}</p>
        <div className="quantity-controls">
          <button onClick={() => UpdateQuantity(item.id, 'decrease')}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => UpdateQuantity(item.id, 'increase')}>+</button>
        </div>
        <button
          onClick={() => handleBuyNow(item)}
          className="btn btn-success"
        >
          Buy Now
        </button>
      </div>
    </li>
  );
};

export default CartItem;
