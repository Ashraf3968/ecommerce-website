import { useMemo, useState } from "react";

import { DemoCta, PageHero, SectionHeading } from "../../components/restaurant/PageBits";
import { Reveal } from "../../components/restaurant/Reveal";
import { useRestaurant } from "../../context/RestaurantContext";
import { menuItems } from "../../data/restaurantData";

const maxStars = 5;

const Star = ({ filled }) => (
  <svg
    className={`star-icon ${filled ? "" : "is-empty"}`.trim()}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 2.75l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.75z" />
  </svg>
);

const renderStars = (rating) => (
  <div className="stars menu-stars">
    {Array.from({ length: maxStars }).map((_, index) => (
      <Star key={index} filled={index < rating} />
    ))}
  </div>
);

export const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useRestaurant();

  const categories = useMemo(() => ["All", ...new Set(menuItems.map((item) => item.category))], []);
  const filteredItems = useMemo(
    () => (activeCategory === "All" ? menuItems : menuItems.filter((item) => item.category === activeCategory)),
    [activeCategory]
  );

  return (
    <>
      <PageHero
        eyebrow="Menu Showcase"
        title="A menu page that feels curated, premium, and easy to order from."
        text="Separate menu browsing helps clients see how dishes, pricing, and categories can be presented in a more polished and conversion-friendly format."
        image="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=80"
        actions={[{ to: "/order", label: "Order Online", variant: "button-primary" }]}
      />

      <section className="section">
        <SectionHeading
          eyebrow="Categories"
          title="Filter by course and keep the browsing experience clean."
          text="This demo includes realistic card design, dietary labels, pricing, and direct ordering actions."
        />
        <Reveal className="filter-row revealed">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-chip ${activeCategory === category ? "active" : ""}`}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </Reveal>
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <Reveal className="menu-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <div>
                    <span className="menu-category">{item.category}</span>
                    <h3>{item.name}</h3>
                  </div>
                  <div className="menu-card-price">
                    <strong>${item.price}</strong>
                    <div className="menu-rating">
                      {renderStars(item.rating ?? 5)}
                      <span>{(item.rating ?? 5).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <p>{item.description}</p>
                <div className="card-meta-row">
                  <span className="pill-label">{item.dietary}</span>
                  <button className="button button-primary" type="button" onClick={() => addToCart(item.id)}>
                    Add to Order
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <DemoCta />
    </>
  );
};





