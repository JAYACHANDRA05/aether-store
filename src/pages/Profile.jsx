import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLogOut,
  FiShoppingCart,
  FiHeart,
  FiPackage,
} from "react-icons/fi";

import { useContext } from "react";
import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [user] = useState(() => {
    const savedUser = localStorage.getItem(
      "aetherLoggedInUser"
    );

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [orders] = useState(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("aetherOrders")
    ) || [];

    return savedOrders;
  });

  const userOrders = orders.filter(
    (order) => order.userEmail === user?.email
  );

  const handleLogout = () => {
    localStorage.removeItem("aetherLoggedInUser");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="profile-login">
        <h1>You are not logged in</h1>

        <p>
          Please login to view your profile.
        </p>

        <button
          className="profile-login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        <div className="profile-header">

          <div className="profile-avatar">
            <FiUser />
          </div>

          <div>
            <h1>{user.name}</h1>
            <p>Welcome back to Aether</p>
          </div>

        </div>

        <div className="profile-section">

          <h2>Personal Information</h2>

          <div className="profile-info">

            <div className="profile-info-item">
              <FiUser />

              <div>
                <span>Full Name</span>
                <p>{user.name}</p>
              </div>
            </div>

            <div className="profile-info-item">
              <FiMail />

              <div>
                <span>Email</span>
                <p>{user.email}</p>
              </div>
            </div>

          </div>

        </div>

        <div className="profile-section">

          <h2>Shopping Activity</h2>

          <div className="profile-stats">

            <div
              className="profile-stat-card"
              onClick={() => navigate("/cart")}
            >
              <FiShoppingCart />

              <div>
                <span>Cart</span>
                <strong>{cart.length}</strong>
                <p>Products</p>
              </div>
            </div>

            <div
              className="profile-stat-card"
              onClick={() => navigate("/wishlist")}
            >
              <FiHeart />

              <div>
                <span>Wishlist</span>
                <strong>{wishlist.length}</strong>
                <p>Products</p>
              </div>
            </div>

          </div>

        </div>

        <div className="profile-section">

          <h2>Order History</h2>

          {userOrders.length === 0 ? (

            <div className="no-orders">

              <FiPackage />

              <h3>No orders yet</h3>

              <p>
                Your previous orders will appear here.
              </p>

              <button
                className="profile-shopping-btn"
                onClick={() => navigate("/products")}
              >
                Start Shopping
              </button>

            </div>

          ) : (

            <div className="orders-list">

              {userOrders
                .slice()
                .reverse()
                .map((order) => (

                  <div
                    className="order-card"
                    key={order.orderId}
                  >

                    <div className="order-header">

                      <div>
                        <span>Order ID</span>

                        <strong>
                          #{order.orderId}
                        </strong>
                      </div>

                      <div className="order-status">
                        {order.status}
                      </div>

                    </div>

                    <p className="order-date">
                      Ordered on{" "}
                      {new Date(
                        order.date
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <div className="order-products">

                      {order.items.map((product) => (

                        <div
                          className="order-product"
                          key={product.id}
                        >

                          <img
                            src={product.image}
                            alt={product.name}
                          />

                          <div>
                            <h3>
                              {product.name}
                            </h3>

                            <p>
                              Qty:{" "}
                              {product.quantity}
                            </p>

                            <p>
                              ₹
                              {product.price *
                                product.quantity}
                            </p>
                          </div>

                        </div>

                      ))}

                    </div>

                    <div className="order-footer">

                      <span>
                        Payment:{" "}
                        {order.paymentMethod ===
                        "cod"
                          ? "Cash on Delivery"
                          : order.paymentMethod ===
                            "upi"
                          ? "UPI"
                          : "Credit / Debit Card"}
                      </span>

                      <strong>
                        Total: ₹{order.total}
                      </strong>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>

        <button
          className="profile-logout-btn"
          onClick={handleLogout}
        >
          <FiLogOut />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;