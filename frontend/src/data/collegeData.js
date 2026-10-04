// Central Data Store for College Management System
// Shared across Admin, HOD, Faculty, and Student portals

export const initialDepartments = [
  { id: 'dept-cse', code: 'CSE', name: 'Computer Science & Engineering', hod: 'Dr. P. K. Pattnaik', hodEmail: 'hod.cse@gift.edu.in', studentsCount: 540, facultyCount: 32, subjectsCount: 48, status: 'Active' },
  { id: 'dept-ece', code: 'ECE', name: 'Electronics & Communication', hod: 'Dr. M. R. Senapati', hodEmail: 'hod.ece@gift.edu.in', studentsCount: 380, facultyCount: 24, subjectsCount: 36, status: 'Active' },
  { id: 'dept-eee', code: 'EEE', name: 'Electrical & Electronics', hod: 'Dr. S. K. Das', hodEmail: 'hod.eee@gift.edu.in', studentsCount: 290, facultyCount: 18, subjectsCount: 32, status: 'Active' },
  { id: 'dept-mech', code: 'MECH', name: 'Mechanical Engineering', hod: 'Dr. B. K. Rout', hodEmail: 'hod.mech@gift.edu.in', studentsCount: 320, facultyCount: 22, subjectsCount: 34, status: 'Active' },
  { id: 'dept-civil', code: 'CIVIL', name: 'Civil Engineering', hod: 'Dr. A. K. Nayak', hodEmail: 'hod.civil@gift.edu.in', studentsCount: 240, facultyCount: 16, subjectsCount: 28, status: 'Active' },
];

export const initialHods = [
  { id: 'hod-001', name: 'Dr. P. K. Pattnaik', email: 'hod.cse@gift.edu.in', phone: '+91 94371 22890', department: 'Computer Science & Engineering', deptCode: 'CSE', experience: '18 Years', qualification: 'Ph.D in AI & Systems', status: 'Active' },
  { id: 'hod-002', name: 'Dr. M. R. Senapati', email: 'hod.ece@gift.edu.in', phone: '+91 94372 88123', department: 'Electronics & Communication', deptCode: 'ECE', experience: '15 Years', qualification: 'Ph.D in VLSI Design', status: 'Active' },
  { id: 'hod-003', name: 'Dr. S. K. Das', email: 'hod.eee@gift.edu.in', phone: '+91 94375 77124', department: 'Electrical & Electronics', deptCode: 'EEE', experience: '16 Years', qualification: 'Ph.D in Power Systems', status: 'Active' },
  { id: 'hod-004', name: 'Dr. B. K. Rout', email: 'hod.mech@gift.edu.in', phone: '+91 94376 99012', department: 'Mechanical Engineering', deptCode: 'MECH', experience: '20 Years', qualification: 'Ph.D in Thermal Engg', status: 'Active' },
  { id: 'hod-005', name: 'Dr. A. K. Nayak', email: 'hod.civil@gift.edu.in', phone: '+91 94378 11200', department: 'Civil Engineering', deptCode: 'CIVIL', experience: '14 Years', qualification: 'Ph.D in Structural Engg', status: 'Active' },
];

export const initialFaculty = [
  { id: 'FAC-042', name: 'Dr. S. Mohanty', email: 'faculty@gift.edu.in', phone: '+91 98610 44211', department: 'Computer Science & Engineering', designation: 'Associate Professor', assignedSubjects: ['Data Structures', 'Operating Systems'], assignedSections: ['Sem 5 - Sec A', 'Sem 5 - Sec B'], status: 'Active' },
  { id: 'FAC-043', name: 'Prof. Rahul Sharma', email: 'rahul.cse@gift.edu.in', phone: '+91 98611 77332', department: 'Computer Science & Engineering', designation: 'Assistant Professor', assignedSubjects: ['Data Structures', 'Database Management Systems'], assignedSections: ['Sem 5 - Sec A'], status: 'Active' },
  { id: 'FAC-044', name: 'Prof. Amit Mishra', email: 'amit.cse@gift.edu.in', phone: '+91 98612 88443', department: 'Computer Science & Engineering', designation: 'Assistant Professor', assignedSubjects: ['Operating Systems'], assignedSections: ['Sem 5 - Sec A', 'Sem 5 - Sec C'], status: 'Active' },
  { id: 'FAC-045', name: 'Dr. Priya Ranjan', email: 'priya.cse@gift.edu.in', phone: '+91 98613 99554', department: 'Computer Science & Engineering', designation: 'Associate Professor', assignedSubjects: ['Database Management Systems'], assignedSections: ['Sem 5 - Sec A', 'Sem 5 - Sec B'], status: 'Active' },
  { id: 'FAC-046', name: 'Dr. Sneha Ray', email: 'sneha.cse@gift.edu.in', phone: '+91 98614 11665', department: 'Computer Science & Engineering', designation: 'Professor', assignedSubjects: ['Artificial Intelligence'], assignedSections: ['Sem 5 - Sec A'], status: 'Active' },
  { id: 'FAC-047', name: 'Prof. Debashis Jena', email: 'debashis.cse@gift.edu.in', phone: '+91 98615 22776', department: 'Computer Science & Engineering', designation: 'Assistant Professor', assignedSubjects: ['Machine Learning'], assignedSections: ['Sem 5 - Sec A', 'Sem 5 - Sec B'], status: 'Active' },
  { id: 'FAC-048', name: 'Prof. Smita Sahoo', email: 'smita.cse@gift.edu.in', phone: '+91 98616 33887', department: 'Computer Science & Engineering', designation: 'Assistant Professor', assignedSubjects: ['Software Engineering'], assignedSections: ['Sem 5 - Sec A'], status: 'Active' },
];

