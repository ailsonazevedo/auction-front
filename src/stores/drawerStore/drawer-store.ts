import { create } from "zustand";

interface DrawerStore {
  drawer: boolean;
  toggleDrawer: (value: boolean) => void;
}

const useDrawerStore = create<DrawerStore>((set) => ({
  drawer: false,
  toggleDrawer: (value: boolean) => set({ drawer: value }),
}));

export { useDrawerStore };
