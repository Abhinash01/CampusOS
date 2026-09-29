import React, { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  side?: 'left' | 'right'
  className?: string
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  className,
}) => {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const slideVariants = {
    closed: {
      x: side === 'right' ? '100%' : '-100%',
      opacity: shouldReduceMotion ? 0 : 1,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 30,
        stiffness: 300,
        duration: shouldReduceMotion ? 0.01 : 0.3,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div
            className={cn(
              'fixed inset-y-0 flex max-w-full',
              side === 'right' ? 'right-0 pl-10' : 'left-0 pr-10'
            )}
          >
            <motion.div
              variants={slideVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={cn(
                'w-screen max-w-md bg-white p-6 shadow-2xl border-slate-200 flex flex-col',
                side === 'right' ? 'border-l' : 'border-r',
                className
              )}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                {title ? (
                  <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                ) : (
                  <div />
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pt-4">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
