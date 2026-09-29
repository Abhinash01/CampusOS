import type {
  AttendanceSummary,
  HostelInfo,
  DayMenu,
  Notice,
  StudentRequest,
  StudentProfile,
  MessFeedback,
} from './student.types'

const STORAGE_KEYS = {
  REQUESTS: 'campusos_student_requests',
  MESS_FEEDBACK: 'campusos_student_mess_feedback',
  READ_NOTICES: 'campusos_student_read_notices',
}

// Initial seeded student requests
const INITIAL_REQUESTS: StudentRequest[] = [
  {
    id: 'REQ-1042',
    category: 'HOSTEL',
    title: 'Bathroom tap leaking continuously',
    description: 'The cold water tap valve in bathroom #2 is loose and leaking continuous droplets causing floor wetness.',
    location: 'Hostel Block B · Floor 2 · Room 204 Bathroom',
    status: 'IN_PROGRESS',
    priority: 'NORMAL',
    createdAt: '2026-09-29T10:15:00.000Z',
    updatedAt: '2026-09-29T11:10:00.000Z',
    assignedDepartment: 'Estate & Maintenance',
    assignedTo: 'Technician Manoj Kumar',
    otp: '4829',
    timeline: [
      {
        status: 'SUBMITTED',
        title: 'Request Submitted',
        timestamp: '10:15 AM · 29 Sep 2026',
        actorRole: 'Student',
        note: 'Submitted via student workspace with image attachment.',
        completed: true,
      },
      {
        status: 'UNDER_REVIEW',
        title: 'Adjudicated by Hostel Office',
        timestamp: '10:22 AM · 29 Sep 2026',
        actorRole: 'Hostel Administration',
        note: 'Auto-routed to Estate & Maintenance supervisor queue.',
        completed: true,
      },
      {
        status: 'ASSIGNED',
        title: 'Assigned to Technician',
        timestamp: '10:35 AM · 29 Sep 2026',
        actorRole: 'Estate & Maintenance',
        actorName: 'Manoj Kumar (Plumbing)',
        note: 'Dispatched with replacement threaded washer unit.',
        completed: true,
      },
      {
        status: 'IN_PROGRESS',
        title: 'On-Site Repair Underway',
        timestamp: '11:10 AM · 29 Sep 2026',
        actorRole: 'Maintenance Team',
        actorName: 'Manoj Kumar',
        note: 'Technician on premise. Provide verification OTP upon physical inspection.',
        completed: true,
      },
      {
        status: 'RESOLVED',
        title: 'Awaiting Student Confirmation',
        timestamp: 'Pending completion',
        actorRole: 'Student',
        note: 'Authorize ticket closure with verification code: 4829',
        completed: false,
      },
    ],
  },
  {
    id: 'REQ-1038',
    category: 'CERTIFICATE',
    title: 'Bonafide Certificate for National Scholarship',
    description: 'Application for official bonafide study certificate with institute seal for scholarship renewal portal.',
    location: 'Registrar Office · Academic Counter 3',
    status: 'UNDER_REVIEW',
    priority: 'HIGH',
    createdAt: '2026-09-28T09:30:00.000Z',
    updatedAt: '2026-09-29T08:45:00.000Z',
    assignedDepartment: 'Academic Affairs / Registrar',
    assignedTo: 'Superintendent K. S. Jena',
    timeline: [
      {
        status: 'SUBMITTED',
        title: 'Application Lodged',
        timestamp: '09:30 AM · 28 Sep 2026',
        actorRole: 'Student',
        note: 'Application submitted with 5th sem marksheet attached.',
        completed: true,
      },
      {
        status: 'UNDER_REVIEW',
        title: 'Verification by Department Dean',
        timestamp: '08:45 AM · 29 Sep 2026',
        actorRole: 'Dean Academic',
        note: 'Academic standing verified. Certificate queued for registrar signature.',
        completed: true,
      },
      {
        status: 'ASSIGNED',
        title: 'Dispatch to Document Cell',
        timestamp: 'Expected Today',
        actorRole: 'Registrar Office',
        completed: false,
      },
      {
        status: 'IN_PROGRESS',
        title: 'Sealing and Serial Allocation',
        timestamp: 'Pending',
        actorRole: 'Examination & Certification',
        completed: false,
      },
      {
        status: 'RESOLVED',
        title: 'Ready for Digital Download',
        timestamp: 'Pending',
        actorRole: 'System',
        completed: false,
      },
    ],
  },
  {
    id: 'REQ-1029',
    category: 'GATE_PASS',
    title: 'Outstation Gate Pass — Family Function',
    description: 'Night out pass requested for attending sister engagement ceremony in Cuttack.',
    location: 'Hostel Block B Gate',
    status: 'RESOLVED',
    priority: 'NORMAL',
    createdAt: '2026-09-24T14:20:00.000Z',
    updatedAt: '2026-09-25T18:00:00.000Z',
    assignedDepartment: 'Hostel Administration',
    assignedTo: 'Warden Prof. R. Mohanty',
    timeline: [
      {
        status: 'SUBMITTED',
        title: 'Gate Pass Requested',
        timestamp: '02:20 PM · 24 Sep 2026',
        actorRole: 'Student',
        completed: true,
      },
      {
        status: 'UNDER_REVIEW',
        title: 'Parental Consent Verified',
        timestamp: '04:10 PM · 24 Sep 2026',
        actorRole: 'Hostel Warden Office',
        note: 'Confirmed with parent phone call record.',
        completed: true,
      },
      {
        status: 'ASSIGNED',
        title: 'Approval Authorization',
        timestamp: '05:00 PM · 24 Sep 2026',
        actorRole: 'Chief Warden',
        completed: true,
      },
      {
        status: 'IN_PROGRESS',
        title: 'Active Gate Clearance',
        timestamp: '06:00 PM · 25 Sep 2026',
        actorRole: 'Security Gate 1',
        completed: true,
      },
      {
        status: 'RESOLVED',
        title: 'Returned to Campus Safely',
        timestamp: '06:15 PM · 27 Sep 2026',
        actorRole: 'Security Gate 1',
        note: 'Biometric check recorded on re-entry.',
        completed: true,
      },
    ],
  },
]

