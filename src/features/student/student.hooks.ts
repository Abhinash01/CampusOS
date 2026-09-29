import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studentApi } from './student.api'
import type { CreateRequestInput, MealType } from './student.types'

export const STUDENT_QUERY_KEYS = {
  DASHBOARD: ['student', 'dashboard'] as const,
  ATTENDANCE: ['student', 'attendance'] as const,
  SUBJECT_ATTENDANCE: (id: string) => ['student', 'attendance', id] as const,
  REQUESTS: (filter?: { status?: string; category?: string }) =>
    ['student', 'requests', filter] as const,
  REQUEST_DETAIL: (id: string) => ['student', 'requests', 'detail', id] as const,
  HOSTEL: ['student', 'hostel'] as const,
  MESS_MENU: ['student', 'mess'] as const,
  MESS_FEEDBACK: ['student', 'mess', 'feedback'] as const,
  NOTICES: (filter?: { category?: string; search?: string }) =>
    ['student', 'notices', filter] as const,
  NOTICE_DETAIL: (id: string) => ['student', 'notices', 'detail', id] as const,
  PROFILE: ['student', 'profile'] as const,
}

export function useStudentDashboard() {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.DASHBOARD,
    queryFn: () => studentApi.getDashboardData(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

export function useAttendanceSummary() {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.ATTENDANCE,
    queryFn: () => studentApi.getAttendanceSummary(),
    staleTime: 1000 * 60 * 5,
  })
}

export function useSubjectAttendance(subjectId: string) {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.SUBJECT_ATTENDANCE(subjectId),
    queryFn: () => studentApi.getSubjectAttendance(subjectId),
    enabled: Boolean(subjectId),
  })
}

export function useStudentRequests(filter?: { status?: string; category?: string }) {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.REQUESTS(filter),
    queryFn: () => studentApi.getRequests(filter),
  })
}

export function useStudentRequest(id: string) {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.REQUEST_DETAIL(id),
    queryFn: () => studentApi.getRequestById(id),
    enabled: Boolean(id),
  })
}

export function useCreateStudentRequest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateRequestInput) => studentApi.createRequest(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student', 'requests'] })
      queryClient.invalidateQueries({ queryKey: STUDENT_QUERY_KEYS.DASHBOARD })
    },
  })
}

export function useHostelInfo() {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.HOSTEL,
    queryFn: () => studentApi.getHostelInfo(),
    staleTime: 1000 * 60 * 10,
  })
}

export function useMessMenu() {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.MESS_MENU,
    queryFn: () => studentApi.getMessMenu(),
    staleTime: 1000 * 60 * 10,
  })
}

export function useMessFeedbackHistory() {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.MESS_FEEDBACK,
    queryFn: () => studentApi.getMessFeedbackHistory(),
  })
}

export function useSubmitMessFeedback() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { mealType: MealType; rating: number; comment?: string }) =>
      studentApi.submitMessFeedback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STUDENT_QUERY_KEYS.MESS_FEEDBACK })
    },
  })
}

export function useNotices(filter?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.NOTICES(filter),
    queryFn: () => studentApi.getNotices(filter),
  })
}

export function useNotice(id: string) {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.NOTICE_DETAIL(id),
    queryFn: async () => {
      const data = await studentApi.getNoticeById(id)
      queryClient.invalidateQueries({ queryKey: ['student', 'notices'] })
      queryClient.invalidateQueries({ queryKey: STUDENT_QUERY_KEYS.DASHBOARD })
      return data
    },
    enabled: Boolean(id),
  })
}

export function useMarkNoticeAsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => studentApi.markNoticeRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student', 'notices'] })
      queryClient.invalidateQueries({ queryKey: STUDENT_QUERY_KEYS.DASHBOARD })
    },
  })
}

export function useStudentProfile() {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.PROFILE,
    queryFn: () => studentApi.getStudentProfile(),
    staleTime: 1000 * 60 * 10,
  })
}
