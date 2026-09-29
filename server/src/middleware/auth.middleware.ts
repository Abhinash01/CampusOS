import type { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt.utils.js'
import { authService } from '../services/auth.service.js'
import type { UserRole } from '../models/user.model.js'

export interface AuthenticatedUser {
  id: string
  email: string
  role: UserRole
  name: string
  studentId?: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser
    }
  }
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  if (!token) {
    res.status(401).json({ error: 'Authentication required. Please sign in.' })
    return
  }

  const payload = verifyAccessToken(token)
  if (!payload) {
    res.status(401).json({ error: 'Session expired or invalid. Please sign in again.' })
    return
  }

  const user = await authService.getUserById(payload.userId)
  if (!user || !user.isActive) {
    res.status(401).json({ error: 'User account not found or deactivated.' })
    return
  }

  req.user = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
    studentId: user.studentId,
  }

  next()
}

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' })
      return
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: `Access denied. Requires one of: [${allowedRoles.join(', ')}].`,
      })
      return
    }

    next()
  }
}
