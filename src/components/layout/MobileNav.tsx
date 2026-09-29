import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarCheck,
  KeyRound,
  Wrench,
  User,
  ShieldCheck,
  Home,
  Utensils,
  Bell,
  FileCheck2,
} from 'lucide-react'
import { Drawer } from '@/components/ui/Drawer'
import { useAppStore } from '@/stores/appStore'
import { cn } from '@/lib/utils'

export const MobileNav: React.FC = () => {
  const isMobileNavOpen = useAppStore((state) => state.isMobileNavOpen)
  const setMobileNavOpen = useAppStore((state) => state.setMobileNavOpen)
  const currentRole = useAppStore((state) => state.currentRole)
  const location = useLocation()

  // Full Drawer Links
  const allLinksByRole = {
    student: [
      { name: 'Dashboard', href: '/app/student', icon: LayoutDashboard },
      { name: 'Attendance', href: '/app/student/attendance', icon: CalendarCheck },
      { name: 'Gate Pass', href: '/app/student/gate-pass', icon: KeyRound },
      { name: 'Complaints', href: '/app/student/complaints', icon: Wrench },
      { name: 'Mess & Menu', href: '/app/student/mess', icon: Utensils },
      { name: 'Certificates', href: '/app/student/certificates', icon: FileCheck2 },
      { name: 'Notices', href: '/app/student/notices', icon: Bell },
      { name: 'Profile', href: '/app/student/profile', icon: User },
    ],
    admin: [
      { name: 'Command Center', href: '/app/admin', icon: LayoutDashboard },
      { name: 'Requests', href: '/app/admin/requests', icon: FileCheck2 },
      { name: 'Complaints', href: '/app/admin/complaints', icon: Wrench },
      { name: 'Hostel Ops', href: '/app/admin/hostels', icon: Home },
      { name: 'Mess Ops', href: '/app/admin/mess', icon: Utensils },
      { name: 'Notices', href: '/app/admin/notices', icon: Bell },
    ],
    warden: [
      { name: 'Warden Station', href: '/app/warden', icon: LayoutDashboard },
      { name: 'Gate Passes', href: '/app/warden/gate-passes', icon: KeyRound },
      { name: 'Hostel Issues', href: '/app/warden/complaints', icon: Wrench },
      { name: 'Room Roster', href: '/app/warden/rooms', icon: Home },
    ],
    staff: [
      { name: 'Workbench', href: '/app/staff', icon: LayoutDashboard },
      { name: 'Assigned Tasks', href: '/app/staff/tasks', icon: Wrench },
      { name: 'Incidents', href: '/app/staff/complaints', icon: ShieldCheck },
    ],
  }[currentRole]

  // Fixed Bottom Bar Quick Items
  const bottomBarItems = {
    student: [
      { name: 'Home', href: '/app/student', icon: LayoutDashboard },
      { name: 'Attendance', href: '/app/student/attendance', icon: CalendarCheck },
      { name: 'Gate Pass', href: '/app/student/gate-pass', icon: KeyRound },
      { name: 'Complaints', href: '/app/student/complaints', icon: Wrench },
      { name: 'Profile', href: '/app/student/profile', icon: User },
    ],
    admin: [
      { name: 'Overview', href: '/app/admin', icon: LayoutDashboard },
      { name: 'Requests', href: '/app/admin/requests', icon: FileCheck2 },
      { name: 'Complaints', href: '/app/admin/complaints', icon: Wrench },
      { name: 'Notices', href: '/app/admin/notices', icon: Bell },
    ],
    warden: [
      { name: 'Station', href: '/app/warden', icon: LayoutDashboard },
      { name: 'Passes', href: '/app/warden/gate-passes', icon: KeyRound },
      { name: 'Rooms', href: '/app/warden/rooms', icon: Home },
      { name: 'Issues', href: '/app/warden/complaints', icon: Wrench },
    ],
    staff: [
      { name: 'Home', href: '/app/staff', icon: LayoutDashboard },
      { name: 'Tasks', href: '/app/staff/tasks', icon: Wrench },
      { name: 'Issues', href: '/app/staff/complaints', icon: ShieldCheck },
    ],
  }[currentRole]

  return (
    <>
      {/* Mobile Drawer (Slide from left) */}
      <Drawer
        isOpen={isMobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        side="left"
        title="CampusOS Navigation"
      >
        <div className="space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {currentRole.toUpperCase()} CHANNELS
          </div>
          {allLinksByRole.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href

            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 shrink-0',
                    isActive ? 'text-indigo-600' : 'text-slate-400'
                  )}
                />
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </div>
      </Drawer>

      {/* Touch-Friendly Bottom Bar for Small Devices */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-elevated"
      >
        {bottomBarItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors flex-1 min-w-0',
                isActive ? 'text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
              )}
            >
              <Icon
                className={cn('w-5 h-5 mb-0.5 shrink-0', isActive ? 'text-indigo-600' : 'text-slate-400')}
              />
              <span className="truncate w-full text-center">{item.name}</span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}
