import "./Wishlist.css";
import { useContext } from "react";

import WishlistContext from "../context/WishlistContext";
import CartContext from "../context/CartContext";
import ToastContext from "../context/ToastContext";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const {
    cart,
    addToCart,
  } = useContext(CartContext);

  const { showToast } = useContext(ToastContext);

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.some(
      (item) => item.id === product.id
    );

    if (alreadyInCart) {
      showToast(
        `${product.name} is already in cart`,
        "error"
      );
      return;
    }

    addToCart(product);

    showToast(
      `${product.name} added to cart`
    );
  };

  const handleRemove = (product) => {
    removeFromWishlist(product.id);

    showToast(
      `${product.name} removed from wishlist`
    );
  };

  return (
    <div className="wishlist-page">

      <h1>Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <h2>Your Wishlist is Empty</h2>

          <p>
            You haven't added any products to your wishlist yet.
          </p>
        </div>
      ) : (
        <div className="wishlist-items">

          {wishlist.map((product) => (
            <div
              className="wishlist-item"
              key={product.id}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <div className="wishlist-info">

                <h2>{product.name}</h2>

                <p>
                  ₹{product.price}
                </p>

                <div className="wishlist-actions">

                  <button
                    className="wishlist-cart-btn"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    Add to Cart
                  </button>

                  <button
                    className="wishlist-remove-btn"
                    onClick={() =>
                      handleRemove(product)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;