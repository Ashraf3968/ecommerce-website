import { useState } from "react";
import { DemoCta, PageHero, SectionHeading } from "../../components/restaurant/PageBits";
import { Reveal } from "../../components/restaurant/Reveal";
import { useRestaurant } from "../../context/RestaurantContext";
import { menuItems } from "../../data/restaurantData";

export const OrderPage = () => {
  const { addToCart, cartItems, cartCount, cartTotal, updateCartItem, clearCart, orderNotice, setOrderNotice } = useRestaurant();
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const handleCheckout = () => {
    setCheckoutMessage(`Demo checkout prepared for ${cartCount} item${cartCount === 1 ? "" : "s"}. Total $${cartTotal.toFixed(2)}.`);
    clearCart();
    setTimeout(() => setOrderNotice(""), 1200);
  };

  return (
    <>
      <PageHero
        eyebrow="Online Ordering"
        title="A separate ordering page with a live cart gives the demo real selling power."
        text="Restaurant owners can clearly see how takeaway or direct order flows would work without mixing everything into the homepage."
        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80"
        actions={[{ to: "/menu", label: "Browse Full Menu", variant: "button-secondary" }]}
      />

      <section className="section order-layout-page">
        <div>
          <SectionHeading
            eyebrow="Order Favorites"
            title="Fast add-to-cart interactions with a polished cart summary."
            text="This structure works well for direct orders, delivery integrations, or table-side preorder experiences."
          />
          <div className="order-list">
            {menuItems.map((item) => (
              <Reveal className="order-item" key={item.id}>
                <img className="order-thumb" src={item.image} alt={item.name} />
                <div>
                  <span className="menu-category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="order-item-actions">
                  <strong>${item.price}</strong>
                  <button type="button" onClick={() => addToCart(item.id)}>Add</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="cart-summary sticky-card">
          <div className="cart-summary-header">
            <h3>Cart Summary</h3>
            <span>{cartCount} items</span>
          </div>
          {orderNotice ? <p className="form-message success">{orderNotice}</p> : null}
          <div className="cart-items">
            {cartItems.length ? (
              cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>${item.total.toFixed(2)}</span>
                  </div>
                  <div className="cart-controls">
                    <button type="button" onClick={() => updateCartItem(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateCartItem(item.id, 1)}>+</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-cart">Your demo cart is empty. Add dishes to preview the ordering experience.</p>
            )}
          </div>
          <div className="cart-total">
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
          <button className="button button-primary" type="button" disabled={!cartItems.length} onClick={handleCheckout}>
            Checkout Demo
          </button>
          {checkoutMessage ? <p className="form-message success">{checkoutMessage}</p> : null}
        </Reveal>
      </section>

      <DemoCta />
    </>
  );
};
