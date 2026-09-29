import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Topbar } from './Topbar'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { SearchModal } from './SearchModal'
import { OfflineBanner } from '@/components/feedback/OfflineBanner'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { useAppStore } from '@/stores/appStore'

export const AppShell: React.FC = () => {
  const location = useLocation()
  const currentRole = useAppStore((state) => state.currentRole)

  // Generate dynamic breadcrumb segments from current pathname
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`
    const formatted = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
    return {
      label: formatted,
      href: index === pathSegments.length - 1 ? undefined : url,
    }
  })

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-900">
      {/* Offline Alert Strip */}
      <OfflineBanner />

      {/* Global Topbar */}
      <Topbar />

      {/* Main Layout Container */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Content Viewport */}
        <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden pb-16 lg:pb-8">
          {/* Breadcrumb & Sub-header Bar */}
          <div className="border-b border-slate-200/80 bg-white px-4 sm:px-6 py-2.5 flex items-center justify-between">
            <Breadcrumb items={breadcrumbItems.length > 0 ? breadcrumbItems : [{ label: `${currentRole} Portal` }]} />
            <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Connected: Campus Core • Node 1
            </div>
          </div>

          {/* Page Animated Content */}
          <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Responsive Mobile Drawer & Bottom Navigation */}
      <MobileNav />

      {/* Global Search & Command Palette Modal */}
      <SearchModal />
    </div>
  )
}
