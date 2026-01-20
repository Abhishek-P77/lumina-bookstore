import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaHeart, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    const isAlreadyInCart = cart.find(item => item._id === book._id);
    if (isAlreadyInCart) {
      toast.warning(`${book.title} is already in your bag!`, { position: "top-right", theme: "dark" });
    } else {
      setCart([...cart, book]);
      toast.success(`${book.title} added to your bag!`, { position: "top-right", theme: "dark" });
    }
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter(item => item._id !== bookId));
    toast.info("Item removed.", { position: "bottom-right", theme: "dark" });
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <div className="App">
        <ToastContainer />

        {/* --- HEADER --- */}
        <nav className="navbar glass">
          <Link to="/" className="brand-container">
            <img src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png" alt="Logo" className="logo-img" />
            <span className="brand-text">Lumina Books</span>
          </Link>
          <div>
            <Link to="/" className="nav-link">Discover</Link>
            <Link to="/cart" className="nav-link">My Bag ({cart.length})</Link>
          </div>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetails addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
          </Routes>
        </div>

        {/* --- RESPONSIVE GLASS FOOTER --- */}
        <footer className="footer-glass">
          <div className="footer-content">
            
            {/* COLUMN 1: Brand */}
            <div className="footer-left">
              <div className="brand-container" style={{ marginBottom: '15px' }}>
                <span className="brand-text" style={{ fontSize: '1.5rem' }}>Lumina Books</span>
              </div>
              <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>
                Premium books, delivered instantly.
              </p>
              <p style={{ opacity: 0.4, fontSize: '0.8rem', marginTop: '10px' }}>
                &copy; 2026 Lumina Books
              </p>
            </div>

            {/* COLUMN 2: Menu */}
            <div className="footer-center">
              <h4 className="footer-heading" style={{ marginBottom: '15px' }}>Menu</h4>
              <ul className="footer-links">
                <li><Link to="/">Discover Books</Link></li>
                <li><Link to="/cart">My Shopping Bag ({cart.length})</Link></li>
              </ul>
            </div>

            {/* COLUMN 3: Connect */}
            <div className="footer-right">
              <h4 className="footer-heading" style={{ marginBottom: '15px' }}>Connect</h4>
              
              <div className="footer-right-container">
                {/* Email Link */}
                <div style={{ marginBottom: '15px' }}>
                  <a href="mailto:help@luminabooks.com" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <FaEnvelope /> <span>help@luminabooks.com</span> 
                  </a>
                </div>

                {/* Social Icons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}><FaFacebookF /></a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}><FaTwitter /></a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}><FaInstagram /></a>
                </div>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;