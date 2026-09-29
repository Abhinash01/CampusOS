import React, { useState } from 'react'
import {
  Bell,
  Search,
  Calendar,
  Building2,
  FileText,
  Download,
  CheckCircle,
  ArrowRight,
  X,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/feedback/EmptyState'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { useNotices, useNotice, useMarkNoticeAsRead } from '@/features/student'
import type { NoticeCategory, Notice } from '@/features/student'

const CATEGORIES: { label: string; value: 'ALL' | NoticeCategory }[] = [
  { label: 'All Circulars', value: 'ALL' },
  { label: 'Academic', value: 'ACADEMIC' },
  { label: 'Hostel', value: 'HOSTEL' },
  { label: 'Administration', value: 'ADMINISTRATION' },
  { label: 'Events', value: 'EVENTS' },
  { label: 'Examination', value: 'EXAMINATION' },
  { label: 'General', value: 'GENERAL' },
]

export const StudentNoticesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | NoticeCategory>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null)
  const [filterReadStatus, setFilterReadStatus] = useState<'ALL' | 'UNREAD'>('ALL')

  const { data: notices, isLoading } = useNotices({
    category: selectedCategory === 'ALL' ? undefined : selectedCategory,
    search: searchQuery.trim() || undefined,
  })

  // Hook for reading specific notice which automatically marks it read
  const { data: currentNotice } = useNotice(selectedNoticeId || '')
  const markAsReadMutation = useMarkNoticeAsRead()

  const handleOpenNotice = (notice: Notice) => {
    setSelectedNoticeId(notice.id)
    if (!notice.isRead) {
      markAsReadMutation.mutate(notice.id)
    }
  }

  const handleCloseModal = () => {
    setSelectedNoticeId(null)
  }

  // Client-side filter for unread if selected
  const displayedNotices = (notices || []).filter((n) => {
    if (filterReadStatus === 'UNREAD') return !n.isRead
    return true
  })

  const unreadCount = (notices || []).filter((n) => !n.isRead).length

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="h-10 w-full max-w-md bg-zinc-100 rounded-lg animate-pulse" />
        <div className="space-y-3 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-7 pb-16 selection:bg-rose-100 selection:text-rose-900">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold mb-2">
              <Bell className="w-3.5 h-3.5 text-[#E11D48]" />
              Official University Circulars
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
              Notices & Announcements
            </h1>
            <p className="text-sm text-zinc-600 mt-1">
              Authoritative university orders, academic deadlines, hostel circulars, and exam notifications.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge variant="info" className="px-3 py-1 text-xs font-semibold">
                {unreadCount} unread {unreadCount === 1 ? 'notice' : 'notices'}
              </Badge>
            )}
            <button
              type="button"
              onClick={() =>
                setFilterReadStatus(filterReadStatus === 'ALL' ? 'UNREAD' : 'ALL')
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                filterReadStatus === 'UNREAD'
                  ? 'bg-rose-50 border-[#E11D48] text-[#BE123C]'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {filterReadStatus === 'UNREAD' ? 'Showing Unread' : 'Show Only Unread'}
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Filter and Search Bar */}
      <FadeIn delay={0.05}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-zinc-200/80 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars by subject, department, or keywords..."
              className="pl-9 text-xs bg-zinc-50 border-zinc-200 focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills (Mobile scrollable) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all border ${
                  selectedCategory === cat.value
                    ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-sm font-semibold'
                    : 'bg-zinc-50/80 text-zinc-600 border-zinc-200 hover:bg-zinc-100/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Notices List */}
      {displayedNotices.length === 0 ? (
        <Card className="border-dashed border-zinc-300 bg-white">
          <EmptyState
            title="No circulars found"
            description={
              searchQuery || selectedCategory !== 'ALL' || filterReadStatus === 'UNREAD'
                ? 'Try broadening your search query or switching the category filter.'
                : 'All university notices have been read or none are currently published.'
            }
            actionLabel={
              searchQuery || selectedCategory !== 'ALL' || filterReadStatus === 'UNREAD'
                ? 'Clear all filters'
                : undefined
            }
            onAction={
              searchQuery || selectedCategory !== 'ALL' || filterReadStatus === 'UNREAD'
                ? () => {
                    setSearchQuery('')
                    setSelectedCategory('ALL')
                    setFilterReadStatus('ALL')
                  }
                : undefined
            }
          />
        </Card>
      ) : (
        <StaggerContainer className="space-y-3">
          {displayedNotices.map((notice) => {
            const isUnread = !notice.isRead

            return (
              <StaggerItem key={notice.id}>
                <div
                  onClick={() => handleOpenNotice(notice)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleOpenNotice(notice)
                    }
                  }}
                  className={`group relative p-4 sm:p-5 rounded-xl border transition-all cursor-pointer text-left ${
                    isUnread
                      ? 'bg-white border-rose-200/90 shadow-sm hover:border-[#E11D48]/60 hover:shadow-md'
                      : 'bg-white/80 border-zinc-200/80 hover:border-zinc-300 hover:bg-white'
                  }`}
                >
                  {/* Left accent bar for unread */}
                  {isUnread && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#E11D48] rounded-r-full" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1 pr-4">
                      {/* Meta badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-medium text-zinc-400">
                          {notice.id}
                        </span>

                        <Badge
                          variant="default"
                          className="text-[10px] uppercase font-semibold text-zinc-700 bg-zinc-50 border-zinc-200"
                        >
                          {notice.category}
                        </Badge>

                        {notice.priority === 'URGENT' && (
                          <Badge variant="danger" className="text-[10px] font-bold uppercase tracking-wide">
                            Urgent
                          </Badge>
                        )}
                        {notice.priority === 'IMPORTANT' && (
                          <Badge variant="warning" className="text-[10px] font-semibold uppercase">
                            Important
                          </Badge>
                        )}

                        {isUnread ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E11D48]">
                            <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
                            Unread
                          </span>
                        ) : (
                          <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-zinc-400" />
                            Read
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-base font-semibold transition-colors ${
                          isUnread
                            ? 'text-zinc-950 font-bold group-hover:text-[#E11D48]'
                            : 'text-zinc-800 group-hover:text-zinc-950'
                        }`}
                      >
                        {notice.title}
                      </h3>

                      {/* Summary preview */}
                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                        {notice.summary}
                      </p>

                      {/* Footer Details */}
                      <div className="pt-2 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                          {notice.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          {notice.publishedDate}
                        </span>
                        {notice.attachmentName && (
                          <span className="flex items-center gap-1 text-[#E11D48] font-medium">
                            <FileText className="w-3.5 h-3.5" />
                            Attachment available
                          </span>
                        )}
                      </div>
                    </div>

                    {/* View Action */}
                    <div className="self-end sm:self-center shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-zinc-600 group-hover:text-[#E11D48] group-hover:bg-rose-50/60 gap-1.5 font-medium"
                      >
                        <span>Read Notice</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      )}

      {/* Notice Reader Modal */}
      <Modal
        isOpen={Boolean(selectedNoticeId)}
        onClose={handleCloseModal}
        title={currentNotice ? currentNotice.title : 'Circular Details'}
      >
        {currentNotice ? (
          <div className="space-y-5 text-zinc-800">
            {/* Header metadata */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-[10px] font-mono">
                    {currentNotice.id}
                  </Badge>
                  <Badge variant="default" className="text-[10px] uppercase font-semibold">
                    {currentNotice.category}
                  </Badge>
                  {currentNotice.priority === 'URGENT' && (
                    <Badge variant="danger" className="text-[10px] font-bold">
                      URGENT
                    </Badge>
                  )}
                </div>
                <div className="text-zinc-600 font-medium">
                  Issued by: <strong className="text-zinc-900">{currentNotice.department}</strong>
                </div>
              </div>

              <div className="text-right text-zinc-500 space-y-0.5">
                <div>Published: {currentNotice.publishedDate}</div>
                <div className="text-[11px] text-zinc-400">Audience: {currentNotice.targetAudience}</div>
              </div>
            </div>

            {/* Circular Full Content */}
            <div className="p-4 rounded-xl bg-white border border-zinc-200/80 space-y-3">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Official Memorandum
              </h4>
              <div className="text-xs sm:text-sm text-zinc-800 leading-relaxed whitespace-pre-line font-sans">
                {currentNotice.content}
              </div>
            </div>

            {/* Attachment if present */}
            {currentNotice.attachmentName && (
              <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-rose-100 text-[#E11D48]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900">{currentNotice.attachmentName}</div>
                    <div className="text-[11px] text-zinc-500">Official Authenticated PDF (Annexure)</div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => alert(`Simulated download of ${currentNotice.attachmentName}`)}
                  className="text-xs gap-1.5 border-rose-300 text-[#BE123C] hover:bg-rose-100/60"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </Button>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
              <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                Marked as read in your student activity log
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCloseModal}
                className="text-xs"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 py-6">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        )}
      </Modal>
    </div>
  )
}
