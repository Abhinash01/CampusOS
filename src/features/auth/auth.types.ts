export type UserRole = 'STUDENT' | 'ADMIN' | 'WARDEN' | 'STAFF'

export interface User {
  _id: string
  name: string
  email: string
  role: UserRole
  studentId?: string
  phone?: string
  avatar?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    accessToken: string
  }
}

export interface ApiSuccessResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterStudentData {
  name: string
  studentId: string
  email: string
  phone: string
  password: string
  confirmPassword?: string
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  token: string
  password: string
  confirmPassword?: string
}
