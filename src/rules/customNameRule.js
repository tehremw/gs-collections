export function validateCustomName(text, max = 8) {
  const value = text.trim().toUpperCase();
  if (value.length === 0) return { valid: false, value, message: `Enter 1 to ${max} letters.` };
  if (!/^[A-Z]+$/.test(value)) return { valid: false, value, message: "Use letters A–Z only." };
  if (value.length > max) return { valid: false, value, message: `Maximum ${max} letters.` };
  return { valid: true, value, message: "" };
}
