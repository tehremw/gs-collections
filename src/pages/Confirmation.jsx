import { Link } from "react-router-dom";
import { readSessionJSON } from "../utils/storage";

export default function Confirmation() {
  const order = readSessionJSON("gs-last-order", null);

  if (!order)
    return (
      <div>
        <h1>No recent order</h1>
        <p>There's no order to show. Start by choosing a bracelet.</p>
        <Link to="/shop">Browse bracelets</Link>
      </div>
    );

  const feeText = order.fee === 0 ? "Free" : `Rs ${order.fee.toLocaleString()}`;

  return (
    <div>
      <p className="sim-banner" role="note">
        Simulated order: no payment was taken and nothing will be shipped.
      </p>
      <h1>Order confirmed</h1>
      <p>Order number: <strong>{order.orderNo}</strong></p>
      <p>
        {order.fulfilment === "pickup"
          ? "Pickup from our collection point (demo)."
          : `Delivery to ${order.area}.`}
      </p>
      <ul>
        {order.items.map((it) => (
          <li key={`${it.name}-${it.size}-${it.initials}-${it.color}`}>
            {it.qty} × {it.name} (size {it.size}
            {it.color && `, ${it.color}`}
            {it.initials && `, name ${it.initials}`}) · Rs {(it.qty * it.unitPrice).toLocaleString()}
          </li>
        ))}
      </ul>
      <p>Subtotal: Rs {order.subtotal.toLocaleString()}</p>
      <p>{order.fulfilment === "pickup" ? "Pickup" : "Delivery"}: {feeText}</p>
      <p><strong>Total: Rs {order.total.toLocaleString()}</strong></p>
      <Link to="/shop" className="btn-primary">Continue shopping</Link>
    </div>
  );
}
