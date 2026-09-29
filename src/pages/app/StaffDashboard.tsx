import React, { useState } from 'react'
import {
  Wrench,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Camera,
} from 'lucide-react'
import { MetricCard, Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { FadeIn } from '@/components/motion/FadeIn'

export const StaffDashboard: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>('TKT-1042')

  const tasks = [
    {
      id: 'TKT-1042',
      category: 'Plumbing',
      title: 'Washbasin Tap Leakage & Low Pressure',
      location: 'Hostel Block B — Room 204',
      reportedBy: 'Aarav Sharma (2201004128)',
      phone: '+91 98765 43210',
      status: 'In Progress',
      priority: 'Medium',
      slaLeft: '4h 15m remaining',
      notes: 'Water dripping continuously under the sink joint. New washer or threaded seal tape required.',
    },
    {
      id: 'TKT-1044',
      category: 'Plumbing',
      title: 'Common Washroom Flush Valve Jammed',
      location: 'Hostel Block B — 3rd Floor East Wing',
      reportedBy: 'Caretaker Ramesh',
      phone: '+91 94371 11223',
      status: 'Assigned',
      priority: 'High',
      slaLeft: '2h 30m remaining',
      notes: 'Flush tank not filling. Shut-off valve turned off temporarily.',
    },
    {
      id: 'TKT-1047',
      category: 'Sanitation',
      title: 'Balcony Drain Clogged after Rain',
      location: 'Hostel Block B — Room 112',
      reportedBy: 'Praveen S.',
      phone: '+91 98612 88990',
      status: 'Queued',
      priority: 'Low',
      slaLeft: '7h remaining',
      notes: 'Leaves clogging drainage pipe.',
    },
  ]

  const activeTask = tasks.find((t) => t.id === selectedTask) || tasks[0]

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Technician Workbench
              </h1>
              <Badge variant="success" withDot>
                On Shift Duty
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manoj Kumar • Senior Plumber • Zone: Hostel Block B & C • Shift: 08:00 AM - 05:00 PM
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-500">
              Resolved Today: <strong className="text-slate-900">3 jobs</strong>
            </span>
          </div>
        </div>
      </FadeIn>

      {/* Staff Key Metrics */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StaggerItem>
          <MetricCard
            title="Jobs Assigned Today"
            value="4 Tasks"
            caption="1 In Progress, 1 High Urgency"
            icon={Wrench}
          />
        </StaggerItem>

        <StaggerItem>
          <MetricCard
            title="SLA Compliance"
            value="100%"
            caption="Zero overdue jobs this month"
            icon={CheckCircle2}
          />
        </StaggerItem>

        <StaggerItem>
          <MetricCard
            title="Avg Job Completion"
            value="42 mins"
            caption="Mean time to fix per ticket"
            icon={Clock}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Two Column Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Task List */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-1">
            Assigned Queue (3)
          </div>
          {tasks.map((task) => (
            <Card
              key={task.id}
              onClick={() => setSelectedTask(task.id)}
              className={`p-4 cursor-pointer transition-all border ${
                selectedTask === task.id
                  ? 'border-rose-600 bg-rose-50/20 shadow-card'
                  : 'hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono font-semibold text-slate-900">{task.id}</span>
                <Badge
                  variant={
                    task.priority === 'High'
                      ? 'danger'
                      : task.status === 'In Progress'
                      ? 'warning'
                      : 'default'
                  }
                  withDot
                >
                  {task.status}
                </Badge>
              </div>
              <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{task.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{task.location}</span>
              </p>
            </Card>
          ))}
        </div>

        {/* Right 2 Columns: Selected Task Execution Card */}
        <Card className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-rose-700">
                    {activeTask.id}
                  </span>
                  <Badge variant="info">{activeTask.category}</Badge>
                  <span className="text-xs text-slate-400">• {activeTask.slaLeft}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1.5">{activeTask.title}</h3>
                <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{activeTask.location}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a href={`tel:${activeTask.phone}`}>
                  <Button variant="outline" size="sm" leftIcon={<Phone className="w-3.5 h-3.5" />}>
                    Call Student
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Student Report & Diagnosis
              </h4>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/70 leading-relaxed">
                {activeTask.notes}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg border border-slate-200 text-xs">
                <span className="text-slate-400 block text-[11px]">Reported By</span>
                <span className="font-semibold text-slate-800">{activeTask.reportedBy}</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 text-xs">
                <span className="text-slate-400 block text-[11px]">Resolution Verification</span>
                <span className="font-semibold text-slate-800">Requires 4-Digit Student OTP</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Camera className="w-4 h-4 text-slate-400" />
              <span>Attach after-repair photo</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Request Spare Part
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
              >
                Enter OTP & Mark Resolved
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
