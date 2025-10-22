import React from 'react';

const ProductCard = ({ product, AddToCart, handleBuyNow }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-card-content">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price.toLocaleString()}</p>
        <div className="product-actions">
          <button className="btn btn-primary" onClick={() => AddToCart(product)}>Add to Cart</button>
          <button className="btn btn-success" onClick={() => handleBuyNow(product)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
