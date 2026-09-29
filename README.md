# CampusOS — Campus Life, Simplified.

> **BPUT Hackathon 2026** — *Problem Statement 07: “Attendance, Mess, Hostel, Repeat: Campus Life, Debugged.”*  
> **Status:** Phase 1 Completed — Public Experience, Real Authentication & Backend Foundation  
> **Environment:** Production-Grade Full-Stack Architecture (Frontend + Backend API)

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

* **Restrained & Professional:** Designed with Linear-level cleanliness and Notion-level simplicity. Zero generic AI templates, zero fake metrics, and zero clutter.
* **Role-Appropriate Isolation:** Dedicated workspaces for students, administrators, hostel wardens, and maintenance technicians with strict backend role verification.
* **Real Security & Resilient Architecture:** Real JWT access and refresh token authentication, bcrypt password hashing, input validation via Zod, rate limiting, and secure HTTP-only cookies.

---

## 3. Technology Stack

### Frontend Client
* **UI Framework:** React 19 + TypeScript (Strict Mode)
* **Build System:** Vite 8
* **Styling System:** Tailwind CSS + Centralized Design Tokens (HSL)
* **Design Philosophy:** Modern university operations platform; calm, trustworthy, high-density layouts
* **Iconography:** Lucide React
* **Motion & Micro-interactions:** Motion for React (`framer-motion`) with `prefers-reduced-motion` compliance
* **Navigation & Routing:** React Router v7 with role-based route guards (`ProtectedRoute.tsx`)
* **State Management:**
  * **Server State:** TanStack Query v5 for API caching and mutations
  * **Auth Store:** Zustand for token synchronization and user session
  * **UI Store:** Zustand for layout and responsive drawer state
* **Forms & Validation:** React Hook Form + Zod (`@hookform/resolvers/zod`)
* **PWA Engine:** `vite-plugin-pwa` with Web App Manifest and Service Worker registration

### Backend Service (`/server`)
* **Runtime:** Node.js + Express.js with TypeScript (`tsx` runtime / `tsc` build)
* **Database & ORM:** MongoDB + Mongoose (with development in-memory store fallback for seamless zero-setup evaluation)
* **Authentication:** JWT access tokens (short-lived) + HTTP-only refresh tokens
* **Password Security:** Salted hashing with `bcryptjs`
* **Schema Validation:** Zod request body validation
* **HTTP Security:** Helmet, CORS with credentials, express-rate-limit, and cookie-parser

---

## 4. Project Structure

```text
CampusOS/
├── server/                           # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/                   # Environment validation & DB connection
│   │   ├── controllers/              # Auth & session controllers
│   │   ├── middleware/               # JWT auth guard, role authorizer, rate limiter, error handler
│   │   ├── models/                   # Mongoose User model (STUDENT, ADMIN, WARDEN, STAFF)
│   │   ├── routes/                   # Auth routes (/register, /login, /refresh, /me, etc.)
│   │   ├── services/                 # User management, token hashing, account seeding
│   │   ├── utils/                    # JWT signing & bcrypt password hashing
│   │   └── index.ts                  # Express application root
│   ├── .env.example                  # Backend environment template
│   ├── package.json                  # Backend dependencies & scripts
│   └── tsconfig.json                 # Backend TypeScript configuration
├── docs/                             # Core Product & Architecture Documentation
│   ├── PAGES.md                      # Guide for all pages, personas & routes
│   ├── ARCHITECTURE.md               # Frontend, backend, PWA & AI specs
│   ├── WORKFLOWS.md                  # Detailed 5 core campus workflows
│   └── DEVELOPMENT_PHASES.md         # Roadmap from Phase 0 to Phase 10
├── public/                           # Static assets, favicon, PWA icons
├── src/
│   ├── components/
│   │   ├── feedback/                 # EmptyState, ErrorState, OfflineBanner, PhasePlaceholder
│   │   ├── layout/                   # AppShell, Topbar, Sidebar, MobileNav, SearchModal
│   │   ├── motion/                   # FadeIn, StaggerContainer, ScaleOnHover, AnimatedNumber
│   │   └── ui/                       # Button, Input, Badge, Card, Modal, Drawer, Skeleton, Table, Toast
│   ├── features/
│   │   └── auth/                     # auth.api, auth.hooks, auth.store, auth.types, ProtectedRoute
│   ├── pages/
│   │   ├── app/                      # Persona dashboards (Student, Admin, Warden, Staff)
│   │   ├── design-system/            # Living component system catalog (/design-system)
│   │   └── public/                   # LandingPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage
│   ├── routes/                       # Router definitions & ProtectedRoute boundaries
│   ├── stores/                       # Zustand appStore (Sidebar & UI states)
│   ├── types/                        # TypeScript type definitions
│   ├── App.tsx                       # Main application shell with providers & auth init
│   └── index.css                     # Tailwind directives, CSS tokens & typography
├── package.json                      # Frontend dependencies and npm scripts
└── vite.config.ts                    # Vite config with API proxy (/api -> http://localhost:5000)
```

