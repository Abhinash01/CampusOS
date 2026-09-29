import React from 'react'
import { cn } from '@/lib/utils'
import type { BadgeVariant } from '@/types'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  withDot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  withDot = false,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
    default: {
      container: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-500',
    },
    success: {
      container: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-600',
    },
    warning: {
      container: 'bg-amber-50 text-amber-800 border-amber-200',
      dot: 'bg-amber-600',
    },
    danger: {
      container: 'bg-red-50 text-red-700 border-red-200',
      dot: 'bg-red-600',
    },
    info: {
      container: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-600',
    },
  }

  const { container, dot } = variantStyles[variant]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border select-none',
        container,
        className
      )}
      {...props}
    >
      {withDot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dot)} />}
      <span>{children}</span>
    </span>
  )
}
