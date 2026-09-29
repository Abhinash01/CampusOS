import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  FileCheck2,
  Home,
  Utensils,
  Bell,
  HelpCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/motion/FadeIn'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation Header */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              OS
            </div>
            <span className="font-bold text-base text-slate-900 tracking-tight">CampusOS</span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Create Student Account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn direction="up">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Campus Life, <span className="text-indigo-600">Simplified.</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              One connected platform for students and campus operations. Manage attendance, requests, hostel services, and campus communication from one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/register">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Get Started as Student
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign In to Workspace
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Product Areas Grid */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Platform Capabilities
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">
            A unified operating layer for everyday campus tasks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Card className="p-5 border-slate-200 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3.5">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Attendance</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Subject-wise lecture tracking, academic shortage visibility, and verified leave records.
            </p>
          </Card>

          <Card className="p-5 border-slate-200 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3.5">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Requests</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Single workflow for certificate applications, approvals, and status tracking without office queues.
            </p>
          </Card>

          <Card className="p-5 border-slate-200 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3.5">
              <Home className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Hostel</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Room living details, gate pass requests, and verified maintenance ticket routing.
            </p>
          </Card>

          <Card className="p-5 border-slate-200 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3.5">
              <Utensils className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Mess</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Daily meal schedules, feedback ratings, and transparent food service operations.
            </p>
          </Card>

          <Card className="p-5 border-slate-200 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3.5">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Notices</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Official administrative circulars delivered directly to the students they concern.
            </p>
          </Card>

          <Card className="p-5 border-slate-200 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3.5">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Campus Support</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Direct accountability with clear routing to wardens, technicians, and departmental staff.
            </p>
          </Card>
        </div>
      </section>

      {/* Problem Comparison Section */}
      <section className="py-14 bg-white border-y border-slate-200 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Operational Clarity
            </h2>
            <p className="text-2xl font-bold text-slate-900">
              Replacing Disconnected Processes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs uppercase tracking-wider mb-4">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Traditional Campus Operations</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>Physical registers at security desks where maintenance tickets get delayed.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>Multiple in-person office visits to check if forms have been signed.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>Critical academic updates lost in informal messaging groups.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>Lack of accountability and status visibility for everyday requests.</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-indigo-200 bg-indigo-50/20">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Connected CampusOS</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Central request submission with automatic routing to responsible staff.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Real-time status updates so students know where things stand.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Targeted official circulars filtered by student branch and semester.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Role-appropriate workspaces for students, administrators, and staff.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Closing Minimal Banner */}
      <section className="py-14 px-4 sm:px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Ready to access your campus workspace?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          Sign in with your university credentials or register a student account.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/register">
            <Button size="md" variant="primary">
              Register Student Account
            </Button>
          </Link>
          <Link to="/login">
            <Button size="md" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 sm:px-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">CampusOS</span>
            <span>— Campus Life, Simplified.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-slate-800">
              Sign In
            </Link>
            <Link to="/register" className="hover:text-slate-800">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
