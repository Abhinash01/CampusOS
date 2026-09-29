import React from 'react'
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Home,
  Heart,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { FadeIn } from '@/components/motion/FadeIn'
import { useAuthStore } from '@/features/auth'
import { useStudentProfile } from '@/features/student'

export const StudentProfilePage: React.FC = () => {
  const authUser = useAuthStore((state) => state.user)
  const { data: profile, isLoading } = useStudentProfile()

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl lg:col-span-2" />
        </div>
      </div>
    )
  }

  const name = authUser?.name || profile?.name || 'Abhinash Sharma'
  const email = authUser?.email || profile?.email || 'abhinash.sharma@campusos.edu'
  const studentId = authUser?.studentId || (authUser?._id ? `STU-${authUser._id.slice(0, 6)}` : profile?.studentId || '2201004128')

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  return (
    <div className="space-y-7 pb-16 selection:bg-rose-100 selection:text-rose-900">
      {/* Header */}
      <FadeIn>
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold mb-2">
            <User className="w-3.5 h-3.5 text-[#E11D48]" />
            Official University Identity
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Student Profile & Registry
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            Institutional academic standing, enrolled program information, and residential records.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Identity Card & Photo */}
        <div className="space-y-6">
          <Card className="border-zinc-200/80 bg-white shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-[#E11D48] via-[#BE123C] to-[#9F1239] relative">
              <div className="absolute -bottom-10 left-6">
                <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-md border border-zinc-200">
                  <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[#BE123C] to-[#F97316] flex items-center justify-center text-white font-bold text-2xl tracking-wider">
                    {initials}
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="pt-12 pb-6 px-6 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-zinc-900">{name}</h2>
                  <Badge variant="info" className="text-[10px] font-semibold">
                    Enrolled
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">ID: {studentId}</p>
                <p className="text-xs text-zinc-600 mt-1 font-medium">{profile?.department}</p>
              </div>

              <div className="pt-4 border-t border-zinc-100 space-y-2.5 text-xs text-zinc-600">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span className="font-mono text-[11px] truncate">{email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span className="font-mono text-[11px]">{profile?.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Blood Group: <strong className="text-zinc-800">{profile?.bloodGroup}</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center gap-1.5 text-[11px] text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Digitally Verified University Identity</span>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-zinc-200/80 bg-white shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100">
              <CardTitle className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                Emergency Contact (Parent/Guardian)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Contact Person</span>
                <span className="font-semibold text-zinc-900">{profile?.emergencyContact.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Relationship</span>
                <span className="text-zinc-800">{profile?.emergencyContact.relation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Contact Number</span>
                <span className="font-mono text-zinc-900 font-medium">
                  {profile?.emergencyContact.phone}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Columns: Academic Standing & Residential Allocation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Standing */}
          <Card className="border-zinc-200/80 bg-white shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#E11D48]" />
                  Academic Enrollment & Standing
                </CardTitle>
                <Badge variant="success" className="text-[10px] uppercase font-bold">
                  {profile?.academicStanding.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-zinc-50/80 border border-zinc-200/70 mb-5">
                <div>
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Cumulative CGPA
                  </span>
                  <span className="text-2xl font-bold text-zinc-900 font-mono">
                    {profile?.academicStanding.cgpa}
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">Scale of 10.0</span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Active Backlogs
                  </span>
                  <span className="text-2xl font-bold text-emerald-600 font-mono">
                    {profile?.academicStanding.backlogs}
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">Clean Record</span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Current Semester
                  </span>
                  <span className="text-2xl font-bold text-zinc-900">
                    {profile?.semester}
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">Even Sem 2026</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 p-3 rounded-lg border border-zinc-100 bg-white">
                  <span className="text-zinc-400 block font-medium">Degree Program</span>
                  <span className="font-semibold text-zinc-900">{profile?.course}</span>
                </div>
                <div className="space-y-1 p-3 rounded-lg border border-zinc-100 bg-white">
                  <span className="text-zinc-400 block font-medium">Department</span>
                  <span className="font-semibold text-zinc-900">{profile?.department}</span>
                </div>
                <div className="space-y-1 p-3 rounded-lg border border-zinc-100 bg-white">
                  <span className="text-zinc-400 block font-medium">Year of Admission</span>
                  <span className="font-semibold text-zinc-900">{profile?.admissionYear}</span>
                </div>
                <div className="space-y-1 p-3 rounded-lg border border-zinc-100 bg-white">
                  <span className="text-zinc-400 block font-medium">Degree Completion Target</span>
                  <span className="font-semibold text-zinc-900">June 2026</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hostel Residential Details */}
          <Card className="border-zinc-200/80 bg-white shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100">
              <CardTitle className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                <Home className="w-4 h-4 text-[#E11D48]" />
                Hostel Residence Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/60">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Assigned Hostel
                  </span>
                  <span className="text-sm font-bold text-zinc-900 mt-1 block">
                    {profile?.hostel.block}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/60">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Room Number
                  </span>
                  <span className="text-sm font-bold text-zinc-900 mt-1 block font-mono">
                    Room {profile?.hostel.room}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/60">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Allocated Bed
                  </span>
                  <span className="text-sm font-bold text-zinc-900 mt-1 block">
                    {profile?.hostel.bed}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p>
                  Institutional identity, roll numbers, and official branch enrollments are managed centrally by the Office of the Registrar. For modifications, please submit a verified document clearance request.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
