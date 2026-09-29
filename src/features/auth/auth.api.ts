import type {
  AuthResponse,
  ApiSuccessResponse,
  LoginCredentials,
  RegisterStudentData,
  ForgotPasswordData,
  ResetPasswordData,
  User,
} from './auth.types'

const API_BASE = '/api/auth'

class AuthApiClient {
  private accessToken: string | null = null

  public setAccessToken(token: string | null) {
    this.accessToken = token
  }

  public getAccessToken(): string | null {
    return this.accessToken
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // Includes HTTP-only refresh cookie
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const errorMsg = data?.message || `Request failed with status ${response.status}`
      throw new Error(errorMsg)
    }

    return data as T
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    if (res.data?.accessToken) {
      this.setAccessToken(res.data.accessToken)
    }
    return res
  }

  async register(data: RegisterStudentData): Promise<AuthResponse> {
    const payload = {
      name: data.name.trim(),
      studentId: data.studentId.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: data.password,
    }

    const res = await this.request<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    if (res.data?.accessToken) {
      this.setAccessToken(res.data.accessToken)
    }
    return res
  }

  async getMe(): Promise<{ success: boolean; data: User }> {
    return this.request<{ success: boolean; data: User }>('/me', {
      method: 'GET',
    })
  }

  async refreshToken(): Promise<{ success: boolean; data: { accessToken: string; user: User } }> {
    const res = await this.request<{ success: boolean; data: { accessToken: string; user: User } }>('/refresh', {
      method: 'POST',
    })
    if (res.data?.accessToken) {
      this.setAccessToken(res.data.accessToken)
    }
    return res
  }

  async logout(): Promise<ApiSuccessResponse> {
    try {
      const res = await this.request<ApiSuccessResponse>('/logout', {
        method: 'POST',
      })
      this.setAccessToken(null)
      return res
    } catch {
      this.setAccessToken(null)
      return { success: true, message: 'Logged out' }
    }
  }

  async forgotPassword(data: ForgotPasswordData): Promise<ApiSuccessResponse<{ resetToken?: string; resetUrl?: string }>> {
    return this.request<ApiSuccessResponse<{ resetToken?: string; resetUrl?: string }>>('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email: data.email.trim().toLowerCase() }),
    })
  }

  async resetPassword(data: ResetPasswordData): Promise<ApiSuccessResponse> {
    return this.request<ApiSuccessResponse>('/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token: data.token, password: data.password }),
    })
  }
}

export const authApi = new AuthApiClient()
