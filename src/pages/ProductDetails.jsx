import "./ProductDetails.css";
import { FiHeart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";

import products from "../data/products";
import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";
import ToastContext from "../context/ToastContext";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const { cart, addToCart } = useContext(CartContext);
  const isInCart = cart.some(
    (item) => item.id === product?.id
  );

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const { showToast } = useContext(ToastContext);

  const [quantity, setQuantity] = useState(1);

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem(
      `reviews-${id}`
    );

    return savedReviews
      ? JSON.parse(savedReviews)
      : [];
  });

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1
    );
  };

  const handleAddToCart = () => {
    if (isInCart) {
      showToast(`${product.name} is already in cart`, "error");
      return;
    }

    addToCart(product, quantity);
    showToast(`${product.name} added to cart`);
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      showToast(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      showToast(`${product.name} added to wishlist`);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!reviewText.trim()) {
      showToast("Please write a review", "error");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating: reviewRating,
      text: reviewText.trim(),
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [
      ...reviews,
      newReview,
    ];

    setReviews(updatedReviews);

    localStorage.setItem(
      `reviews-${id}`,
      JSON.stringify(updatedReviews)
    );

    setReviewText("");
    setReviewRating(5);

    showToast("Review added successfully");
  };

  const handleDeleteReview = (reviewId) => {
    const updatedReviews = reviews.filter(
      (review) => review.id !== reviewId
    );

    setReviews(updatedReviews);

    localStorage.setItem(
      `reviews-${id}`,
      JSON.stringify(updatedReviews)
    );

    showToast("Review removed");
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : product.rating;

  return (
    <>
      <div className="details-container">

        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="details-info">

          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <p className="details-rating">
            ⭐ {averageRating}
          </p>

          <h2 className="details-price">
            ₹{product.price}
          </h2>

          <p className="details-description">
            {product.description}
          </p>

          <div className="product-quantity-section">
            <p>Quantity</p>

            <div className="product-quantity-control">

              <button onClick={decreaseQuantity}>
                −
              </button>

              <span>{quantity}</span>

              <button onClick={increaseQuantity}>
                +
              </button>

            </div>
          </div>

          <div className="product-details-actions">

            <button
              className={`add-cart-btn ${
                isInCart ? "cart-added" : ""
              }`}
              onClick={handleAddToCart}
            >
              {isInCart
                ? "✓ Added to Cart"
                : "Add to Cart"}
            </button>

            <button
              className={`wishlist-btn ${
                isWishlisted ? "wishlisted" : ""
              }`}
              onClick={handleWishlist}
            >
              <FiHeart
                className="wishlist-icon"
                fill={
                  isWishlisted
                    ? "currentColor"
                    : "none"
                }
              />

              {isWishlisted
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </button>

          </div>

        </div>

      </div>

      <div className="reviews-section">

        <div className="reviews-header">

          <h2>Customer Reviews</h2>

          <div className="reviews-summary">
            <span className="average-rating">
              ⭐ {averageRating} / 5
            </span>

            <span className="review-count">
              {reviews.length}{" "}
              {reviews.length === 1
                ? "review"
                : "reviews"}
            </span>
          </div>

        </div>

        <div className="review-form-container">

          <h3>Write a Review</h3>

          <form onSubmit={handleSubmitReview}>

            <div className="review-rating-input">

              <p>Your Rating</p>

              <div className="review-stars">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={
                      star <= reviewRating
                        ? "star selected"
                        : "star"
                    }
                    onClick={() =>
                      setReviewRating(star)
                    }
                  >
                    ★
                  </button>
                ))}

              </div>

            </div>

            <textarea
              value={reviewText}
              onChange={(e) =>
                setReviewText(e.target.value)
              }
              placeholder="Share your experience with this product..."
              rows="4"
            />

            <button
              type="submit"
              className="submit-review-btn"
            >
              Submit Review
            </button>

          </form>

        </div>

        <div className="reviews-list">

          {reviews.length === 0 ? (
            <div className="no-reviews">
              <p>
                No reviews yet. Be the first to review
                this product!
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                className="review-card"
                key={review.id}
              >

                <div className="review-card-top">

                  <div className="review-stars-display">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>

                  <span className="review-date">
                    {review.date}
                  </span>

                </div>

                <p className="review-text">
                  {review.text}
                </p>

                <button
                  className="delete-review-btn"
                  onClick={() =>
                    handleDeleteReview(review.id)
                  }
                >
                  Delete Review
                </button>

              </div>
            ))
          )}

        </div>

      </div>
    </>
  );
}

export default ProductDetails;