export default function ColorPicker({ colors, value, onChange }) {
  return (
    <fieldset>
      <legend>Colour: {value}</legend>
      <div className="swatches">
        {colors.map((c) => (
          <label key={c.label} className="swatch-option">
            <input
              type="radio"
              name="color"
              value={c.label}
              checked={value === c.label}
              onChange={() => onChange(c.label)}
            />
            <span className="swatch-dot" style={{ background: c.swatch }} aria-hidden="true" />
            <span>{c.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
