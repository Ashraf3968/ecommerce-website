import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(null);

const loadCart = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedCart = window.localStorage.getItem("digitquo-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.find((item) => item._id === action.payload._id);

      if (existingItem) {
        return state.map((item) =>
          item._id === action.payload._id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + action.payload.quantity,
                  item.countInStock
                )
              }
            : item
        );
      }

      return [...state, action.payload];
    }
    case "REMOVE_ITEM":
      return state.filter((item) => item._id !== action.payload);
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item._id === action.payload.id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(action.payload.quantity, item.countInStock)
              )
            }
          : item
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("digitquo-cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const value = {
    cartItems,
    cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addToCart: (product, quantity = 1) =>
      dispatch({
        type: "ADD_ITEM",
        payload: {
          _id: product._id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          countInStock: product.countInStock,
          quantity
        }
      }),
    removeFromCart: (id) =>
      dispatch({
        type: "REMOVE_ITEM",
        payload: id
      }),
    updateQuantity: (id, quantity) =>
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id, quantity }
      }),
    clearCart: () => dispatch({ type: "CLEAR_CART" })
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
};
