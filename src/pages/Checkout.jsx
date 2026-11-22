import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCartSummary } from "../hooks/useCartSummary";
import { validateCheckout } from "../rules/checkoutValidation";
import { DELIVERY_AREAS } from "../data/deliveryAreas";
import { writeSessionJSON } from "../utils/storage";
import OrderSummary from "../components/OrderSummary";

const EMPTY = { name: "", phone: "", area: "", address: "", note: "" };

export default function Checkout() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { rows, subtotal, totals, hasConflict, fulfilment, status, retry } = useCartSummary();

  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (rows.length === 0)
    return (
      <div>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop">Browse bracelets</Link>
      </div>
    );
  if (status === "loading") return <p role="status">Loading…</p>;
  if (status === "error")
    return (
      <div role="alert">
        <p>We couldn't check your items.</p>
        <button onClick={retry}>Try again</button>
      </div>
    );
  if (hasConflict || !totals.canCheckout)
    return (
      <div>
        <h1>Checkout</h1>
        <p role="alert" className="error">
          {hasConflict ? "Some items in your cart need attention." : totals.message}
        </p>
        <Link to="/cart">Back to cart</Link>
      </div>
    );

  const errors = validateCheckout(values, fulfilment);
  const errorCount = Object.keys(errors).length;
  const showError = (field) => (touched[field] || submitted) && errors[field];

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }
  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (errorCount > 0) return;

    const order = {
      orderNo: `GS-${Date.now().toString(36).toUpperCase()}`,
      fulfilment,
      area: fulfilment === "delivery" ? values.area : "",
      items: rows.map(({ line, item }) => ({
        name: item.name,
        size: line.size,
        initials: line.initials,
        color: line.color,
        qty: line.qty,
        unitPrice: item.price,
      })),
      subtotal,
      fee: totals.fee,
      total: totals.total,
    };
    writeSessionJSON("gs-last-order", order);
    clearCart();
    navigate("/confirmation", { replace: true });
  }

  const field = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": Boolean(showError(name)),
    "aria-describedby": showError(name) ? `${name}-error` : undefined,
  });

  return (
    <div>
      <h1>Checkout</h1>
      <p className="sim-banner" role="note">
        Simulated order: no payment is taken and nothing is shipped. Please use a fictional name and number.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {submitted && errorCount > 0 && (
          <p role="alert" className="error">
            Please fix the {errorCount} highlighted field{errorCount > 1 ? "s" : ""} below.
          </p>
        )}

        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" autoComplete="off" {...field("name")} />
          {showError("name") && <p id="name-error" className="error">{errors.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="phone">Mobile number</label>
          <input type="tel" inputMode="tel" autoComplete="off" placeholder="0300-1234567" {...field("phone")} />
          {showError("phone") && <p id="phone-error" className="error">{errors.phone}</p>}
        </div>

        {fulfilment === "delivery" && (
          <>
            <div className="field">
              <label htmlFor="area">Delivery area</label>
              <select {...field("area")}>
                <option value="">Choose an area…</option>
                {DELIVERY_AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              {showError("area") && <p id="area-error" className="error">{errors.area}</p>}
            </div>

            <div className="field">
              <label htmlFor="address">Address</label>
              <textarea rows="3" {...field("address")} />
              {showError("address") && <p id="address-error" className="error">{errors.address}</p>}
            </div>
          </>
        )}

        <div className="field">
          <label htmlFor="note">Order note (optional)</label>
          <textarea rows="2" {...field("note")} />
          <p className="hint">{values.note.length}/120</p>
          {showError("note") && <p id="note-error" className="error">{errors.note}</p>}
        </div>

        <p>Payment: cash on {fulfilment === "pickup" ? "pickup" : "delivery"} (simulated).</p>
        <p>
          {fulfilment === "pickup" ? "Pickup" : "Delivery"} ·{" "}
          <Link to="/cart">Change in cart</Link>
        </p>

        <OrderSummary subtotal={subtotal} fulfilment={fulfilment} totals={totals} />

        <button type="submit" className="btn-primary">Place simulated order</button>
      </form>
    </div>
  );
}
