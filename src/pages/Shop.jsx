import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { CATEGORIES, filterAndSort } from "../utils/catalog";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const { items, status, retry } = useProducts();
  const [params, setParams] = useSearchParams();

  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "all";
  const inStockOnly = params.get("instock") === "1";
  const sort = params.get("sort") ?? "featured";
  const [search, setSearch] = useState(q);

  function update(key, value, defaultValue) {
    const next = new URLSearchParams(params);
    if (value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  function clearAll() {
    setSearch("");
    setParams({}, { replace: true });
  }

  if (status === "loading") return <p role="status">Loading bracelets…</p>;
  if (status === "error")
    return (
      <div role="alert">
        <p>We couldn't load the bracelets.</p>
        <button onClick={retry}>Try again</button>
      </div>
    );

  const visible = filterAndSort(items, { q, category, inStockOnly, sort });

  return (
    <div>
      <h1>Shop bracelets</h1>

      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q">Search</label>
        <input
          id="q"
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            update("q", e.target.value, "");
          }}
        />

        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => update("category", e.target.value, "all")}>
          <option value="all">All</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={sort} onChange={(e) => update("sort", e.target.value, "featured")}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name A–Z</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => update("instock", e.target.checked ? "1" : "", "")}
          />{" "}
          In stock only
        </label>
      </form>

      {items.length === 0 ? (
        <p>No bracelets are in the catalogue right now. Please check back soon.</p>
      ) : visible.length === 0 ? (
        <div role="status">
          <p>No bracelets match your search{q && <> for “{q}”</>}.</p>
          <button onClick={clearAll}>Clear search and filters</button>
        </div>
      ) : (
        <>
          <p role="status">Showing {visible.length} of {items.length} bracelets</p>
          <ul className="grid">
            {visible.map((item) => (
              <li key={item.id}>
                <ProductCard item={item} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
