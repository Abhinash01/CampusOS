import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart'
  > {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      onClick,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion()

    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-[10px] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-9',
      lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5 h-10 sm:h-11 font-semibold',
    }

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-[1px] active:translate-y-0 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_2px_4px_rgba(79,70,229,0.2)] hover:shadow-[0_4px_12px_rgba(79,70,229,0.25)] border border-indigo-500/50',
      secondary:
        'bg-slate-100 text-slate-800 hover:bg-slate-200/80 hover:-translate-y-[1px] active:translate-y-0 border border-slate-200',
      outline:
        'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:-translate-y-[1px] active:translate-y-0 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-subtle',
      ghost:
        'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 active:bg-slate-200 border border-transparent',
      destructive:
        'bg-red-600 text-white hover:bg-red-700 hover:-translate-y-[1px] active:translate-y-0 shadow-xs border border-red-600',
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        whileTap={disabled || isLoading || shouldReduceMotion ? {} : { scale: 0.98 }}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
