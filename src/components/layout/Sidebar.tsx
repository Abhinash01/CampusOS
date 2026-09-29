import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarCheck,
  FileCheck2,
  Home,
  Utensils,
  Bell,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Users,
  Wrench,
  KeyRound,
  FileText,
} from 'lucide-react'
import { useAppStore } from '@/stores/appStore'
import { cn } from '@/lib/utils'

export const Sidebar: React.FC = () => {
  const currentRole = useAppStore((state) => state.currentRole)
  const isCollapsed = useAppStore((state) => state.isSidebarCollapsed)
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)
  const location = useLocation()

  // Student Navigation: Overview, Attendance, Requests, Hostel, Mess, Notices
  const studentNav = [
    { name: 'Overview', href: '/app/student', icon: LayoutDashboard },
    { name: 'Attendance', href: '/app/student/attendance', icon: CalendarCheck },
    { name: 'Requests', href: '/app/student/requests', icon: FileCheck2 },
    { name: 'Hostel', href: '/app/student/hostel', icon: Home },
    { name: 'Mess', href: '/app/student/mess', icon: Utensils },
    { name: 'Notices', href: '/app/student/notices', icon: Bell },
  ]

  const adminNav = [
    { name: 'Command Center', href: '/app/admin', icon: LayoutDashboard },
    { name: 'Requests', href: '/app/admin/requests', icon: FileCheck2 },
    { name: 'Complaints', href: '/app/admin/complaints', icon: Wrench },
    { name: 'Students', href: '/app/admin/students', icon: Users },
    { name: 'Staff', href: '/app/admin/staff', icon: Shield },
    { name: 'Hostel Operations', href: '/app/admin/hostels', icon: Home },
    { name: 'Mess Operations', href: '/app/admin/mess', icon: Utensils },
    { name: 'Notices', href: '/app/admin/notices', icon: Bell },
  ]

  const wardenNav = [
    { name: 'Station Overview', href: '/app/warden', icon: LayoutDashboard },
    { name: 'Gate Passes', href: '/app/warden/gate-passes', icon: KeyRound },
    { name: 'Hostel Complaints', href: '/app/warden/complaints', icon: Wrench },
    { name: 'Room Roster', href: '/app/warden/rooms', icon: Home },
  ]

  const staffNav = [
    { name: 'Workbench', href: '/app/staff', icon: LayoutDashboard },
    { name: 'Assigned Tasks', href: '/app/staff/tasks', icon: Wrench },
    { name: 'Reports', href: '/app/staff/complaints', icon: FileText },
  ]

  const navMap = {
    student: studentNav,
    admin: adminNav,
    warden: wardenNav,
    staff: staffNav,
  }

  const currentNav = navMap[currentRole] || studentNav

  // Secondary lower section: Help & Support, Settings
  const secondaryNav = [
    { name: 'Help & Support', href: `/app/${currentRole}/help`, icon: HelpCircle },
    { name: 'Settings', href: `/app/${currentRole}/settings`, icon: Settings },
  ]

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col border-r border-slate-200 bg-white transition-all duration-200 select-none z-20 shrink-0',
        isCollapsed ? 'w-18' : 'w-60'
      )}
    >
      {/* Primary Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {!isCollapsed && 'Workspace'}
        </div>

        {currentNav.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href

          return (
            <NavLink
              key={item.href}
              to={item.href}
              title={isCollapsed ? item.name : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors relative group',
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                isCollapsed && 'justify-center px-2'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 shrink-0 transition-colors',
                  isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                )}
              />

              {!isCollapsed && <span className="truncate flex-1">{item.name}</span>}

              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-indigo-600 rounded-r-full" />
              )}
            </NavLink>
          )
        })}

        {/* Separated Lower Section: Help & Support, Settings */}
        <div className="pt-4 mt-4 border-t border-slate-100 space-y-1">
          <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            {!isCollapsed && 'Preferences'}
          </div>
          {secondaryNav.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href

            return (
              <NavLink
                key={item.href}
                to={item.href}
                title={isCollapsed ? item.name : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors group',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                  isCollapsed && 'justify-center px-2'
                )}
              >
                <Icon
                  className={cn(
                    'w-4 h-4 shrink-0 transition-colors',
                    isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                  )}
                />
                {!isCollapsed && <span className="truncate flex-1">{item.name}</span>}
              </NavLink>
            )
          })}
        </div>
      </div>

      {/* Collapse Toggle Footer */}
      <div className="p-3 border-t border-slate-100 flex items-center justify-between">
        {!isCollapsed && (
          <div className="text-[11px] text-slate-400">
            CampusOS
          </div>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors ml-auto"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  )
}
