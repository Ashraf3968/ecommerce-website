import express from "express";
import {
  createReview,
  getCategories,
  getFeaturedProducts,
  getProductBySlug,
  getProducts
} from "../controllers/productController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(getProducts));
router.get("/featured", asyncHandler(getFeaturedProducts));
router.get("/categories", asyncHandler(getCategories));
router.get("/:slug", asyncHandler(getProductBySlug));
router.post("/:id/reviews", asyncHandler(createReview));

export default router;
