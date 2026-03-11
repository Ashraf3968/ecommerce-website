import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product"
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    _id: false
  }
);

const addressSchema = new mongoose.Schema(
  {
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  {
    _id: false
  }
);

const customerSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String
  },
  {
    _id: false
  }
);

const orderSchema = new mongoose.Schema(
  {
    orderItems: {
      type: [orderItemSchema],
      required: true
    },
    customer: {
      type: customerSchema,
      required: true
    },
    shippingAddress: {
      type: addressSchema,
      required: true
    },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery"
    },
    subtotal: {
      type: Number,
      required: true
    },
    shippingFee: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    notes: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "Processing"
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
