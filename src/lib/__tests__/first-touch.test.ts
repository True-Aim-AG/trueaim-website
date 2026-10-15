// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CONSENT_STORAGE_KEY } from "../consent";
import {
  FIRST_TOUCH_STORAGE_KEY,
  captureFirstTouch,
  clearFirstTouch,
  getFirstTouch,
  persistFirstTouch,
  resetFirstTouchForTests,
} from "../tracking/first-touch";

function setReferrer(value: string) {
  Object.defineProperty(document, "referrer", { value, configurable: true });
}

beforeEach(() => {
  resetFirstTouchForTests();
  localStorage.clear();
  window.history.replaceState(null, "", "/en/technology/?utm_source=linkedin&utm_medium=social&email=a%40b.c");
  setReferrer("https://www.google.com/search?q=private+words");
});

afterEach(() => {
  setReferrer("");
});

describe("first-touch attribution", () => {
  it("captures landing page, external referrer and UTMs without query strings", () => {
    captureFirstTouch();
    expect(getFirstTouch()).toEqual({
      landing_page: "http://localhost:3000/en/technology/",
      referrer: "https://www.google.com/search",
      utm_source: "linkedin",
      utm_medium: "social",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    });
  });

  it("stores nothing before analytics consent", () => {
    captureFirstTouch();
    expect(localStorage.getItem(FIRST_TOUCH_STORAGE_KEY)).toBeNull();
  });

  it("stores the first touch once consent is given and never overwrites it", () => {
    captureFirstTouch();
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ essential: true, analytics: true }));
    persistFirstTouch();
    expect(JSON.parse(localStorage.getItem(FIRST_TOUCH_STORAGE_KEY)!).utm_source).toBe("linkedin");

    resetFirstTouchForTests();
    window.history.replaceState(null, "", "/en/contact/?utm_source=newsletter");
    captureFirstTouch();
    expect(getFirstTouch().utm_source).toBe("linkedin");
    expect(getFirstTouch().landing_page).toBe("http://localhost:3000/en/technology/");
  });

  it("ignores an internal referrer and an expired stored touch", () => {
    localStorage.setItem(
      FIRST_TOUCH_STORAGE_KEY,
      JSON.stringify({ landing_page: "old", referrer: "", utm_source: "old", captured_at: Date.now() - 91 * 86_400_000 }),
    );
    setReferrer("http://localhost:3000/en/");
    captureFirstTouch();
    expect(getFirstTouch().referrer).toBe("");
    expect(getFirstTouch().utm_source).toBe("linkedin");
  });

  it("treats the www host as the same site", () => {
    setReferrer("http://www.localhost:3000/en/technology/");
    captureFirstTouch();
    expect(getFirstTouch().referrer).toBe("");
  });

  it("clears the stored touch on withdrawal", () => {
    localStorage.setItem(FIRST_TOUCH_STORAGE_KEY, "{}");
    clearFirstTouch();
    expect(localStorage.getItem(FIRST_TOUCH_STORAGE_KEY)).toBeNull();
  });
});
