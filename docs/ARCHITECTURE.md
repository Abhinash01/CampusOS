# CampusOS — System Architecture

**Product:** CampusOS  
**Tagline:** Campus Life, Simplified.  
**Version:** Phase 0 (Product Foundation, Design System & Application Shell)  
**Hackathon:** BPUT Hackathon 2026 — Fretbox Problem Statement 07: “Attendance, Mess, Hostel, Repeat: Campus Life, Debugged.”  

---

## 1. Executive Architecture Overview

CampusOS is designed not as a generic academic CRUD system, but as an **operating layer for a connected campus community**. The architecture treats the university as a micro-city comprising multiple interconnected stakeholders: Students, Wardens, Technicians, Department Administrators, Security Guards, and Senior Leadership.

The system is decoupled into three primary strata:
1. **Experience & Presentation Layer (Frontend & PWA)** — Immediate focus of Phase 0.
2. **Operations & Business Logic Engine (Backend Services)** — Decoupled REST, WebSockets, and event queues for real-time ticket dispatch and approval routing.
3. **Intelligence & Telemetry Layer (AI & Analytics)** — Automated classification, predictive demand analytics, and smart kiosk assistants.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Client Presentation                           │
│  [Student Mobile/PWA]   [Admin Portal]   [Warden Station]   [Kiosks]    │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ HTTPS / WSS
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     API Gateway & Route Director                        │
│             Rate Limiting • JWT Auth • Role-Based Access                │
└──────────────────┬─────────────────┬──────────────────┬─────────────────┘
                   │                 │                  │
                   ▼                 ▼                  ▼
┌───────────────────────┐ ┌──────────────────┐ ┌──────────────────────────┐
│  Academic & Identity  │ │ Operations & SLA │ │ Notification Engine      │
│  - Attendance Sync    │ │ - Ticket Routing │ │ - Push / SMS / WhatsApp  │
│  - Roll Registry      │ │ - Gate Pass Core │ │ - Targeted Circulars     │
└──────────┬────────────┘ └────────┬─────────┘ └────────────┬─────────────┘
           │                       │                        │
           ▼                       ▼                        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     Data Persistence & Event Stream                     │
│               MongoDB Replica Set • Redis Queue • S3 Store              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture (Current & Future)

### 2.1 Technology Stack

| Layer | Technology | Status | Rationale |
| :--- | :--- | :--- | :--- |
| **Core Framework** | React 19 + TypeScript | `Implemented in Phase 0` | Type-safety, modern concurrency, component ecosystem. |
| **Build Tooling** | Vite | `Implemented in Phase 0` | Blazing fast HMR and optimized ESM builds. |
| **Styling** | Tailwind CSS + CSS Variables | `Implemented in Phase 0` | Unified design tokens, responsive utility classes, zero runtime overhead. |
| **Component System**| shadcn/ui design patterns | `Implemented in Phase 0` | Accessible, unstyled primitives customizable to CampusOS tokens. |
| **Iconography** | Lucide React | `Implemented in Phase 0` | Consistent, clean icon language. |
| **Animation** | Motion for React (`framer-motion`) | `Implemented in Phase 0` | Physics-based micro-interactions, page transitions, reduced-motion compliance. |
| **Routing** | React Router v7 | `Implemented in Phase 0` | Declarative client-side routing, nested layouts, role-based shells. |
| **Client State** | Zustand | `Implemented in Phase 0` | Lightweight store for active role switching, sidebar state, theme tokens. |
| **Server State** | TanStack Query v5 | `Implemented in Phase 0` | Prepared for async caching, optimistic updates, and background refetching. |
| **Form Validation** | React Hook Form + Zod | `Implemented in Phase 0` | Schema-driven client validation for student tickets and gate pass applications. |
| **PWA Engine** | `vite-plugin-pwa` | `Implemented in Phase 0` | Web App Manifest, Service Worker registration, and offline asset caching. |

---

## 3. Directory & Component Architecture (`Implemented in Phase 0`)

The codebase enforces strict separation of concerns to scale across teams:

```
src/
├── app/                  # Application bootstrap, App.tsx, QueryClientProvider, RouterProvider
├── components/
│   ├── ui/               # Atomic design primitives (Button, Input, Badge, Card, Modal, etc.)
│   ├── layout/           # Global application shell, Sidebar, Topbar, MobileNav, RoleSwitcher
│   ├── feedback/         # Toast provider, EmptyState, ErrorState, OfflineBanner
│   └── motion/           # Motion wrappers (FadeIn, StaggerContainer, ScaleOnHover)
├── features/             # Domain-specific feature modules (Prepared for future phases)
│   ├── student/          # Student-specific components and mocks
│   ├── admin/            # Admin command center widgets
│   ├── warden/           # Warden verification cards
│   └── staff/            # Field technician job items
├── hooks/                # Custom React hooks (useReducedMotion, useOnlineStatus, useDisclosure)
├── lib/                  # Utility functions (cn helper, formatters, constants)
├── pages/                # Page route components
│   ├── public/           # Landing, Login, ForgotPassword
│   ├── app/              # StudentApp, AdminApp, WardenApp, StaffApp shells
│   └── design-system/    # Living design system showcase
├── routes/               # Route definitions and navigation guards
├── stores/               # Zustand stores (useAppStore, useRoleStore)
├── styles/               # Global CSS, design tokens, Tailwind setup
└── types/                # TypeScript interfaces, domain entities, route definitions
```

