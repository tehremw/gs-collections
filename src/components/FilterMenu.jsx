import { useEffect, useId, useRef, useState } from "react";

export default function FilterMenu({ label, active = false, children }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const buttonRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="menu" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        {active && <span className="dot" aria-hidden="true" />}
        {active && <span className="sr-only">(filter on)</span>}
        <span className="chev" aria-hidden="true">▾</span>
      </button>
      {open && (
        <div id={panelId} className="menu-panel" role="group" aria-label={label}>
          {children}
        </div>
      )}
    </div>
  );
}