// Seeded Attendance Data
export const MOCK_ATTENDANCE: AttendanceSummary = {
  overallPercentage: 86.4,
  totalPresent: 121,
  totalAbsent: 19,
  totalClasses: 140,
  safeToSkipClasses: 12,
  status: 'HEALTHY',
  subjects: [
    {
      id: 'sub-1',
      code: 'CS601',
      name: 'Distributed Operating Systems',
      faculty: 'Dr. R. K. Nayak',
      present: 28,
      absent: 4,
      total: 32,
      percentage: 87.5,
      status: 'HEALTHY',
      safeToSkipClasses: 4,
      classesNeededFor75: 0,
      recentHistory: [
        { date: '29 Sep', day: 'Mon', status: 'PRESENT', topic: 'Raft Consensus Protocol' },
        { date: '26 Sep', day: 'Fri', status: 'PRESENT', topic: 'Byzantine Fault Tolerance' },
        { date: '24 Sep', day: 'Wed', status: 'ABSENT', topic: 'Vector Clocks Implementation' },
        { date: '22 Sep', day: 'Mon', status: 'PRESENT', topic: 'Lamport Timestamps' },
        { date: '19 Sep', day: 'Fri', status: 'PRESENT', topic: 'Distributed Shared Memory' },
      ],
    },
    {
      id: 'sub-2',
      code: 'CS602',
      name: 'Database Management Systems',
      faculty: 'Prof. S. Mohapatra',
      present: 26,
      absent: 4,
      total: 30,
      percentage: 86.7,
      status: 'HEALTHY',
      safeToSkipClasses: 3,
      classesNeededFor75: 0,
      recentHistory: [
        { date: '28 Sep', day: 'Sun', status: 'PRESENT', topic: 'Query Optimization Strategies' },
        { date: '25 Sep', day: 'Thu', status: 'PRESENT', topic: 'B+ Tree Indexing in PostgreSQL' },
        { date: '23 Sep', day: 'Tue', status: 'PRESENT', topic: 'Two-Phase Locking (2PL)' },
        { date: '21 Sep', day: 'Sun', status: 'ABSENT', topic: 'ACID Transactions & WAL' },
        { date: '18 Sep', day: 'Thu', status: 'PRESENT', topic: 'Normal Forms (3NF, BCNF)' },
      ],
    },
    {
      id: 'sub-3',
      code: 'CS603',
      name: 'Java Enterprise Applications',
      faculty: 'Dr. P. C. Tripathy',
      present: 24,
      absent: 4,
      total: 28,
      percentage: 85.7,
      status: 'HEALTHY',
      safeToSkipClasses: 3,
      classesNeededFor75: 0,
      recentHistory: [
        { date: '29 Sep', day: 'Mon', status: 'PRESENT', topic: 'Spring Boot Microservices' },
        { date: '26 Sep', day: 'Fri', status: 'PRESENT', topic: 'JPA Criteria API' },
        { date: '22 Sep', day: 'Mon', status: 'PRESENT', topic: 'Hibernate Second-Level Cache' },
        { date: '19 Sep', day: 'Fri', status: 'ABSENT', topic: 'RESTful API Exception Handlers' },
        { date: '15 Sep', day: 'Mon', status: 'PRESENT', topic: 'Spring Dependency Injection' },
      ],
    },
    {
      id: 'sub-4',
      code: 'CS604',
      name: 'Computer Networks & Protocols',
      faculty: 'Prof. A. K. Behera',
      present: 25,
      absent: 6,
      total: 31,
      percentage: 80.6,
      status: 'HEALTHY',
      safeToSkipClasses: 2,
      classesNeededFor75: 0,
      recentHistory: [
        { date: '27 Sep', day: 'Sat', status: 'PRESENT', topic: 'TCP Congestion Control (CUBIC)' },
        { date: '25 Sep', day: 'Thu', status: 'ABSENT', topic: 'BGP Routing Policies' },
        { date: '23 Sep', day: 'Tue', status: 'PRESENT', topic: 'OSPF Link-State Routing' },
        { date: '20 Sep', day: 'Sat', status: 'PRESENT', topic: 'IPv6 Subnetting & Transition' },
        { date: '18 Sep', day: 'Thu', status: 'PRESENT', topic: 'DNSSEC & TLS Handshake' },
      ],
    },
    {
      id: 'sub-5',
      code: 'CS605L',
      name: 'Web Technologies Laboratory',
      faculty: 'Er. N. K. Sahoo',
      present: 18,
      absent: 1,
      total: 19,
      percentage: 94.7,
      status: 'HEALTHY',
      safeToSkipClasses: 3,
      classesNeededFor75: 0,
      recentHistory: [
        { date: '27 Sep', day: 'Sat', status: 'PRESENT', topic: 'WebSocket Full-Duplex Chat' },
        { date: '20 Sep', day: 'Sat', status: 'PRESENT', topic: 'State Management with Zustand' },
        { date: '13 Sep', day: 'Sat', status: 'PRESENT', topic: 'React Query Caching Policies' },
        { date: '06 Sep', day: 'Sat', status: 'PRESENT', topic: 'Tailwind CSS Component System' },
        { date: '30 Aug', day: 'Sat', status: 'ABSENT', topic: 'TypeScript Generics Workshop' },
      ],
    },
  ],
}

