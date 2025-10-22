import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./HomeProducts.css";

function HomeProducts({ AddToCart, searchTerm }) {
  const navigate = useNavigate();

  const products = [
    { id: "home-1", name: "OnePlus TV", price: 20000, category: "home", image: "images/1+tv.jpeg" },
    { id: "home-2", name: "Preethi Mixture", price: 2500, category: "home", image: "images/preethi.jpeg" },
    { id: "home-3", name: "MI Washing Machine", price: 15000, category: "home", image: "images/miw.jpeg" },
    { id: "home-4", name: "Realme AC", price: 35000, category: "home", image: "images/relme.jpeg" },
    { id: "home-5", name: "Sony Speaker", price: 4000, category: "home", image: "images/sony.jpeg" },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuyNow = (product) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      alert("Please sign in to place an order");
      return;
    }

    // ✅ Navigate to CheckoutForm with product details
    navigate("/checkout", {
      state: {
        items: [
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ],
      },
    });
  };

  return (
    <section id="home-products" className="products-section container">
      <h2>Home Products</h2>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            AddToCart={AddToCart}
            handleBuyNow={handleBuyNow}
          />
        ))}
      </div>
      </section>
  );
}


export default HomeProducts;