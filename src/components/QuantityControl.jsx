import { MAX_PER_ORDER } from "../rules/quantityRule";

export default function QuantityControl({ value, onChange, stock, inCart, canIncrease, error }) {
  return (
    <div className="qty">
      <label htmlFor="qty-input">Quantity</label>
      <div className="stepper">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => onChange(Math.max(1, value - 1))}
          disabled={value <= 1}
        >
          -
        </button>
        <input
          id="qty-input"
          type="number"
          inputMode="numeric"
          min="1"
          value={value === 0 ? "" : value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-describedby="qty-help"
          aria-invalid={Boolean(error)}
        />
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onChange(value + 1)}
          disabled={!canIncrease}
        >
          +
        </button>
      </div>
      <p id="qty-help" className="hint">
        {stock} in stock · max {MAX_PER_ORDER} per order
        {inCart > 0 ? ` · ${inCart} already in your cart` : ""}
      </p>
      {error && <p role="alert" className="error">{error}</p>}
    </div>
  );
}
