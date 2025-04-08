import { create } from "zustand";

interface UserState {
  user: { role: "customer" | "biker" | "vendor" | null; name: string | null } | null;
  login: (role: "customer" | "biker" | "vendor", name: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null, // Initially not logged in
  login: (role, name) => set({ user: { role, name } }),
  logout: () => set({ user: null }),
}));