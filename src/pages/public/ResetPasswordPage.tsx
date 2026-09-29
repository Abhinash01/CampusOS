import React, { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/motion/FadeIn'
import { useResetPassword } from '@/features/auth'

const resetSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type ResetFormValues = z.infer<typeof resetSchema>

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const resetMutation = useResetPassword()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: ResetFormValues) => {
    if (!token) {
      setErrorMessage('Missing password reset token. Please request a new reset link.')
      return
    }

    setErrorMessage(null)
    try {
      await resetMutation.mutateAsync({
        token,
        password: values.password,
      })
      setIsSuccess(true)
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to reset password. The link may have expired.')
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFDFB] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-rose-100 selection:text-rose-900 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 bg-grid-slate radial-mask opacity-60 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <FadeIn direction="up">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-2">
            <div className="w-9 h-9 rounded-[10px] bg-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_1px_3px_rgba(225,29,72,0.3)] group-hover:bg-rose-700 transition-colors">
              OS
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CampusOS</span>
          </Link>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            Set new password
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Create a strong replacement password for your campus account.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="py-8 px-6 sm:px-10 border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06),0_0_0_1px_rgba(226,232,240,0.7)] bg-white rounded-2xl">
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <div className="font-medium">{errorMessage}</div>
              </div>
            )}

            {!token && (
              <div className="mb-5 p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                <p className="font-semibold mb-1">No reset token found</p>
                <p>Please use the reset link sent to your registered email address or request a new one.</p>
                <div className="mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/forgot-password')}
                  >
                    Request new link
                  </Button>
                </div>
              </div>
            )}

            {!isSuccess ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="New password"
                  type="password"
                  placeholder="At least 6 characters"
                  leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                  error={errors.password?.message}
                  disabled={!token}
                  {...register('password')}
                />

                <Input
                  label="Confirm new password"
                  type="password"
                  placeholder="Re-enter new password"
                  leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                  error={errors.confirmPassword?.message}
                  disabled={!token}
                  {...register('confirmPassword')}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center"
                    size="md"
                    disabled={!token || resetMutation.isPending}
                    rightIcon={
                      resetMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )
                    }
                  >
                    {resetMutation.isPending ? 'Updating password…' : 'Update password'}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-2 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Password updated successfully</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Your account password has been changed. You can now sign in with your new credentials.
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    className="w-full justify-center"
                    onClick={() => navigate('/login')}
                  >
                    Proceed to sign in
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <Link
                to="/login"
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
              >
                Return to sign in
              </Link>
            </div>
          </Card>
        </div>
      </FadeIn>
    </div>
  )
}
