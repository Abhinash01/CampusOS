import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, GraduationCap, ShieldCheck, Home, Wrench, Check } from 'lucide-react'
import { useAppStore } from '@/stores/appStore'
import type { UserRole } from '@/types'
import { cn } from '@/lib/utils'

export const RoleSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const currentRole = useAppStore((state) => state.currentRole)
  const setRole = useAppStore((state) => state.setRole)
  const navigate = useNavigate()

  const roles: { id: UserRole; label: string; icon: React.ReactNode; path: string; desc: string }[] = [
    {
      id: 'student',
      label: 'Student',
      icon: <GraduationCap className="w-4 h-4 text-indigo-600" />,
      path: '/app/student',
      desc: 'Attendance, Mess, Gate Pass',
    },
    {
      id: 'admin',
      label: 'Administrator',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      path: '/app/admin',
      desc: 'Operations, Approvals, Analytics',
    },
    {
      id: 'warden',
      label: 'Hostel Warden',
      icon: <Home className="w-4 h-4 text-amber-600" />,
      path: '/app/warden',
      desc: 'Gate Passes, Rooms, Incidents',
    },
    {
      id: 'staff',
      label: 'Maintenance Staff',
      icon: <Wrench className="w-4 h-4 text-blue-600" />,
      path: '/app/staff',
      desc: 'Task Queue, Field Repairs',
    },
  ]

  const activeRole = roles.find((r) => r.id === currentRole) || roles[0]

  const handleSelectRole = (role: (typeof roles)[0]) => {
    setRole(role.id)
    setIsOpen(false)
    navigate(role.path)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-xs font-medium text-slate-800 shadow-sm"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-1.5">
          {activeRole.icon}
          <span>{activeRole.label}</span>
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-1.5 shadow-elevated z-40"
            >
              <div className="px-3 py-2 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Switch Campus Persona
              </div>
              <div className="mt-1 space-y-1">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleSelectRole(role)}
                    className={cn(
                      'w-full flex items-start gap-2.5 px-3 py-2 rounded-lg text-left transition-colors text-xs',
                      role.id === currentRole
                        ? 'bg-indigo-50/80 text-indigo-950 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    <div className="mt-0.5">{role.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{role.label}</span>
                        {role.id === currentRole && (
                          <Check className="w-3.5 h-3.5 text-indigo-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{role.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
