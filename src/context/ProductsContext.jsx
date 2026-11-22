import { createContext, useContext, useEffect, useState } from "react";
import { loadBracelets } from "../services/mockLoader";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    loadBracelets()
      .then((data) => {
        if (!cancelled) {
          setItems(data);
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

  const retry = () => setAttempt((a) => a + 1);

  return (
    <ProductsContext.Provider value={{ items, status, retry }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
}
