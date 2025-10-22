import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import './App.css';

function Mobiles({ AddToCart }) {
    const navigate = useNavigate();

    const products = [
        { id: 'mobile-1', name: 'Pickachu Mobile', price: 10, image: 'images/pickachu.jpg' },
        { id: 'mobile-2', name: 'OnePlus', price: 25000, image: 'images/1+.jpeg' },
        { id: 'mobile-3', name: 'Apple', price: 70000, image: 'images/apple.jpeg' },
        { id: 'mobile-4', name: 'Vivo', price: 10000, image: 'images/vivo.jpeg' },
        { id: 'mobile-5', name: 'Redmi', price: 15000, image: 'images/redmi.jpeg' },
    ];

    const handleBuyNow = (product) => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
            alert("Please sign in to place an order");
            return;
        }

        // ✅ Redirect to CheckoutForm with selected product
        navigate("/checkout", { state: { items: [product] } });
    };

    return (
        <section id="mobiles" className="products">
            <h2>Mobiles</h2>
            <div className="product-grid">
                {products.map(product => (
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

export default Mobiles;
