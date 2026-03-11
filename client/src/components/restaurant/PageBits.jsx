import { Link } from "react-router-dom";
import { paymentMeta } from "../../data/restaurantData";
import { useRestaurant } from "../../context/RestaurantContext";
import { Reveal } from "./Reveal";

export const PageHero = ({ eyebrow, title, text, image, actions = [] }) => (
  <section className="page-hero">
    <div className="page-hero-backdrop" style={{ backgroundImage: `linear-gradient(120deg, rgba(10, 8, 7, 0.7), rgba(10, 8, 7, 0.22)), url(${image})` }} />
    <Reveal className="page-hero-content revealed">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="hero-copy">{text}</p>
      {actions.length ? (
        <div className="hero-actions">
          {actions.map((action) =>
            action.to.startsWith("/") ? (
              <Link key={action.to} className={`button ${action.variant}`} to={action.to}>
                {action.label}
              </Link>
            ) : (
              <a key={action.to} className={`button ${action.variant}`} href={action.to} target="_blank" rel="noreferrer">
                {action.label}
              </a>
            )
          )}
        </div>
      ) : null}
    </Reveal>
  </section>
);

export const SectionHeading = ({ eyebrow, title, text }) => (
  <div className="section-heading reveal revealed">
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {text ? <p>{text}</p> : null}
  </div>
);

export const DemoCta = () => {
  const { openPurchase } = useRestaurant();

  return (
    <Reveal className="section cta-wrap">
      <section className="cta-section">
        <p className="eyebrow">Client Demo Ready</p>
        <h2>Premium multi-page restaurant experience built to help DIGITQUO close hospitality clients.</h2>
        <div className="hero-actions cta-actions">
          <button className="button button-primary" type="button" onClick={openPurchase}>
            Get This Website
          </button>
          <Link className="button button-secondary" to="/contact">
            Talk to DIGITQUO
          </Link>
        </div>
        <p className="cta-note">Instant purchase available via UPI in the popup.</p>
      </section>
    </Reveal>
  );
};

export const PurchaseModalContent = ({ onClose }) => (
  <div className="purchase-modal">
    <div className="purchase-header">
      <div>
        <p className="eyebrow">Premium Purchase</p>
        <h2>Want this website?</h2>
        <p className="hero-copy">Get the complete restaurant demo for just {paymentMeta.priceLabel}.</p>
      </div>
      <button className="lightbox-close" type="button" onClick={onClose}>
        Close
      </button>
    </div>
    <div className="purchase-grid">
      <div className="purchase-card">
        <span className="pricing-label">One-time price</span>
        <strong className="pricing-amount">{paymentMeta.priceLabel}</strong>
        <span className="pricing-label">UPI ID</span>
        <strong className="pricing-upi">{paymentMeta.upiId}</strong>
      </div>
      <div className="purchase-card">
        <span className="pricing-label">Includes</span>
        <ul className="purchase-list">
          {paymentMeta.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="hero-actions">
      <a className="button button-primary" href={paymentMeta.upiLink} target="_blank" rel="noreferrer">
        Pay {paymentMeta.priceLabel}
      </a>
      <Link className="button button-secondary" to="/contact" onClick={onClose}>
        Ask Questions First
      </Link>
    </div>
  </div>
);
