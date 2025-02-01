import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import "../style/Style.css";
import "../style/Sign.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  // Sync cart and wishlist with localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setCartItems(storedCart);
    setWishlistItems(storedWishlist);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo"></Link>
          <span className="corporate-events">Corporate Events</span>
        </div>

        <div className="navbar-right">
          <div className="nav-item">
            <Link to="/wishlist">
              <FaHeart size={20} />
              <span className="nav-text">Wishlist: {wishlistItems.length}</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/cart">
              <FaShoppingCart size={20} />
              <span className="nav-text">Cart: {cartItems.length}</span>
            </Link>
          </div>
          <div className="nav-item">
            <button onClick={() => navigate("/login")} className="sign-in-btn">
              <FaUserAlt size={20} />
              <span className="nav-text">Sign In</span>
            </button>
          </div>
        </div>

        <div className="navbar-mobile">
          <div className="nav-item-mobile">
            <Link to="/wishlist">
              <FaHeart size={20} />
            </Link>
          </div>
          <div className="nav-item-mobile">
            <Link to="/cart">
              <FaShoppingCart size={20} />
            </Link>
          </div>
          <div className="nav-item-mobile">
            <button onClick={() => navigate("/login")}>
              <FaUserAlt size={20} />
            </button>
          </div>
          <button className="menu-icon" onClick={toggleMenu}>
            <FaBars size={24} color="black" />
          </button>
        </div>

        <div className={`side-menu ${isMenuOpen ? "show" : ""}`}>
          <button className="close-side-menu" onClick={closeMenu}>
            <FaTimes size={24} color="white" />
          </button>
          <ul>
            <li><Link to="/new" onClick={closeMenu}>NEW</Link></li>
            <li><Link to="/fiction" onClick={closeMenu}>FICTION</Link></li>
            <li><Link to="/non-fiction" onClick={closeMenu}>NON-FICTION</Link></li>
            <li><Link to="/children-teen" onClick={closeMenu}>CHILDREN, TEEN & YOUNG ADULT</Link></li>
            <li><Link to="/gift-cards" onClick={closeMenu}>GIFT CARD</Link></li>
            <li><Link to="/vouchers-stationery" onClick={closeMenu}>VOUCHERS & STATIONERY</Link></li>
            <li><Link to="/pre-order" onClick={closeMenu}>PRE-ORDER</Link></li>
            <li><Link to="/corporate" onClick={closeMenu}>CORPORATE</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