// Seeded Hostel Info
export const MOCK_HOSTEL_INFO: HostelInfo = {
  block: 'Block B (Kalam Bhawan)',
  roomNumber: '204',
  bedNumber: 'Bed 2',
  wardenName: 'Prof. R. Mohanty',
  wardenRole: 'Assistant Hostel Warden (Block B)',
  wardenPhone: '+91 94371 88204',
  officeLocation: 'Block B Ground Floor, Wing 1 Office',
  officeHours: '05:00 PM – 07:30 PM (Daily)',
  curfewTime: '10:00 PM (Sharp)',
  roommates: [
    { name: 'Rohan Verma', rollNo: '2201004135', branch: 'CSE (Sem 6)', bedNumber: 'Bed 1' },
    { name: 'Sameer Das', rollNo: '2201004142', branch: 'IT (Sem 6)', bedNumber: 'Bed 3' },
  ],
  roomInventory: [
    { item: 'Study Table & Ergonomic Chair', condition: 'Verified Functional' },
    { item: 'Twin Wardrobe with Locker', condition: 'Key Issued #B204-2' },
    { item: 'Ceiling Fan & LED Tube', condition: 'Working' },
    { item: 'Network LAN Port RJ-45', condition: 'Active (1 Gbps)' },
  ],
  activeGatePass: {
    id: 'GP-2026-091',
    type: 'OUTSTATION',
    reason: 'Weekend Library Visit & Project Discussion',
    destination: 'Bhubaneswar Central Tech Hub',
    outTime: '06:00 PM · 02 Oct 2026',
    inTime: '08:30 PM · 02 Oct 2026',
    status: 'APPROVED',
    approvedBy: 'Prof. R. Mohanty (Warden)',
    approvedAt: '28 Sep 2026, 04:30 PM',
  },
  importantRules: [
    'Biometric attendance at hostel entrance is mandatory between 09:00 PM and 10:00 PM.',
    'Electrical appliances above 500W (heaters, heavy irons) are strictly prohibited inside dorm rooms.',
    'Quiet hours strictly observed across all floors from 11:00 PM to 06:00 AM.',
    'Maintenance issues should be logged via CampusOS for official service SLA tracking.',
  ],
}

