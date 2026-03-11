import { isDemoModeEnabled } from "../config/storage.js";
import {
  addReviewToProduct,
  findCategories,
  findFeaturedProducts,
  findProductBySlug as findDemoProductBySlug,
  findProducts as findDemoProducts
} from "../data/demoStore.js";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const { category, q } = req.query;

  if (isDemoModeEnabled()) {
    return res.json(findDemoProducts({ category, q }));
  }

  const filters = {};

  if (category) {
    filters.category = category;
  }

  if (q) {
    filters.$or = [
      { name: { $regex: q, $options: "i" } },
      { shortDescription: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } }
    ];
  }

  const products = await Product.find(filters).sort({ createdAt: -1 });
  res.json(products);
};

export const getFeaturedProducts = async (_req, res) => {
  if (isDemoModeEnabled()) {
    return res.json(findFeaturedProducts());
  }

  const products = await Product.find({ featured: true }).limit(3);
  res.json(products);
};

export const getCategories = async (_req, res) => {
  if (isDemoModeEnabled()) {
    return res.json(findCategories());
  }

  const categories = await Product.distinct("category");
  res.json(categories);
};

export const getProductBySlug = async (req, res) => {
  const product = isDemoModeEnabled()
    ? findDemoProductBySlug(req.params.slug)
    : await Product.findOne({ slug: req.params.slug });

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  res.json(product);
};

export const createReview = async (req, res) => {
  const { name, rating, comment } = req.body;

  if (!name || !rating || !comment) {
    res.status(400);
    throw new Error("Name, rating, and comment are required.");
  }

  if (isDemoModeEnabled()) {
    const product = addReviewToProduct(req.params.id, { name, rating, comment });

    if (!product) {
      res.status(404);
      throw new Error("Product not found.");
    }

    return res.status(201).json({
      message: "Review added successfully.",
      product
    });
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  product.reviews.unshift({
    name,
    rating: Number(rating),
    comment
  });

  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
    product.reviews.length;

  await product.save();

  res.status(201).json({
    message: "Review added successfully.",
    product
  });
};