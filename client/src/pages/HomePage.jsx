import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import ProductCard from "../components/ProductCard";
import { features, testimonials } from "../data/site";
import { api } from "../utils/api";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const data = await api.get("/products/featured");
        setFeaturedProducts(data);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <div className="page-stack">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Basic Ecommerce Starter</p>
            <h1>Launch a polished storefront with the core shopping journey ready.</h1>
            <p className="hero-text">
              This starter includes a homepage, product catalog, detail pages,
              cart, checkout, review system, and contact flow on a MERN stack.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/products">
                Shop collection
              </Link>
              <Link className="button ghost" to="/contact">
                Contact us
              </Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-card">
              <span>Ready modules</span>
              <strong>Products, cart, checkout, reviews</strong>
            </div>
            <div className="hero-panel-card accent">
              <span>Stack</span>
              <strong>React + Node.js + MongoDB</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section container">
        <div className="section-heading">
          <p className="eyebrow">Core Features</p>
          <h2>Everything you asked for, stitched into one clean starter.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Featured Products</p>
            <h2>Start with a small curated catalog.</h2>
          </div>
          <Link className="text-link" to="/products">
            View all products
          </Link>
        </div>

        {loading ? <LoadingState label="Loading featured products..." /> : null}
        {error ? <div className="state-card error">{error}</div> : null}

        {!loading && !error ? (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : null}
      </section>

      <section className="testimonial-section">
        <div className="container testimonial-grid">
          {testimonials.map((item) => (
            <blockquote key={item.author} className="testimonial-card">
              <p>{item.quote}</p>
              <footer>{item.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