// Seeded Mess Menu
export const MOCK_MESS_MENU: DayMenu[] = [
  {
    day: 'Today (Wednesday)',
    date: '30 Sep 2026',
    isToday: true,
    meals: [
      {
        mealType: 'BREAKFAST',
        timeWindow: '07:30 AM – 09:30 AM',
        items: ['Hot Idli & Medu Vada', 'South Indian Sambar', 'Coconut & Tomato Chutneys', 'Boiled Eggs / Fresh Banana', 'Tea & Coffee'],
        dietaryTags: ['High Protein Option', 'Vegetarian / Egg'],
      },
      {
        mealType: 'LUNCH',
        timeWindow: '12:30 PM – 02:30 PM',
        items: ['Paneer Butter Masala', 'Yellow Dal Tadka with Ghee', 'Fragrant Jeera Rice', 'Soft Phulkas (Tawa Roti)', 'Green Cucumber Salad', 'Sweet Curd (Dahi)'],
        dietaryTags: ['Vegetarian', 'Balanced Macro'],
      },
      {
        mealType: 'SNACKS',
        timeWindow: '05:00 PM – 06:30 PM',
        items: ['Crispy Aloo Samosa (2 pcs)', 'Green Mint & Sweet Tamarind Chutney', 'Special Adrak Masala Chai'],
        dietaryTags: ['Evening Snack'],
      },
      {
        mealType: 'DINNER',
        timeWindow: '07:30 PM – 09:30 PM',
        items: ['Kadhai Chicken (Non-Veg) / Matar Paneer (Veg)', 'Dal Makhani Slow Cooked', 'Steamed Long Grain Basmati', 'Butter Roti', 'Gulab Jamun (1 pc)'],
        dietaryTags: ['Special Dinner', 'Non-Veg & Veg Counters'],
        isSpecial: true,
      },
    ],
  },
  {
    day: 'Tomorrow (Thursday)',
    date: '01 Oct 2026',
    isToday: false,
    meals: [
      {
        mealType: 'BREAKFAST',
        timeWindow: '07:30 AM – 09:30 AM',
        items: ['Puri with Aloo Chana Masala', 'Pickle & Cut Onions', 'Sprouted Moong Salad', 'Tea & Coffee'],
        dietaryTags: ['Vegetarian', 'Energy Rich'],
      },
      {
        mealType: 'LUNCH',
        timeWindow: '12:30 PM – 02:30 PM',
        items: ['Punjabi Chole Masala', 'Vegetable Pulao', 'Palak Dal', 'Fresh Rotis', 'Bundi Raita', 'Papad'],
        dietaryTags: ['Vegetarian'],
      },
      {
        mealType: 'SNACKS',
        timeWindow: '05:00 PM – 06:30 PM',
        items: ['Crispy Veg Cutlet', 'Tomato Ketchup', 'Filter Coffee / Tea'],
        dietaryTags: ['Vegetarian'],
      },
      {
        mealType: 'DINNER',
        timeWindow: '07:30 PM – 09:30 PM',
        items: ['Egg Curry / Mixed Veg Kohlapuri', 'Arhar Dal Fry', 'Jeera Rice', 'Tandoori Roti', 'Vermicelli Kheer'],
        dietaryTags: ['Non-Veg / Veg'],
      },
    ],
  },
]

