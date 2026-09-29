import React from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarCheck,
  KeyRound,
  Wrench,
  Utensils,
  ArrowRight,
  FileCheck2,
  MapPin,
} from 'lucide-react'
import { MetricCard, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { FadeIn } from '@/components/motion/FadeIn'
import { useAuthStore } from '@/features/auth'

export const StudentDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user)
  const displayName = user?.name || 'Student'
  const displayId = user?.studentId || '2201004128'

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome Identity */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Welcome back, {displayName}
              </h1>
              <Badge variant="success" withDot>
                Active Resident
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Roll No: <span className="font-mono font-medium text-slate-700">{displayId}</span> •
              B.Tech Computer Science (Sem 6) • Hostel Block B, Room 204
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/app/student/gate-pass">
              <Button size="sm" variant="outline" leftIcon={<KeyRound className="w-3.5 h-3.5" />}>
                Request Pass
              </Button>
            </Link>
            <Link to="/app/student/complaints">
              <Button size="sm" variant="primary" leftIcon={<Wrench className="w-3.5 h-3.5" />}>
                Report Issue
              </Button>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Key Operational Metrics */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StaggerItem>
          <MetricCard
            title="Attendance"
            value="88.4%"
            change="+2.1%"
            isPositive={true}
            caption="12 classes safe to skip"
            icon={CalendarCheck}
          />
        </StaggerItem>

        <StaggerItem>
          <MetricCard
            title="Gate Pass Status"
            value="Approved"
            caption="Expires today at 9:30 PM"
            icon={KeyRound}
          />
        </StaggerItem>

        <StaggerItem>
          <MetricCard
            title="Active Complaints"
            value="1 Open"
            caption="Plumbing: Assigned to Tech"
            icon={Wrench}
          />
        </StaggerItem>

        <StaggerItem>
          <MetricCard
            title="Mess Rating"
            value="4.6 / 5.0"
            caption="Lunch: Paneer Butter Masala"
            icon={Utensils}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Main Grid: Today's Schedule & Active Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Schedule & Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Classes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div>
                <CardTitle>Today&apos;s Academic Schedule</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Tuesday, 29 Sep • 4 lectures scheduled</p>
              </div>
              <Link to="/app/student/timetable">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Full Week
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between p-3.5 rounded-lg border border-rose-100 bg-rose-50/40">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    CS
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">
                        Distributed Systems (CS601)
                      </span>
                      <Badge variant="info">In 35 mins</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Lecture Hall 302 • Dr. R. K. Nayak</span>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-medium text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md">
                  10:30 AM
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    CS
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900">
                      Compiler Design Lab (CS602L)
                    </span>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Software Lab 3 • Prof. S. Panda</span>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                  02:00 PM
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Active Operational Tickets & Gate Pass */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div>
                <CardTitle>Recent Requests & Maintenance</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Track resolution status in real time</p>
              </div>
              <Link to="/app/student/complaints">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="divide-y divide-slate-100 p-0">
              <div className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      Plumbing: Washbasin Tap Leakage
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Ticket #TKT-1042 • Block B, Room 204 • Tech Manoj Kumar dispatched
                    </div>
                  </div>
                </div>
                <Badge variant="warning" withDot>
                  In Progress
                </Badge>
              </div>

              <div className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      Bona Fide Certificate Request
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Req #REQ-8924 • Purpose: Passport Application • Signed by Dean
                    </div>
                  </div>
                </div>
                <Badge variant="success" withDot>
                  Ready for Download
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Mess Preview & Urgent Notices */}
        <div className="space-y-6">
          {/* Today's Mess Dining */}
          <Card>
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <CardTitle>Today&apos;s Mess Menu</CardTitle>
                <Badge variant="info">Lunch Active</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Hostel Block B Central Mess</p>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>Lunch (12:30 PM - 02:30 PM)</span>
                  <span className="text-[11px] text-emerald-600 font-normal">Special Feast</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Paneer Butter Masala, Dal Tadka, Jeera Rice, Chapati, Boondi Raita, Gulab Jamun
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                  <span>Dinner (07:30 PM - 09:30 PM)</span>
                  <span className="text-[10px] text-slate-400">Regular</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Aloo Gobhi Matar, Yellow Dal, Steamed Rice, Tawa Roti, Salad
                </p>
              </div>

              <div className="pt-2">
                <Link to="/app/student/mess">
                  <Button variant="outline" size="sm" className="w-full">
                    Rate Today&apos;s Food & View Weekly Menu
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Urgent Notices Widget */}
          <Card>
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <CardTitle>Official Notices</CardTitle>
                <span className="text-[11px] text-rose-600 font-semibold cursor-pointer">
                  2 unread
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0 text-xs">
              <div className="p-3 rounded-lg border-l-2 border-rose-600 bg-rose-50/30">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Dean Academic</span>
                  <span>Today, 09:15 AM</span>
                </div>
                <p className="font-semibold text-slate-900 leading-tight">
                  Mid-Semester Examination Schedule for 6th Sem B.Tech Released
                </p>
              </div>

              <div className="p-3 rounded-lg border-l-2 border-amber-500 bg-amber-50/30">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Hostel Warden Office</span>
                  <span>Yesterday</span>
                </div>
                <p className="font-semibold text-slate-900 leading-tight">
                  Mandatory Room Inspection on Saturday 10:00 AM
                </p>
              </div>

              <Link to="/app/student/notices">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Open Notice Board
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
