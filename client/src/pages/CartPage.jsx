import { Link, useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, removeFromCart, updateQuantity } = useCart();
  const shippingFee = subtotal >= 150 ? 0 : 12;
  const totalPrice = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <section className="container page-section">
        <EmptyState
          title="Your cart is empty."
          description="Add a few products to continue to checkout."
        />
      </section>
    );
  }

  return (
    <section className="container page-section">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Cart</p>
          <h1>Review your items.</h1>
        </div>
        <Link className="text-link" to="/products">
          Continue shopping
        </Link>
      </div>

      <div className="checkout-layout">
        <div className="cart-list">
          {cartItems.map((item) => (
            <article key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-body">
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
                <div className="cart-item-actions">
                  <select
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item._id, Number(event.target.value))}
                  >
                    {Array.from({ length: item.countInStock }, (_, index) => index + 1).map(
                      (value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      )
                    )}
                  </select>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </article>
          ))}
        </div>

        <aside className="summary-card">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>{shippingFee === 0 ? "Free" : formatPrice(shippingFee)}</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
          <button
            type="button"
            className="button primary full"
            onClick={() => navigate("/checkout")}
          >
            Proceed to checkout
          </button>
        </aside>
      </div>
    </section>
  );
};

export default CartPage;
