import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  const soldOut = item.stock === 0;
  const lowStock = item.stock > 0 && item.stock <= 3;
  const label = soldOut ? "Sold out" : lowStock ? `Only ${item.stock} left` : "In stock";
  const tone = soldOut ? "badge-out" : lowStock ? "badge-low" : "badge-in";

  return (
    <article className="card">
      <div className="swatch" style={{ background: item.color }} aria-hidden="true" />
      <h2>
        <Link to={`/items/${item.id}`}>{item.name}</Link>
      </h2>
      <p>{item.material}</p>
      <p>Rs {item.price.toLocaleString()}</p>
      <p className={`badge ${tone}`}>{label}</p>
    </article>
  );
}
