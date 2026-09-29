import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ScaleOnHoverProps {
  children: React.ReactNode
  className?: string
  scale?: number
}

export const ScaleOnHover: React.FC<ScaleOnHoverProps> = ({
  children,
  className = '',
  scale = 1.015,
}) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { scale }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
