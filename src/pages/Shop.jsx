import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { CATEGORIES, filterAndSort } from "../utils/catalog";
import ProductCard from "../components/ProductCard";
import FilterMenu from "../components/FilterMenu";

function parsePrice(value) {
  if (value === null || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export default function Shop() {
  const { items, status, retry } = useProducts();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "all";
  const inStockOnly = params.get("instock") === "1";
  const sort = params.get("sort") ?? "featured";
  const min = parsePrice(params.get("min"));
  const max = parsePrice(params.get("max"));
  const [search, setSearch] = useState(q);
  const [minText, setMinText] = useState(params.get("min") ?? "");
  const [maxText, setMaxText] = useState(params.get("max") ?? "");

  function update(key, value, defaultValue) {
    const next = new URLSearchParams(params);
    if (value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  function clearAll() {
    setSearch("");
    setMinText("");
    setMaxText("");
    setParams({}, { replace: true });
  }

  if (status === "loading") return <p role="status">Loading bracelets…</p>;
  if (status === "error") return (
    <div role="alert"><p>We couldn't load the bracelets.</p><button onClick={retry}>Try again</button></div>
  );

  const visible = filterAndSort(items, { q, category, inStockOnly, sort, min, max });
  const inStockCount = items.filter((i) => i.stock > 0).length;
  const countFor = (c) => items.filter((i) => i.category === c).length;
  const priceConflict = min !== null && max !== null && min > max;
  const priceActive = min !== null || max !== null;
  const anyActive = q !== "" || category !== "all" || inStockOnly || priceActive;

  return (
    <div>
      <h1>Shop</h1>
      <div className="filter-bar">
        <div className="filter-controls" role="search" aria-label="Search and filter bracelets">
          <div className="search-box">
            <label htmlFor="q" className="sr-only">Search bracelets</label>
            <input id="q" type="search" placeholder="Search bracelets" value={search}
              onChange={(e) => { setSearch(e.target.value); update("q", e.target.value, ""); }} />
          </div>
          <FilterMenu label="Availability" active={inStockOnly}>
            <label className="check">
              <input type="checkbox" checked={inStockOnly}
                onChange={(e) => update("instock", e.target.checked ? "1" : "", "")} />
              <span>In stock only</span><span className="count">({inStockCount})</span>
            </label>
          </FilterMenu>
          <FilterMenu label="Category" active={category !== "all"}>
            <label className="check">
              <input type="radio" name="category" checked={category === "all"}
                onChange={() => update("category", "all", "all")} />
              <span>All</span><span className="count">({items.length})</span>
            </label>
            {CATEGORIES.map((c) => (
              <label key={c} className="check">
                <input type="radio" name="category" checked={category === c}
                  onChange={() => update("category", c, "all")} />
                <span>{c}</span><span className="count">({countFor(c)})</span>
              </label>
            ))}
          </FilterMenu>
          <FilterMenu label="Price" active={priceActive}>
            <div className="price-row">
              <label htmlFor="min" className="sr-only">Minimum price</label>
              <input id="min" type="number" inputMode="numeric" min="0" placeholder="Min" value={minText}
                onChange={(e) => { setMinText(e.target.value); update("min", e.target.value, ""); }} />
              <span aria-hidden="true">–</span>
              <label htmlFor="max" className="sr-only">Maximum price</label>
              <input id="max" type="number" inputMode="numeric" min="0" placeholder="Max" value={maxText}
                onChange={(e) => { setMaxText(e.target.value); update("max", e.target.value, ""); }} />
            </div>
            {priceConflict && <p role="alert" className="error">Minimum is higher than maximum.</p>}
          </FilterMenu>
          {anyActive && <button type="button" className="link-btn" onClick={clearAll}>Clear all</button>}
        </div>
        <div className="sort">
          <label htmlFor="sort">Sort</label>
          <select id="sort" value={sort} onChange={(e) => update("sort", e.target.value, "featured")}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>
      <p className="shop-meta" role="status">{items.length > 0 && `Showing ${visible.length} of ${items.length}`}</p>
      {items.length === 0 ? <p>No bracelets are in the catalogue right now. Please check back soon.</p> :
        visible.length === 0 ? <div><p>No bracelets match your search{q && <> for “{q}”</>}.</p>
          <button type="button" onClick={clearAll}>Clear search and filters</button></div> :
        <ul className="grid">{visible.map((item) => <li key={item.id}><ProductCard item={item} /></li>)}</ul>}
    </div>
  );
}