export const initialSemesters = [
  { id: 'sem-1', number: 1, label: 'Semester 1', year: '1st Year', academicYear: '2026-27', status: 'Closed', subjectsCount: 6, studentsCount: 520 },
  { id: 'sem-2', number: 2, label: 'Semester 2', year: '1st Year', academicYear: '2026-27', status: 'Closed', subjectsCount: 6, studentsCount: 520 },
  { id: 'sem-3', number: 3, label: 'Semester 3', year: '2nd Year', academicYear: '2026-27', status: 'Closed', subjectsCount: 6, studentsCount: 510 },
  { id: 'sem-4', number: 4, label: 'Semester 4', year: '2nd Year', academicYear: '2026-27', status: 'Closed', subjectsCount: 6, studentsCount: 510 },
  { id: 'sem-5', number: 5, label: 'Semester 5', year: '3rd Year', academicYear: '2026-27', status: 'Active', subjectsCount: 6, studentsCount: 540 },
  { id: 'sem-6', number: 6, label: 'Semester 6', year: '3rd Year', academicYear: '2026-27', status: 'Upcoming', subjectsCount: 6, studentsCount: 540 },
  { id: 'sem-7', number: 7, label: 'Semester 7', year: '4th Year', academicYear: '2026-27', status: 'Active', subjectsCount: 5, studentsCount: 480 },
  { id: 'sem-8', number: 8, label: 'Semester 8', year: '4th Year', academicYear: '2026-27', status: 'Upcoming', subjectsCount: 4, studentsCount: 480 },
];

export const initialSections = [
  { id: 'sec-5a', semester: 'Semester 5', section: 'A', department: 'CSE', studentsCount: 91, classRepresentative: 'Rakesh Das', room: 'Block B - 302', facultyCoordinator: 'Dr. S. Mohanty' },
  { id: 'sec-5b', semester: 'Semester 5', section: 'B', department: 'CSE', studentsCount: 86, classRepresentative: 'Rohan Meher', room: 'Block B - 304', facultyCoordinator: 'Prof. Rahul Sharma' },
  { id: 'sec-5c', semester: 'Semester 5', section: 'C', department: 'CSE', studentsCount: 72, classRepresentative: 'Pooja Samal', room: 'Block B - 306', facultyCoordinator: 'Prof. Amit Mishra' },
  { id: 'sec-7a', semester: 'Semester 7', section: 'A', department: 'CSE', studentsCount: 82, classRepresentative: 'Vivek Mohapatra', room: 'Block A - 401', facultyCoordinator: 'Dr. Sneha Ray' },
];

export const initialSubjects = [
  { id: 'sub-dsa', code: 'CS501', name: 'Data Structures', department: 'CSE', semester: 'Semester 5', credits: 4, type: 'Theory + Lab', assignedFaculty: 'Dr. S. Mohanty', status: 'Active' },
  { id: 'sub-os', code: 'CS502', name: 'Operating Systems', department: 'CSE', semester: 'Semester 5', credits: 4, type: 'Theory + Lab', assignedFaculty: 'Prof. Amit Mishra', status: 'Active' },
  { id: 'sub-dbms', code: 'CS503', name: 'Database Management Systems', department: 'CSE', semester: 'Semester 5', credits: 4, type: 'Theory + Lab', assignedFaculty: 'Dr. Priya Ranjan', status: 'Active' },
  { id: 'sub-ai', code: 'CS504', name: 'Artificial Intelligence', department: 'CSE', semester: 'Semester 5', credits: 3, type: 'Theory', assignedFaculty: 'Dr. Sneha Ray', status: 'Active' },
  { id: 'sub-ml', code: 'CS505', name: 'Machine Learning', department: 'CSE', semester: 'Semester 5', credits: 4, type: 'Theory + Lab', assignedFaculty: 'Prof. Debashis Jena', status: 'Active' },
  { id: 'sub-se', code: 'CS506', name: 'Software Engineering', department: 'CSE', semester: 'Semester 5', credits: 3, type: 'Theory', assignedFaculty: 'Prof. Smita Sahoo', status: 'Active' },
];

// Configurable Marking Scheme
export const initialMarkingScheme = [
  { id: 'scheme-mod', assessmentType: 'Modular Exams', count: 2, maxMarks: 20, weightage: 30, formula: 'Average of 2 modulars (30%)', status: 'Active' },
  { id: 'scheme-quiz', assessmentType: 'Quizzes', count: 6, maxMarks: 10, weightage: 20, formula: 'Best 5 of 6 quizzes (20%)', status: 'Active' },
  { id: 'scheme-asgn', assessmentType: 'Assignments', count: 2, maxMarks: 10, weightage: 10, formula: 'Average of 2 assignments (10%)', status: 'Active' },
  { id: 'scheme-st', assessmentType: 'Surprise Tests', count: 2, maxMarks: 10, weightage: 10, formula: 'Average of 2 surprise tests (10%)', status: 'Active' },
  { id: 'scheme-lab', assessmentType: 'Lab Work / Practical', count: 1, maxMarks: 10, weightage: 30, formula: 'Continuous lab experiments + viva (30%)', status: 'Active' },
];

