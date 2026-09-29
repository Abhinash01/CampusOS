import mongoose, { Schema, Document } from 'mongoose'

export type UserRole = 'STUDENT' | 'ADMIN' | 'WARDEN' | 'STAFF'

export interface IUser extends Document {
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

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // Prevents passwordHash from being returned in standard queries
    },
    role: {
      type: String,
      enum: ['STUDENT', 'ADMIN', 'WARDEN', 'STAFF'],
      default: 'STUDENT',
      required: true,
      index: true,
    },
    studentId: {
      type: String,
      sparse: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        delete ret.passwordHash
        delete ret.__v
        return ret
      },
    },
  }
)

export const User = mongoose.model<IUser>('User', userSchema)
