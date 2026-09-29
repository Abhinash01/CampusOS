import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarCheck,
  FileCheck2,
  Home,
  ArrowRight,
  Layers,
  Info,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import {
  THEMES,
  THEME_LIST,
  THEME_TEAL,
  THEME_BLUE,
  THEME_CORAL,
  type ThemeConfig,
  type ThemeId,
} from '@/theme'

export const ThemeExplorationPage: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId>('teal')
  const [activeTab, setActiveTab] = useState<'deep-dive' | 'side-by-side' | 'landing-test' | 'matrix'>('deep-dive')

  const currentTheme = THEMES[selectedThemeId]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 selection:bg-slate-200">
      {/* Sticky Theme Controller Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                OS
              </div>
              <span className="font-bold text-sm text-slate-900 tracking-tight">CampusOS</span>
            </Link>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-700">Color Theme Exploration</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                Design Evaluation
              </span>
            </div>
          </div>

          {/* Theme Selector Pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden lg:inline">Select Theme:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              {THEME_LIST.map((theme) => {
                const isSelected = selectedThemeId === theme.id
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedThemeId(theme.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <span>{theme.name}</span>
                  </button>
                )
              })}
            </div>

            <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

            {/* Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('deep-dive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'deep-dive' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Detailed Showcase
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('landing-test')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'landing-test' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Landing Simulation
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('side-by-side')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'side-by-side' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Side-by-Side
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('matrix')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'matrix' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Comparison Matrix
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* Notice Banner */}
        <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-slate-900">Visual Theme Exploration:</span> Testing three tailored brand directions (Campus Teal, Campus Blue, Campus Coral) to replace generic Indigo/Purple SaaS tropes with an authentic campus identity. The production theme remains active at <code className="text-slate-800 font-mono">#4F46E5</code> until formal selection.
          </div>
        </div>

        {/* TAB 1: DETAILED SHOWCASE */}
        {activeTab === 'deep-dive' && (
          <ThemeDetailedSection theme={currentTheme} />
        )}

        {/* TAB 2: LANDING PAGE SIMULATION */}
        {activeTab === 'landing-test' && (
          <LandingPageSimulationSection theme={currentTheme} />
        )}

        {/* TAB 3: SIDE-BY-SIDE COMPARISON */}
        {activeTab === 'side-by-side' && (
          <div className="space-y-10">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900">Side-by-Side Theme Comparison</h2>
              <p className="text-xs text-slate-500 mt-1">
                Comparing identical UI components and palettes across all three candidates.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {THEME_LIST.map((theme) => (
                <div key={theme.id} className="space-y-6">
                  {/* Theme Header Card */}
                  <div
                    className="p-5 rounded-2xl border text-left shadow-xs transition-all"
                    style={{
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                        {theme.code}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                        style={{
                          backgroundColor: theme.colors.badgeBg,
                          color: theme.colors.badgeText,
                          borderColor: theme.colors.badgeBorder,
                        }}
                      >
                        {theme.concept}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{theme.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{theme.description}</p>

                    {/* Color Swatches */}
                    <div className="mt-4 pt-3 border-t border-slate-200/60 grid grid-cols-5 gap-2 text-center text-[10px]">
                      <div>
                        <div
                          className="h-8 rounded-lg shadow-2xs border border-black/10 mb-1"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <span className="font-mono text-slate-500">Primary</span>
                      </div>
                      <div>
                        <div
                          className="h-8 rounded-lg shadow-2xs border border-black/10 mb-1"
                          style={{ backgroundColor: theme.colors.primaryHover }}
                        />
                        <span className="font-mono text-slate-500">Hover</span>
                      </div>
                      <div>
                        <div
                          className="h-8 rounded-lg shadow-2xs border border-black/10 mb-1"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <span className="font-mono text-slate-500">Second</span>
                      </div>
                      <div>
                        <div
                          className="h-8 rounded-lg shadow-2xs border border-black/10 mb-1"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                        <span className="font-mono text-slate-500">Accent</span>
                      </div>
                      <div>
                        <div
                          className="h-8 rounded-lg shadow-2xs border border-black/10 mb-1"
                          style={{ backgroundColor: theme.colors.softAccent }}
                        />
                        <span className="font-mono text-slate-500">Soft</span>
                      </div>
                    </div>
                  </div>

                  {/* Components Container */}
                  <ThemeComponentShowcaseMini theme={theme} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EVALUATION & COMPARISON MATRIX */}
        {(activeTab === 'matrix' || activeTab === 'deep-dive') && (
          <ThemeComparisonMatrix />
        )}
      </main>
    </div>
  )
}

/* =========================================================================
   DETAILED THEME SECTION (TAB 1)
   ========================================================================= */
const ThemeDetailedSection: React.FC<{ theme: ThemeConfig }> = ({ theme }) => {
  return (
    <div className="space-y-12">
      {/* Theme Hero Identity Banner */}
      <div
        className="p-6 sm:p-8 rounded-2xl border transition-all"
        style={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {theme.code}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                style={{
                  backgroundColor: theme.colors.badgeBg,
                  color: theme.colors.badgeText,
                  borderColor: theme.colors.badgeBorder,
                }}
              >
                {theme.concept}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {theme.name}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {theme.description}
            </p>
          </div>

          {/* Hex Reference Box */}
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs text-xs self-start sm:self-auto font-mono">
            <span
              className="w-4 h-4 rounded-md shadow-2xs border border-black/10"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <span className="font-bold text-slate-800">{theme.colors.primary}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{theme.characteristics.primaryContrast}</span>
          </div>
        </div>

        {/* Color Palette Grid */}
        <div className="mt-6 pt-6 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200/80">
            <div
              className="h-10 rounded-lg shadow-2xs border border-black/10 mb-2"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <div className="text-xs font-bold text-slate-900">Primary</div>
            <div className="font-mono text-[11px] text-slate-500">{theme.colors.primary}</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80">
            <div
              className="h-10 rounded-lg shadow-2xs border border-black/10 mb-2"
              style={{ backgroundColor: theme.colors.primaryHover }}
            />
            <div className="text-xs font-bold text-slate-900">Primary Hover</div>
            <div className="font-mono text-[11px] text-slate-500">{theme.colors.primaryHover}</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80">
            <div
              className="h-10 rounded-lg shadow-2xs border border-black/10 mb-2"
              style={{ backgroundColor: theme.colors.secondary }}
            />
            <div className="text-xs font-bold text-slate-900">Secondary</div>
            <div className="font-mono text-[11px] text-slate-500">{theme.colors.secondary}</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80">
            <div
              className="h-10 rounded-lg shadow-2xs border border-black/10 mb-2"
              style={{ backgroundColor: theme.colors.accent }}
            />
            <div className="text-xs font-bold text-slate-900">Accent</div>
            <div className="font-mono text-[11px] text-slate-500">{theme.colors.accent}</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80">
            <div
              className="h-10 rounded-lg shadow-2xs border border-black/10 mb-2"
              style={{ backgroundColor: theme.colors.softAccent }}
            />
            <div className="text-xs font-bold text-slate-900">Soft Accent</div>
            <div className="font-mono text-[11px] text-slate-500">{theme.colors.softAccent}</div>
          </div>
        </div>
      </div>

      {/* Component Library Under Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: UI Primitives */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>UI Primitives & Controls</span>
          </h3>

          {/* 1. Buttons Showcase */}
          <Card className="p-5 border-slate-200 bg-white space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              1. Button Styles
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-[10px] text-white text-xs font-semibold shadow-xs transition-all hover:-translate-y-[1px]"
                style={{ backgroundColor: theme.colors.primary }}
              >
                Primary Button
              </button>

              <button
                type="button"
                className="px-4 py-2 rounded-[10px] text-slate-800 text-xs font-semibold border transition-all hover:bg-slate-50"
                style={{ borderColor: theme.colors.border }}
              >
                Secondary
              </button>

              <button
                type="button"
                className="px-4 py-2 rounded-[10px] text-xs font-semibold transition-all hover:bg-slate-100"
                style={{ color: theme.colors.primary }}
              >
                Ghost Button
              </button>

              <button
                type="button"
                className="px-4 py-2 rounded-[10px] bg-red-600 text-white text-xs font-semibold shadow-xs hover:bg-red-700"
              >
                Destructive
              </button>
            </div>
          </Card>

          {/* 2. Navigation Showcase */}
          <Card className="p-5 border-slate-200 bg-white space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              2. Navigation State
            </span>
            <div className="flex flex-col sm:flex-row gap-2">
              <div
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold flex-1 border"
                style={{
                  backgroundColor: theme.colors.activeNavBg,
                  color: theme.colors.activeNavText,
                  borderColor: theme.colors.badgeBorder,
                }}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Active Item (Overview)</span>
                <span
                  className="w-1.5 h-1.5 rounded-full ml-auto"
                  style={{ backgroundColor: theme.colors.primary }}
                />
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 flex-1 border border-transparent">
                <CalendarCheck className="w-4 h-4 text-slate-400" />
                <span>Inactive Item (Attendance)</span>
              </div>
            </div>
          </Card>

          {/* 3. Form Input & Focus States */}
          <Card className="p-5 border-slate-200 bg-white space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              3. Form Inputs & Focus Indicators
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Focused State
                </label>
                <input
                  type="text"
                  defaultValue="2201004128"
                  className="w-full text-xs px-3 py-2 rounded-lg border bg-white outline-none transition-all shadow-xs"
                  style={{
                    borderColor: theme.colors.primary,
                    boxShadow: `0 0 0 3px ${theme.colors.ringColor}`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Error State
                </label>
                <input
                  type="text"
                  defaultValue="invalid-format"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-red-500 bg-white outline-none text-red-700 shadow-xs focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>
          </Card>

          {/* 4. Progress Gauge & Status */}
          <Card className="p-5 border-slate-200 bg-white space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              4. Progress & Operational Badges
            </span>
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Attendance Meter</span>
                <span className="font-bold tnum" style={{ color: theme.colors.primary }}>
                  86.4%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: '86.4%',
                    backgroundColor: theme.colors.primary,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                style={{
                  backgroundColor: theme.colors.badgeBg,
                  color: theme.colors.badgeText,
                  borderColor: theme.colors.badgeBorder,
                }}
              >
                Theme Pill
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Success
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                Warning
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                Error
              </span>
            </div>
          </Card>
        </div>

        {/* Right Column: Miniature Dashboard & Flow Previews */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Operational Layout Previews</span>
          </h3>

          {/* Miniature Dashboard Preview */}
          <Card
            className="p-5 border shadow-card rounded-2xl overflow-hidden"
            style={{ borderColor: theme.colors.border }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-[10px]"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  OS
                </div>
                <span className="font-bold text-xs text-slate-900">Dashboard Preview</span>
              </div>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{
                  backgroundColor: theme.colors.badgeBg,
                  color: theme.colors.badgeText,
                }}
              >
                Active Session
              </span>
            </div>

            <div className="mt-4 p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Good morning, Abhinash</h4>
                  <p className="text-[10px] text-slate-500">Roll No: 2201004128 • Computer Science</p>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-white shadow-2xs"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  Quick Pass
                </button>
              </div>

              {/* Mini metric cards */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
                  <div className="text-[9px] uppercase font-semibold text-slate-400">Attendance</div>
                  <div className="text-sm font-bold text-slate-900 tnum mt-0.5">86.4%</div>
                  <div className="text-[9px] text-emerald-600 font-medium">Safe buffer</div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
                  <div className="text-[9px] uppercase font-semibold text-slate-400">Requests</div>
                  <div className="text-sm font-bold text-slate-900 tnum mt-0.5">2 Open</div>
                  <div
                    className="text-[9px] font-medium"
                    style={{ color: theme.colors.primary }}
                  >
                    1 In Dispatch
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Operational Timeline Stepper Preview */}
          <Card className="p-5 border-slate-200 bg-white">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-4">
              Operational Stepper
            </span>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  ✓
                </div>
                <span className="font-semibold text-slate-800">Submitted</span>
                <span className="text-slate-400 text-[10px] ml-auto">10:15 AM</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  ✓
                </div>
                <span className="font-semibold text-slate-800">Assigned to Maintenance</span>
                <span className="text-slate-400 text-[10px] ml-auto">10:22 AM</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 animate-pulse"
                  style={{ backgroundColor: theme.colors.secondary }}
                >
                  •
                </div>
                <span className="font-semibold text-slate-800">Technician Dispatched</span>
                <span
                  className="text-[10px] font-medium ml-auto"
                  style={{ color: theme.colors.primary }}
                >
                  In Progress
                </span>
              </div>

              <div className="flex items-center gap-3 opacity-50">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0" />
                <span className="text-slate-600">Student OTP Verification & Closure</span>
                <span className="text-slate-400 text-[10px] ml-auto">Pending</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   FULL LANDING PAGE SIMULATION SECTION (TAB 2)
   ========================================================================= */
const LandingPageSimulationSection: React.FC<{ theme: ThemeConfig }> = ({ theme }) => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900">
          Landing Page Simulation — {theme.name}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Evaluating the full public landing flow under the {theme.name} visual identity.
        </p>
      </div>

      {/* Simulated Landing Page Canvas */}
      <div
        className="rounded-3xl border shadow-xl overflow-hidden relative"
        style={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        }}
      >
        {/* 1. Simulated Navbar */}
        <div className="px-6 py-4 bg-white/80 backdrop-blur-md border-b flex items-center justify-between" style={{ borderColor: theme.colors.border }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-[10px] text-white font-bold text-sm flex items-center justify-center shadow-xs"
              style={{ backgroundColor: theme.colors.primary }}
            >
              OS
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900">CampusOS</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
            <span>Overview</span>
            <span>Features</span>
            <span>How it works</span>
            <span>Resolution Flow</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium px-2 py-1">Sign in</span>
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-[10px] text-white text-xs font-semibold shadow-xs"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* 2. Simulated Hero with Dynamic Theme Glow */}
        <div className="pt-16 pb-14 px-6 text-center relative overflow-hidden">
          {/* Theme Ambient Radial Glow */}
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none -z-0"
            style={{
              background: `radial-gradient(ellipse at center, ${theme.colors.heroGlowFrom} 0%, ${theme.colors.heroGlowTo} 60%, transparent 100%)`,
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border shadow-2xs"
              style={{
                backgroundColor: theme.colors.badgeBg,
                color: theme.colors.badgeText,
                borderColor: theme.colors.badgeBorder,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors.primary }} />
              <span>THE CAMPUS OPERATING SYSTEM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Campus life,{' '}
              <span className={`bg-gradient-to-r ${theme.colors.headlineGradient} bg-clip-text text-transparent`}>
                finally connected.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              One simple platform for students, campus services, requests, communication, and everyday campus operations.
            </p>

            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                className="px-5 py-2.5 rounded-[10px] text-white text-sm font-semibold shadow-sm flex items-center gap-2"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="px-5 py-2.5 rounded-[10px] text-slate-700 bg-white border text-sm font-semibold shadow-2xs hover:bg-slate-50"
                style={{ borderColor: theme.colors.border }}
              >
                Explore CampusOS
              </button>
            </div>
          </div>
        </div>

        {/* 3. Simulated Capabilities Cards */}
        <div className="py-12 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">Everything campus, in one place.</h3>
            <p className="text-xs text-slate-500 mt-1">Designed around the everyday rhythm of student life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-xl border shadow-2xs text-left space-y-2" style={{ borderColor: theme.colors.border }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                style={{
                  backgroundColor: theme.colors.badgeBg,
                  color: theme.colors.primary,
                }}
              >
                <CalendarCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Attendance</h4>
              <p className="text-xs text-slate-500">Subject-wise lecture tracking without hunting through systems.</p>
              <div className="pt-2">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-1.5 rounded-full" style={{ width: '86%', backgroundColor: theme.colors.primary }} />
                </div>
              </div>
            </div>

            <div className="p-5 bg-white rounded-xl border shadow-2xs text-left space-y-2" style={{ borderColor: theme.colors.border }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                style={{
                  backgroundColor: theme.colors.badgeBg,
                  color: theme.colors.primary,
                }}
              >
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Requests</h4>
              <p className="text-xs text-slate-500">Submit and follow campus requests from one place.</p>
              <div className="pt-2">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-semibold border"
                  style={{
                    backgroundColor: theme.colors.badgeBg,
                    color: theme.colors.badgeText,
                    borderColor: theme.colors.badgeBorder,
                  }}
                >
                  Step 2 of 4: In Review
                </span>
              </div>
            </div>

            <div className="p-5 bg-white rounded-xl border shadow-2xs text-left space-y-2" style={{ borderColor: theme.colors.border }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                style={{
                  backgroundColor: theme.colors.badgeBg,
                  color: theme.colors.primary,
                }}
              >
                <Home className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Hostel & Living</h4>
              <p className="text-xs text-slate-500">Stay connected with hostel services and gate pass approvals.</p>
              <div className="pt-2">
                <span className="text-[11px] font-medium text-slate-600">Block B, Room 204 • Pass Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Simulated Final Contrast CTA Section */}
        <div className={`py-14 px-6 text-center text-white bg-gradient-to-b ${theme.colors.darkCtaBg} space-y-4`}>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Make campus life simpler.</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Bring everyday campus services and communication into one connected experience.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              className="px-5 py-2.5 rounded-[10px] text-white text-xs font-semibold shadow-xs"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Get Started
            </button>
            <button
              type="button"
              className="px-5 py-2.5 rounded-[10px] bg-white/10 text-white border border-white/20 text-xs font-semibold hover:bg-white/15"
            >
              Sign in to workspace
            </button>
          </div>
        </div>

        {/* 5. Minimal Footer */}
        <div className="px-6 py-4 bg-white border-t flex items-center justify-between text-xs text-slate-500" style={{ borderColor: theme.colors.border }}>
          <span>CampusOS — Campus Life, Simplified.</span>
          <span className="font-mono text-[11px]">{theme.name} Simulation</span>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   MINI COMPONENT SHOWCASE (FOR SIDE-BY-SIDE TAB 3)
   ========================================================================= */
const ThemeComponentShowcaseMini: React.FC<{ theme: ThemeConfig }> = ({ theme }) => {
  return (
    <Card className="p-4 border-slate-200 bg-white space-y-4 text-left shadow-xs">
      {/* Buttons */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Buttons
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold shadow-2xs"
            style={{ backgroundColor: theme.colors.primary }}
          >
            Primary
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg text-slate-700 bg-slate-50 border text-xs font-medium"
            style={{ borderColor: theme.colors.border }}
          >
            Outline
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Navigation
        </span>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border"
          style={{
            backgroundColor: theme.colors.activeNavBg,
            color: theme.colors.activeNavText,
            borderColor: theme.colors.badgeBorder,
          }}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Overview (Active)</span>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Progress</span>
          <span className="font-bold text-xs tnum" style={{ color: theme.colors.primary }}>
            86.4%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div className="h-1.5 rounded-full" style={{ width: '86%', backgroundColor: theme.colors.primary }} />
        </div>
      </div>

      {/* Badge / Indicator */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
          Badges & Accents
        </span>
        <div className="flex gap-2">
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
            style={{
              backgroundColor: theme.colors.badgeBg,
              color: theme.colors.badgeText,
              borderColor: theme.colors.badgeBorder,
            }}
          >
            Active Pass
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Resolved
          </span>
        </div>
      </div>
    </Card>
  )
}

/* =========================================================================
   COMPARISON MATRIX SECTION (TAB 4 & SECTION 8)
   ========================================================================= */
const ThemeComparisonMatrix: React.FC = () => {
  const rows = [
    {
      label: 'Primary Color',
      teal: THEME_TEAL.characteristics.primaryColor,
      blue: THEME_BLUE.characteristics.primaryColor,
      coral: THEME_CORAL.characteristics.primaryColor,
    },
    {
      label: 'Primary Contrast (WCAG)',
      teal: THEME_TEAL.characteristics.primaryContrast,
      blue: THEME_BLUE.characteristics.primaryContrast,
      coral: THEME_CORAL.characteristics.primaryContrast,
    },
    {
      label: 'Hero Appearance',
      teal: THEME_TEAL.characteristics.heroAppearance,
      blue: THEME_BLUE.characteristics.heroAppearance,
      coral: THEME_CORAL.characteristics.heroAppearance,
    },
    {
      label: 'Dashboard Appearance',
      teal: THEME_TEAL.characteristics.dashboardAppearance,
      blue: THEME_BLUE.characteristics.dashboardAppearance,
      coral: THEME_CORAL.characteristics.dashboardAppearance,
    },
    {
      label: 'Button Appearance',
      teal: THEME_TEAL.characteristics.buttonAppearance,
      blue: THEME_BLUE.characteristics.buttonAppearance,
      coral: THEME_CORAL.characteristics.buttonAppearance,
    },
    {
      label: 'Navigation Appearance',
      teal: THEME_TEAL.characteristics.navigationAppearance,
      blue: THEME_BLUE.characteristics.navigationAppearance,
      coral: THEME_CORAL.characteristics.navigationAppearance,
    },
    {
      label: 'Accessibility Summary',
      teal: THEME_TEAL.characteristics.accessibility,
      blue: THEME_BLUE.characteristics.accessibility,
      coral: THEME_CORAL.characteristics.accessibility,
    },
    {
      label: 'Overall Visual Character',
      teal: THEME_TEAL.characteristics.overallVisualCharacter,
      blue: THEME_BLUE.characteristics.overallVisualCharacter,
      coral: THEME_CORAL.characteristics.overallVisualCharacter,
    },
  ]

  return (
    <div className="space-y-6 pt-6 border-t border-slate-200">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900">Comprehensive Evaluation Matrix</h2>
        <p className="text-xs text-slate-500 mt-1">
          Direct side-by-side analysis of brand attributes, contrast ratios, and visual ergonomics across candidates.
        </p>
      </div>

      <Card className="overflow-x-auto border-slate-200 shadow-xs bg-white">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="p-4 font-bold text-slate-700 w-1/4">Evaluation Attribute</th>
              <th className="p-4 font-bold text-teal-800 w-1/4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" />
                  <span>Campus Teal (Theme A)</span>
                </div>
              </th>
              <th className="p-4 font-bold text-blue-800 w-1/4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                  <span>Campus Blue (Theme B)</span>
                </div>
              </th>
              <th className="p-4 font-bold text-rose-800 w-1/4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                  <span>Campus Coral (Theme C)</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-800 align-top">{r.label}</td>
                <td className="p-4 text-slate-600 align-top leading-relaxed">{r.teal}</td>
                <td className="p-4 text-slate-600 align-top leading-relaxed">{r.blue}</td>
                <td className="p-4 text-slate-600 align-top leading-relaxed">{r.coral}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
