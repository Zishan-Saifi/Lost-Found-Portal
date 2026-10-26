import { beforeEach, describe, expect, it } from "vitest";

import {
  loadBookmarks,
  saveBookmarks,
  loadUserItems,
  saveUserItems,
  loadClaims,
  saveClaims,
  loadTheme,
  saveTheme,
  clearAll,
} from "@/lib/campusfind/storage";
import { MOCK_ITEMS, CATEGORIES, LOCATIONS } from "@/lib/campusfind/data";

describe("CampusFind persistence rules", () => {
  beforeEach(() => {
    localStorage.clear();
    clearAll();
  });

  it("keeps saved (bookmarked) item ids across reloads via localStorage", () => {
    saveBookmarks(["cf-001", "cf-004"]);
    expect(loadBookmarks()).toEqual(["cf-001", "cf-004"]);
  });

  it("keeps user-reported items across reloads via localStorage", () => {
    const item = {
      id: "cf-u-1",
      type: "found" as const,
      title: "Persist Test Pen",
      category: "books-stationery" as const,
      location: "Science Block",
      date: "2026-10-26",
      time: "09:00",
      contact: "p@campus.edu",
      description: "A red pen found near Lab S-2.",
      reporter: "p",
      emoji: "🖊️",
      userAdded: true,
    };
    saveUserItems([item]);
    const loaded = loadUserItems<typeof item>();
    expect(loaded).toEqual([item]);
    expect(loaded[0]?.title).toBe("Persist Test Pen");
  });

  it("keeps claim status per item id across reloads", () => {
    saveClaims({ "cf-002": true });
    expect(loadClaims()).toEqual({ "cf-002": true });
  });

  it("keeps the theme preference across reloads", () => {
    saveTheme("dark");
    expect(loadTheme()).toBe("dark");
    saveTheme("light");
    expect(loadTheme()).toBe("light");
  });
});

describe("CampusFind mock data rules", () => {
  it("ships at least 8 realistic items spanning lost, found and claimed", () => {
    expect(MOCK_ITEMS.length).toBeGreaterThanOrEqual(8);
    expect(MOCK_ITEMS.some((i) => i.type === "lost")).toBe(true);
    expect(MOCK_ITEMS.some((i) => i.type === "found")).toBe(true);
    expect(MOCK_ITEMS.some((i) => i.type === "claimed")).toBe(true);
    expect(new Set(MOCK_ITEMS.map((i) => i.id)).size).toBe(MOCK_ITEMS.length);
  });

  it("only uses known categories and campus locations", () => {
    const catIds = CATEGORIES.map((c) => c.id);
    for (const item of MOCK_ITEMS) expect(catIds).toContain(item.category);
    for (const item of MOCK_ITEMS) expect(LOCATIONS).toContain(item.location);
  });
});