// Seeded Notices
export const MOCK_NOTICES: Notice[] = [
  {
    id: 'NOT-2026-104',
    title: 'Mid-Semester Examination Schedule for Even Semester 2026',
    category: 'EXAMINATION',
    publishedDate: '29 Sep 2026',
    department: 'Controller of Examinations',
    summary: 'Official timetable for B.Tech 6th semester theoretical examinations commencing October 14th.',
    content: `The Mid-Semester Examinations for B.Tech 6th Semester (All Branches) for the Academic Session 2025-2026 will commence from 14th October 2026.\n\nKey Guidelines:\n1. Students must carry their physical University Identity Card or CampusOS Digital Student Verification Badge.\n2. Standard reporting time is 20 minutes prior to exam commencement.\n3. Programmable calculators and cellular devices are strictly prohibited inside the examination halls.\n\nSubject-wise scheduling timetable is attached as circular Annexure-A.`,
    priority: 'URGENT',
    isRead: false,
    attachmentName: 'MidSem_Timetable_Even_2026.pdf',
    targetAudience: 'B.Tech Semester 6 (All Branches)',
  },
  {
    id: 'NOT-2026-102',
    title: 'Submission of Bonafide Certificate Applications for State Scholarships',
    category: 'ACADEMIC',
    publishedDate: '28 Sep 2026',
    department: 'Scholarship & Academic Affairs',
    summary: 'Deadline for submitting bonafide endorsements for PRERANA and National Scholarship Portals is October 10th.',
    content: `All students availing state post-matric scholarships (PRERANA, NSP, Medhabruti) are hereby notified to submit their certificate verification requests via the CampusOS Requests module by 10th October 2026.\n\nVerification steps:\n1. Open CampusOS -> Requests -> New Request -> Category: Certificate.\n2. Attach your previous semester grade card and income declaration.\n3. Verified certificates will be electronically signed within 48 hours for immediate portal upload.`,
    priority: 'IMPORTANT',
    isRead: false,
    targetAudience: 'All Undergraduate Students',
  },
  {
    id: 'NOT-2026-098',
    title: 'Hostel Wi-Fi Bandwidth Upgrade & Optical Fiber Maintenance',
    category: 'HOSTEL',
    publishedDate: '27 Sep 2026',
    department: 'Campus IT & Network Operations',
    summary: 'Brief network maintenance scheduled for Block B on Thursday 11:00 PM to 01:00 AM for high-speed fiber upgrade.',
    content: `The Campus Network Cell will be upgrading the wireless access points and core switches in Hostel Blocks A & B to Wi-Fi 6 infrastructure.\n\nScheduled Window: Thursday, 1st October 2026, 11:00 PM to 01:00 AM.\nExpected Impact: LAN and Wi-Fi connectivity will experience intermittent downtime of approximately 45 minutes.\n\nWe appreciate your patience as we double local access speeds.`,
    priority: 'NORMAL',
    isRead: true,
    targetAudience: 'Hostel Residents (Blocks A & B)',
  },
  {
    id: 'NOT-2026-095',
    title: 'Annual University Hackathon & Innovation Expo 2026',
    category: 'EVENTS',
    publishedDate: '25 Sep 2026',
    department: 'Innovation & Incubation Center',
    summary: 'Registrations are now live for 36-hour hackathon with cash rewards and mentor opportunities.',
    content: `The Institution Innovation Council invites student teams to participate in the flagship 36-hour hackathon. Tracks include Smart Campus Operations, Clean Energy, AI for Healthcare, and FinTech.\n\nDates: October 24th – 26th, 2026.\nVenue: Central Auditorium & Computing Arena.\nRegistration deadline: October 15th through the university events portal.`,
    priority: 'NORMAL',
    isRead: true,
    attachmentName: 'Hackathon_Rulebook_2026.pdf',
    targetAudience: 'Open to All Students',
  },
  {
    id: 'NOT-2026-091',
    title: 'Hostel Evening Gate Timings & Biometric Verification Protocol',
    category: 'ADMINISTRATION',
    publishedDate: '22 Sep 2026',
    department: 'Office of the Chief Warden',
    summary: 'Standardized evening attendance confirmation procedures to ensure student safety.',
    content: `All hostel boarders are reminded that evening entry closes at 10:00 PM sharp. Students returning from library or lab hours past 09:30 PM must punch their biometric confirmation at the primary security checkpoint.\n\nAny emergency outstation requirement must be logged as a digital gate pass request on CampusOS in advance.`,
    priority: 'IMPORTANT',
    isRead: true,
    targetAudience: 'Hostel Boarders & Staff',
  },
]

