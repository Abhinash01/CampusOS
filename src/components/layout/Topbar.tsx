import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Menu,
  Search,
  Bell,
  Wifi,
  WifiOff,
  User,
  LogOut,
  ExternalLink,
  Code2,
} from 'lucide-react'
import { RoleSwitcher } from './RoleSwitcher'
import { useAppStore } from '@/stores/appStore'

export const Topbar: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const isMobileNavOpen = useAppStore((state) => state.isMobileNavOpen)
  const setMobileNavOpen = useAppStore((state) => state.setMobileNavOpen)
  const setSearchModalOpen = useAppStore((state) => state.setSearchModalOpen)
  const currentRole = useAppStore((state) => state.currentRole)
  const isOfflineSimulated = useAppStore((state) => state.isOfflineSimulated)
  const setOfflineSimulated = useAppStore((state) => state.setOfflineSimulated)

  const notifications = [
    { id: 1, title: 'Hostel Outing Pass Approved', time: '10m ago', unread: true },
    { id: 2, title: 'New Circular: Mid-Sem Timetable', time: '1h ago', unread: true },
    { id: 3, title: 'Plumbing Ticket #1042 Resolved', time: '3h ago', unread: false },
  ]

  const userRoleDetails = {
    student: { name: 'Aarav Sharma', id: '2201004128', dept: 'CSE - 6th Sem' },
    admin: { name: 'Dr. S. K. Patnaik', id: 'ADM-8902', dept: 'Registrar Office' },
    warden: { name: 'Prof. R. Mohanty', id: 'WRD-104', dept: 'Hostel Block B' },
    staff: { name: 'Manoj Kumar', id: 'STF-554', dept: 'Maintenance / Plumbing' },
  }[currentRole]

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur transition-all">
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

        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-sm tracking-wider">
            OS
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-bold tracking-tight text-slate-900">CampusOS</span>
            <span className="hidden xl:inline-block ml-2 text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full font-medium border border-slate-200">
              Phase 0 Foundation
            </span>
          </div>
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
            <span>Search modules, actions, or shortcuts...</span>
          </span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-600 bg-white rounded border border-slate-200 shadow-xs">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Offline Simulation Toggle */}
        <button
          type="button"
          onClick={() => setOfflineSimulated(!isOfflineSimulated)}
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors ${
            isOfflineSimulated
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : 'text-slate-500 hover:text-slate-700 border-transparent hover:bg-slate-100'
          }`}
          title="Toggle simulated offline state"
        >
          {isOfflineSimulated ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-600" />
              <span>Offline Mode</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5 text-slate-400" />
              <span>Simulate Offline</span>
            </>
          )}
        </button>

        {/* Developer Design System Link */}
        <Link
          to="/design-system"
          className="hidden md:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors"
          title="CampusOS Design System Documentation"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Design System</span>
        </Link>

        {/* Role Switcher */}
        <RoleSwitcher />

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
                    to={`/app/${currentRole}/notifications`}
                    onClick={() => setIsNotificationOpen(false)}
                    className="text-xs text-indigo-600 font-medium hover:underline inline-flex items-center gap-1"
                  >
                    <span>View all notifications</span>
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
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 font-semibold text-xs">
              {userRoleDetails.name.charAt(0)}
            </div>
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-elevated z-40">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">{userRoleDetails.name}</p>
                  <p className="text-[11px] text-slate-500">{userRoleDetails.id}</p>
                  <p className="text-[10px] text-indigo-600 font-medium mt-0.5">
                    {userRoleDetails.dept}
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
                  <Link
                    to="/login"
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out (Demo)</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
