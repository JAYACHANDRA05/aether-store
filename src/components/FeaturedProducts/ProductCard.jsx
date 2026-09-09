import { Link } from "react-router-dom";
import "./ProductCard.css";
import StarRating from "./StarRating";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useContext } from "react";

import CartContext from "../../context/CartContext";
import WishlistContext from "../../context/WishlistContext";
import ToastContext from "../../context/ToastContext";

function ProductCard({ product }) {
  const { cart, addToCart } = useContext(CartContext);

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const { showToast } = useContext(ToastContext);

  const isInCart = cart.some(
    (item) => item.id === product.id
  );

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      showToast("Product is already in your cart", "error");
      return;
    }

    addToCart(product);
    showToast(`${product.name} added to cart`);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(product.id);
      showToast(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      showToast(`${product.name} added to wishlist`);
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="product-link"
    >
      <div className="product-card">

        <div className="product-image-container">

          <img
            src={product.image}
            alt={product.name}
          />

          <button
            className="wishlist-btn"
            onClick={handleAddToWishlist}
          >
            {isWishlisted ? (
              <FaHeart className="wishlist-active" />
            ) : (
              <FiHeart className="wishlist-empty" />
            )}
          </button>

          <span className="sale-badge">
            SALE
          </span>

        </div>

        <div className="product-info">

          <p className="category">
            {product.category}
          </p>

          <h3>{product.name}</h3>

          <div className="product-details">

            <StarRating
              rating={product.rating}
            />

            <p className="price">
              ₹{product.price}
            </p>

          </div>

          <button
            className={`cart-btn ${
              isInCart ? "cart-added" : ""
            }`}
            onClick={handleAddToCart}
          >
            {isInCart
              ? "✓ Added to Cart"
              : "Add to Cart"}
          </button>

        </div>

      </div>
    </Link>
  );
}

export default ProductCard;