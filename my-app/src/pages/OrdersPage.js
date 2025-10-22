import React, { useEffect, useState } from "react";
import "./OrdersPage.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/api/orders/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="orders-page-container">Loading orders...</div>;
  if (error) return <div className="orders-page-container error">{error}</div>;

  return (
    <div className="orders-page-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: ₹{order.totalPrice?.toLocaleString() || 0}</p>
            <h4>Items:</h4>
            <ul className="order-items-list">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} width={50} height={50} />
                  {item.name || "No Name"} (x{item.quantity}) - ₹{(item.price || 0).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
