import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from './auth.store'
import type { UserRole } from './auth.types'
import { ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isInitialized } = useAuthStore()
  const location = useLocation()

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 animate-pulse flex items-center justify-center text-white font-bold text-xs">
            OS
          </div>
          <p className="text-xs font-medium text-slate-500">Checking campus credentials…</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-xl p-6 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-600 mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Unauthorized Access</h2>
          <p className="text-xs text-slate-500 mb-6">
            Your account ({user.email}) has role <span className="font-semibold text-slate-700">{user.role}</span> which does not have permission to view this section.
          </p>
          <div className="flex flex-col gap-2">
            <Button
              variant="primary"
              onClick={() => {
                window.location.href = `/app/${user.role.toLowerCase()}`
              }}
              className="w-full"
            >
              Go to my {user.role.toLowerCase()} dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
