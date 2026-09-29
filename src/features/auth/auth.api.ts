import type {
  AuthResponse,
  GetMeResponse,
  RefreshResponse,
  ApiSuccessResponse,
  LoginCredentials,
  RegisterStudentData,
  ForgotPasswordData,
  ResetPasswordData,
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

    let response: Response
    try {
      response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include', // Includes HTTP-only refresh cookie
      })
    } catch {
      throw new Error('Unable to connect to CampusOS. Please check your connection and try again.')
    }

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      let errorMsg: string

      if (data?.details && Array.isArray(data.details) && data.details.length > 0) {
        errorMsg = data.details.map((d: any) => d.message).join('. ')
      } else if (typeof data?.message === 'string' && data.message.trim().length > 0) {
        errorMsg = data.message
      } else if (typeof data?.error === 'string' && data.error.trim().length > 0) {
        errorMsg = data.error
      } else {
        switch (response.status) {
          case 400:
            errorMsg = 'The request could not be processed. Please check your information.'
            break
          case 401:
            errorMsg = 'Incorrect email or password.'
            break
          case 403:
            errorMsg = 'You do not have permission to access this area.'
            break
          case 409:
            errorMsg = 'An account with this email already exists.'
            break
          case 500:
            errorMsg = 'Something went wrong on the server. Please try again.'
            break
          default:
            errorMsg = `Request failed with status ${response.status}`
        }
      }
      throw new Error(errorMsg)
    }

    return data as T
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      }),
    })

    const token = res.data?.accessToken || res.accessToken
    if (token) {
      this.setAccessToken(token)
    }

    // Normalize response contract so data.user is always guaranteed
    if (!res.data && res.user && token) {
      res.data = {
        user: res.user,
        accessToken: token,
      }
    }

    return res
  }

  async register(data: RegisterStudentData): Promise<AuthResponse> {
    const payload = {
      name: data.name.trim(),
      studentId: data.studentId.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || undefined,
      password: data.password,
      confirmPassword: data.confirmPassword || data.password,
    }

    const res = await this.request<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    const token = res.data?.accessToken || res.accessToken
    if (token) {
      this.setAccessToken(token)
    }

    // Normalize response contract so data.user is always guaranteed
    if (!res.data && res.user && token) {
      res.data = {
        user: res.user,
        accessToken: token,
      }
    }

    return res
  }

  async getMe(): Promise<GetMeResponse> {
    const res = await this.request<GetMeResponse>('/me', {
      method: 'GET',
    })

    // Normalize response if data is not wrapped
    if (!res.data && res.user) {
      res.data = res.user
    }

    return res
  }

  async refreshToken(): Promise<RefreshResponse> {
    const res = await this.request<RefreshResponse>('/refresh', {
      method: 'POST',
    })

    const token = res.data?.accessToken || res.accessToken
    if (token) {
      this.setAccessToken(token)
    }

    // Normalize response
    if (!res.data && res.user && token) {
      res.data = {
        accessToken: token,
        user: res.user,
      }
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
      body: JSON.stringify({
        token: data.token,
        password: data.password,
        confirmPassword: data.confirmPassword || data.password,
      }),
    })
  }
}

export const authApi = new AuthApiClient()
