import React, { useEffect } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { LandingPage } from '@/pages/public/LandingPage'
import { LoginPage } from '@/pages/public/LoginPage'
import { ForgotPasswordPage } from '@/pages/public/ForgotPasswordPage'
import { StudentDashboard } from '@/pages/app/StudentDashboard'
import { AdminDashboard } from '@/pages/app/AdminDashboard'
import { WardenDashboard } from '@/pages/app/WardenDashboard'
import { StaffDashboard } from '@/pages/app/StaffDashboard'
import { DesignSystemPage } from '@/pages/design-system/DesignSystemPage'
import { PhasePlaceholder } from '@/components/feedback/PhasePlaceholder'
import { useAppStore } from '@/stores/appStore'

// Helper component that redirects `/app` to active persona dashboard
const AppIndexRedirect: React.FC = () => {
  const currentRole = useAppStore((state) => state.currentRole)
  return <Navigate to={`/app/${currentRole}`} replace />
}

// Helper wrapper to sync active role with route
const RoleSyncWrapper: React.FC<{ role: 'student' | 'admin' | 'warden' | 'staff'; children: React.ReactNode }> = ({
  role,
  children,
}) => {
  const setRole = useAppStore((state) => state.setRole)
  useEffect(() => {
    setRole(role)
  }, [role, setRole])
  return <>{children}</>
}

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/design-system',
    element: <DesignSystemPage />,
  },

  // Authenticated App Shell Routes
  {
    path: '/app',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <AppIndexRedirect />,
      },

      // Student Persona
      {
        path: 'student',
        element: (
          <RoleSyncWrapper role="student">
            <StudentDashboard />
          </RoleSyncWrapper>
        ),
      },
      {
        path: 'student/attendance',
        element: (
          <PhasePlaceholder
            title="Academic Attendance"
            phaseNumber={2}
            description="Subject-wise lecture tracking, medical leave balance, deficit calculator, and automatic professor notifications."
            plannedFeatures={[
              'Subject-by-subject percentage meter and safe skip calculator',
              'Geofenced / Bluetooth BLE lecture attendance confirmation',
              'Medical leave document upload and dean approval ledger',
              'Automated warning triggers when approaching 75% threshold',
            ]}
            parentRoute="/app/student"
          />
        ),
      },
      {
        path: 'student/timetable',
        element: (
          <PhasePlaceholder
            title="Timetable & Class Schedule"
            phaseNumber={2}
            description="Interactive weekly timetable with real-time class rescheduling, room changes, and faculty substitute alerts."
            plannedFeatures={[
              'Weekly day-by-day lecture timeline with classroom locations',
              'WebSocket live push for sudden class cancellations or room shifts',
              'Export schedule to Google Calendar and Apple iCal',
              'Lab batch partition and practical assignment deadlines',
            ]}
            parentRoute="/app/student"
          />
        ),
      },
      {
        path: 'student/notices',
        element: (
          <PhasePlaceholder
            title="Campus & Department Notices"
            phaseNumber={2}
            description="Granular circulars targeted specifically by branch, semester, hostel wing, and club affiliations."
            plannedFeatures={[
              'Targeted filtering without WhatsApp noise or irrelevant circulars',
              'Cryptographically signed official university PDF downloads',
              'Mandatory read-receipt tracking for critical exam alerts',
              'Bookmark circulars for offline access in poor connectivity',
            ]}
            parentRoute="/app/student"
          />
        ),
      },
      {
        path: 'student/notifications',
        element: (
          <PhasePlaceholder
            title="Student Notifications Hub"
            phaseNumber={2}
            description="Centralized transactional notifications for gate pass updates, complaint resolution progress, and mess timings."
            plannedFeatures={[
              'Unified transactional inbox across all campus departments',
              'Real-time WebSocket alerts with audio chimes',
              'Deep-linking straight to the affected ticket or pass',
              'Push notification preference management',
            ]}
            parentRoute="/app/student"
          />
        ),
      },
      {
        path: 'student/gate-pass',
        element: (
          <PhasePlaceholder
            title="Digital Gate Pass & Outings"
            phaseNumber={3}
            description="Apply for day outings, night leaves, or emergency homeward travel with digital parent authorization and QR gate checkout."
            plannedFeatures={[
              '1-minute application with departure time and purpose',
              'Integrated automated parent verification via SMS OTP',
              'Warden queue adjudication with instant in-app pass generation',
              'Dynamic expiring QR code for main gate security scan',
            ]}
            parentRoute="/app/student"
          />
        ),
      },
      {
        path: 'student/complaints',
        element: (
          <PhasePlaceholder
            title="Hostel Complaints & Maintenance"
            phaseNumber={3}
            description="Lodge infrastructure complaints (plumbing, electrical, Wi-Fi) with photo evidence, automatic triage, and technician dispatch."
            plannedFeatures={[
              'Photo capture and automatic room & category classification',
              'Real-time SLA status tracker (Queued -> Dispatched -> In Progress -> Resolved)',
              '4-digit verification OTP provided to technician for ticket closure',
              'Technician quality rating and recurring issue alerts',
            ]}
            parentRoute="/app/student"
          />
        ),
      },
      {
        path: 'student/certificates',
        element: (
          <PhasePlaceholder
            title="Certificate & Document Requests"
            phaseNumber={3}
            description="Request official university certificates (Bona Fide, Fee Structure, Conduct) with digital signatures and QR verification."
            plannedFeatures={[
              'Self-service selection of certificate type and purpose',
              'Automated verification of accounts and library no-dues status',
              'Single-click registrar digital signature',
              'Tamper-proof PDF generation with verification QR code',
            ]}
            parentRoute="/app/student"
          />
        ),
      },
      {
        path: 'student/hostel',
        element: (
          <PhasePlaceholder
            title="Hostel Living & Room Records"
            phaseNumber={4}
            description="Room occupancy status, roommate details, hostel warden contacts, and room asset inventory condition."
            plannedFeatures={[
              'Room bed allocation and roommate directory',
              'Asset condition checklist (fan, study table, lock, wardrobe)',
              'Mutual room swap matching and request submission',
              'Hostel caretaker and emergency contact directory',
            ]}
            parentRoute="/app/student"
          />
        ),
      },
      {
        path: 'student/mess',
        element: (
          <PhasePlaceholder
            title="Mess Operations & Dining"
            phaseNumber={4}
            description="Daily meal schedule with nutrition tags, micro-feedback ratings, and automated mess rebate calculations."
            plannedFeatures={[
              'Live meal countdown and daily breakfast, lunch, dinner menus',
              '10-second post-meal rating to maintain caterer accountability',
              'Automated rebate deduction for students on approved gate pass',
              'Dining hall crowd meter to avoid peak rush hours',
            ]}
            parentRoute="/app/student"
          />
        ),
      },
      {
        path: 'student/fees',
        element: (
          <PhasePlaceholder
            title="Fees & Dues Clearance"
            phaseNumber={4}
            description="Transparent financial ledger of tuition fees, hostel rent, mess bills, library fines, and official payment receipts."
            plannedFeatures={[
              'Category-wise dues breakdown and payment deadline schedule',
              'Instant fee receipt downloads with university transaction reference',
              'Automated No-Dues clearance engine for graduating students',
              'Integration with UPI and net banking payment gateways',
            ]}
            parentRoute="/app/student"
          />
        ),
      },
      {
        path: 'student/profile',
        element: (
          <PhasePlaceholder
            title="Student Profile & Digital ID"
            phaseNumber={2}
            description="Student academic record, emergency contacts, local guardian info, and cryptographic digital student ID."
            plannedFeatures={[
              'Official enrollment and academic registry details',
              'Tamper-proof digital student identity card with QR code',
              'Parent and emergency contact directory',
              'Active devices and session authorization management',
            ]}
            parentRoute="/app/student"
          />
        ),
      },

      // Administrator Persona
      {
        path: 'admin',
        element: (
          <RoleSyncWrapper role="admin">
            <AdminDashboard />
          </RoleSyncWrapper>
        ),
      },
      {
        path: 'admin/requests',
        element: (
          <PhasePlaceholder
            title="University Request Operations"
            phaseNumber={5}
            description="Cross-departmental queue to adjudicate student certificate applications, special leave petitions, and fee clearances."
            plannedFeatures={[
              'Batch approval queue with cryptographic digital signatures',
              'Departmental SLA tracking and overdue escalation flags',
              'Student dossier preview with academic and dues standing',
              'Automated rule-based certificate dispatch',
            ]}
            parentRoute="/app/admin"
          />
        ),
      },
      {
        path: 'admin/complaints',
        element: (
          <PhasePlaceholder
            title="Campus Complaints Oversight"
            phaseNumber={5}
            description="Master command of all civil, plumbing, electrical, and IT infrastructure tickets across all campus buildings."
            plannedFeatures={[
              'Severity filtering (Critical, High, Medium, Low) across buildings',
              'Ageing breakdown (<24h, 24-72h, >3 days, >7 days)',
              'Manual technician re-assignment and contractor escalation',
              'Export maintenance audit reports for university leadership',
            ]}
            parentRoute="/app/admin"
          />
        ),
      },
      {
        path: 'admin/students',
        element: (
          <PhasePlaceholder
            title="Students Registry"
            phaseNumber={5}
            description="Central student database with academic standing, hostel room allocations, discipline records, and dues status."
            plannedFeatures={[
              'Fast search across 5,000+ student records by roll, branch, or room',
              'Batch roster CSV import and synchronization with university ERP',
              'Student status lifecycle management (Active, Leave, Graduated)',
              'Individual student 360-degree operational dossier',
            ]}
            parentRoute="/app/admin"
          />
        ),
      },
      {
        path: 'admin/staff',
        element: (
          <PhasePlaceholder
            title="Workforce & Technician Management"
            phaseNumber={5}
            description="Directory of campus technicians, supervisors, and hostel wardens with live shift status and active ticket load."
            plannedFeatures={[
              'Real-time technician availability and active ticket count',
              'Automated workload balancing to prevent technician burnout',
              'Shift scheduling and on-call emergency duty assignments',
              'Technician performance analytics and completion velocity',
            ]}
            parentRoute="/app/admin"
          />
        ),
      },
      {
        path: 'admin/hostels',
        element: (
          <PhasePlaceholder
            title="Hostel Operations Master"
            phaseNumber={5}
            description="Building occupancy metrics, room vacancy counts, and infrastructure conditions across all campus hostels."
            plannedFeatures={[
              'Block-by-block occupancy and bed availability tracking',
              'Hostel wing maintenance density and emergency repair hold',
              'Seasonal room allocation lottery and check-in workflows',
              'Chief warden coordination dashboard',
            ]}
            parentRoute="/app/admin"
          />
        ),
      },
      {
        path: 'admin/mess',
        element: (
          <PhasePlaceholder
            title="Mess Operations & Vendor SLA"
            phaseNumber={5}
            description="Catering vendor performance, weekly menu approvals, daily student rating trends, and hygiene inspection audits."
            plannedFeatures={[
              '30-day student satisfaction trend tracking per caterer',
              'Automated penalty notices for food quality breaches (<3.5 stars)',
              'Gate pass synchronized headcount forecasting to reduce food waste',
              'Monthly student rebate settlement calculation ledger',
            ]}
            parentRoute="/app/admin"
          />
        ),
      },
      {
        path: 'admin/notices',
        element: (
          <PhasePlaceholder
            title="Targeted Circulars Publisher"
            phaseNumber={6}
            description="Compose, target, and distribute circulars filtered precisely by program, semester, hostel, and residency type."
            plannedFeatures={[
              'Granular cohort targeting (e.g. Mech Sem 4 + Hostel Resident)',
              'Multi-channel dispatch (In-App, Push Notification, SMS, Email)',
              'Real-time delivery and read receipt telemetry per student',
              'Urgent emergency broadcast banner with sound override',
            ]}
            parentRoute="/app/admin"
          />
        ),
      },
      {
        path: 'admin/analytics',
        element: (
          <PhasePlaceholder
            title="Campus Operational Analytics"
            phaseNumber={7}
            description="Deep operational insights on resolution velocity, gate traffic peaks, mess satisfaction, and infrastructure load."
            plannedFeatures={[
              'Mean Time to Resolve (MTTR) trends across departments',
              'Gate exit vs entry peak hour curves for campus security',
              'Student attendance deficit correlation with academic results',
              'Exportable board-ready PDF executive summaries',
            ]}
            parentRoute="/app/admin"
          />
        ),
      },
      {
        path: 'admin/recurring-issues',
        element: (
          <PhasePlaceholder
            title="Recurring Issues Detection Engine"
            phaseNumber={7}
            description="Algorithmic clustering of repeated maintenance tickets in specific wings or assets to recommend capital overhauls."
            plannedFeatures={[
              'Detection of chronic plumbing / electrical failures in specific wings',
              'Cost analysis of repeated temporary repairs vs complete asset overhaul',
              'Automatic conversion of chronic clusters into capital renovation projects',
              'Preventive maintenance scheduling before semester starts',
            ]}
            parentRoute="/app/admin"
          />
        ),
      },
      {
        path: 'admin/audit-logs',
        element: (
          <PhasePlaceholder
            title="Immutable Governance Audit Logs"
            phaseNumber={5}
            description="Cryptographically verifiable ledger of every administrative action, gate pass decision, grade edit, and ticket closure."
            plannedFeatures={[
              'Searchable chronological ledger with Actor, Role, IP, and Timestamp',
              'Tamper-evident log verification for institutional compliance',
              'Filter by actor category (Admin, Warden, Staff, System Worker)',
              'Signed CSV export for accreditation and audit panels',
            ]}
            parentRoute="/app/admin"
          />
        ),
      },

      // Warden Persona
      {
        path: 'warden',
        element: (
          <RoleSyncWrapper role="warden">
            <WardenDashboard />
          </RoleSyncWrapper>
        ),
      },
      {
        path: 'warden/gate-passes',
        element: (
          <PhasePlaceholder
            title="Gate Pass Adjudication"
            phaseNumber={3}
            description="Single-tap approval or rejection of student outstation and night-out requests with guardian verification records."
            plannedFeatures={[
              'Real-time review queue with parent consent verification status',
              'One-tap approval with optional curfew condition notes',
              'Integrated dialer to call parent or guardian directly',
              'Overdue student alert list synchronized with campus security gates',
            ]}
            parentRoute="/app/warden"
          />
        ),
      },
      {
        path: 'warden/complaints',
        element: (
          <PhasePlaceholder
            title="Wing Complaints Supervision"
            phaseNumber={4}
            description="Monitor repairs inside the hostel premises to ensure student safety, verify technician entry, and audit completed work."
            plannedFeatures={[
              'Live list of outside technicians currently working inside hostel wings',
              'Post-repair verification and student confirmation check',
              'Direct escalation of delayed repairs to Estate Engineer',
              'Hostel hygiene and cleanliness audit checklist',
            ]}
            parentRoute="/app/warden"
          />
        ),
      },
      {
        path: 'warden/rooms',
        element: (
          <PhasePlaceholder
            title="Room Roster & Asset Audit"
            phaseNumber={4}
            description="Floor-by-floor occupancy grid, bed assignments, and asset condition tracking (fans, tables, wardrobes, latches)."
            plannedFeatures={[
              'Visual floor layout grid with resident names and photos',
              'Room asset inventory audit logging during check-in/check-out',
              'Temporary bed reassignment and emergency quarantine allocation',
              'Room damage penalty calculation ledger',
            ]}
            parentRoute="/app/warden"
          />
        ),
      },
      {
        path: 'warden/requests',
        element: (
          <PhasePlaceholder
            title="Warden Student Requests"
            phaseNumber={4}
            description="Process room swap requests, mess rebate certifications, and vacation luggage room access petitions."
            plannedFeatures={[
              'Room swap petition review and mutual agreement verification',
              'Vacation luggage room locker key handover logging',
              'Late-night library study permission endorsements',
              'Hostel committee election coordination',
            ]}
            parentRoute="/app/warden"
          />
        ),
      },

      // Maintenance Staff Persona
      {
        path: 'staff',
        element: (
          <RoleSyncWrapper role="staff">
            <StaffDashboard />
          </RoleSyncWrapper>
        ),
      },
      {
        path: 'staff/tasks',
        element: (
          <PhasePlaceholder
            title="Technician Task Queue"
            phaseNumber={4}
            description="Assigned repair tickets sorted by proximity, priority, and required spare parts."
            plannedFeatures={[
              'Offline-capable job queue for basement and low-connectivity wings',
              'Location directions and room occupant contact numbers',
              'Job status transitions: Assigned -> In Progress -> On Hold -> Resolved',
              'Request spare parts from central maintenance inventory',
            ]}
            parentRoute="/app/staff"
          />
        ),
      },
      {
        path: 'staff/complaints',
        element: (
          <PhasePlaceholder
            title="Field Incidents Log"
            phaseNumber={4}
            description="Log newly discovered infrastructure damage on site before students even notice or report."
            plannedFeatures={[
              'Quick incident creation with before-repair photo upload',
              'Tag emergency hazards (water burst, electrical spark, glass breakage)',
              'Instant alert to department supervisor',
              'Personal monthly job completion record',
            ]}
            parentRoute="/app/staff"
          />
        ),
      },
    ],
  },

  // Fallback Catch-all Route
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
