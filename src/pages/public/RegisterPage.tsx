import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Lock, Mail, User, Phone, IdCard, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/motion/FadeIn'
import { useRegister, useAuthStore } from '@/features/auth'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Full name must be at least 2 characters'),
    studentId: z.string().min(3, 'Student ID must be at least 3 characters'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid university email address'),
    phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export const RegisterPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const registerMutation = useRegister()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/student', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      studentId: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    setErrorMessage(null)
    try {
      await registerMutation.mutateAsync({
        name: values.name,
        studentId: values.studentId,
        email: values.email,
        phone: values.phone,
        password: values.password,
      })
      navigate('/app/student', { replace: true })
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to complete registration. Please verify details.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-100 selection:text-indigo-900">
      <FadeIn direction="up">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
          <Link to="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:bg-indigo-700 transition-colors">
              OS
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CampusOS</span>
          </Link>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            Create student account
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Enroll to access your academic attendance, hostel services, and requests.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <Card className="py-8 px-6 sm:px-10 border-slate-200 shadow-xs bg-white rounded-xl">
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <div className="font-medium">{errorMessage}</div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  leftIcon={<User className="w-4 h-4 text-slate-400" />}
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  label="Student ID / Roll No"
                  type="text"
                  placeholder="e.g. 2201004128"
                  leftIcon={<IdCard className="w-4 h-4 text-slate-400" />}
                  error={errors.studentId?.message}
                  {...register('studentId')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Campus email"
                  type="email"
                  placeholder="student@campusos.edu"
                  leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Input
                  label="Phone number"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  type="password"
                  placeholder="At least 6 characters"
                  leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                  error={errors.password?.message}
                  {...register('password')}
                />

                <Input
                  label="Confirm password"
                  type="password"
                  placeholder="Re-enter password"
                  leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
              </div>

              <div className="pt-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center"
                  size="md"
                  disabled={registerMutation.isPending}
                  rightIcon={
                    registerMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )
                  }
                >
                  {registerMutation.isPending ? 'Creating account…' : 'Register account'}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-600">
                Already registered?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Sign in to your account
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
