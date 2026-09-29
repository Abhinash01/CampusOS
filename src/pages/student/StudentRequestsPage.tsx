import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Plus,
  Search,
  CheckCircle2,
  MapPin,
  Building,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { Modal } from '@/components/ui/Modal'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/feedback/EmptyState'
import { FadeIn } from '@/components/motion/FadeIn'
import { useToast } from '@/components/ui/Toast'
import {
  useStudentRequests,
  useCreateStudentRequest,
  type StudentRequest,
  type RequestCategory,
  type RequestPriority,
} from '@/features/student'

const createRequestSchema = z.object({
  category: z.enum([
    'HOSTEL',
    'MAINTENANCE',
    'MESS',
    'CERTIFICATE',
    'GATE_PASS',
    'ACADEMIC',
    'OTHER',
  ]),
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(10, 'Please provide more details (at least 10 characters)'),
  location: z.string().min(2, 'Please specify location (e.g. Block B, Room 204)'),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']),
})

type CreateRequestFormValues = z.infer<typeof createRequestSchema>

export const StudentRequestsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { showToast } = useToast()

  const [statusFilter, setStatusFilter] = useState('ALL')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRequest, setSelectedRequest] = useState<StudentRequest | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const { data: requests, isLoading } = useStudentRequests({
    status: statusFilter,
    category: categoryFilter,
  })
  const createMutation = useCreateStudentRequest()

  // Handle URL action=new to open modal automatically (e.g. when linked from dashboard or hostel)
  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      setIsCreateModalOpen(true)
      // Clean up param
      const nextParams = new URLSearchParams(searchParams)
      nextParams.delete('action')
      setSearchParams(nextParams, { replace: true })
    }
  }, [searchParams, setSearchParams])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRequestFormValues>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      category: 'HOSTEL',
      title: '',
      description: '',
      location: 'Hostel Block B · Room 204',
      priority: 'NORMAL',
    },
  })

  const onSubmitNewRequest = async (values: CreateRequestFormValues) => {
    try {
      const created = await createMutation.mutateAsync({
        category: values.category as RequestCategory,
        title: values.title,
        description: values.description,
        location: values.location,
        priority: values.priority as RequestPriority,
      })
      showToast({
        type: 'success',
        title: 'Request Created Successfully',
        description: `Ticket ${created.id} has been dispatched to ${created.assignedDepartment}.`,
      })
      reset()
      setIsCreateModalOpen(false)
      setSelectedRequest(created)
    } catch (e) {
      showToast({
        type: 'error',
        title: 'Submission Failed',
        description: 'Unable to submit request right now. Please try again.',
      })
    }
  }

  // Filter requests locally by search query
  const filteredRequests = (requests || []).filter((req) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      req.id.toLowerCase().includes(q) ||
      req.title.toLowerCase().includes(q) ||
      req.description.toLowerCase().includes(q) ||
      (req.location && req.location.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-7 pb-16 selection:bg-rose-100 selection:text-rose-900">
      {/* 1. Header */}
      <FadeIn direction="down" duration={0.3}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/70 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                Operational Requests
              </h1>
              <Badge variant="info">Service Dispatch</Badge>
            </div>
            <p className="text-sm text-zinc-500 mt-1">
              Submit hostel maintenance tickets, certificate petitions, gate passes, and track resolution timelines.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsCreateModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            New Request
          </Button>
        </div>
      </FadeIn>

      {/* 2. Filters & Search Bar */}
      <Card className="p-4 shadow-subtle">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by ticket ID, issue summary, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Category & Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-700 focus:outline-none focus:border-rose-600"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-700 focus:outline-none focus:border-rose-600"
            >
              <option value="ALL">All Categories</option>
              <option value="HOSTEL">Hostel</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="CERTIFICATE">Certificate</option>
              <option value="GATE_PASS">Gate Pass</option>
              <option value="MESS">Mess</option>
              <option value="ACADEMIC">Academic</option>
            </select>
          </div>
        </div>
      </Card>

      {/* 3. Requests List View */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : filteredRequests.length === 0 ? (
        <EmptyState
          title="No requests found"
          description="There are no active or historical requests matching your selected filters."
          actionLabel="Reset Filters"
          onAction={() => {
            setStatusFilter('ALL')
            setCategoryFilter('ALL')
            setSearchQuery('')
          }}
        />
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedRequest(req)}
              className="p-4 sm:p-5 rounded-xl border border-zinc-200/90 bg-white hover:border-rose-300 hover:shadow-subtle transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {req.id}
                  </span>
                  <Badge variant="default">{req.category}</Badge>
                  <span className="text-xs text-zinc-400">•</span>
                  <span className="text-xs text-zinc-400">
                    {new Date(req.createdAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-rose-600 transition-colors truncate">
                  {req.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                  {req.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">{req.location}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{req.assignedDepartment}</span>
                  </span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100">
                <Badge
                  variant={
                    req.status === 'RESOLVED'
                      ? 'success'
                      : req.status === 'IN_PROGRESS'
                      ? 'warning'
                      : 'info'
                  }
                  withDot
                >
                  {req.status.replace('_', ' ')}
                </Badge>

                {req.otp && req.status === 'IN_PROGRESS' && (
                  <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    OTP: {req.otp}
                  </span>
                )}

                <span className="text-[11px] text-zinc-400 hidden sm:flex items-center gap-1 group-hover:text-rose-600 transition-colors">
                  View Timeline <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Request Detail Drawer with Operational Timeline */}
      {selectedRequest && (
        <Drawer
          isOpen={Boolean(selectedRequest)}
          onClose={() => setSelectedRequest(null)}
          title={`Ticket ${selectedRequest.id}`}
          side="right"
        >
          <div className="space-y-6">
            {/* Status Header */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    selectedRequest.status === 'RESOLVED'
                      ? 'success'
                      : selectedRequest.status === 'IN_PROGRESS'
                      ? 'warning'
                      : 'info'
                  }
                  withDot
                >
                  {selectedRequest.status.replace('_', ' ')}
                </Badge>
                <span className="font-mono text-xs text-zinc-400 font-semibold">
                  {selectedRequest.priority} PRIORITY
                </span>
              </div>
              <h3 className="text-base font-bold text-zinc-900 leading-snug">
                {selectedRequest.title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {selectedRequest.description}
              </p>
            </div>

            {/* Ticket Attributes */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-zinc-200 bg-white">
                <span className="text-zinc-400 block text-[10px] font-semibold uppercase tracking-wider">
                  Assigned Team
                </span>
                <span className="font-bold text-zinc-800 mt-0.5 block truncate">
                  {selectedRequest.assignedDepartment}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-zinc-200 bg-white">
                <span className="text-zinc-400 block text-[10px] font-semibold uppercase tracking-wider">
                  Location
                </span>
                <span className="font-bold text-zinc-800 mt-0.5 block truncate">
                  {selectedRequest.location || 'Campus'}
                </span>
              </div>
            </div>

            {/* OTP Notice if In Progress */}
            {selectedRequest.otp && selectedRequest.status === 'IN_PROGRESS' && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-rose-900">
                  <span>Student Confirmation Code</span>
                  <span className="font-mono text-sm bg-white px-2 py-0.5 rounded border border-rose-300">
                    {selectedRequest.otp}
                  </span>
                </div>
                <p className="text-rose-700 text-[11px] leading-relaxed">
                  Only provide this 4-digit code to the technician on-site once the repair is completely tested.
                </p>
              </div>
            )}

            {/* Vertical Operational Timeline */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-3">
                Lifecycle Timeline
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
                {selectedRequest.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        step.completed
                          ? 'bg-rose-600 border-white ring-2 ring-rose-200'
                          : 'bg-white border-zinc-300'
                      }`}
                    >
                      {step.completed && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                    </span>

                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={`font-bold ${
                            step.completed ? 'text-zinc-900' : 'text-zinc-400'
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {step.timestamp}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        Handled by <strong className="text-zinc-700">{step.actorRole}</strong>
                        {step.actorName && <span> ({step.actorName})</span>}
                      </div>
                      {step.note && (
                        <p className="text-xs text-zinc-600 bg-zinc-50 p-2 rounded border border-zinc-100 mt-1">
                          {step.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setSelectedRequest(null)}
              >
                Back to Requests
              </Button>
            </div>
          </div>
        </Drawer>
      )}

      {/* 5. Create Request Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Lodge New Campus Request"
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit(onSubmitNewRequest)} className="space-y-4 text-left">
          <p className="text-xs text-zinc-500">
            Submit a verified service request. The ticket is immediately routed to the responsible department.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Category
              </label>
              <select
                {...register('category')}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-100"
              >
                <option value="HOSTEL">Hostel Operations</option>
                <option value="MAINTENANCE">Maintenance & Repairs</option>
                <option value="MESS">Mess & Catering</option>
                <option value="CERTIFICATE">Academic Certificate</option>
                <option value="GATE_PASS">Gate Pass Request</option>
                <option value="ACADEMIC">Academic Dean Petition</option>
                <option value="OTHER">General Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Priority Level
              </label>
              <select
                {...register('priority')}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-100"
              >
                <option value="LOW">Low (Routine)</option>
                <option value="NORMAL">Normal (Standard SLA)</option>
                <option value="HIGH">High (Impacts Living)</option>
                <option value="URGENT">Urgent (Safety / Water / Power)</option>
              </select>
            </div>
          </div>

          <div>
            <Input
              label="Issue Summary / Subject"
              placeholder="e.g. Bathroom tap leaking continuously"
              error={errors.title?.message}
              {...register('title')}
            />
          </div>

          <div>
            <Input
              label="Specific Location"
              placeholder="e.g. Hostel Block B, Floor 2, Room 204"
              error={errors.location?.message}
              {...register('location')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Detailed Description
            </label>
            <textarea
              rows={3}
              placeholder="Provide context, room conditions, or specific instructions for technicians/officers..."
              {...register('description')}
              className="w-full rounded-lg border border-zinc-300 bg-white p-3 text-sm text-zinc-900 focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-100 placeholder:text-zinc-400"
            />
            {errors.description && (
              <p className="text-xs text-red-600 font-medium mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={createMutation.isPending}
              rightIcon={createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
            >
              {createMutation.isPending ? 'Logging Ticket…' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
