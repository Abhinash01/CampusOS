# CampusOS — Comprehensive Page Guide

Welcome to the **CampusOS Page Guide**. This document details every page in CampusOS across all user personas (Public, Student, Administrator, Warden, Maintenance Staff, and Campus Operations). It outlines the purpose, UI sections, supported actions, data displayed, future capabilities, and the planned implementation phase for each screen.

---

## 1. Public Experience

### Landing Page
* **Page:** Landing Page
* **Route:** `/`
* **Role:** Public (Prospective students, visitors, current campus community)
* **Purpose:** Introduces CampusOS as the unified operating system for campus life, showcasing the platform value proposition, unified architecture, and quick access to role shells.
* **Main sections:** Hero banner with brand statement, Unified OS concept interactive diagram, Problem vs Solution breakdown (fragmented registers vs CampusOS), Multi-role preview cards, Key operational metrics showcase, and Call to action footer.
* **Main actions:** Navigate to `/login`, explore `/design-system`, launch role demo portals (`/app/student`, `/app/admin`, `/app/warden`, `/app/staff`).
* **Data shown:** Platform statistics, feature highlights, problem-solution comparative metrics.
* **Future functionality:** Interactive campus live status ticker, public notices feed, campus visitor quick check-in.
* **Implementation phase:** Phase 0 (Foundation) / Phase 1 (Full Public Portal).

---

### Login Portal
* **Page:** Authentication Portal
* **Route:** `/login`
* **Role:** All users (Student, Staff, Warden, Administrator)
* **Purpose:** Secure gateway to authenticate university members into their assigned role interface.
* **Main sections:** Campus ID / Email input, Password field, Role indicator selector, Keep me signed in toggle, Quick links to Forgot Password and Kiosk mode.
* **Main actions:** Sign In button, SSO / University Google Workspace Auth button, Navigate to Forgot Password.
* **Data shown:** Organization branding, session security notices.
* **Future functionality:** JWT auth verification, multi-factor authentication (MFA), biometric WebAuthn, University Active Directory / LDAP single sign-on.
* **Implementation phase:** Phase 0 (Shell & UX) / Phase 1 (Backend Auth Integration).

---

### Forgot Password
* **Page:** Password Recovery
* **Route:** `/forgot-password`
* **Role:** All users
* **Purpose:** Self-service password reset and identity verification for campus members who lost access.
* **Main sections:** University roll number / official email input, recovery method selection (SMS OTP / Official Email link), OTP verification field.
* **Main actions:** Send OTP, Verify OTP, Reset Password, Back to Login.
* **Data shown:** Masked delivery destination (e.g. `s****@bput.ac.in`), rate limit countdown.
* **Future functionality:** SMS gateway integration, secure reset token expiry handling, IT Helpdesk instant escalation.
* **Implementation phase:** Phase 0 (Shell & UX) / Phase 1 (Full Recovery Flow).

---

## 2. Student Portal (`/app/student`)

### Student Dashboard
* **Page:** Student Central Dashboard
* **Route:** `/app/student`
* **Role:** Student
* **Purpose:** Daily command center for a student showing real-time attendance, upcoming classes, today's mess menu, active gate pass status, and pending request updates.
* **Main sections:** Welcome header with student identity summary, Quick Action cards (Request Gate Pass, File Complaint, Order Certificate), Attendance pulse widget, Class Schedule ticker, Active Requests tracker, Mess preview.
* **Main actions:** Quick-launch emergency ticket, 1-click gate pass status check, view detailed timetable.
* **Data shown:** Overall attendance percentage, next 2 upcoming lectures, active complaints status, mess menu for current meal.
* **Future functionality:** Personalized AI recommendations, smart conflict warnings, exam alerts.
* **Implementation phase:** Phase 0 (Application Shell & Dashboard Preview) / Phase 2 (Student Experience).

---

