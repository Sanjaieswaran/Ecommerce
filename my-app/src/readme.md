import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <nav className="navbar" role="navigation" aria-label="Main Navigation">
          <a href="task1.html">Home</a>
          <a href="mobile.html">Mobiles</a>
          <a href="#about">About</a>
          <a href="contact.html">Contact</a>
          <a href="home-products.html">Home Products</a>
          <a href="#cart" style={{ paddingRight: "5px" }}>
            Cart(<span id="cart_count">0</span>)
          </a>
        </nav>
        <div className="auth-links">
          <a href="signin.html" className="auth-link">Sign In</a> /
          <a href="signup.html" className="auth-link">Sign Up</a>
        </div>
      </header>
      <h1>My Store</h1>
      <section id="offers" aria-label="Promotional Offers">
    <h2>Aadi Sale</h2>
    <div className="slider-container" role="region" aria-live="polite" aria-atomic="true">
        <div className="offer-text">
            🚀 50% off on all mobile phones! Grab yours before the sale ends! 🎉
        </div>
    </div>
    <div className="class-grid">
        <div className="class-item" tabindex="0" aria-label="OnePlus Mobile Offer: ₹30,000 reduced to ₹25,000">
            <img src="images/1+.jpeg" alt="OnePlus Mobile" />
            <h3>OnePlus Mobile</h3>
            <p><del>₹30,000.00</del> <strong>₹25,000.00</strong></p>
        </div>
        <div className="class-item" tabindex="0" aria-label="Apple iPhone Offer: ₹100,000 reduced to ₹70,000">
            <img src="images/apple.jpeg" alt="Apple iPhone" />
            <h3>Apple iPhone</h3>
            <p><del>₹100,000.00</del> <strong>₹70,000.00</strong></p>
        </div>
        <div className="class-item" tabindex="0" aria-label="Vivo Mobile Offer: ₹20,000 reduced to ₹10,000">
            <img src="images/vivo.jpeg" alt="Vivo Mobile" />
            <h3>Vivo Mobile</h3>
            <p><del>₹20,000.00</del> <strong>₹10,000.00</strong></p>
        </div>
        <div className="class-item" tabindex="0" aria-label="Preethi Mixture Offer: ₹20,000 reduced to ₹15,000">
            <img src="images/preethi.jpeg" alt="Preethi Mixture" />
            <h3>Preethi Mixture</h3>
            <p><del>₹20,000.00</del> <strong>₹15,000.00</strong></p>
        </div>
        <div className="class-item" tabindex="0" aria-label="Realme Mobile Offer: ₹30,000 reduced to ₹25,000">
            <img src="images/relme.jpeg" alt="Realme Mobile" />
            <h3>Realme Mobile</h3>
            <p><del>₹30,000.00</del> <strong>₹25,000.00</strong></p>
        </div>
    </div>
</section>
<section id="mobiles" className="products" aria-label="Mobile Phones">
    <h2>Mobiles</h2>
    <div className="product-grid">
        <article className="product" tabindex="0" aria-label="Pickachu Mobile, priced ₹10">
            <h3>Pickachu Mobile</h3>
            <img src="images/pickachu.jpg" alt="Pickachu Mobile" />
            <p>Price: ₹10.00</p>
            <div className="button-group">
                <button onclick="addToCart('Pickachu Mobile', 10)" aria-label="Add Pickachu Mobile to cart">Add to Cart</button>
                <button className="buy-now" onclick="alert('Redirect to checkout for Pickachu Mobile');" aria-label="Buy Pickachu Mobile now">Buy Now</button>
            </div>
        </article>
        <article className="product" tabindex="0" aria-label="OnePlus Mobile, priced ₹25,000">
            <h3>OnePlus</h3>
            <img src="images/1+.jpeg" alt="OnePlus Mobile" />
            <p>Price: ₹25,000.00</p>
            <div className="button-group">
                <button onclick="addToCart('OnePlus', 25000)" aria-label="Add OnePlus Mobile to cart">Add to Cart</button>
                <button className="buy-now" onclick="alert('Redirect to checkout for OnePlus');" aria-label="Buy OnePlus now">Buy Now</button>
            </div>
        </article>
        <article className="product" tabindex="0" aria-label="Apple iPhone, priced ₹70,000">
            <h3>Apple</h3>
            <img src="images/apple.jpeg" alt="Apple iPhone" />
            <p>Price: ₹70,000.00</p>
            <div className="button-group">
                <button onclick="addToCart('Apple', 70000)" aria-label="Add Apple iPhone to cart">Add to Cart</button>
                <button className="buy-now" onclick="alert('Redirect to checkout for Apple iPhone');" aria-label="Buy Apple iPhone now">Buy Now</button>
            </div>
        </article>
        <article className="product" tabindex="0" aria-label="Vivo Mobile, priced ₹10,000">
            <h3>Vivo</h3>
            <img src="images/vivo.jpeg" alt="Vivo Mobile" />
            <p>Price: ₹10,000.00</p>
            <div className="button-group">
                <button onclick="addToCart('Vivo', 10000)" aria-label="Add Vivo Mobile to cart">Add to Cart</button>
                <button className="buy-now" onclick="alert('Redirect to checkout for Vivo');" aria-label="Buy Vivo now">Buy Now</button>
            </div>
        </article>
        <article className="product" tabindex="0" aria-label="Redmi Mobile, priced ₹15,000">
            <h3>Redmi</h3>
            <img src="images/redmi.jpeg" alt="Redmi Mobile" />
            <p>Price: ₹15,000.00</p>
            <div className="button-group">
                <button onclick="addToCart('Redmi', 15000)" aria-label="Add Redmi Mobile to cart">Add to Cart</button>
                <button className="buy-now" onclick="alert('Redirect to checkout for Redmi');" aria-label="Buy Redmi now">Buy Now</button>
            </div>
        </article>
    </div>