// Mock Student Profile
export const MOCK_STUDENT_PROFILE: StudentProfile = {
  name: 'Abhinash Sharma',
  email: 'abhinash.sharma@campusos.edu',
  studentId: '2201004128',
  phone: '+91 98612 34567',
  department: 'Computer Science & Engineering',
  course: 'Bachelor of Technology (B.Tech)',
  semester: '6th Semester',
  admissionYear: '2022',
  bloodGroup: 'O+',
  emergencyContact: {
    relation: 'Father',
    name: 'Suresh Sharma',
    phone: '+91 98611 99887',
  },
  hostel: {
    block: 'Block B (Kalam Bhawan)',
    room: '204',
    bed: 'Bed 2',
  },
  academicStanding: {
    cgpa: 8.84,
    backlogs: 0,
    status: 'In Good Standing',
  },
}

// Helper functions that read and write to localStorage
export function getStoredRequests(): StudentRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REQUESTS)
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS))
      return INITIAL_REQUESTS
    }
    return JSON.parse(raw)
  } catch {
    return INITIAL_REQUESTS
  }
}

export function saveStoredRequests(requests: StudentRequest[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests))
  } catch (e) {
    console.error('Failed to save requests to storage', e)
  }
}

export function getStoredReadNoticeIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.READ_NOTICES)
    return raw ? JSON.parse(raw) : ['NOT-2026-098', 'NOT-2026-095', 'NOT-2026-091']
  } catch {
    return []
  }
}

export function saveReadNoticeId(id: string): void {
  try {
    const current = getStoredReadNoticeIds()
    if (!current.includes(id)) {
      const updated = [...current, id]
      localStorage.setItem(STORAGE_KEYS.READ_NOTICES, JSON.stringify(updated))
    }
  } catch (e) {
    console.error('Failed to mark notice as read in storage', e)
  }
}

export function getStoredMessFeedback(): MessFeedback[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MESS_FEEDBACK)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveMessFeedback(feedback: MessFeedback): void {
  try {
    const current = getStoredMessFeedback()
    const updated = [feedback, ...current]
    localStorage.setItem(STORAGE_KEYS.MESS_FEEDBACK, JSON.stringify(updated))
  } catch (e) {
    console.error('Failed to save mess feedback', e)
  }
}
