import { isDemoModeEnabled } from "../config/storage.js";
import { createOrderInStore } from "../data/demoStore.js";
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { orderItems, customer, shippingAddress, paymentMethod, notes } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("Your cart is empty.");
  }

  if (!customer?.fullName || !customer?.email || !shippingAddress?.address) {
    res.status(400);
    throw new Error("Customer and shipping details are required.");
  }

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 150 ? 0 : 12;
  const totalPrice = subtotal + shippingFee;
  const orderPayload = {
    orderItems,
    customer,
    shippingAddress,
    paymentMethod,
    notes,
    subtotal,
    shippingFee,
    totalPrice,
    status: "Processing"
  };

  const order = isDemoModeEnabled()
    ? createOrderInStore(orderPayload)
    : await Order.create(orderPayload);

  res.status(201).json({
    message: "Order placed successfully.",
    order
  });
};