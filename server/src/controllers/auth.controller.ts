import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { authService } from '../services/auth.service.js'
import { comparePassword, hashPassword } from '../utils/password.utils.js'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.utils.js'
import { env } from '../config/env.js'

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Full name must be at least 2 characters').trim(),
    studentId: z.string().min(3, 'Student ID must be at least 3 characters').trim(),
    email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
    phone: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
})

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    newPassword: z.string().min(6, 'New password must be at least 6 characters').optional(),
    email: z.string().email('Please enter a valid email address').optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password || data.newPassword, {
    message: 'New password is required',
    path: ['password'],
  })

const getCookieOptions = () => ({
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
})

export const authController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = registerSchema.parse(req.body)

      // Check if email already registered
      const existingEmail = await authService.findUserByEmail(data.email)
      if (existingEmail) {
        res.status(409).json({
          success: false,
          error: 'An account with this email already exists.',
          message: 'An account with this email already exists.',
        })
        return
      }

      // Check if studentId already registered
      const existingId = await authService.findUserByStudentId(data.studentId)
      if (existingId) {
        res.status(409).json({
          success: false,
          error: 'This Student ID is already registered.',
          message: 'This Student ID is already registered.',
        })
        return
      }

      // Hash password
      const passwordHash = await hashPassword(data.password)

      // Create student
      const user = await authService.createUser({
        name: data.name,
        email: data.email,
        studentId: data.studentId,
        phone: data.phone,
        passwordHash,
        role: 'STUDENT',
      })

      // Generate tokens
      const accessToken = generateAccessToken({
        userId: user._id,
        email: user.email,
        role: user.role,
      })

      const refreshToken = generateRefreshToken({
        userId: user._id,
        email: user.email,
        role: user.role,
      })

      // Attach HTTP-only refresh cookie
      res.cookie('refreshToken', refreshToken, getCookieOptions())

      const serializedUser = {
        _id: user._id.toString(),
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        phone: user.phone,
        avatar: user.avatar,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }

      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: {
          user: serializedUser,
          accessToken,
        },
        // Backwards compatibility for legacy root consumers
        user: serializedUser,
        accessToken,
      })
    } catch (err) {
      next(err)
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = loginSchema.parse(req.body)

      const user = await authService.findUserByEmail(data.email)
      if (!user || !user.isActive) {
        res.status(401).json({
          success: false,
          error: 'Email or password is incorrect.',
          message: 'Email or password is incorrect.',
        })
        return
      }

      const isMatch = await comparePassword(data.password, user.passwordHash)
      if (!isMatch) {
        res.status(401).json({
          success: false,
          error: 'Email or password is incorrect.',
          message: 'Email or password is incorrect.',
        })
        return
      }

      const accessToken = generateAccessToken({
        userId: user._id,
        email: user.email,
        role: user.role,
      })

      const refreshToken = generateRefreshToken({
        userId: user._id,
        email: user.email,
        role: user.role,
      })

      // Attach HTTP-only refresh cookie
      res.cookie('refreshToken', refreshToken, getCookieOptions())

      const serializedUser = {
        _id: user._id.toString(),
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        phone: user.phone,
        avatar: user.avatar,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }

      res.status(200).json({
        success: true,
        message: 'Signed in successfully',
        data: {
          user: serializedUser,
          accessToken,
        },
        // Backwards compatibility for legacy root consumers
        user: serializedUser,
        accessToken,
      })
    } catch (err) {
      next(err)
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies?.refreshToken || req.body?.refreshToken
      if (!token) {
        res.status(401).json({
          success: false,
          error: 'Refresh token is required.',
          message: 'Refresh token is required.',
        })
        return
      }

      const payload = verifyRefreshToken(token)
      if (!payload) {
        res.clearCookie('refreshToken', { path: '/' })
        res.status(401).json({
          success: false,
          error: 'Refresh token is invalid or expired. Please sign in again.',
          message: 'Refresh token is invalid or expired. Please sign in again.',
        })
        return
      }

      const user = await authService.getUserById(payload.userId)
      if (!user || !user.isActive) {
        res.clearCookie('refreshToken', { path: '/' })
        res.status(401).json({
          success: false,
          error: 'User account not found or deactivated.',
          message: 'User account not found or deactivated.',
        })
        return
      }

      const newAccessToken = generateAccessToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      })

      const newRefreshToken = generateRefreshToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      })

      res.cookie('refreshToken', newRefreshToken, getCookieOptions())

      const serializedUser = {
        _id: user._id.toString(),
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        phone: user.phone,
        avatar: user.avatar,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          accessToken: newAccessToken,
          user: serializedUser,
        },
        accessToken: newAccessToken,
        user: serializedUser,
      })
    } catch (err) {
      next(err)
    }
  },

  async getMe(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required.',
        message: 'Authentication required.',
      })
      return
    }

    const user = await authService.getUserById(req.user.id)
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User profile not found.',
        message: 'User profile not found.',
      })
      return
    }

    const serializedUser = {
      _id: user._id.toString(),
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      studentId: user.studentId,
      phone: user.phone,
      avatar: user.avatar,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    res.status(200).json({
      success: true,
      data: serializedUser,
      user: serializedUser,
    })
  },

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = forgotPasswordSchema.parse(req.body)
      const user = await authService.findUserByEmail(data.email)
      let resetToken: string | undefined
      let resetUrl: string | undefined

      if (user) {
        resetToken = await authService.createPasswordResetToken(data.email)
        resetUrl = `http://localhost:5173/reset-password?token=${resetToken}&email=${encodeURIComponent(data.email)}`
        console.log(`[PASSWORD RESET] Token generated for ${data.email}: ${resetToken}`)
        console.log(`[PASSWORD RESET LINK] ${resetUrl}`)
      }

      // Consistent response to prevent user enumeration
      res.status(200).json({
        success: true,
        message: 'If an account exists with that email, password recovery instructions have been sent.',
        ...(process.env.NODE_ENV !== 'production' && resetToken ? { data: { resetToken, resetUrl } } : {}),
      })
    } catch (err) {
      next(err)
    }
  },

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = resetPasswordSchema.parse(req.body)
      const targetPassword = data.password || data.newPassword!
      const newHash = await hashPassword(targetPassword)

      const success = await authService.resetPasswordByToken(data.token, newHash, data.email)
      if (!success) {
        res.status(400).json({
          success: false,
          error: 'Invalid or expired password reset token.',
          message: 'Invalid or expired password reset token.',
        })
        return
      }

      res.status(200).json({
        success: true,
        message: 'Password has been successfully updated. You may now sign in.',
      })
    } catch (err) {
      next(err)
    }
  },

  async logout(_req: Request, res: Response): Promise<void> {
    res.clearCookie('refreshToken', { path: '/' })
    res.status(200).json({
      success: true,
      message: 'Signed out successfully.',
    })
  },
}
