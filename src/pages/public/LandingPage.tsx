import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  CalendarCheck,
  FileCheck2,
  Home,
  Utensils,
  Bell,
  HelpCircle,
  CheckCircle2,
  Search,
  Menu,
  X,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'

export const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* 1. UPGRADED NAVBAR */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3'
            : 'bg-transparent border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-[10px] bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_1px_3px_rgba(79,70,229,0.3)] group-hover:bg-indigo-700 transition-colors">
              OS
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900">CampusOS</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-600">
            <a href="#hero" className="hover:text-slate-900 transition-colors">
              Overview
            </a>
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How it works
            </a>
            <a href="#operational-flow" className="hover:text-slate-900 transition-colors">
              Resolution Flow
            </a>
          </nav>

          {/* Right CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="px-2.5">
                Sign in
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-4 space-y-3 shadow-md"
          >
            <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 rounded-md hover:bg-slate-50"
              >
                Overview
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 rounded-md hover:bg-slate-50"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 rounded-md hover:bg-slate-50"
              >
                How it works
              </a>
              <a
                href="#operational-flow"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 rounded-md hover:bg-slate-50"
              >
                Resolution Flow
              </a>
            </div>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full justify-center">
                  Get Started
                </Button>
              </Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="md" className="w-full justify-center">
                  Sign in to workspace
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* 2. HERO SECTION WITH ANIMATED AMBIENT GLOW & GRID */}
      <section id="hero" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Animated Background Glow Layers */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* Subtle Grid Texture */}
          <div className="absolute inset-0 bg-grid-slate radial-mask opacity-60" />

          {/* Primary Indigo/Violet Ambient Glow Orb */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.08, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-10 left-1/2 -translate-x-1/2 w-[540px] sm:w-[720px] h-[360px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/12 to-blue-400/10 rounded-full blur-3xl"
          />

          {/* Connected Network Node Motif SVG (Subtle Identity Watermark) */}
          <svg
            className="absolute top-16 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.14] text-indigo-700 pointer-events-none"
            viewBox="0 0 800 400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle cx="160" cy="180" r="4" fill="currentColor" />
            <circle cx="340" cy="90" r="4" fill="currentColor" />
            <circle cx="460" cy="90" r="4" fill="currentColor" />
            <circle cx="640" cy="180" r="4" fill="currentColor" />
            <circle cx="400" cy="280" r="5" fill="currentColor" />
            <line x1="160" y1="180" x2="340" y2="90" strokeDasharray="4 4" />
            <line x1="340" y1="90" x2="460" y2="90" strokeDasharray="4 4" />
            <line x1="460" y1="90" x2="640" y2="180" strokeDasharray="4 4" />
            <line x1="160" y1="180" x2="400" y2="280" strokeDasharray="4 4" />
            <line x1="640" y1="180" x2="400" y2="280" strokeDasharray="4 4" />
            <line x1="400" y1="280" x2="400" y2="160" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <FadeIn direction="up" delay={0.05} duration={0.4}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/80 border border-indigo-200/60 text-[11px] font-semibold tracking-wider text-indigo-700 uppercase mb-5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span>THE CAMPUS OPERATING SYSTEM</span>
            </div>
          </FadeIn>

          {/* Headline */}
          <FadeIn direction="up" delay={0.12} duration={0.5}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] sm:leading-[1.1]">
              Campus life,{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                finally connected.
              </span>
            </h1>
          </FadeIn>

          {/* Supporting Text */}
          <FadeIn direction="up" delay={0.18} duration={0.5}>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              One simple platform for students, campus services, requests, communication, and everyday campus operations.
            </p>
          </FadeIn>

          {/* Action CTAs */}
          <FadeIn direction="up" delay={0.24} duration={0.5}>
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/register">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Get Started
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline">
                  Explore CampusOS
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>

        {/* 3. HERO APPLICATION PREVIEW (Realistic high-fidelity workspace screenshot) */}
        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12),0_0_0_1px_rgba(226,232,240,0.8)] overflow-hidden"
          >
            {/* Window Frame Titlebar */}
            <div className="px-4 py-3 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between">
              {/* Traffic Lights & CampusOS Wordmark */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                </div>
                <div className="h-3 w-px bg-slate-200 hidden sm:block" />
                <span className="text-[11px] font-semibold text-slate-700 tracking-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  CampusOS Workspace
                </span>
              </div>

              {/* Window Search Input Preview */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-md text-[11px] text-slate-400 w-64 shadow-2xs">
                <Search className="w-3 h-3 text-slate-400" />
                <span className="truncate">Search modules, tickets, circulars...</span>
                <kbd className="ml-auto font-mono text-[9px] text-slate-400 px-1 rounded border border-slate-200 bg-slate-50">
                  Ctrl+K
                </kbd>
              </div>

              {/* Active User Avatar Tag */}
              <div className="flex items-center gap-2">
                <span className="hidden md:inline-block text-[11px] font-medium text-slate-600">
                  Abhinash Sharma
                </span>
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold text-[10px] flex items-center justify-center">
                  A
                </div>
              </div>
            </div>

            {/* Inner Dashboard Layout Preview */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px] bg-slate-50/40">
              {/* Mini Sidebar */}
              <div className="hidden md:block md:col-span-3 border-r border-slate-200/70 bg-white p-3 space-y-1">
                <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Workspace
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100/60">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Overview</span>
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 text-xs hover:bg-slate-50">
                  <CalendarCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Attendance</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 text-xs hover:bg-slate-50">
                  <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Requests</span>
                  <span className="ml-auto px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                    2
                  </span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 text-xs hover:bg-slate-50">
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  <span>Hostel</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 text-xs hover:bg-slate-50">
                  <Utensils className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mess</span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-600 text-xs hover:bg-slate-50">
                  <Bell className="w-3.5 h-3.5 text-slate-400" />
                  <span>Notices</span>
                </div>
              </div>

              {/* Main Content Area Preview */}
              <div className="md:col-span-9 p-4 sm:p-5 space-y-4 text-left">
                {/* Greeting Card */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                        Good morning, Abhinash
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1 h-1 rounded-full bg-emerald-600" />
                        In Good Standing
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      B.Tech Computer Science (Sem 6) • Hostel Block B, Room 204
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-medium text-slate-700">
                      Outing Pass: Active
                    </span>
                  </div>
                </div>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold uppercase text-[10px] tracking-wider">Attendance</span>
                      <CalendarCheck className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <div className="mt-1.5 text-xl font-bold text-slate-900 tnum">86.4%</div>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                      <span>12 classes safe to skip</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '86.4%' }} />
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold uppercase text-[10px] tracking-wider">Active Requests</span>
                      <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <div className="mt-1.5 text-xl font-bold text-slate-900 tnum">2 in progress</div>
                    <div className="mt-1 text-[11px] text-slate-500">
                      <span>Plumbing #1042 · Certificate</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-[10px] font-medium text-slate-600">Dispatched to Technician</span>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold uppercase text-[10px] tracking-wider">Dining & Hostel</span>
                      <Utensils className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <div className="mt-1.5 text-xl font-bold text-slate-900">Block B</div>
                    <div className="mt-1 text-[11px] text-slate-500">
                      <span>Dinner: 7:30 PM — 9:30 PM</span>
                    </div>
                    <div className="mt-2 text-[10px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded inline-block">
                      Curfew: 10:00 PM
                    </div>
                  </div>
                </div>

                {/* Operational Feed Sample */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-800">Operational Updates</span>
                    <span className="text-[10px] text-slate-400 font-medium">Real-time sync</span>
                  </div>
                  <div className="mt-2.5 space-y-2">
                    <div className="flex items-start justify-between text-xs py-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                        <span className="font-medium text-slate-800">Hostel Repair #1042</span>
                        <span className="text-slate-400 text-[11px]">— Technician Manoj dispatched</span>
                      </div>
                      <span className="text-[10px] text-slate-400">14m ago</span>
                    </div>
                    <div className="flex items-start justify-between text-xs py-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                        <span className="font-medium text-slate-800">Gate Pass Approved</span>
                        <span className="text-slate-400 text-[11px]">— Warden verified exit permission</span>
                      </div>
                      <span className="text-[10px] text-slate-400">1h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. PRODUCT VALUE SECTION ("Everything campus, in one place.") */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-[11px] font-semibold text-indigo-700 uppercase tracking-wider mb-2.5">
            CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything campus, in one place.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Designed around the everyday rhythm of student life and campus administration.
          </p>
        </div>

        {/* Differentiated Feature Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Attendance */}
          <StaggerItem>
            <Card className="p-6 border-slate-200/90 hover:border-indigo-300 hover:shadow-card transition-all duration-200 h-full flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Attendance</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Keep track of attendance without hunting through systems.
                </p>
              </div>

              {/* Attendance Mini Preview UI */}
              <div className="mt-5 p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">Overall Percentage</span>
                  <span className="font-bold text-indigo-700 tnum">86.4%</span>
                </div>
                <div className="w-full bg-slate-200/70 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '86.4%' }} />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Threshold: 75%</span>
                  <span className="text-emerald-700 font-medium">Safe Margin (+12 classes)</span>
                </div>
              </div>
            </Card>
          </StaggerItem>

          {/* Card 2: Requests */}
          <StaggerItem>
            <Card className="p-6 border-slate-200/90 hover:border-indigo-300 hover:shadow-card transition-all duration-200 h-full flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Requests</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Submit and follow campus requests from one place.
                </p>
              </div>

              {/* Requests Mini Preview UI */}
              <div className="mt-5 p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-800">Bonafide Certificate</span>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    In Review
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Signed by Dean • Ready for download today</span>
                </div>
              </div>
            </Card>
          </StaggerItem>

          {/* Card 3: Hostel */}
          <StaggerItem>
            <Card className="p-6 border-slate-200/90 hover:border-indigo-300 hover:shadow-card transition-all duration-200 h-full flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Hostel</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Stay connected with hostel services and updates.
                </p>
              </div>

              {/* Hostel Mini Preview UI */}
              <div className="mt-5 p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-800">Hostel Block B</span>
                  <span className="text-[10px] font-mono text-slate-500">Room 204</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-600">Digital Outing Pass</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                    Verified
                  </span>
                </div>
              </div>
            </Card>
          </StaggerItem>

          {/* Card 4: Mess */}
          <StaggerItem>
            <Card className="p-6 border-slate-200/90 hover:border-indigo-300 hover:shadow-card transition-all duration-200 h-full flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <Utensils className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Mess</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Access mess information and feedback.
                </p>
              </div>

              {/* Mess Mini Preview UI */}
              <div className="mt-5 p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">Today's Lunch Menu</span>
                  <span className="text-[10px] font-bold text-indigo-700">4.6 ★</span>
                </div>
                <p className="text-[11px] text-slate-600 truncate">
                  Paneer Butter Masala, Dal Tadka, Jeera Rice
                </p>
              </div>
            </Card>
          </StaggerItem>

          {/* Card 5: Notices */}
          <StaggerItem>
            <Card className="p-6 border-slate-200/90 hover:border-indigo-300 hover:shadow-card transition-all duration-200 h-full flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Notices</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Never miss important campus communication.
                </p>
              </div>

              {/* Notices Mini Preview UI */}
              <div className="mt-5 p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 truncate">Exam Circular 2026</span>
                  <span className="text-[10px] text-slate-400">Official</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Filtered by department: Computer Science Sem 6
                </p>
              </div>
            </Card>
          </StaggerItem>

          {/* Card 6: Support */}
          <StaggerItem>
            <Card className="p-6 border-slate-200/90 hover:border-indigo-300 hover:shadow-card transition-all duration-200 h-full flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Support</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Get help and know what happens next.
                </p>
              </div>

              {/* Support Mini Preview UI */}
              <div className="mt-5 p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">Technician Assigned</span>
                  <span className="text-[10px] text-indigo-600 font-mono">OTP 4829</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Direct contact with on-duty warden & facilities team
                </p>
              </div>
            </Card>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* 5. "HOW CAMPUSOS WORKS" (Horizontal on Desktop, Vertical on Mobile) */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-slate-200/80 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-[11px] font-semibold text-indigo-700 uppercase tracking-wider mb-2.5">
              WORKFLOW
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How CampusOS works
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              No lost paperwork. No office queues. Direct end-to-end resolution.
            </p>
          </div>

          {/* Process Timeline Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Desktop Connecting Line */}
            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-slate-200 -z-0" />

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-indigo-600 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-xs">
                1
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">You need something</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Initiate a gate pass, ticket, or document application.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-indigo-600 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-xs">
                2
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">CampusOS routes it</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                The platform directs the task to the responsible department.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-indigo-600 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-xs">
                3
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">The right team acts</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Wardens, technicians, or administrators receive active queues.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-indigo-600 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-xs">
                4
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">You get updates</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Transparent real-time status updates at every stage.
              </p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 border-2 border-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Issue resolved</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Verified completion with student OTP confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REAL OPERATIONAL FLOW ("From request to resolution") */}
      <section id="operational-flow" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-[11px] font-semibold text-indigo-700 uppercase tracking-wider mb-2.5">
            OPERATIONAL TRACEABILITY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            From request to resolution
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            A real look at how an everyday campus issue gets resolved without manual chasing.
          </p>
        </div>

        {/* Operational Flow Timeline Card */}
        <Card className="p-6 sm:p-8 border-slate-200/90 shadow-subtle bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  Ticket #1042
                </span>
                <h3 className="text-base font-bold text-slate-900">Hostel Maintenance Request</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Bathroom tap leaking • Block B, Room 204
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Resolved in 57 mins
            </span>
          </div>

          {/* Stepper Detail */}
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Submitted</span>
                  <span className="text-slate-400 font-mono text-[11px]">10:15 AM</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Student reports tap valve leaking continuously with room photo attached.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Assigned to Maintenance</span>
                  <span className="text-slate-400 font-mono text-[11px]">10:22 AM</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Auto-routed to Estate & Maintenance supervisor queue (Priority: Normal).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Technician Notified</span>
                  <span className="text-slate-400 font-mono text-[11px]">10:35 AM</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Technician Manoj Kumar accepts ticket and takes spare threaded washer.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                4
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Repair Completed</span>
                  <span className="text-slate-400 font-mono text-[11px]">11:10 AM</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Washer replaced and pressure tested on site in presence of student.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-700">Resolved via Student OTP</span>
                  <span className="text-emerald-700 font-mono text-[11px]">11:12 AM</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Student provides verification OTP <span className="font-mono font-bold text-slate-700">4829</span> to technician to authorize ticket closure.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 7. FINAL CONTRAST CTA SECTION (Deep Indigo/Dark Theme) */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-5">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Make campus life simpler.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
            Bring everyday campus services and communication into one connected experience.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/15 hover:text-white"
              >
                Sign in to workspace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-10 px-4 sm:px-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                OS
              </div>
              <span className="font-bold text-slate-900 text-sm">CampusOS</span>
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-slate-500">Campus Life, Simplified.</span>
          </div>

          <div className="flex items-center gap-6 font-medium text-slate-600">
            <a href="#hero" className="hover:text-slate-900 transition-colors">
              Overview
            </a>
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How it works
            </a>
            <Link to="/login" className="hover:text-slate-900 transition-colors">
              Sign in
            </Link>
            <Link to="/register" className="hover:text-slate-900 transition-colors">
              Get Started
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-slate-400 gap-2">
          <span>&copy; {new Date().getFullYear()} CampusOS. All rights reserved.</span>
          <span>Designed for university campus operations.</span>
        </div>
      </footer>
    </div>
  )
}