### Attendance Overview
* **Page:** Academic Attendance
* **Route:** `/app/student/attendance`
* **Role:** Student
* **Purpose:** In-depth breakdown of subject-wise lecture attendance, medical leave credits, and shortage alerts.
* **Main sections:** Overall aggregate percentage gauge, Subject-by-subject card list, Deficit calculator ("Attend next 3 classes to reach 75%"), Leave deduction ledger.
* **Main actions:** Download monthly attendance report, appeal missing attendance, attach medical certificate.
* **Data shown:** Total lectures held, lectures attended, percentage, safe skip count or shortage count.
* **Future functionality:** Real-time BLE / Geofenced attendance logging, automated professor notification for approved medical leave.
* **Implementation phase:** Phase 2 (Student Experience).

---

### Timetable & Class Updates
* **Page:** Timetable & Schedule
* **Route:** `/app/student/timetable`
* **Role:** Student
* **Purpose:** Weekly academic schedule showing class timings, room numbers, faculty details, and cancelled/rescheduled class alerts.
* **Main sections:** Day selector (Mon-Sat), Time-slot chronological view, Class cards with room numbers and faculty names, Reschedule banner.
* **Main actions:** Add to Google/iCal calendar, filter by practical/theory, notify class representative.
* **Data shown:** Class time, Course code & title, Classroom / Lab identifier, Faculty initials, Status (On schedule / Cancelled / Moved).
* **Future functionality:** Live room changes pushed via WebSockets, automatic calendar synchronization.
* **Implementation phase:** Phase 2 (Student Experience).

---

### Student Notices
* **Page:** Campus & Department Notices
* **Route:** `/app/student/notices`
* **Role:** Student
* **Purpose:** Filtered and targeted official circulars strictly relevant to the student's branch, semester, hostel, and clubs.
* **Main sections:** Notice category tabs (Academic, Hostel, Exam, Events), Pinned priority notices, Search and archive bar.
* **Main actions:** Mark as acknowledged, bookmark notice, download signed PDF attachments.
* **Data shown:** Issuing authority, publication date, importance badge, title, preview snippet, read status.
* **Future functionality:** Mandatory read acknowledgements before accessing results, offline PDF caching.
* **Implementation phase:** Phase 2 (Student Experience).

---

### Student Notifications
* **Page:** Real-time Notifications Center
* **Route:** `/app/student/notifications`
* **Role:** Student
* **Purpose:** Unified inbox for transactional alerts: ticket updates, gate pass decisions, mess menu changes, and fee deadlines.
* **Main sections:** Filter pills (All, Requests, Security, Academic), Chronological alert list, Clear all button.
* **Main actions:** Click through to source entity, mark as read, configure notification delivery preferences (In-app, Push, Email).
* **Data shown:** Trigger entity, timestamp, urgency status, actionable deep link.
* **Future functionality:** Web Push API background sync, sound alerts for emergency broadcasts.
* **Implementation phase:** Phase 2 (Student Experience).

---

### Student Requests Hub
* **Page:** General Student Requests
* **Route:** `/app/student/requests`
* **Role:** Student
* **Purpose:** Unified index of all administrative requests submitted by the student (bona fide certificates, room swaps, library dues clearance).
* **Main sections:** Active requests list, Draft requests, Past completed requests, "New Request" button.
* **Main actions:** Submit new request, track timeline step-by-step, download completed documents.
* **Data shown:** Ticket ID, Request category, Submission date, Current approval stage (e.g. "Pending HOD Signature"), Estimated turnaround time.
* **Future functionality:** Multi-tier automated approval routing engine.
* **Implementation phase:** Phase 3 (Core End-to-End Workflows).

---

### Certificate Requests
* **Page:** Certificate & Document Dispatch
* **Route:** `/app/student/certificates`
* **Role:** Student
* **Purpose:** Request official university certificates (Bonafide, Character, Medium of Instruction, Fee Structure, Transfer Certificate).
* **Main sections:** Request form with purpose dropdown, Required documents upload, Past certificates history with downloadable digital copies.
* **Main actions:** Submit application, verify digital signature, download QR-verifiable PDF.
* **Data shown:** Certificate type, reference number, digital verification hash, status.
* **Future functionality:** Automated verification QR code generation, integration with DigiLocker.
* **Implementation phase:** Phase 3 (Core End-to-End Workflows).

---

