import { Router } from 'express'
import { authController } from '../controllers/auth.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js'
import { authLimiter } from '../middleware/rateLimiter.js'

export const authRouter = Router()

authRouter.post('/register', authLimiter, authController.register)
authRouter.post('/login', authLimiter, authController.login)
authRouter.post('/refresh', authController.refreshToken)
authRouter.post('/logout', authController.logout)
authRouter.get('/me', authenticateToken, authController.getMe)
authRouter.post('/forgot-password', authLimiter, authController.forgotPassword)
authRouter.post('/reset-password', authLimiter, authController.resetPassword)
