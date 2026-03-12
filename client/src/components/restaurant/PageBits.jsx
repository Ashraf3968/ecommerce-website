import { Link } from "react-router-dom";
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

export const DemoCta = () => (
  <Reveal className="section cta-wrap">
    <section className="cta-section">
      <p className="eyebrow">Client Demo Ready</p>
      <h2>Premium multi-page restaurant experience built to help DIGITQUO close hospitality clients.</h2>
      <div className="hero-actions cta-actions">
        <Link className="button button-primary" to="/contact">
          Contact Us to Purchase
        </Link>
        <Link className="button button-secondary" to="/reservations">
          Try Booking Flow
        </Link>
      </div>
    </section>
  </Reveal>
);
