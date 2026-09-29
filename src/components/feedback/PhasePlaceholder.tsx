import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Inbox, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/motion/FadeIn'

export interface PhasePlaceholderProps {
  title: string
  phaseNumber?: number
  description?: string
  plannedFeatures?: string[]
  parentRoute?: string
}

export const PhasePlaceholder: React.FC<PhasePlaceholderProps> = ({
  title,
  description,
  parentRoute = '/app',
}) => {
  return (
    <FadeIn>
      <div className="max-w-2xl mx-auto py-10 px-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 text-slate-500 mb-4 border border-slate-200">
          <Inbox className="w-6 h-6 stroke-[1.5]" />
        </div>

        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
        <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
          {description || `No records or updates found under ${title.toLowerCase()}. Active entries will appear here.`}
        </p>

        <Card className="mt-6 p-6 border-slate-200 text-left bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-800">Operational Status</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your account is in good standing. New records and notifications submitted by campus operations will sync to this view.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Connected
            </span>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Module: {title}</span>
            <span>CampusOS Core</span>
          </div>
        </Card>

        <div className="mt-6 flex justify-center gap-3">
          <Link to={parentRoute}>
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Overview
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </div>
      </div>
    </FadeIn>
  )
}
