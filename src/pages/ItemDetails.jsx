import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import AddToCart from "../components/AddToCart";

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

  return (
    <article>
      <h1>{item.name}</h1>
      <p>Rs {item.price.toLocaleString()}</p>
      <p>{item.description}</p>
      <dl>
        <dt>Material</dt>
        <dd>{item.material}</dd>
        <dt>Category</dt>
        <dd>{item.category}</dd>
        <dt>Availability</dt>
        <dd>{item.stock === 0 ? "Sold out" : `${item.stock} in stock`}</dd>
      </dl>
      <AddToCart key={item.id} item={item} />
    </article>
  );
}
