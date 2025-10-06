import { createStore } from "zustand";

interface SidebarState {
  SidebarWidth: number;
  hideMenu: boolean;
  isCollapse: boolean;
  isMobileSidebar: boolean;
  isSidebarHover: boolean;
  miniSidebar: number;
  topbarheight: number;
}
export interface SidebarActions {
  toggleCollapseBar: () => void;
  toggleMobileBar: () => void;
  toggleMobileBarHover: (value: boolean) => void;
}
export interface SidebarStore extends SidebarState, SidebarActions {}

export const deafultInitStates: SidebarState = {
  SidebarWidth: 300,
  hideMenu: false,
  isCollapse: false,
  isMobileSidebar: false,
  isSidebarHover: false,
  miniSidebar: 87,
  topbarheight: 70,
};

export const createSidebarStore = (
  initState: SidebarState = deafultInitStates,
) => {
  return createStore<SidebarStore>()((set) => ({
    ...initState,
    toggleCollapseBar: () =>
      set((state) => ({ isCollapse: !state.isCollapse })),
    toggleMobileBar: () =>
      set((state) => ({ isMobileSidebar: !state.isMobileSidebar })),
    toggleMobileBarHover: (value: boolean) =>
      set((state) => ({ isSidebarHover: value })),
  }));
};
