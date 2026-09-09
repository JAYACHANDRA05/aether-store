import "./About.css";
import { Link } from "react-router-dom";
function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <p className="about-label">WELCOME TO AETHER</p>

        <h1>Style That Defines You.</h1>

        <p className="about-hero-text">
          Aether is a modern fashion destination built for people
          who believe that great style is all about confidence,
          simplicity, and individuality.
        </p>
      </section>

      <section className="about-story">
        <div className="about-story-content">
          <p className="about-label">OUR STORY</p>

          <h2>More Than Just Fashion</h2>

          <p>
            Aether was created with a simple idea — fashion should
            be effortless, modern, and accessible. We bring together
            carefully selected styles that help you express who you
            are without compromising on comfort.
          </p>

          <p>
            From everyday essentials to statement pieces, Aether
            focuses on creating a shopping experience that feels
            simple, elegant, and enjoyable.
          </p>
        </div>

        <div className="about-story-box">
          <span>A</span>
          <h3>AETHER</h3>
          <p>Modern. Simple. Timeless.</p>
        </div>
      </section>

      <section className="about-mission">

        <div className="about-mission-card">
          <h3>Our Mission</h3>

          <p>
            To make modern fashion accessible to everyone while
            creating a seamless and enjoyable online shopping
            experience.
          </p>
        </div>

        <div className="about-mission-card">
          <h3>Our Vision</h3>

          <p>
            To build a fashion brand that combines timeless design,
            quality, and technology to redefine online shopping.
          </p>
        </div>

        <div className="about-mission-card">
          <h3>Our Values</h3>

          <p>
            Simplicity, quality, creativity, and customer satisfaction
            are at the heart of everything we do.
          </p>
        </div>

      </section>

      <section className="about-features">

        <p className="about-label">WHY AETHER</p>

        <h2>Designed For Your Lifestyle</h2>

        <div className="about-feature-grid">

          <div className="about-feature">
            <h3>01</h3>
            <h4>Curated Styles</h4>
            <p>
              Discover carefully selected products designed for
              modern everyday fashion.
            </p>
          </div>

          <div className="about-feature">
            <h3>02</h3>
            <h4>Simple Shopping</h4>
            <p>
              Browse, wishlist, add to cart, and checkout with
              a smooth and simple experience.
            </p>
          </div>

          <div className="about-feature">
            <h3>03</h3>
            <h4>Made For You</h4>
            <p>
              Fashion choices that help you express your own
              personality and individual style.
            </p>
          </div>

        </div>

      </section>

      <section className="about-cta">

        <h2>Find Your Style With Aether</h2>

        <p>
          Explore our latest collection and discover something
          that feels uniquely you.
        </p>

        <Link to="/products" className="about-shop-btn">
          Explore Collection
        </Link>

      </section>

    </div>
  );
}

export default About;