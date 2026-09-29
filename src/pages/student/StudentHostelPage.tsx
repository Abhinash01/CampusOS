import React from 'react'
import { Link } from 'react-router-dom'
import {
  Home,
  Users,
  Shield,
  Clock,
  Phone,
  Plus,
  CheckCircle2,
  PackageCheck,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { FadeIn } from '@/components/motion/FadeIn'
import { useHostelInfo, useStudentRequests } from '@/features/student'

export const StudentHostelPage: React.FC = () => {
  const { data: hostel, isLoading: isHostelLoading } = useHostelInfo()
  const { data: allRequests, isLoading: isRequestsLoading } = useStudentRequests({
    category: 'HOSTEL',
  })

  if (isHostelLoading || !hostel) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-8 w-60" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    )
  }

  const activeHostelRequests = (allRequests || []).filter((r) => r.status !== 'RESOLVED')

  return (
    <div className="space-y-7 pb-16 selection:bg-rose-100 selection:text-rose-900">
      {/* 1. Header */}
      <FadeIn direction="down" duration={0.3}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/70 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                Hostel Living & Services
              </h1>
              <Badge variant="info">Resident Scholar</Badge>
            </div>
            <p className="text-sm text-zinc-500 mt-1">
              Room allocation records, roommate directory, gate pass authorizations, and facility issues.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/app/student/requests?action=new">
              <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
                Report Hostel Issue
              </Button>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* 2. Room Allocation KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Allocated Room Card */}
        <Card className="p-5 border-zinc-200/90 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Allocated Room
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold tracking-tight text-zinc-900">
              Room {hostel.roomNumber}
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              {hostel.block} • <strong className="text-zinc-700">{hostel.bedNumber}</strong>
            </p>
          </div>
        </Card>

        {/* Hostel Administration Contact */}
        <Card className="p-5 border-zinc-200/90 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Hostel Warden
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-base font-bold text-zinc-900">{hostel.wardenName}</div>
            <p className="text-xs text-zinc-500 mt-0.5">{hostel.wardenRole}</p>
            <div className="mt-2 text-[11px] text-zinc-600 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-zinc-400" />
              <span>{hostel.wardenPhone}</span>
            </div>
          </div>
        </Card>

        {/* Curfew & Security Status */}
        <Card className="p-5 border-zinc-200/90 shadow-subtle flex flex-col justify-between bg-gradient-to-br from-white to-rose-50/20">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Night Curfew
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-zinc-900">
              {hostel.curfewTime}
            </div>
            <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
              Biometric check required between 09:00 PM and 10:00 PM.
            </p>
          </div>
        </Card>
      </div>

      {/* 3. Middle Dual Section: Roommates & Digital Gate Pass */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Roommates & Room Assets */}
        <div className="lg:col-span-7 space-y-6">
          {/* Roommates Directory */}
          <Card>
            <CardHeader className="py-4 border-b border-zinc-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-zinc-900">
                  Roommates Directory
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-0.5">3-seater room allocation</p>
              </div>
              <Users className="w-4 h-4 text-zinc-400" />
            </CardHeader>

            <CardContent className="divide-y divide-zinc-100 p-0">
              {hostel.roommates.map((rm, i) => (
                <div key={i} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-700">
                      {rm.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900">{rm.name}</h4>
                      <p className="text-xs text-zinc-500">
                        {rm.branch} • Roll: <span className="font-mono">{rm.rollNo}</span>
                      </p>
                    </div>
                  </div>
                  <Badge variant="default">{rm.bedNumber}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Room Inventory & Asset Audit */}
          <Card>
            <CardHeader className="py-4 border-b border-zinc-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-zinc-900">
                  Room Inventory Audit
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-0.5">Assigned furniture and room fixtures</p>
              </div>
              <PackageCheck className="w-4 h-4 text-zinc-400" />
            </CardHeader>

            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {hostel.roomInventory.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-zinc-200/80 bg-zinc-50/50 flex flex-col justify-between"
                  >
                    <span className="font-semibold text-zinc-800">{item.item}</span>
                    <span className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{item.condition}</span>
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Gate Pass & Active Hostel Requests */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Gate Pass Card */}
          {hostel.activeGatePass && (
            <Card className="border-rose-200/80 shadow-subtle bg-gradient-to-br from-white to-rose-50/30">
              <CardHeader className="py-4 border-b border-rose-100 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-zinc-900">
                    Active Gate Pass
                  </CardTitle>
                  <p className="text-xs text-zinc-500 mt-0.5 font-mono">{hostel.activeGatePass.id}</p>
                </div>
                <Badge variant="success">Approved</Badge>
              </CardHeader>

              <CardContent className="p-5 space-y-3.5 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[11px] font-semibold uppercase tracking-wider">
                    Purpose / Reason
                  </span>
                  <p className="font-bold text-zinc-900 text-sm mt-0.5">
                    {hostel.activeGatePass.reason}
                  </p>
                  <p className="text-zinc-600 mt-0.5">
                    Destination: {hostel.activeGatePass.destination}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 bg-white border border-rose-100 rounded-lg">
                  <div>
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">Exit Window</span>
                    <p className="font-medium text-zinc-800">{hostel.activeGatePass.outTime}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">Return Before</span>
                    <p className="font-medium text-zinc-800">{hostel.activeGatePass.inTime}</p>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 pt-1 border-t border-rose-100 flex items-center justify-between">
                  <span>Authorized by:</span>
                  <span className="font-semibold text-zinc-700">{hostel.activeGatePass.approvedBy}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Hostel Maintenance Tickets */}
          <Card>
            <CardHeader className="py-4 border-b border-zinc-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-zinc-900">
                  Hostel Tickets
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-0.5">Open room maintenance and repair issues</p>
              </div>
              <Link to="/app/student/requests">
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </Link>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              {isRequestsLoading ? (
                <Skeleton className="h-20 rounded-lg" />
              ) : activeHostelRequests.length === 0 ? (
                <div className="py-6 text-center text-xs text-zinc-400">
                  No pending hostel maintenance tickets.
                </div>
              ) : (
                activeHostelRequests.map((req) => (
                  <Link
                    key={req.id}
                    to="/app/student/requests"
                    className="block p-3 rounded-lg border border-zinc-200/90 bg-zinc-50/50 hover:bg-rose-50/30 hover:border-rose-200 transition-all text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-rose-600">{req.id}</span>
                      <Badge variant="warning">{req.status.replace('_', ' ')}</Badge>
                    </div>
                    <p className="font-semibold text-zinc-800 line-clamp-1">{req.title}</p>
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                      <span>{req.assignedTo || req.assignedDepartment}</span>
                      {req.otp && <span className="font-mono font-bold text-rose-700">OTP {req.otp}</span>}
                    </div>
                  </Link>
                ))
              )}

              <div className="pt-2">
                <Link to="/app/student/requests?action=new">
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Report Room Maintenance Issue
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
