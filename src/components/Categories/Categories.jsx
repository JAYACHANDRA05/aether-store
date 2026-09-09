import "./Categories.css";
import { Link } from "react-router-dom";
import {
  FaMale,
  FaFemale,
  FaShoePrints,
  FaGem,
} from "react-icons/fa";

function Categories() {
  const categories = [
    { id: 1, name: "Men", icon: <FaMale /> },
    { id: 2, name: "Women", icon: <FaFemale /> },
    { id: 3, name: "Shoes", icon: <FaShoePrints /> },
    { id: 4, name: "Accessories", icon: <FaGem /> },
  ];

  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            to={`/products?category=${category.name}`}
            className="category-card"
            key={category.id}
          >
            <div className="category-icon">
              {category.icon}
            </div>

            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;