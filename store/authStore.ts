import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TUserProfile } from "@/project-types";

interface AuthState {
  userProfile: TUserProfile | null;
  updateUserProfile(arg: TUserProfile | null): void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userProfile: null,
      updateUserProfile: (profile: TUserProfile | null) => set({ userProfile: profile })
    }),
    {
      name: "user-profile-doyle-clothing-next"
    }
  )
);
