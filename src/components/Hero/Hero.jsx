import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="hero">

            <div className="hero-content">

                <p className="hero-tag">NEW COLLECTION 2026</p>

                <h1>
                    Elevate <br />
                    Your Style
                </h1>

                <p className="hero-description">
                    Discover premium fashion crafted for modern lifestyles.
                    Explore our latest collection with timeless elegance.
                </p>

                <div className="hero-buttons">

                    <button
                        className="primary-btn"
                        onClick={() => navigate("/products")}
                    >
                        Shop Now
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/new-arrivals")}
                    >
                        Explore
                    </button>

                </div>

                <div className="hero-stats">

                    <div>
                        <h2>50K+</h2>
                        <p>Customers</p>
                    </div>

                    <div>
                        <h2>1200+</h2>
                        <p>Products</p>
                    </div>

                    <div>
                        <h2>4.9★</h2>
                        <p>Rating</p>
                    </div>

                </div>

            </div>

            <div className="hero-image">

                <img
                    src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700"
                    alt="Fashion"
                />

                <div className="floating-card">

                    <p className="badge">🔥 New Arrival</p>

                    <h3>Premium Jacket</h3>

                    <span>₹4,999</span>

                </div>

            </div>

        </section>
    );
}

export default Hero;