import test from "node:test";
import assert from "node:assert/strict";
import { validateQuantity } from "../src/rules/quantityRule.js";

test("ordinary quantity is valid", () => {
  assert.equal(validateQuantity(2, 10).valid, true);
});
test("exactly at the limit is valid", () => {
  assert.equal(validateQuantity(5, 10).valid, true);
});
test("above the limit is blocked", () => {
  const r = validateQuantity(6, 10);
  assert.equal(r.valid, false);
  assert.equal(r.message, "Max 5 per order.");
});
test("stock lower than the max caps at stock", () => {
  assert.equal(validateQuantity(4, 3).message, "Only 3 left.");
});