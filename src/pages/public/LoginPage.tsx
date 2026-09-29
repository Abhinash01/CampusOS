import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, User, Info } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/motion/FadeIn'
import { useAppStore } from '@/stores/appStore'
import type { UserRole } from '@/types'

export const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student')
  const [identifier, setIdentifier] = useState('2201004128')
  const [password, setPassword] = useState('••••••••••••')
  const setRole = useAppStore((state) => state.setRole)
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setRole(selectedRole)
    navigate(`/app/${selectedRole}`)
  }

  const roleConfigs: { id: UserRole; label: string; sampleId: string }[] = [
    { id: 'student', label: 'Student', sampleId: '2201004128' },
    { id: 'admin', label: 'Admin', sampleId: 'ADM-8902' },
    { id: 'warden', label: 'Warden', sampleId: 'WRD-104' },
    { id: 'staff', label: 'Staff', sampleId: 'STF-554' },
  ]

  const onSelectRole = (r: UserRole) => {
    setSelectedRole(r)
    const conf = roleConfigs.find((c) => c.id === r)
    if (conf) setIdentifier(conf.sampleId)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-indigo-100 selection:text-indigo-900">
      <FadeIn direction="up">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="mx-auto w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
            OS
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Sign in to CampusOS
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            The unified operating layer for campus life
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
          <Card className="py-8 px-6 sm:px-10 border-slate-200 shadow-elevated">
            {/* Persona Switcher Tabs */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Select Persona to Preview
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-lg">
                {roleConfigs.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => onSelectRole(role.id)}
                    className={`text-xs py-1.5 font-medium rounded-md transition-colors ${
                      selectedRole === role.id
                        ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="University Identifier / Roll Number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                required
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center text-slate-600">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Remember on this device</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Enter as {roleConfigs.find((r) => r.id === selectedRole)?.label}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 text-xs text-slate-600">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold text-slate-800">Phase 0 Architecture Notice:</span>{' '}
                  Stateless UI mode. Clicking enter initializes the authentic{' '}
                  <span className="font-mono text-indigo-700">{selectedRole}</span> application shell.
                  Full Node.js + JWT authentication integrates in Phase 1.
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-6 text-center text-xs text-slate-500">
            <Link to="/" className="text-slate-600 hover:text-slate-900 font-medium">
              ← Return to Landing Page
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
