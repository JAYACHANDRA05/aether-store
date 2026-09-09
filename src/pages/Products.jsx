import "./Products.css";
import products from "../data/products";
import ProductCard from "../components/FeaturedProducts/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase().trim();

  const [selectedCategory, setSelectedCategory] = useState(
    category || "All"
  );

  const [priceFilter, setPriceFilter] = useState("all");

  const [sortBy, setSortBy] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedCategory(category || "All");
    setCurrentPage(1);
  }, [category]);

  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const productCategory = product.category.toLowerCase();

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      !search ||
      productName.includes(search) ||
      productCategory.includes(search);

    let matchesPrice = true;

    if (priceFilter === "under-2000") {
      matchesPrice = product.price < 2000;
    }

    if (priceFilter === "2000-4000") {
      matchesPrice =
        product.price >= 2000 &&
        product.price <= 4000;
    }

    if (priceFilter === "above-4000") {
      matchesPrice = product.price > 4000;
    }

    return (
      matchesCategory &&
      matchesSearch &&
      matchesPrice
    );
  });

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }

      if (sortBy === "price-high") {
        return b.price - a.price;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "name-az") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "name-za") {
        return b.name.localeCompare(a.name);
      }

      return 0;
    }
  );

  const productsPerPage = 8;

  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;

    setSelectedCategory(newCategory);
    setCurrentPage(1);

    if (newCategory === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({
        category: newCategory,
      });
    }
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="products-page">

      <div className="products-header">

        <h1>
          {search
            ? `Search Results for "${search}"`
            : selectedCategory !== "All"
            ? `${selectedCategory} Products`
            : "All Products"}
        </h1>

        <div className="products-controls">

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="All">
              Category
            </option>

            <option value="Men">
              Men
            </option>

            <option value="Women">
              Women
            </option>

            <option value="Shoes">
              Shoes
            </option>

            <option value="Accessories">
              Accessories
            </option>
          </select>

          <select
            value={priceFilter}
            onChange={handlePriceChange}
            className="price-select"
          >
            <option value="all">
              Price
            </option>

            <option value="under-2000">
              Under ₹2000
            </option>

            <option value="2000-4000">
              ₹2000 - ₹4000
            </option>

            <option value="above-4000">
              Above ₹4000
            </option>
          </select>

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="default">
              Sort By
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating">
              Rating: High to Low
            </option>

            <option value="name-az">
              Name: A to Z
            </option>

            <option value="name-za">
              Name: Z to A
            </option>
          </select>

        </div>

      </div>

      {currentProducts.length > 0 ? (

        <>
          <div className="products-grid">

            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

          {totalPages > 1 && (
            <div className="pagination">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index}
                    className={
                      currentPage === index + 1
                        ? "active-page"
                        : ""
                    }
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
              >
                Next
              </button>

            </div>
          )}

        </>

      ) : (

        <div className="no-products">

          <h2>No products found</h2>

          <p>
            Try changing your filters or searching for something else.
          </p>

        </div>

      )}

    </div>
  );
}

export default Products;