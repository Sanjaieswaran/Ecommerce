import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount, user, handleLogout, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">My Store</Link>
      </div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/obiles">Mobiles</Link>
        <Link to="/HomeProducts">Home Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {user && user.role === 'seller' && <Link to="/seller">Seller</Link>}
      </nav>
      <form className="search-box" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="auth-links">
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        <Link to="/cart" className="cart-icon">
          <span className="cart-count">{cartCount}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21"r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default Header;
