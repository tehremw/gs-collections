export const MAX_PER_ORDER = 5;

export function validateQuantity(total, stock) {
  if (!Number.isInteger(total) || total < 1) {
    return { valid: false, message: "Enter a quantity of at least 1." };
  }
  if (total > MAX_PER_ORDER) {
    return { valid: false, message: `Maximum ${MAX_PER_ORDER} per order.` };
  }
  if (total > stock) {
    return { valid: false, message: `Only ${stock} in stock.` };
  }
  return { valid: true, message: "" };
}
