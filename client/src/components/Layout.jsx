import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "Contact", to: "/contact" }
];

const Layout = ({ children }) => {
  const { cartCount } = useCart();

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-row">
          <Link className="brand-mark" to="/">
            <span className="brand-pill">DQ</span>
            <div>
              <strong>DigitQuo Store</strong>
              <span>Modern essentials for everyday living</span>
            </div>
          </Link>
          <nav className="main-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "active cart-link" : "cart-link"
              }
            >
              Cart
              <span>{cartCount}</span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h3>DigitQuo Store</h3>
            <p>
              A starter ecommerce experience powered by React, Node.js, and MongoDB.
            </p>
          </div>
          <div>
            <h4>Customer Care</h4>
            <p>support@digitquostore.com</p>
            <p>Mon-Sat, 9 AM - 6 PM</p>
          </div>
          <div>
            <h4>Visit</h4>
            <p>MG Road, Bengaluru</p>
            <p>India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
