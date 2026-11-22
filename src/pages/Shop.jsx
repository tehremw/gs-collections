import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadBracelets } from "../services/mockLoader";

export default function Shop() {
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

  if (status === "loading") return <p role="status">Loading bracelets…</p>;
  if (status === "error")
    return (
      <div role="alert">
        <p>We couldn't load the bracelets.</p>
        <button onClick={() => setAttempt((a) => a + 1)}>Try again</button>
      </div>
    );

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link to={`/items/${item.id}`}>{item.name}</Link> — Rs {item.price}
        </li>
      ))}
    </ul>
  );
}
