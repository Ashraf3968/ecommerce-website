import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { menuItems } from "../data/restaurantData";

const RestaurantContext = createContext(null);

const bookingReference = () => `DQ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export const RestaurantProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [cart, setCart] = useState([]);
  const [booking, setBooking] = useState(null);
  const [orderNotice, setOrderNotice] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const addToCart = (itemId) => {
    const item = menuItems.find((entry) => entry.id === itemId);
    if (!item) {
      return;
    }

    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...current, { ...item, quantity: 1 }];
    });

    setOrderNotice(`${item.name} added to the order.`);
  };

  const updateCartItem = (itemId, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(item.quantity + amount, 0) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const submitBooking = (payload) => {
    const confirmation = {
      ...payload,
      reference: bookingReference(),
      submittedAt: new Date().toISOString(),
    };

    setBooking(confirmation);
    return confirmation;
  };

  const cartItems = useMemo(
    () => cart.map((item) => ({ ...item, total: item.price * item.quantity })),
    [cart]
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const value = {
    theme,
    setTheme,
    cart,
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    updateCartItem,
    clearCart,
    booking,
    submitBooking,
    orderNotice,
    setOrderNotice,
  };

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within RestaurantProvider");
  }

  return context;
};
