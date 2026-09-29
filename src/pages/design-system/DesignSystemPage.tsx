import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Sparkles,
  Zap,
  TrendingUp,
  KeyRound,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card, MetricCard } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Drawer } from '@/components/ui/Drawer'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { AnimatedNumber } from '@/components/motion/AnimatedNumber'
import { useToast } from '@/components/ui/Toast'

export const DesignSystemPage: React.FC = () => {
  const { showToast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [counterTrigger, setCounterTrigger] = useState(4820)

  const colorTokens = [
    { name: 'Canvas Background', token: '--bg-canvas', hex: '#F8FAFC', class: 'bg-[#F8FAFC]', border: true },
    { name: 'Surface Surface', token: '--bg-surface', hex: '#FFFFFF', class: 'bg-[#FFFFFF]', border: true },
    { name: 'Primary Text', token: '--text-primary', hex: '#0F172A', class: 'bg-[#0F172A]', lightText: true },
    { name: 'Secondary Text', token: '--text-secondary', hex: '#64748B', class: 'bg-[#64748B]', lightText: true },
    { name: 'Subtle Border', token: '--border-subtle', hex: '#E2E8F0', class: 'bg-[#E2E8F0]', border: true },
    { name: 'Primary Accent', token: '--accent-primary', hex: '#4F46E5', class: 'bg-[#4F46E5]', lightText: true },
    { name: 'Success Accent', token: '--color-success', hex: '#16A34A', class: 'bg-[#16A34A]', lightText: true },
    { name: 'Warning Accent', token: '--color-warning', hex: '#D97706', class: 'bg-[#D97706]', lightText: true },
    { name: 'Danger Accent', token: '--color-danger', hex: '#DC2626', class: 'bg-[#DC2626]', lightText: true },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/app" className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900">
                CampusOS Design System
              </h1>
              <p className="text-xs text-slate-500">Design tokens, UI primitives & interaction guidelines</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="info" withDot>
              Component Catalog
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* Section 1: Colors & Tokens */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">1. Color System & Tokens</h2>
            <p className="text-xs text-slate-500">
              Strictly curated HSL tokens engineered for modern enterprise clarity, trust, and calm aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorTokens.map((c) => (
              <div
                key={c.name}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle flex items-center gap-3"
              >
                <div
                  className={`w-12 h-12 rounded-lg shrink-0 ${c.class} ${c.border ? 'border border-slate-300' : ''}`}
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{c.name}</div>
                  <div className="text-[11px] font-mono text-slate-500">{c.hex}</div>
                  <div className="text-[10px] font-mono text-indigo-600">{c.token}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Typography Hierarchy */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">2. Typography Hierarchy</h2>
            <p className="text-xs text-slate-500">
              Native Inter font system with tabular numerals (<code className="text-indigo-600 font-mono">tnum</code>) for numerical data.
            </p>
          </div>

          <Card className="p-6 divide-y divide-slate-100">
            <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-slate-400">Display / Hero</span>
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Campus Life, Simplified.
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-slate-400">Page Heading (H1)</span>
              <span className="text-xl font-bold text-slate-900">
                Hostel Operations Command
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-slate-400">Section Title (H2/H3)</span>
              <span className="text-base font-semibold text-slate-800">
                Recent Infrastructure Incident Reports
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-slate-400">Body Text</span>
              <span className="text-sm text-slate-600 max-w-xl">
                The operating layer connects students, technicians, wardens, and administrative offices without manual paperwork.
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-slate-400">Metric Value (tnum)</span>
              <span className="text-2xl font-bold text-slate-900 tnum">
                98.42% • 4,820 Students
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-slate-400">Caption & Label</span>
              <span className="text-xs text-slate-500">
                Last synchronized 4 minutes ago via Campus Node 01
              </span>
            </div>
          </Card>
        </section>

        {/* Section 3: Buttons & Interactive Triggers */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">3. Button Variants & States</h2>
            <p className="text-xs text-slate-500">
              Physics micro-tap feedback (<code className="text-indigo-600 font-mono">scale: 0.98</code>), accessible focus outlines, and built-in loading states.
            </p>
          </div>

          <Card className="p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button
                variant="primary"
                isLoading={buttonLoading}
                onClick={() => {
                  setButtonLoading(true)
                  setTimeout(() => setButtonLoading(false), 1500)
                }}
              >
                {buttonLoading ? 'Saving...' : 'Click for Loading'}
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 mr-2">Sizes:</span>
              <Button size="sm" variant="outline">Small (sm)</Button>
              <Button size="md" variant="outline">Medium (md)</Button>
              <Button size="lg" variant="outline">Large (lg)</Button>
            </div>
          </Card>
        </section>

        {/* Section 4: Form Inputs & Fields */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">4. Form Inputs & States</h2>
            <p className="text-xs text-slate-500">
              Clean, high-contrast inputs with label, icons, helper text, and validation states.
            </p>
          </div>

          <Card className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Input
              label="Standard Input"
              placeholder="e.g. Student Name"
              helperText="Informational helper text"
            />
            <Input
              label="With Icon Indicator"
              placeholder="Search roll number..."
              leftIcon={<Sparkles className="w-4 h-4" />}
            />
            <Input
              label="Success State"
              defaultValue="2201004128"
              success="Valid Student Registration Number"
            />
            <Input
              label="Error State"
              defaultValue="invalid-format"
              error="Room number must match block code format"
            />
            <Input
              label="Disabled Input"
              defaultValue="System Controlled"
              disabled
            />
          </Card>
        </section>

        {/* Section 5: Badges & Status Indicators */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">5. Badges & Status Indicators</h2>
            <p className="text-xs text-slate-500">Semantic status badges with optional glowing dots.</p>
          </div>

          <Card className="p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info Accent</Badge>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Badge variant="default" withDot>Pending Sync</Badge>
              <Badge variant="success" withDot>Approved & Dispatched</Badge>
              <Badge variant="warning" withDot>In Progress</Badge>
              <Badge variant="danger" withDot>SLA Breached</Badge>
              <Badge variant="info" withDot>Active Outing</Badge>
            </div>
          </Card>
        </section>

        {/* Section 6: Cards & Metric Displays */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">6. Cards & Analytical Metrics</h2>
            <p className="text-xs text-slate-500">Tabular numerals and trend indicators for operational dashboards.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Attendance Metric"
              value="91.2%"
              change="+3.4% this month"
              isPositive={true}
              caption="Threshold safety guaranteed"
              icon={Zap}
            />
            <MetricCard
              title="Incident Resolution Time"
              value="3.8h"
              change="-45m improvement"
              isPositive={true}
              caption="Average across all hostels"
              icon={TrendingUp}
            />
            <MetricCard
              title="Pending Gate Passes"
              value="12 Queue"
              change="4 urgent leaves"
              isPositive={false}
              caption="Requires warden action"
              icon={KeyRound}
            />
          </div>
        </section>

        {/* Section 7: Feedback Modals & Toasts */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">7. Interactive Feedback: Modals, Drawers & Toasts</h2>
            <p className="text-xs text-slate-500">Accessible dialogues, spring transitions, and non-blocking toast notifications.</p>
          </div>

          <Card className="p-6 flex flex-wrap items-center gap-4">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Demo Modal
            </Button>
            <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>
              Open Slide Drawer
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                showToast({
                  title: 'Pass Approved',
                  description: 'Hostel Outing Pass #GP-884 is now active.',
                  type: 'success',
                })
              }
            >
              Trigger Success Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                showToast({
                  title: 'Network Sync Delayed',
                  description: 'Offline mode active. Request queued in local cache.',
                  type: 'warning',
                })
              }
            >
              Trigger Warning Toast
            </Button>
          </Card>
        </section>

        {/* Section 8: UI States (Loading, Empty, Error) */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">8. UI States (Loading, Empty, Error)</h2>
            <p className="text-xs text-slate-500">Standardized zero-data and failure handling components.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Empty State */}
            <Card className="p-6">
              <span className="text-xs font-semibold text-slate-400 block mb-2">Empty State</span>
              <EmptyState
                title="No active maintenance tickets"
                description="When you report a hostel plumbing or electrical issue, its real-time repair progress will appear here."
                actionLabel="Report Infrastructure Issue"
                onAction={() =>
                  showToast({ title: 'Ticket modal opens', type: 'info' })
                }
              />
            </Card>

            {/* Error State */}
            <Card className="p-6">
              <span className="text-xs font-semibold text-slate-400 block mb-2">Error State</span>
              <ErrorState
                title="Could not connect to Mess ledger"
                message="The connection timed out while querying today's nutrition ledger. Please verify network access."
                onRetry={() =>
                  showToast({ title: 'Retrying sync...', type: 'info' })
                }
              />
            </Card>
          </div>

          {/* Skeleton Loaders */}
          <Card className="p-6 space-y-4">
            <span className="text-xs font-semibold text-slate-400 block">Pulsing Skeleton Loaders</span>
            <div className="flex items-center gap-4">
              <Skeleton variant="circular" className="w-12 h-12 shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </Card>
        </section>

        {/* Section 9: Animation Demos */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">9. Purposeful Animation Language</h2>
            <p className="text-xs text-slate-500">
              Clean micro-interactions, animated metric numbers, and respect for <code className="text-indigo-600 font-mono">prefers-reduced-motion</code>.
            </p>
          </div>

          <Card className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-700 block">Animated Metric Counter</span>
                <p className="text-xs text-slate-500">Counts up with smooth cubic easing on mount or state trigger.</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl font-extrabold text-indigo-600">
                  <AnimatedNumber value={counterTrigger} prefix="+" suffix=" Users" />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCounterTrigger((prev) => prev + 500)}
                >
                  Increment
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* Interactive Modal Instance */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Campus Infrastructure Quick Report"
        description="Standard Dialog & Modal Preview"
      >
        <div className="space-y-4 text-xs text-slate-600">
          <p>
            This modal illustrates the accessible dialog system with backdrop blur, spring scaling,
            and keyboard ESC bindings.
          </p>
          <Input label="Issue Summary" placeholder="e.g. Broken corridor light bulb" />
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsModalOpen(false)
                showToast({ title: 'Report submitted for review', type: 'success' })
              }}
            >
              Submit Ticket
            </Button>
          </div>
        </div>
      </Modal>

      {/* Interactive Drawer Instance */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Hostel Room Inspection Detail"
        side="right"
      >
        <div className="space-y-4 text-xs text-slate-600">
          <p>
            This drawer demonstrates the responsive slide-over panel used for side inspections,
            mobile menus, and deep detail views.
          </p>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-900 block">Room B-204</span>
            <span className="text-[11px] text-slate-500">2 Beds Allocated • Air Ventilated</span>
          </div>
          <Button variant="primary" size="sm" className="w-full" onClick={() => setIsDrawerOpen(false)}>
            Close Drawer
          </Button>
        </div>
      </Drawer>
    </div>
  )
}
