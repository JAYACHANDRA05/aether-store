import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">
          <h2>Aether</h2>

          <p>
            Discover modern fashion and everyday essentials
            made for your style.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-links">
          <h3>Customer</h3>

          <Link to="/profile">Profile</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/about">About Us</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Aether. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;