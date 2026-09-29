import React, { useState } from 'react'
import {
  UtensilsCrossed,
  Clock,
  Sparkles,
  Star,
  CheckCircle2,
  Calendar,
  Coffee,
  Sun,
  Cookie,
  Moon,
  MessageSquare,
  Send,
  AlertCircle,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'
import { useMessMenu, useSubmitMessFeedback, useMessFeedbackHistory } from '@/features/student'
import type { MealType } from '@/features/student'
import { useToast } from '@/components/ui/Toast'

export const StudentMessPage: React.FC = () => {
  const { data: menuDays, isLoading } = useMessMenu()
  const { data: feedbackHistory } = useMessFeedbackHistory()
  const submitFeedbackMutation = useSubmitMessFeedback()
  const { showToast } = useToast()

  const [activeTab, setActiveTab] = useState<'today' | 'tomorrow'>('today')
  const [selectedMealForFeedback, setSelectedMealForFeedback] = useState<MealType>('LUNCH')
  const [rating, setRating] = useState<number>(4)
  const [comment, setComment] = useState<string>('')
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const ratingLabels: Record<number, string> = {
    1: 'Very poor',
    2: 'Poor',
    3: 'Okay',
    4: 'Good',
    5: 'Excellent',
  }

  const mealIcons: Record<MealType, React.ReactNode> = {
    BREAKFAST: <Coffee className="w-5 h-5 text-amber-500" />,
    LUNCH: <Sun className="w-5 h-5 text-orange-500" />,
    SNACKS: <Cookie className="w-5 h-5 text-rose-500" />,
    DINNER: <Moon className="w-5 h-5 text-indigo-500" />,
  }

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) return

    try {
      await submitFeedbackMutation.mutateAsync({
        mealType: selectedMealForFeedback,
        rating,
        comment: comment.trim() || undefined,
      })
      showToast({
        title: 'Feedback submitted',
        description: `Thank you for rating today's ${selectedMealForFeedback.toLowerCase()}! Mess council reviews ratings daily.`,
        type: 'success',
      })
      setComment('')
    } catch {
      showToast({
        title: 'Submission failed',
        description: 'Could not record mess feedback. Please try again.',
        type: 'error',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  const activeDay = menuDays?.find((d) => (activeTab === 'today' ? d.isToday : !d.isToday))

  return (
    <div className="space-y-7 pb-16 selection:bg-rose-100 selection:text-rose-900">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold mb-2">
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#E11D48]" />
              Central Dining Hall · Block B Annex
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
              Mess Operations & Dining
            </h1>
            <p className="text-sm text-zinc-600 mt-1">
              Daily university meals, certified dietary nutrition, timing schedules, and direct student feedback.
            </p>
          </div>

          {/* Day Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl self-start sm:self-auto border border-zinc-200/60">
            <button
              type="button"
              onClick={() => setActiveTab('today')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'today'
                  ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80 font-bold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Today's Menu
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tomorrow')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'tomorrow'
                  ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80 font-bold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Tomorrow's Menu
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Date Banner */}
      <FadeIn delay={0.05}>
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-zinc-200/80 shadow-sm">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-800">
            <Calendar className="w-4 h-4 text-[#E11D48]" />
            <span>
              Schedule for <strong className="font-semibold text-zinc-900">{activeDay?.day}</strong> ({activeDay?.date})
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>FSSAI Certified Campus Kitchen</span>
          </div>
        </div>
      </FadeIn>

      {/* Menu Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {activeDay?.meals.map((meal) => (
          <StaggerItem key={meal.mealType}>
            <Card
              className={`h-full flex flex-col border transition-all ${
                meal.isSpecial
                  ? 'border-rose-300 bg-gradient-to-b from-rose-50/40 via-white to-white shadow-sm'
                  : 'border-zinc-200/80 bg-white hover:border-zinc-300'
              }`}
            >
              <CardHeader className="pb-3 border-b border-zinc-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-100">
                      {mealIcons[meal.mealType]}
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold text-zinc-900 capitalize">
                        {meal.mealType.toLowerCase()}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5 font-medium">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        {meal.timeWindow}
                      </div>
                    </div>
                  </div>

                  {meal.isSpecial && (
                    <Badge variant="info" className="text-[10px] uppercase font-bold tracking-wide">
                      <Sparkles className="w-2.5 h-2.5 mr-1" />
                      Special
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Served Items
                  </h4>
                  <ul className="space-y-2">
                    {meal.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700 leading-snug">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E11D48]/70 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {meal.dietaryTags && meal.dietaryTags.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap gap-1">
                    {meal.dietaryTags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-zinc-100 text-[10px] font-medium text-zinc-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Mess Information & Meal Feedback Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Meal Timings & Kitchen Notes (1 col) */}
        <div className="space-y-4">
          <Card className="border-zinc-200/80 bg-white shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100">
              <CardTitle className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E11D48]" />
                Daily Dining Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 divide-y divide-zinc-100 text-xs">
              <div className="py-2.5 flex items-center justify-between first:pt-0">
                <span className="font-semibold text-zinc-800">Breakfast</span>
                <span className="text-zinc-600 font-mono">07:30 AM – 09:30 AM</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-semibold text-zinc-800">Lunch</span>
                <span className="text-zinc-600 font-mono">12:30 PM – 02:30 PM</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-semibold text-zinc-800">Evening Snacks</span>
                <span className="text-zinc-600 font-mono">05:00 PM – 06:30 PM</span>
              </div>
              <div className="py-2.5 flex items-center justify-between last:pb-0">
                <span className="font-semibold text-zinc-800">Dinner</span>
                <span className="text-zinc-600 font-mono">07:30 PM – 09:30 PM</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200/80 bg-white shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100">
              <CardTitle className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Mess Committee Advisories
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-xs space-y-2.5 text-zinc-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Entry strictly requires the CampusOS student ID verification or physical card scan.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Mess rebate policy: minimum 3 continuous days leave requested 24 hours in advance via Requests.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Clean drinking water stations with reverse osmosis filters available on all dining wings.</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meal Feedback Form (2 cols) */}
        <div className="lg:col-span-2">
          <Card className="border-zinc-200/80 bg-white shadow-sm h-full flex flex-col">
            <CardHeader className="pb-3 border-b border-zinc-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-zinc-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#E11D48]" />
                    Meal Quality Feedback
                  </CardTitle>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Ratings directly evaluate caterer hygiene, portion size, and taste standards.
                  </p>
                </div>
                <Badge variant="default" className="text-[11px] font-normal text-zinc-600">
                  Daily Audited
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-5 flex-1 flex flex-col justify-between">
              <form onSubmit={handleSubmitFeedback} className="space-y-5">
                {/* Select Meal */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                    Which meal are you evaluating?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['BREAKFAST', 'LUNCH', 'SNACKS', 'DINNER'] as MealType[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedMealForFeedback(m)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center justify-center gap-1.5 ${
                          selectedMealForFeedback === m
                            ? 'bg-rose-50/70 border-[#E11D48] text-[#BE123C] shadow-sm'
                            : 'bg-zinc-50/60 border-zinc-200/80 text-zinc-600 hover:bg-zinc-100/60'
                        }`}
                      >
                        {mealIcons[m]}
                        <span className="capitalize">{m.toLowerCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Stars */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                      How was today's {selectedMealForFeedback.toLowerCase()}?
                    </label>
                    <span className="text-xs font-semibold text-[#E11D48]">
                      {ratingLabels[hoverRating || rating]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200/60">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= (hoverRating ?? rating)
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(star)}
                          className="p-1 text-zinc-300 hover:scale-110 transition-transform focus:outline-none"
                          aria-label={`Rate ${star} star`}
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              isFilled ? 'fill-amber-400 text-amber-500' : 'text-zinc-300'
                            }`}
                          />
                        </button>
                      )
                    })}
                    <span className="ml-3 text-xs text-zinc-500 border-l border-zinc-200 pl-3">
                      Select rating from 1 to 5
                    </span>
                  </div>
                </div>

                {/* Text comment */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                    Specific Observations (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="e.g. Rice was well-cooked, but dal tadka had excess salt today..."
                    className="w-full text-xs rounded-xl border border-zinc-300 px-3.5 py-2.5 text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/30 focus:border-[#E11D48] transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-zinc-500">
                    Your feedback is aggregated into the student mess score.
                  </span>
                  <Button
                    type="submit"
                    disabled={submitFeedbackMutation.isPending}
                    className="bg-[#E11D48] hover:bg-[#BE123C] text-white gap-2 font-medium"
                  >
                    <Send className="w-4 h-4" />
                    {submitFeedbackMutation.isPending ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </div>
              </form>

              {/* Feedback History Log */}
              {feedbackHistory && feedbackHistory.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-100">
                  <h5 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Your Recent Feedback
                  </h5>
                  <div className="space-y-2">
                    {feedbackHistory.slice(0, 3).map((fb) => (
                      <div
                        key={fb.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50/80 border border-zinc-100 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-800 capitalize">
                            {fb.mealType.toLowerCase()}
                          </span>
                          <span className="text-zinc-400">·</span>
                          <span className="text-zinc-500">{fb.createdAt}</span>
                          {fb.comment && (
                            <span className="text-zinc-600 italic line-clamp-1 max-w-xs">
                              "{fb.comment}"
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{fb.rating}/5</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