// Initial Audit History
export const initialAuditLogs = [
  { id: 'audit-01', user: 'Dr. S. Mohanty (Faculty)', role: 'FACULTY', targetStudent: 'Rakesh Das (Roll 01)', subject: 'Data Structures', assessment: 'Quiz 3', oldMark: 7, newMark: 9, changedAt: '03 Oct 2026, 10:30 PM', reason: 'Correction after student rechecking paper' },
  { id: 'audit-02', user: 'Dr. P. K. Pattnaik (HOD)', role: 'HOD', targetStudent: 'Whole Section A', subject: 'Operating Systems', assessment: 'Internal Review', oldMark: 'Pending', newMark: 'Approved', changedAt: '03 Oct 2026, 09:15 PM', reason: 'HOD approved finalized internal marks for Sem 5 Sec A' },
  { id: 'audit-03', user: 'Campus Administrator', role: 'ADMIN', targetStudent: 'System-wide', subject: 'Marking Scheme', assessment: 'Modular Weightage', oldMark: '25%', newMark: '30%', changedAt: '02 Oct 2026, 04:00 PM', reason: 'Autonomous Academic Council 2026 Revision' },
  { id: 'audit-04', user: 'Prof. Rahul Sharma', role: 'FACULTY', targetStudent: 'Amit Nayak (Roll 02)', subject: 'Data Structures', assessment: 'Modular 2', oldMark: 14, newMark: 18, changedAt: '01 Oct 2026, 02:45 PM', reason: 'Evaluation recount verified' },
];

// Initial HOD Approval Status Queue
export const initialApprovalQueue = [
  { id: 'appr-01', subjectCode: 'CS501', subject: 'Data Structures', faculty: 'Dr. S. Mohanty', semester: 'Semester 5', section: 'Section A', submittedDate: '02 Oct 2026', status: 'Approved', hodRemarks: 'All 91 students evaluated with proper quiz/modular breakdown.', reviewedAt: '03 Oct 2026, 11:30 AM' },
  { id: 'appr-02', subjectCode: 'CS502', subject: 'Operating Systems', faculty: 'Prof. Amit Mishra', semester: 'Semester 5', section: 'Section A', submittedDate: '03 Oct 2026', status: 'Pending', hodRemarks: 'Under review by HOD. Quizzes 1-6 uploaded.', reviewedAt: null },
  { id: 'appr-03', subjectCode: 'CS503', subject: 'Database Management Systems', faculty: 'Dr. Priya Ranjan', semester: 'Semester 5', section: 'Section A', submittedDate: '01 Oct 2026', status: 'Rejected', hodRemarks: 'Quiz 4 marks are missing for 8 students. Please complete and resubmit.', reviewedAt: '02 Oct 2026, 04:10 PM' },
  { id: 'appr-04', subjectCode: 'CS504', subject: 'Artificial Intelligence', faculty: 'Dr. Sneha Ray', semester: 'Semester 5', section: 'Section A', submittedDate: '03 Oct 2026', status: 'Approved', hodRemarks: 'Verified and approved for publication.', reviewedAt: '03 Oct 2026, 03:00 PM' },
  { id: 'appr-05', subjectCode: 'CS505', subject: 'Machine Learning', faculty: 'Prof. Debashis Jena', semester: 'Semester 5', section: 'Section A', submittedDate: '29 Sep 2026', status: 'Approved', hodRemarks: 'All components match autonomous syllabus guidelines.', reviewedAt: '30 Sep 2026, 05:20 PM' },
  { id: 'appr-06', subjectCode: 'CS506', subject: 'Software Engineering', faculty: 'Prof. Smita Sahoo', semester: 'Semester 5', section: 'Section A', submittedDate: '02 Oct 2026', status: 'Pending', hodRemarks: 'Awaiting submission of Lab marks verification.', reviewedAt: null },
];

// Initial 91 Students generator for admin rosters
const studentFirstNames = ['Rakesh', 'Amit', 'Raj', 'Priya', 'Sourav', 'Sneha', 'Deepak', 'Puja', 'Bikash', 'Swati', 'Rohit', 'Monika', 'Subham', 'Ipsita', 'Alok', 'Smruti', 'Chandan', 'Tanmay', 'Lipika', 'Manas', 'Pragyan', 'Biswajit', 'Archana', 'Gourab', 'Satyajit', 'Sonali', 'Ashish', 'Kiran', 'Pranab', 'Niharika'];
const studentLastNames = ['Das', 'Nayak', 'Sahoo', 'Patra', 'Mohanty', 'Barik', 'Rout', 'Behera', 'Pradhan', 'Samal', 'Panda', 'Mishra', 'Tripathy', 'Parida', 'Jena', 'Swain', 'Mangaraj', 'Muduli', 'Kar', 'Acharya'];

