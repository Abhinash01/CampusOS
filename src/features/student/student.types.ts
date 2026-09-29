export type RequestCategory =
  | 'HOSTEL'
  | 'MAINTENANCE'
  | 'MESS'
  | 'CERTIFICATE'
  | 'GATE_PASS'
  | 'ACADEMIC'
  | 'OTHER'

export type RequestStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'RESOLVED'

export type RequestPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'

export interface RequestTimelineEvent {
  status: RequestStatus
  title: string
  timestamp: string
  actorRole: string
  actorName?: string
  note?: string
  completed: boolean
}

export interface StudentRequest {
  id: string
  category: RequestCategory
  title: string
  description: string
  location?: string
  status: RequestStatus
  priority: RequestPriority
  createdAt: string
  updatedAt: string
  assignedDepartment?: string
  assignedTo?: string
  otp?: string
  timeline: RequestTimelineEvent[]
}

export interface CreateRequestInput {
  category: RequestCategory
  title: string
  description: string
  location?: string
  priority: RequestPriority
}

export interface AttendanceRecordItem {
  date: string
  day: string
  status: 'PRESENT' | 'ABSENT' | 'EXCUSED'
  topic?: string
}

export interface SubjectAttendance {
  id: string
  code: string
  name: string
  faculty: string
  present: number
  absent: number
  total: number
  percentage: number
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL'
  safeToSkipClasses: number
  classesNeededFor75: number
  recentHistory: AttendanceRecordItem[]
}

export interface AttendanceSummary {
  overallPercentage: number
  totalPresent: number
  totalAbsent: number
  totalClasses: number
  safeToSkipClasses: number
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL'
  subjects: SubjectAttendance[]
}

export interface Roommate {
  name: string
  rollNo: string
  branch: string
  bedNumber: string
}

export interface GatePassRecord {
  id: string
  type: 'OUTSTATION' | 'NIGHT_OUT' | 'EMERGENCY'
  reason: string
  destination: string
  outTime: string
  inTime: string
  status: 'APPROVED' | 'PENDING' | 'REJECTED'
  approvedBy?: string
  approvedAt?: string
}

export interface HostelInfo {
  block: string
  roomNumber: string
  bedNumber: string
  wardenName: string
  wardenRole: string
  wardenPhone: string
  officeLocation: string
  officeHours: string
  curfewTime: string
  roommates: Roommate[]
  roomInventory: { item: string; condition: string }[]
  activeGatePass?: GatePassRecord
  importantRules: string[]
}

export type MealType = 'BREAKFAST' | 'LUNCH' | 'SNACKS' | 'DINNER'

export interface MealMenu {
  mealType: MealType
  timeWindow: string
  items: string[]
  isSpecial?: boolean
  dietaryTags?: string[]
}

export interface DayMenu {
  day: string
  date: string
  isToday?: boolean
  meals: MealMenu[]
}

export interface MessFeedback {
  id: string
  mealType: MealType
  rating: number // 1 to 5
  comment?: string
  createdAt: string
}

export type NoticeCategory =
  | 'ACADEMIC'
  | 'HOSTEL'
  | 'ADMINISTRATION'
  | 'EVENTS'
  | 'EXAMINATION'
  | 'GENERAL'

export interface Notice {
  id: string
  title: string
  category: NoticeCategory
  publishedDate: string
  department: string
  summary: string
  content: string
  priority: 'NORMAL' | 'IMPORTANT' | 'URGENT'
  isRead: boolean
  attachmentName?: string
  targetAudience: string
}

export interface AttentionItem {
  id: string
  type: 'ATTENDANCE' | 'REQUEST' | 'NOTICE' | 'HOSTEL'
  title: string
  description: string
  actionLabel: string
  actionHref: string
  severity: 'warning' | 'info' | 'critical'
}

export interface TodayLecture {
  time: string
  subject: string
  code: string
  room: string
  faculty: string
  isNext?: boolean
}

export interface StudentDashboardData {
  studentProfile: {
    name: string
    email: string
    studentId: string
    department: string
    course: string
    semester: string
    section: string
    hostelRoom: string
  }
  stats: {
    attendancePct: number
    activeRequestsCount: number
    unreadNoticesCount: number
    hostelRoom: string
  }
  attentionItems: AttentionItem[]
  todayLectures: TodayLecture[]
  recentRequests: StudentRequest[]
  recentNotices: Notice[]
}

export interface StudentProfile {
  name: string
  email: string
  studentId: string
  phone: string
  department: string
  course: string
  semester: string
  admissionYear: string
  bloodGroup: string
  emergencyContact: {
    relation: string
    name: string
    phone: string
  }
  hostel: {
    block: string
    room: string
    bed: string
  }
  academicStanding: {
    cgpa: number
    backlogs: number
    status: string
  }
}
