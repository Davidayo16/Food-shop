// src/lib/user-store.ts
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  id?: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user: { name: string; role: string | null } | null) => set({ user }),
  loadUser: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: CustomJwtPayload = jwtDecode(token);
        const user = {
          name: decoded.email ? decoded.email.split("@")[0] : "User", // e.g., "james"
          role: decoded.role ? decoded.role.toLowerCase() : null, // e.g., "admin", "vendor"
        };
        set({ user });
      } catch (error) {
        console.error("loadUser: Invalid token =", error);
        localStorage.removeItem("authToken");
        set({ user: null });
      }
    } else {
      set({ user: null });
    }
  },
  clearUser: () => {
    localStorage.removeItem("authToken");
    set({ user: null });
  },
}));