import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface ThemeStore {
  darkTheme: boolean;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      darkTheme: false,
      toggleTheme: () =>
        set((state: ThemeStore) => ({ darkTheme: !state.darkTheme })),
    }),
    {
      name: "dark-theme",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export { useThemeStore };
