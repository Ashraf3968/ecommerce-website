import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import ProductCard from "../components/ProductCard";
import { api } from "../utils/api";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const [productList, categoryList] = await Promise.all([
          api.get("/products"),
          api.get("/products/categories")
        ]);
        setProducts(productList);
        setCategories(categoryList);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadCatalog();
  }, []);

  const query = searchTerm.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.shortDescription.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="container page-section">
      <div className="section-heading">
        <p className="eyebrow">Product Listing</p>
        <h1>Browse the catalog.</h1>
      </div>

      <div className="toolbar">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search products"
        />
        <div className="chip-row">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={selectedCategory === "All" ? "active" : ""}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? <LoadingState label="Loading catalog..." /> : null}
      {error ? <div className="state-card error">{error}</div> : null}

      {!loading && !error && filteredProducts.length === 0 ? (
        <EmptyState
          title="No products matched your filters."
          description="Try a different category or search term."
        />
      ) : null}

      {!loading && !error && filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ProductsPage;
