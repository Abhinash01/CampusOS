import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from './auth.api'
import { useAuthStore } from './auth.store'
import type { LoginCredentials, RegisterStudentData, ForgotPasswordData, ResetPasswordData } from './auth.types'

export const AUTH_KEYS = {
  me: ['auth', 'me'] as const,
}

export function useCurrentUser() {
  const setUser = useAuthStore((state) => state.setUser)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: AUTH_KEYS.me,
    queryFn: async () => {
      const res = await authApi.getMe()
      setUser(res.data)
      return res.data
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  const login = useAuthStore((state) => state.login)

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_KEYS.me, user)
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  const register = useAuthStore((state) => state.register)

  return useMutation({
    mutationFn: (data: RegisterStudentData) => register(data),
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_KEYS.me, user)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const logout = useAuthStore((state) => state.logout)

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) => authApi.forgotPassword(data),
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => authApi.resetPassword(data),
  })
}
