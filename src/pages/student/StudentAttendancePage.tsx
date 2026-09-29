import React, { useState } from 'react'
import {
  CalendarCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  User,
  BookOpen,
} from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { FadeIn } from '@/components/motion/FadeIn'
import { useAttendanceSummary, type SubjectAttendance } from '@/features/student'

export const StudentAttendancePage: React.FC = () => {
  const { data, isLoading } = useAttendanceSummary()
  const [selectedSubject, setSelectedSubject] = useState<SubjectAttendance | null>(null)

  if (isLoading || !data) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-8 w-60" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    )
  }

  const { overallPercentage, totalPresent, totalAbsent, totalClasses, safeToSkipClasses, subjects } =
    data

  return (
    <div className="space-y-7 pb-16 selection:bg-rose-100 selection:text-rose-900">
      {/* 1. Header */}
      <FadeIn direction="down" duration={0.3}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200/70 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                Attendance Records
              </h1>
              <Badge variant="info">Even Sem 2026</Badge>
            </div>
            <p className="text-sm text-zinc-500 mt-1">
              Lecture confirmations, subject-wise attendance, and minimum statutory compliance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200">
              Statutory Requirement: <strong className="text-zinc-800">75.0%</strong>
            </span>
          </div>
        </div>
      </FadeIn>

      {/* 2. Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Overall Percentage Card */}
        <Card className="p-5 border-zinc-200/90 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Overall Percentage
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-extrabold tracking-tight text-zinc-900 tnum">
                {overallPercentage}%
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Healthy
              </span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-rose-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(overallPercentage, 100)}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Classes Attended Breakdown */}
        <Card className="p-5 border-zinc-200/90 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Classes Breakdown
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-zinc-900 tnum">
              {totalPresent}{' '}
              <span className="text-sm font-normal text-zinc-500">of {totalClasses} classes</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs text-zinc-600">
              <span className="flex items-center gap-1 font-medium text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                {totalPresent} Present
              </span>
              <span className="flex items-center gap-1 font-medium text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                {totalAbsent} Absent
              </span>
            </div>
          </div>
        </Card>

        {/* Safe Margin / Skip Calculator */}
        <Card className="p-5 border-zinc-200/90 shadow-subtle flex flex-col justify-between bg-gradient-to-br from-white to-rose-50/20">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Safe Margin Buffer
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-zinc-900 tnum">
              +{safeToSkipClasses}{' '}
              <span className="text-sm font-normal text-zinc-600">classes safe margin</span>
            </div>
            <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
              You can afford to miss up to {safeToSkipClasses} lectures cumulatively while staying above the 75% examination threshold.
            </p>
          </div>
        </Card>
      </div>

      {/* 3. Subject-wise Attendance Table (Desktop) & Cards (Mobile) */}
      <Card className="overflow-hidden">
        <CardHeader className="py-4 px-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base font-bold text-zinc-900">
              Subject-wise Breakdown
            </CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              Click on any subject to inspect historical dates and lecture logs.
            </p>
          </div>
          <span className="text-xs text-zinc-500">
            {subjects.length} Registered Courses
          </span>
        </CardHeader>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/70 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                <th className="py-3 px-6">Subject & Code</th>
                <th className="py-3 px-4">Faculty</th>
                <th className="py-3 px-4 text-center">Attended</th>
                <th className="py-3 px-4 text-center">Total</th>
                <th className="py-3 px-4">Attendance %</th>
                <th className="py-3 px-4">Status & Margin</th>
                <th className="py-3 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {subjects.map((subj) => (
                <tr
                  key={subj.id}
                  onClick={() => setSelectedSubject(subj)}
                  className="hover:bg-rose-50/30 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-6">
                    <div className="font-bold text-zinc-900 group-hover:text-rose-600 transition-colors">
                      {subj.name}
                    </div>
                    <div className="font-mono text-[11px] text-zinc-400 mt-0.5">{subj.code}</div>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{subj.faculty}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-zinc-800 tnum">
                    {subj.present}
                  </td>
                  <td className="py-3.5 px-4 text-center text-zinc-500 tnum">{subj.total}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-zinc-900 tnum min-w-[42px]">
                        {subj.percentage}%
                      </span>
                      <div className="w-24 bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            subj.percentage < 75 ? 'bg-amber-500' : 'bg-rose-600'
                          }`}
                          style={{ width: `${Math.min(subj.percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {subj.percentage < 75 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span>Need {subj.classesNeededFor75} classes</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200">
                        <span>Safe (+{subj.safeToSkipClasses})</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Responsive Cards View */}
        <div className="md:hidden divide-y divide-zinc-100">
          {subjects.map((subj) => (
            <div
              key={subj.id}
              onClick={() => setSelectedSubject(subj)}
              className="p-4 hover:bg-zinc-50 transition-colors cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] text-zinc-400 block">{subj.code}</span>
                  <h3 className="text-sm font-bold text-zinc-900">{subj.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{subj.faculty}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-zinc-900 tnum">{subj.percentage}%</div>
                  <Badge variant={subj.percentage < 75 ? 'warning' : 'success'}>
                    {subj.percentage < 75 ? 'Below 75%' : 'Safe'}
                  </Badge>
                </div>
              </div>

              <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full ${
                    subj.percentage < 75 ? 'bg-amber-500' : 'bg-rose-600'
                  }`}
                  style={{ width: `${Math.min(subj.percentage, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                <span>
                  Present: <strong className="text-zinc-800">{subj.present}</strong> / {subj.total}
                </span>
                <span className="text-rose-600 font-medium flex items-center gap-1">
                  History <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Subject Detail Modal */}
      {selectedSubject && (
        <Modal
          isOpen={Boolean(selectedSubject)}
          onClose={() => setSelectedSubject(null)}
          title={selectedSubject.name}
          maxWidth="lg"
        >
          <div className="space-y-5">
            {/* Subject Summary Header */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {selectedSubject.code}
                  </span>
                  <span className="text-xs text-zinc-600 font-medium">
                    Faculty: {selectedSubject.faculty}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-2xl font-extrabold text-zinc-900 tnum">
                    {selectedSubject.percentage}%
                  </span>
                  <span className="text-xs text-zinc-500">
                    {selectedSubject.present} attended of {selectedSubject.total} classes
                  </span>
                </div>
              </div>

              <div>
                {selectedSubject.percentage < 75 ? (
                  <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-2.5 rounded-lg">
                    Must attend next <strong>{selectedSubject.classesNeededFor75}</strong> classes consecutively to regain 75%.
                  </div>
                ) : (
                  <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg">
                    Safe margin: Can miss up to <strong>{selectedSubject.safeToSkipClasses}</strong> classes without violation.
                  </div>
                )}
              </div>
            </div>

            {/* Recent Attendance Class Logs */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Recent Lecture Log
                </h4>
                <span className="text-[11px] text-zinc-400">Last 5 confirmed classes</span>
              </div>

              <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-xl overflow-hidden bg-white">
                {selectedSubject.recentHistory.map((rec, i) => (
                  <div key={i} className="p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-zinc-400 w-16">
                        {rec.date} ({rec.day})
                      </span>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-zinc-800 font-medium">{rec.topic || 'Regular Lecture'}</span>
                      </div>
                    </div>

                    <div>
                      {rec.status === 'PRESENT' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Present</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          <span>Absent</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedSubject(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
