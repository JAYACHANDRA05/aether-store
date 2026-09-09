import { useContext } from "react";
import { Link } from "react-router-dom";

import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";
import ToastContext from "../context/ToastContext";

import "./Cart.css";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const {
    wishlist,
    addToWishlist,
  } = useContext(WishlistContext);

  const { showToast } = useContext(ToastContext);

  const totalItems = cart.reduce(
    (total, product) =>
      total + product.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;

  const total = subtotal + shipping;

  const handleIncrease = (product) => {
    increaseQuantity(product.id);

    showToast(
      `${product.name} quantity increased`
    );
  };

  const handleDecrease = (product) => {
    if (product.quantity === 1) {
      return;
    }

    decreaseQuantity(product.id);

    showToast(
      `${product.name} quantity decreased`
    );
  };

  const handleRemove = (product) => {
    removeFromCart(product.id);

    showToast(
      `${product.name} removed from cart`
    );
  };

  const handleAddToWishlist = (product) => {
    const isInWishlist = wishlist.some(
      (item) => item.id === product.id
    );

    if (isInWishlist) {
      showToast(
        `${product.name} is already in wishlist`,
        "error"
      );
      return;
    }

    addToWishlist(product);

    showToast(
      `${product.name} added to wishlist`
    );
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">

        <h1>Your Cart is Empty</h1>

        <p>
          Looks like you haven't added anything
          to your cart yet.
        </p>

        <Link
          to="/products"
          className="continue-shopping-btn"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1>Your Cart</h1>

      <div className="cart-container">

        <div className="cart-items">

          {cart.map((product) => (
            <div
              className="cart-item"
              key={product.id}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <div className="cart-info">

                <h2>
                  {product.name}
                </h2>

                <p className="cart-price">
                  ₹{product.price}
                </p>

                <div className="quantity">

                  <button
                    onClick={() =>
                      handleDecrease(product)
                    }
                  >
                    −
                  </button>

                  <span>
                    {product.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleIncrease(product)
                    }
                  >
                    +
                  </button>

                </div>

                <div className="cart-actions">

                  <button
                    className="remove-btn"
                    onClick={() =>
                      handleRemove(product)
                    }
                  >
                    Remove
                  </button>

                  <button
                    className="wishlist-cart-btn"
                    onClick={() =>
                      handleAddToWishlist(product)
                    }
                  >
                    Add to Wishlist
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>

            <span>
              {shipping === 0
                ? "FREE"
                : `₹${shipping}`}
            </span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Link
            to="/checkout"
            className="checkout-btn"
          >
            Proceed to Checkout
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;