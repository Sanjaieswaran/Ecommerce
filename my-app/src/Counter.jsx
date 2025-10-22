/*import React, { useState } from "react";

function AddToCart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  function add(product, price) {
    setCart([...cart, { product, price }]);
    setTotal(total + price);
  }

  return (
    <div>
     
      <button onClick={() => add("A", 100)}>Add A</button>
      <button onClick={() => add("B", 200)}>Add B</button>
      <ul>
        {cart.map((item, i) => (
          <li key={i}>{item.product} - ₹{item.price}</li>
        ))}
      </ul>
      <div>Total: ₹{total}</div>
    </div>
  );
}

export default AddToCart;
*/
import React, { useState } from "react";
import './App.css';

function Ccc() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    function addToCart(product, price) {
        setCart(prev => [...prev, { product, price }]);
        setTotal(prevTotal => prevTotal + price);
    }

    return (
        <section id="computers" className="products">
            <h2>Home Products</h2>
            <div className="product-grid">
                <div className="product">
                    <h3>OnePlus TV</h3>
                    <img src="images/1+tv.jpeg" alt="OnePlus TV"/>
                    <p>Price: ₹20000.00</p>
                    <div className="button-group">
                        <button onClick={() => addToCart('OnePlus TV', 20000)}>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>

                <div className="product">
                    <h3>Preethi Mixture</h3>
                    <img src="images/preethi.jpeg" alt="Preethi Mixture"/>
                    <p>Price: ₹2500.00</p>
                    <div className="button-group">
                        <button onClick={() => addToCart('Preethi Mixture', 2500)}>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>

                <div className="product">
                    <h3>MI Washing Machine</h3>
                    <img src="images/miw.jpeg" alt="MI Washing Machine"/>
                    <p>Price: ₹15000.00</p>
                    <div className="button-group">
                        <button onClick={() => addToCart('MI Washing Machine', 15000)}>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>

                <div className="product">
                    <h3>Realme AC</h3>
                    <img src="images/relme.jpeg" alt="Realme AC"/>
                    <p>Price: ₹35000.00</p>
                    <div className="button-group">
                        <button onClick={() => addToCart('Realme AC', 35000)}>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>

                <div className="product">
                    <h3>Sony Speaker</h3>
                    <img src="images/sony.jpeg" alt="Sony Speaker"/>
                    <p>Price: ₹4000.00</p>
                    <div className="button-group">
                        <button onClick={() => addToCart('Sony Speaker', 4000)}>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>
            </div>

            
            <div style={{ marginTop: "20px" }}>
                <h3>Your Cart</h3>
                {cart.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    <>
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index}>
                                    {item.product} - ₹{item.price}
                                </li>
                            ))}
                        </ul>
                        <h4>Total: ₹{total}</h4>
                    </>
                )}
            </div>
        </section>
    );
}

export default Ccc;