### Digital Gate Pass
* **Page:** Hostel Outing & Gate Pass
* **Route:** `/app/student/gate-pass`
* **Role:** Student
* **Purpose:** Request day outings, night leaves, or emergency homeward travel with parent/warden authorization.
* **Main sections:** Active Pass QR display (when approved), Leave request form (Date, Expected return time, Destination, Reason, Parent consent indicator), History logs.
* **Main actions:** Apply for Pass, Cancel application, Present QR Code at security checkpoint.
* **Data shown:** Pass validity window, Warden approval status, Guard checkout/check-in timestamp.
* **Future functionality:** Automatic SMS verification to parents, Guard terminal camera QR scanning.
* **Implementation phase:** Phase 3 (Core End-to-End Workflows).

---

### Hostel Management (Student View)
* **Page:** Hostel Living & Room Details
* **Role:** Student
* **Route:** `/app/student/hostel`
* **Purpose:** Detailed view of student's hostel room assignment, roommate details, hostel warden contacts, and inventory checklist.
* **Main sections:** Room allocation banner (Hostel name, Block, Room No, Bed ID), Room inventory condition (Fan, Table, Light, Mattress), Warden and Caretaker emergency directory.
* **Main actions:** Report damaged room asset, request room swap, submit vacation key handover.
* **Data shown:** Room occupancy status, asset serial numbers, hostel notice board.
* **Future functionality:** Room swap mutual matching engine, online room selection during new academic session.
* **Implementation phase:** Phase 4 (Campus Operations).

---

### Complaints & Maintenance
* **Page:** Maintenance Tickets & Issue Reporting
* **Route:** `/app/student/complaints`
* **Role:** Student
* **Purpose:** Report infrastructure problems (plumbing, electrical, carpentry, Wi-Fi, cleaning) with automatic department routing.
* **Main sections:** "File a Complaint" modal trigger, Active complaints timeline, SLA progress tracker, Resolved complaints with feedback rating.
* **Main actions:** Lodge complaint, upload photo evidence, re-open unresolved ticket, rate technician quality.
* **Data shown:** Issue ID, Category, Assigned technician name, Current state (Triaged -> Dispatched -> In Progress -> Resolved), Age in days.
* **Future functionality:** AI auto-categorization from photo/text, duplicate issue detection across same hostel wing.
* **Implementation phase:** Phase 3 (Core End-to-End Workflows).

---

### Mess & Dining
* **Page:** Campus Mess Operations & Feedback
* **Route:** `/app/student/mess`
* **Role:** Student
* **Purpose:** Today's breakfast, lunch, snacks, and dinner menu, nutritional tags, mess rebate leave application, and daily meal quality rating.
* **Main sections:** Daily menu cards with special dietary tags, Meal timing countdown, Daily meal rating stars & comment form, Mess rebate status.
* **Main actions:** Rate today's meal, apply for mess rebate (leave > 3 days), report hygiene violations.
* **Data shown:** Menu items per meal, average student rating today, mess cut-off times.
* **Future functionality:** Real-time crowd meter in dining hall, wastage metrics tracking.
* **Implementation phase:** Phase 4 (Campus Operations).

---

### Fees & University Dues
* **Page:** Dues & Financial Clearance
* **Route:** `/app/student/fees`
* **Role:** Student
* **Purpose:** Transparent ledger of tuition fees, hostel rent, mess bills, library fines, and exam fees with payment status.
* **Main sections:** Outstanding balance banner, Category-wise dues table, Payment receipts history.
* **Main actions:** Download fee clearance no-dues certificate, print tax receipt.
* **Data shown:** Receipt ID, Amount, Payment method, Transaction reference, Due date, Clearance status.
* **Future functionality:** Payment gateway integration (UPI, NetBanking), automated No-Dues clearance for final semester.
* **Implementation phase:** Phase 4 (Campus Operations).

---

### Student Profile
* **Page:** Student Academic & Personal Profile
* **Route:** `/app/student/profile`
* **Role:** Student
* **Purpose:** Complete student identification record, emergency contacts, local guardian info, and connected devices.
* **Main sections:** Personal information, Academic roll & registration info, Hostel & room details, Emergency contact directory, Active sessions.
* **Main actions:** Request profile data update, download digital student ID, manage device authorization.
* **Data shown:** Full Name, Roll No, Branch, Semester, Blood Group, Guardian Phone, Email.
* **Future functionality:** QR-encoded digital student ID card valid for library checkout and gate entry.
* **Implementation phase:** Phase 2 (Student Experience).

