import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { authService } from '../services/auth.service.js'
import { comparePassword, hashPassword } from '../utils/password.utils.js'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.utils.js'

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

export const authController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = registerSchema.parse(req.body)

      // Check if email already registered
      const existingEmail = await authService.findUserByEmail(data.email)
      if (existingEmail) {
        res.status(409).json({ error: 'An account with this email already exists.' })
        return
      }

      // Check if studentId already registered
      const existingId = await authService.findUserByStudentId(data.studentId)
      if (existingId) {
        res.status(409).json({ error: 'This Student ID is already registered.' })
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

      res.status(201).json({
        message: 'Registration successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          studentId: user.studentId,
          phone: user.phone,
        },
        accessToken,
        refreshToken,
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
        res.status(401).json({ error: 'Email or password is incorrect.' })
        return
      }

      const isMatch = await comparePassword(data.password, user.passwordHash)
      if (!isMatch) {
        res.status(401).json({ error: 'Email or password is incorrect.' })
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

      res.status(200).json({
        message: 'Signed in successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          studentId: user.studentId,
          phone: user.phone,
        },
        accessToken,
        refreshToken,
      })
    } catch (err) {
      next(err)
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.body.refreshToken || req.cookies?.refreshToken
      if (!token) {
        res.status(401).json({ error: 'Refresh token is required.' })
        return
      }

      const payload = verifyRefreshToken(token)
      if (!payload) {
        res.status(401).json({ error: 'Refresh token is invalid or expired. Please sign in again.' })
        return
      }

      const user = await authService.getUserById(payload.userId)
      if (!user || !user.isActive) {
        res.status(401).json({ error: 'User account not found.' })
        return
      }

      const newAccessToken = generateAccessToken({
        userId: user._id,
        email: user.email,
        role: user.role,
      })

      const newRefreshToken = generateRefreshToken({
        userId: user._id,
        email: user.email,
        role: user.role,
      })

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      })
    } catch (err) {
      next(err)
    }
  },

  async getMe(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' })
      return
    }

    const user = await authService.getUserById(req.user.id)
    if (!user) {
      res.status(404).json({ error: 'User profile not found.' })
      return
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        phone: user.phone,
        avatar: user.avatar,
      },
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
        res.status(400).json({ error: 'Invalid or expired password reset token.' })
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
    res.clearCookie('refreshToken')
    res.status(200).json({ message: 'Signed out successfully.' })
  },
}
