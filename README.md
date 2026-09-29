# CampusOS — Campus Life, Simplified.

> **BPUT Hackathon 2026** — *Problem Statement 07: “Attendance, Mess, Hostel, Repeat: Campus Life, Debugged.”*  
> **Status:** Phase 0 — Product Foundation, Design System & Application Shell  
> **Environment:** Local Development Prototype (Production-Grade Architecture)

---

## 1. Introduction & Executive Vision

**CampusOS** is an operating system for campus life. Rather than merely digitizing college paperwork into a static, disconnected academic ERP, CampusOS treats a university campus like a **connected small city**.

```text
Students ──► CampusOS ──► Requests ──► Operations ──► Staff ──► Resolution
                  │                                                │
                  ▼                                                ▼
           Notifications ───────── Tracking ───────── Analytics ───┘
                  │
                  ▼
            Administration
```

CampusOS replaces fragmented physical registers at hostel security desks, paper leave forms requiring multiple signatures, circulars lost in noisy WhatsApp groups, and counter queues with a **single, unified, and automated operational platform**.

---

## 2. Product Philosophy

> **"Build the operating layer of a university campus, not just a college management website."**

When a student files an issue like *"My hostel bathroom tap has been leaking for 9 days,"* the student shouldn't need to know which office or technician is on call. CampusOS automatically classifies the issue, identifies the hostel block and trade (Plumbing), assigns the on-duty technician, notifies the warden, tracks the SLA, verifies resolution via a 4-digit student OTP, and records the audit trail.

---

## 3. Technology Stack (Phase 0 Foundation)

* **UI Framework:** React 19 + TypeScript (Strict Mode)
* **Build System:** Vite
* **Styling System:** Tailwind CSS + Centralized Design Tokens (HSL)
* **Design Philosophy:** Linear & Stripe-grade visual discipline; zero generic templates
* **Iconography:** Lucide React
* **Motion & Micro-interactions:** Motion for React (`framer-motion`) with `prefers-reduced-motion` compliance
* **Navigation & Routing:** React Router v7 with dynamic role-based application shells
* **Client State:** Zustand (Active role switcher, sidebar state, simulated offline toggles)
* **Server State:** TanStack Query v5 (Architecture prepared for Phase 1+ API contracts)
* **PWA Engine:** `vite-plugin-pwa` with Web App Manifest and Service Worker registration

---

## 4. Project Structure

```text
CampusOS/
├── docs/                             # Core Product & Architecture Documentation
│   ├── PAGES.md                      # Guide for all pages, personas & routes
│   ├── ARCHITECTURE.md               # Frontend, backend, PWA & AI specs
│   ├── WORKFLOWS.md                  # Detailed 5 core campus workflows
│   └── DEVELOPMENT_PHASES.md         # Roadmap from Phase 0 to Phase 10
├── public/                           # Static assets, favicon, PWA icons
│   └── favicon.svg                   # Minimal CampusOS technology wordmark
├── src/
│   ├── app/                          # App bootstrap, Providers
│   ├── components/
│   │   ├── feedback/                 # EmptyState, ErrorState, OfflineBanner, PhasePlaceholder
│   │   ├── layout/                   # AppShell, Topbar, Sidebar, MobileNav, RoleSwitcher, SearchModal
│   │   ├── motion/                   # FadeIn, StaggerContainer, ScaleOnHover, AnimatedNumber
│   │   └── ui/                       # Button, Input, Badge, Card, Modal, Drawer, Skeleton, Table, Toast
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utility functions (cn helper, date formatters)
│   ├── pages/
│   │   ├── app/                      # Persona dashboards (Student, Admin, Warden, Staff)
│   │   ├── design-system/            # Living design system catalog (/design-system)
│   │   └── public/                   # LandingPage, LoginPage, ForgotPasswordPage
│   ├── routes/                       # Router definitions & placeholder mappings
│   ├── stores/                       # Zustand appStore (Role switcher & UI states)
│   ├── styles/                       # CSS custom properties & design tokens
│   ├── types/                        # TypeScript type definitions
│   ├── App.tsx                       # Main application shell with providers
│   ├── index.css                     # Tailwind directives, CSS tokens & tnum setup
│   └── main.tsx                      # React root entrypoint
├── index.html                        # HTML5 document with SEO & Inter typography
├── package.json                      # Dependencies and npm scripts
├── postcss.config.js                 # PostCSS setup
├── tailwind.config.js                # Design token mapping (#F8FAFC, #4F46E5, etc.)
├── tsconfig.json                     # TypeScript config
├── tsconfig.app.json                 # Bundler config with path alias (@/*)
└── vite.config.ts                    # Vite config with PWA & alias integration
```

