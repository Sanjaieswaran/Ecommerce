import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./HomeProducts.css";

function HomeProducts({ AddToCart }) {
  const navigate = useNavigate();

  const products = [
    { id: "home-1", name: "OnePlus TV", price: 20000, image: "images/1+tv.jpeg" },
    { id: "home-2", name: "Preethi Mixture", price: 2500, image: "images/preethi.jpeg" },
    { id: "home-3", name: "MI Washing Machine", price: 15000, image: "images/miw.jpeg" },
    { id: "home-4", name: "Realme AC", price: 35000, image: "images/relme.jpeg" },
    { id: "home-5", name: "Sony Speaker", price: 4000, image: "images/sony.jpeg" },
  ];

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

            const data = await response.json();
            alert(data.message);
        } catch (err) {
            console.error(err);
            alert("Failed to place order");
        }
  };

  return (
        <section id="computers" className="products">
      <h2>Home Products</h2>
      <div className="product-grid">
                {products.map(product => (
                    <div className="product" key={product.id}>
                        <h3>{product.name}</h3>
                        <img src={product.image} alt={product.name} />
                        <p>Price: ₹{product.price.toLocaleString("en-IN")}.00</p>
                        <div className="button-group">
                            <button onClick={() => AddToCart(product)}>Add to Cart</button>
                            <button className="buy-now" onClick={() => handleBuyNow(product)}>Buy Now</button>
                        </div>
                    </div>
        ))}
      </div>
    </section>
  );
}

export default HomeProducts;
