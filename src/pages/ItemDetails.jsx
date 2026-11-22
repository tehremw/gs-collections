import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { availabilityOf } from "../utils/availability";
import AddToCart from "../components/AddToCart";
import ProductGallery from "../components/ProductGallery";
import { imagesFor } from "../utils/images";

function ItemView({ item }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [color, setColor] = useState(item.colors ? item.colors[0].label : "");
  const { label, tone } = availabilityOf(item);
  const images = imagesFor(item, color);
  const canGoBack = location.key !== "default";

  return (
    <article>
      <p>
        {canGoBack ? (
          <button type="button" onClick={() => navigate(-1)}>← Back to results</button>
        ) : (
          <Link to="/shop">← All bracelets</Link>
        )}
      </p>
      <div className="details">
        <ProductGallery key={color} images={images} name={item.name} />
        <div>
          <h1>{item.name}</h1>
          <p className="details-price">Rs {item.price.toLocaleString()}</p>
          <p className={`badge ${tone}`}>{label}</p>
          <p>{item.description}</p>
          <dl className="spec">
            <dt>Material</dt><dd>{item.material}</dd>
            <dt>Category</dt><dd>{item.category}</dd>
          </dl>
          <AddToCart item={item} color={color} onColorChange={setColor} />
        </div>
      </div>
    </article>
  );
}

export default function ItemDetails() {
  const { id } = useParams();
  const { items, status, retry } = useProducts();

  if (status === "loading") return <p role="status">Loading…</p>;
  if (status === "error")
    return (
      <div role="alert">
        <p>We couldn't load this bracelet.</p>
        <button onClick={retry}>Try again</button>
      </div>
    );

  const item = items.find((i) => i.id === id);
  if (!item)
    return (
      <div>
        <h1>We couldn't find bracelet “{id}”</h1>
        <Link to="/shop">Browse all bracelets</Link>
      </div>
    );

  return <ItemView key={item.id} item={item} />;
}
