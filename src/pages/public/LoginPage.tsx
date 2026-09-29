import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/motion/FadeIn'
import { useLogin, useAuthStore } from '@/features/auth'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid campus email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const loginMutation = useLogin()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated && user) {
      const from = (location.state as any)?.from?.pathname || `/app/${user.role.toLowerCase()}`
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, user, navigate, location])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setErrorMessage(null)
    try {
      const loggedInUser = await loginMutation.mutateAsync(values)
      const destination = `/app/${loggedInUser.role.toLowerCase()}`
      navigate(destination, { replace: true })
    } catch (err: any) {
      setErrorMessage(err.message || 'Email or password is incorrect.')
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
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Sign in to continue to your campus workspace.
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  label="Email address"
                  type="email"
                  placeholder="name@campusos.edu"
                  leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>

              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-slate-600">Remember on this device</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-medium text-rose-600 hover:text-rose-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center"
                  size="md"
                  disabled={loginMutation.isPending}
                  rightIcon={
                    loginMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )
                  }
                >
                  {loginMutation.isPending ? 'Signing you in…' : 'Sign in'}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-rose-600 hover:text-rose-700 hover:underline"
                >
                  Create student account
                </Link>
              </p>
            </div>
          </Card>

          <div className="mt-6 text-center text-xs text-slate-500">
            <Link to="/" className="text-slate-500 hover:text-slate-800 font-medium">
              ← Return to Landing Page
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
