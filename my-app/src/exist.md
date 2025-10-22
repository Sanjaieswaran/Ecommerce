import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Mobiles from './Mobiles';
import About from './about';
import Contact from './contact';
import HomeProducts from './HomeProducts';
import Cart from './cart';
import Offer from './Offer';

import Counts1 from './Counts1';



function App() {

    const [CartItems, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const[cartCount, setCartCount] = useState(0);

    function AddToCart(product, price) {
        // setCart(prev => [...prev, { product, price,cartCount }]);
        setCart([...CartItems,{ name:product, price:price }]);
        // setTotal(prevTotal => prevTotal + price);
        setCartCount(cartCount + 1);
    }

    // return (
    //     <section id="computers" className="products">
    //         <h2>Home Products</h2>
    //         <div className="product-grid">
    //             {/* Product components go here */}
    //         </div>
    //     </section>
    // );







  // State to manage cart count
  return (
    <div className="App">
      console.log({CartItems});
       <h1>My Store</h1>
        <Router>
          <header>
    <div className="logo-container" aria-label="Company Logo">
        <img src="images/pickachu.jpg" alt="My Store Logo" className="logo" />
    </div>
   
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <Link to="/" className="nav-Link">Home</Link>
        <Link to="/mobiles" className="nav-Link">Mobiles</Link>
        <Link to="/about" className="nav-Link">About</Link>
        <Link to="/contact" className="nav-Link">Contact</Link>
        <Link to="/HomeProducts" className="nav-Link">Home Products</Link>
        <Link to="/cart" className="nav-Link">Cart (<span id="cart_count">{cartCount}</span>)</Link>
    </nav>
        
    <div className="auth-Links">
        <a href="signin.html" className="auth-Link">Sign In</a> /
        <a href="signup.html" className="auth-Link">Sign Up</a>
    </div>
    
</header>

<section className='hero'>
  <Routes>
           <Route path="/" element={<Offer />} />
            <Route path="/mobiles" element={<Mobiles  AddToCart={AddToCart}/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/HomeProducts" element={<HomeProducts AddToCart={AddToCart}/>} />
            <Route path="/cart" element={<Cart cart={CartItems}/>} />
        </Routes>
        
        </section>
   </Router>






    <footer>

        <p>&copy; 2025 Online Store</p>
    </footer>
   
    </div>
  );
}

export default App;
cart:
// import './App.css';
// import addToCart from './Counter';
// function Cart({Cart}) {
//     return (
//         <div>
//             <section id="cart">
//                 <h2>Your Cart</h2>
//                 <ul id="cart-items"></ul>
//                 <p className="total">Total: ₹<span id="cart-total">{Cart}</span></p>
//             </section>
//         </div>
//     );
// }

// export default Cart;
import React from 'react';

const Cart = ({ CartItems }) => {
  return (
    <>
      <section id="cart_items">
        console.log(CartItems);
        <h2>Your Cart</h2>
        {/* {CartItems.length === 0 ? (
          <p>There is no products added in Cart</p>
        ) : ( */}
          <ul>
            {CartItems.map((item, index) => (
              <li key={index}>{item.name} - {item.price}</li>
            ))}
          </ul>
        {/* )} */}
      </section>
      <hr />
    </>
  );
};

export default Cart;
homepd:
import React,{useState} from "react";
import './App.css';
// import AddToCart from './Counter';
import AddToCart from './App'; // Assuming Counts1 is the component that handles cart logic



function HomeProducts( {AddToCart}) {
        // const [cart, setCart] = useState([]);
        // const [total, setTotal] = useState(0);
    
        // function addToCart(product, price) {
        //     setCart(prev => [prev, { product, price }]);
        //     setTotal(prevTotal => prevTotal + price);
        // }

    return (
        <section id="computers" className="products">
            <h2>Home Products</h2>
            <div className="product-grid">
                <div className="product">
                    <h3>OnePlus TV</h3>
                    <img src="images/1+tv.jpeg" alt="OnePlus TV"/>
                    <p>Price: ₹20000.00</p>
                    <div className="button-group">
                        <button onClick={() => AddToCart('OnePlus TV', 20000)}>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>
                <div className="product">
                    <h3>Preethi Mixture</h3>
                    <img src="images/preethi.jpeg" alt="Preethi Mixture"/>
                    <p>Price: ₹2500.00</p>
                    <div className="button-group">
                        <button onClick={() => AddToCart('Preethi Mixture', 2500)}>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>
                <div className="product">
                    <h3>MI Washing Machine</h3>
                    <img src="images/miw.jpeg" alt="MI Washing Machine"/>
                    <p>Price: ₹15000.00</p>
                    <div className="button-group">
                        <button onClick={() => AddToCart({name:'MI Washing Machine', price:15000})}>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>
                <div className="product">
                    <h3>Realme AC</h3>
                    <img src="images/relme.jpeg" alt="Realme AC"/>
                    <p>Price: ₹35000.00</p>
                    <div className="button-group">
                        <button onClick={() => AddToCart('Realme AC', 35000)}>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>
                <div className="product">
                    <h3>Sony Speaker</h3>
                    <img src="images/sony.jpeg" alt="Sony Speaker"/>
                    <p>Price: ₹4000.00</p>
                    <div className="button-group">
                        <button onClick={() => AddToCart('Sony Speaker', 4000)}>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>
            </div>
      {/* <h3>Cart</h3>
      {cart.length === 0 ? <p>Empty</p> :
        <ul>
          {cart.map((item, i) => <li key={i}>{item.name} - ₹{item.price}</li>)}
        </ul>
      }
      <h4>Total: ₹{total}</h4> */}
        </section>
    );
}
export default HomeProducts;
mobiles:
import React from "react";
import './App.css';
import AddToCart from './Counter';


function Mobiles({ AddToCart }) {
    return(
        <section id="mobiles" className="products">
        <h2>Mobiles</h2>
        <div className="product-grid">
            <div className="product">
                <h3>Pickachu Mobile</h3>
                <img src="images/pickachu.jpg" alt="Pickachu Mobile" />
                <p>Price: ₹10.00</p>
                <div className="button-group">
                    <button onClick={() => AddToCart('Pickachu Mobile', 10)}>Add to Cart</button>
                    <button className="buy-now">Buy Now</button>
                </div>
            </div>
            <div className="product">
                <h3>OnePlus</h3>
                <img src="images/1+.jpeg" alt="OnePlus Mobile"/>
                <p>Price: ₹25000.00</p>
                <div className="button-group">
                    <button onClick={() => AddToCart('OnePlus', 25000)}>Add to Cart</button>
                    <button className="buy-now">Buy Now</button>
                </div>
            </div>
            <div className="product">
                <h3>Apple</h3>
                <img src="images/apple.jpeg" alt="Apple iPhone"/>
                <p>Price: ₹70000.00</p>
                <div className="button-group">
                    <button onClick={() => AddToCart('Apple', 70000)}>Add to Cart</button>
                    <button className="buy-now">Buy Now</button>
                </div>
            </div>
            <div className="product">
                <h3>Vivo</h3>
                <img src="images/vivo.jpeg" alt="Vivo Phone"/>
                <p>Price: ₹10000.00</p>
                <div className="button-group">
                    <button onClick={() => AddToCart('Vivo', 10000)}>Add to Cart</button>
                    <button className="buy-now">Buy Now</button>
                </div>
            </div>
            <div className="product">
                <h3>Redmi</h3>
                <img src="images/redmi.jpeg" alt="Redmi Phone" />
                <p>Price: ₹15000.00</p>
                <div className="button-group">
                    <button onClick={() => AddToCart('Redmi', 15000)}>Add to Cart</button>
                    <button className="buy-now">Buy Now</button>
                </div>
            </div>
        </div>
        
    </section>
    );
}
export default Mobiles;