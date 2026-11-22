import { createContext, useContext, useEffect, useState } from "react";
import { readJSON, writeJSON } from "../utils/storage";

const CartContext = createContext(null);
const STORAGE_KEY = "gs-cart-v1";

const makeKey = ({ id, size, initials }) => `${id}|${size}|${initials}`;

function readSaved() {
  const saved = readJSON(STORAGE_KEY, []);
  if (!Array.isArray(saved)) return [];
  return saved
    .filter((l) => l && typeof l.id === "string" && Number.isInteger(l.qty) && l.qty > 0)
    .map((l) => {
      const line = { id: l.id, size: l.size ?? "", initials: l.initials ?? "", qty: l.qty };
      return { ...line, key: makeKey(line) };
    });
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(readSaved);

  useEffect(() => {
    writeJSON(STORAGE_KEY, lines);
  }, [lines]);

  function addLine(line) {
    const key = makeKey(line);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + line.qty } : l));
      }
      return [...prev, { ...line, key }];
    });
  }

  function setQty(key, qty) {
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, qty } : l)));
  }

  function removeLine(key) {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }

  function clearCart() {
    setLines([]);
  }

  const qtyOf = (id) => lines.filter((l) => l.id === id).reduce((sum, l) => sum + l.qty, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  return (
    <CartContext.Provider value={{ lines, addLine, setQty, removeLine, clearCart, qtyOf, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