---

## 4. Design System & Styling Architecture (`Implemented in Phase 0`)

### 4.1 Token Specification
CampusOS strictly avoids generic templates or chaotic colors. Tokens are managed centrally:
* **Background (`--bg-canvas`):** `#F8FAFC` (Slate 50) — Crisp, distraction-free neutral.
* **Surface (`--bg-surface`):** `#FFFFFF` (Pure White) — Elevated card surfaces.
* **Border (`--border-subtle`):** `#E2E8F0` (Slate 200) — Deliberate, crisp boundaries.
* **Text Primary (`--text-primary`):** `#0F172A` (Slate 900) — High-contrast legibility.
* **Text Secondary (`--text-secondary`):** `#64748B` (Slate 500) — Subdued contextual copy.
* **Primary Accent (`--accent-primary`):** `#4F46E5` (Indigo 600) — Authoritative, calm operational accent.
* **Success (`--color-success`):** `#16A34A` (Green 600) — Approvals, high attendance, resolutions.
* **Warning (`--color-warning`):** `#D97706` (Amber 600) — Pending reviews, attendance warnings.
* **Danger (`--color-danger`):** `#DC2626` (Red 600) — Overdue SLA, gate pass rejections, emergency tickets.

### 4.2 Typography Hierarchy
Modern sans-serif typography utilizing system native fonts and tabular numerals (`font-feature-settings: 'tnum'`) for analytical data:
* **Display / Page Title:** 24px - 32px, Semibold, -0.02em tracking
* **Section Heading:** 18px - 20px, Medium
* **Body Text:** 14px - 15px, Regular, 1.5 line height
* **Metric Numbers:** 24px - 36px, Bold, Tabular figures
* **Caption / Label:** 12px - 13px, Medium, +0.01em tracking

---

## 5. Animation System (`Implemented in Phase 0`)

Built with `framer-motion` to guarantee purposeful, non-distracting UI motion:
1. **Page Entrance:** Soft fade with subtle upward translation (`opacity: 0 -> 1, y: 8 -> 0`).
2. **Staggered Sequences:** List cards and metric panels reveal with 40ms stagger offsets.
3. **Modal & Dialogs:** Physics spring scale transition (`scale: 0.96 -> 1.0, opacity: 0 -> 1`).
4. **Button Feedback:** Micro-tap scale (`scale: 0.98`) providing immediate tactile feedback.
5. **Reduced Motion Adaptation:** Respects system `prefers-reduced-motion: reduce` by disabling non-essential positional shifts and dropping durations to zero.

---

## 6. Progressive Web App (PWA) Foundation (`Implemented in Phase 0`)

The platform is configured with `vite-plugin-pwa`:
* **App Manifest:** Defines `CampusOS`, short name, standalone display mode, theme color (`#4F46E5`), and icon assets.
* **Service Worker Registration:** Configured for auto-updating precache strategy for app shell assets.
* **Offline UI State:** Prepares visual banner notifying the user of connectivity loss while preserving readable cached UI.

---

## 7. Future Backend Architecture (`Planned for future phases`)

The backend will be developed in Phase 1 and beyond using:
* **Runtime:** Node.js with Express.js and TypeScript.
* **Database:** MongoDB with Mongoose schema modeling.
* **Authentication:** Stateless JWT with refresh tokens in HttpOnly cookies.
* **Real-time Engine:** Socket.IO for live ticket status notifications and gate pass scanning events.
* **Worker Queue:** BullMQ / Redis for automated notice scheduling and ticket SLA escalation timers.

```
┌───────────────────────────────────────────────────────────┐
│                      Express.js API                       │
├─────────────────────┬───────────────────┬─────────────────┤
│  /api/v1/auth       │  /api/v1/tickets  │  /api/v1/passes │
│  - Login / Refresh  │  - Create / Route │  - Apply / Scan │
│  - Role Verification│  - SLA Escalation │  - Warden Sign  │
└─────────────────────┴───────────────────┴─────────────────┘
```

---

## 8. Future Role-Based Access Control (RBAC) (`Planned for future phases`)

A unified JWT payload will encode the principal's role and permission scope:
* `STUDENT`: Can create tickets, apply for gate passes, request certificates, view personal attendance/mess.
* `ADMIN`: Master oversight, department configuration, batch user management, SLA analytics.
* `WARDEN`: Hostel-specific scope, gate pass approval, room allocation, wing inspection.
* `STAFF`: Assigned task workbench, photo upload for repairs, repair sign-off via OTP.
* `GUARD`: Security checkpoint gate pass scanner and visitor log reader.

---

## 9. Future AI & Intelligence Layer (`Planned for future phases`)

The intelligence tier will operate as a standalone microservice:
* **Runtime:** Python 3.11 with FastAPI.
* **Ticket Classification Engine:** Natural language parser that automatically maps unstructured student complaints (e.g., "water dripping under washbasin in room 204") to `{ Category: "Plumbing", Block: "Hostel B", Urgency: "Medium", Assignee: "Tech_Plumb_02" }`.
* **Campus Life Assistant:** Retrieval-Augmented Generation (RAG) over university ordinances, academic calendars, and hostel regulations.
* **Predictive Demand Forecasting:** Time-series prediction on mess dining turnout based on approved gate passes to reduce food wastage.
