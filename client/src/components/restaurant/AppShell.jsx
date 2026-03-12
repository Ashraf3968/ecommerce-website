import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navLinks, siteMeta } from "../../data/restaurantData";
import { useRestaurant } from "../../context/RestaurantContext";

export const AppShell = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [salesOpen, setSalesOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, setTheme, cartCount } = useRestaurant();
  const hasShownRef = useRef(false);
  const salesTimerRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaderVisible(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    salesTimerRef.current = window.setTimeout(() => {
      setSalesOpen(true);
      hasShownRef.current = true;
    }, 5000);

    return () => window.clearTimeout(salesTimerRef.current);
  }, []);

  useEffect(() => {
    if (!salesOpen && hasShownRef.current) {
      window.clearTimeout(salesTimerRef.current);
      salesTimerRef.current = window.setTimeout(() => {
        setSalesOpen(true);
      }, 30000);
    }

    return () => window.clearTimeout(salesTimerRef.current);
  }, [salesOpen]);

  const handleNewsletter = (event) => {
    event.preventDefault();
    setNewsletterMessage("You are subscribed to the DIGITQUO demo newsletter.");
    event.currentTarget.reset();
  };

  const closeSales = () => setSalesOpen(false);

  return (
    <>
      <div className={`loader ${loaderVisible ? "loader-visible" : "loader-hidden"}`}>
        <div className="loader-mark">
          <span>{siteMeta.name}</span>
          <small>{siteMeta.subtitle}</small>
        </div>
      </div>

      <div className="app-shell">
        <header className="site-header">
          <NavLink className="brand" to="/" aria-label="DIGITQUO Demo Restaurant Home">
            <span>{siteMeta.name}</span>
            <small>{siteMeta.subtitle.toUpperCase()}</small>
          </NavLink>

          <nav className={`site-nav ${menuOpen ? "is-open" : ""}`}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <NavLink className="cart-pill" to="/order">
              Cart {cartCount}
            </NavLink>
            <button
              className={`hamburger ${menuOpen ? "is-open" : ""}`}
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Toggle navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div>
            <h3>Hours</h3>
            {siteMeta.hours.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div>
            <h3>Contact</h3>
            <p><a href={siteMeta.phoneHref}>{siteMeta.phone}</a></p>
            <p><a href={siteMeta.emailHref}>{siteMeta.email}</a></p>
            <p><a href={siteMeta.whatsappHref} target="_blank" rel="noreferrer">WhatsApp Chat</a></p>
            <p>{siteMeta.address}</p>
          </div>
          <div>
            <h3>Follow</h3>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
            </div>
          </div>
          <div>
            <h3>Newsletter</h3>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input type="email" placeholder="Email address" aria-label="Email address" required />
              <button type="submit">Join</button>
            </form>
            {newsletterMessage ? <p className="form-message">{newsletterMessage}</p> : null}
          </div>
          <p className="footer-note">Demo Website Created by DIGITQUO</p>
        </footer>
      </div>

      {salesOpen ? (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={closeSales}>
          <div className="modal-surface sales-modal" onClick={(event) => event.stopPropagation()}>
            <div className="sales-modal-header">
              <div>
                <p className="eyebrow">Own This Website for Your Restaurant</p>
                <h2>Own This Website for Your Restaurant</h2>
                <p className="hero-copy">
                  Like this website? We are selling this complete restaurant website for only ?3,499. Get your business online today with a professional design.
                </p>
              </div>
              <button className="lightbox-close" type="button" onClick={closeSales}>
                Close
              </button>
            </div>
            <div className="hero-actions">
              <NavLink className="button button-primary" to="/contact" onClick={closeSales}>
                Contact Us to Purchase
              </NavLink>
              <button className="button button-secondary" type="button" onClick={closeSales}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
