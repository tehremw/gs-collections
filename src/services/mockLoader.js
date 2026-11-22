import { bracelets } from "../data/bracelets";

// Demo switch: run localStorage.setItem("gs-demo-fail", "true") in the
// browser console to make the next load fail. We'll turn this into a
// labelled button later.
function shouldFail() {
  try {
    return localStorage.getItem("gs-demo-fail") === "true";
  } catch {
    return false;
  }
}

export function loadBracelets() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) reject(new Error("Could not load bracelets"));
      else resolve(bracelets);
    }, 600);
  });
}
