import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CheckoutForm.css";

const CheckoutForm = ({ cart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Use Buy Now items if present, otherwise cart
  const buyNowItems = location.state?.items || [];
  const items = buyNowItems.length > 0 ? buyNowItems : cart;

  // Shipping details state
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [stateName, setStateName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const placeOrder = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          items: items.map((p) => ({
            productId: p.id || p._id,
            name: p.name,
            price: p.price,
            quantity: p.quantity || 1,
          })),
          totalPrice: items.reduce(
            (sum, p) => sum + p.price * (p.quantity || 1),
            0
          ),
          shippingDetails: {
            email,
            contactNumber,
            address,
            city,
            zip,
            state: stateName,
            postalCode,
            country,
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Order placed successfully!");
        navigate("/orders"); // redirect to Orders page
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <button className="btn-place-order" onClick={placeOrder}>
          Place Order
        </button>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {items.map((item, index) => (
          <p key={index}>
            {item.name} (x{item.quantity || 1}) - ₹
            {item.price * (item.quantity || 1)}
          </p>
        ))}
        <p>
          <strong>Total:</strong> ₹
          {items.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0)}
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;
