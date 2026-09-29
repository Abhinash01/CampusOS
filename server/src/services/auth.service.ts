import crypto from 'node:crypto'
import { User, type IUser, type UserRole } from '../models/user.model.js'
import { isDbConnected } from '../config/db.js'
import { hashPassword } from '../utils/password.utils.js'

interface StoredUser {
  _id: string
  name: string
  email: string
  passwordHash: string
  role: UserRole
  studentId?: string
  phone?: string
  avatar?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface ResetTokenRecord {
  email: string
  tokenHash: string
  expiresAt: Date
}

// In-memory backing store for local testing when MongoDB daemon is not started
const inMemoryUsers = new Map<string, StoredUser>()
const inMemoryResetTokens = new Map<string, ResetTokenRecord>()

export const authService = {
  async findUserByEmail(email: string): Promise<StoredUser | null> {
    const normalized = email.toLowerCase().trim()
    if (isDbConnected()) {
      try {
        const user = await User.findOne({ email: normalized }).select('+passwordHash')
        if (user) {
          return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            role: user.role,
            studentId: user.studentId,
            phone: user.phone,
            avatar: user.avatar,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          }
        }
      } catch (err) {
        console.error('[DB FIND ERROR]', err)
      }
    }

    // Check in-memory store
    for (const u of inMemoryUsers.values()) {
      if (u.email.toLowerCase() === normalized) {
        return u
      }
    }
    return null
  },

  async findUserByStudentId(studentId: string): Promise<StoredUser | null> {
    const trimmed = studentId.trim()
    if (isDbConnected()) {
      try {
        const user = await User.findOne({ studentId: trimmed })
        if (user) {
          return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            role: user.role,
            studentId: user.studentId,
            phone: user.phone,
            avatar: user.avatar,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          }
        }
      } catch (err) {
        console.error('[DB FIND ID ERROR]', err)
      }
    }

    for (const u of inMemoryUsers.values()) {
      if (u.studentId && u.studentId.toLowerCase() === trimmed.toLowerCase()) {
        return u
      }
    }
    return null
  },

  async getUserById(id: string): Promise<StoredUser | null> {
    if (isDbConnected()) {
      try {
        const user = await User.findById(id)
        if (user) {
          return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            passwordHash: '',
            role: user.role,
            studentId: user.studentId,
            phone: user.phone,
            avatar: user.avatar,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          }
        }
      } catch (err) {
        console.error('[DB GET ID ERROR]', err)
      }
    }

    return inMemoryUsers.get(id) || null
  },

  async createUser(data: {
    name: string
    email: string
    passwordHash: string
    role: UserRole
    studentId?: string
    phone?: string
  }): Promise<StoredUser> {
    const normalizedEmail = data.email.toLowerCase().trim()

    if (isDbConnected()) {
      try {
        const doc = await User.create({
          name: data.name,
          email: normalizedEmail,
          passwordHash: data.passwordHash,
          role: data.role,
          studentId: data.studentId,
          phone: data.phone,
          isActive: true,
        })
        const saved = {
          _id: doc._id.toString(),
          name: doc.name,
          email: doc.email,
          passwordHash: data.passwordHash,
          role: doc.role,
          studentId: doc.studentId,
          phone: doc.phone,
          avatar: doc.avatar,
          isActive: doc.isActive,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }
        inMemoryUsers.set(saved._id, saved)
        return saved
      } catch (err) {
        console.error('[DB CREATE ERROR]', err)
      }
    }

    const newId = crypto.randomUUID()
    const memoryRecord: StoredUser = {
      _id: newId,
      name: data.name,
      email: normalizedEmail,
      passwordHash: data.passwordHash,
      role: data.role,
      studentId: data.studentId,
      phone: data.phone,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    inMemoryUsers.set(newId, memoryRecord)
    return memoryRecord
  },

  async createPasswordResetToken(email: string): Promise<string> {
    const rawToken = crypto.randomBytes(32).toString('hex')
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    inMemoryResetTokens.set(email.toLowerCase().trim(), {
      email: email.toLowerCase().trim(),
      tokenHash,
      expiresAt,
    })

    return rawToken
  },

  async resetPasswordByToken(rawToken: string, newPasswordHash: string, email?: string): Promise<boolean> {
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
    let foundEmail = email ? email.toLowerCase().trim() : null

    if (!foundEmail) {
      for (const [em, rec] of inMemoryResetTokens.entries()) {
        if (rec.tokenHash === tokenHash) {
          foundEmail = em
          break
        }
      }
    }

    if (!foundEmail) return false

    const record = inMemoryResetTokens.get(foundEmail)
    if (!record) return false

    if (new Date() > record.expiresAt) {
      inMemoryResetTokens.delete(foundEmail)
      return false
    }

    if (tokenHash !== record.tokenHash) {
      return false
    }

    // Update in database or memory
    if (isDbConnected()) {
      try {
        await User.updateOne({ email: foundEmail }, { passwordHash: newPasswordHash })
      } catch (err) {
        console.error('[DB UPDATE PASS ERROR]', err)
      }
    }

    for (const [id, u] of inMemoryUsers.entries()) {
      if (u.email.toLowerCase() === foundEmail) {
        u.passwordHash = newPasswordHash
        u.updatedAt = new Date()
        inMemoryUsers.set(id, u)
        break
      }
    }

    inMemoryResetTokens.delete(foundEmail)
    return true
  },

  async resetPassword(email: string, rawToken: string, newPasswordHash: string): Promise<boolean> {
    return this.resetPasswordByToken(rawToken, newPasswordHash, email)
  },

  async seedDefaultAccounts(): Promise<void> {
    const defaultPasswordHash = await hashPassword('Campus@123')

    const seeds: {
      name: string
      email: string
      role: UserRole
      studentId?: string
      phone: string
    }[] = [
      {
        name: 'Aarav Sharma',
        email: 'student@campusos.edu',
        role: 'STUDENT',
        studentId: '2201004128',
        phone: '+91 98765 43210',
      },
      {
        name: 'Dr. S. K. Patnaik',
        email: 'admin@campusos.edu',
        role: 'ADMIN',
        phone: '+91 94370 12345',
      },
      {
        name: 'Prof. R. Mohanty',
        email: 'warden@campusos.edu',
        role: 'WARDEN',
        phone: '+91 94371 99887',
      },
      {
        name: 'Manoj Kumar',
        email: 'staff@campusos.edu',
        role: 'STAFF',
        phone: '+91 98610 55443',
      },
    ]

    for (const seed of seeds) {
      const existing = await this.findUserByEmail(seed.email)
      if (!existing) {
        await this.createUser({
          ...seed,
          passwordHash: defaultPasswordHash,
        })
      }
    }
  },
}
