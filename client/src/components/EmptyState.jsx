import { Link } from "react-router-dom";

const EmptyState = ({
  title,
  description,
  actionLabel = "Browse products",
  actionTo = "/products"
}) => (
  <div className="state-card">
    <h2>{title}</h2>
    <p>{description}</p>
    <Link className="button primary" to={actionTo}>
      {actionLabel}
    </Link>
  </div>
);

export default EmptyState;
