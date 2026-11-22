import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { validateQuantity } from "../rules/quantityRule";
import { validateCustomName } from "../rules/customNameRule";
import ColorPicker from "./ColorPicker";
import SizePicker from "./SizePicker";
import QuantityControl from "./QuantityControl";
import NotifyMe from "./NotifyMe";

export default function AddToCart({ item, color, onColorChange }) {
  const { addLine, qtyOf } = useCart();
  const inCart = qtyOf(item.id);

  const [size, setSize] = useState(item.sizes.length === 1 ? item.sizes[0].label : "");
  const [qty, setQty] = useState(1);
  const [custom, setCustom] = useState("");
  const [tried, setTried] = useState(false);
  const [added, setAdded] = useState(false);

  if (item.stock === 0) return <NotifyMe itemId={item.id} />;

  const rule = item.personalize;
  const quantityCheck = validateQuantity(inCart + qty, item.stock);
  const canIncrease = validateQuantity(inCart + qty + 1, item.stock).valid;
  const customCheck = rule
    ? validateCustomName(custom, rule.max)
    : { valid: true, value: "", message: "" };

  function changeQty(n) {
    setQty(n);
    setAdded(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTried(true);
    if (!size || !quantityCheck.valid || !customCheck.valid) return;
    addLine({ id: item.id, size, color: item.colors ? color : "", initials: customCheck.value, qty });
    setAdded(true);
    setTried(false);
    setQty(1);
    setCustom("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {item.colors && (
        <ColorPicker
          colors={item.colors}
          value={color}
          onChange={(c) => { onColorChange(c); setAdded(false); }}
        />
      )}

      <SizePicker
        sizes={item.sizes}
        value={size}
        onChange={(s) => { setSize(s); setAdded(false); }}
        error={tried && !size ? "Choose a size to continue." : ""}
      />

      {rule && (
        <div className="field">
          <label htmlFor="custom">{rule.label} (1–{rule.max} letters, A–Z)</label>
          <input
            id="custom"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setAdded(false); }}
            maxLength={20}
            aria-invalid={tried && !customCheck.valid}
            aria-describedby={tried && !customCheck.valid ? "custom-error" : undefined}
          />
          {tried && !customCheck.valid && (
            <p id="custom-error" role="alert" className="error">{customCheck.message}</p>
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
          Added to your cart. <Link to="/cart">View cart</Link>
        </p>
      )}
    </form>
  );
}
