import bcrypt from 'bcryptjs';

const users = [
  {
    id: 'u-1001',
    email: 'student@collegeflow.edu',
    firstName: 'Aarav',
    lastName: 'Sharma',
    role: 'student',
    passwordHash: bcrypt.hashSync('password123', 10),
    isActive: true,
  },
  {
    id: 'u-1002',
    email: 'admin@collegeflow.edu',
    firstName: 'Nisha',
    lastName: 'Patel',
    role: 'college_admin',
    passwordHash: bcrypt.hashSync('password123', 10),
    isActive: true,
  },
  {
    id: 'u-1003',
    email: 'faculty@collegeflow.edu',
    firstName: 'Rohit',
    lastName: 'Verma',
    role: 'faculty',
    passwordHash: bcrypt.hashSync('password123', 10),
    isActive: true,
  },
];

export function findUserByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === String(email).toLowerCase());
}

export function listUsers() {
  return users;
}

export const dashboardData = {
  student: {
    name: 'Aarav Sharma',
    studentId: 'CF-2025-1184',
    cgpa: 8.79,
    attendance: 92.5,
    pendingFees: 18950,
    currentSemester: 5,
    notices: [
      { title: 'Semester registration window', category: 'Academic' },
      { title: 'Placement drive on 12 Oct', category: 'Placement' },
    ],
  },
  admin: {
    totalStudents: 12450,
    totalFaculty: 580,
    attendance: 91.4,
    feesCollected: '₹7.4 Cr',
    pendingFees: '₹29.5 Lakh',
    placementOffers: 412,
  },
};
