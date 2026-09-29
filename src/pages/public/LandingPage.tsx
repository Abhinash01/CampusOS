import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  KeyRound,
  Wrench,
  Utensils,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, MetricCard } from '@/components/ui/Card'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation Header */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              OS
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 tracking-tight">CampusOS</span>
              <span className="ml-2 text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full font-medium">
                BPUT Hackathon 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/design-system" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm">
                Design System
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/app/student">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50/70 text-indigo-800 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Problem Statement 07: “Campus Life, Debugged”</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Campus Life, <span className="text-indigo-600">Simplified.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The operating layer of a university campus. Connecting students, administration,
              hostel wardens, and maintenance operations into one unified, intelligent platform.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/app/student">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore CampusOS
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero Fake Code
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                PWA Ready
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                4 Role Personas
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Realistic Product Preview Section */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto w-full mb-20">
        <FadeIn direction="up" delay={0.15}>
          <div className="rounded-2xl border border-slate-200/90 bg-white shadow-elevated p-4 sm:p-6 overflow-hidden">
            {/* Mock Header Inside Preview */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="font-mono text-slate-400 ml-2">app.campusos.internal/student</span>
              </div>
              <Badge variant="success" withDot>
                Campus Core Online
              </Badge>
            </div>

            {/* Embedded Live Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard
                title="Academic Attendance"
                value="88.4%"
                change="+2.1%"
                isPositive={true}
                caption="Safe threshold (>75%)"
                icon={Zap}
              />
              <MetricCard
                title="Active Gate Pass"
                value="Approved"
                caption="Valid until 9:30 PM"
                icon={KeyRound}
              />
              <MetricCard
                title="Hostel Repairs"
                value="1 Pending"
                caption="Plumbing • Tech Dispatched"
                icon={Wrench}
              />
              <MetricCard
                title="Today's Mess Rating"
                value="4.6 / 5.0"
                caption="Lunch: Paneer Butter Masala"
                icon={Utensils}
              />
            </div>

            {/* Interactive Preview Split Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border-slate-200">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-800">Next Scheduled Class</span>
                  <Badge variant="info">In 35 mins</Badge>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Distributed Systems (CS601)</h4>
                <p className="text-xs text-slate-500 mt-1">Lecture Hall 302 • Dr. R. K. Nayak</p>
              </Card>

              <Card className="p-4 border-slate-200">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-800">Bona Fide Certificate</span>
                  <Badge variant="warning">In Review</Badge>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Req #REQ-8924</h4>
                <p className="text-xs text-slate-500 mt-1">Purpose: Passport Application • Signed by HOD</p>
              </Card>

              <Card className="p-4 border-slate-200">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-800">Hostel Night Roll Call</span>
                  <Badge variant="success">Marked Present</Badge>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Block B — Room 204</h4>
                <p className="text-xs text-slate-500 mt-1">Hostel Warden: Prof. R. Mohanty</p>
              </Card>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Problem vs Solution Section */}
      <section id="how-it-works" className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
              The Campus Life Problem
            </h2>
            <p className="text-3xl font-extrabold text-slate-900">
              Disconnected Paperwork vs. One Connected System
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Legacy Way */}
            <Card className="p-6 border-red-200 bg-red-50/20">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm mb-4">
                <Clock className="w-4 h-4" />
                <span>The Legacy Campus: Friction & Bottlenecks</span>
              </div>
              <ul className="space-y-3.5">
                {[
                  'Registers at hostel security desks where repair tickets get lost.',
                  'Physical paper forms signed by 4 different offices for leave.',
                  'Unstructured WhatsApp groups flooded with notices and chatter.',
                  'Manual attendance registers subject to discrepancy and delay.',
                  'Long queues outside the registrar counter for simple certificates.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* The CampusOS Operating Model */}
            <Card className="p-6 border-indigo-200 bg-indigo-50/20">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>CampusOS: Automated Operating Layer</span>
              </div>
              <ul className="space-y-3.5">
                {[
                  '1-tap complaints automatically triaged & assigned to on-duty staff.',
                  'QR-encoded digital gate passes with instant parent & warden sync.',
                  'Targeted circulars filtered precisely by branch, semester & block.',
                  'Real-time attendance tracking with smart shortage alerts.',
                  'Digital certificates cryptographically signed & QR-verifiable.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Breakdown */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Multi-Stakeholder Architecture
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">
            Tailored Experiences for Every Campus Role
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StaggerItem>
            <Card className="p-5 h-full flex flex-col justify-between hover:shadow-card transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Students</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Faster requests, real-time gate pass status, attendance safety metrics, and daily mess ratings.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <Link to="/app/student" className="text-xs font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1">
                  <span>Student Portal</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="p-5 h-full flex flex-col justify-between hover:shadow-card transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Administrators</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Central visibility, automatic request routing, SLA tracking, and audit-ready governance logs.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <Link to="/app/admin" className="text-xs font-semibold text-emerald-600 hover:underline inline-flex items-center gap-1">
                  <span>Admin Command</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="p-5 h-full flex flex-col justify-between hover:shadow-card transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Hostel Wardens</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  1-tap gate pass adjudication, live hostel occupancy rosters, and verified wing repairs.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <Link to="/app/warden" className="text-xs font-semibold text-amber-600 hover:underline inline-flex items-center gap-1">
                  <span>Warden Station</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="p-5 h-full flex flex-col justify-between hover:shadow-card transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Maintenance Staff</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Mobile job queues, photo upload for repairs, and student OTP verification for job closure.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <Link to="/app/staff" className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1">
                  <span>Staff Workbench</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Closing CTA */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Bring your campus into one operating system.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Experience the design system, application shell, and multi-persona foundation
            built for the BPUT Hackathon 2026.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/app/student">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch Student Experience
              </Button>
            </Link>
            <Link to="/design-system">
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800">
                Inspect Design System
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">CampusOS</span>
            <span>— Campus Life, Simplified.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/design-system" className="hover:text-slate-900">
              Design System
            </Link>
            <Link to="/login" className="hover:text-slate-900">
              Login Portal
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">
              Phase 0 Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
