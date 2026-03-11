import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const specSchema = new mongoose.Schema(
  {
    label: String,
    value: String
  },
  {
    _id: false
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    originalPrice: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      required: true
    },
    gallery: {
      type: [String],
      default: []
    },
    countInStock: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    },
    badge: {
      type: String,
      default: ""
    },
    tags: {
      type: [String],
      default: []
    },
    specs: {
      type: [specSchema],
      default: []
    },
    rating: {
      type: Number,
      default: 0
    },
    numReviews: {
      type: Number,
      default: 0
    },
    reviews: {
      type: [reviewSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
