import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.35,
}) => {
  const shouldReduceMotion = useReducedMotion()

  const getInitialPosition = () => {
    if (shouldReduceMotion || direction === 'none') return { x: 0, y: 0 }
    switch (direction) {
      case 'up':
        return { x: 0, y: 12 }
      case 'down':
        return { x: 0, y: -12 }
      case 'left':
        return { x: 12, y: 0 }
      case 'right':
        return { x: -12, y: 0 }
    }
  }

  const initial = {
    opacity: 0,
    ...getInitialPosition(),
  }

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.01 : duration,
      delay: shouldReduceMotion ? 0 : delay,
      ease: 'easeOut' as const,
    },
  }

  return (
    <motion.div initial={initial} animate={animate} className={className}>
      {children}
    </motion.div>
  )
}
