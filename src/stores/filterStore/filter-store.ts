import { create } from "zustand";

interface FilterState {
  clearCurrentFilters: () => void;
  currentFilters: string;
  setCurrentFilters: (filters: string) => void;
  setCurrentFiltersFromObject: (
    params: Record<string, null | string | undefined>,
  ) => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  clearCurrentFilters: () => set({ currentFilters: "" }),
  currentFilters: "",
  setCurrentFilters: (filters) => set({ currentFilters: filters }),
  setCurrentFiltersFromObject: (params) => {
    // Converte o objeto em URLSearchParams
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value && typeof value === "string") {
        urlParams.set(key, value);
      }
    });
    set({ currentFilters: urlParams.toString() });
  },
}));
