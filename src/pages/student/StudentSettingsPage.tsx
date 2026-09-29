import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Settings,
  Lock,
  Bell,
  Palette,
  Shield,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  User,
  KeyRound,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { FadeIn } from '@/components/motion/FadeIn'
import { useAuthStore } from '@/features/auth'
import { useToast } from '@/components/ui/Toast'

export const StudentSettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { showToast } = useToast()

  // Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // Notification toggles
  const [notifications, setNotifications] = useState({
    attendanceWarnings: true,
    requestStatusUpdates: true,
    urgentCirculars: true,
    messMenuUpdates: false,
    emailDigests: true,
  })

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSuccess(false)

    if (!currentPassword) {
      setPasswordError('Please provide your current account password.')
      return
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must contain at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.')
      return
    }

    setPasswordLoading(true)

    // Simulate API update
    setTimeout(() => {
      setPasswordLoading(false)
      setPasswordSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      showToast({
        title: 'Password updated',
        description: 'Your account credentials have been securely updated.',
        type: 'success',
      })
    }, 600)
  }

  const handleLogout = async () => {
    await logout()
    showToast({
      title: 'Signed out',
      description: 'You have been safely disconnected from CampusOS.',
      type: 'info',
    })
    navigate('/login')
  }

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      showToast({
        title: 'Preferences saved',
        description: 'Notification preference updated.',
        type: 'success',
      })
      return next
    })
  }

  return (
    <div className="space-y-7 pb-16 selection:bg-rose-100 selection:text-rose-900">
      {/* Header */}
      <FadeIn>
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5 text-[#E11D48]" />
            Security & Preferences
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Account Settings
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            Manage your credentials, notification channels, institutional appearance, and active sessions.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Navigation/Overview) */}
        <div className="space-y-6">
          <Card className="border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#BE123C] to-[#F97316] flex items-center justify-center text-white font-bold text-lg">
                {user?.name?.[0] || 'S'}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-zinc-900 truncate">{user?.name || 'Student'}</h3>
                <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                <Badge variant="info" className="text-[10px] mt-1 font-semibold uppercase">
                  {user?.role || 'STUDENT'}
                </Badge>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 text-xs text-zinc-500 space-y-1.5">
              <div className="flex justify-between">
                <span>Account Status:</span>
                <span className="font-semibold text-emerald-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Session:</span>
                <span className="font-mono text-zinc-700">Authenticated via JWT</span>
              </div>
            </div>
          </Card>

          {/* Quick links to profile */}
          <Card className="border-zinc-200/80 bg-white p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Identity Management
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              To review academic enrollment, hostel room allocations, or emergency contact records, visit your verified registry profile.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/app/student/profile')}
              className="w-full text-xs gap-2"
            >
              <User className="w-3.5 h-3.5" />
              <span>View Student Profile</span>
            </Button>
          </Card>

          {/* Danger zone / Logout */}
          <Card className="border-rose-200/80 bg-rose-50/30 p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#E11D48]" />
              Account Session
            </h4>
            <p className="text-xs text-zinc-600">
              Sign out from this terminal when using a public campus computer or shared lab terminal.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full text-xs gap-2 text-rose-700 border-rose-300 hover:bg-rose-100 hover:text-rose-900 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of CampusOS</span>
            </Button>
          </Card>
        </div>

        {/* Right Columns: Security & Preferences */}
        <div className="lg:col-span-2 space-y-6">
          {/* Change Password */}
          <Card className="border-zinc-200/80 bg-white shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100">
              <CardTitle className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#E11D48]" />
                Password & Authentication Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                {passwordError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{passwordError}</span>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Your password has been changed successfully.</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Current Password
                  </label>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="text-xs bg-zinc-50 border-zinc-200 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                    New Password (Min 8 characters)
                  </label>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="text-xs bg-zinc-50 border-zinc-200 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Confirm New Password
                  </label>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    className="text-xs bg-zinc-50 border-zinc-200 focus:bg-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-zinc-500 hover:text-zinc-800 inline-flex items-center gap-1.5"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPassword ? 'Hide characters' : 'Show characters'}</span>
                  </button>

                  <Button
                    type="submit"
                    disabled={passwordLoading}
                    size="sm"
                    className="bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-medium"
                  >
                    <KeyRound className="w-3.5 h-3.5 mr-1.5" />
                    {passwordLoading ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="border-zinc-200/80 bg-white shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100">
              <CardTitle className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#E11D48]" />
                Campus Notification Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 divide-y divide-zinc-100 text-xs">
              <div className="py-3 flex items-center justify-between first:pt-0">
                <div className="pr-4">
                  <span className="font-semibold text-zinc-900 block">Attendance Threshold Warnings</span>
                  <span className="text-zinc-500 text-[11px] block mt-0.5">
                    Receive immediate notifications when subject attendance drops near or below 75%.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.attendanceWarnings}
                  onChange={() => toggleNotification('attendanceWarnings')}
                  className="w-4 h-4 text-[#E11D48] rounded border-zinc-300 focus:ring-[#E11D48]"
                />
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="pr-4">
                  <span className="font-semibold text-zinc-900 block">Request Lifecycle Updates</span>
                  <span className="text-zinc-500 text-[11px] block mt-0.5">
                    Real-time status updates when maintenance or certificates transition to Assigned or Resolved.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.requestStatusUpdates}
                  onChange={() => toggleNotification('requestStatusUpdates')}
                  className="w-4 h-4 text-[#E11D48] rounded border-zinc-300 focus:ring-[#E11D48]"
                />
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="pr-4">
                  <span className="font-semibold text-zinc-900 block">Urgent Official Circulars</span>
                  <span className="text-zinc-500 text-[11px] block mt-0.5">
                    High-priority notices issued by the Exam Cell or Office of the Chief Warden.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.urgentCirculars}
                  onChange={() => toggleNotification('urgentCirculars')}
                  className="w-4 h-4 text-[#E11D48] rounded border-zinc-300 focus:ring-[#E11D48]"
                />
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="pr-4">
                  <span className="font-semibold text-zinc-900 block">Daily Mess Special Alerts</span>
                  <span className="text-zinc-500 text-[11px] block mt-0.5">
                    Alerts when special dinners or weekend dining variations are served.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.messMenuUpdates}
                  onChange={() => toggleNotification('messMenuUpdates')}
                  className="w-4 h-4 text-[#E11D48] rounded border-zinc-300 focus:ring-[#E11D48]"
                />
              </div>

              <div className="py-3 flex items-center justify-between last:pb-0">
                <div className="pr-4">
                  <span className="font-semibold text-zinc-900 block">Weekly Digest Email</span>
                  <span className="text-zinc-500 text-[11px] block mt-0.5">
                    Consolidated summary of week's attendance, resolved requests, and upcoming exams.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailDigests}
                  onChange={() => toggleNotification('emailDigests')}
                  className="w-4 h-4 text-[#E11D48] rounded border-zinc-300 focus:ring-[#E11D48]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Fixed Campus Coral Theme Statement */}
          <Card className="border-zinc-200/80 bg-white shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100">
              <CardTitle className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#E11D48]" />
                Institutional Design & Theme
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#E11D48] border border-rose-300" />
                  <div>
                    <span className="font-bold text-zinc-900 block">Campus Coral (Production)</span>
                    <span className="text-[11px] text-zinc-500">Official CampusOS Institutional Palette</span>
                  </div>
                </div>
                <Badge variant="info" className="text-[10px] font-semibold">
                  Standardized
                </Badge>
              </div>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                CampusOS appearance is fixed to the institutional Campus Coral design system (<strong className="text-zinc-700">#E11D48</strong>) for brand consistency, high contrast accessibility, and WCAG AA compliance across all university endpoints.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
