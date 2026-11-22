import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCartSummary } from "../hooks/useCartSummary";
import { validateCheckout } from "../rules/checkoutValidation";
import { writeSessionJSON } from "../utils/storage";
import { imagesFor } from "../utils/images";
import OrderSummary from "../components/OrderSummary";
import ProductImage from "../components/ProductImage";
import "../styles/checkout.css";

const EMPTY = { name: "", phone: "", area: "", address: "", note: "" };

function Field({ id, label, error, multiline = false, ...rest }) {
  const Control = multiline ? "textarea" : "input";
  return (
    <div className={`ck-field${multiline ? " ck-field-area" : ""}`}>
      <Control id={id} className="ck-input" placeholder=" " {...rest} />
      <label htmlFor={id}>{label}</label>
      {error && (
        <p id={`${id}-error`} className="error">
          {error}
        </p>
      )}
    </div>
  );
}

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

  const isPickup = fulfilment === "pickup";

  return (
    <div className="checkout-page">
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <h1 className="sr-only">Checkout</h1>

        {submitted && errorCount > 0 && (
          <p role="alert" className="error ck-alert">
            Please fix the {errorCount} highlighted field{errorCount > 1 ? "s" : ""} below.
          </p>
        )}

        <section className="checkout-section">
          <h2>Contact</h2>
          <Field
            label="Name"
            type="text"
            autoComplete="off"
            error={showError("name")}
            {...field("name")}
          />
          <Field
            label="Mobile number (e.g. 0300-1234567)"
            type="tel"
            inputMode="tel"
            autoComplete="off"
            error={showError("phone")}
            {...field("phone")}
          />
        </section>

        {!isPickup && (
          <section className="checkout-section">
            <h2>Delivery</h2>
            <Field
              label="Address"
              multiline
              rows={3}
              error={showError("address")}
              {...field("address")}
            />
          </section>
        )}

        {isPickup && (
          <section className="checkout-section">
            <h2>Pickup</h2>
            <p className="ck-sub">You can pick up your order from FAST NUCES Islamabad.</p>
          </section>
        )}

        <section className="checkout-section">
          <h2>
            Order note <span className="ck-optional">(optional)</span>
          </h2>
          <Field
            label="Anything we should know?"
            multiline
            rows={2}
            error={showError("note")}
            {...field("note")}
          />
          <p className="ck-count">{values.note.length}/120</p>
        </section>

        <section className="checkout-section">
          <h2>Payment</h2>
          <p className="ck-sub">All transactions are secure and encrypted.</p>
          <div className="ck-pay">
            <div className="ck-pay-option">
              <span className="ck-radio" aria-hidden="true" />
              <span>{isPickup ? "Cash on Pickup" : "Cash on Delivery (COD)"}</span>
            </div>
            <p className="ck-pay-body">
              {isPickup
                ? "Pay in cash when you collect your order."
                : "Pay in cash when your order arrives."}
            </p>
          </div>
        </section>

        <button type="submit" className="btn-primary checkout-submit">
          Complete order
        </button>
      </form>

      <aside className="checkout-summary" aria-label="Order summary">
        <div className="checkout-summary-inner">
          <ul className="checkout-items">
            {rows.map(({ line, item }) => (
              <li key={line.key}>
                {item ? (
                  <div className="checkout-thumb">
                    <ProductImage image={imagesFor(item, line.color)[0]} name={item.name} />
                    <span className="checkout-qty" aria-label={`Quantity  ${line.qty}`}>
                      {line.qty}
                    </span>
                  </div>
                ) : (
                  <div className="checkout-thumb">
                    <div className="photo photo-missing">No photo</div>
                  </div>
                )}
                <div className="checkout-item-info">
                  <strong>{item ? item.name : "Unavailable item"}</strong>
                  {item && (
                    <span>
                      {[
                        line.color,
                        line.initials ? `Name ${line.initials}` : "",
                        `Size ${line.size}`,
                      ].filter(Boolean).join(" / ")}
                    </span>
                  )}
                </div>
                {item && (
                  <span className="checkout-price">
                    Rs {(item.price * line.qty).toLocaleString()}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <OrderSummary subtotal={subtotal} fulfilment={fulfilment} totals={totals} />
        </div>
      </aside>
    </div>
  );
}
