import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { validateQuantity } from "../rules/quantityRule";
import { validateInitials } from "../rules/initialsRule";
import SizePicker from "./SizePicker";
import QuantityControl from "./QuantityControl";
import NotifyMe from "./NotifyMe";

export default function AddToCart({ item }) {
  const { addLine, qtyOf } = useCart();
  const inCart = qtyOf(item.id);

  const [size, setSize] = useState(item.sizes.length === 1 ? item.sizes[0].label : "");
  const [qty, setQty] = useState(1);
  const [initials, setInitials] = useState("");
  const [tried, setTried] = useState(false);
  const [added, setAdded] = useState(false);

  if (item.stock === 0) return <NotifyMe itemId={item.id} />;

  const quantityCheck = validateQuantity(inCart + qty, item.stock);
  const canIncrease = validateQuantity(inCart + qty + 1, item.stock).valid;
  const initialsCheck = item.personalizable
    ? validateInitials(initials)
    : { valid: true, value: "", message: "" };

  function changeQty(n) {
    setQty(n);
    setAdded(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTried(true);
    if (!size || !quantityCheck.valid || !initialsCheck.valid) return;
    addLine({ id: item.id, size, initials: initialsCheck.value, qty });
    setAdded(true);
    setTried(false);
    setQty(1);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <SizePicker
        sizes={item.sizes}
        value={size}
        onChange={(s) => { setSize(s); setAdded(false); }}
        error={tried && !size ? "Choose a size to continue." : ""}
      />

      {item.personalizable && (
        <div>
          <label htmlFor="initials">Initials (1–3 letters, A–Z)</label>
          <input
            id="initials"
            value={initials}
            onChange={(e) => { setInitials(e.target.value); setAdded(false); }}
            maxLength={10}
            aria-invalid={tried && !initialsCheck.valid}
          />
          {tried && !initialsCheck.valid && (
            <p role="alert" className="error">{initialsCheck.message}</p>
          )}
        </div>
      )}

      <QuantityControl
        value={qty}
        onChange={changeQty}
        stock={item.stock}
        inCart={inCart}
        canIncrease={canIncrease}
        error={quantityCheck.valid ? "" : quantityCheck.message}
      />

      <button type="submit" className="btn-primary" disabled={!quantityCheck.valid}>
        Add to cart
      </button>

      {added && (
        <p role="status" className="success">
          ✓ Added to your cart. <Link to="/cart">View cart</Link>
        </p>
      )}
    </form>
  );
}
