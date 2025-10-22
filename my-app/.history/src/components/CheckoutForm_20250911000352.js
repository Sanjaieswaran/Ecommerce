import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CheckoutForm.css";

const CheckoutForm = ({ cart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const buyNowItems = location.state?.items || [];
  const items = buyNowItems.length > 0 ? buyNowItems : cart;

  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [stateName, setStateName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const placeOrder = async () => {
    if (!userId) return alert("Please login first");

    const response = await fetch("http://localhost:5000/api/orders/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId,
        items: items.map((p) => ({
          id: p._id, // ensure using product ObjectId
          quantity: p.quantity || 1
        })),
        totalPrice: items.reduce((sum, p) => sum + (p.price || 0) * (p.quantity || 1), 0),
        shippingDetails: {
          email,
          contactNumber,
          address,
          city,
          zip,
          state: stateName,
          postalCode,
          country
        }
      })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Order placed successfully!");
      navigate("/orders");
    } else {
      alert(data.error || "Failed to place order");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-form">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="text" placeholder="Contact Number" value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
        <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
        <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
        <input type="text" placeholder="Zip Code" value={zip} onChange={e => setZip(e.target.value)} />
        <input type="text" placeholder="State" value={stateName} onChange={e => setStateName(e.target.value)} />
        <input type="text" placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
        <input type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
        <button onClick={placeOrder}>Place Order</button>
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {items.map((item, i) => (
          <p key={i}>
            {item.name || "No Name"} - ₹{item.price || 0} (x{item.quantity || 1})
          </p>
        ))}
        <p><strong>Total:</strong> ₹{items.reduce((sum, p) => sum + (p.price || 0) * (p.quantity || 1), 0)}</p>
      </div>
    </div>
  );
};

export default CheckoutForm;
