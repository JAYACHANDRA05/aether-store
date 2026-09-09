import "./FeaturedProducts.css";
import products from "../../data/products";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  return (
    <section className="featured-products">
      <h2>Featured Products</h2>

      <div className="products-grid">
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;