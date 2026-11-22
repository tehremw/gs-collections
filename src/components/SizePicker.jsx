export default function SizePicker({ sizes, value, onChange, error }) {
  return (
    <fieldset aria-describedby={error ? "size-error" : undefined}>
      <legend>Size</legend>
      {sizes.map((s) => (
        <label key={s.label} className="size-option">
          <input
            type="radio"
            name="size"
            value={s.label}
            checked={value === s.label}
            onChange={() => onChange(s.label)}
          />
          <span className="size-label">{s.label}</span>
          <span className="size-fits">{s.fits}</span>
        </label>
      ))}
      <p className="hint">
        Not sure? Wrap a strip of paper snugly around your wrist, measure it in cm, and pick the
        size that covers it.
      </p>
      {error && <p id="size-error" role="alert" className="error">{error}</p>}
    </fieldset>
  );
}