---

## 5. Getting Started (Localhost Development)

### Prerequisites
* Node.js (v18 or higher recommended)
* npm (v9 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Development Server
```bash
npm run dev
```

### 3. Open in Browser
Visit the development URL displayed in your terminal (typically):
```text
http://localhost:5173
```

---

## 6. Route Navigation Guide

| Route | Role / Scope | Description |
| :--- | :--- | :--- |
| `/` | Public | Product landing page, problem vs. solution breakdown, and live preview |
| `/login` | Public | Authentication gateway with interactive persona switcher |
| `/forgot-password` | Public | Password recovery workflow shell |
| `/app` | Authenticated | Redirects directly to the active role's dashboard |
| `/app/student` | Student | Student Central Command (Attendance, Schedule, Pass, Mess) |
| `/app/admin` | Admin | Campus Operations Command Center (SLA, Complaints, Velocity) |
| `/app/warden` | Warden | Hostel Station (Roll-call, Gate passes, Room roster) |
| `/app/staff` | Staff | Technician Workbench (Task queue, directions, OTP closure) |
| `/design-system` | Developer | Living component library and token showcase |

*Note: Navigating to future sub-routes (e.g. `/app/student/attendance`, `/app/admin/analytics`) renders a polished `PhasePlaceholder` documenting the upcoming phase, requirements, and scheduled capabilities without any fake backend code.*

---

## 7. Current Limitations & Architecture Boundaries

* **No Backend in Phase 0:** Phase 0 does not implement a live backend database, real JWT session verification, or live socket connections. Everything is client-side and architecture-ready.
* **No Fake Mock Data:** The platform explicitly avoids fake APIs claiming to connect to a live backend.
* **Offline Synchronization:** Phase 0 includes the PWA manifest, service worker registration, and the offline UI banner/toggle. True background queueing and IndexedDB sync will arrive in Phase 8.

---

## 8. Development Roadmap

* **Phase 0:** Product Foundation, Design System & Application Shell `[CURRENT]`
* **Phase 1:** Public Experience & Real JWT Authentication
* **Phase 2:** Student Experience (Attendance, Schedule, Profile)
* **Phase 3:** Core End-to-End Workflows (Gate Pass, Complaints, Certificates)
* **Phase 4:** Campus Operations (Hostel, Mess, Staff Workbench)
* **Phase 5:** Admin Command Center & Immutable Audit Logs
* **Phase 6:** Communication Layer & Targeted Notices
* **Phase 7:** Intelligence & AI (Auto-routing & Assistant)
* **Phase 8:** Low-Bandwidth, Offline Sync & Physical Kiosks
* **Phase 9:** Premium UX Polish & Micro-interactions
* **Phase 10:** Production Deployment & Hackathon Presentation

---

## 9. Hackathon Documentation Links

* [Page Directory & Specifications (docs/PAGES.md)](file:///c:/Users/DELL/Desktop/CampusOS/docs/PAGES.md)
* [System Architecture Specification (docs/ARCHITECTURE.md)](file:///c:/Users/DELL/Desktop/CampusOS/docs/ARCHITECTURE.md)
* [Core Campus Workflows (docs/WORKFLOWS.md)](file:///c:/Users/DELL/Desktop/CampusOS/docs/WORKFLOWS.md)
* [Development Roadmap Phases (docs/DEVELOPMENT_PHASES.md)](file:///c:/Users/DELL/Desktop/CampusOS/docs/DEVELOPMENT_PHASES.md)
