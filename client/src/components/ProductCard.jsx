import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";

const ProductCard = ({ product }) => (
  <article className="product-card">
    <div className="product-card-image">
      <img src={product.image} alt={product.name} />
      {product.badge ? <span className="badge">{product.badge}</span> : null}
    </div>
    <div className="product-card-body">
      <div className="product-card-meta">
        <span>{product.category}</span>
        <span>{product.rating ? product.rating.toFixed(1) : "New"} / 5</span>
      </div>
      <h3>{product.name}</h3>
      <p>{product.shortDescription}</p>
      <div className="product-card-footer">
        <div>
          <strong>{formatPrice(product.price)}</strong>
          {product.originalPrice ? (
            <small>{formatPrice(product.originalPrice)}</small>
          ) : null}
        </div>
        <Link to={`/products/${product.slug}`}>View product</Link>
      </div>
    </div>
  </article>
);

export default ProductCard;
