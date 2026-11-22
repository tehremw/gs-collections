import { bracelets } from "../data/bracelets";

const FAIL_KEY = "gs-demo-fail";

export function isDemoFailureOn() {
  try {
    return localStorage.getItem(FAIL_KEY) === "true";
  } catch {
    return false;
  }
}

export function setDemoFailure(on) {
  try {
    if (on) localStorage.setItem(FAIL_KEY, "true");
    else localStorage.removeItem(FAIL_KEY);
  } catch {
    // storage blocked: ignore
  }
}

export function loadBracelets() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isDemoFailureOn()) reject(new Error("Could not load bracelets"));
      else resolve(bracelets);
    }, 600);
  });
}