</section>
<section id="computers" className="products" aria-label="Home Products">
    <h2>Home Products</h2>
    <div className="product-grid">
        <article className="product" tabindex="0" aria-label="OnePlus TV, priced ₹20,000">
            <h3>OnePlus TV</h3>
            <img src="./images/1+tv.jpeg" alt="OnePlus TV" />
            <p>Price: ₹20,000.00</p>
            <div className="button-group">
                <button onclick="addToCart('OnePlus TV', 20000)" aria-label="Add OnePlus TV to cart">Add to Cart</button>
                <button className="buy-now" onclick="alert('Redirect to checkout for OnePlus TV');" aria-label="Buy OnePlus TV now">Buy Now</button>
            </div>
        </article>
        <article className="product" tabindex="0" aria-label="Preethi Mixture, priced ₹2,500">
            <h3>Preethi Mixture</h3>
            <img src="images/preethi.jpeg" alt="Preethi Mixture" />
            <p>Price: ₹2,500.00</p>
            <div className="button-group">
                <button onclick="addToCart('Preethi Mixture', 2500)" aria-label="Add Preethi Mixture to cart">Add to Cart</button>
                <button className="buy-now" onclick="alert('Redirect to checkout for Preethi Mixture');" aria-label="Buy Preethi Mixture now">Buy Now</button>
            </div>
        </article>
        <article className="product" tabindex="0" aria-label="MI Washing Machine, priced ₹15,000">
            <h3>MI Washing Machine</h3>
            <img src="images/miw.jpeg" alt="MI Washing Machine" />
            <p>Price: ₹15,000.00</p>
            <div className="button-group">
                <button onclick="addToCart('MI Washing Machine', 15000)" aria-label="Add MI Washing Machine to cart">Add to Cart</button>
                <button className="buy-now" onclick="alert('Redirect to checkout for MI Washing Machine');" aria-label="Buy MI Washing Machine now">Buy Now</button>
            </div>
        </article>
        <article className="product" tabindex="0" aria-label="Realme AC, priced ₹35,000">
            <h3>Realme AC</h3>
            <img src="images/relme.jpeg" alt="Realme AC" />
            <p>Price: ₹35,000.00</p>
            <div className="button-group">
                <button onclick="addToCart('Realme AC', 35000)" aria-label="Add Realme AC to cart">Add to Cart</button>
                <button className="buy-now" onclick="alert('Redirect to checkout for Realme AC');" aria-label="Buy Realme AC now">Buy Now</button>
            </div>
        </article>
        <article className="product" tabindex="0" aria-label="Sony Speaker, priced ₹4,000">
            <h3>Sony Speaker</h3>
            <img src="images/sony.jpeg" alt="Sony Speaker" />
            <p>Price: ₹4,000.00</p>
            <div className="button-group">
                <button onclick="addToCart('Sony Speaker', 4000)" aria-label="Add Sony Speaker to cart">Add to Cart</button>
                <button className="buy-now" onclick="alert('Redirect to checkout for Sony Speaker');" aria-label="Buy Sony Speaker now">Buy Now</button>
            </div>
        </article>
    </div>
</section>
<section id="about">
    <h2>About Us</h2>
    <p>At My Store, we provide quality products ranging from mobile phones to home appliances. Our goal is to deliver the best customer experience with top-notch services and affordable prices. Shop with confidence and enjoy fast delivery and easy returns.</p>
</section>
<section id="cart" >
    <h2>Your Cart</h2>
    <ul id="cart-items" aria-label="List of items in cart"></ul>
    <p class="total" aria-live="polite" aria-atomic="true">Total: ₹<span id="cart-total">0</span></p>
</section>
<footer>
    <p>&copy; 2025 My Store. All rights reserved.</p>
</footer>
    </div>
  );
}

export default App;