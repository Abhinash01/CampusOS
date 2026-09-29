import React, { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 800,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion()
  const [current, setCurrent] = useState<number>(shouldReduceMotion ? value : 0)

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrent(value)
      return
    }

    let startTimestamp: number | null = null
    const startValue = 0

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(startValue + (value - startValue) * easeOut))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [value, duration, shouldReduceMotion])

  return (
    <span className={`tnum ${className}`}>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  )
}