---

## 3. Administration Command Center (`/app/admin`)

### Admin Dashboard
* **Page:** Campus Operations Command Center
* **Route:** `/app/admin`
* **Role:** Campus Administrator / Registrar / Director
* **Purpose:** High-level strategic overview of entire campus operations, pending request backlogs, SLA compliance, and cross-departmental bottlenecks.
* **Main sections:** Campus KPI metric cards (Total complaints, SLA breach rate, Gate passes active, Overdue certificates), Departmental response velocity chart, Live campus activity stream, High-priority escalations table.
* **Main actions:** Filter by hostel block/department, broadcast emergency alert, reassign escalated tickets.
* **Data shown:** Aggregate numbers, department efficiency scores, overdue requests list.
* **Future functionality:** Predictive incident analytics, automated department workload rebalancing.
* **Implementation phase:** Phase 0 (Application Shell & Dashboard Preview) / Phase 5 (Admin Command Center).

---

### Admin Requests Oversight
* **Page:** University Request Operations
* **Route:** `/app/admin/requests`
* **Role:** Administrator
* **Purpose:** Monitor and expedite student document applications, leave requests, and administrative petitions.
* **Main sections:** Multi-status kanban or tabular view (Pending, In Review, Approved, Dispatched), Department filter, Search by Roll No.
* **Main actions:** Batch approve certificates, reassign request officer, view audit trail.
* **Data shown:** Student ID, Request Type, Time elapsed, Handling officer, Attached documents.
* **Future functionality:** Automated rule-based bulk dispatch for eligible students.
* **Implementation phase:** Phase 5 (Admin Command Center).

---

### Admin Complaints Command
* **Page:** Campus Infrastructure Incident Log
* **Route:** `/app/admin/complaints`
* **Role:** Administrator / Estate Officer
* **Purpose:** Full oversight of all maintenance issues across all hostels, departments, and academic blocks.
* **Main sections:** Severity filter (Critical, High, Medium, Low), Department split (Civil, Electrical, Plumbing, IT), Ageing analysis buckets (<24h, 24-72h, >3 days, >7 days).
* **Main actions:** Override technician assignment, escalate to contractor, mark false alarm, export maintenance report.
* **Data shown:** Complaint ID, Location, Category, Assigned staff, Time in queue, SLA status.
* **Future functionality:** Heatmap of recurring campus infrastructure failures.
* **Implementation phase:** Phase 5 (Admin Command Center).

---

### Students Registry
* **Page:** Student Directory & Record Management
* **Route:** `/app/admin/students`
* **Role:** Administrator
* **Purpose:** Central student database containing academic status, hostel allocations, discipline flags, and fee clearance.
* **Main sections:** Searchable student data table, Filter by Branch/Batch/Hostel, Quick inspect sidebar.
* **Main actions:** Export student directory, inspect individual dossier, update student status (Active, On Leave, Suspended, Alumni).
* **Data shown:** Roll No, Student Name, Program, Year, Hostel Block, Contact Info, Disciplinary status.
* **Future functionality:** Bulk CSV roster import, synchronization with university ERP.
* **Implementation phase:** Phase 5 (Admin Command Center).

---

### Staff & Technician Management
* **Page:** Campus Workforce Directory
* **Route:** `/app/admin/staff`
* **Role:** Administrator
* **Purpose:** Directory of all university operational staff, technicians, supervisors, and wardens with current workload indicators.
* **Main sections:** Department roster cards, Active workload gauge per technician, On-duty/Off-duty shift status.
* **Main actions:** Assign on-call duties, update technician specialty skillsets, monitor task completion rates.
* **Data shown:** Staff ID, Name, Department, Active tasks count, Average resolution time, Contact number.
* **Future functionality:** Shift scheduling calendar, automated technician load balancer.
* **Implementation phase:** Phase 5 (Admin Command Center).

---

