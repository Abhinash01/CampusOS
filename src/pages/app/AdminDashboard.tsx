import React from 'react'
import { Link } from 'react-router-dom'
import {
  Wrench,
  FileCheck2,
  ArrowRight,
  TrendingUp,
  Building,
} from 'lucide-react'
import { MetricCard, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { FadeIn } from '@/components/motion/FadeIn'

export const AdminDashboard: React.FC = () => {
  const pendingEscalations = [
    {
      id: 'TKT-1039',
      location: 'Block A - 2nd Floor',
      dept: 'Electrical',
      issue: 'Main corridor MCB tripping repeatedly',
      age: '18h (SLA Warning)',
      status: 'Warning',
    },
    {
      id: 'REQ-8911',
      location: 'Academic Registrar',
      dept: 'Academic',
      issue: 'Character & Migration Clearance for 14 Students',
      age: '26h (SLA Breached)',
      status: 'Breached',
    },
    {
      id: 'TKT-1048',
      location: 'Mess Block C',
      dept: 'Maintenance',
      issue: 'Commercial RO Water Purifier filter replacement',
      age: '4h',
      status: 'Active',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Campus Operations Command Center
              </h1>
              <Badge variant="info">Semester Spring 2026</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Centralized administrative controls and campus operations management.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/app/admin/notices">
              <Button size="sm" variant="outline">
                Broadcast Notice
              </Button>
            </Link>
            <Link to="/app/admin/analytics">
              <Button size="sm" variant="primary">
                Executive Report
              </Button>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Primary KPI Metrics */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StaggerItem>
          <MetricCard
            title="Total Active Tickets"
            value="32"
            change="-8% vs last week"
            isPositive={true}
            caption="24 on schedule, 8 aging"
            icon={Wrench}
          />
        </StaggerItem>

        <StaggerItem>
          <MetricCard
            title="Pending Requests"
            value="14"
            change="+3 new today"
            isPositive={false}
            caption="Certificates & approvals"
            icon={FileCheck2}
          />
        </StaggerItem>

        <StaggerItem>
          <MetricCard
            title="SLA Compliance Rate"
            value="94.2%"
            change="+1.4%"
            isPositive={true}
            caption="Target > 90.0%"
            icon={TrendingUp}
          />
        </StaggerItem>

        <StaggerItem>
          <MetricCard
            title="Gate Outing Active"
            value="184"
            caption="182 on schedule, 2 overdue"
            icon={Building}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Middle Section: Departmental Velocity & Ageing Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle>High-Priority Escalations</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Tickets approaching or breaching SLA limits</p>
            </div>
            <Link to="/app/admin/complaints">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                View All Complaints
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Department & Issue</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Ageing SLA</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingEscalations.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs font-semibold text-slate-900">
                      {item.id}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-xs text-slate-900">{item.issue}</div>
                      <div className="text-[11px] text-slate-500">{item.dept} Section</div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{item.location}</TableCell>
                    <TableCell>
                      {item.status === 'Breached' ? (
                        <Badge variant="danger" withDot>
                          {item.age}
                        </Badge>
                      ) : item.status === 'Warning' ? (
                        <Badge variant="warning" withDot>
                          {item.age}
                        </Badge>
                      ) : (
                        <Badge variant="info">{item.age}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Reassign
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Department Response Velocity Card */}
        <Card>
          <CardHeader className="py-4">
            <CardTitle>Department Velocity</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">Average Mean Time to Resolve (MTTR)</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">Electrical Maintenance</span>
                <span className="font-mono text-slate-500">3.2h avg</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[85%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">Plumbing & Sanitation</span>
                <span className="font-mono text-slate-500">4.8h avg</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full w-[70%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">Academic Certificates</span>
                <span className="font-mono text-slate-500">12.5h avg</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full w-[52%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">Hostel Carpentry & Assets</span>
                <span className="font-mono text-slate-500">6.1h avg</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-slate-500 h-2 rounded-full w-[65%]" />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link to="/app/admin/analytics">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Full Analytics Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
