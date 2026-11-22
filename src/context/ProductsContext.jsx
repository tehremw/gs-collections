import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadBracelets } from "../services/mockLoader";
import { readJSON, writeJSON } from "../utils/storage";

const ProductsContext = createContext(null);
const STOCK_KEY = "gs-demo-stock-v1";

function readOverrides() {
  const saved = readJSON(STOCK_KEY, {});
  return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
}

export function ProductsProvider({ children }) {
  const [loaded, setLoaded] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [attempt, setAttempt] = useState(0);
  const [overrides, setOverrides] = useState(readOverrides);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    loadBracelets()
      .then((data) => {
        if (!cancelled) {
          setLoaded(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  useEffect(() => {
    writeJSON(STOCK_KEY, overrides);
  }, [overrides]);

  const items = useMemo(
    () =>
      loaded.map((item) => {
        const v = overrides[item.id];
        return Number.isInteger(v) && v >= 0 ? { ...item, stock: v } : item;
      }),
    [loaded, overrides]
  );

  const retry = () => setAttempt((a) => a + 1);
  const setStock = (id, stock) => setOverrides((prev) => ({ ...prev, [id]: stock }));
  const resetStock = () => setOverrides({});

  return (
    <ProductsContext.Provider value={{ items, status, retry, overrides, setStock, resetStock }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
}
