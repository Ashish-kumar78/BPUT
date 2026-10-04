import React, { useState, useMemo } from 'react';
import {
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  Layers,
  Settings,
  FileText,
  ShieldCheck,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Filter,
  LogOut,
  Sliders,
  ChevronRight,
  TrendingUp,
  BarChart2,
  ArrowUpRight,
  X,
  Home,
  ShieldAlert,
  Utensils,
  Wrench,
  Shield,
  HardHat,
  Phone,
  MapPin,
  UserCheck,
  Briefcase,
  CreditCard
} from 'lucide-react';
import './AdminPortal.css';
import { downloadAdminReportPdf } from '../utils/pdfGenerator';
import {
  initialDepartments,
  initialHods,
  initialFaculty,
  initialSemesters,
  initialSections,
  initialSubjects,
  initialMarkingScheme,
  initialAuditLogs,
  generateAllStudents,
  initialWardens,
  initialSecurityGuards,
  initialCanteenStaff,
  initialOtherStaff,
} from '../data/collegeData.js';
import MarksManagementModule from '../marks/MarksManagementModule.jsx';
import { api } from '../services/api.js';

export default function AdminPortal({ account, onLogout, onSwitchRole }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State for all managed entities
  const [students, setStudents] = useState(() => generateAllStudents());
  const [facultyList, setFacultyList] = useState(initialFaculty);
  const [hodList, setHodList] = useState(initialHods);
  const [departments, setDepartments] = useState(initialDepartments);
  const [semesters, setSemesters] = useState(initialSemesters);
  const [sections, setSections] = useState(initialSections);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [markingScheme, setMarkingScheme] = useState(initialMarkingScheme);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);

  // Campus & Operations Rosters (Wardens, Security, Canteen, Other Support)
  const [wardenList, setWardenList] = useState(initialWardens);
  const [wardenSearch, setWardenSearch] = useState('');
  const [wardenFilterCategory, setWardenFilterCategory] = useState('All'); // 'All', 'Boys Hostel', 'Girls Hostel'
  const [isWardenModalOpen, setIsWardenModalOpen] = useState(false);
  const [editingWarden, setEditingWarden] = useState(null);
  const [wardenFormData, setWardenFormData] = useState({
    name: '',
    gender: 'Male',
    hostelCategory: 'Boys Hostel',
    assignedHostel: 'Gandhi Boys Residence (Hostel 1)',
    roomOffice: 'Ground Floor, Warden Office A-01',
    phone: '+91 94370 11223',
    email: 'warden@gift.edu.in',
    shift: '24x7 Resident Duty',
    residentsCount: 160,
    totalBeds: 180,
    status: 'Active',
    joiningYear: '2024'
  });

  const [securityGuards, setSecurityGuards] = useState(initialSecurityGuards);
  const [securitySearch, setSecuritySearch] = useState('');
  const [securityFilterShift, setSecurityFilterShift] = useState('All');
  const [securityFilterStatus, setSecurityFilterStatus] = useState('All');
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [editingSecurity, setEditingSecurity] = useState(null);
  const [securityFormData, setSecurityFormData] = useState({
    name: '',
    badgeNumber: '',
    postLocation: 'Main Campus Gate 1 (Front Entrance)',
    shift: 'Morning Shift (06:00 AM - 02:00 PM)',
    phone: '+91 94371 55671',
    emergencyContact: '+91 98610 88210',
    assignedAgency: 'Falcon Security Services',
    bloodGroup: 'B+',
    status: 'On Duty'
  });

  const [canteenStaff, setCanteenStaff] = useState(initialCanteenStaff);
  const [canteenSearch, setCanteenSearch] = useState('');
  const [canteenFilterOutlet, setCanteenFilterOutlet] = useState('All');
  const [isCanteenModalOpen, setIsCanteenModalOpen] = useState(false);
  const [editingCanteen, setEditingCanteen] = useState(null);
  const [canteenFormData, setCanteenFormData] = useState({
    name: '',
    role: 'Canteen Supervisor / In-Charge',
    outlet: 'Central Food Court & Mess Hall',
    shift: 'Full Day Shift (07:00 AM - 08:30 PM)',
    phone: '+91 98612 33411',
    fssaiLicense: 'FSSAI-OD-2024-9981',
    speciality: 'Mess Operations & Hygiene',
    status: 'Active'
  });

  const [otherStaff, setOtherStaff] = useState(initialOtherStaff);
  const [otherStaffSearch, setOtherStaffSearch] = useState('');
  const [otherStaffFilterCategory, setOtherStaffFilterCategory] = useState('All');
  const [isOtherStaffModalOpen, setIsOtherStaffModalOpen] = useState(false);
  const [editingOtherStaff, setEditingOtherStaff] = useState(null);
  const [otherStaffFormData, setOtherStaffFormData] = useState({
    name: '',
    category: 'Electrician & Power Maintenance',
    zone: 'Entire Campus & Substation',
    shift: 'General Shift (08:30 AM - 05:00 PM)',
    phone: '+91 94378 99120',
    emergencyDuty: 'Yes (On-Call 24x7)',
    qualification: 'ITI Electrical / Certified',
    status: 'Active'
  });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterSemester, setFilterSemester] = useState('All');
  const [filterSection, setFilterSection] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modal States
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentFormData, setStudentFormData] = useState({
    rollNumber: '',
    name: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering',
    deptCode: 'CSE',
    semester: 'Semester 5',
    section: 'Section A',
    academicYear: '2026-27',
    status: 'Active'
  });

  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [facultyFormData, setFacultyFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering',
    designation: 'Assistant Professor',
    assignedSubjects: 'Data Structures',
    assignedSections: 'Sem 5 - Sec A',
    status: 'Active'
  });

  const [isHodModalOpen, setIsHodModalOpen] = useState(false);
  const [editingHod, setEditingHod] = useState(null);
  const [hodFormData, setHodFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering',
    deptCode: 'CSE',
    experience: '15 Years',
    qualification: 'Ph.D'
  });

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectFormData, setSubjectFormData] = useState({
    code: '',
    name: '',
    department: 'CSE',
    semester: 'Semester 5',
    credits: 4,
    type: 'Theory + Lab',
    assignedFaculty: 'Dr. S. Mohanty'
  });

  const [viewDetailsItem, setViewDetailsItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.rollNumber.includes(searchQuery) ||
                          s.studentId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = filterDept === 'All' || s.deptCode === filterDept || s.department === filterDept;
      const matchSem = filterSemester === 'All' || s.semester === filterSemester;
      const matchSec = filterSection === 'All' || s.section === filterSection;
      const matchStatus = filterStatus === 'All' || s.status === filterStatus;
      return matchSearch && matchDept && matchSem && matchSec && matchStatus;
    });
  }, [students, searchQuery, filterDept, filterSemester, filterSection, filterStatus]);

  // Filtered Wardens (Boys & Girls)
  const filteredWardens = useMemo(() => {
    return wardenList.filter(w => {
      const matchSearch = w.name.toLowerCase().includes(wardenSearch.toLowerCase()) ||
                          w.assignedHostel.toLowerCase().includes(wardenSearch.toLowerCase()) ||
                          w.phone.includes(wardenSearch) ||
                          w.email.toLowerCase().includes(wardenSearch.toLowerCase());
      const matchCat = wardenFilterCategory === 'All' || w.hostelCategory === wardenFilterCategory;
      return matchSearch && matchCat;
    });
  }, [wardenList, wardenSearch, wardenFilterCategory]);

  // Filtered Security Guards
  const filteredSecurity = useMemo(() => {
    return securityGuards.filter(g => {
      const matchSearch = g.name.toLowerCase().includes(securitySearch.toLowerCase()) ||
                          g.badgeNumber.toLowerCase().includes(securitySearch.toLowerCase()) ||
                          g.postLocation.toLowerCase().includes(securitySearch.toLowerCase()) ||
                          g.phone.includes(securitySearch);
      const matchShift = securityFilterShift === 'All' || g.shift.toLowerCase().includes(securityFilterShift.toLowerCase());
      const matchStatus = securityFilterStatus === 'All' || g.status === securityFilterStatus;
      return matchSearch && matchShift && matchStatus;
    });
  }, [securityGuards, securitySearch, securityFilterShift, securityFilterStatus]);

  // Filtered Canteen Staff
  const filteredCanteen = useMemo(() => {
    return canteenStaff.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(canteenSearch.toLowerCase()) ||
                          c.role.toLowerCase().includes(canteenSearch.toLowerCase()) ||
                          c.outlet.toLowerCase().includes(canteenSearch.toLowerCase()) ||
                          c.phone.includes(canteenSearch);
      const matchOutlet = canteenFilterOutlet === 'All' || c.outlet.toLowerCase().includes(canteenFilterOutlet.toLowerCase());
      return matchSearch && matchOutlet;
    });
  }, [canteenStaff, canteenSearch, canteenFilterOutlet]);

  // Filtered Other Staff
  const filteredOtherStaff = useMemo(() => {
    return otherStaff.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(otherStaffSearch.toLowerCase()) ||
                          s.category.toLowerCase().includes(otherStaffSearch.toLowerCase()) ||
                          s.zone.toLowerCase().includes(otherStaffSearch.toLowerCase()) ||
                          s.phone.includes(otherStaffSearch);
      const matchCategory = otherStaffFilterCategory === 'All' || s.category === otherStaffFilterCategory;
      return matchSearch && matchCategory;
    });
  }, [otherStaff, otherStaffSearch, otherStaffFilterCategory]);


  // Student CRUD
  const handleOpenAddStudent = () => {
    setEditingStudent(null);
    const nextRoll = String(students.length + 1).padStart(2, '0');
    setStudentFormData({
      rollNumber: nextRoll,
      name: '',
      email: '',
      phone: '+91 9861000000',
      department: 'Computer Science & Engineering',
      deptCode: 'CSE',
      semester: 'Semester 5',
      section: 'Section A',
      academicYear: '2026-27',
      status: 'Active'
    });
    setIsStudentModalOpen(true);
  };

  const handleOpenEditStudent = (s) => {
    setEditingStudent(s);
    setStudentFormData({ ...s });
    setIsStudentModalOpen(true);
  };

  const handleSaveStudent = (e) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...studentFormData } : s));
      showToast(`Student ${studentFormData.name} updated successfully!`);
    } else {
      const newStudent = {
        ...studentFormData,
        id: `std-${Date.now()}`,
        studentId: `GIFT-2023-${1000 + students.length + 1}`,
        cgpa: '8.10',
        attendance: 90
      };
      setStudents(prev => [newStudent, ...prev]);
      showToast(`Student ${newStudent.name} (Roll ${newStudent.rollNumber}) added successfully!`);
    }
    setIsStudentModalOpen(false);
  };

  const handleDeleteStudent = (id, name) => {
    if (window.confirm(`Are you sure you want to deactivate student ${name}?`)) {
      setStudents(prev => prev.map(s => s.id === id ? { ...s, status: 'Inactive' } : s));
      showToast(`Student ${name} status set to Inactive.`);
    }
  };

  // Faculty CRUD
  const handleOpenAddFaculty = () => {
    setEditingFaculty(null);
    setFacultyFormData({
      name: '',
      email: '',
      phone: '+91 9861100000',
      department: 'Computer Science & Engineering',
      designation: 'Assistant Professor',
      assignedSubjects: 'Data Structures',
      assignedSections: 'Sem 5 - Sec A',
      status: 'Active'
    });
    setIsFacultyModalOpen(true);
  };

  const handleSaveFaculty = (e) => {
    e.preventDefault();
    const subs = typeof facultyFormData.assignedSubjects === 'string'
      ? facultyFormData.assignedSubjects.split(',').map(s => s.trim())
      : facultyFormData.assignedSubjects;
    const secs = typeof facultyFormData.assignedSections === 'string'
      ? facultyFormData.assignedSections.split(',').map(s => s.trim())
      : facultyFormData.assignedSections;

    if (editingFaculty) {
      setFacultyList(prev => prev.map(f => f.id === editingFaculty.id ? { ...f, ...facultyFormData, assignedSubjects: subs, assignedSections: secs } : f));
      showToast(`Faculty ${facultyFormData.name} updated.`);
    } else {
      const newFac = {
        ...facultyFormData,
        id: `FAC-${100 + facultyList.length}`,
        assignedSubjects: subs,
        assignedSections: secs
      };
      setFacultyList(prev => [...prev, newFac]);
      showToast(`New faculty ${newFac.name} added!`);
    }
    setIsFacultyModalOpen(false);
  };

  // HOD CRUD
  const handleOpenAddHod = () => {
    setEditingHod(null);
    setHodFormData({
      name: '',
      email: '',
      phone: '+91 9437100000',
      department: 'Computer Science & Engineering',
      deptCode: 'CSE',
      experience: '12 Years',
      qualification: 'Ph.D'
    });
    setIsHodModalOpen(true);
  };

  const handleSaveHod = (e) => {
    e.preventDefault();
    if (editingHod) {
      setHodList(prev => prev.map(h => h.id === editingHod.id ? { ...h, ...hodFormData } : h));
      showToast(`HOD ${hodFormData.name} updated.`);
    } else {
      const newHod = {
        ...hodFormData,
        id: `hod-${Date.now()}`,
        status: 'Active'
      };
      setHodList(prev => [...prev, newHod]);
      showToast(`New HOD ${newHod.name} assigned to ${newHod.deptCode}!`);
    }
    setIsHodModalOpen(false);
  };

  // Subject CRUD
  const handleSaveSubject = (e) => {
    e.preventDefault();
    const newSub = {
      ...subjectFormData,
      id: `sub-${Date.now()}`,
      status: 'Active'
    };
    setSubjects(prev => [...prev, newSub]);
    setIsSubjectModalOpen(false);
    showToast(`Subject ${newSub.code} - ${newSub.name} created!`);
  };

  // Semester activation/closing
  const toggleSemesterStatus = (id) => {
    setSemesters(prev => prev.map(sem => {
      if (sem.id === id) {
        const nextStatus = sem.status === 'Active' ? 'Closed' : 'Active';
        showToast(`${sem.label} is now ${nextStatus}`);
        return { ...sem, status: nextStatus };
      }
      return sem;
    }));
  };

  // Marking Scheme modification
  const handleSchemeChange = (id, field, val) => {
    setMarkingScheme(prev => prev.map(item => item.id === id ? { ...item, [field]: Number(val) || val } : item));
  };

  // Warden Handlers
  const handleOpenAddWarden = () => {
    setEditingWarden(null);
    setWardenFormData({
      name: '',
      gender: 'Male',
      hostelCategory: 'Boys Hostel',
      assignedHostel: 'Gandhi Boys Residence (Hostel 1)',
      roomOffice: 'Ground Floor, Warden Office A-01',
      phone: '+91 94370 11223',
      email: 'warden.new@gift.edu.in',
      shift: '24x7 Resident Duty',
      residentsCount: 160,
      totalBeds: 180,
      status: 'Active',
      joiningYear: '2026'
    });
    setIsWardenModalOpen(true);
  };

  const handleOpenEditWarden = (w) => {
    setEditingWarden(w);
    setWardenFormData({ ...w });
    setIsWardenModalOpen(true);
  };

  const handleSaveWarden = (e) => {
    e.preventDefault();
    if (editingWarden) {
      setWardenList(prev => prev.map(w => w.id === editingWarden.id ? { ...w, ...wardenFormData } : w));
      showToast(`Hostel Warden ${wardenFormData.name} updated successfully!`);
    } else {
      const prefix = wardenFormData.hostelCategory === 'Boys Hostel' ? 'WRD-B' : 'WRD-G';
      const newWarden = {
        ...wardenFormData,
        id: `${prefix}0${wardenList.length + 1}`
      };
      setWardenList(prev => [newWarden, ...prev]);
      showToast(`Warden ${newWarden.name} (${newWarden.hostelCategory}) appointed to ${newWarden.assignedHostel}!`);
    }
    setIsWardenModalOpen(false);
  };

  const handleDeleteWarden = (id, name) => {
    if (window.confirm(`Are you sure you want to remove warden ${name}?`)) {
      setWardenList(prev => prev.filter(w => w.id !== id));
      showToast(`Warden ${name} removed from roster.`);
    }
  };

  // Security Handlers
  const handleOpenAddSecurity = () => {
    setEditingSecurity(null);
    setSecurityFormData({
      name: '',
      badgeNumber: `SG-OD-${4420 + securityGuards.length + 1}`,
      postLocation: 'Main Campus Gate 1 (Front Entrance)',
      shift: 'Morning Shift (06:00 AM - 02:00 PM)',
      phone: '+91 94371 88888',
      emergencyContact: '+91 98610 77777',
      assignedAgency: 'Falcon Security Services',
      bloodGroup: 'O+',
      status: 'On Duty'
    });
    setIsSecurityModalOpen(true);
  };

  const handleOpenEditSecurity = (g) => {
    setEditingSecurity(g);
    setSecurityFormData({ ...g });
    setIsSecurityModalOpen(true);
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (editingSecurity) {
      setSecurityGuards(prev => prev.map(g => g.id === editingSecurity.id ? { ...g, ...securityFormData } : g));
      showToast(`Security Guard ${securityFormData.name} updated.`);
    } else {
      const newGuard = {
        ...securityFormData,
        id: `SEC-${100 + securityGuards.length + 1}`
      };
      setSecurityGuards(prev => [newGuard, ...prev]);
      showToast(`Security Guard ${newGuard.name} (${newGuard.badgeNumber}) added to roster!`);
    }
    setIsSecurityModalOpen(false);
  };

  const handleDeleteSecurity = (id, name) => {
    if (window.confirm(`Are you sure you want to remove security guard ${name}?`)) {
      setSecurityGuards(prev => prev.filter(g => g.id !== id));
      showToast(`Security guard ${name} removed from duty roster.`);
    }
  };

  // Canteen Handlers
  const handleOpenAddCanteen = () => {
    setEditingCanteen(null);
    setCanteenFormData({
      name: '',
      role: 'Head Chef / Kitchen Lead',
      outlet: 'Central Food Court & Mess Hall',
      shift: 'Morning Prep & Lunch (06:00 AM - 03:00 PM)',
      phone: '+91 98612 11223',
      fssaiLicense: `FSSAI-OD-2024-${9980 + canteenStaff.length + 1}`,
      speciality: 'Special Meals, Hygiene & Nutrition',
      status: 'Active'
    });
    setIsCanteenModalOpen(true);
  };

  const handleOpenEditCanteen = (c) => {
    setEditingCanteen(c);
    setCanteenFormData({ ...c });
    setIsCanteenModalOpen(true);
  };

  const handleSaveCanteen = (e) => {
    e.preventDefault();
    if (editingCanteen) {
      setCanteenStaff(prev => prev.map(c => c.id === editingCanteen.id ? { ...c, ...canteenFormData } : c));
      showToast(`Canteen staff ${canteenFormData.name} updated.`);
    } else {
      const newStaff = {
        ...canteenFormData,
        id: `CNT-0${canteenStaff.length + 1}`
      };
      setCanteenStaff(prev => [newStaff, ...prev]);
      showToast(`Canteen member ${newStaff.name} added to roster!`);
    }
    setIsCanteenModalOpen(false);
  };

  const handleDeleteCanteen = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from canteen roster?`)) {
      setCanteenStaff(prev => prev.filter(c => c.id !== id));
      showToast(`Canteen staff ${name} removed.`);
    }
  };

  // Other Staff Handlers
  const handleOpenAddOtherStaff = () => {
    setEditingOtherStaff(null);
    setOtherStaffFormData({
      name: '',
      category: 'Electrician & Power Maintenance',
      zone: 'Entire Campus & Substation',
      shift: 'General Shift (08:30 AM - 05:00 PM)',
      phone: '+91 94378 55443',
      emergencyDuty: 'Yes (On-Call 24x7)',
      qualification: 'Govt Certified Vocational / ITI',
      status: 'Active'
    });
    setIsOtherStaffModalOpen(true);
  };

  const handleOpenEditOtherStaff = (s) => {
    setEditingOtherStaff(s);
    setOtherStaffFormData({ ...s });
    setIsOtherStaffModalOpen(true);
  };

  const handleSaveOtherStaff = (e) => {
    e.preventDefault();
    if (editingOtherStaff) {
      setOtherStaff(prev => prev.map(s => s.id === editingOtherStaff.id ? { ...s, ...otherStaffFormData } : s));
      showToast(`Staff member ${otherStaffFormData.name} updated.`);
    } else {
      const newStaff = {
        ...otherStaffFormData,
        id: `STF-0${otherStaff.length + 1}`
      };
      setOtherStaff(prev => [newStaff, ...prev]);
      showToast(`Staff member ${newStaff.name} added to roster!`);
    }
    setIsOtherStaffModalOpen(false);
  };

  const handleDeleteOtherStaff = (id, name) => {
    if (window.confirm(`Are you sure you want to remove staff member ${name}?`)) {
      setOtherStaff(prev => prev.filter(s => s.id !== id));
      showToast(`Staff member ${name} removed.`);
    }
  };

  return (
    <div className="admin-portal-root">
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#0f172a',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          borderLeft: '4px solid #2563eb'
        }}>
          <CheckCircle2 size={18} color="#60a5fa" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="admin-header">
        <div className="admin-brand">
          <div className="admin-brand-icon">G</div>
          <div className="admin-brand-text">
            <h1>GIFT AUTONOMOUS · ERP ADMIN</h1>
            <p>Institutional Governance & Academic Management</p>
          </div>
        </div>

        <div className="admin-user-controls">
          <span className="admin-role-badge">
            <ShieldCheck size={14} />
            Administrator
          </span>
          <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>
            {account?.name || 'Campus Administrator'}
          </span>
          <button className="admin-signout-btn" onClick={onLogout} title="Sign Out">
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </header>
 
      {/* Campus Roles & Masquerade Switcher (Inside Admin Option) */}
      {onSwitchRole && (
        <div className="admin-quick-role-bar" style={{
          background: 'linear-gradient(90deg, #1e293b, #0f172a)',
          color: '#fff',
          padding: '8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
            <ShieldCheck size={15} color="#38bdf8" />
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Campus Role Functions (Admin Access):</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onSwitchRole('student')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.08)', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <GraduationCap size={13} /> Student
            </button>
            <button
              type="button"
              onClick={() => onSwitchRole('faculty')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.08)', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <BookOpen size={13} /> Faculty
            </button>
            <button
              type="button"
              onClick={() => onSwitchRole('hod')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.08)', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <ShieldCheck size={13} /> HOD
            </button>
            <button
              type="button"
              onClick={() => onSwitchRole('accounts')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.08)', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <CreditCard size={13} /> Accounts
            </button>
            <button
              type="button"
              onClick={() => onSwitchRole('warden')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.08)', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <Home size={13} /> Warden
            </button>
            <button
              type="button"
              onClick={() => onSwitchRole('canteen')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.08)', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <Utensils size={13} /> Canteen
            </button>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-nav-section-title">Institutional Overview</div>
          <button
            className={`admin-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Layers size={17} /> Dashboard
          </button>

          <div className="admin-nav-section-title">Academic Rosters</div>
          <button
            className={`admin-nav-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <GraduationCap size={17} /> Students
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'faculty' ? 'active' : ''}`}
            onClick={() => setActiveTab('faculty')}
          >
            <Users size={17} /> Faculty
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'hod' ? 'active' : ''}`}
            onClick={() => setActiveTab('hod')}
          >
            <ShieldCheck size={17} /> HOD
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'wardens' ? 'active' : ''}`}
            onClick={() => setActiveTab('wardens')}
          >
            <Home size={17} /> Hostel Wardens
            <span className="admin-badge boys" style={{ marginLeft: 'auto', fontSize: '0.65rem', padding: '1px 6px', borderRadius: '10px' }}>
              Boys &amp; Girls
            </span>
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <ShieldAlert size={17} /> Security Guards
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'canteen' ? 'active' : ''}`}
            onClick={() => setActiveTab('canteen')}
          >
            <Utensils size={17} /> Canteen Staff
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'other-members' ? 'active' : ''}`}
            onClick={() => setActiveTab('other-members')}
          >
            <Wrench size={17} /> Other Members
          </button>

          <div className="admin-nav-section-title">Structure & Curricula</div>
          <button
            className={`admin-nav-btn ${activeTab === 'departments' ? 'active' : ''}`}
            onClick={() => setActiveTab('departments')}
          >
            <Building2 size={17} /> Departments
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'semesters' ? 'active' : ''}`}
            onClick={() => setActiveTab('semesters')}
          >
            <Calendar size={17} /> Semesters
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'sections' ? 'active' : ''}`}
            onClick={() => setActiveTab('sections')}
          >
            <Filter size={17} /> Sections
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            <BookOpen size={17} /> Subjects
          </button>

          <div className="admin-nav-section-title">Evaluation & Compliance</div>
          <button
            className={`admin-nav-btn ${activeTab === 'marking-scheme' ? 'active' : ''}`}
            onClick={() => setActiveTab('marking-scheme')}
          >
            <Sliders size={17} /> Marking Scheme
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'marks' ? 'active' : ''}`}
            onClick={() => setActiveTab('marks')}
          >
            <BarChart2 size={17} /> Marks Module
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit')}
          >
            <Clock size={17} /> Audit Logs
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FileText size={17} /> Reports
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={17} /> Settings
          </button>
        </aside>

        {/* Dynamic Content Pane */}
        <main className="admin-main">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Autonomous College Administration</h2>
                  <p>Welcome back, Administrator. Global statistics and recent institutional activities across 5 departments.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button className="admin-action-btn-secondary" onClick={() => setActiveTab('reports')}>
                    <Download size={15} /> Export Summary
                  </button>
                  <button className="admin-action-btn-primary" onClick={handleOpenAddStudent}>
                    <Plus size={15} /> Quick Add Student
                  </button>
                </div>
              </div>

              {/* KPI Grid */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Total Students</span>
                    <div className="admin-kpi-card-icon blue"><GraduationCap size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{students.length > 90 ? '2,480' : students.length}</div>
                  <small style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendingUp size={13} /> +12% this academic year
                  </small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Total Faculty</span>
                    <div className="admin-kpi-card-icon emerald"><Users size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">146</div>
                  <small style={{ color: '#64748b' }}>Across 5 departments</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Department HODs</span>
                    <div className="admin-kpi-card-icon purple"><ShieldCheck size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{hodList.length}</div>
                  <small style={{ color: '#64748b' }}>All positions staffed</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Departments</span>
                    <div className="admin-kpi-card-icon amber"><Building2 size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{departments.length}</div>
                  <small style={{ color: '#64748b' }}>CSE, ECE, EEE, MECH, CIVIL</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Total Subjects</span>
                    <div className="admin-kpi-card-icon rose"><BookOpen size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">48</div>
                  <small style={{ color: '#64748b' }}>Continuous evaluation active</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Active Semesters</span>
                    <div className="admin-kpi-card-icon blue"><Calendar size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">2</div>
                  <small style={{ color: '#059669', fontWeight: 600 }}>Semester 5 & Semester 7</small>
                </div>
              </div>

              {/* Recent Activities & Quick Navigation */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Recent System Activities</h3>
                    <span className="admin-badge active">Live Feed</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={18} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>Faculty Dr. S. Mohanty updated Data Structures marks</div>
                        <div style={{ fontSize: '0.775rem', color: '#64748b' }}>Quiz 3 marks verified for 91 students in Section A · 15 mins ago</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={18} color="#2563eb" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>HOD Dr. P. K. Pattnaik approved OS internal marks</div>
                        <div style={{ fontSize: '0.775rem', color: '#64748b' }}>CSE Dept · 86 students marked finalized · 1 hour ago</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={18} color="#9333ea" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>New student registration verified</div>
                        <div style={{ fontSize: '0.775rem', color: '#64748b' }}>Rakesh Das (Roll 01) assigned to Sem 5 Sec A · 2 hours ago</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={18} color="#d97706" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>New autonomous course added: CS506</div>
                        <div style={{ fontSize: '0.775rem', color: '#64748b' }}>Software Engineering curriculum updated · Yesterday</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={18} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>Semester 5 Academic Session Activated</div>
                        <div style={{ fontSize: '0.775rem', color: '#64748b' }}>Sections A, B, and C active for 2026-27 session</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Department Health & Marks Submission</h3>
                    <button className="admin-action-btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.775rem' }} onClick={() => setActiveTab('departments')}>
                      View Details
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {departments.map(dept => (
                      <div key={dept.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                          <span style={{ fontWeight: 600, color: '#1e293b' }}>{dept.code} - {dept.name}</span>
                          <span style={{ color: '#2563eb', fontWeight: 600 }}>{dept.studentsCount} Students · {dept.facultyCount} Faculty</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{
                            width: dept.code === 'CSE' ? '92%' : dept.code === 'ECE' ? '84%' : dept.code === 'EEE' ? '78%' : '72%',
                            height: '100%',
                            background: '#2563eb',
                            borderRadius: '9999px'
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENTS MANAGEMENT */}
          {activeTab === 'students' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Student Roster Management</h2>
                  <p>Comprehensive roster of students enrolled in autonomous B.Tech programs. Total: {students.length} students.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button className="admin-action-btn-primary" onClick={handleOpenAddStudent}>
                    <Plus size={15} /> Add New Student
                  </button>
                </div>
              </div>

              {/* Filters toolbar */}
              <div className="admin-card" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
                <div className="admin-toolbar" style={{ margin: 0 }}>
                  <div className="admin-search-wrap">
                    <Search size={16} />
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search by student name, roll number, or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="admin-filters-wrap">
                    <select className="admin-select" value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                      <option value="All">All Departments</option>
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="MECH">MECH</option>
                      <option value="CIVIL">CIVIL</option>
                    </select>

                    <select className="admin-select" value={filterSemester} onChange={e => setFilterSemester(e.target.value)}>
                      <option value="All">All Semesters</option>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 7">Semester 7</option>
                    </select>

                    <select className="admin-select" value={filterSection} onChange={e => setFilterSection(e.target.value)}>
                      <option value="All">All Sections</option>
                      <option value="Section A">Section A</option>
                      <option value="Section B">Section B</option>
                      <option value="Section C">Section C</option>
                    </select>

                    <select className="admin-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>

                    {(searchQuery || filterDept !== 'All' || filterSemester !== 'All' || filterSection !== 'All' || filterStatus !== 'All') && (
                      <button
                        className="admin-action-btn-secondary"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => {
                          setSearchQuery('');
                          setFilterDept('All');
                          setFilterSemester('All');
                          setFilterSection('All');
                          setFilterStatus('All');
                        }}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Students Table */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Student Name</th>
                      <th>Student ID</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Department</th>
                      <th>Semester & Sec</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.slice(0, 25).map(s => (
                      <tr key={s.id}>
                        <td><strong>{s.rollNumber}</strong></td>
                        <td style={{ fontWeight: 600 }}>{s.name}</td>
                        <td><code style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '2px 4px', borderRadius: '4px' }}>{s.studentId}</code></td>
                        <td>{s.email}</td>
                        <td>{s.phone}</td>
                        <td>{s.deptCode || 'CSE'}</td>
                        <td>{s.semester} · {s.section}</td>
                        <td>
                          <span className={`admin-badge ${s.status === 'Active' ? 'active' : 'inactive'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="admin-table-action-btn"
                            title="View Student Details"
                            onClick={() => setViewDetailsItem({ type: 'Student', data: s })}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            className="admin-table-action-btn"
                            title="Edit Student"
                            onClick={() => handleOpenEditStudent(s)}
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="admin-table-action-btn delete"
                            title="Deactivate Student"
                            onClick={() => handleDeleteStudent(s.id, s.name)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                          No students matching your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                <span>Showing {Math.min(25, filteredStudents.length)} of {filteredStudents.length} students</span>
                <span>Sorted by Roll Number</span>
              </div>
            </div>
          )}

          {/* TAB 3: FACULTY MANAGEMENT */}
          {activeTab === 'faculty' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Faculty Management</h2>
                  <p>Manage teaching staff, departmental appointments, and assigned courses/sections.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={handleOpenAddFaculty}>
                  <Plus size={15} /> Add Faculty
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Faculty ID</th>
                      <th>Name</th>
                      <th>Email & Phone</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Assigned Subjects</th>
                      <th>Sections</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyList.map(f => (
                      <tr key={f.id}>
                        <td><strong>{f.id}</strong></td>
                        <td style={{ fontWeight: 600 }}>{f.name}</td>
                        <td>
                          <div>{f.email}</div>
                          <small style={{ color: '#64748b' }}>{f.phone}</small>
                        </td>
                        <td>{f.department}</td>
                        <td><span className="admin-badge active">{f.designation}</span></td>
                        <td>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {(Array.isArray(f.assignedSubjects) ? f.assignedSubjects : [f.assignedSubjects]).map((sub, idx) => (
                              <span key={idx} style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px' }}>
                                {sub}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          {(Array.isArray(f.assignedSections) ? f.assignedSections : [f.assignedSections]).join(', ')}
                        </td>
                        <td><span className={`admin-badge ${f.status === 'Active' ? 'active' : 'inactive'}`}>{f.status}</span></td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="admin-table-action-btn"
                            title="Edit Faculty"
                            onClick={() => {
                              setEditingFaculty(f);
                              setFacultyFormData({
                                ...f,
                                assignedSubjects: Array.isArray(f.assignedSubjects) ? f.assignedSubjects.join(', ') : f.assignedSubjects,
                                assignedSections: Array.isArray(f.assignedSections) ? f.assignedSections.join(', ') : f.assignedSections,
                              });
                              setIsFacultyModalOpen(true);
                            }}
                          >
                            <Edit2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: HOD MANAGEMENT */}
          {activeTab === 'hod' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Head of Department (HOD) Administration</h2>
                  <p>Department leadership, curriculum governance, and marks approval authorities.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={handleOpenAddHod}>
                  <Plus size={15} /> Appoint HOD
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>HOD ID</th>
                      <th>HOD Name</th>
                      <th>Department</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Experience</th>
                      <th>Qualification</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hodList.map(h => (
                      <tr key={h.id}>
                        <td><strong>{h.id}</strong></td>
                        <td style={{ fontWeight: 600 }}>{h.name}</td>
                        <td><span className="admin-badge active">{h.deptCode} - {h.department}</span></td>
                        <td>{h.email}</td>
                        <td>{h.phone}</td>
                        <td>{h.experience}</td>
                        <td>{h.qualification}</td>
                        <td><span className="admin-badge active">{h.status}</span></td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="admin-table-action-btn"
                            title="Edit HOD"
                            onClick={() => {
                              setEditingHod(h);
                              setHodFormData({ ...h });
                              setIsHodModalOpen(true);
                            }}
                          >
                            <Edit2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: HOSTEL WARDENS ROSTER (BOYS & GIRLS) */}
          {activeTab === 'wardens' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <h2>Hostel Wardens Administration</h2>
                    <span className="admin-badge boys" style={{ fontWeight: 700 }}>Boys &amp; Girls Hostels</span>
                  </div>
                  <p>Supervise residential hostel administration, student welfare, room allocation, and night curfew enforcement.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button className="admin-action-btn-primary" onClick={handleOpenAddWarden}>
                    <Plus size={15} /> Appoint Hostel Warden
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Total Wardens</span>
                    <div className="admin-kpi-card-icon purple"><Home size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{wardenList.length}</div>
                  <small style={{ color: '#64748b' }}>Residential staff appointed</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Boys Hostel Wardens</span>
                    <div className="admin-kpi-card-icon blue"><Users size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">
                    {wardenList.filter(w => w.hostelCategory === 'Boys Hostel').length}
                  </div>
                  <small style={{ color: '#1d4ed8', fontWeight: 600 }}>Gandhi &amp; Kalam Residences</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Girls Hostel Wardens</span>
                    <div className="admin-kpi-card-icon rose"><Users size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">
                    {wardenList.filter(w => w.hostelCategory === 'Girls Hostel').length}
                  </div>
                  <small style={{ color: '#be185d', fontWeight: 600 }}>Sarojini &amp; Kalpana Residences</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Total Residents Supervised</span>
                    <div className="admin-kpi-card-icon emerald"><GraduationCap size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">
                    {wardenList.reduce((acc, curr) => acc + Number(curr.residentsCount || 0), 0)}
                  </div>
                  <small style={{ color: '#059669', fontWeight: 600 }}>Across 4 Hostels</small>
                </div>
              </div>

              {/* Filter Toolbar */}
              <div className="admin-card" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
                <div className="admin-toolbar" style={{ margin: 0 }}>
                  <div className="admin-search-wrap">
                    <Search size={16} />
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search warden name, assigned hostel, phone..."
                      value={wardenSearch}
                      onChange={(e) => setWardenSearch(e.target.value)}
                    />
                  </div>

                  <div className="admin-filters-wrap">
                    <div className="admin-filter-pills">
                      <button
                        className={`admin-filter-pill-btn ${wardenFilterCategory === 'All' ? 'active' : ''}`}
                        onClick={() => setWardenFilterCategory('All')}
                      >
                        All Wardens ({wardenList.length})
                      </button>
                      <button
                        className={`admin-filter-pill-btn ${wardenFilterCategory === 'Boys Hostel' ? 'active' : ''}`}
                        onClick={() => setWardenFilterCategory('Boys Hostel')}
                      >
                        <span style={{ color: '#1d4ed8' }}>●</span> Boys Hostel ({wardenList.filter(w => w.hostelCategory === 'Boys Hostel').length})
                      </button>
                      <button
                        className={`admin-filter-pill-btn ${wardenFilterCategory === 'Girls Hostel' ? 'active' : ''}`}
                        onClick={() => setWardenFilterCategory('Girls Hostel')}
                      >
                        <span style={{ color: '#be185d' }}>●</span> Girls Hostel ({wardenList.filter(w => w.hostelCategory === 'Girls Hostel').length})
                      </button>
                    </div>

                    {(wardenSearch || wardenFilterCategory !== 'All') && (
                      <button
                        className="admin-action-btn-secondary"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => {
                          setWardenSearch('');
                          setWardenFilterCategory('All');
                        }}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Wardens Table */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Warden ID</th>
                      <th>Warden Name</th>
                      <th>Hostel Category</th>
                      <th>Assigned Residence</th>
                      <th>Office / Cabin</th>
                      <th>Duty Schedule</th>
                      <th>Contact Phone &amp; Email</th>
                      <th>Capacity</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWardens.map(w => (
                      <tr key={w.id}>
                        <td><strong>{w.id}</strong></td>
                        <td style={{ fontWeight: 600 }}>{w.name}</td>
                        <td>
                          <span className={`admin-badge ${w.hostelCategory === 'Boys Hostel' ? 'boys' : 'girls'}`}>
                            {w.hostelCategory}
                          </span>
                        </td>
                        <td style={{ fontWeight: 500, color: '#1e293b' }}>{w.assignedHostel}</td>
                        <td style={{ color: '#64748b' }}>{w.roomOffice}</td>
                        <td>
                          <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#475569' }}>
                            {w.shift}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 500 }}>{w.phone}</div>
                          <small style={{ color: '#64748b' }}>{w.email}</small>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600, color: '#059669' }}>{w.residentsCount}</span>
                          <span style={{ color: '#94a3b8' }}> / {w.totalBeds} beds</span>
                        </td>
                        <td>
                          <span className={`admin-badge ${w.status === 'Active' ? 'active' : 'inactive'}`}>
                            {w.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="admin-table-action-btn"
                            title="View Warden Profile"
                            onClick={() => setViewDetailsItem({ type: 'Warden', data: w })}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            className="admin-table-action-btn"
                            title="Edit Warden"
                            onClick={() => handleOpenEditWarden(w)}
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="admin-table-action-btn delete"
                            title="Remove Warden"
                            onClick={() => handleDeleteWarden(w.id, w.name)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredWardens.length === 0 && (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                          No wardens found matching criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: SECURITY GUARDS ROSTER */}
          {activeTab === 'security' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <h2>Security Personnel &amp; Gate Duty Roster</h2>
                    <span className="admin-badge active" style={{ fontWeight: 700 }}>24x7 Campus Vigilance</span>
                  </div>
                  <p>Campus perimeter protection, access control points, night patrols, and emergency response coverage.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={handleOpenAddSecurity}>
                  <Plus size={15} /> Add Security Guard
                </button>
              </div>

              {/* KPI Cards */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Total Security Force</span>
                    <div className="admin-kpi-card-icon blue"><ShieldAlert size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{securityGuards.length}</div>
                  <small style={{ color: '#64748b' }}>Contracted &amp; verified guards</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Active On Duty</span>
                    <div className="admin-kpi-card-icon emerald"><CheckCircle2 size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">
                    {securityGuards.filter(g => g.status === 'On Duty').length}
                  </div>
                  <small style={{ color: '#059669', fontWeight: 600 }}>Currently at check-posts</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Campus Posts Covered</span>
                    <div className="admin-kpi-card-icon purple"><Building2 size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">5</div>
                  <small style={{ color: '#64748b' }}>Main Gate, Girls/Boys Hostels, Academic</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Night Patrol Squad</span>
                    <div className="admin-kpi-card-icon amber"><Clock size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">
                    {securityGuards.filter(g => g.shift.toLowerCase().includes('night')).length}
                  </div>
                  <small style={{ color: '#d97706', fontWeight: 600 }}>Active 10:00 PM - 06:00 AM</small>
                </div>
              </div>

              {/* Filter Toolbar */}
              <div className="admin-card" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
                <div className="admin-toolbar" style={{ margin: 0 }}>
                  <div className="admin-search-wrap">
                    <Search size={16} />
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search by guard name, badge number, post location..."
                      value={securitySearch}
                      onChange={(e) => setSecuritySearch(e.target.value)}
                    />
                  </div>

                  <div className="admin-filters-wrap">
                    <select
                      className="admin-select"
                      value={securityFilterShift}
                      onChange={e => setSecurityFilterShift(e.target.value)}
                    >
                      <option value="All">All Shifts</option>
                      <option value="Morning">Morning Shift (06:00 AM - 02:00 PM)</option>
                      <option value="Evening">Evening Shift (02:00 PM - 10:00 PM)</option>
                      <option value="Night">Night Patrol (10:00 PM - 06:00 AM)</option>
                    </select>

                    <select
                      className="admin-select"
                      value={securityFilterStatus}
                      onChange={e => setSecurityFilterStatus(e.target.value)}
                    >
                      <option value="All">All Statuses</option>
                      <option value="On Duty">On Duty</option>
                      <option value="On Leave">On Leave</option>
                    </select>

                    {(securitySearch || securityFilterShift !== 'All' || securityFilterStatus !== 'All') && (
                      <button
                        className="admin-action-btn-secondary"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => {
                          setSecuritySearch('');
                          setSecurityFilterShift('All');
                          setSecurityFilterStatus('All');
                        }}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Security Table */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Guard ID</th>
                      <th>Badge No</th>
                      <th>Security Guard Name</th>
                      <th>Assigned Post / Gate</th>
                      <th>Shift Schedule</th>
                      <th>Contact Phone</th>
                      <th>Emergency Contact</th>
                      <th>Agency</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSecurity.map(g => (
                      <tr key={g.id}>
                        <td><strong>{g.id}</strong></td>
                        <td>
                          <code style={{ fontSize: '0.75rem', background: '#eff6ff', color: '#1d4ed8', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                            {g.badgeNumber}
                          </code>
                        </td>
                        <td style={{ fontWeight: 600 }}>
                          {g.name}
                          {g.bloodGroup && (
                            <span style={{ marginLeft: '6px', fontSize: '0.7rem', color: '#94a3b8' }}>({g.bloodGroup})</span>
                          )}
                        </td>
                        <td>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#0f172a', fontWeight: 500 }}>
                            <MapPin size={13} color="#2563eb" /> {g.postLocation}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-badge ${g.shift.toLowerCase().includes('night') ? 'night' : 'duty'}`}>
                            {g.shift}
                          </span>
                        </td>
                        <td>{g.phone}</td>
                        <td style={{ color: '#e11d48', fontWeight: 500 }}>{g.emergencyContact}</td>
                        <td style={{ color: '#64748b' }}>{g.assignedAgency}</td>
                        <td>
                          <span className={`admin-badge ${g.status === 'On Duty' ? 'active' : 'inactive'}`}>
                            {g.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="admin-table-action-btn"
                            title="View Guard Details"
                            onClick={() => setViewDetailsItem({ type: 'Security', data: g })}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            className="admin-table-action-btn"
                            title="Edit Guard"
                            onClick={() => handleOpenEditSecurity(g)}
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="admin-table-action-btn delete"
                            title="Remove Guard"
                            onClick={() => handleDeleteSecurity(g.id, g.name)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredSecurity.length === 0 && (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                          No security guards match the filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: CANTEEN & MESS STAFF ROSTER */}
          {activeTab === 'canteen' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <h2>Canteen &amp; Dining Staff Roster</h2>
                    <span className="admin-badge active" style={{ fontWeight: 700 }}>FSSAI Certified Operations</span>
                  </div>
                  <p>Manage central food court staff, hostel mess kitchen crews, counters, hygiene certifications, and meal services.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={handleOpenAddCanteen}>
                  <Plus size={15} /> Add Canteen Staff
                </button>
              </div>

              {/* KPI Cards */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Total Canteen Personnel</span>
                    <div className="admin-kpi-card-icon amber"><Utensils size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{canteenStaff.length}</div>
                  <small style={{ color: '#64748b' }}>Mess &amp; food court employees</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Chefs &amp; Culinary Leads</span>
                    <div className="admin-kpi-card-icon emerald"><Coffee size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">
                    {canteenStaff.filter(c => c.role.toLowerCase().includes('chef') || c.role.toLowerCase().includes('cook')).length}
                  </div>
                  <small style={{ color: '#059669', fontWeight: 600 }}>Active preparation staff</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Mess &amp; Dining Outlets</span>
                    <div className="admin-kpi-card-icon blue"><Building2 size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">4</div>
                  <small style={{ color: '#64748b' }}>Food Court, Mess A, Girls Mess, Cafe</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Hygiene Compliance</span>
                    <div className="admin-kpi-card-icon purple"><ShieldCheck size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">100%</div>
                  <small style={{ color: '#9333ea', fontWeight: 600 }}>FSSAI state health clearance</small>
                </div>
              </div>

              {/* Filter Toolbar */}
              <div className="admin-card" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
                <div className="admin-toolbar" style={{ margin: 0 }}>
                  <div className="admin-search-wrap">
                    <Search size={16} />
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search canteen staff by name, role, outlet..."
                      value={canteenSearch}
                      onChange={(e) => setCanteenSearch(e.target.value)}
                    />
                  </div>

                  <div className="admin-filters-wrap">
                    <select
                      className="admin-select"
                      value={canteenFilterOutlet}
                      onChange={e => setCanteenFilterOutlet(e.target.value)}
                    >
                      <option value="All">All Dining Outlets</option>
                      <option value="Food Court">Central Food Court</option>
                      <option value="Dining Hall A">Hostel Dining Hall A</option>
                      <option value="Girls Hostel">Girls Hostel Dining</option>
                      <option value="Cafeteria">Cafeteria Counter</option>
                    </select>

                    {(canteenSearch || canteenFilterOutlet !== 'All') && (
                      <button
                        className="admin-action-btn-secondary"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => {
                          setCanteenSearch('');
                          setCanteenFilterOutlet('All');
                        }}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Canteen Table */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Staff ID</th>
                      <th>Name</th>
                      <th>Designation / Role</th>
                      <th>Dining Outlet / Kitchen</th>
                      <th>Shift Schedule</th>
                      <th>Phone</th>
                      <th>FSSAI License &amp; Speciality</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCanteen.map(c => (
                      <tr key={c.id}>
                        <td><strong>{c.id}</strong></td>
                        <td style={{ fontWeight: 600 }}>{c.name}</td>
                        <td>
                          <span className="admin-badge active">{c.role}</span>
                        </td>
                        <td style={{ fontWeight: 500, color: '#1e293b' }}>{c.outlet}</td>
                        <td style={{ color: '#475569' }}>{c.shift}</td>
                        <td>{c.phone}</td>
                        <td>
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#047857' }}>{c.fssaiLicense}</div>
                          <small style={{ color: '#64748b' }}>{c.speciality}</small>
                        </td>
                        <td>
                          <span className={`admin-badge ${c.status === 'Active' ? 'active' : 'inactive'}`}>
                            {c.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="admin-table-action-btn"
                            title="View Canteen Staff"
                            onClick={() => setViewDetailsItem({ type: 'Canteen', data: c })}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            className="admin-table-action-btn"
                            title="Edit Staff Member"
                            onClick={() => handleOpenEditCanteen(c)}
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="admin-table-action-btn delete"
                            title="Remove Member"
                            onClick={() => handleDeleteCanteen(c.id, c.name)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredCanteen.length === 0 && (
                      <tr>
                        <td colSpan="9" style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                          No canteen staff records found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: OTHER CAMPUS SUPPORT MEMBERS */}
          {activeTab === 'other-members' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <h2>Campus Support &amp; Maintenance Staff Roster</h2>
                    <span className="admin-badge active" style={{ fontWeight: 700 }}>Facility Operations</span>
                  </div>
                  <p>Duty rosters for electricians, plumbers, housekeeping supervisors, lab technicians, IT support, and library attendants.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={handleOpenAddOtherStaff}>
                  <Plus size={15} /> Add Campus Member
                </button>
              </div>

              {/* KPI Cards */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Total Support Staff</span>
                    <div className="admin-kpi-card-icon blue"><Wrench size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{otherStaff.length}</div>
                  <small style={{ color: '#64748b' }}>Technical &amp; utility crew</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">24x7 Emergency On-Call</span>
                    <div className="admin-kpi-card-icon rose"><AlertTriangle size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">
                    {otherStaff.filter(s => s.emergencyDuty && s.emergencyDuty.toLowerCase().includes('yes')).length}
                  </div>
                  <small style={{ color: '#e11d48', fontWeight: 600 }}>Power, water, transport hotlines</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Campus Zones Serviced</span>
                    <div className="admin-kpi-card-icon purple"><Building2 size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">5</div>
                  <small style={{ color: '#64748b' }}>Academic, Labs, Hostels, Admin</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Operational Status</span>
                    <div className="admin-kpi-card-icon emerald"><CheckCircle2 size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">Active</div>
                  <small style={{ color: '#059669', fontWeight: 600 }}>100% staff attendance today</small>
                </div>
              </div>

              {/* Filter Toolbar */}
              <div className="admin-card" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
                <div className="admin-toolbar" style={{ margin: 0 }}>
                  <div className="admin-search-wrap">
                    <Search size={16} />
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search by staff name, trade category, zone..."
                      value={otherStaffSearch}
                      onChange={(e) => setOtherStaffSearch(e.target.value)}
                    />
                  </div>

                  <div className="admin-filters-wrap">
                    <select
                      className="admin-select"
                      value={otherStaffFilterCategory}
                      onChange={e => setOtherStaffFilterCategory(e.target.value)}
                    >
                      <option value="All">All Trades &amp; Categories</option>
                      <option value="Electrician & Power Maintenance">Electricians</option>
                      <option value="Plumber & Water Works">Plumbers</option>
                      <option value="Housekeeping Supervisor">Housekeeping</option>
                      <option value="Senior Lab Technician">Lab Technicians</option>
                      <option value="Senior Library Attendant">Library Staff</option>
                      <option value="Transport & Bus Supervisor">Transport &amp; Bus</option>
                    </select>

                    {(otherStaffSearch || otherStaffFilterCategory !== 'All') && (
                      <button
                        className="admin-action-btn-secondary"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => {
                          setOtherStaffSearch('');
                          setOtherStaffFilterCategory('All');
                        }}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Other Staff Table */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Staff ID</th>
                      <th>Name</th>
                      <th>Category / Trade</th>
                      <th>Assigned Campus Zone</th>
                      <th>Duty Shift</th>
                      <th>Contact Phone</th>
                      <th>Emergency On-Call</th>
                      <th>Qualifications</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOtherStaff.map(s => (
                      <tr key={s.id}>
                        <td><strong>{s.id}</strong></td>
                        <td style={{ fontWeight: 600 }}>{s.name}</td>
                        <td>
                          <span className="admin-badge active">{s.category}</span>
                        </td>
                        <td style={{ color: '#1e293b', fontWeight: 500 }}>{s.zone}</td>
                        <td style={{ color: '#475569' }}>{s.shift}</td>
                        <td>{s.phone}</td>
                        <td>
                          <span className={`admin-badge ${s.emergencyDuty && s.emergencyDuty.toLowerCase().includes('yes') ? 'amber' : 'inactive'}`}>
                            {s.emergencyDuty}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.775rem', color: '#64748b' }}>{s.qualification}</td>
                        <td>
                          <span className={`admin-badge ${s.status === 'Active' ? 'active' : 'inactive'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="admin-table-action-btn"
                            title="View Staff Profile"
                            onClick={() => setViewDetailsItem({ type: 'OtherStaff', data: s })}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            className="admin-table-action-btn"
                            title="Edit Staff Member"
                            onClick={() => handleOpenEditOtherStaff(s)}
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="admin-table-action-btn delete"
                            title="Remove Member"
                            onClick={() => handleDeleteOtherStaff(s.id, s.name)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredOtherStaff.length === 0 && (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                          No staff records found matching the filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: DEPARTMENTS MANAGEMENT */}
          {activeTab === 'departments' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Department Management</h2>
                  <p>Academic branches under GIFT Autonomous Engineering & Technology faculties.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {departments.map(dept => (
                  <div key={dept.id} className="admin-card" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <span className="admin-badge active" style={{ fontSize: '0.85rem' }}>{dept.code}</span>
                      <span className="admin-badge active">Active Dept</span>
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#0f172a' }}>{dept.name}</h3>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                      Head: <strong>{dept.hod}</strong> ({dept.hodEmail})
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e3a8a' }}>{dept.studentsCount}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Students</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#059669' }}>{dept.facultyCount}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Faculty</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#9333ea' }}>{dept.subjectsCount}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Subjects</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SEMESTER MANAGEMENT */}
          {activeTab === 'semesters' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Semester Management</h2>
                  <p>Activate, close, or configure continuous evaluation academic semesters (1 to 8).</p>
                </div>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Semester</th>
                      <th>Academic Year</th>
                      <th>Year Level</th>
                      <th>Subjects Enrolled</th>
                      <th>Active Students</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semesters.map(sem => (
                      <tr key={sem.id}>
                        <td><strong>{sem.label}</strong></td>
                        <td>{sem.academicYear}</td>
                        <td>{sem.year}</td>
                        <td>{sem.subjectsCount} Continuous Evaluation Subjects</td>
                        <td>{sem.studentsCount} Students</td>
                        <td>
                          <span className={`admin-badge ${sem.status === 'Active' ? 'active' : sem.status === 'Closed' ? 'closed' : 'upcoming'}`}>
                            {sem.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="admin-action-btn-secondary"
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.775rem' }}
                            onClick={() => toggleSemesterStatus(sem.id)}
                          >
                            {sem.status === 'Active' ? 'Close Term' : 'Activate Term'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: SECTION MANAGEMENT */}
          {activeTab === 'sections' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Section Management</h2>
                  <p>Manage classroom cohorts, student capacity distributions, and section mentors.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {sections.map(sec => (
                  <div key={sec.id} className="admin-card" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span className="admin-badge active">{sec.semester}</span>
                      <strong style={{ fontSize: '1.25rem', color: '#1e3a8a' }}>Sec {sec.section}</strong>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', margin: '0.5rem 0' }}>
                      {sec.studentsCount} Students
                    </div>
                    <div style={{ fontSize: '0.825rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div>Department: <strong>{sec.department}</strong></div>
                      <div>Room: <strong>{sec.room}</strong></div>
                      <div>Coordinator: <strong>{sec.facultyCoordinator}</strong></div>
                      <div>Class Rep: <strong>{sec.classRepresentative}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SUBJECT MANAGEMENT */}
          {activeTab === 'subjects' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Autonomous Subject Management</h2>
                  <p>Configure course codes, credit schemes, theory/practical classification, and assigned faculty.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={() => setIsSubjectModalOpen(true)}>
                  <Plus size={15} /> Add Subject
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Subject Name</th>
                      <th>Department</th>
                      <th>Semester</th>
                      <th>Credits</th>
                      <th>Type</th>
                      <th>Assigned Faculty</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map(s => (
                      <tr key={s.id}>
                        <td><code style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e3a8a' }}>{s.code}</code></td>
                        <td style={{ fontWeight: 600 }}>{s.name}</td>
                        <td><span className="admin-badge active">{s.department}</span></td>
                        <td>{s.semester}</td>
                        <td>{s.credits} Credits</td>
                        <td><span className="admin-badge active">{s.type}</span></td>
                        <td style={{ color: '#2563eb', fontWeight: 500 }}>{s.assignedFaculty}</td>
                        <td><span className="admin-badge active">{s.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: MARKING SCHEME CONFIGURATION */}
          {activeTab === 'marking-scheme' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Configurable Marking Scheme & Autonomous Guidelines</h2>
                  <p>Customize assessment quantities, maximum marks, and percentage weightages without hardcoding.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={() => showToast('Autonomous marking scheme saved and applied to continuous evaluation engines.')}>
                  Save Scheme Configuration
                </button>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Continuous Internal Assessment (CIA) Structure</h3>
                  <span className="admin-badge active">
                    Total Weightage: {markingScheme.reduce((acc, curr) => acc + curr.weightage, 0)}%
                  </span>
                </div>
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Assessment Component</th>
                        <th>Number of Tests</th>
                        <th>Max Marks Each</th>
                        <th>Weightage (%)</th>
                        <th>Computation Formula</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {markingScheme.map(item => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: 600 }}>{item.assessmentType}</td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={item.count}
                              onChange={e => handleSchemeChange(item.id, 'count', e.target.value)}
                              style={{ width: '60px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="5"
                              max="100"
                              value={item.maxMarks}
                              onChange={e => handleSchemeChange(item.id, 'maxMarks', e.target.value)}
                              style={{ width: '70px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                            />
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={item.weightage}
                                onChange={e => handleSchemeChange(item.id, 'weightage', e.target.value)}
                                style={{ width: '60px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                              />
                              <span>%</span>
                            </div>
                          </td>
                          <td><span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.formula}</span></td>
                          <td><span className="admin-badge active">{item.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: '1rem', background: '#eff6ff', padding: '0.85rem', borderRadius: '8px', color: '#1e3a8a', fontSize: '0.85rem' }}>
                  <strong>Autonomous Regulation Note:</strong> Modular Exams (2 × 20) account for 30%, Quizzes (6 × 10) account for 20%, Assignments (2 × 10) 10%, Surprise Tests (2 × 10) 10%, and Lab Experiments (10) 30%. Internal Marks are normalized to 100%.
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: MARKS MODULE (EMBEDDED) */}
          {activeTab === 'marks' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Institutional Marks Management Module</h2>
                  <p>Direct view into faculty grading sheets, continuous evaluation statistics, and class matrix.</p>
                </div>
              </div>
              <MarksManagementModule initialRole="teacher" />
            </div>
          )}

          {/* TAB 11: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Institutional Audit History</h2>
                  <p>Comprehensive audit trail tracking every modification to student marks, evaluator identity, and reasons.</p>
                </div>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Evaluator / Authority</th>
                      <th>Role</th>
                      <th>Target Student / Scope</th>
                      <th>Subject</th>
                      <th>Assessment</th>
                      <th>Old Value</th>
                      <th>New Value</th>
                      <th>Timestamp</th>
                      <th>Reason / Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map(log => (
                      <tr key={log.id}>
                        <td style={{ fontWeight: 600 }}>{log.user}</td>
                        <td><span className="admin-badge active">{log.role}</span></td>
                        <td>{log.targetStudent}</td>
                        <td><strong>{log.subject}</strong></td>
                        <td>{log.assessment}</td>
                        <td><del style={{ color: '#e11d48' }}>{log.oldMark}</del></td>
                        <td><strong style={{ color: '#059669' }}>{log.newMark}</strong></td>
                        <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{log.changedAt}</td>
                        <td style={{ fontSize: '0.825rem', color: '#334155' }}><em>"{log.reason}"</em></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 12: REPORTS */}
          {activeTab === 'reports' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>College Performance & Reports</h2>
                  <p>Download institutional grade sheets, department comparisons, and semester compliance audits.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                <div className="admin-card">
                  <h3 className="admin-card-title">College-wide Performance Report</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 1rem 0' }}>
                    Aggregate performance metrics across all 5 departments for Academic Year 2026-27.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="admin-action-btn-primary" onClick={() => {
                      downloadAdminReportPdf('College-wide Performance Report');
                      showToast('Generated & downloaded College-wide Performance PDF Report.');
                    }}>
                      <Download size={15} /> Download PDF
                    </button>
                    <button className="admin-action-btn-secondary" onClick={() => showToast('Exported CSV dataset.')}>
                      Excel / CSV
                    </button>
                  </div>
                </div>

                <div className="admin-card">
                  <h3 className="admin-card-title">Department Comparison Report</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 1rem 0' }}>
                    Comparative analysis of CSE, ECE, EEE, MECH, and CIVIL marks distributions and pass percentages.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="admin-action-btn-primary" onClick={() => {
                      downloadAdminReportPdf('Department Comparison Report');
                      showToast('Generated & downloaded Department Comparison PDF.');
                    }}>
                      <Download size={15} /> Download PDF
                    </button>
                    <button className="admin-action-btn-secondary" onClick={() => showToast('Exported CSV dataset.')}>
                      Excel / CSV
                    </button>
                  </div>
                </div>

                <div className="admin-card">
                  <h3 className="admin-card-title">Semester 5 CIA Audit Sheet</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 1rem 0' }}>
                    Audit sheet containing 91 students × 13 continuous assessment marks with HOD verification seals.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="admin-action-btn-primary" onClick={() => {
                      downloadAdminReportPdf('Semester 5 CIA Official Gazette & Audit Sheet');
                      showToast('Generated & downloaded Semester 5 CIA Official Gazette PDF.');
                    }}>
                      <Download size={15} /> Download PDF
                    </button>
                    <button className="admin-action-btn-secondary" onClick={() => showToast('Exported CSV dataset.')}>
                      Excel / CSV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Autonomous System Configuration</h2>
                  <p>Institution metadata, grading boundaries, and academic year settings.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={() => showToast('Institutional settings saved.')}>
                  Save Settings
                </button>
              </div>

              <div className="admin-card" style={{ maxWidth: '700px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="admin-form-group">
                    <label>Institution Name</label>
                    <input type="text" className="admin-form-input" defaultValue="Gandhi Institute For Technology (GIFT) Autonomous, Bhubaneswar" />
                  </div>
                  <div className="admin-form-group">
                    <label>Affiliating University</label>
                    <input type="text" className="admin-form-input" defaultValue="Biju Patnaik University of Technology (BPUT)" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="admin-form-group">
                      <label>Academic Year</label>
                      <input type="text" className="admin-form-input" defaultValue="2026-27" />
                    </div>
                    <div className="admin-form-group">
                      <label>Autonomous Pass Mark (%)</label>
                      <input type="number" className="admin-form-input" defaultValue="40" />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label>Internal Mark Approval Deadline</label>
                    <input type="date" className="admin-form-input" defaultValue="2026-10-31" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT STUDENT */}
      {isStudentModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
              <button className="admin-table-action-btn" onClick={() => setIsStudentModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveStudent}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Roll Number</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={studentFormData.rollNumber}
                      onChange={e => setStudentFormData({ ...studentFormData, rollNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={studentFormData.name}
                      onChange={e => setStudentFormData({ ...studentFormData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="admin-form-input"
                      value={studentFormData.email}
                      onChange={e => setStudentFormData({ ...studentFormData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={studentFormData.phone}
                      onChange={e => setStudentFormData({ ...studentFormData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Department</label>
                    <select
                      className="admin-form-select"
                      value={studentFormData.deptCode}
                      onChange={e => setStudentFormData({ ...studentFormData, deptCode: e.target.value, department: e.target.value === 'CSE' ? 'Computer Science & Engineering' : e.target.value })}
                    >
                      <option value="CSE">CSE - Computer Science & Engineering</option>
                      <option value="ECE">ECE - Electronics & Comm</option>
                      <option value="EEE">EEE - Electrical & Electronics</option>
                      <option value="MECH">MECH - Mechanical Engg</option>
                      <option value="CIVIL">CIVIL - Civil Engg</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Semester</label>
                    <select
                      className="admin-form-select"
                      value={studentFormData.semester}
                      onChange={e => setStudentFormData({ ...studentFormData, semester: e.target.value })}
                    >
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                      <option value="Semester 7">Semester 7</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Section</label>
                    <select
                      className="admin-form-select"
                      value={studentFormData.section}
                      onChange={e => setStudentFormData({ ...studentFormData, section: e.target.value })}
                    >
                      <option value="Section A">Section A</option>
                      <option value="Section B">Section B</option>
                      <option value="Section C">Section C</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Status</label>
                    <select
                      className="admin-form-select"
                      value={studentFormData.status}
                      onChange={e => setStudentFormData({ ...studentFormData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-btn-secondary" onClick={() => setIsStudentModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn-primary">
                  {editingStudent ? 'Save Changes' : 'Create Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT FACULTY */}
      {isFacultyModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>{editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}</h3>
              <button className="admin-table-action-btn" onClick={() => setIsFacultyModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveFaculty}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={facultyFormData.name}
                    onChange={e => setFacultyFormData({ ...facultyFormData, name: e.target.value })}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="admin-form-input"
                      value={facultyFormData.email}
                      onChange={e => setFacultyFormData({ ...facultyFormData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={facultyFormData.phone}
                      onChange={e => setFacultyFormData({ ...facultyFormData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Department</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={facultyFormData.department}
                      onChange={e => setFacultyFormData({ ...facultyFormData, department: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Designation</label>
                    <select
                      className="admin-form-select"
                      value={facultyFormData.designation}
                      onChange={e => setFacultyFormData({ ...facultyFormData, designation: e.target.value })}
                    >
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Professor">Professor</option>
                    </select>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Assigned Subjects (comma-separated)</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={facultyFormData.assignedSubjects}
                    onChange={e => setFacultyFormData({ ...facultyFormData, assignedSubjects: e.target.value })}
                    placeholder="e.g. Data Structures, Operating Systems"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Assigned Sections (comma-separated)</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={facultyFormData.assignedSections}
                    onChange={e => setFacultyFormData({ ...facultyFormData, assignedSections: e.target.value })}
                    placeholder="e.g. Sem 5 - Sec A, Sem 5 - Sec B"
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-btn-secondary" onClick={() => setIsFacultyModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn-primary">
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT HOD */}
      {isHodModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>{editingHod ? 'Edit HOD' : 'Appoint Head of Department'}</h3>
              <button className="admin-table-action-btn" onClick={() => setIsHodModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveHod}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>HOD Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={hodFormData.name}
                    onChange={e => setHodFormData({ ...hodFormData, name: e.target.value })}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="admin-form-input"
                      value={hodFormData.email}
                      onChange={e => setHodFormData({ ...hodFormData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Department Code</label>
                    <select
                      className="admin-form-select"
                      value={hodFormData.deptCode}
                      onChange={e => setHodFormData({ ...hodFormData, deptCode: e.target.value, department: e.target.value })}
                    >
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="MECH">MECH</option>
                      <option value="CIVIL">CIVIL</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Experience</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={hodFormData.experience}
                      onChange={e => setHodFormData({ ...hodFormData, experience: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Qualification</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={hodFormData.qualification}
                      onChange={e => setHodFormData({ ...hodFormData, qualification: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-btn-secondary" onClick={() => setIsHodModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn-primary">
                  Save HOD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD SUBJECT */}
      {isSubjectModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>Add Autonomous Subject</h3>
              <button className="admin-table-action-btn" onClick={() => setIsSubjectModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveSubject}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Subject Code</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. CS507"
                      value={subjectFormData.code}
                      onChange={e => setSubjectFormData({ ...subjectFormData, code: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Subject Name</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. Cloud Computing"
                      value={subjectFormData.name}
                      onChange={e => setSubjectFormData({ ...subjectFormData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Credits</label>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      className="admin-form-input"
                      value={subjectFormData.credits}
                      onChange={e => setSubjectFormData({ ...subjectFormData, credits: Number(e.target.value) })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Type</label>
                    <select
                      className="admin-form-select"
                      value={subjectFormData.type}
                      onChange={e => setSubjectFormData({ ...subjectFormData, type: e.target.value })}
                    >
                      <option value="Theory">Theory</option>
                      <option value="Theory + Lab">Theory + Lab</option>
                      <option value="Lab Only">Lab Only</option>
                    </select>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Assigned Faculty</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={subjectFormData.assignedFaculty}
                    onChange={e => setSubjectFormData({ ...subjectFormData, assignedFaculty: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-btn-secondary" onClick={() => setIsSubjectModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn-primary">
                  Create Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT HOSTEL WARDEN */}
      {isWardenModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Home size={18} color="#2563eb" />
                <h3>{editingWarden ? 'Edit Hostel Warden' : 'Appoint Hostel Warden'}</h3>
              </div>
              <button className="admin-table-action-btn" onClick={() => setIsWardenModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveWarden}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Warden Full Name</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. Mr. Rajesh Jena"
                      value={wardenFormData.name}
                      onChange={e => setWardenFormData({ ...wardenFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Gender</label>
                    <select
                      className="admin-form-select"
                      value={wardenFormData.gender}
                      onChange={e => {
                        const newGender = e.target.value;
                        setWardenFormData({
                          ...wardenFormData,
                          gender: newGender,
                          hostelCategory: newGender === 'Female' ? 'Girls Hostel' : 'Boys Hostel'
                        });
                      }}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Hostel Category (Boys / Girls)</label>
                    <select
                      className="admin-form-select"
                      value={wardenFormData.hostelCategory}
                      onChange={e => setWardenFormData({ ...wardenFormData, hostelCategory: e.target.value })}
                    >
                      <option value="Boys Hostel">Boys Hostel</option>
                      <option value="Girls Hostel">Girls Hostel</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Assigned Hostel Residence</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. Gandhi Boys Residence (Hostel 1)"
                      value={wardenFormData.assignedHostel}
                      onChange={e => setWardenFormData({ ...wardenFormData, assignedHostel: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Office / Residence Cabin</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. Ground Floor, Office Room 04"
                      value={wardenFormData.roomOffice}
                      onChange={e => setWardenFormData({ ...wardenFormData, roomOffice: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Duty / Shift Hours</label>
                    <select
                      className="admin-form-select"
                      value={wardenFormData.shift}
                      onChange={e => setWardenFormData({ ...wardenFormData, shift: e.target.value })}
                    >
                      <option value="24x7 Resident Duty">24x7 Resident Duty (On-Campus)</option>
                      <option value="Day Shift (08:00 AM - 08:00 PM)">Day Shift (08:00 AM - 08:00 PM)</option>
                      <option value="Evening & Night Shift (04:00 PM - 08:00 AM)">Evening &amp; Night Shift (04:00 PM - 08:00 AM)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Contact Phone Number</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="+91 94370 00000"
                      value={wardenFormData.phone}
                      onChange={e => setWardenFormData({ ...wardenFormData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Official Email</label>
                    <input
                      type="email"
                      className="admin-form-input"
                      placeholder="warden@gift.edu.in"
                      value={wardenFormData.email}
                      onChange={e => setWardenFormData({ ...wardenFormData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Residents Supervised</label>
                    <input
                      type="number"
                      className="admin-form-input"
                      value={wardenFormData.residentsCount}
                      onChange={e => setWardenFormData({ ...wardenFormData, residentsCount: Number(e.target.value) })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Total Hostel Beds</label>
                    <input
                      type="number"
                      className="admin-form-input"
                      value={wardenFormData.totalBeds}
                      onChange={e => setWardenFormData({ ...wardenFormData, totalBeds: Number(e.target.value) })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Status</label>
                    <select
                      className="admin-form-select"
                      value={wardenFormData.status}
                      onChange={e => setWardenFormData({ ...wardenFormData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-btn-secondary" onClick={() => setIsWardenModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn-primary">
                  {editingWarden ? 'Save Changes' : 'Appoint Warden'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT SECURITY GUARD */}
      {isSecurityModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={18} color="#2563eb" />
                <h3>{editingSecurity ? 'Edit Security Guard' : 'Add Security Personnel'}</h3>
              </div>
              <button className="admin-table-action-btn" onClick={() => setIsSecurityModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveSecurity}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Guard Full Name</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. Dillip Kumar Pradhan"
                      value={securityFormData.name}
                      onChange={e => setSecurityFormData({ ...securityFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Badge Number</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. SG-OD-4428"
                      value={securityFormData.badgeNumber}
                      onChange={e => setSecurityFormData({ ...securityFormData, badgeNumber: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Assigned Post / Gate Location</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. Main Campus Gate 1, Girls Hostel Checkpoint"
                    value={securityFormData.postLocation}
                    onChange={e => setSecurityFormData({ ...securityFormData, postLocation: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Shift Schedule</label>
                    <select
                      className="admin-form-select"
                      value={securityFormData.shift}
                      onChange={e => setSecurityFormData({ ...securityFormData, shift: e.target.value })}
                    >
                      <option value="Morning Shift (06:00 AM - 02:00 PM)">Morning Shift (06:00 AM - 02:00 PM)</option>
                      <option value="Evening Shift (02:00 PM - 10:00 PM)">Evening Shift (02:00 PM - 10:00 PM)</option>
                      <option value="Night Patrol (10:00 PM - 06:00 AM)">Night Patrol (10:00 PM - 06:00 AM)</option>
                      <option value="24x7 Rotating Shift">24x7 Rotating Shift</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Security Agency</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. Falcon Security Services"
                      value={securityFormData.assignedAgency}
                      onChange={e => setSecurityFormData({ ...securityFormData, assignedAgency: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Contact Phone</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="+91 94371 00000"
                      value={securityFormData.phone}
                      onChange={e => setSecurityFormData({ ...securityFormData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Emergency Contact / Kin</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="+91 98610 00000"
                      value={securityFormData.emergencyContact}
                      onChange={e => setSecurityFormData({ ...securityFormData, emergencyContact: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Blood Group</label>
                    <select
                      className="admin-form-select"
                      value={securityFormData.bloodGroup}
                      onChange={e => setSecurityFormData({ ...securityFormData, bloodGroup: e.target.value })}
                    >
                      <option value="O+">O+</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="O-">O-</option>
                      <option value="A-">A-</option>
                      <option value="B-">B-</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Duty Status</label>
                    <select
                      className="admin-form-select"
                      value={securityFormData.status}
                      onChange={e => setSecurityFormData({ ...securityFormData, status: e.target.value })}
                    >
                      <option value="On Duty">On Duty</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-btn-secondary" onClick={() => setIsSecurityModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn-primary">
                  {editingSecurity ? 'Save Changes' : 'Add Security Guard'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CANTEEN STAFF */}
      {isCanteenModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Utensils size={18} color="#2563eb" />
                <h3>{editingCanteen ? 'Edit Canteen Staff' : 'Add Canteen Staff Member'}</h3>
              </div>
              <button className="admin-table-action-btn" onClick={() => setIsCanteenModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveCanteen}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. Santosh Nayak"
                      value={canteenFormData.name}
                      onChange={e => setCanteenFormData({ ...canteenFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Designation / Role</label>
                    <select
                      className="admin-form-select"
                      value={canteenFormData.role}
                      onChange={e => setCanteenFormData({ ...canteenFormData, role: e.target.value })}
                    >
                      <option value="Canteen Supervisor / In-Charge">Canteen Supervisor / In-Charge</option>
                      <option value="Head Chef / Kitchen Lead">Head Chef / Kitchen Lead</option>
                      <option value="Senior Cook">Senior Cook</option>
                      <option value="Counter Cashier & POS Operator">Counter Cashier &amp; POS Operator</option>
                      <option value="Assistant Cook & Prep Lead">Assistant Cook &amp; Prep Lead</option>
                      <option value="Dining Hall Steward">Dining Hall Steward</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Dining Outlet / Kitchen</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. Central Food Court, Hostel Mess A"
                      value={canteenFormData.outlet}
                      onChange={e => setCanteenFormData({ ...canteenFormData, outlet: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Shift Schedule</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. Morning Prep (06:00 AM - 02:00 PM)"
                      value={canteenFormData.shift}
                      onChange={e => setCanteenFormData({ ...canteenFormData, shift: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Contact Phone</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="+91 98612 00000"
                      value={canteenFormData.phone}
                      onChange={e => setCanteenFormData({ ...canteenFormData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>FSSAI License / Health Badge</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="FSSAI-OD-2024-XXXX"
                      value={canteenFormData.fssaiLicense}
                      onChange={e => setCanteenFormData({ ...canteenFormData, fssaiLicense: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Speciality / Primary Responsibilities</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. South Indian breakfast, Mess operations"
                      value={canteenFormData.speciality}
                      onChange={e => setCanteenFormData({ ...canteenFormData, speciality: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Status</label>
                    <select
                      className="admin-form-select"
                      value={canteenFormData.status}
                      onChange={e => setCanteenFormData({ ...canteenFormData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-btn-secondary" onClick={() => setIsCanteenModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn-primary">
                  {editingCanteen ? 'Save Changes' : 'Add Canteen Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT OTHER CAMPUS SUPPORT MEMBER */}
      {isOtherStaffModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Wrench size={18} color="#2563eb" />
                <h3>{editingOtherStaff ? 'Edit Staff Member' : 'Add Campus Support Member'}</h3>
              </div>
              <button className="admin-table-action-btn" onClick={() => setIsOtherStaffModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveOtherStaff}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. Pramod Panda"
                      value={otherStaffFormData.name}
                      onChange={e => setOtherStaffFormData({ ...otherStaffFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Category / Trade</label>
                    <select
                      className="admin-form-select"
                      value={otherStaffFormData.category}
                      onChange={e => setOtherStaffFormData({ ...otherStaffFormData, category: e.target.value })}
                    >
                      <option value="Electrician & Power Maintenance">Electrician &amp; Power Maintenance</option>
                      <option value="Plumber & Water Works">Plumber &amp; Water Works</option>
                      <option value="Housekeeping Supervisor">Housekeeping Supervisor</option>
                      <option value="Senior Lab Technician">Senior Lab Technician</option>
                      <option value="Senior Library Attendant">Senior Library Attendant</option>
                      <option value="Transport & Bus Supervisor">Transport &amp; Bus Supervisor</option>
                      <option value="Network & Hardware Support">Network &amp; Hardware Support</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Assigned Campus Zone / Building</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. Academic Block A & B, Substation"
                      value={otherStaffFormData.zone}
                      onChange={e => setOtherStaffFormData({ ...otherStaffFormData, zone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Duty Shift</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. General Shift (08:30 AM - 05:00 PM)"
                      value={otherStaffFormData.shift}
                      onChange={e => setOtherStaffFormData({ ...otherStaffFormData, shift: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Contact Phone</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="+91 94378 00000"
                      value={otherStaffFormData.phone}
                      onChange={e => setOtherStaffFormData({ ...otherStaffFormData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Emergency On-Call Duty</label>
                    <select
                      className="admin-form-select"
                      value={otherStaffFormData.emergencyDuty}
                      onChange={e => setOtherStaffFormData({ ...otherStaffFormData, emergencyDuty: e.target.value })}
                    >
                      <option value="Yes (On-Call 24x7)">Yes (On-Call 24x7)</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Qualification / Technical Certifications</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. ITI Electrical, Diploma, B.Lib"
                      value={otherStaffFormData.qualification}
                      onChange={e => setOtherStaffFormData({ ...otherStaffFormData, qualification: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Status</label>
                    <select
                      className="admin-form-select"
                      value={otherStaffFormData.status}
                      onChange={e => setOtherStaffFormData({ ...otherStaffFormData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-btn-secondary" onClick={() => setIsOtherStaffModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn-primary">
                  {editingOtherStaff ? 'Save Changes' : 'Add Staff Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW DETAILS (ALL ROLES) */}
      {viewDetailsItem && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>{viewDetailsItem.type} Official Record</h3>
              <button className="admin-table-action-btn" onClick={() => setViewDetailsItem(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: viewDetailsItem.type === 'Warden' ? (viewDetailsItem.data.hostelCategory === 'Girls Hostel' ? '#be185d' : '#1e3a8a') : (viewDetailsItem.type === 'Security' ? '#047857' : (viewDetailsItem.type === 'Canteen' ? '#d97706' : '#2563eb')),
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 700
                }}>
                  {viewDetailsItem.data.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>{viewDetailsItem.data.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {viewDetailsItem.type === 'Student' && `Roll ${viewDetailsItem.data.rollNumber} · ${viewDetailsItem.data.studentId}`}
                    {viewDetailsItem.type === 'Warden' && `${viewDetailsItem.data.id} · ${viewDetailsItem.data.hostelCategory}`}
                    {viewDetailsItem.type === 'Security' && `${viewDetailsItem.data.id} · Badge ${viewDetailsItem.data.badgeNumber}`}
                    {viewDetailsItem.type === 'Canteen' && `${viewDetailsItem.data.id} · ${viewDetailsItem.data.role}`}
                    {viewDetailsItem.type === 'OtherStaff' && `${viewDetailsItem.data.id} · ${viewDetailsItem.data.category}`}
                  </div>
                </div>
              </div>

              {viewDetailsItem.type === 'Student' && (
                <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Department</dt><dd style={{ margin: 0, fontWeight: 600 }}>{viewDetailsItem.data.department}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Semester & Section</dt><dd style={{ margin: 0, fontWeight: 600 }}>{viewDetailsItem.data.semester} - {viewDetailsItem.data.section}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Official Email</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.email}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Phone</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.phone}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Cumulative CGPA</dt><dd style={{ margin: 0, fontWeight: 700, color: '#059669' }}>{viewDetailsItem.data.cgpa || '8.25'}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Attendance Rate</dt><dd style={{ margin: 0, fontWeight: 700, color: '#2563eb' }}>{viewDetailsItem.data.attendance || '92'}%</dd></div>
                </dl>
              )}

              {viewDetailsItem.type === 'Warden' && (
                <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Hostel Classification</dt><dd style={{ margin: 0 }}><span className={`admin-badge ${viewDetailsItem.data.hostelCategory === 'Boys Hostel' ? 'boys' : 'girls'}`}>{viewDetailsItem.data.hostelCategory}</span></dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Assigned Residence</dt><dd style={{ margin: 0, fontWeight: 600 }}>{viewDetailsItem.data.assignedHostel}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Warden Office</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.roomOffice}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Duty Hours</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.shift}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Contact Phone</dt><dd style={{ margin: 0, fontWeight: 600 }}>{viewDetailsItem.data.phone}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Email</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.email}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Supervised Students</dt><dd style={{ margin: 0, fontWeight: 700, color: '#059669' }}>{viewDetailsItem.data.residentsCount} / {viewDetailsItem.data.totalBeds} Beds</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Status</dt><dd style={{ margin: 0 }}><span className={`admin-badge ${viewDetailsItem.data.status === 'Active' ? 'active' : 'inactive'}`}>{viewDetailsItem.data.status}</span></dd></div>
                </dl>
              )}

              {viewDetailsItem.type === 'Security' && (
                <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Badge Number</dt><dd style={{ margin: 0, fontWeight: 700, color: '#1d4ed8' }}>{viewDetailsItem.data.badgeNumber}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Post Assignment</dt><dd style={{ margin: 0, fontWeight: 600 }}>{viewDetailsItem.data.postLocation}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Duty Shift</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.shift}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Security Agency</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.assignedAgency}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Primary Phone</dt><dd style={{ margin: 0, fontWeight: 600 }}>{viewDetailsItem.data.phone}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Emergency Hotline</dt><dd style={{ margin: 0, color: '#e11d48', fontWeight: 600 }}>{viewDetailsItem.data.emergencyContact}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Blood Group</dt><dd style={{ margin: 0, fontWeight: 600 }}>{viewDetailsItem.data.bloodGroup || 'O+'}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Status</dt><dd style={{ margin: 0 }}><span className={`admin-badge ${viewDetailsItem.data.status === 'On Duty' ? 'active' : 'inactive'}`}>{viewDetailsItem.data.status}</span></dd></div>
                </dl>
              )}

              {viewDetailsItem.type === 'Canteen' && (
                <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Designation</dt><dd style={{ margin: 0, fontWeight: 600 }}>{viewDetailsItem.data.role}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Outlet / Location</dt><dd style={{ margin: 0, fontWeight: 600 }}>{viewDetailsItem.data.outlet}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Shift Hours</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.shift}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Contact Phone</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.phone}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>FSSAI Health License</dt><dd style={{ margin: 0, fontWeight: 700, color: '#047857' }}>{viewDetailsItem.data.fssaiLicense}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Culinary Speciality</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.speciality}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Operational Status</dt><dd style={{ margin: 0 }}><span className={`admin-badge ${viewDetailsItem.data.status === 'Active' ? 'active' : 'inactive'}`}>{viewDetailsItem.data.status}</span></dd></div>
                </dl>
              )}

              {viewDetailsItem.type === 'OtherStaff' && (
                <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Trade / Department</dt><dd style={{ margin: 0, fontWeight: 600 }}>{viewDetailsItem.data.category}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Campus Zone</dt><dd style={{ margin: 0, fontWeight: 600 }}>{viewDetailsItem.data.zone}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Duty Shift</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.shift}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Contact Phone</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.phone}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>24x7 Emergency Duty</dt><dd style={{ margin: 0, fontWeight: 700, color: '#b45309' }}>{viewDetailsItem.data.emergencyDuty}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Qualifications</dt><dd style={{ margin: 0 }}>{viewDetailsItem.data.qualification}</dd></div>
                  <div><dt style={{ color: '#64748b', fontSize: '0.75rem' }}>Status</dt><dd style={{ margin: 0 }}><span className={`admin-badge ${viewDetailsItem.data.status === 'Active' ? 'active' : 'inactive'}`}>{viewDetailsItem.data.status}</span></dd></div>
                </dl>
              )}
            </div>
            <div className="admin-modal-footer">
              <button className="admin-action-btn-primary" onClick={() => setViewDetailsItem(null)}>
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
