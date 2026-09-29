import type {
  AttendanceSummary,
  HostelInfo,
  DayMenu,
  Notice,
  StudentRequest,
  StudentDashboardData,
  StudentProfile,
  CreateRequestInput,
  MessFeedback,
  SubjectAttendance,
} from './student.types'
import {
  MOCK_ATTENDANCE,
  MOCK_HOSTEL_INFO,
  MOCK_MESS_MENU,
  MOCK_NOTICES,
  MOCK_STUDENT_PROFILE,
  getStoredRequests,
  saveStoredRequests,
  getStoredReadNoticeIds,
  saveReadNoticeId,
  saveMessFeedback,
  getStoredMessFeedback,
} from './student.mock'

// Helper for realistic async resolution
const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

export const studentApi = {
  /**
   * Fetch aggregate data needed for the student dashboard
   */
  async getDashboardData(): Promise<StudentDashboardData> {
    await delay(100)
    const requests = getStoredRequests()
    const readIds = getStoredReadNoticeIds()
    const activeRequests = requests.filter(
      (r) => r.status !== 'RESOLVED'
    )
    const unreadNotices = MOCK_NOTICES.filter(
      (n) => !readIds.includes(n.id)
    )

    // Build genuinely actionable attention items
    const attentionItems = [
      {
        id: 'att-1',
        type: 'REQUEST' as const,
        title: 'Technician on-site for Tap Repair #1042',
        description: 'Manoj Kumar is at Room 204. Provide OTP 4829 after checking repair.',
        actionLabel: 'View Ticket',
        actionHref: '/app/student/requests',
        severity: 'info' as const,
      },
      {
        id: 'att-2',
        type: 'ATTENDANCE' as const,
        title: 'Computer Networks attendance at 80.6%',
        description: 'Only 2 class margins remaining before 75% statutory requirement.',
        actionLabel: 'Check Attendance',
        actionHref: '/app/student/attendance',
        severity: 'warning' as const,
      },
      {
        id: 'att-3',
        type: 'NOTICE' as const,
        title: 'Mid-Sem Examination Circular Released',
        description: 'Timetable published for 6th Sem B.Tech. Exams start Oct 14.',
        actionLabel: 'Read Notice',
        actionHref: '/app/student/notices',
        severity: 'info' as const,
      },
    ]

    const todayLectures = [
      {
        time: '10:30 AM – 11:30 AM',
        subject: 'Distributed Operating Systems',
        code: 'CS601',
        room: 'Lecture Hall 302',
        faculty: 'Dr. R. K. Nayak',
        isNext: true,
      },
      {
        time: '11:45 AM – 12:45 PM',
        subject: 'Database Management Systems',
        code: 'CS602',
        room: 'Seminar Hall 1',
        faculty: 'Prof. S. Mohapatra',
      },
      {
        time: '02:30 PM – 04:30 PM',
        subject: 'Web Technologies Laboratory',
        code: 'CS605L',
        room: 'Computing Lab 4',
        faculty: 'Er. N. K. Sahoo',
      },
    ]

    return {
      studentProfile: {
        name: MOCK_STUDENT_PROFILE.name,
        email: MOCK_STUDENT_PROFILE.email,
        studentId: MOCK_STUDENT_PROFILE.studentId,
        department: MOCK_STUDENT_PROFILE.department,
        course: MOCK_STUDENT_PROFILE.course,
        semester: MOCK_STUDENT_PROFILE.semester,
        section: 'A',
        hostelRoom: 'Block B · Room 204',
      },
      stats: {
        attendancePct: MOCK_ATTENDANCE.overallPercentage,
        activeRequestsCount: activeRequests.length,
        unreadNoticesCount: unreadNotices.length,
        hostelRoom: 'Block B · Room 204',
      },
      attentionItems,
      todayLectures,
      recentRequests: requests.slice(0, 3),
      recentNotices: MOCK_NOTICES.slice(0, 3).map((n) => ({
        ...n,
        isRead: readIds.includes(n.id),
      })),
    }
  },

  /**
   * Fetch attendance overview and subject breakdown
   */
  async getAttendanceSummary(): Promise<AttendanceSummary> {
    await delay(120)
    return MOCK_ATTENDANCE
  },

  /**
   * Fetch detail for a specific subject
   */
  async getSubjectAttendance(subjectId: string): Promise<SubjectAttendance | null> {
    await delay(80)
    const found = MOCK_ATTENDANCE.subjects.find((s) => s.id === subjectId)
    return found || null
  },

  /**
   * Fetch all student requests with optional filter
   */
  async getRequests(filter?: { status?: string; category?: string }): Promise<StudentRequest[]> {
    await delay(120)
    let list = getStoredRequests()
    if (filter?.status && filter.status !== 'ALL') {
      list = list.filter((r) => r.status === filter.status)
    }
    if (filter?.category && filter.category !== 'ALL') {
      list = list.filter((r) => r.category === filter.category)
    }
    return list
  },

  /**
   * Fetch a single request by ID
   */
  async getRequestById(id: string): Promise<StudentRequest | null> {
    await delay(80)
    const list = getStoredRequests()
    return list.find((r) => r.id === id) || null
  },

  /**
   * Create a new student request
   */
  async createRequest(input: CreateRequestInput): Promise<StudentRequest> {
    await delay(200)
    const list = getStoredRequests()
    const nextNumber = Math.floor(1043 + Math.random() * 90)
    const newId = `REQ-${nextNumber}`
    const now = new Date().toISOString()
    const timeFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const departmentMap: Record<string, string> = {
      HOSTEL: 'Hostel Administration',
      MAINTENANCE: 'Estate & Maintenance',
      MESS: 'Mess & Food Committee',
      CERTIFICATE: 'Academic Registrar Office',
      GATE_PASS: 'Hostel Warden Office',
      ACADEMIC: 'Dean of Academic Affairs',
      OTHER: 'General Student Services',
    }

    const newRequest: StudentRequest = {
      id: newId,
      category: input.category,
      title: input.title,
      description: input.description,
      location: input.location || 'Hostel Block B · Room 204',
      status: 'SUBMITTED',
      priority: input.priority || 'NORMAL',
      createdAt: now,
      updatedAt: now,
      assignedDepartment: departmentMap[input.category] || 'Student Support',
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      timeline: [
        {
          status: 'SUBMITTED',
          title: 'Request Lodged by Student',
          timestamp: `Today at ${timeFormatted}`,
          actorRole: 'Student',
          note: 'Ticket safely logged into university operational dispatch system.',
          completed: true,
        },
        {
          status: 'UNDER_REVIEW',
          title: 'Review by Responsible Authority',
          timestamp: 'In Queue',
          actorRole: departmentMap[input.category] || 'Campus Operations',
          completed: false,
        },
        {
          status: 'ASSIGNED',
          title: 'Staff Assignment & Scheduling',
          timestamp: 'Pending review',
          actorRole: 'Operations Dispatch',
          completed: false,
        },
        {
          status: 'IN_PROGRESS',
          title: 'Field Execution',
          timestamp: 'Pending assignment',
          actorRole: 'Staff / Technician',
          completed: false,
        },
        {
          status: 'RESOLVED',
          title: 'Completion Verification',
          timestamp: 'Pending resolution',
          actorRole: 'Student',
          completed: false,
        },
      ],
    }

    const updatedList = [newRequest, ...list]
    saveStoredRequests(updatedList)
    return newRequest
  },

  /**
   * Fetch hostel details and living roster
   */
  async getHostelInfo(): Promise<HostelInfo> {
    await delay(120)
    return MOCK_HOSTEL_INFO
  },

  /**
   * Fetch mess dining menu
   */
  async getMessMenu(): Promise<DayMenu[]> {
    await delay(100)
    return MOCK_MESS_MENU
  },

  /**
   * Submit feedback for a meal
   */
  async submitMessFeedback(data: {
    mealType: any
    rating: number
    comment?: string
  }): Promise<MessFeedback> {
    await delay(150)
    const feedback: MessFeedback = {
      id: `FB-${Date.now()}`,
      mealType: data.mealType,
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date().toISOString(),
    }
    saveMessFeedback(feedback)
    return feedback
  },

  /**
   * Fetch previous meal feedback submitted
   */
  async getMessFeedbackHistory(): Promise<MessFeedback[]> {
    await delay(60)
    return getStoredMessFeedback()
  },

  /**
   * Fetch campus notices with optional category filter
   */
  async getNotices(filter?: { category?: string; search?: string }): Promise<Notice[]> {
    await delay(100)
    const readIds = getStoredReadNoticeIds()
    let list = MOCK_NOTICES.map((n) => ({
      ...n,
      isRead: readIds.includes(n.id),
    }))

    if (filter?.category && filter.category !== 'ALL') {
      list = list.filter((n) => n.category === filter.category)
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase()
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.department.toLowerCase().includes(q)
      )
    }

    return list
  },

  /**
   * Fetch single notice and mark as read
   */
  async getNoticeById(id: string): Promise<Notice | null> {
    await delay(60)
    const notice = MOCK_NOTICES.find((n) => n.id === id)
    if (!notice) return null
    saveReadNoticeId(id)
    return {
      ...notice,
      isRead: true,
    }
  },

  /**
   * Mark notice as read
   */
  async markNoticeRead(id: string): Promise<void> {
    saveReadNoticeId(id)
  },

  /**
   * Fetch student profile details
   */
  async getStudentProfile(): Promise<StudentProfile> {
    await delay(100)
    return MOCK_STUDENT_PROFILE
  },
}
