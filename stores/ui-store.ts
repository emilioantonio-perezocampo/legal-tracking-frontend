import { create } from 'zustand'

interface UIStore {
  isMobileSidebarOpen: boolean
  setMobileSidebarOpen: (open: boolean) => void
  isDesktopSidebarOpen: boolean
  toggleDesktopSidebar: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileSidebarOpen: false,
  setMobileSidebarOpen: (open) => set({ isMobileSidebarOpen: open }),
  isDesktopSidebarOpen: true,
  toggleDesktopSidebar: () => set((state) => ({ isDesktopSidebarOpen: !state.isDesktopSidebarOpen })),
}))
