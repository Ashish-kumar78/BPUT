import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');
  const salt = await bcrypt.genSalt(10);
  const defaultHash = await bcrypt.hash('gift123', salt);

  // 1. Seed Users (7 Portal Roles)
  const usersToCreate = [
    {
      identifier: '2305201001',
      email: 'student@gift.edu.in',
      name: 'Rakesh Das',
      role: Role.STUDENT,
      department: 'Computer Science & Engineering',
      detail: 'Semester 5 · Section A',
      passwordHash: defaultHash,
    },
    {
      identifier: 'student',
      email: 'student.alias@gift.edu.in',
      name: 'Rakesh Das',
      role: Role.STUDENT,
      department: 'Computer Science & Engineering',
      detail: 'Semester 5 · Section A',
      passwordHash: defaultHash,
    },
    {
      identifier: 'fac-042',
      email: 'faculty@gift.edu.in',
      name: 'Dr. S. Mohanty',
      role: Role.FACULTY,
      department: 'Computer Science & Engineering',
      detail: 'Faculty · School of Computing',
      passwordHash: defaultHash,
    },
    {
      identifier: 'faculty',
      email: 'faculty.alias@gift.edu.in',
      name: 'Dr. S. Mohanty',
      role: Role.FACULTY,
      department: 'Computer Science & Engineering',
      detail: 'Faculty · School of Computing',
      passwordHash: defaultHash,
    },
    {
      identifier: 'hod-cse',
      email: 'hod@gift.edu.in',
      name: 'Dr. P. K. Pattnaik',
      role: Role.HOD,
      department: 'Computer Science & Engineering',
      detail: 'Head of Department · CSE',
      passwordHash: defaultHash,
    },
    {
      identifier: 'hod',
      email: 'hod.alias@gift.edu.in',
      name: 'Dr. P. K. Pattnaik',
      role: Role.HOD,
      department: 'Computer Science & Engineering',
      detail: 'Head of Department · CSE',
      passwordHash: defaultHash,
    },
    {
      identifier: 'adm-001',
      email: 'admin@gift.edu.in',
      name: 'Campus Administrator',
      role: Role.ADMIN,
      department: 'GIFT Autonomous, Bhubaneswar',
      detail: 'System administrator',
      passwordHash: defaultHash,
    },
    {
      identifier: 'admin',
      email: 'admin.alias@gift.edu.in',
      name: 'Campus Administrator',
      role: Role.ADMIN,
      department: 'GIFT Autonomous, Bhubaneswar',
      detail: 'System administrator',
      passwordHash: defaultHash,
    },
    {
      identifier: 'acc-012',
      email: 'accounts@gift.edu.in',
      name: 'Mr. S. K. Roy',
      role: Role.ACCOUNTS,
      department: 'Finance & Accounts',
      detail: 'Senior Accounts Officer',
      passwordHash: defaultHash,
    },
    {
      identifier: 'accounts',
      email: 'accounts.alias@gift.edu.in',
      name: 'Mr. S. K. Roy',
      role: Role.ACCOUNTS,
      department: 'Finance & Accounts',
      detail: 'Senior Accounts Officer',
      passwordHash: defaultHash,
    },
    {
      identifier: 'wrd-004',
      email: 'warden@gift.edu.in',
      name: 'Mrs. Nibedita Das',
      role: Role.WARDEN,
      department: 'Hostel Administration',
      detail: 'Chief Resident Warden',
      passwordHash: defaultHash,
    },
    {
      identifier: 'warden',
      email: 'warden.alias@gift.edu.in',
      name: 'Mrs. Nibedita Das',
      role: Role.WARDEN,
      department: 'Hostel Administration',
      detail: 'Chief Resident Warden',
      passwordHash: defaultHash,
    },
    {
      identifier: 'can-007',
      email: 'canteen@gift.edu.in',
      name: 'Mr. B. K. Sahoo',
      role: Role.CANTEEN,
      department: 'Hospitality & Dining',
      detail: 'Smart Canteen Supervisor',
      passwordHash: defaultHash,
    },
    {
      identifier: 'canteen',
      email: 'canteen.alias@gift.edu.in',
      name: 'Mr. B. K. Sahoo',
      role: Role.CANTEEN,
      department: 'Hospitality & Dining',
      detail: 'Smart Canteen Supervisor',
      passwordHash: defaultHash,
    },
  ];

  for (const u of usersToCreate) {
    await prisma.user.upsert({
      where: { identifier: u.identifier },
      update: { passwordHash: u.passwordHash, name: u.name, role: u.role },
      create: u,
    });
  }

  // 2. Seed Departments
  const departments = [
    { code: 'CSE', name: 'Computer Science & Engineering', hod: 'Dr. P. K. Pattnaik', hodEmail: 'hod.cse@gift.edu.in', studentsCount: 540, facultyCount: 32, subjectsCount: 48, status: 'Active' },
    { code: 'ECE', name: 'Electronics & Communication', hod: 'Dr. M. R. Senapati', hodEmail: 'hod.ece@gift.edu.in', studentsCount: 380, facultyCount: 24, subjectsCount: 36, status: 'Active' },
    { code: 'EEE', name: 'Electrical & Electronics', hod: 'Dr. S. K. Das', hodEmail: 'hod.eee@gift.edu.in', studentsCount: 290, facultyCount: 18, subjectsCount: 32, status: 'Active' },
    { code: 'MECH', name: 'Mechanical Engineering', hod: 'Dr. B. K. Rout', hodEmail: 'hod.mech@gift.edu.in', studentsCount: 320, facultyCount: 22, subjectsCount: 34, status: 'Active' },
    { code: 'CIVIL', name: 'Civil Engineering', hod: 'Dr. A. K. Nayak', hodEmail: 'hod.civil@gift.edu.in', studentsCount: 240, facultyCount: 16, subjectsCount: 28, status: 'Active' },
  ];
  for (const d of departments) {
    await prisma.department.upsert({
      where: { code: d.code },
      update: d,
      create: d,
    });
  }

  // 3. Seed Semesters & Sections
  for (let i = 1; i <= 8; i++) {
    await prisma.semester.upsert({
      where: { number: i },
      update: { label: `Semester ${i}`, year: i <= 2 ? '1st Year' : i <= 4 ? '2nd Year' : i <= 6 ? '3rd Year' : '4th Year' },
      create: { number: i, label: `Semester ${i}`, year: i <= 2 ? '1st Year' : i <= 4 ? '2nd Year' : i <= 6 ? '3rd Year' : '4th Year', status: i === 5 ? 'Active' : i < 5 ? 'Closed' : 'Upcoming' },
    });
  }

  // 4. Seed Subjects
  const subjects = [
    { code: 'CS501', name: 'Data Structures', department: 'CSE', semester: 'Semester 5', credits: 4, type: 'Theory + Lab', assignedFaculty: 'Dr. S. Mohanty' },
    { code: 'CS502', name: 'Operating Systems', department: 'CSE', semester: 'Semester 5', credits: 4, type: 'Theory + Lab', assignedFaculty: 'Prof. Amit Mishra' },
    { code: 'CS503', name: 'Database Management Systems', department: 'CSE', semester: 'Semester 5', credits: 4, type: 'Theory + Lab', assignedFaculty: 'Dr. Priya Ranjan' },
    { code: 'CS504', name: 'Artificial Intelligence', department: 'CSE', semester: 'Semester 5', credits: 3, type: 'Theory', assignedFaculty: 'Dr. Sneha Ray' },
    { code: 'CS505', name: 'Machine Learning', department: 'CSE', semester: 'Semester 5', credits: 4, type: 'Theory + Lab', assignedFaculty: 'Prof. Debashis Jena' },
    { code: 'CS506', name: 'Software Engineering', department: 'CSE', semester: 'Semester 5', credits: 3, type: 'Theory', assignedFaculty: 'Prof. Smita Sahoo' },
  ];
  for (const s of subjects) {
    await prisma.subject.upsert({
      where: { code: s.code },
      update: s,
      create: s,
    });
  }

  // 5. Seed Primary Student (Rakesh Das - Roll 01)
  const primaryStudent = await prisma.student.upsert({
    where: { rollNumber: '01' },
    update: { name: 'Rakesh Das', studentId: '2305201001', email: 'rakesh.das@gift.edu.in' },
    create: {
      studentId: '2305201001',
      rollNumber: '01',
      name: 'Rakesh Das',
      email: 'rakesh.das@gift.edu.in',
      phone: '+91 98610 23010',
      gender: 'Male',
      dob: '15-03-2005',
      bloodGroup: 'O+',
      category: 'General',
      religion: 'Hindu',
      department: 'Computer Science & Engineering',
      deptCode: 'CSE',
      semester: 'Semester 5',
      section: 'Section A',
      academicYear: '2026-27',
      status: 'Active',
      cgpa: 8.79,
      attendance: 92,
      walletBalance: 1450.0,
      hostelName: 'Sarojini Girls Residence (Block A)',
      roomNumber: '204',
      bedNumber: 'Bed 01 (Window Side)',
      floor: 'Floor 2',
      wardenName: 'Mrs. Nibedita Das',
      wardenContact: '+91 94370 33445',
    },
  });

  // Seed Guardians & Address for primary student
  await prisma.guardian.deleteMany({ where: { studentId: primaryStudent.id } });
  await prisma.guardian.createMany({
    data: [
      { studentId: primaryStudent.id, name: 'Sanjay Das', relationship: 'Father', contactNumber: '+91 94370 10001', email: 'sanjay.das@example.com' },
      { studentId: primaryStudent.id, name: 'Madhuri Das', relationship: 'Mother', contactNumber: '+91 94370 10002', email: 'madhuri.das@example.com' },
    ],
  });

  await prisma.address.deleteMany({ where: { studentId: primaryStudent.id } });
  await prisma.address.create({
    data: {
      studentId: primaryStudent.id,
      type: 'Permanent',
      addressLine: 'Plot 18, Unit 4',
      city: 'Bhubaneswar',
      state: 'Odisha',
      country: 'India',
      pincode: '751001',
    },
  });

  // 6. Seed Additional 90 Students for section A
  const studentFirstNames = ['Rakesh', 'Amit', 'Raj', 'Priya', 'Sourav', 'Sneha', 'Deepak', 'Puja', 'Bikash', 'Swati', 'Rohit', 'Monika', 'Subham', 'Ipsita', 'Alok', 'Smruti', 'Chandan', 'Tanmay', 'Lipika', 'Manas', 'Pragyan', 'Biswajit', 'Archana', 'Gourab', 'Satyajit', 'Sonali', 'Ashish', 'Kiran', 'Pranab', 'Niharika'];
  const studentLastNames = ['Das', 'Nayak', 'Sahoo', 'Patra', 'Mohanty', 'Barik', 'Rout', 'Behera', 'Pradhan', 'Samal', 'Panda', 'Mishra', 'Tripathy', 'Parida', 'Jena', 'Swain', 'Mangaraj', 'Muduli', 'Kar', 'Acharya'];

  for (let i = 1; i <= 91; i++) {
    const rollStr = String(i).padStart(2, '0');
    const fName = studentFirstNames[(i - 1) % studentFirstNames.length];
    const lName = studentLastNames[(i - 1 + Math.floor(i / studentFirstNames.length)) % studentLastNames.length];
    const name = `${fName} ${lName}`;
    const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@gift.edu.in`;

    const std = await prisma.student.upsert({
      where: { rollNumber: rollStr },
      update: { name, email },
      create: {
        studentId: `GIFT-2023-${1000 + i}`,
        rollNumber: rollStr,
        name,
        email,
        phone: `+91 ${9861000000 + (i * 111) % 900000}`,
        department: 'Computer Science & Engineering',
        deptCode: 'CSE',
        semester: 'Semester 5',
        section: 'Section A',
        status: i % 25 === 0 ? 'Inactive' : 'Active',
        cgpa: parseFloat((7.2 + ((i * 3.7) % 2.6)).toFixed(2)),
        attendance: Math.min(100, Math.floor(75 + ((i * 7) % 25))),
      },
    });

    // Seed continuous marks for this student for CS501
    await prisma.assessmentMark.upsert({
      where: { studentId_subjectCode: { studentId: std.id, subjectCode: 'CS501' } },
      update: {},
      create: {
        studentId: std.id,
        rollNumber: rollStr,
        studentName: name,
        subjectCode: 'CS501',
        subjectName: 'Data Structures',
        modular1: 14 + (i % 6),
        modular2: 15 + (i % 5),
        quiz1: 8 + (i % 3),
        quiz2: 7 + (i % 4),
        quiz3: 9 + (i % 2),
        quiz4: 8,
        quiz5: 7 + (i % 3),
        quiz6: 9,
        assignment1: 9,
        assignment2: 8,
        surpriseTest1: 8,
        surpriseTest2: 7,
        labWork: 9,
        totalMarks: 78 + (i % 20),
        finalWeightage: 39 + ((i % 10) * 0.5),
      },
    });
  }

  // Seed marks for all 6 subjects for Roll 01 (Rakesh Das)
  const roll01Subjects = [
    { code: 'CS502', name: 'Operating Systems', modular1: 18, modular2: 17, quiz1: 9, quiz2: 8, quiz3: 9, quiz4: 8, quiz5: 9, quiz6: 9, assignment1: 9, assignment2: 9, surpriseTest1: 8, surpriseTest2: 9, labWork: 9, total: 88, weightage: 44.5 },
    { code: 'CS503', name: 'Database Management Systems', modular1: 16, modular2: 18, quiz1: 8, quiz2: 9, quiz3: 8, quiz4: 7, quiz5: 9, quiz6: 8, assignment1: 8, assignment2: 9, surpriseTest1: 7, surpriseTest2: 8, labWork: 8, total: 84, weightage: 42.0 },
    { code: 'CS504', name: 'Artificial Intelligence', modular1: 17, modular2: 19, quiz1: 9, quiz2: 9, quiz3: 10, quiz4: 8, quiz5: 9, quiz6: 9, assignment1: 9, assignment2: 10, surpriseTest1: 8, surpriseTest2: 9, labWork: 9, total: 91, weightage: 46.0 },
    { code: 'CS505', name: 'Machine Learning', modular1: 15, modular2: 17, quiz1: 8, quiz2: 8, quiz3: 9, quiz4: 8, quiz5: 8, quiz6: 9, assignment1: 9, assignment2: 8, surpriseTest1: 8, surpriseTest2: 7, labWork: 9, total: 83, weightage: 41.5 },
    { code: 'CS506', name: 'Software Engineering', modular1: 16, modular2: 16, quiz1: 8, quiz2: 7, quiz3: 8, quiz4: 8, quiz5: 9, quiz6: 8, assignment1: 9, assignment2: 8, surpriseTest1: 7, surpriseTest2: 8, labWork: 8, total: 82, weightage: 41.0 },
  ];

  for (const sub of roll01Subjects) {
    await prisma.assessmentMark.upsert({
      where: { studentId_subjectCode: { studentId: primaryStudent.id, subjectCode: sub.code } },
      update: {},
      create: {
        studentId: primaryStudent.id,
        rollNumber: '01',
        studentName: 'Rakesh Das',
        subjectCode: sub.code,
        subjectName: sub.name,
        modular1: sub.modular1,
        modular2: sub.modular2,
        quiz1: sub.quiz1,
        quiz2: sub.quiz2,
        quiz3: sub.quiz3,
        quiz4: sub.quiz4,
        quiz5: sub.quiz5,
        quiz6: sub.quiz6,
        assignment1: sub.assignment1,
        assignment2: sub.assignment2,
        surpriseTest1: sub.surpriseTest1,
        surpriseTest2: sub.surpriseTest2,
        labWork: sub.labWork,
        totalMarks: sub.total,
        finalWeightage: sub.weightage,
      },
    });
  }

  // 7. Seed Marking Scheme
  const schemes = [
    { assessmentType: 'Modular Exams', count: 2, maxMarks: 20, weightage: 30, formula: 'Average of 2 modulars (30%)' },
    { assessmentType: 'Quizzes', count: 6, maxMarks: 10, weightage: 20, formula: 'Best 5 of 6 quizzes (20%)' },
    { assessmentType: 'Assignments', count: 2, maxMarks: 10, weightage: 10, formula: 'Average of 2 assignments (10%)' },
    { assessmentType: 'Surprise Tests', count: 2, maxMarks: 10, weightage: 10, formula: 'Average of 2 surprise tests (10%)' },
    { assessmentType: 'Lab Work / Practical', count: 1, maxMarks: 10, weightage: 30, formula: 'Continuous lab experiments + viva (30%)' },
  ];
  await prisma.markingScheme.deleteMany();
  for (const s of schemes) {
    await prisma.markingScheme.create({ data: s });
  }

  // 8. Seed Approval Queue
  const queues = [
    { subjectCode: 'CS501', subject: 'Data Structures', faculty: 'Dr. S. Mohanty', semester: 'Semester 5', section: 'Section A', submittedDate: '02 Oct 2026', status: 'Approved', hodRemarks: 'All 91 students evaluated with proper quiz/modular breakdown.', reviewedAt: '03 Oct 2026, 11:30 AM' },
    { subjectCode: 'CS502', subject: 'Operating Systems', faculty: 'Prof. Amit Mishra', semester: 'Semester 5', section: 'Section A', submittedDate: '03 Oct 2026', status: 'Pending', hodRemarks: 'Under review by HOD. Quizzes 1-6 uploaded.', reviewedAt: null },
    { subjectCode: 'CS503', subject: 'Database Management Systems', faculty: 'Dr. Priya Ranjan', semester: 'Semester 5', section: 'Section A', submittedDate: '01 Oct 2026', status: 'Rejected', hodRemarks: 'Quiz 4 marks are missing for 8 students. Please complete and resubmit.', reviewedAt: '02 Oct 2026, 04:10 PM' },
    { subjectCode: 'CS504', subject: 'Artificial Intelligence', faculty: 'Dr. Sneha Ray', semester: 'Semester 5', section: 'Section A', submittedDate: '03 Oct 2026', status: 'Approved', hodRemarks: 'Verified and approved for publication.', reviewedAt: '03 Oct 2026, 03:00 PM' },
  ];
  await prisma.approvalQueue.deleteMany();
  for (const q of queues) {
    await prisma.approvalQueue.create({ data: q });
  }

  // 9. Seed Fee Structures & Transactions
  await prisma.feeStructure.deleteMany();
  await prisma.feeStructure.createMany({
    data: [
      { term: 'Semester 5 (Academic Year 2026-27)', program: 'B.Tech - Computer Science', tuitionFee: 48500, developmentFee: 8500, labLibraryFee: 6000, examinationFee: 3500, hostelMessFee: 32000, total: 98500 },
      { term: 'Semester 6 (Upcoming)', program: 'B.Tech - Computer Science', tuitionFee: 48500, developmentFee: 8500, labLibraryFee: 6000, examinationFee: 3500, hostelMessFee: 32000, total: 98500 },
    ],
  });

  const txns = [
    { studentName: 'Rakesh Das', rollNumber: '01', semester: 'Semester 5', head: 'Tuition & Development Fee', amount: 48500, mode: 'Net Banking (HDFC)', date: '12 Aug 2026', status: 'Verified', receiptNo: 'RCPT-2026-0814' },
    { studentName: 'Rakesh Das', rollNumber: '01', semester: 'Semester 5', head: 'Examination & University Reg.', amount: 3500, mode: 'UPI', date: '15 Aug 2026', status: 'Verified', receiptNo: 'RCPT-2026-0852' },
    { studentName: 'Rakesh Das', rollNumber: '01', semester: 'Semester 5', head: 'Hostel & Mess Charges', amount: 20000, dueAmount: 12000, mode: 'Credit Card', date: '20 Aug 2026', status: 'Verified', receiptNo: 'RCPT-2026-0899' },
    { studentName: 'Amit Nayak', rollNumber: '02', semester: 'Semester 5', head: 'Full Semester Fee', amount: 98500, mode: 'Challan', date: '10 Aug 2026', status: 'Verified', receiptNo: 'RCPT-2026-0801' },
  ];
  for (const t of txns) {
    await prisma.feeTransaction.upsert({
      where: { receiptNo: t.receiptNo },
      update: t,
      create: t,
    });
  }

  // 10. Seed Hostels, Complaints, and Visitors
  await prisma.hostel.deleteMany();
  await prisma.hostel.createMany({
    data: [
      { name: 'Gandhi Boys Residence (Hostel 1)', type: 'Boys', totalFloors: 3, totalRooms: 60, totalBeds: 180, occupiedBeds: 168, availableBeds: 12, warden: 'Mr. Rajesh Jena', contact: '+91 94370 11223' },
      { name: 'Kalam Boys Residence (Hostel 2)', type: 'Boys', totalFloors: 3, totalRooms: 60, totalBeds: 180, occupiedBeds: 172, availableBeds: 8, warden: 'Mr. Manoj Sahoo', contact: '+91 94370 22334' },
      { name: 'Sarojini Girls Residence (Hostel 1)', type: 'Girls', totalFloors: 3, totalRooms: 50, totalBeds: 150, occupiedBeds: 142, availableBeds: 8, warden: 'Mrs. Nibedita Das', contact: '+91 94370 33445' },
    ],
  });

  await prisma.hostelComplaint.deleteMany();
  await prisma.hostelComplaint.createMany({
    data: [
      { studentName: 'Rakesh Das', rollNumber: '01', hostel: 'Sarojini Boys Residence', roomNumber: '204', category: 'Electrical', title: 'Ceiling fan speed regulator broken', priority: 'Medium', status: 'In Progress', filedDate: '02 Oct 2026', resolutionNotes: 'Electrician assigned for inspection today.' },
      { studentName: 'Amit Nayak', rollNumber: '02', hostel: 'Gandhi Boys Residence', roomNumber: '102', category: 'Plumbing', title: 'Bathroom tap leaking continuously', priority: 'High', status: 'Pending', filedDate: '03 Oct 2026', resolutionNotes: 'Plumber queued for block inspection.' },
    ],
  });

  // 11. Seed Canteen Food Items & Orders
  const foods = [
    { name: 'Veg Hyderabadi Biryani', category: 'Main Course', price: 60, isAvailable: true, prepTime: '10 mins', calories: '420 kcal' },
    { name: 'Chicken Dum Biryani', category: 'Main Course', price: 110, isAvailable: true, prepTime: '12 mins', calories: '580 kcal' },
    { name: 'Paneer Butter Masala Combo (3 Rotis)', category: 'Main Course', price: 80, isAvailable: true, prepTime: '15 mins', calories: '480 kcal' },
    { name: 'South Indian Masala Dosa', category: 'Breakfast/Snacks', price: 45, isAvailable: true, prepTime: '8 mins', calories: '290 kcal' },
    { name: 'Idli Sambhar (3 Pcs) with Chutney', category: 'Breakfast/Snacks', price: 30, isAvailable: true, prepTime: '5 mins', calories: '180 kcal' },
    { name: 'Executive Thali (Rice, 2 Roti, Dal, Sabzi, Papad, Curd)', category: 'Main Course', price: 65, isAvailable: true, prepTime: '5 mins', calories: '550 kcal' },
    { name: 'Fresh Cold Coffee with Ice Cream', category: 'Beverages', price: 35, isAvailable: true, prepTime: '4 mins', calories: '190 kcal' },
  ];
  await prisma.foodItem.deleteMany();
  for (const f of foods) {
    await prisma.foodItem.create({ data: f });
  }

  // 12. Seed Notices & Holidays
  await prisma.notice.deleteMany();
  await prisma.notice.createMany({
    data: [
      { title: 'Registration & Verification for PRERANA State Scholarship 2026-27', tag: 'SCHOLARSHIP', date: '27 Sep 2026', publisher: 'Dean of Student Welfare', pinned: true, summary: 'Eligible SC/ST/OBC students must submit online renewal forms.', content: 'Update Aadhaar linking and upload marksheets.' },
      { title: 'BPUT Even Semester Result Declaration & Re-checking Guidelines', tag: 'EXAMINATION', date: '25 Sep 2026', publisher: 'Controller of Examinations', pinned: true, summary: 'Results for B.Tech exams published. Deadline for re-checking is 05 October.', content: 'Apply through college student cell.' },
      { title: 'GATE preparation support and weekend coaching', tag: 'CAREER', date: '19 Sep 2026', publisher: 'Department of Computer Science', pinned: false, summary: 'Weekend coaching starts this Saturday at Seminar Hall 2.', content: 'Registration open at department office.' },
    ],
  });

  const holidays = [
    { rawDate: '14-10-2026', name: 'Durga Puja Saptami', daysLeft: 10 },
    { rawDate: '15-10-2026', name: 'Durga Puja Ashtami', daysLeft: 11 },
    { rawDate: '16-10-2026', name: 'Durga Puja Navami', daysLeft: 12 },
    { rawDate: '20-10-2026', name: 'Diwali', daysLeft: 16 },
    { rawDate: '25-12-2026', name: 'Christmas Day', daysLeft: 82 },
  ];
  await prisma.holiday.deleteMany();
  for (const h of holidays) {
    await prisma.holiday.create({ data: h });
  }

  // 13. Seed Staff Rosters (Wardens, Security Guards, Canteen, Other Support)
  await prisma.staffRoster.deleteMany();
  await prisma.staffRoster.createMany({
    data: [
      { staffType: 'WARDEN', name: 'Mr. Rajesh Jena', gender: 'Male', roleOrCategory: 'Boys Hostel', assignedHostelOrPost: 'Gandhi Boys Residence (Hostel 1)', phone: '+91 94370 11223', shift: '24x7 Resident Duty', status: 'Active' },
      { staffType: 'WARDEN', name: 'Mrs. Nibedita Das', gender: 'Female', roleOrCategory: 'Girls Hostel', assignedHostelOrPost: 'Sarojini Girls Residence (Hostel 1)', phone: '+91 94370 33445', shift: '24x7 Resident Duty', status: 'Active' },
      { staffType: 'SECURITY', name: 'Dillip Kumar Pradhan', badgeNumber: 'SG-OD-4421', assignedHostelOrPost: 'Main Campus Gate 1', phone: '+91 94371 55671', shift: 'Morning Shift (06:00 AM - 02:00 PM)', status: 'On Duty' },
      { staffType: 'SECURITY', name: 'Sunita Biswal', badgeNumber: 'SG-OD-4424', assignedHostelOrPost: 'Girls Hostel Reception', phone: '+91 94371 88904', shift: 'Morning Shift (06:00 AM - 02:00 PM)', status: 'On Duty' },
      { staffType: 'CANTEEN', name: 'Santosh Nayak', roleOrCategory: 'Canteen Supervisor', outletOrZone: 'Central Food Court', phone: '+91 98612 33411', shift: 'Full Day Shift', status: 'Active' },
      { staffType: 'SUPPORT', name: 'Pramod Panda', roleOrCategory: 'Electrician & Power Maintenance', outletOrZone: 'Entire Campus', phone: '+91 94378 99120', shift: 'General Shift', status: 'Active' },
    ],
  });

  console.log('✅ Database seeded successfully with all 7 roles, 91 students, and college entities!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
