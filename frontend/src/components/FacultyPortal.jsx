import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  GraduationCap,
  Layers,
  BarChart2,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  LogOut,
  Download,
  Calendar,
  Clock,
  Search,
  Sparkles
} from 'lucide-react';
import './FacultyPortal.css';
import '../components/AdminPortal.css';
import { downloadDepartmentGazettePdf } from '../utils/pdfGenerator';
import { generateAllStudents } from '../data/collegeData.js';
import MarksManagementModule from '../marks/MarksManagementModule.jsx';
import { notesApi } from '../services/notesApi.js';
import { ShieldCheck, Eye, Flag, Trash2 } from 'lucide-react';

export default function FacultyPortal({ account, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSubject, setSelectedSubject] = useState('Data Structures');
  const [students] = useState(() => generateAllStudents());
  const [studentSearch, setStudentSearch] = useState('');

  // Feature 2: Class Notes Moderation State
  const [moderationNotesList, setModerationNotesList] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  React.useEffect(() => {
    loadModerationNotes();
  }, []);

  const loadModerationNotes = async () => {
    const list = await notesApi.getClassNotes({ subject: 'ALL' });
    if (list) setModerationNotesList(list);
  };

  const handleVerifyNote = async (id) => {
    const facultyName = account?.name || 'Dr. Pratyush Mohapatra';
    const res = await notesApi.verifyNoteByFaculty(id, facultyName);
    if (res && res.success) {
      triggerToast('✓ Class note marked as Faculty Verified!');
      await loadModerationNotes();
    }
  };

  const handleHideNote = async (id) => {
    const res = await notesApi.hideNoteByFaculty(id);
    if (res && res.success) {
      triggerToast('✕ Class note hidden from students.');
      await loadModerationNotes();
    }
  };


  const assignedSubjects = [
    {
      code: 'CS501',
      name: 'Data Structures',
      studentsCount: 91,
      cohort: 'Semester 5 - Section A',
      completion: 82,
      pendingAssessments: 2,
      status: 'In Progress',
      lastUpdated: 'Today, 04:30 PM'
    },
    {
      code: 'CS502',
      name: 'Operating Systems',
      studentsCount: 91,
      cohort: 'Semester 5 - Section A',
      completion: 100,
      pendingAssessments: 0,
      status: 'Finalized · Awaiting HOD',
      lastUpdated: 'Yesterday, 06:10 PM'
    }
  ];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.rollNumber.includes(studentSearch)
  );

  return (
    <div className="faculty-portal-root">
      {/* Top Header */}
      <header className="faculty-header">
        <div className="faculty-brand">
          <div className="faculty-brand-icon">F</div>
          <div className="faculty-brand-text">
            <h1>GIFT AUTONOMOUS · FACULTY PORTAL</h1>
            <p>Department of Computer Science & Engineering</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="faculty-role-badge">
            <BookOpen size={14} />
            Faculty Evaluator
          </span>
          <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>
            {account?.name || 'Dr. S. Mohanty'}
          </span>
          <button className="admin-signout-btn" onClick={onLogout} title="Sign Out">
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="faculty-layout">
        {/* Sidebar */}
        <aside className="faculty-sidebar">
          <button
            className={`faculty-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Layers size={17} /> Dashboard
          </button>
          <button
            className={`faculty-nav-btn ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            <BookOpen size={17} /> My Subjects
          </button>
          <button
            className={`faculty-nav-btn ${activeTab === 'marks' ? 'active' : ''}`}
            onClick={() => setActiveTab('marks')}
          >
            <BarChart2 size={17} /> Marks Management
          </button>
          <button
            className={`faculty-nav-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <GraduationCap size={17} /> My Students ({students.length})
          </button>
          <button
            className={`faculty-nav-btn ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
          >
            <Sparkles size={17} /> Class Performance
          </button>
          <button
            className={`faculty-nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FileText size={17} /> Grade Reports
          </button>
          <button
            className={`faculty-nav-btn ${activeTab === 'notes-moderation' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes-moderation')}
          >
            <ShieldCheck size={17} /> Class Notes Moderation
          </button>
        </aside>

        {/* Dynamic Content Pane */}
        <main className="faculty-main">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Welcome Header */}
              <div className="admin-view-header">
                <div>
                  <h2>Good Morning, {account?.name || 'Teacher'}</h2>
                  <p>Faculty Continuous Assessment & Evaluation Workspace · Academic Year 2026-27</p>
                </div>
                <button className="admin-action-btn-primary" onClick={() => setActiveTab('marks')}>
                  <BarChart2 size={15} /> Enter Marks
                </button>
              </div>

              {/* HOD Feedback Notice Banner */}
              <div className="faculty-rejection-banner">
                <AlertCircle size={22} color="#e11d48" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#9f1239', fontSize: '0.95rem' }}>
                    Notice from HOD (Dr. P. K. Pattnaik) — Action Required
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#881337' }}>
                    "Please verify Quiz 3 and Quiz 4 continuous evaluation entries for Data Structures. Ensure all 91 students in Section A have non-zero marks before final moderation deadline."
                  </p>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Assigned Subjects</span>
                    <div className="admin-kpi-card-icon blue"><BookOpen size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">2 Courses</div>
                  <small style={{ color: '#64748b' }}>CS501 (DSA) & CS502 (OS)</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Active Students</span>
                    <div className="admin-kpi-card-icon emerald"><Users size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">91</div>
                  <small style={{ color: '#059669', fontWeight: 600 }}>Semester 5 · Section A</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Evaluation Progress</span>
                    <div className="admin-kpi-card-icon purple"><CheckCircle2 size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">91%</div>
                  <small style={{ color: '#64748b' }}>11 of 13 Assessments</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Next Academic Milestone</span>
                    <div className="admin-kpi-card-icon amber"><Clock size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">15 Oct</div>
                  <small style={{ color: '#d97706', fontWeight: 600 }}>Modular 2 Exams</small>
                </div>
              </div>

              {/* My Assigned Subjects Section */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">My Subjects</h3>
                  <span className="admin-badge active">Semester 5 - Section A</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                  {assignedSubjects.map(sub => (
                    <div key={sub.code} className="faculty-subject-card">
                      <div className="faculty-subject-card-header">
                        <div>
                          <span className="admin-badge active" style={{ marginBottom: '0.4rem' }}>{sub.code}</span>
                          <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>{sub.name}</h4>
                          <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>{sub.cohort}</div>
                        </div>
                        <span className={`admin-badge ${sub.completion === 100 ? 'approved' : 'pending'}`}>
                          {sub.completion}% Entered
                        </span>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.35rem' }}>
                          <span>{sub.studentsCount} Students Enrolled</span>
                          <span>{sub.pendingAssessments === 0 ? 'All Completed' : `${sub.pendingAssessments} Pending`}</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{ width: `${sub.completion}%`, height: '100%', background: sub.completion === 100 ? '#059669' : '#2563eb', borderRadius: '9999px' }} />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                        <small style={{ color: '#64748b' }}>Updated: {sub.lastUpdated}</small>
                        <button
                          className="admin-action-btn-primary"
                          style={{ padding: '0.45rem 0.9rem', fontSize: '0.825rem' }}
                          onClick={() => {
                            setSelectedSubject(sub.name);
                            setActiveTab('marks');
                          }}
                        >
                          Manage Marks <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY SUBJECTS */}
          {activeTab === 'subjects' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Assigned Teaching Subjects</h2>
                  <p>Curricular subjects assigned by Head of Department for Continuous Evaluation.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {assignedSubjects.map(sub => (
                  <div key={sub.code} className="faculty-subject-card">
                    <div>
                      <span className="admin-badge active">{sub.code}</span>
                      <h3 style={{ margin: '0.5rem 0 0.25rem 0', color: '#0f172a' }}>{sub.name}</h3>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>{sub.cohort} · 4 Credits · Theory + Lab</p>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span>Total Students:</span>
                        <strong>{sub.studentsCount}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span>Evaluation Status:</span>
                        <strong style={{ color: sub.completion === 100 ? '#059669' : '#2563eb' }}>{sub.status}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Continuous Components:</span>
                        <strong>13 Assessments</strong>
                      </div>
                    </div>

                    <button
                      className="admin-action-btn-primary"
                      onClick={() => {
                        setSelectedSubject(sub.name);
                        setActiveTab('marks');
                      }}
                    >
                      Open Marks Entry Matrix <ArrowRight size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MARKS MANAGEMENT (FULL MATRIX) */}
          {activeTab === 'marks' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Continuous Assessment Marks Entry</h2>
                  <p>Entering and finalizing marks for {selectedSubject} · 91 Students in Section A.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <select
                    className="admin-select"
                    value={selectedSubject}
                    onChange={e => setSelectedSubject(e.target.value)}
                    style={{ fontWeight: 600 }}
                  >
                    <option value="Data Structures">Data Structures (CS501)</option>
                    <option value="Operating Systems">Operating Systems (CS502)</option>
                  </select>
                </div>
              </div>

              {/* Renders the full fast inline matrix table with keyboard navigation, tabs, CSV upload and Save Draft/Finalize */}
              <MarksManagementModule initialRole="teacher" />
            </div>
          )}

          {/* TAB 4: MY STUDENTS */}
          {activeTab === 'students' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Students Cohort Roster</h2>
                  <p>91 Enrolled students for Semester 5 Section A in Computer Science & Engineering.</p>
                </div>
                <div className="admin-search-wrap" style={{ minWidth: '260px' }}>
                  <Search size={15} />
                  <input
                    type="text"
                    className="admin-search-input"
                    placeholder="Search student or roll number..."
                    value={studentSearch}
                    onChange={e => setStudentSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Roll</th>
                      <th>Student Name</th>
                      <th>Student ID</th>
                      <th>Attendance</th>
                      <th>Cumulative CGPA</th>
                      <th>Continuous Eval Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(s => (
                      <tr key={s.id}>
                        <td><strong>{s.rollNumber}</strong></td>
                        <td style={{ fontWeight: 600 }}>{s.name}</td>
                        <td><code>{s.studentId}</code></td>
                        <td><strong style={{ color: '#2563eb' }}>{s.attendance}%</strong></td>
                        <td><strong style={{ color: '#059669' }}>{s.cgpa}</strong></td>
                        <td>
                          <span className="admin-badge approved">✓ Marks Up-to-date</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: CLASS PERFORMANCE */}
          {activeTab === 'performance' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Cohort Assessment Analytics & Analytics</h2>
                  <p>Statistical distribution across modulars, quizzes, assignments, surprise tests, and lab viva.</p>
                </div>
              </div>
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <span className="admin-kpi-label">Class Average</span>
                  <div className="admin-kpi-val" style={{ color: '#2563eb' }}>82.4%</div>
                  <small style={{ color: '#059669', fontWeight: 600 }}>Above autonomous benchmark</small>
                </div>
                <div className="admin-kpi-card">
                  <span className="admin-kpi-label">Highest Score</span>
                  <div className="admin-kpi-val" style={{ color: '#059669' }}>96.0%</div>
                  <small style={{ color: '#64748b' }}>Rakesh Das (Roll 01)</small>
                </div>
                <div className="admin-kpi-card">
                  <span className="admin-kpi-label">Lowest Score</span>
                  <div className="admin-kpi-val" style={{ color: '#d97706' }}>58.5%</div>
                  <small style={{ color: '#64748b' }}>Remedial classes allocated</small>
                </div>
                <div className="admin-kpi-card">
                  <span className="admin-kpi-label">Pass Percentage</span>
                  <div className="admin-kpi-val" style={{ color: '#059669' }}>98.9%</div>
                  <small style={{ color: '#059669', fontWeight: 600 }}>90 / 91 passed internal criteria</small>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: REPORTS */}
          {activeTab === 'reports' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Faculty Grade Reports & Gazette Sheets</h2>
                  <p>Official continuous evaluation returns ready for submission to Head of Department.</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                <div className="admin-card">
                  <h3 className="admin-card-title">Data Structures (CS501) CIA Gazette</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 1rem 0' }}>
                    Official grade sheet breakdown for 91 students across all 13 components.
                  </p>
                  <button className="admin-action-btn-primary" onClick={() => downloadDepartmentGazettePdf('Data Structures (CS501) CIA Gazette')}>
                    <Download size={15} /> Download PDF Sheet
                  </button>
                </div>

                <div className="admin-card">
                  <h3 className="admin-card-title">Operating Systems (CS502) CIA Gazette</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 1rem 0' }}>
                    100% completed internal assessment register signed by course evaluator.
                  </p>
                  <button className="admin-action-btn-primary" onClick={() => downloadDepartmentGazettePdf('Operating Systems (CS502) CIA Gazette')}>
                    <Download size={15} /> Download PDF Sheet
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CLASS NOTES MODERATION (FEATURE 2) */}
          {activeTab === 'notes-moderation' && (
            <div>
              {toastMsg && (
                <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#0f172a', color: '#fff', padding: '12px 18px', borderRadius: '8px', zIndex: 9999 }}>
                  {toastMsg}
                </div>
              )}

              <div className="admin-view-header">
                <div>
                  <h2>Class Notes & Peer Material Moderation Desk</h2>
                  <p>Review student-uploaded handwritten notes, verify academic accuracy, and moderate reported content.</p>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Subject & Topic</th>
                        <th>Lecture Date</th>
                        <th>Uploaded By</th>
                        <th>Status</th>
                        <th>Reports</th>
                        <th style={{ textAlign: 'right' }}>Faculty Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moderationNotesList.map((n) => (
                        <tr key={n.id}>
                          <td>
                            <strong style={{ color: '#0f172a' }}>{n.topic}</strong>
                            <div style={{ fontSize: '0.78rem', color: '#4338ca', fontWeight: 600 }}>{n.subject}</div>
                          </td>
                          <td>{n.date}</td>
                          <td>
                            <div>{n.uploadedBy?.name}</div>
                            <small style={{ color: '#64748b' }}>Roll {n.uploadedBy?.rollNumber}</small>
                          </td>
                          <td>
                            {n.isFacultyVerified ? (
                              <span className="admin-badge approved">✓ Faculty Verified</span>
                            ) : n.status === 'HIDDEN' ? (
                              <span className="admin-badge inactive">Hidden</span>
                            ) : (
                              <span className="admin-badge pending">Student Uploaded</span>
                            )}
                          </td>
                          <td>
                            {n.reports?.length > 0 ? (
                              <span style={{ fontSize: '0.78rem', background: '#fee2e2', color: '#b91c1c', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                                <Flag size={12} /> {n.reports.length} Reports
                              </span>
                            ) : (
                              <small style={{ color: '#94a3b8' }}>Clean</small>
                            )}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                              {!n.isFacultyVerified && (
                                <button
                                  type="button"
                                  className="admin-table-action-btn"
                                  style={{ background: '#dcfce7', color: '#15803d', padding: '4px 8px', borderRadius: '6px', border: '1px solid #86efac' }}
                                  onClick={() => handleVerifyNote(n.id)}
                                >
                                  <ShieldCheck size={14} /> Verify Note
                                </button>
                              )}
                              {n.status !== 'HIDDEN' && (
                                <button
                                  type="button"
                                  className="admin-table-action-btn"
                                  style={{ background: '#fee2e2', color: '#b91c1c', padding: '4px 8px', borderRadius: '6px', border: '1px solid #fca5a5' }}
                                  onClick={() => handleHideNote(n.id)}
                                >
                                  <Trash2 size={14} /> Hide Note
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
