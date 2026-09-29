import React from 'react'
import { Link } from 'react-router-dom'
import {
  KeyRound,
  Home,
  Wrench,
  Users,
  ArrowRight,
} from 'lucide-react'
import { MetricCard, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { FadeIn } from '@/components/motion/FadeIn'

export const WardenDashboard: React.FC = () => {
  const pendingPasses = [
    {
      id: 'GP-883',
      name: 'Rohan Verma',
      roll: '2301002104',
      room: 'B-108',
      type: 'Day Outing',
      dest: 'City Center (Library & Books)',
      returnBy: 'Today, 08:30 PM',
      parentStatus: 'Verified (SMS Consent)',
    },
    {
      id: 'GP-884',
      name: 'Pooja Mohapatra',
      roll: '2201004552',
      room: 'B-312',
      type: 'Weekend Home Leave',
      dest: 'Bhubaneswar (Home)',
      returnBy: 'Sunday, 06:00 PM',
      parentStatus: 'Consent Call Confirmed',
    },
    {
      id: 'GP-885',
      name: 'Sneha Mishra',
      roll: '2401001190',
      room: 'B-201',
      type: 'Night Outing',
      dest: 'Central Research Complex',
      returnBy: 'Tomorrow, 07:00 AM',
      parentStatus: 'Faculty Endorsed',
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
                Warden Station — Hostel Block B
              </h1>
              <Badge variant="success" withDot>
                Roll Call Active
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Chief Warden: Prof. R. Mohanty • Capacity: 450 Residents • Currently In Hostel: 412
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/app/warden/gate-passes">
              <Button size="sm" variant="primary" leftIcon={<KeyRound className="w-3.5 h-3.5" />}>
                Review Passes (6)
              </Button>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Warden Key Metrics */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StaggerItem>
          <MetricCard
            title="Night Attendance"
            value="412 / 450"
            caption="38 on approved leave, 0 missing"
            icon={Users}
          />
        </StaggerItem>

        <StaggerItem>
          <MetricCard
            title="Pending Gate Passes"
            value="6 Awaiting"
            change="3 urgent for today"
            isPositive={false}
            caption="Day outing & night leave"
            icon={KeyRound}
          />
        </StaggerItem>

        <StaggerItem>
          <MetricCard
            title="Open Wing Complaints"
            value="3 Open"
            caption="2 Plumbing, 1 Electrical"
            icon={Wrench}
          />
        </StaggerItem>

        <StaggerItem>
          <MetricCard
            title="Room Occupancy"
            value="97.2%"
            caption="8 vacant beds held for exchange"
            icon={Home}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Pending Gate Pass Adjudication Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle>Gate Pass Adjudication Queue</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify parent authorization before approving campus departure
            </p>
          </div>
          <Link to="/app/warden/gate-passes">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Full Pass History
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Pass Type & Destination</TableHead>
                <TableHead>Expected Return</TableHead>
                <TableHead>Parent Authorization</TableHead>
                <TableHead className="text-right">Decision</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPasses.map((pass) => (
                <TableRow key={pass.id}>
                  <TableCell>
                    <div className="font-semibold text-xs text-slate-900">{pass.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {pass.roll} • Room {pass.room}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-xs text-slate-900">{pass.type}</div>
                    <div className="text-[11px] text-slate-500">{pass.dest}</div>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-slate-700">
                    {pass.returnBy}
                  </TableCell>
                  <TableCell>
                    <Badge variant="success" withDot>
                      {pass.parentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      <Button variant="outline" size="sm" className="text-emerald-700 hover:bg-emerald-50 border-emerald-300">
                        Approve
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
