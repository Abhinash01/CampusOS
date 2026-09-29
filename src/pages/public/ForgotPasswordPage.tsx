import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, KeyRound, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/motion/FadeIn'
import { useForgotPassword } from '@/features/auth'

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<{ message: string; resetToken?: string; resetUrl?: string } | null>(null)
  const forgotPasswordMutation = useForgotPassword()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessData(null)

    if (!email.trim()) {
      setErrorMessage('Please enter your university email address.')
      return
    }

    try {
      const response = await forgotPasswordMutation.mutateAsync({ email })
      setSuccessData({
        message: response.message,
        resetToken: response.data?.resetToken,
        resetUrl: response.data?.resetUrl,
      })
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to process password reset request.')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 bg-grid-slate radial-mask opacity-60 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <FadeIn direction="up">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-2">
            <div className="w-9 h-9 rounded-[10px] bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_1px_3px_rgba(79,70,229,0.3)] group-hover:bg-indigo-700 transition-colors">
              <KeyRound className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CampusOS</span>
          </Link>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            Reset password
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Enter your university email address to receive password reset instructions.
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

            {!successData ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="University email"
                  placeholder="name@campusos.edu"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center"
                  size="md"
                  disabled={forgotPasswordMutation.isPending}
                  rightIcon={
                    forgotPasswordMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )
                  }
                >
                  {forgotPasswordMutation.isPending ? 'Sending instructions…' : 'Send reset link'}
                </Button>
              </form>
            ) : (
              <div className="text-center py-2 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Reset instructions dispatched</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {successData.message}
                  </p>
                </div>

                {successData.resetToken && (
                  <div className="p-3.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-left text-xs space-y-2">
                    <p className="font-semibold text-indigo-950">Development Environment Notice</p>
                    <p className="text-indigo-800">
                      Reset token generated safely. You can proceed directly to complete the password reset:
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full justify-center"
                      onClick={() => navigate(`/reset-password?token=${successData.resetToken}`)}
                    >
                      Proceed to Reset Password
                    </Button>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSuccessData(null)
                      setEmail('')
                    }}
                  >
                    Enter a different email
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to sign in</span>
              </Link>
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
