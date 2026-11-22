export function validateInitials(text) {
  const value = text.trim().toUpperCase();
  if (value.length === 0) return { valid: false, value, message: "Enter 1 to 3 letters." };
  if (!/^[A-Z]+$/.test(value)) return { valid: false, value, message: "Use letters A–Z only." };
  if (value.length > 3) return { valid: false, value, message: "Maximum 3 letters." };
  return { valid: true, value, message: "" };
}
