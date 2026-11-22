import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "../utils/storage";

const KEY = "gs-notify-v1";

export default function NotifyMe({ itemId }) {
  const [ids, setIds] = useState(() => {
    const saved = readJSON(KEY, []);
    return Array.isArray(saved) ? saved : [];
  });

  useEffect(() => {
    writeJSON(KEY, ids);
  }, [ids]);

  const on = ids.includes(itemId);

  function toggle() {
    setIds((prev) => (prev.includes(itemId) ? prev.filter((x) => x !== itemId) : [...prev, itemId]));
  }

  return (
    <div>
      <p className="badge badge-out">Sold out</p>
      <button type="button" onClick={toggle} aria-pressed={on}>
        {on ? "✓ You'll be notified (demo). Tap to undo" : "Notify me when back in stock"}
      </button>
      <p className="hint" role="status">
        Simulated: nothing is sent and no email is collected. Your choice is saved in this browser only.
      </p>
    </div>
  );
}
