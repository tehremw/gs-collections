import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { validateQuantity } from "../rules/quantityRule";

export default function Cart() {
  const { lines, setQty, removeLine, qtyOf } = useCart();
  const { items, status, retry } = useProducts();

  if (lines.length === 0) {
    return (
      <div>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop">Browse bracelets</Link>
      </div>
    );
  }
  if (status === "loading") return <p role="status">Loading your cart…</p>;
  if (status === "error")
    return (
      <div role="alert">
        <p>We couldn't check your items.</p>
        <button onClick={retry}>Try again</button>
      </div>
    );

  const rows = lines.map((line) => ({ line, item: items.find((i) => i.id === line.id) }));

  const conflict = (item) => {
    if (!item) return "This bracelet is no longer available.";
    const check = validateQuantity(qtyOf(item.id), item.stock);
    return check.valid ? "" : `${check.message} Please reduce the quantity.`;
  };
  const hasConflict = rows.some(({ item }) => conflict(item));
  const subtotal = rows.reduce((sum, { line, item }) => (item ? sum + item.price * line.qty : sum), 0);

  return (
    <div>
      <h1>Your cart</h1>
      <ul>
        {rows.map(({ line, item }) => {
          const problem = conflict(item);
          return (
            <li key={line.key}>
              <h2>{item ? item.name : "Unavailable item"}</h2>
              {item && (
                <p>
                  Size {line.size}
                  {line.initials && ` · Initials ${line.initials}`} · Rs {item.price.toLocaleString()} each
                </p>
              )}
              {problem && <p role="alert" className="error">{problem}</p>}
              {item && (
                <div className="qty-row">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => setQty(line.key, line.qty - 1)}
                    disabled={line.qty <= 1}
                  >
                    -
                  </button>
                  <span aria-live="polite">{line.qty}</span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => setQty(line.key, line.qty + 1)}
                    disabled={!validateQuantity(qtyOf(item.id) + 1, item.stock).valid}
                  >
                    +
                  </button>
                </div>
              )}
              {item && <p>Line total: Rs {(item.price * line.qty).toLocaleString()}</p>}
              <button type="button" onClick={() => removeLine(line.key)}>Remove</button>
            </li>
          );
        })}
      </ul>

      <p>Subtotal: Rs {subtotal.toLocaleString()}</p>
      {hasConflict ? (
        <p role="status">Fix the items above to continue.</p>
      ) : (
        <Link to="/checkout" className="btn-primary">Continue to checkout</Link>
      )}
    </div>
  );
}
