export const CATEGORIES = ["Beaded", "Sets", "Custom Name", "Necklace"];

export function filterAndSort(
  items,
  { q = "", category = "all", inStockOnly = false, sort = "featured", min = null, max = null }
) {
  const needle = q.trim().toLowerCase();

  const result = items.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (inStockOnly && item.stock === 0) return false;
    if (min !== null && item.price < min) return false;
    if (max !== null && item.price > max) return false;
    if (needle) {
      const text = `${item.name} ${item.material} ${item.category} ${item.description}`.toLowerCase();
      if (!text.includes(needle)) return false;
    }
    return true;
  });

  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}
