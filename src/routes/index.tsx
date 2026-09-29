import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { LandingPage } from '@/pages/public/LandingPage'
import { LoginPage } from '@/pages/public/LoginPage'
import { RegisterPage } from '@/pages/public/RegisterPage'
import { ForgotPasswordPage } from '@/pages/public/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/public/ResetPasswordPage'
import {
  StudentDashboardPage,
  StudentAttendancePage,
  StudentRequestsPage,
  StudentHostelPage,
  StudentMessPage,
  StudentNoticesPage,
  StudentSupportPage,
  StudentProfilePage,
  StudentSettingsPage,
} from '@/pages/student'
import { AdminDashboard } from '@/pages/app/AdminDashboard'
import { WardenDashboard } from '@/pages/app/WardenDashboard'
import { StaffDashboard } from '@/pages/app/StaffDashboard'
import { DesignSystemPage } from '@/pages/design-system/DesignSystemPage'
import { PhasePlaceholder } from '@/components/feedback/PhasePlaceholder'
import { ProtectedRoute, useAuthStore } from '@/features/auth'

// Helper component that redirects `/app` to active user role dashboard
const AppIndexRedirect: React.FC = () => {
  const user = useAuthStore((state) => state.user)
  const role = user?.role ? user.role.toLowerCase() : 'student'
  return <Navigate to={`/app/${role}`} replace />
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
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/design-system',
    element: <DesignSystemPage />,
  },

  // Authenticated App Shell Routes
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AppIndexRedirect />,
      },

      // Student Persona (Phase 2 Master Implementation)
      {
        path: 'student',
        element: (
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'student/attendance',
        element: (
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentAttendancePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'student/requests',
        element: (
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentRequestsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'student/hostel',
        element: (
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentHostelPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'student/mess',
        element: (
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentMessPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'student/notices',
        element: (
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentNoticesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'student/help',
        element: (
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentSupportPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'student/support',
        element: (
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentSupportPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'student/profile',
        element: (
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'student/settings',
        element: (
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentSettingsPage />
          </ProtectedRoute>
        ),
      },

      // Administrator Persona
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/requests',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PhasePlaceholder
              title="University Request Operations"
              description="Adjudicate student certificate applications, special leave petitions, and fee clearances."
              parentRoute="/app/admin"
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/complaints',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PhasePlaceholder
              title="Campus Complaints Oversight"
              description="Oversight of civil, plumbing, electrical, and IT infrastructure tickets across campus."
              parentRoute="/app/admin"
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/students',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PhasePlaceholder
              title="Students Registry"
              description="Central student registry with academic standing, hostel room allocations, and record logs."
              parentRoute="/app/admin"
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/hostels',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PhasePlaceholder
              title="Hostel Operations Master"
              description="Building occupancy metrics, room vacancy counts, and infrastructure conditions across hostels."
              parentRoute="/app/admin"
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/notices',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PhasePlaceholder
              title="Targeted Circulars Publisher"
              description="Compose, target, and distribute circulars filtered by program, semester, and hostel."
              parentRoute="/app/admin"
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/settings',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PhasePlaceholder
              title="Administrative Settings"
              description="System configuration, role provisioning, and institutional security policies."
              parentRoute="/app/admin"
            />
          </ProtectedRoute>
        ),
      },

      // Warden Persona
      {
        path: 'warden',
        element: (
          <ProtectedRoute allowedRoles={['WARDEN']}>
            <WardenDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'warden/gate-passes',
        element: (
          <ProtectedRoute allowedRoles={['WARDEN']}>
            <PhasePlaceholder
              title="Gate Pass Adjudication"
              description="Review and process student outstation and night-out requests."
              parentRoute="/app/warden"
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'warden/complaints',
        element: (
          <ProtectedRoute allowedRoles={['WARDEN']}>
            <PhasePlaceholder
              title="Wing Complaints Supervision"
              description="Monitor repairs inside hostel premises and verify technician access."
              parentRoute="/app/warden"
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'warden/rooms',
        element: (
          <ProtectedRoute allowedRoles={['WARDEN']}>
            <PhasePlaceholder
              title="Room Roster & Asset Audit"
              description="Floor-by-floor occupancy grid, bed assignments, and asset condition tracking."
              parentRoute="/app/warden"
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'warden/requests',
        element: (
          <ProtectedRoute allowedRoles={['WARDEN']}>
            <PhasePlaceholder
              title="Warden Student Requests"
              description="Process room swap requests, mess rebate certifications, and access petitions."
              parentRoute="/app/warden"
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'warden/settings',
        element: (
          <ProtectedRoute allowedRoles={['WARDEN']}>
            <PhasePlaceholder
              title="Warden Preferences"
              description="Hostel wing assignment, notification alerts, and duty shift preferences."
              parentRoute="/app/warden"
            />
          </ProtectedRoute>
        ),
      },

      // Maintenance Staff Persona
      {
        path: 'staff',
        element: (
          <ProtectedRoute allowedRoles={['STAFF']}>
            <StaffDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'staff/tasks',
        element: (
          <ProtectedRoute allowedRoles={['STAFF']}>
            <PhasePlaceholder
              title="Technician Task Queue"
              description="Assigned repair tickets sorted by proximity, priority, and required spare parts."
              parentRoute="/app/staff"
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'staff/complaints',
        element: (
          <ProtectedRoute allowedRoles={['STAFF']}>
            <PhasePlaceholder
              title="Field Incidents Log"
              description="Log newly discovered infrastructure damage on site for technician dispatch."
              parentRoute="/app/staff"
            />
          </ProtectedRoute>
        ),
      },
      {
        path: 'staff/settings',
        element: (
          <ProtectedRoute allowedRoles={['STAFF']}>
            <PhasePlaceholder
              title="Staff Preferences"
              description="Trade specialization, shift availability, and contact settings."
              parentRoute="/app/staff"
            />
          </ProtectedRoute>
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
