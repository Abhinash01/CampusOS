import { create } from 'zustand'
import type { User, LoginCredentials, RegisterStudentData } from './auth.types'
import { authApi } from './auth.api'
import { useAppStore } from '@/stores/appStore'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  login: (credentials: LoginCredentials) => Promise<User>
  register: (data: RegisterStudentData) => Promise<User>
  logout: () => Promise<void>
  initialize: () => Promise<void>
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user })
    if (user) {
      // Sync with role in appStore
      useAppStore.getState().setRole(user.role.toLowerCase() as any)
    }
  },

  login: async (credentials) => {
    set({ isLoading: true })
    try {
      const response = await authApi.login(credentials)
      const user = response.data.user
      set({ user, isAuthenticated: true, isLoading: false })
      useAppStore.getState().setRole(user.role.toLowerCase() as any)
      return user
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  register: async (data) => {
    set({ isLoading: true })
    try {
      const response = await authApi.register(data)
      const user = response.data.user
      set({ user, isAuthenticated: true, isLoading: false })
      useAppStore.getState().setRole('student')
      return user
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      await authApi.logout()
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },

  initialize: async () => {
    try {
      // Try refresh token to restore session
      const refreshRes = await authApi.refreshToken()
      if (refreshRes.data?.user) {
        set({
          user: refreshRes.data.user,
          isAuthenticated: true,
          isInitialized: true,
        })
        useAppStore.getState().setRole(refreshRes.data.user.role.toLowerCase() as any)
        return
      }
    } catch {
      // Not authenticated / no active refresh cookie
    }
    set({ user: null, isAuthenticated: false, isInitialized: true })
  },
}))
