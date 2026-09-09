import products from "../data/products";
import ProductCard from "../components/FeaturedProducts/ProductCard";
import "./NewArrivals.css";

function NewArrivals() {
  const newArrivals = products.slice(-8);

  return (
    <div className="new-arrivals-page">
      <h1>New Arrivals</h1>

      <div className="new-arrivals-grid">
        {newArrivals.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;

