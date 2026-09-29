import type { LucideIcon } from 'lucide-react'

export type UserRole = 'student' | 'admin' | 'warden' | 'staff'

export interface UserProfile {
  id: string
  name: string
  role: UserRole
  identifier: string // e.g. Roll No / Staff ID
  department?: string
  avatarUrl?: string
  hostel?: string
  room?: string
}

export interface NavigationItem {
  name: string
  href: string
  icon: LucideIcon
  badge?: string | number
  phase?: number // Which phase it is implemented in
}

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface MetricCardData {
  title: string
  value: string | number
  change?: string
  isPositive?: boolean
  caption?: string
  icon?: LucideIcon
}

export interface QuickActionItem {
  title: string
  description: string
  href: string
  icon: LucideIcon
  role: UserRole
  phase: number
}
