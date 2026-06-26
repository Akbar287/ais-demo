export const browserStorage = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage can be unavailable in private contexts; keep UI flow alive.
    }
  },
};

(window as any).AIS_STORAGE = browserStorage;