### Hostel Operations Master
* **Page:** Hostel Assets & Occupancy
* **Route:** `/app/admin/hostels`
* **Role:** Chief Warden / Estate Manager
* **Purpose:** Complete occupancy rates, room vacancy counts, and infrastructure conditions across all campus hostels.
* **Main sections:** Hostel block overview cards (Total capacity, Occupied beds, Vacant beds, Maintenance holds), Block-wise complaint density.
* **Main actions:** Trigger block maintenance overhaul, reallocate room blocks, inspect room audit logs.
* **Data shown:** Occupancy percentage per block, active issues per hostel, warden in charge.
* **Future functionality:** Automated seasonal room allocation lottery.
* **Implementation phase:** Phase 5 (Admin Command Center).

---

### Mess Operations Management
* **Page:** Food Service Oversight & Vendor SLA
* **Route:** `/app/admin/mess`
* **Role:** Mess Committee Head / Admin
* **Purpose:** Oversee daily caterer performance, menu approvals, food quality feedback trends, and hygiene inspection records.
* **Main sections:** Vendor rating trend charts, Daily feedback summary, Menu approval queue, Rebate financial ledger.
* **Main actions:** Approve next week's menu, issue penalty notice to caterer, calculate monthly student rebate reimbursements.
* **Data shown:** Caterer name, Average student satisfaction score, Waste audit metrics, Total rebates claimed.
* **Future functionality:** Automated meal count forecasting based on approved gate passes to reduce food waste.
* **Implementation phase:** Phase 5 (Admin Command Center).

---

### Targeted Notices Publisher
* **Page:** Central Communication Dispatcher
* **Route:** `/app/admin/notices`
* **Role:** Administrator / Public Relations Officer
* **Purpose:** Draft, schedule, and distribute targeted circulars filtered by precise cohort criteria (Year, Branch, Hostel block, Day scholars).
* **Main sections:** Notice drafting studio with markdown editor, Audience targeting selector, Sent notices list with read analytics.
* **Main actions:** Publish notice, attach official files, schedule broadcast, track read receipts.
* **Data shown:** Title, Audience criteria, Read percentage, Delivery timestamp, Priority flag.
* **Future functionality:** Multi-channel broadcast (Push notification, SMS, WhatsApp Bot, Campus TV display).
* **Implementation phase:** Phase 6 (Communication Layer).

---

### Operational Analytics
* **Page:** Campus Insights & Intelligence
* **Route:** `/app/admin/analytics`
* **Role:** High Administration
* **Purpose:** Strategic decision-making dashboards visualizing student attendance trends, complaint resolution efficiency, and budget utilization.
* **Main sections:** Average resolution time trends, Recurring issue Pareto charts, Gate exit vs entry peak hour curves.
* **Main actions:** Export executive PDF report, change timeframe comparison, filter by department.
* **Data shown:** Mean time to resolve (MTTR), SLA compliance rate, Total complaints resolved this semester.
* **Future functionality:** Predictive machine learning forecasts for campus utility loads.
* **Implementation phase:** Phase 7 (Intelligence & Analytics).

---

### Recurring Issues Engine
* **Page:** Chronic Campus Problem Detection
* **Route:** `/app/admin/recurring-issues`
* **Role:** Administrator / Estate Engineer
* **Purpose:** Identifies repeated infrastructure failures in specific rooms, wings, or equipment to trigger preventive capital replacements.
* **Main sections:** Flagged chronic problem clusters (e.g. "Block B - 3rd Floor Plumbing: 14 complaints in 30 days"), Root cause assessment notes.
* **Main actions:** Convert cluster into Capital Replacement Project, assign specialized contractor.
* **Data shown:** Cluster title, affected assets, total student impact count, cumulative cost spent on temporary fixes.
* **Future functionality:** AI-driven root cause suggestion and preventive maintenance scheduling.
* **Implementation phase:** Phase 7 (Intelligence & Analytics).

---

### Immutable Audit Logs
* **Page:** System & Administrative Audit Trail
* **Route:** `/app/admin/audit-logs`
* **Role:** Security Officer / Chief Auditor
* **Purpose:** Unalterable ledger of every administrative action, gate pass approval, grade/attendance adjustment, and ticket state change.
* **Main sections:** Searchable chronological timeline, Actor filter (Admin, Warden, Staff, System), Action type filter.
* **Main actions:** Export signed audit log, search by IP or User ID, flag suspicious batch changes.
* **Data shown:** Timestamp, Actor ID & Role, Action Description, Target Entity, IP Address, Outcome.
* **Future functionality:** Cryptographic hash verification for compliance and governance audits.
* **Implementation phase:** Phase 5 (Admin Command Center).

