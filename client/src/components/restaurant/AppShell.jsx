import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navLinks, siteMeta } from "../../data/restaurantData";
import { useRestaurant } from "../../context/RestaurantContext";

export const AppShell = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [salesOpen, setSalesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountMode, setAccountMode] = useState("login");
  const [accountError, setAccountError] = useState("");
  const [accountMessage, setAccountMessage] = useState("");
  const { pathname } = useLocation();
  const {
    theme,
    setTheme,
    cartCount,
    isLoggedIn,
    login,
    logout,
    authPrompt,
    closeAuthPrompt,
  } = useRestaurant();
  const hasShownRef = useRef(false);
  const salesTimerRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaderVisible(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 850, once: true, offset: 120, easing: "ease-out" });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
    if (window.AOS) {
      window.AOS.refresh();
    }
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

  useEffect(() => {
    if (authPrompt.open) {
      setAccountOpen(true);
      setAccountMode("login");
      setAccountMessage(authPrompt.message);
    }
  }, [authPrompt.open, authPrompt.message]);

  const handleNewsletter = (event) => {
    event.preventDefault();
    setNewsletterMessage("You are subscribed to the DIGITQUO demo newsletter.");
    event.currentTarget.reset();
  };

  const closeSales = () => setSalesOpen(false);

  const closeAccount = () => {
    setAccountOpen(false);
    setAccountError("");
    setAccountMessage("");
    closeAuthPrompt();
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (!email || !password) {
      setAccountError("Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      setAccountError("Password must be at least 6 characters.");
      return;
    }

    login();
    closeAccount();
  };

  const handleSignup = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const confirm = formData.get("confirm").trim();

    if (!name || !email || !password || !confirm) {
      setAccountError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setAccountError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setAccountError("Passwords do not match.");
      return;
    }

    login();
    closeAccount();
  };

  return (
    <>
      <div className={`loader ${loaderVisible ? "loader-visible" : "loader-hidden"}`}>
        <div className="loader-mark">
          <span>{siteMeta.name}</span>
          <small>{siteMeta.subtitle}</small>
        </div>
      </div>

      <div className="app-shell">
        <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>

          <NavLink className="brand" to="/" aria-label="DIGITQUO Demo Restaurant Home">
            <img className="brand-logo" src="/logo.png" alt="DIGITQUO logo" />
            <div className="brand-text">
              <span>{siteMeta.name}</span>
              <small>{siteMeta.subtitle.toUpperCase()}</small>
            </div>
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
            <NavLink className="cart-pill" to="/order" aria-label="Cart">
  <svg className="cart-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 .001 4A2 2 0 0 0 17 18zM6.2 6l.7 3.5h10.7l1.2-4.5H7.3l-.3-1.5H3V1h3.1l1 5z" />
  </svg>
  <span className="cart-count">{cartCount}</span>
</NavLink>
            <button
              className="button button-primary account-button"
              type="button"
              onClick={() => {
                setAccountOpen(true);
                setAccountMode("login");
                setAccountMessage("");
              }}
            >
              {isLoggedIn ? "Account" : "Login"}
            </button>
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

        <main className="page-transition" key={pathname}>{children}</main>

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
                  Like this website? We are selling this complete restaurant website for only Rs. 3,499. Get your business online today with a professional design.
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
            </div>
          </div>
        </div>
      ) : null}

      {accountOpen ? (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={closeAccount}>
          <div className="modal-surface account-modal" onClick={(event) => event.stopPropagation()}>
            <div className="account-modal-header">
              <div>
                <p className="eyebrow">Account</p>
                <h2>{accountMode === "login" ? "Login" : "Create Account"}</h2>
                {accountMessage ? <p className="hero-copy">{accountMessage}</p> : null}
              </div>
              <button className="lightbox-close" type="button" onClick={closeAccount}>
                Close
              </button>
            </div>

            {isLoggedIn ? (
              <div className="account-logged">
                <p className="hero-copy">You are logged in. Use the button below to log out.</p>
                <button className="button button-secondary" type="button" onClick={() => { logout(); closeAccount(); }}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <div className="account-tabs">
                  <button
                    type="button"
                    className={accountMode === "login" ? "active" : ""}
                    onClick={() => { setAccountMode("login"); setAccountError(""); }}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className={accountMode === "signup" ? "active" : ""}
                    onClick={() => { setAccountMode("signup"); setAccountError(""); }}
                  >
                    Sign Up
                  </button>
                </div>
                {accountMode === "login" ? (
                  <form className="account-form" onSubmit={handleLogin}>
                    <label htmlFor="accountEmail">Email</label>
                    <input id="accountEmail" name="email" type="email" placeholder="you@restaurant.com" required />

                    <label htmlFor="accountPassword">Password</label>
                    <input id="accountPassword" name="password" type="password" placeholder="Enter password" required />

                    {accountError ? <p className="form-message">{accountError}</p> : null}

                    <button className="button button-primary" type="submit">Login</button>
                    <div className="account-divider">
                      <span>Don't have an account?</span>
                    </div>
                    <button className="link-button" type="button" onClick={() => { setAccountMode("signup"); setAccountError(""); }}>
                      Create Account
                    </button>
                  </form>
                ) : (
                  <form className="account-form" onSubmit={handleSignup}>
                    <label htmlFor="signupName">Full Name</label>
                    <input id="signupName" name="name" type="text" placeholder="Full name" required />

                    <label htmlFor="signupEmail">Email</label>
                    <input id="signupEmail" name="email" type="email" placeholder="you@restaurant.com" required />

                    <label htmlFor="signupPassword">Password</label>
                    <input id="signupPassword" name="password" type="password" placeholder="Create password" required />

                    <label htmlFor="signupConfirm">Confirm Password</label>
                    <input id="signupConfirm" name="confirm" type="password" placeholder="Confirm password" required />

                    {accountError ? <p className="form-message">{accountError}</p> : null}

                    <button className="button button-primary" type="submit">Create Account</button>
                    <div className="account-divider">
                      <span>Already have an account?</span>
                    </div>
                    <button className="link-button" type="button" onClick={() => { setAccountMode("login"); setAccountError(""); }}>
                      Back to Login
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};



