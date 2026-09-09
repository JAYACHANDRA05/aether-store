import "./Navbar.css";

import {
  NavLink,
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useContext, useEffect, useState } from "react";

import CartContext from "../../context/CartContext";
import WishlistContext from "../../context/WishlistContext";
import ThemeContext from "../../context/ThemeContext";

import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMoon,
  FiSun,
  FiMenu,
  FiX,
} from "react-icons/fi";

function Navbar() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const category = searchParams.get("category");

  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("aetherLoggedInUser")
    );

    setLoggedInUser(user);
    setMenuOpen(false);
  }, [location]);

  const totalCartItems = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      navigate("/products");
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(value)}`
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo" onClick={closeMenu}>
        AETHER
      </Link>

      <div className="nav-links">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <Link
          to="/products"
          className={
            location.pathname === "/products" &&
            category === null &&
            !searchParams.get("search")
              ? "active"
              : ""
          }
        >
          Shop
        </Link>

        <Link
          to="/products?category=Men"
          className={
            location.pathname === "/products" &&
            category === "Men"
              ? "active"
              : ""
          }
        >
          Men
        </Link>

        <Link
          to="/products?category=Women"
          className={
            location.pathname === "/products" &&
            category === "Women"
              ? "active"
              : ""
          }
        >
          Women
        </Link>

        <NavLink
          to="/new-arrivals"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          New Arrivals
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          About
        </NavLink>

      </div>

      <div className="nav-icons">

        <div className="search-box">
          <FiSearch />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={
            theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <FiMoon />
          ) : (
            <FiSun />
          )}
        </button>

        <NavLink
          to="/wishlist"
          className="wishlist-icon"
        >
          <FiHeart />

          {wishlist.length > 0 && (
            <span>{wishlist.length}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className="cart-icon"
        >
          <FiShoppingCart />

          {totalCartItems > 0 && (
            <span>{totalCartItems}</span>
          )}
        </NavLink>

        {loggedInUser ? (
          <button
            className="navbar-user-btn"
            onClick={() => navigate("/profile")}
            title="Profile"
          >
            <FiUser />

            <span>
              {loggedInUser.name}
            </span>
          </button>
        ) : (
          <button
            className="navbar-login-btn"
            onClick={() => navigate("/login")}
            title="Login"
          >
            <FiUser />
          </button>
        )}

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

      </div>

      {menuOpen && (
        <div className="mobile-menu">

          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Home
          </NavLink>

          <Link
            to="/products"
            onClick={closeMenu}
            className={
              location.pathname === "/products" &&
              category === null &&
              !searchParams.get("search")
                ? "active"
                : ""
            }
          >
            Shop
          </Link>

          <Link
            to="/products?category=Men"
            onClick={closeMenu}
            className={
              location.pathname === "/products" &&
              category === "Men"
                ? "active"
                : ""
            }
          >
            Men
          </Link>

          <Link
            to="/products?category=Women"
            onClick={closeMenu}
            className={
              location.pathname === "/products" &&
              category === "Women"
                ? "active"
                : ""
            }
          >
            Women
          </Link>

          <NavLink
            to="/new-arrivals"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            New Arrivals
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            About
          </NavLink>

        </div>
      )}

    </nav>
  );
}

export default Navbar;