---

## 4. Warden Portal (`/app/warden`)

### Warden Dashboard
* **Page:** Hostel Warden Station
* **Route:** `/app/warden`
* **Role:** Hostel Warden / Assistant Warden
* **Purpose:** Real-time visibility into hostel resident safety, pending gate pass approvals, urgent wing complaints, and night roll-call status.
* **Main sections:** Night headcount summary (Present, On Leave, Late/Missing), Urgent gate pass queue, Open wing complaints, Emergency announcements tool.
* **Main actions:** One-tap approve/reject gate pass, broadcast hostel wing notice, trigger roll call alert.
* **Data shown:** Hostel block name, Residents count, Pending leave approvals, Overdue returns count.
* **Future functionality:** Digital roll-call synchronization via student biometric checks.
* **Implementation phase:** Phase 0 (Application Shell & Dashboard Preview) / Phase 4 (Campus Operations).

---

### Warden Gate Passes Review
* **Page:** Gate Pass Adjudication
* **Route:** `/app/warden/gate-passes`
* **Role:** Warden
* **Purpose:** Inspect and decide on student outstation and night-out gate passes, with parent verification status indicators.
* **Main sections:** Pending review queue, Approved active passes, Late returns watch-list, Historical archive.
* **Main actions:** Approve with notes, Reject with reason, Call parent directly via integrated dialer, Revoke pass.
* **Data shown:** Student Name, Roll No, Room No, Destination, Departure & Return datetime, Parent contact & verification status.
* **Future functionality:** Automated verification logs from parent SMS confirmations.
* **Implementation phase:** Phase 3 (Core End-to-End Workflows).

---

### Warden Hostel Complaints
* **Page:** Wing Maintenance Supervision
* **Route:** `/app/warden/complaints`
* **Role:** Warden
* **Purpose:** Monitor maintenance technicians working within the hostel premises to ensure student safety and speedy resolution.
* **Main sections:** Complaints by wing/floor, Technician on-site status, Complaint escalation button.
* **Main actions:** Verify completed repairs, escort contractor authorization, escalate delayed tickets to Dean of Student Welfare.
* **Data shown:** Ticket ID, Room No, Nature of issue, Assigned technician, Verification signature status.
* **Future functionality:** Student satisfaction confirmation prompt before ticket closure.
* **Implementation phase:** Phase 4 (Campus Operations).

---

### Warden Room Management
* **Page:** Room Roster & Asset Audit
* **Route:** `/app/warden/rooms`
* **Role:** Warden
* **Purpose:** Room-by-room inspection records, bed allocation lists, and asset tracking (fans, study tables, wardrobes, window latches).
* **Main sections:** Floor layout visual grid, Room occupant cards, Asset condition flags.
* **Main actions:** Log room inspection, record asset damage, approve temporary bed reassignment.
* **Data shown:** Room number, Capacity, Current occupants, Asset status (Good / Needs Repair / Damaged).
* **Future functionality:** Photo-based room check-in/check-out condition logs at the start/end of semesters.
* **Implementation phase:** Phase 4 (Campus Operations).

---

## 5. Maintenance Staff Portal (`/app/staff`)

### Staff Dashboard
* **Page:** Field Technician Workbench
* **Route:** `/app/staff`
* **Role:** Maintenance Staff (Plumber, Electrician, Carpenter, IT Tech, Cleaner)
* **Purpose:** Mobile-optimized task list for field staff showing assigned maintenance tickets, room locations, and job priorities.
* **Main sections:** Today's Assigned Jobs, In-Progress Task card, Priority alerts (water leak, power failure), Completed jobs tally.
* **Main actions:** Accept ticket, navigate to room, start job, request spare parts, mark resolved with photo evidence.
* **Data shown:** Technician name, Specialization, Active tickets count, Today's completed tasks, SLA deadline countdown.
* **Future functionality:** Low-bandwidth offline ticket sync for basement and hostel dead zones.
* **Implementation phase:** Phase 0 (Application Shell & Dashboard Preview) / Phase 4 (Campus Operations).

