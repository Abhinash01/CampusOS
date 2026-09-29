export type UserRole = 'STUDENT' | 'ADMIN' | 'WARDEN' | 'STAFF'

export interface User {
  _id: string
  id?: string
  name: string
  email: string
  role: UserRole
  studentId?: string
  phone?: string
  avatar?: string
  isActive: boolean
  createdAt?: string | Date
  updatedAt?: string | Date
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
  // Backwards compatibility
  user?: User
  accessToken?: string
}

export interface GetMeResponse {
  success: boolean
  data: User
  user?: User
}

export interface RefreshResponse {
  success: boolean
  message?: string
  data: {
    accessToken: string
    user: User
  }
  accessToken?: string
  user?: User
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
