import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { isDemoFailureOn, setDemoFailure } from "../services/mockLoader";

const STATUS_TEXT = {
  loading: "Loading…",
  ready: "Loaded",
  error: "Failed to load",
};

export default function Demo() {
  const { items, status, retry, overrides, setStock, resetStock } = useProducts();
  const [failOn, setFailOn] = useState(isDemoFailureOn);
  const [itemId, setItemId] = useState("");
  const [stockText, setStockText] = useState("");
  const [message, setMessage] = useState("");

  function handleFailureToggle(e) {
    const on = e.target.checked;
    setFailOn(on);
    setDemoFailure(on);
  }

  function handleApply(e) {
    e.preventDefault();
    const stock = Number(stockText);
    if (!itemId) {
      setMessage("Choose a bracelet first.");
      return;
    }
    if (stockText.trim() === "" || !Number.isInteger(stock) || stock < 0 || stock > 50) {
      setMessage("Enter a whole number from 0 to 50.");
      return;
    }
    setStock(itemId, stock);
    const item = items.find((i) => i.id === itemId);
    setMessage(`${item.name} now has ${stock} in stock. Open your cart to see the effect.`);
  }

  const changed = Object.entries(overrides)
    .map(([id, stock]) => ({ item: items.find((i) => i.id === id), stock }))
    .filter((row) => row.item);

  return (
    <div>
      <h1>Demonstration controls</h1>
      <p className="sim-banner" role="note">
        For markers and testers. These controls simulate shop events and change this browser only.
      </p>

      <section className="demo-section" aria-labelledby="demo-stock">
        <h2 id="demo-stock">Change availability</h2>
        <p>
          Simulates the shop's stock changing while a customer already has the item in their cart.
        </p>
        <form onSubmit={handleApply} noValidate>
          <div className="field">
            <label htmlFor="demo-item">Bracelet</label>
            <select id="demo-item" value={itemId} onChange={(e) => setItemId(e.target.value)}>
              <option value="">Choose a bracelet…</option>
              {items.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name} (stock {i.stock})
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="demo-stock-input">New stock (0 to 50)</label>
            <input
              id="demo-stock-input"
              type="number"
              inputMode="numeric"
              min="0"
              max="50"
              value={stockText}
              onChange={(e) => setStockText(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">Apply stock change</button>{" "}
          <button type="button" onClick={() => { resetStock(); setMessage("All stock changes were reset."); }}>
            Reset all stock changes
          </button>
        </form>
        {message && <p role="status">{message}</p>}
        {changed.length > 0 && (
          <>
            <h3>Active changes</h3>
            <ul>
              {changed.map(({ item, stock }) => (
                <li key={item.id}>{item.name}: stock set to {stock}</li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="demo-section" aria-labelledby="demo-fail">
        <h2 id="demo-fail">Simulate a loading failure</h2>
        <p>Products: <strong>{STATUS_TEXT[status]}</strong></p>
        <label className="check">
          <input type="checkbox" checked={failOn} onChange={handleFailureToggle} />
          <span>Make the next product load fail</span>
        </label>
        <p className="hint">
          Tick the box, press the button, then open the shop to see the error and the Try again
          button. Untick the box, then press Try again to recover.
        </p>
        <button type="button" onClick={retry}>Reload products now</button>
      </section>

      <p>
        <Link to="/shop">Go to the shop</Link> · <Link to="/cart">Go to the cart</Link>
      </p>
    </div>
  );
}