export function generateAllStudents() {
  const students = [];
  for (let i = 1; i <= 91; i++) {
    const rollStr = String(i).padStart(2, '0');
    const fName = studentFirstNames[(i - 1) % studentFirstNames.length];
    const lName = studentLastNames[(i - 1 + Math.floor(i / studentFirstNames.length)) % studentLastNames.length];
    const name = i === 1 ? 'Rakesh Das' : `${fName} ${lName}`;
    students.push({
      id: `std-${i}`,
      studentId: `GIFT-2023-${1000 + i}`,
      rollNumber: rollStr,
      name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}${i}@gift.edu.in`,
      phone: `+91 ${9861000000 + (i * 111) % 900000}`,
      department: 'Computer Science & Engineering',
      deptCode: 'CSE',
      semester: 'Semester 5',
      section: 'Section A',
      academicYear: '2026-27',
      status: i % 25 === 0 ? 'Inactive' : 'Active',
      cgpa: (7.2 + ((i * 3.7) % 2.6)).toFixed(2),
      attendance: Math.min(100, Math.floor(75 + ((i * 7) % 25))),
    });
  }
  return students;
}

// -------------------------------------------------------------
// ACCOUNTS / FEES DATASET
// -------------------------------------------------------------
export const initialFeeStructures = [
  { id: 'fee-str-1', term: 'Semester 5 (Academic Year 2026-27)', program: 'B.Tech - Computer Science', tuitionFee: 48500, developmentFee: 8500, labLibraryFee: 6000, examinationFee: 3500, hostelMessFee: 32000, total: 98500 },
  { id: 'fee-str-2', term: 'Semester 6 (Upcoming)', program: 'B.Tech - Computer Science', tuitionFee: 48500, developmentFee: 8500, labLibraryFee: 6000, examinationFee: 3500, hostelMessFee: 32000, total: 98500 },
];

export const initialFeeTransactions = [
  { id: 'TXN-98421', studentName: 'Rakesh Das', rollNumber: '01', semester: 'Semester 5', head: 'Tuition & Development Fee', amount: 48500, mode: 'Net Banking (HDFC)', date: '12 Aug 2026', status: 'Verified', receiptNo: 'RCPT-2026-0814' },
  { id: 'TXN-98422', studentName: 'Rakesh Das', rollNumber: '01', semester: 'Semester 5', head: 'Examination & University Reg.', amount: 3500, mode: 'UPI', date: '15 Aug 2026', status: 'Verified', receiptNo: 'RCPT-2026-0852' },
  { id: 'TXN-98423', studentName: 'Rakesh Das', rollNumber: '01', semester: 'Semester 5', head: 'Hostel & Mess Charges', amount: 20000, mode: 'Credit Card', date: '20 Aug 2026', status: 'Verified', receiptNo: 'RCPT-2026-0899', dueAmount: 12000 },
  { id: 'TXN-98425', studentName: 'Amit Nayak', rollNumber: '02', semester: 'Semester 5', head: 'Full Semester Fee', amount: 98500, mode: 'Challan', date: '10 Aug 2026', status: 'Verified', receiptNo: 'RCPT-2026-0801' },
  { id: 'TXN-98426', studentName: 'Raj Sahoo', rollNumber: '03', semester: 'Semester 5', head: 'Tuition Installment 1', amount: 35000, mode: 'UPI', date: '14 Aug 2026', status: 'Verified', receiptNo: 'RCPT-2026-0840', dueAmount: 22000 },
  { id: 'TXN-98427', studentName: 'Priya Patra', rollNumber: '04', semester: 'Semester 5', head: 'Full Semester Fee', amount: 98500, mode: 'Net Banking', date: '11 Aug 2026', status: 'Verified', receiptNo: 'RCPT-2026-0819' },
  { id: 'TXN-98428', studentName: 'Sourav Mohanty', rollNumber: '05', semester: 'Semester 5', head: 'Partial Fee', amount: 40000, mode: 'UPI', date: '18 Aug 2026', status: 'Pending Verification', receiptNo: 'RCPT-2026-0881', dueAmount: 18500 },
];

export const initialScholarships = [
  { id: 'sch-01', name: 'PRERANA Post-Matric State Scholarship', authority: 'Govt of Odisha (ST & SC Dev Dept)', benefit: '₹45,000 / year', beneficiaries: 142, status: 'Active' },
  { id: 'sch-02', name: 'National Scholarship Portal (NSP)', authority: 'Ministry of Electronics & IT, GoI', benefit: '₹30,000 / year', beneficiaries: 88, status: 'Active' },
  { id: 'sch-03', name: 'GIFT Autonomous Academic Merit Waiver', authority: 'GIFT Trust Board', benefit: '₹25,000 / year', beneficiaries: 35, status: 'Active' },
];

// -------------------------------------------------------------
// HOSTEL MANAGEMENT DATASET
// -------------------------------------------------------------
export const initialHostels = [
  { id: 'hostel-b1', name: 'Gandhi Boys Residence (Hostel 1)', type: 'Boys', totalFloors: 3, totalRooms: 60, totalBeds: 180, occupiedBeds: 168, availableBeds: 12, warden: 'Mr. Rajesh Jena', contact: '+91 94370 11223' },
  { id: 'hostel-b2', name: 'Kalam Boys Residence (Hostel 2)', type: 'Boys', totalFloors: 3, totalRooms: 60, totalBeds: 180, occupiedBeds: 172, availableBeds: 8, warden: 'Mr. Manoj Sahoo', contact: '+91 94370 22334' },
  { id: 'hostel-g1', name: 'Sarojini Girls Residence (Hostel 1)', type: 'Girls', totalFloors: 3, totalRooms: 50, totalBeds: 150, occupiedBeds: 142, availableBeds: 8, warden: 'Mrs. Nibedita Das', contact: '+91 94370 33445' },
];

export const initialHostelRooms = [
  { id: 'rm-101', hostelId: 'hostel-g1', hostelName: 'Sarojini Girls Residence', floor: 'Floor 1', roomNumber: '101', capacity: 3, occupied: 3, type: 'Non-AC Triple' },
  { id: 'rm-102', hostelId: 'hostel-g1', hostelName: 'Sarojini Girls Residence', floor: 'Floor 1', roomNumber: '102', capacity: 3, occupied: 2, type: 'Non-AC Triple' },
  { id: 'rm-204', hostelId: 'hostel-g1', hostelName: 'Sarojini Girls Residence', floor: 'Floor 2', roomNumber: '204', capacity: 3, occupied: 3, type: 'AC Triple Deluxe' },
  { id: 'rm-b101', hostelId: 'hostel-b1', hostelName: 'Gandhi Boys Residence', floor: 'Floor 1', roomNumber: '101', capacity: 3, occupied: 3, type: 'Non-AC Triple' },
  { id: 'rm-b102', hostelId: 'hostel-b1', hostelName: 'Gandhi Boys Residence', floor: 'Floor 1', roomNumber: '102', capacity: 3, occupied: 2, type: 'Non-AC Triple' },
  { id: 'rm-b201', hostelId: 'hostel-b1', hostelName: 'Gandhi Boys Residence', floor: 'Floor 2', roomNumber: '201', capacity: 3, occupied: 3, type: 'AC Triple Deluxe' },
];

export const initialStudentHostelDetail = {
  hostelName: 'Sarojini Girls Residence (Block A)',
  roomNumber: '204',
  bedNumber: 'Bed 01 (Window Side)',
  floor: 'Floor 2',
  wardenName: 'Mrs. Nibedita Das',
  wardenContact: '+91 94370 33445',
  roommates: [
    { name: 'Priya Patra', roll: '04', branch: 'CSE - Sem 5', bed: 'Bed 02' },
    { name: 'Sneha Mohanty', roll: '06', branch: 'CSE - Sem 5', bed: 'Bed 03' },
  ],
  rules: [
    'Night curfews strictly implemented at 8:30 PM.',
    'Biometric attendance check-in compulsory before 8:45 PM.',
    'Mess timings: Breakfast 7:30 - 9:00 AM, Dinner 7:30 - 9:30 PM.',
    'Electric heating appliances and immersion rods strictly prohibited.'
  ]
};

export const initialHostelComplaints = [
  { id: 'CMP-201', studentName: 'Rakesh Das', rollNumber: '01', hostel: 'Sarojini Boys Residence', roomNumber: '204', category: 'Electrical', title: 'Ceiling fan speed regulator broken', description: 'The speed regulator of the ceiling fan in Room 204 started making a buzzing sound from 28 Sep onwards. When switched to speed 3 or above, it sparks briefly and then the fan stops. It is affecting sleep due to heat. The issue has been present for 4 days now.', priority: 'Medium', status: 'In Progress', filedDate: '02 Oct 2026', resolutionNotes: 'Electrician assigned for inspection today.', imageUrl: null },
  { id: 'CMP-202', studentName: 'Amit Nayak', rollNumber: '02', hostel: 'Gandhi Boys Residence', roomNumber: '102', category: 'Plumbing', title: 'Bathroom tap leaking continuously', priority: 'High', status: 'Pending', filedDate: '03 Oct 2026', resolutionNotes: 'Plumber queued for block inspection.' },
  { id: 'CMP-203', studentName: 'Priya Patra', rollNumber: '04', hostel: 'Sarojini Girls Residence', roomNumber: '204', category: 'Internet / Wi-Fi', title: 'Wi-Fi repeater access drop in evening', priority: 'Low', status: 'Resolved', filedDate: '29 Sep 2026', resolutionNotes: 'IT team reconfigured floor 2 access point.' },
  { id: 'CMP-204', studentName: 'Sourav Mohanty', rollNumber: '05', hostel: 'Gandhi Boys Residence', roomNumber: '201', category: 'Carpentry', title: 'Study table drawer lock stuck', priority: 'Low', status: 'Resolved', filedDate: '28 Sep 2026', resolutionNotes: 'Replaced cylinder lock.' },
];

export const initialHostelVisitors = [
  { id: 'VIS-401', visitorName: 'Mr. Suresh Nayak', relation: 'Father', studentName: 'Rakesh Das', rollNumber: '01', inTime: '04:15 PM', outTime: '05:30 PM', passNumber: 'PASS-781', purpose: 'Delivering semester study materials & clothes' },
  { id: 'VIS-402', visitorName: 'Mr. Subrat Nayak', relation: 'Brother', studentName: 'Amit Nayak', rollNumber: '02', inTime: '02:00 PM', outTime: '03:15 PM', passNumber: 'PASS-782', purpose: 'Family visit' },
];

// -------------------------------------------------------------
// CANTEEN MANAGEMENT DATASET
// -------------------------------------------------------------
export const initialFoodItems = [
  { id: 'food-01', name: 'Veg Hyderabadi Biryani', category: 'Main Course', price: 60, isAvailable: true, prepTime: '10 mins', calories: '420 kcal' },
  { id: 'food-02', name: 'Chicken Dum Biryani', category: 'Main Course', price: 110, isAvailable: true, prepTime: '12 mins', calories: '580 kcal' },
  { id: 'food-03', name: 'Paneer Butter Masala Combo (3 Rotis)', category: 'Main Course', price: 80, isAvailable: true, prepTime: '15 mins', calories: '480 kcal' },
  { id: 'food-04', name: 'South Indian Masala Dosa', category: 'Breakfast/Snacks', price: 45, isAvailable: true, prepTime: '8 mins', calories: '290 kcal' },
  { id: 'food-05', name: 'Idli Sambhar (3 Pcs) with Chutney', category: 'Breakfast/Snacks', price: 30, isAvailable: true, prepTime: '5 mins', calories: '180 kcal' },
  { id: 'food-06', name: 'Executive Thali (Rice, 2 Roti, Dal, Sabzi, Papad, Curd)', category: 'Main Course', price: 65, isAvailable: true, prepTime: '5 mins', calories: '550 kcal' },
  { id: 'food-07', name: 'Fresh Cold Coffee with Ice Cream', category: 'Beverages', price: 35, isAvailable: true, prepTime: '4 mins', calories: '190 kcal' },
  { id: 'food-08', name: 'GIFT Special Samosa Chat (2 Pcs)', category: 'Breakfast/Snacks', price: 35, isAvailable: true, prepTime: '5 mins', calories: '310 kcal' },
];

export const initialCanteenOrders = [
  { id: 'ORD-7891', studentName: 'Rakesh Das', rollNumber: '01', items: [{ name: 'Veg Hyderabadi Biryani', qty: 1, price: 60 }, { name: 'Cold Coffee', qty: 1, price: 35 }], totalAmount: 95, status: 'Preparing', paymentMode: 'RFID Smart Card', orderedAt: '12:45 PM', token: 'TOKEN-42' },
  { id: 'ORD-7892', studentName: 'Amit Nayak', rollNumber: '02', items: [{ name: 'Chicken Dum Biryani', qty: 1, price: 110 }], totalAmount: 110, status: 'Ready', paymentMode: 'UPI', orderedAt: '12:40 PM', token: 'TOKEN-39' },
  { id: 'ORD-7893', studentName: 'Raj Sahoo', rollNumber: '03', items: [{ name: 'Masala Dosa', qty: 2, price: 90 }], totalAmount: 90, status: 'Completed', paymentMode: 'RFID Smart Card', orderedAt: '12:20 PM', token: 'TOKEN-28' },
  { id: 'ORD-7894', studentName: 'Priya Patra', rollNumber: '04', items: [{ name: 'Executive Thali', qty: 1, price: 65 }], totalAmount: 65, status: 'Pending', paymentMode: 'Cash at Counter', orderedAt: '12:55 PM', token: 'TOKEN-48' },
];

// -------------------------------------------------------------
// NOTIFICATIONS SYSTEM DATASET
// -------------------------------------------------------------
export const initialNotifications = [
  { id: 'notif-01', role: 'student', title: 'Marks Published: Data Structures', message: 'HOD Dr. P. K. Pattnaik has approved Continuous Internal Assessment marks for CS501.', time: '10 mins ago', unread: true },
  { id: 'notif-02', role: 'student', title: 'Hostel Complaint Update', message: 'CMP-201 (Ceiling fan) status changed to "In Progress". Electrician assigned.', time: '1 hour ago', unread: true },
  { id: 'notif-03', role: 'student', title: 'Canteen Order Status', message: 'Order ORD-7891 is currently being prepared. Token #42.', time: '20 mins ago', unread: false },
  { id: 'notif-04', role: 'faculty', title: 'Marks Approved by HOD', message: 'Data Structures (CS501) continuous assessment officially published for Section A.', time: '1 hour ago', unread: true },
  { id: 'notif-05', role: 'hod', title: 'New Assessment Submission', message: 'Faculty Prof. Amit Mishra has submitted Operating Systems (CS502) internal marks for moderation.', time: '2 hours ago', unread: true },
  { id: 'notif-06', role: 'accounts', title: 'Fee Payment Received', message: 'Student Amit Nayak paid full Semester 5 fee ₹98,500 via Challan.', time: '3 hours ago', unread: true },
  { id: 'notif-07', role: 'warden', title: 'New Hostel Maintenance Complaint', message: 'CMP-202 (Plumbing) logged by Room 102 (Gandhi Boys Residence).', time: '15 mins ago', unread: true },
  { id: 'notif-08', role: 'canteen', title: 'New Online Order Placed', message: 'Order ORD-7894 from Priya Patra (Executive Thali) waiting for acceptance.', time: '5 mins ago', unread: true },
  { id: 'notif-09', role: 'admin', title: 'System-wide Attendance Threshold', message: 'Autonomous examination compliance report generated. 92% students eligible.', time: '4 hours ago', unread: false },
];

// -------------------------------------------------------------
// CAMPUS & ADMINISTRATIVE STAFF ROSTERS
// -------------------------------------------------------------

// Hostel Wardens Roster - explicitly categorizing Boys and Girls Hostel Wardens
export const initialWardens = [
  {
    id: 'WRD-B01',
    name: 'Mr. Rajesh Jena',
    gender: 'Male',
    hostelCategory: 'Boys Hostel',
    assignedHostel: 'Gandhi Boys Residence (Hostel 1)',
    roomOffice: 'Ground Floor, Warden Office A-01',
    phone: '+91 94370 11223',
    email: 'warden.b1@gift.edu.in',
    shift: '24x7 Resident Duty',
    residentsCount: 168,
    totalBeds: 180,
    status: 'Active',
    joiningYear: '2021',
  },
  {
    id: 'WRD-B02',
    name: 'Mr. Manoj Sahoo',
    gender: 'Male',
    hostelCategory: 'Boys Hostel',
    assignedHostel: 'Kalam Boys Residence (Hostel 2)',
    roomOffice: 'Floor 1, Block B Administration',
    phone: '+91 94370 22334',
    email: 'warden.b2@gift.edu.in',
    shift: 'Day Shift (08:00 AM - 08:00 PM)',
    residentsCount: 172,
    totalBeds: 180,
    status: 'Active',
    joiningYear: '2022',
  },
  {
    id: 'WRD-G01',
    name: 'Mrs. Nibedita Das',
    gender: 'Female',
    hostelCategory: 'Girls Hostel',
    assignedHostel: 'Sarojini Girls Residence (Hostel 1)',
    roomOffice: 'Main Wing, Warden Suite G-02',
    phone: '+91 94370 33445',
    email: 'warden.g1@gift.edu.in',
    shift: '24x7 Resident Duty',
    residentsCount: 142,
    totalBeds: 150,
    status: 'Active',
    joiningYear: '2020',
  },
  {
    id: 'WRD-G02',
    name: 'Mrs. Pratima Mohapatra',
    gender: 'Female',
    hostelCategory: 'Girls Hostel',
    assignedHostel: 'Kalpana Chawla Girls Residence (Hostel 2)',
    roomOffice: 'Block A, Office 101',
    phone: '+91 94370 44556',
    email: 'warden.g2@gift.edu.in',
    shift: 'Evening & Night Shift (04:00 PM - 08:00 AM)',
    residentsCount: 130,
    totalBeds: 140,
    status: 'Active',
    joiningYear: '2023',
  },
];

// Security Guards Roster
export const initialSecurityGuards = [
  {
    id: 'SEC-101',
    name: 'Dillip Kumar Pradhan',
    badgeNumber: 'SG-OD-4421',
    postLocation: 'Main Campus Gate 1 (Front Entrance)',
    shift: 'Morning Shift (06:00 AM - 02:00 PM)',
    phone: '+91 94371 55671',
    emergencyContact: '+91 98610 88210',
    assignedAgency: 'Falcon Security Services',
    bloodGroup: 'B+',
    status: 'On Duty',
  },
  {
    id: 'SEC-102',
    name: 'Bhuban Mohan Senapati',
    badgeNumber: 'SG-OD-4422',
    postLocation: 'Girls Hostel Gate & Boundary Checkpoint',
    shift: 'Evening Shift (02:00 PM - 10:00 PM)',
    phone: '+91 94371 66782',
    emergencyContact: '+91 98610 99321',
    assignedAgency: 'Falcon Security Services',
    bloodGroup: 'O+',
    status: 'On Duty',
  },
  {
    id: 'SEC-103',
    name: 'Ramesh Chandra Behera',
    badgeNumber: 'SG-OD-4423',
    postLocation: 'Boys Hostel Complex & Parking Bay',
    shift: 'Night Patrol (10:00 PM - 06:00 AM)',
    phone: '+91 94371 77893',
    emergencyContact: '+91 98611 11234',
    assignedAgency: 'Falcon Security Services',
    bloodGroup: 'A+',
    status: 'On Duty',
  },
  {
    id: 'SEC-104',
    name: 'Sunita Biswal',
    badgeNumber: 'SG-OD-4424',
    postLocation: 'Girls Hostel Reception & Visitor Desk',
    shift: 'Morning Shift (06:00 AM - 02:00 PM)',
    phone: '+91 94371 88904',
    emergencyContact: '+91 98612 22345',
    assignedAgency: 'Falcon Security Services',
    bloodGroup: 'AB+',
    status: 'On Duty',
  },
  {
    id: 'SEC-105',
    name: 'Kailash Chandra Sahu',
    badgeNumber: 'SG-OD-4425',
    postLocation: 'Academic Block B & Central Computing Lab',
    shift: 'Evening Shift (02:00 PM - 10:00 PM)',
    phone: '+91 94371 99015',
    emergencyContact: '+91 98613 33456',
    assignedAgency: 'Falcon Security Services',
    bloodGroup: 'O+',
    status: 'On Duty',
  },
  {
    id: 'SEC-106',
    name: 'Niranjan Nayak',
    badgeNumber: 'SG-OD-4426',
    postLocation: 'Back Gate 2 & Sports Complex',
    shift: 'Night Patrol (10:00 PM - 06:00 AM)',
    phone: '+91 94372 00126',
    emergencyContact: '+91 98614 44567',
    assignedAgency: 'Falcon Security Services',
    bloodGroup: 'B+',
    status: 'On Leave',
  },
];

// Canteen Staff Roster
export const initialCanteenStaff = [
  {
    id: 'CNT-01',
    name: 'Santosh Nayak',
    role: 'Canteen Supervisor / In-Charge',
    outlet: 'Central Food Court & Mess Hall',
    shift: 'Full Day Shift (07:00 AM - 08:30 PM)',
    phone: '+91 98612 33411',
    fssaiLicense: 'FSSAI-OD-2024-9981',
    speciality: 'Mess Operations & Inventory Management',
    status: 'Active',
  },
  {
    id: 'CNT-02',
    name: 'Bikram Keshari Rout',
    role: 'Head Chef / Kitchen Lead',
    outlet: 'Hostel Dining Hall A (Main Kitchen)',
    shift: 'Morning Prep & Lunch (06:00 AM - 03:00 PM)',
    phone: '+91 98613 44522',
    fssaiLicense: 'FSSAI-OD-2024-9982',
    speciality: 'North & South Indian Thali, Biryani',
    status: 'Active',
  },
  {
    id: 'CNT-03',
    name: 'Sita Devi',
    role: 'Senior Cook',
    outlet: 'Girls Hostel Dining Section',
    shift: 'Evening & Dinner (02:00 PM - 10:00 PM)',
    phone: '+91 98614 55633',
    fssaiLicense: 'FSSAI-OD-2024-9983',
    speciality: 'Home-style meals, Roti & Curries',
    status: 'Active',
  },
  {
    id: 'CNT-04',
    name: 'Kuna Barik',
    role: 'Counter Cashier & POS Operator',
    outlet: 'Cafeteria & Snacks Counter',
    shift: 'Morning & Afternoon (08:30 AM - 05:30 PM)',
    phone: '+91 98615 66744',
    fssaiLicense: 'FSSAI-OD-2024-9984',
    speciality: 'Smart Card & RFID Token Billing',
    status: 'Active',
  },
  {
    id: 'CNT-05',
    name: 'Arun Kumar Swain',
    role: 'Assistant Cook & Prep Lead',
    outlet: 'Central Food Court',
    shift: 'Morning Prep (06:00 AM - 02:00 PM)',
    phone: '+91 98616 77855',
    fssaiLicense: 'FSSAI-OD-2024-9985',
    speciality: 'Breakfast, Snacks & Bakery',
    status: 'Active',
  },
];

// Other Campus & Support Members Roster
export const initialOtherStaff = [
  {
    id: 'STF-01',
    name: 'Pramod Panda',
    category: 'Electrician & Power Maintenance',
    zone: 'Entire Campus & Substation',
    shift: 'General Shift (08:30 AM - 05:00 PM)',
    phone: '+91 94378 99120',
    emergencyDuty: 'Yes (On-Call 24x7)',
    qualification: 'ITI Electrical, Govt Certified',
    status: 'Active',
  },
  {
    id: 'STF-02',
    name: 'Suresh Mohapatra',
    category: 'Plumber & Water Works',
    zone: 'Hostels & Academic Blocks',
    shift: 'Morning Shift (07:00 AM - 03:30 PM)',
    phone: '+91 94379 11231',
    emergencyDuty: 'Yes',
    qualification: 'ITI Plumbing & Water Fitting',
    status: 'Active',
  },
  {
    id: 'STF-03',
    name: 'Laxmi Parida',
    category: 'Housekeeping Supervisor',
    zone: 'Sarojini Girls Residence & Block A',
    shift: 'Morning Shift (06:30 AM - 03:00 PM)',
    phone: '+91 94380 22342',
    emergencyDuty: 'No',
    qualification: 'Senior Facility Operations',
    status: 'Active',
  },
  {
    id: 'STF-04',
    name: 'Gopal Charan Das',
    category: 'Housekeeping Supervisor',
    zone: 'Gandhi Boys Residence & Block B',
    shift: 'Morning Shift (06:30 AM - 03:00 PM)',
    phone: '+91 94381 33453',
    emergencyDuty: 'No',
    qualification: 'Senior Facility Operations',
    status: 'Active',
  },
  {
    id: 'STF-05',
    name: 'Tapan Barik',
    category: 'Senior Lab Technician',
    zone: 'Computer Science Labs (Lab 1 - 4)',
    shift: 'General Shift (09:00 AM - 05:30 PM)',
    phone: '+91 94382 44564',
    emergencyDuty: 'No',
    qualification: 'Diploma in Computer Science & Networking',
    status: 'Active',
  },
  {
    id: 'STF-06',
    name: 'Hemant Tripathy',
    category: 'Senior Library Attendant',
    zone: 'Central Knowledge Resource Center',
    shift: 'Evening Shift (01:00 PM - 09:00 PM)',
    phone: '+91 94383 55675',
    emergencyDuty: 'No',
    qualification: 'Bachelor of Library Science (B.Lib)',
    status: 'Active',
  },
  {
    id: 'STF-07',
    name: 'Bijay Kumar Mallick',
    category: 'Transport & Bus Supervisor',
    zone: 'Fleet Parking & Logistics Depot',
    shift: 'Split Shift (06:30 AM - 10:30 AM & 04:00 PM - 08:00 PM)',
    phone: '+91 94384 66786',
    emergencyDuty: 'Yes',
    qualification: 'Heavy Vehicle Commercial License',
    status: 'Active',
  },
];

