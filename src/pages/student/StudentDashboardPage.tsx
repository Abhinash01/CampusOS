import React from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarCheck,
  FileCheck2,
  Bell,
  Home,
  ArrowRight,
  Clock,
  MapPin,
  AlertTriangle,
  Plus,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { useAuthStore } from '@/features/auth'
import { useStudentDashboard } from '@/features/student'

export const StudentDashboardPage: React.FC = () => {
  const authUser = useAuthStore((state) => state.user)
  const { data, isLoading } = useStudentDashboard()

  const displayName = authUser?.name || data?.studentProfile.name || 'Student'
  const firstName = displayName.split(' ')[0]

  const currentHour = new Date().getHours()
  const greeting =
    currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening'

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-xl" />
      </div>
    )
  }

  const stats = data?.stats
  const attentionItems = data?.attentionItems || []
  const todayLectures = data?.todayLectures || []
  const recentRequests = data?.recentRequests || []

  return (
    <div className="space-y-7 pb-16 selection:bg-rose-100 selection:text-rose-900">
      {/* 1. Header with personalized greeting & date */}
      <FadeIn direction="down" duration={0.3}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/70 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                {greeting}, {firstName}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                <Sparkles className="w-3 h-3 text-rose-600" />
                <span>Active Semester</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 mt-1">
              Here's what needs your attention today • <span className="font-medium text-zinc-700">{formattedDate}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/app/student/requests?action=new">
              <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
                New Request
              </Button>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* 2. Attention / Priority Section */}
      {attentionItems.length > 0 && (
        <FadeIn direction="up" delay={0.05} duration={0.35}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Needs Attention
                </h2>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium">
                {attentionItems.length} actionable {attentionItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {attentionItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    item.severity === 'warning'
                      ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300'
                      : 'bg-white border-zinc-200 hover:border-rose-200 hover:shadow-subtle'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                        {item.type}
                      </span>
                      {item.severity === 'warning' && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Action</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-zinc-100/80">
                    <Link
                      to={item.actionHref}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 group"
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* 3. KPI / Summary Cards (Calm & Informative) */}
      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <StaggerItem>
          <Link to="/app/student/attendance" className="block group">
            <Card className="p-4 sm:p-5 h-full hover:border-rose-300 hover:shadow-card transition-all">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Attendance
                </span>
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2.5">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 tnum">
                  {stats?.attendancePct}%
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Healthy (+12 class margin)</span>
                </div>
              </div>
            </Card>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <Link to="/app/student/requests" className="block group">
            <Card className="p-4 sm:p-5 h-full hover:border-rose-300 hover:shadow-card transition-all">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Active Requests
                </span>
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <FileCheck2 className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2.5">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 tnum">
                  {stats?.activeRequestsCount}
                </div>
                <p className="mt-1 text-[11px] text-zinc-500 truncate">1 updated 18m ago</p>
              </div>
            </Card>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <Link to="/app/student/notices" className="block group">
            <Card className="p-4 sm:p-5 h-full hover:border-rose-300 hover:shadow-card transition-all">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Campus Notices
                </span>
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2.5">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 tnum">
                  {stats?.unreadNoticesCount}
                </div>
                <p className="mt-1 text-[11px] text-zinc-500 truncate">Exam schedule released</p>
              </div>
            </Card>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <Link to="/app/student/hostel" className="block group">
            <Card className="p-4 sm:p-5 h-full hover:border-rose-300 hover:shadow-card transition-all">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Hostel Living
                </span>
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2.5">
                <div className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 truncate">
                  {stats?.hostelRoom}
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">Curfew: 10:00 PM</p>
              </div>
            </Card>
          </Link>
        </StaggerItem>
      </StaggerContainer>

      {/* 4. Middle Dual Columns: Today's Academic Timetable & Active Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Class Schedule */}
        <div className="lg:col-span-7 space-y-4">
          <Card>
            <CardHeader className="py-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm sm:text-base font-bold text-zinc-900">
                  Today's Academic Schedule
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-0.5">3 lectures scheduled for today</p>
              </div>
              <Link to="/app/student/attendance">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Attendance Detail
                </Button>
              </Link>
            </CardHeader>

            <CardContent className="space-y-3 pt-0">
              {todayLectures.map((lec, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    lec.isNext
                      ? 'border-rose-200 bg-rose-50/40 shadow-xs'
                      : 'border-zinc-200/80 bg-white hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        lec.isNext
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      {lec.code.substring(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                          {lec.subject}
                        </h4>
                        {lec.isNext && <Badge variant="info">Upcoming</Badge>}
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        <span>{lec.room}</span>
                        <span>•</span>
                        <span>{lec.faculty}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center">
                    <span
                      className={`text-xs font-mono font-medium px-2.5 py-1 rounded-md ${
                        lec.isNext
                          ? 'bg-rose-100/80 text-rose-800 font-semibold'
                          : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      {lec.time}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Shortcuts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/app/student/attendance"
              className="p-3 bg-white border border-zinc-200 rounded-xl hover:border-rose-300 hover:shadow-subtle transition-all text-center group"
            >
              <CalendarCheck className="w-5 h-5 text-rose-600 mx-auto mb-1 group-hover:scale-105 transition-transform" />
              <div className="text-xs font-bold text-zinc-800">Attendance</div>
              <div className="text-[10px] text-zinc-400">Class breakdown</div>
            </Link>

            <Link
              to="/app/student/requests"
              className="p-3 bg-white border border-zinc-200 rounded-xl hover:border-rose-300 hover:shadow-subtle transition-all text-center group"
            >
              <FileCheck2 className="w-5 h-5 text-rose-600 mx-auto mb-1 group-hover:scale-105 transition-transform" />
              <div className="text-xs font-bold text-zinc-800">Requests</div>
              <div className="text-[10px] text-zinc-400">Track tickets</div>
            </Link>

            <Link
              to="/app/student/mess"
              className="p-3 bg-white border border-zinc-200 rounded-xl hover:border-rose-300 hover:shadow-subtle transition-all text-center group"
            >
              <Clock className="w-5 h-5 text-rose-600 mx-auto mb-1 group-hover:scale-105 transition-transform" />
              <div className="text-xs font-bold text-zinc-800">Mess Dining</div>
              <div className="text-[10px] text-zinc-400">Menu & timings</div>
            </Link>

            <Link
              to="/app/student/hostel"
              className="p-3 bg-white border border-zinc-200 rounded-xl hover:border-rose-300 hover:shadow-subtle transition-all text-center group"
            >
              <Home className="w-5 h-5 text-rose-600 mx-auto mb-1 group-hover:scale-105 transition-transform" />
              <div className="text-xs font-bold text-zinc-800">Hostel</div>
              <div className="text-[10px] text-zinc-400">Room details</div>
            </Link>
          </div>
        </div>

        {/* Right Column: Live Operational Requests */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader className="py-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm sm:text-base font-bold text-zinc-900">
                    Active Operations
                  </CardTitle>
                  <p className="text-xs text-zinc-500 mt-0.5">Real-time status of your campus tickets</p>
                </div>
                <Link to="/app/student/requests">
                  <Button variant="ghost" size="sm">
                    View all
                  </Button>
                </Link>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                {recentRequests.map((req) => (
                  <Link
                    key={req.id}
                    to="/app/student/requests"
                    className="block p-3.5 rounded-xl border border-zinc-200/90 bg-white hover:border-rose-200 hover:bg-zinc-50/50 transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-semibold text-rose-600">{req.id}</span>
                      <Badge
                        variant={
                          req.status === 'RESOLVED'
                            ? 'success'
                            : req.status === 'IN_PROGRESS'
                            ? 'warning'
                            : 'default'
                        }
                      >
                        {req.status.replace('_', ' ')}
                      </Badge>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-zinc-800 line-clamp-1 group-hover:text-rose-600 transition-colors">
                      {req.title}
                    </h4>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
                      <span>{req.assignedDepartment}</span>
                      {req.otp && req.status === 'IN_PROGRESS' ? (
                        <span className="font-mono font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                          OTP: {req.otp}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-zinc-400">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </CardContent>
            </div>

            <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 rounded-b-xl flex items-center justify-between text-xs">
              <span className="text-zinc-600">Need to report campus infrastructure damage?</span>
              <Link to="/app/student/requests?action=new" className="font-semibold text-rose-600 hover:underline">
                File Ticket →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
