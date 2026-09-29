import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff } from 'lucide-react'
import { useAppStore } from '@/stores/appStore'

export const OfflineBanner: React.FC = () => {
  const [isBrowserOffline, setIsBrowserOffline] = useState(!navigator.onLine)
  const isSimulatedOffline = useAppStore((state) => state.isOfflineSimulated)

  useEffect(() => {
    const handleOnline = () => setIsBrowserOffline(false)
    const handleOffline = () => setIsBrowserOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const isOffline = isBrowserOffline || isSimulatedOffline

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-amber-600 text-white text-xs font-medium px-4 py-2 flex items-center justify-center gap-2 overflow-hidden shadow-inner"
          role="status"
          aria-live="polite"
        >
          <WifiOff className="w-3.5 h-3.5 shrink-0" />
          <span>You&apos;re currently offline. Some live information may be unavailable.</span>
          {isSimulatedOffline && (
            <span className="text-[10px] bg-amber-700/60 px-1.5 py-0.5 rounded font-mono">
              Simulated Mode
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
