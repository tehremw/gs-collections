export function validateCheckout(values, fulfilment) {
  const errors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Enter a name (a nickname or fictional name is fine for this demo).";
  else if (!/^[A-Za-z][A-Za-z .'-]{1,39}$/.test(name))
    errors.name = "Use 2 to 40 letters. Digits and symbols aren't allowed.";

  const phone = values.phone.trim();
  if (!phone) errors.phone = "Enter a mobile number.";
  else if (!/^03\d{2}-?\d{7}$/.test(phone))
    errors.phone = "Use a Pakistani mobile format like 0300-1234567.";

  if (fulfilment === "delivery") {
    const address = values.address.trim();
    if (!address) errors.address = "Enter a delivery address.";
    else if (address.length < 10)
      errors.address = "Add more detail (at least 10 characters), such as house and street number.";
  }

  if (values.note.length > 120)
    errors.note = `Keep the note under 120 characters (now ${values.note.length}).`;

  return errors;
}
