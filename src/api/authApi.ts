const API_BASE = import.meta.env.VITE_API_BASE;

export const authApi = {
  async signup(name: string, email: string, password: string) {
    console.log("API_BASE =", API_BASE); // 👈 Add this for debugging
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signup failed");
    return data;
  },

  async signin(email: string, password: string) {
    const res = await fetch(`${API_BASE}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signin failed");
    return data;
  },
};
