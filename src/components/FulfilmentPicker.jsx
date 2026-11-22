import { useCart } from "../context/CartContext";
import { DELIVERY_FEE, FREE_DELIVERY_FROM, MIN_DELIVERY_ORDER } from "../rules/deliveryRule";

export default function FulfilmentPicker() {
  const { fulfilment, setFulfilment } = useCart();
  return (
    <fieldset>
      <legend>How would you like to receive your order?</legend>
      <label className="size-option">
        <input type="radio" name="fulfilment" value="pickup"
          checked={fulfilment === "pickup"} onChange={() => setFulfilment("pickup")} />
        <span><strong>Pickup</strong> from our collection point (demo) · Rs 0</span>
      </label>
      <label className="size-option">
        <input type="radio" name="fulfilment" value="delivery"
          checked={fulfilment === "delivery"} onChange={() => setFulfilment("delivery")} />
        <span>
          <strong>Delivery</strong> in Islamabad &amp; Rawalpindi · Rs {DELIVERY_FEE}, free from Rs{" "}
          {FREE_DELIVERY_FROM.toLocaleString()} · minimum order Rs {MIN_DELIVERY_ORDER.toLocaleString()}
        </span>
      </label>
    </fieldset>
  );
}