---

### Staff Assigned Tasks
* **Page:** Technician Task Queue
* **Route:** `/app/staff/tasks`
* **Role:** Maintenance Staff
* **Purpose:** Comprehensive list of all tickets assigned to the technician, sortable by proximity (block/floor) or urgency.
* **Main sections:** Status tabs (New, In Progress, On Hold, Completed), Filter by hostel block.
* **Main actions:** Change job status, view job instructions, report customer unavailable.
* **Data shown:** Job ID, Location (e.g. Block C - Room 304), Description, Reported time, Urgency badge.
* **Future functionality:** Smart turn-by-turn routing across campus buildings.
* **Implementation phase:** Phase 4 (Campus Operations).

---

### Staff Task Details & Resolution
* **Page:** Ticket Resolution Flow
* **Route:** `/app/staff/tasks/:id`
* **Role:** Maintenance Staff
* **Purpose:** Focused view to execute a specific repair: contact student, log parts used, snap before/after photos, and collect sign-off.
* **Main sections:** Issue photos & student description, Location directions, Parts replacement checklist, Student verification code input.
* **Main actions:** Call student, Upload resolution photo, Enter completion OTP provided by student, Close ticket.
* **Data shown:** Ticket lifecycle timeline, Student phone, Spare parts inventory list.
* **Future functionality:** Voice-to-text repair notes for technicians who prefer speaking in regional languages.
* **Implementation phase:** Phase 3 (Core End-to-End Workflows).

---

## 6. Shared & Special Purpose Pages

### Campus Kiosk Mode
* **Page:** Self-Service Campus Terminal
* **Route:** `/kiosk`
* **Role:** All Students / Walk-in Visitors (Physical Terminal / No-Smartphone Fallback)
* **Purpose:** Touchscreen kiosk interface installed in hostel lobbies, library, and central canteen for students without active smartphones or with dead batteries.
* **Main sections:** Large touch buttons: Quick Gate Pass Print, Check Attendance, File Urgent Hostel Repair, View Today's Mess Menu, Emergency Security Call.
* **Main actions:** Scan physical RFID/Barcoded ID Card, Enter 4-digit PIN, Print slip.
* **Data shown:** Large high-contrast text, minimal steps, high accessibility.
* **Future functionality:** Thermal receipt printer integration, physical hardware peripheral communication.
* **Implementation phase:** Phase 8 (Low-Bandwidth & Accessibility).

---

### Campus Assistant
* **Page:** Conversational Operations Assistant
* **Route:** `/assistant`
* **Role:** All users
* **Purpose:** Natural language chatbot that routes inquiries, answers policy questions ("When is the last date for fee payment?"), and initiates requests automatically.
* **Main sections:** Conversational message stream, Quick prompt chips, Action confirmation widgets.
* **Main actions:** Type or speak query, confirm auto-generated complaint or gate pass, rate response.
* **Data shown:** AI answers with citations from the student handbook, actionable direct links.
* **Future functionality:** FastAPI + LLM backend with RAG over university rules and live database actions.
* **Implementation phase:** Phase 7 (Intelligence / AI).

---

### Design System Showcase
* **Page:** CampusOS Design System & Component Library
* **Route:** `/design-system`
* **Role:** Developers, Designers, Evaluators
* **Purpose:** Living design system documentation demonstrating color tokens, typography scales, interactive buttons, inputs, cards, data displays, feedback alerts, and animation patterns.
* **Main sections:** Colors & Tokens, Typography Scale, Buttons & States, Inputs & Forms, Badges & Indicators, Cards & Metrics, Navigation & Breadcrumbs, Feedback Modals & Toasts, Animation Playground, UI Empty & Error States.
* **Main actions:** Toggle button states, preview modals, trigger simulated toasts, test responsive breakpoints.
* **Data shown:** Exact CSS variable references, color hex codes, component variants.
* **Future functionality:** Dynamic token theme switcher and component copy-paste snippets.
* **Implementation phase:** Phase 0 (Foundation).
