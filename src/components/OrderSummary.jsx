export default function OrderSummary({ subtotal, fulfilment, totals }) {
  const feeText = totals.fee === 0 ? "Free" : `Rs ${totals.fee.toLocaleString()}`;
  return (
    <section className="summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Order summary</h2>
      <dl>
        <div><dt>Subtotal</dt><dd>Rs {subtotal.toLocaleString()}</dd></div>
        <div>
          <dt>{fulfilment === "pickup" ? "Pickup" : "Delivery fee"}</dt>
          <dd>{feeText}</dd>
        </div>
        <div className="summary-total"><dt>Total</dt><dd>Rs {totals.total.toLocaleString()}</dd></div>
      </dl>
      {totals.hint && <p role="status" className="hint">{totals.hint}</p>}
      {totals.message && <p role="alert" className="error">{totals.message}</p>}
    </section>
  );
}
