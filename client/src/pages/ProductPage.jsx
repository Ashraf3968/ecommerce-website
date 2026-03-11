import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import { useCart } from "../context/CartContext";
import { api } from "../utils/api";
import { formatPrice, formatReviewDate } from "../utils/format";

const initialReviewState = {
  name: "",
  rating: 5,
  comment: ""
};

const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState(initialReviewState);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await api.get(`/products/${slug}`);
        setProduct(data);
        setSelectedImage(data.image);
      } catch (error) {
        setLoadError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setReviewSubmitting(true);
    setReviewError("");
    setSuccessMessage("");

    try {
      const data = await api.post(`/products/${product._id}/reviews`, reviewForm);
      setProduct(data.product);
      setReviewForm(initialReviewState);
      setSuccessMessage(data.message);
    } catch (error) {
      setReviewError(error.message);
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="container page-section">
        <LoadingState label="Loading product..." />
      </section>
    );
  }

  if (loadError || !product) {
    return (
      <section className="container page-section">
        <div className="state-card error">{loadError || "Product not found."}</div>
      </section>
    );
  }

  const imageOptions = [product.image, ...product.gallery.filter((item) => item !== product.image)];
  const shippingMessage =
    product.countInStock > 10 ? "In stock and ready to ship." : "Limited stock available.";

  return (
    <section className="container page-section">
      <Link className="text-link" to="/products">
        Back to products
      </Link>

      <div className="product-detail-grid">
        <div className="gallery-panel">
          <div className="gallery-main">
            <img src={selectedImage} alt={product.name} />
          </div>
          <div className="gallery-strip">
            {imageOptions.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={selectedImage === image ? "active" : ""}
              >
                <img src={image} alt={`${product.name} preview ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info-panel">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <div className="rating-row">
            <span>{product.rating ? product.rating.toFixed(1) : "New"} / 5</span>
            <span>{product.numReviews} reviews</span>
          </div>
          <div className="price-row">
            <strong>{formatPrice(product.price)}</strong>
            {product.originalPrice ? <small>{formatPrice(product.originalPrice)}</small> : null}
          </div>
          <p>{product.description}</p>
          <p className="stock-note">{shippingMessage}</p>

          <div className="quantity-row">
            <label htmlFor="quantity">Quantity</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            >
              {Array.from({ length: product.countInStock }, (_, index) => index + 1).map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="action-row">
            <button
              type="button"
              className="button primary"
              onClick={() => addToCart(product, quantity)}
              disabled={product.countInStock === 0}
            >
              {product.countInStock === 0 ? "Out of stock" : "Add to cart"}
            </button>
            <Link className="button ghost" to="/cart">
              View cart
            </Link>
          </div>

          <div className="spec-list">
            {product.specs.map((spec) => (
              <div key={spec.label} className="spec-row">
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="review-layout">
        <section className="review-panel">
          <div className="section-heading compact">
            <p className="eyebrow">Review System</p>
            <h2>Customer reviews</h2>
          </div>

          {product.reviews.length === 0 ? (
            <div className="state-card">
              <p>No reviews yet. Be the first to share feedback.</p>
            </div>
          ) : (
            <div className="review-list">
              {product.reviews.map((review) => (
                <article key={review._id} className="review-card">
                  <div className="review-card-head">
                    <strong>{review.name}</strong>
                    <span>{review.rating} / 5</span>
                  </div>
                  <p>{review.comment}</p>
                  <small>{formatReviewDate(review.createdAt)}</small>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="review-form-panel">
          <div className="section-heading compact">
            <p className="eyebrow">Leave a review</p>
            <h2>Tell shoppers what you think.</h2>
          </div>

          {successMessage ? <div className="flash success">{successMessage}</div> : null}
          {reviewError ? <div className="flash error">{reviewError}</div> : null}

          <form className="stack-form" onSubmit={handleReviewSubmit}>
            <label>
              Name
              <input
                type="text"
                value={reviewForm.name}
                onChange={(event) =>
                  setReviewForm((current) => ({
                    ...current,
                    name: event.target.value
                  }))
                }
                placeholder="Your name"
              />
            </label>
            <label>
              Rating
              <select
                value={reviewForm.rating}
                onChange={(event) =>
                  setReviewForm((current) => ({
                    ...current,
                    rating: Number(event.target.value)
                  }))
                }
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Comment
              <textarea
                rows="5"
                value={reviewForm.comment}
                onChange={(event) =>
                  setReviewForm((current) => ({
                    ...current,
                    comment: event.target.value
                  }))
                }
                placeholder="Share what stood out to you"
              />
            </label>
            <button type="submit" className="button primary" disabled={reviewSubmitting}>
              {reviewSubmitting ? "Submitting..." : "Submit review"}
            </button>
          </form>
        </section>
      </div>
    </section>
  );
};

export default ProductPage;
