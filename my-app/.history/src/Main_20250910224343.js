import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Mobiles from './Mobiles';
import HomeProducts from './HomeProducts';
import About from './about';
import Contact from './contact';
import Cart from './cart';
import Offer from './Offer';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import CheckoutForm from './components/CheckoutForm';   // ✅ Import CheckoutForm

const Main = ({ AddToCart, cartItems, UpdateQuantity, setUser }) => {
  return (
    <section className='hero'>
      <Routes>
        <Route path="/" element={
          <>
            <Offer />
            <HomeProducts AddToCart={AddToCart} />
          </>
        } />
        <Route path="/mobiles" element={<Mobiles AddToCart={AddToCart} />} />
        <Route path="/HomeProducts" element={<HomeProducts AddToCart={AddToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} UpdateQuantity={UpdateQuantity} />} />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        {/* ✅ New Checkout route */}
        <Route path="/checkout" element={<CheckoutForm cart={cartItems} />} />
      </Routes>
    </section>
  );
};

export default Main;
