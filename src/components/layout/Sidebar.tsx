import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarCheck,
  Calendar,
  Bell,
  KeyRound,
  Home,
  Wrench,
  Utensils,
  FileCheck2,
  Receipt,
  Users,
  Briefcase,
  Building,
  BarChart3,
  AlertOctagon,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useAppStore } from '@/stores/appStore'
import { cn } from '@/lib/utils'

export const Sidebar: React.FC = () => {
  const currentRole = useAppStore((state) => state.currentRole)
  const isCollapsed = useAppStore((state) => state.isSidebarCollapsed)
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)
  const location = useLocation()

  const studentNav = [
    { name: 'Dashboard', href: '/app/student', icon: LayoutDashboard },
    { name: 'Attendance', href: '/app/student/attendance', icon: CalendarCheck, badge: '88%' },
    { name: 'Timetable', href: '/app/student/timetable', icon: Calendar },
    { name: 'Gate Pass', href: '/app/student/gate-pass', icon: KeyRound, badge: 'Active' },
    { name: 'Hostel & Room', href: '/app/student/hostel', icon: Home },
    { name: 'Complaints', href: '/app/student/complaints', icon: Wrench, badge: '1' },
    { name: 'Mess & Dining', href: '/app/student/mess', icon: Utensils },
    { name: 'Certificates', href: '/app/student/certificates', icon: FileCheck2 },
    { name: 'Notices', href: '/app/student/notices', icon: Bell, badge: 'New' },
    { name: 'Fees & Dues', href: '/app/student/fees', icon: Receipt },
  ]

  const adminNav = [
    { name: 'Command Center', href: '/app/admin', icon: LayoutDashboard },
    { name: 'Requests Queue', href: '/app/admin/requests', icon: FileCheck2, badge: '14' },
    { name: 'Complaints Oversight', href: '/app/admin/complaints', icon: Wrench, badge: '8' },
    { name: 'Students Registry', href: '/app/admin/students', icon: Users },
    { name: 'Staff & Techs', href: '/app/admin/staff', icon: Briefcase },
    { name: 'Hostel Operations', href: '/app/admin/hostels', icon: Building },
    { name: 'Mess Operations', href: '/app/admin/mess', icon: Utensils },
    { name: 'Targeted Notices', href: '/app/admin/notices', icon: Bell },
    { name: 'Analytics', href: '/app/admin/analytics', icon: BarChart3 },
    { name: 'Recurring Issues', href: '/app/admin/recurring-issues', icon: AlertOctagon, badge: '3' },
    { name: 'Audit Logs', href: '/app/admin/audit-logs', icon: FileSpreadsheet },
  ]

  const wardenNav = [
    { name: 'Warden Station', href: '/app/warden', icon: LayoutDashboard },
    { name: 'Gate Passes', href: '/app/warden/gate-passes', icon: KeyRound, badge: '6' },
    { name: 'Hostel Complaints', href: '/app/warden/complaints', icon: Wrench, badge: '3' },
    { name: 'Room Roster', href: '/app/warden/rooms', icon: Home },
    { name: 'Student Requests', href: '/app/warden/requests', icon: FileCheck2 },
  ]

  const staffNav = [
    { name: 'Technician Workbench', href: '/app/staff', icon: LayoutDashboard },
    { name: 'Assigned Tasks', href: '/app/staff/tasks', icon: Wrench, badge: '4' },
    { name: 'Incident Log', href: '/app/staff/complaints', icon: AlertOctagon },
  ]

  const navMap = {
    student: studentNav,
    admin: adminNav,
    warden: wardenNav,
    staff: staffNav,
  }

  const currentNav = navMap[currentRole] || studentNav

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col border-r border-slate-200 bg-white transition-all duration-200 select-none z-20 shrink-0',
        isCollapsed ? 'w-18' : 'w-64'
      )}
    >
      {/* Sidebar Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {!isCollapsed && `${currentRole.toUpperCase()} PORTAL`}
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

              {!isCollapsed && (
                <span className="truncate flex-1">{item.name}</span>
              )}

              {!isCollapsed && item.badge && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full font-semibold shrink-0',
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  )}
                >
                  {item.badge}
                </span>
              )}

              {/* Active Bar indicator */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-indigo-600 rounded-r-full" />
              )}
            </NavLink>
          )
        })}
      </div>

      {/* Collapse Toggle Footer */}
      <div className="p-3 border-t border-slate-100 flex items-center justify-between">
        {!isCollapsed && (
          <div className="text-[11px] text-slate-400 truncate">
            CampusOS v0.1 • BPUT Hackathon
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
