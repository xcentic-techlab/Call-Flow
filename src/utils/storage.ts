export const storage = {
  set(key: string, value: any) {
    if (typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },

  get<T>(key: string): T | string | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  clearAuth() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  },
};