---

## 5. Getting Started (Localhost Development)

### 1. Start the Backend API Server
In a separate terminal:
```bash
cd server
npm install
npm run dev
```
The server will start at `http://localhost:5000`.

### 2. Start the Frontend Client
In the repository root:
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser. Vite automatically proxies `/api` requests to the backend server at `http://localhost:5000`.

---

## 6. Seed Credentials for Local Evaluation

The backend automatically initializes demo accounts on startup:

| Role | Email | Password | Student ID / Roll | Destination Dashboard |
| :--- | :--- | :--- | :--- | :--- |
| **Student** | `student@campusos.edu` | `Campus@123` | `2201004128` | `/app/student` |
| **Administrator** | `admin@campusos.edu` | `Campus@123` | N/A | `/app/admin` |
| **Hostel Warden** | `warden@campusos.edu` | `Campus@123` | N/A | `/app/warden` |
| **Maintenance Staff** | `staff@campusos.edu` | `Campus@123` | N/A | `/app/staff` |

> *Note: New student accounts can also be created anytime via the public student registration form at `/register`.*

---

## 7. Route Navigation Guide

| Route | Role / Scope | Description |
| :--- | :--- | :--- |
| `/` | Public | CampusOS landing page highlighting core campus operational capabilities |
| `/login` | Public | Real authentication gateway (auto-redirects to appropriate persona dashboard) |
| `/register` | Public | Student registration form with Zod validation |
| `/forgot-password` | Public | Password recovery request with development reset token integration |
| `/reset-password` | Public | Secure password reset form with token verification |
| `/app` | Authenticated | Automatic role redirector |
| `/app/student` | STUDENT | Student Central Command (Attendance, Living, Requests, Notices) |
| `/app/admin` | ADMIN | Campus Operations Command Center (Oversight, Requests, Hostels) |
| `/app/warden` | WARDEN | Hostel Station (Gate passes, Roll-call, Room roster) |
| `/app/staff` | STAFF | Technician Workbench (Assigned tasks, incident logs) |
| `/design-system` | Developer | Living component catalog and token showcase |

---

## 8. Development Roadmap

* **Phase 0:** Product Foundation, Design System & Application Shell `[COMPLETED]`
* **Phase 1:** Public Experience & Real JWT Authentication `[COMPLETED]`
* **Phase 2:** Student Experience (Attendance, Schedule, Profile)
* **Phase 3:** Core End-to-End Workflows (Gate Pass, Complaints, Certificates)
* **Phase 4:** Campus Operations (Hostel, Mess, Staff Workbench)
* **Phase 5:** Admin Command Center & Immutable Audit Logs
* **Phase 6:** Communication Layer & Targeted Notices
* **Phase 7:** Intelligence & AI (Auto-routing & Assistant)
* **Phase 8:** Low-Bandwidth, Offline Sync & Physical Kiosks
* **Phase 9:** Premium UX Polish & Micro-interactions
* **Phase 10:** Production Deployment & Hackathon Presentation
