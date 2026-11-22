export function availabilityOf(item) {
  if (item.stock === 0) return { label: "Sold out", tone: "badge-out" };
  if (item.stock <= 3) return { label: `Only ${item.stock} left`, tone: "badge-low" };
  return { label: "In stock", tone: "badge-in" };
}

export function ringClass(item) {
  const slug = item.category.toLowerCase().replace(/\s+/g, "-");
  return `ring ring-${slug}${item.stock === 0 ? " is-soldout" : ""}`;
}
