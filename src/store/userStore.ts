// create a zustand store for user

import { me } from "@/api/auth";
import { User } from "@/lib/types";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  fetchAdmin: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const user = await me();
    if (user.role === "admin") {
      window.location.href = "/admin";
    }
    set({ user });
  },
  fetchAdmin: async () => {
    const user = await me();
    if (user.role !== "admin") {
      throw new Error("You are not an admin");
    }
    set({ user });
  },
}));
