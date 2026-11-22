import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { validateQuantity } from "../rules/quantityRule";
import { calculateTotals } from "../rules/deliveryRule";

export function useCartSummary() {
  const { lines, qtyOf, fulfilment } = useCart();
  const { items, status, retry } = useProducts();

  const rows = lines.map((line) => {
    const item = items.find((i) => i.id === line.id);
    let problem = "";
    if (!item) {
      problem = "This bracelet is no longer available.";
    } else if (item.stock === 0) {
      problem = "This bracelet is now sold out. Remove it to continue.";
    } else {
      const check = validateQuantity(qtyOf(item.id), item.stock);
      if (!check.valid) problem = `${check.message} Please reduce the quantity.`;
    }
    return { line, item, problem };
  });

  const subtotal = rows.reduce((sum, { line, item }) => (item ? sum + item.price * line.qty : sum), 0);
  const totals = calculateTotals(subtotal, fulfilment);
  const hasConflict = rows.some((r) => r.problem);

  return { rows, subtotal, totals, hasConflict, fulfilment, status, retry };
}
