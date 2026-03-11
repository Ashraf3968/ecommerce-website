import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";
import { api } from "../utils/api";
import { formatPrice } from "../utils/format";

const initialFormState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  paymentMethod: "Cash on Delivery",
  notes: ""
};

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const [formState, setFormState] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const shippingFee = subtotal >= 150 ? 0 : 12;
  const totalPrice = subtotal + shippingFee;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const data = await api.post("/orders", {
        orderItems: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price
        })),
        customer: {
          fullName: formState.fullName,
          email: formState.email,
          phone: formState.phone
        },
        shippingAddress: {
          address: formState.address,
          city: formState.city,
          state: formState.state,
          postalCode: formState.postalCode,
          country: formState.country
        },
        paymentMethod: formState.paymentMethod,
        notes: formState.notes
      });

      setSuccessMessage(`${data.message} Order ID: ${data.order._id}`);
      clearCart();
      setFormState(initialFormState);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !successMessage) {
    return (
      <section className="container page-section">
        <EmptyState
          title="Checkout is waiting on your cart."
          description="Add some products before placing an order."
        />
      </section>
    );
  }

  return (
    <section className="container page-section">
      <div className="section-heading">
        <p className="eyebrow">Checkout</p>
        <h1>Place your order.</h1>
      </div>

      {successMessage ? (
        <div className="state-card success">
          <h2>Order confirmed</h2>
          <p>{successMessage}</p>
          <Link className="button primary" to="/products">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="stack-form checkout-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Full name
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </label>
              <label>
                Payment method
                <select
                  name="paymentMethod"
                  value={formState.paymentMethod}
                  onChange={handleChange}
                >
                  <option>Cash on Delivery</option>
                  <option>UPI</option>
                  <option>Card on Delivery</option>
                </select>
              </label>
            </div>

            <label>
              Address
              <input
                type="text"
                name="address"
                value={formState.address}
                onChange={handleChange}
                placeholder="Street address"
              />
            </label>

            <div className="form-grid">
              <label>
                City
                <input
                  type="text"
                  name="city"
                  value={formState.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </label>
              <label>
                State
                <input
                  type="text"
                  name="state"
                  value={formState.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </label>
              <label>
                Postal code
                <input
                  type="text"
                  name="postalCode"
                  value={formState.postalCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                />
              </label>
              <label>
                Country
                <input
                  type="text"
                  name="country"
                  value={formState.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
              </label>
            </div>

            <label>
              Order notes
              <textarea
                rows="4"
                name="notes"
                value={formState.notes}
                onChange={handleChange}
                placeholder="Optional notes for delivery"
              />
            </label>

            {error ? <div className="flash error">{error}</div> : null}

            <button type="submit" className="button primary" disabled={submitting}>
              {submitting ? "Placing order..." : "Place order"}
            </button>
          </form>

          <aside className="summary-card">
            <h2>Your order</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="summary-row stacked">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
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
          </aside>
        </div>
      )}
    </section>
  );
};

export default CheckoutPage;
