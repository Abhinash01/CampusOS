import { create } from 'zustand'
import type { UserRole } from '@/types'

interface AppState {
  currentRole: UserRole
  setRole: (role: UserRole) => void
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  isMobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
  isSearchModalOpen: boolean
  setSearchModalOpen: (open: boolean) => void
  isOfflineSimulated: boolean
  setOfflineSimulated: (offline: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentRole: 'student',
  setRole: (role) => set({ currentRole: role }),
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  isMobileNavOpen: false,
  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
  isSearchModalOpen: false,
  setSearchModalOpen: (open) => set({ isSearchModalOpen: open }),
  isOfflineSimulated: false,
  setOfflineSimulated: (offline) => set({ isOfflineSimulated: offline }),
}))
