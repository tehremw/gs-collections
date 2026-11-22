export const MIN_DELIVERY_ORDER = 1500;
export const DELIVERY_FEE = 250;
export const FREE_DELIVERY_FROM = 3000;

const rs = (n) => `Rs ${n.toLocaleString()}`;

export function calculateTotals(subtotal, fulfilment) {
  if (fulfilment === "pickup") {
    return { fee: 0, total: subtotal, canCheckout: true, message: "", hint: "" };
  }
  const fee = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  const total = subtotal + fee;

  if (subtotal < MIN_DELIVERY_ORDER) {
    return {
      fee,
      total,
      canCheckout: false,
      message: `Delivery needs a minimum order of ${rs(MIN_DELIVERY_ORDER)}. Add ${rs(MIN_DELIVERY_ORDER - subtotal)} more or choose pickup.`,
      hint: "",
    };
  }
  const hint = fee > 0 ? `Add ${rs(FREE_DELIVERY_FROM - subtotal)} more for free delivery.` : "";
  return { fee, total, canCheckout: true, message: "", hint };
}
