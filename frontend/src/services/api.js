// Central API Client connecting Frontend to NestJS Backend (http://localhost:4000/api)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

function getAuthHeader() {
  const token = localStorage.getItem('collegeflow_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`API call to ${endpoint} failed:`, error.message);
    throw error;
  }
}

export const api = {
  // 1. Authentication
  login: async (identifier, password) => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });
    if (res.success && res.accessToken) {
      localStorage.setItem('collegeflow_token', res.accessToken);
      localStorage.setItem('collegeflow_user', JSON.stringify(res.user));
    }
    return res;
  },

  getMe: () => request('/auth/me'),

  logout: () => {
    localStorage.removeItem('collegeflow_token');
    localStorage.removeItem('collegeflow_user');
    return request('/auth/logout', { method: 'POST' }).catch(() => ({}));
  },

  // 2. Students & Profile
  getStudents: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/students${query ? '?' + query : ''}`);
  },

  getProfile: () => request('/students/profile'),

  saveTransferPreference: (campus, city, confirmed = true) =>
    request('/students/transfer-preference', {
      method: 'POST',
      body: JSON.stringify({ campus, city, confirmed }),
    }),

  // 3. Marks & Continuous Assessment
  getStudentMarks: (rollNumber = '01') => request(`/marks/student?rollNumber=${rollNumber}`),

  getSectionMarks: (subjectCode, section = 'Section A') =>
    request(`/marks/section/${subjectCode}?section=${section}`),

  updateCellMark: (payload) =>
    request('/marks/cell', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  getApprovalQueue: () => request('/marks/approval-queue'),

  submitMarksToHod: (payload) =>
    request('/marks/submit-to-hod', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  approveMarks: (id) =>
    request('/marks/hod/approve', {
      method: 'POST',
      body: JSON.stringify({ id }),
    }),

  rejectMarks: (id, rejectionReason) =>
    request('/marks/hod/reject', {
      method: 'POST',
      body: JSON.stringify({ id, rejectionReason }),
    }),

  unlockMarks: (id) =>
    request('/marks/hod/unlock', {
      method: 'POST',
      body: JSON.stringify({ id }),
    }),

  getMarkingScheme: () => request('/marks/scheme'),

  // 4. Academics
  getDepartments: () => request('/academics/departments'),
  getSemesters: () => request('/academics/semesters'),
  getSections: () => request('/academics/sections'),
  getSubjects: (dept, sem) => {
    const query = new URLSearchParams({ department: dept || '', semester: sem || '' }).toString();
    return request(`/academics/subjects?${query}`);
  },
  getTimetable: () => request('/academics/timetable'),

  // 5. Fees & Accounts
  getFeeStatement: (rollNumber = '01') => request(`/fees/statement?rollNumber=${rollNumber}`),
  getFeeTransactions: (search = '') => request(`/fees/transactions?search=${encodeURIComponent(search)}`),
  recordFeePayment: (payload) =>
    request('/fees/record', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // 6. Hostel
  getHostels: () => request('/hostel/list'),
  getMyResidence: (rollNumber = '01') => request(`/hostel/my-residence?rollNumber=${rollNumber}`),
  getComplaints: (rollNumber) => request(`/hostel/complaints${rollNumber ? '?rollNumber=' + rollNumber : ''}`),
  lodgeComplaint: (payload) =>
    request('/hostel/complaints', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateComplaintStatus: (id, status) =>
    request(`/hostel/complaints/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  getVisitors: () => request('/hostel/visitors'),
  issueVisitorPass: (payload) =>
    request('/hostel/visitors', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // 7. Canteen
  getCanteenMenu: () => request('/canteen/menu'),
  addFoodItem: (payload) =>
    request('/canteen/menu', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  toggleFoodAvailability: (id) => request(`/canteen/menu/${id}/toggle`, { method: 'PATCH' }),
  getCanteenOrders: () => request('/canteen/orders'),
  placeCanteenOrder: (payload) =>
    request('/canteen/order', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateCanteenOrderStatus: (id, status) =>
    request(`/canteen/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  topUpCanteenWallet: (amount, rollNumber = '01') =>
    request('/canteen/wallet/topup', {
      method: 'POST',
      body: JSON.stringify({ amount, rollNumber }),
    }),

  // 8. CMS (Notices, Holidays, Blogs, Feedback)
  getNotices: (search = '', tag = '') =>
    request(`/cms/notices?search=${encodeURIComponent(search)}&tag=${encodeURIComponent(tag)}`),
  getHolidays: () => request('/cms/holidays'),
  getBlogs: (tag = '') => request(`/cms/blogs?tag=${encodeURIComponent(tag)}`),
  createBlog: (payload) =>
    request('/cms/blogs', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  likeBlog: (id) => request(`/cms/blogs/${id}/like`, { method: 'POST' }),
  submitFeedback: (payload) =>
    request('/cms/feedback', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getBiometricLogs: (direction = 'ALL') => request(`/cms/biometric-logs?direction=${direction}`),

  // 9. Admin & Staff Rosters
  getAdminMetrics: () => request('/admin/metrics'),
  getStaffRosters: (type = 'All', search = '') =>
    request(`/admin/staff?type=${type}&search=${encodeURIComponent(search)}`),
  createStaff: (payload) =>
    request('/admin/staff', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  deleteStaff: (id) => request(`/admin/staff/${id}`, { method: 'DELETE' }),
  getAuditLogs: (search = '') => request(`/admin/audit-logs?search=${encodeURIComponent(search)}`),

  // 10. AI Campus Assistant
  askChatbot: (message, history = []) =>
    request('/chatbot/query', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    }),
};
