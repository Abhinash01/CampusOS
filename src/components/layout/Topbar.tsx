import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  ExternalLink,
  Shield,
} from 'lucide-react'
import { useAppStore } from '@/stores/appStore'
import { useAuthStore } from '@/features/auth'

export const Topbar: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const isMobileNavOpen = useAppStore((state) => state.isMobileNavOpen)
  const setMobileNavOpen = useAppStore((state) => state.setMobileNavOpen)
  const setSearchModalOpen = useAppStore((state) => state.setSearchModalOpen)
  const currentRole = useAppStore((state) => state.currentRole)
  const authUser = useAuthStore((state) => state.user)
  const authLogout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const notifications = [
    { id: 1, title: 'Hostel Outing Pass Approved', time: '10m ago', unread: true },
    { id: 2, title: 'New Circular: Mid-Sem Timetable', time: '1h ago', unread: true },
    { id: 3, title: 'Plumbing Ticket #1042 Resolved', time: '3h ago', unread: false },
  ]

  const userDisplayName = authUser?.name || (
    currentRole === 'student' ? 'Aarav Sharma' :
    currentRole === 'admin' ? 'Dr. S. K. Patnaik' :
    currentRole === 'warden' ? 'Prof. R. Mohanty' : 'Manoj Kumar'
  )

  const userIdentifier = authUser?.studentId || (
    currentRole === 'student' ? '2201004128' :
    currentRole === 'admin' ? 'ADM-8902' :
    currentRole === 'warden' ? 'WRD-104' : 'STF-554'
  )

  const userDepartment = (
    currentRole === 'student' ? 'Computer Science & Engineering' :
    currentRole === 'admin' ? 'Registrar Office' :
    currentRole === 'warden' ? 'Hostel Administration' : 'Estate & Maintenance'
  )

  const handleLogout = async () => {
    setIsProfileOpen(false)
    await authLogout()
    navigate('/login')
  }

  const roleLabels: Record<string, string> = {
    student: 'Student',
    admin: 'Administrator',
    warden: 'Hostel Warden',
    staff: 'Maintenance Staff',
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 backdrop-blur px-4 sm:px-6 transition-all">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileNavOpen(!isMobileNavOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to={`/app/${currentRole}`} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-[10px] bg-indigo-600 flex items-center justify-center text-white shadow-[0_1px_3px_rgba(79,70,229,0.3)] group-hover:bg-indigo-700 transition-colors font-bold text-sm tracking-wider">
            OS
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">CampusOS</span>
        </Link>
      </div>

      {/* Middle: Search Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          type="button"
          onClick={() => setSearchModalOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors group"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            <span>Search modules or actions...</span>
          </span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white rounded border border-slate-200 shadow-xs">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Badge */}
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg border border-slate-200">
          <Shield className="w-3 h-3 text-indigo-600" />
          <span>{roleLabels[currentRole] || 'Campus'}</span>
        </span>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          </button>

          {isNotificationOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsNotificationOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-elevated z-40">
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-900">Notifications</span>
                  <span className="text-[10px] text-indigo-600 font-medium cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 hover:bg-slate-50 transition-colors rounded-lg text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-slate-800">{n.title}</span>
                        {n.unread && (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-slate-100 text-center">
                  <Link
                    to={`/app/${currentRole}/notices`}
                    onClick={() => setIsNotificationOpen(false)}
                    className="text-xs text-indigo-600 font-medium hover:underline inline-flex items-center gap-1"
                  >
                    <span>View all circulars</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Avatar & Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="User account menu"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-semibold text-xs">
              {userDisplayName.charAt(0)}
            </div>
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-elevated z-40">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">{userDisplayName}</p>
                  <p className="text-[11px] text-slate-500 font-mono">{userIdentifier}</p>
                  <p className="text-[10px] text-indigo-600 font-medium mt-0.5">
                    {userDepartment}
                  </p>
                </div>
                <div className="mt-1 space-y-0.5">
                  <Link
                    to={`/app/${currentRole}/profile`}
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Profile & Account</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
