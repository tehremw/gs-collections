export const MAX_PER_ORDER = 5;

export function validateQuantity(quantity, stock, maxPerOrder = MAX_PER_ORDER) {
  if (stock === 0) {
    return { valid: false, limit: 0, message: "Sold out" };
  }
  const limit = Math.min(maxPerOrder, stock);
  if (!Number.isInteger(quantity) || quantity < 1) {
    return { valid: false, limit, message: "Choose at least 1." };
  }
  if (quantity > stock) {
    return { valid: false, limit, message: `Only ${stock} left.` };
  }
  if (quantity > maxPerOrder) {
    return { valid: false, limit, message: `Max ${maxPerOrder} per order.` };
  }
  return { valid: true, limit, message: "" };
}