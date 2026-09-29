# CampusOS — Core Campus Workflows

This document outlines the end-to-end operational workflows designed for CampusOS. While Phase 0 establishes the user interface shell and component foundations, these workflows govern the transactional and automated logic planned for subsequent phases.

---

## 1. Certificate & Document Request Workflow

### The Problem in Legacy Systems
Students traditionally queue outside academic administrative offices, submit handwritten requisition slips, wait days without status visibility, and repeatedly visit the counter to check if the registrar has signed their bona fide or fee structure certificate.

### The CampusOS Operating Model

```text
Student
  │
  ▼
[1. Selects Certificate Type (Bona Fide, Fee Structure, Conduct)]
  │
  ▼
[2. Validates Eligibility (Automated clearance check for dues)]
  │
  ▼
[3. Request Dispatched to Academic Section Queue]
  │
  ▼
[4. Authorized Officer Reviews & One-Click Signs with Digital Certificate]
  │
  ▼
[5. Cryptographically Verified PDF Generated with Unique QR Code]
  │
  ▼
[6. Real-time Notification Dispatched to Student]
  │
  ▼
[7. Downloadable in Student Portal / Synced to DigiLocker]
```

### Detailed Sequence
1. **Submission:** Student initiates application via `/app/student/certificates` specifying purpose (scholarship, passport, education loan) and uploads any prerequisite documents.
2. **Automated Verification:** CampusOS checks fee clearance status automatically. If dues are pending, student is prompted to clear dues or apply for conditional exemption.
3. **Queue Assignment:** Request enters the Academic Section dashboard under `/app/admin/requests`.
4. **Adjudication:** Officer reviews student dossier in-line. One-click approval signs the document digitally with timestamp and admin ID.
5. **Dispatch:** A tamper-evident PDF is minted with a verification URL embedded in a secure QR code.
6. **Delivery & Audit:** Student receives in-app alert + email with download link. Audit record is appended to immutable log.

---

## 2. Hostel Maintenance & Infrastructure Workflow

### The Problem in Legacy Systems
Students write complaints in a physical register at the hostel security desk. Wardens rarely see the register until days later. Technicians have no scheduled dispatch queue. Repairs are forgotten, repeat complaints are common, and there is zero accountability for delayed plumbing or electrical hazards.

### The CampusOS Operating Model

```text
Student
  │
  ▼
[1. Files Issue: Block, Room, Category (Plumbing/Electrical), Photo]
  │
  ▼
[2. CampusOS Automatic Classification & SLA Assignment]
  │
  ▼
[3. Instant Routing to Maintenance Department & Designated Technician]
  │
  ▼
[4. Technician Workbench Notification & Job Acceptance]
  │
  ▼
[5. Technician Performs Repair on Site]
  │
  ▼
[6. Student Verifies Completion via 4-Digit Resolution OTP]
  │
  ▼
[7. Warden Receives Daily Resolution Digest + Audit Log Updated]
```

### Detailed Sequence
1. **Reporting:** Student navigates to `/app/student/complaints` and reports issue with photo and severity indicator.
2. **Smart Routing:** Engine detects room location (e.g. Block B, Room 204), classifies department (Plumbing), and assigns ticket to on-duty technician for Block B.
3. **Technician Action:** Technician opens `/app/staff/tasks`, views directions and issue photo, and marks "In Progress".
4. **Resolution Verification:** Technician completes the fix. To prevent false closures, student provides a dynamic 4-digit OTP shown in their app to the technician to authorize ticket closure.
5. **Audit & Escalation:** If unresolved within 24 hours (SLA breach), ticket auto-escalates to the Chief Estate Warden.

---

## 3. Digital Gate Pass & Night-Out Workflow

### The Problem in Legacy Systems
Students fill multi-carbon paper slips, hunt down the hostel warden in the evening for signatures, queue at the main university gate, and security guards store dusty paper slips that prevent real-time knowledge of who is currently outside campus.

### The CampusOS Operating Model

