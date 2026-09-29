import React from 'react'
import { Link } from 'react-router-dom'
import { Layers, ArrowLeft, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/motion/FadeIn'

export interface PhasePlaceholderProps {
  title: string
  phaseNumber: number
  description: string
  plannedFeatures: string[]
  parentRoute?: string
}

export const PhasePlaceholder: React.FC<PhasePlaceholderProps> = ({
  title,
  phaseNumber,
  description,
  plannedFeatures,
  parentRoute = '/app',
}) => {
  return (
    <FadeIn>
      <div className="max-w-2xl mx-auto py-8 px-4 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 mb-4 border border-indigo-100">
          <Layers className="w-7 h-7" />
        </div>

        <div className="mb-3 flex justify-center">
          <Badge variant="info" withDot>
            Scheduled for Phase {phaseNumber}
          </Badge>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          {description}
        </p>

        <Card className="mt-8 text-left p-6 border-slate-200">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Planned Capabilities in Phase {phaseNumber}</span>
          </div>

          <ul className="mt-4 space-y-3">
            {plannedFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span className="leading-normal">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Architecture & API contract defined
            </span>
            <span className="font-mono">docs/PAGES.md</span>
          </div>
        </Card>

        <div className="mt-8 flex justify-center gap-3">
          <Link to={parentRoute}>
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return to Dashboard
            </Button>
          </Link>
          <Link to="/docs/DEVELOPMENT_PHASES.md">
            <Button variant="ghost" size="sm">
              View Phase Roadmap
            </Button>
          </Link>
        </div>
      </div>
    </FadeIn>
  )
}
