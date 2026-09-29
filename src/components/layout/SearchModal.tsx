import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, LayoutDashboard, FileText, Bell, Shield, Home, CalendarCheck, Utensils } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { useAppStore } from '@/stores/appStore'

export const SearchModal: React.FC = () => {
  const isOpen = useAppStore((state) => state.isSearchModalOpen)
  const setIsOpen = useAppStore((state) => state.setSearchModalOpen)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setIsOpen])

  const quickLinks = [
    { title: 'Student Dashboard', path: '/app/student', icon: LayoutDashboard, category: 'Navigation' },
    { title: 'Academic Attendance', path: '/app/student/attendance', icon: CalendarCheck, category: 'Academics' },
    { title: 'Student Requests', path: '/app/student/requests', icon: FileText, category: 'Operations' },
    { title: 'Hostel Living & Services', path: '/app/student/hostel', icon: Home, category: 'Accommodation' },
    { title: 'Mess & Dining Menu', path: '/app/student/mess', icon: Utensils, category: 'Dining' },
    { title: 'Campus Notices & Circulars', path: '/app/student/notices', icon: Bell, category: 'Communication' },
    { title: 'Administrator Command', path: '/app/admin', icon: Shield, category: 'Operations' },
  ]

  const filteredLinks = quickLinks.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (path: string) => {
    setIsOpen(false)
    setQuery('')
    navigate(path)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
      <div className="space-y-4">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-3 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search campus modules or shortcuts..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
            autoFocus
          />
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1">
            Navigation Shortcuts
          </div>
          {filteredLinks.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              No matching modules found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredLinks.map((item, idx) => {
              const Icon = item.icon
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-white flex items-center justify-center text-slate-600 border border-slate-200">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{item.title}</div>
                      <div className="text-[10px] text-slate-500">{item.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
                </button>
              )
            })
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Use keyboard navigation</span>
          <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">ESC to close</span>
        </div>
      </div>
    </Modal>
  )
}
