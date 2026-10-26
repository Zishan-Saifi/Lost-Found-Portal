// Browser-storage helpers for CampusFind. All reads/writes are guarded so the
// module is safe to import anywhere; call these from effects/handlers only.

const BOOKMARKS_KEY = "campusfind:bookmarks";
const USER_ITEMS_KEY = "campusfind:user-items";
const CLAIMS_KEY = "campusfind:claims";
const THEME_KEY = "campusfind:theme";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full / unavailable — non-fatal
  }
}

export function loadBookmarks(): string[] {
  return read<string[]>(BOOKMARKS_KEY, []);
}

export function saveBookmarks(ids: string[]) {
  write(BOOKMARKS_KEY, ids);
}

export function loadUserItems<T>(): T[] {
  return read<T[]>(USER_ITEMS_KEY, []);
}

export function saveUserItems<T>(items: T[]) {
  write(USER_ITEMS_KEY, items);
}

export function loadClaims(): Record<string, boolean> {
  return read<Record<string, boolean>>(CLAIMS_KEY, {});
}

export function saveClaims(claims: Record<string, boolean>) {
  write(CLAIMS_KEY, claims);
}

export function loadTheme(): "light" | "dark" | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(THEME_KEY);
  return v === "light" || v === "dark" ? v : null;
}

export function saveTheme(theme: "light" | "dark") {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_KEY, theme);
}

export function clearAll() {
  if (typeof window === "undefined") return;
  [BOOKMARKS_KEY, USER_ITEMS_KEY, CLAIMS_KEY].forEach((k) => window.localStorage.removeItem(k));
}