```text
Student
  │
  ▼
[1. Submits Outing Request (Type: Day Outing, Night Out, Home Leave)]
  │
  ▼
[2. Specifies Reason, Destination, Departure Time & Expected Return]
  │
  ▼
[3. Automated Parent Verification Triggered (SMS / WhatsApp OTP)]
  │
  ▼
[4. Warden Reviews Application in Unified Queue]
  │
  ▼
[5. Approved Pass Displays Dynamic, Time-Expiring QR Code]
  │
  ▼
[6. Security Guard Scans QR at Campus Main Gate]
  │
  ▼
[7. Live Headcount Dashboard Updates in Real Time]
```

### Detailed Sequence
1. **Application:** Student submits request at `/app/student/gate-pass` with departure date, return date, and emergency contact.
2. **Parent Authorization:** For night-outs or outstation leaves, system automatically triggers consent verification to registered guardian.
3. **Warden Review:** Warden reviews pending passes on `/app/warden/gate-passes` with 1-tap Approve/Reject.
4. **Pass Generation:** On approval, student app displays a color-coded cryptographic QR code with a countdown timer.
5. **Gate Check-Out:** Security terminal at main gate scans QR. Guard screen displays student photo and confirms exit.
6. **Return Check-In:** Upon return, guard scans QR again. If student is overdue, warden receives instant notification.

---

## 4. Targeted Notice & Communication Dispatch Workflow

### The Problem in Legacy Systems
Notices are pinned to physical boards or blasted indiscriminately into chaotic WhatsApp groups where critical academic updates get buried under banter and spam.

### The CampusOS Operating Model

```text
Administrator / Dean / Warden
  │
  ▼
[1. Compose Circular in Markdown / Rich Text]
  │
  ▼
[2. Define Precise Cohort: Branch (CSE), Batch (2024), Hostel (Block A)]
  │
  ▼
[3. Select Delivery Priority: Low, Normal, Urgent (Bypasses DND)]
  │
  ▼
[4. Dispatched via Web Push + In-App Notice Center + Email]
  │
  ▼
[5. Read & Acknowledgment Telemetry Tracked Per Student]
  │
  ▼
[6. Analytics Dashboard Displays Reach & Unread Cohort Breakdown]
```

### Detailed Sequence
1. **Creation:** Department officer opens `/app/admin/notices` and writes notice with attachments.
2. **Filtering Engine:** System provides multi-select filters: `Department == "Mechanical" AND Semester == 6 AND Accommodation == "Hostel"`.
3. **Multi-Channel Dispatch:** Circular is dispatched to target inboxes immediately.
4. **Mandatory Acknowledgment:** For critical circulars (e.g. exam fee deadline), student must click "Acknowledge" before dismiss.
5. **Analytics:** Admin dashboard shows real-time reach: "842 delivered (94%), 780 read (87%), 62 unread".

---

## 5. Mess Operations & Dining Feedback Workflow

### The Problem in Legacy Systems
Mess committees collect paper feedback once a semester. By then, food quality issues have lingered for months. Students protest, while administration has no objective daily data to penalize defaulting food contractors.

### The CampusOS Operating Model

```text
Hostel Mess Vendor
  │
  ▼
[1. Weekly Menu Published & Approved by Warden Committee]
  │
  ▼
[2. Daily Meals Displayed in Student App with Nutritional & Allergy Tags]
  │
  ▼
[3. Students Rate Meal (1-5 Stars + Quick Attribute Tags like "Cold Food")]
  │
  ▼
[4. Daily Satisfaction Score Computed Automatically]
  │
  ▼
[5. Caterer Penalty Clauses Enforced When Rating Falls Below 3.5 Stars]
  │
  ▼
[6. Automated Mess Rebate Calculation for Students on Approved Leave]
```

### Detailed Sequence
1. **Menu Publication:** Caterer submits weekly menu for breakfast, lunch, tea, and dinner. Committee approves on `/app/admin/mess`.
2. **Daily Feed:** Student sees today's active meal on `/app/student/mess` with real-time countdown timer.
3. **Micro-Feedback:** At the end of each meal, student can submit a 10-second rating with tags (e.g., "Taste Good", "Cold", "Hygiene Concern").
4. **Contractor SLA:** Admin portal charts vendor satisfaction trends over 30 days. Scores below contract thresholds trigger automated penalty advisories.
5. **Rebate Integration:** If a student was away on an approved gate pass for >3 consecutive days, mess dues are automatically credited to their ledger.
