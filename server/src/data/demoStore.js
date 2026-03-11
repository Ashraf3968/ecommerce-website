import mongoose from "mongoose";
import { sampleProducts } from "./products.js";

const createTimestamp = (index) => new Date(Date.now() - index * 3600000).toISOString();

const products = sampleProducts.map((product, index) => ({
  ...structuredClone(product),
  _id: new mongoose.Types.ObjectId().toString(),
  reviews: [],
  rating: 0,
  numReviews: 0,
  createdAt: createTimestamp(index),
  updatedAt: createTimestamp(index)
}));

const orders = [];
const contactMessages = [];

export const findProducts = ({ category, q } = {}) => {
  const query = q?.trim().toLowerCase();

  return products
    .filter((product) => {
      const matchesCategory = !category || product.category === category;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    })
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
};

export const findFeaturedProducts = () =>
  products.filter((product) => product.featured).slice(0, 3);

export const findCategories = () => [...new Set(products.map((product) => product.category))];

export const findProductBySlug = (slug) =>
  products.find((product) => product.slug === slug) || null;

export const findProductById = (id) =>
  products.find((product) => product._id === id) || null;

export const addReviewToProduct = (productId, reviewInput) => {
  const product = findProductById(productId);

  if (!product) {
    return null;
  }

  const review = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: reviewInput.name,
    rating: Number(reviewInput.rating),
    comment: reviewInput.comment,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  product.reviews.unshift(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((sum, currentReview) => sum + currentReview.rating, 0) /
    product.reviews.length;
  product.updatedAt = new Date().toISOString();

  return product;
};

export const createOrderInStore = (payload) => {
  const order = {
    _id: new mongoose.Types.ObjectId().toString(),
    ...structuredClone(payload),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  orders.unshift(order);
  return order;
};

export const createContactMessageInStore = (payload) => {
  const contactMessage = {
    _id: new mongoose.Types.ObjectId().toString(),
    ...structuredClone(payload),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  contactMessages.unshift(contactMessage);
  return contactMessage;
};