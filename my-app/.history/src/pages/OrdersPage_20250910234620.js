import React, { useState, useEffect } from 'react';
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
        const response = await fetch(`http://localhost:5000/api/orders/user/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch orders');
        }

        const data = await response.json();
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
  if (error) return <div className="orders-page-container error-message">Error: {error}</div>;

  return (
    <div className="orders-page-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount?.toLocaleString() || 0}</p>

              <h4>Items:</h4>
              <ul className="order-items-list">
                {order.items.map((item) => (
                  <li key={item.product?._id || item._id} className="order-item">
                    <img
                      src={item.product?.image || "https://via.placeholder.com/80"}
                      alt={item.product?.name || "Product image"}
                      className="order-product-image"
                    />
                    <div className="order-item-details">
                      <p>{item.product?.name || "Product unavailable"}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>₹{(item.quantity * (item.product?.price || 0)).toLocaleString()}</p>
                    </div>
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
