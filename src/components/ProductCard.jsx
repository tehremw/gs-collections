import { Link } from "react-router-dom";
import { availabilityOf } from "../utils/availability";
import { coverImage } from "../utils/images";
import ProductImage from "./ProductImage";

function subtitle(item) {
  const fit = item.sizes.length === 1
    ? item.sizes[0].label === "Adjustable" ? "Adjustable size" : item.sizes[0].label
    : `Sizes ${item.sizes.map((s) => s.label).join(" · ")}`;
  return item.colors ? `${item.colors.length} colours · ${fit}` : fit;
}

export default function ProductCard({ item }) {
  const { label, tone } = availabilityOf(item);
  const soldOut = item.stock === 0;
  const showStatus = soldOut || item.stock <= 3;
  const onSale = item.oldPrice && item.oldPrice > item.price;

  return (
    <article className="card">
      <div className="card-media">
        <ProductImage image={coverImage(item)} name={item.name} />
        {(showStatus || onSale) && (
          <span className={`pill ${showStatus ? tone : "pill-sale"}`}>
            {showStatus ? label : "Sale"}
          </span>
        )}
        {item.colors && <span className="choose" aria-hidden="true">Choose</span>}
      </div>
      <h2 className="card-title">
        <Link to={`/items/${item.id}`}>{item.name}</Link>
      </h2>
      <p className="card-sub">{subtitle(item)}</p>
      <p className="price">
        Rs {item.price.toLocaleString()}
        {onSale && (
          <s className="old">
            <span className="sr-only">Was </span>Rs {item.oldPrice.toLocaleString()}
          </s>
        )}
      </p>
    </article>
  );
}
