import React, { useState, useEffect } from "react";
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      if (!token || !user) {
        setError('Please sign in to view your orders.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/orders/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch orders');
        }

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="orders-page-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ₹{order.totalPrice.toLocaleString()}</p>
              <h4>Items:</h4>
              <ul className="order-items-list">
                {order.items.map((item, i) => (
                  <li key={i}>
                    <img
                      src={item.productId?.image || 'https://via.placeholder.com/50'}
                      alt={item.productId?.name || 'Product'}
                      width={50}
                      height={50}
                    />
                    {item.productId?.name || "No Name"} (x{item.quantity}) - ₹{item.productId?.price?.toLocaleString() || 0}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
