import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cart, removeFromCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const shipping = subtotal >= 1000 ? 0 : 100;

  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;

    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!pincodeRegex.test(formData.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    const loggedInUser = JSON.parse(
      localStorage.getItem("aetherLoggedInUser")
    );

    const newOrder = {
      orderId: `AET${Date.now()}`,
      userEmail: loggedInUser?.email || formData.email,
      date: new Date().toISOString(),
      customer: formData,
      items: cart,
      subtotal,
      shipping,
      total,
      paymentMethod: formData.paymentMethod,
      status: "Placed",
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("aetherOrders")) || [];

    const updatedOrders = [
      ...existingOrders,
      newOrder,
    ];

    localStorage.setItem(
      "aetherOrders",
      JSON.stringify(updatedOrders)
    );

    console.log("Order Saved:", newOrder);

    setOrderPlaced(true);

    cart.forEach((product) => {
      removeFromCart(product.id);
    });
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <div className="confetti">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="success-box">
          <div className="success-icon">
            ✓
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with Aether.
          </p>

          <p>
            Your order has been successfully placed.
          </p>

          <Link
            to="/products"
            className="checkout-shopping-btn"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h1>Your Cart is Empty</h1>

        <p>
          Add some products before proceeding to checkout.
        </p>

        <Link
          to="/products"
          className="checkout-shopping-btn"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          <section className="checkout-section">
            <h2>Customer Information</h2>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  maxLength="10"
                  required
                />
              </div>

            </div>
          </section>

          <section className="checkout-section">
            <h2>Shipping Address</h2>

            <div className="form-group">
              <label>Address</label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                rows="4"
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </div>

              <div className="form-group">
                <label>State</label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Pincode</label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit pincode"
                maxLength="6"
                required
              />
            </div>
          </section>

          <section className="checkout-section">
            <h2>Payment Method</h2>

            <div className="payment-options">

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={
                    formData.paymentMethod === "cod"
                  }
                  onChange={handleChange}
                />

                <span>Cash on Delivery</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={
                    formData.paymentMethod === "upi"
                  }
                  onChange={handleChange}
                />

                <span>UPI</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={
                    formData.paymentMethod === "card"
                  }
                  onChange={handleChange}
                />

                <span>Credit / Debit Card</span>
              </label>

            </div>
          </section>

          <button
            type="submit"
            className="place-order-btn"
          >
            Place Order · ₹{total}
          </button>

        </form>

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          <div className="checkout-products">

            {cart.map((product) => (
              <div
                className="checkout-product"
                key={product.id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="checkout-product-info">

                  <h3>{product.name}</h3>

                  <p>
                    Qty: {product.quantity}
                  </p>

                  <p className="checkout-product-price">
                    ₹{product.price * product.quantity}
                  </p>

                </div>

              </div>
            ))}

          </div>

          <div className="checkout-summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="checkout-summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="checkout-summary-row">
            <span>Shipping</span>

            <span
              className={
                shipping === 0
                  ? "free-shipping"
                  : ""
              }
            >
              {shipping === 0
                ? "FREE"
                : `₹${shipping}`}
            </span>
          </div>

          {subtotal < 1000 && (
            <p className="shipping-message">
              Add ₹{1000 - subtotal} more for FREE
              shipping.
            </p>
          )}

          <div className="checkout-divider"></div>

          <div className="checkout-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Checkout;