import React, { useState } from 'react';
import { Download, ArrowLeft, GraduationCap, Award, FileCheck, Layers } from 'lucide-react';
import './UniversityMarksView.css';
import { downloadGradeCardPdf } from '../utils/pdfGenerator';

export const universitySemesterData = [
  {
    id: 4,
    title: 'Semester # 4',
    sgpa: '8.58',
    cgpa: '8.78',
    subjects: [
      { code: 'ETCS-T-PC-401', name: 'Engineering Economics', type: 'T', credit: '3', grade: 'B' },
      { code: 'ETCS-T-PC-402', name: 'Design and Analysis of Algorithms', type: 'T', credit: '3', grade: 'A' },
      { code: 'ETCS-T-PC-403', name: 'Computer Organisation & Architecture', type: 'T', credit: '3', grade: 'A' },
      { code: 'ETCS-T-PC-404', name: 'Programming with Python', type: 'T', credit: '3', grade: 'A' },
      { code: 'ETEC-T-OE-401', name: 'Digital Signal Processing', type: 'T', credit: '3', grade: 'B' },
      { code: 'ETSC-T-AE-401', name: 'Ability Enhancement Training - C', type: 'T', credit: '1', grade: 'C' },
      { code: 'ETMC-T-MC-402', name: 'Essence of Indian knowledge and tradition-I', type: 'T', credit: '0', grade: 'C' },
      { code: 'ETCS-P-PR-401', name: 'Project-II', type: 'P', credit: '2', grade: 'O' },
      { code: 'ETCS-P-PC-401', name: 'Design and Analysis of Algorithms Lab', type: 'P', credit: '1', grade: 'O' },
      { code: 'ETCS-P-PC-402', name: 'Computer Organisation & Architecture Lab', type: 'P', credit: '1', grade: 'O' },
      { code: 'ETCS-P-PC-403', name: 'Programming with Python Lab', type: 'P', credit: '1', grade: 'O' },
    ]
  },
  {
    id: 3,
    title: 'Semester # 3',
    sgpa: '8.78',
    cgpa: '8.85',
    subjects: [
      { code: 'ETCS-T-BS-301', name: 'Mathematics for Computer Science', type: 'T', credit: '3', grade: 'E' },
      { code: 'ETHS-T-HS-301', name: 'Organisational Behavior', type: 'T', credit: '3', grade: 'E' },
      { code: 'ETCS-T-PC-301', name: 'Object Oriented Programming using JAVA', type: 'T', credit: '3', grade: 'B' },
      { code: 'ETCS-T-PC-302', name: 'Database Management System', type: 'T', credit: '3', grade: 'A' },
      { code: 'ETEC-T-OE-301', name: 'Digital Logic Design', type: 'T', credit: '3', grade: 'E' },
      { code: 'ETSC-T-AE-301', name: 'Ability Enhancement Training B', type: 'T', credit: '1', grade: 'B' },
      { code: 'ETMC-T-MC-301', name: 'Environmental Engineering', type: 'T', credit: '0', grade: 'O' },
      { code: 'ETCS-P-IN-301', name: 'Evaluation of Summer Internship-I', type: 'P', credit: '2', grade: 'O' },
      { code: 'ETCS-P-PC-301', name: 'Object Oriented Programming using JAVA Lab', type: 'P', credit: '1', grade: 'O' },
      { code: 'ETCS-P-PC-302', name: 'Database Management System Lab', type: 'P', credit: '1', grade: 'O' },
      { code: 'ETEC-P-OE-301', name: 'Digital Logic Design Lab', type: 'P', credit: '1', grade: 'E' },
      { code: 'ETPS-P-PS-301', name: 'Seminar - I', type: 'P', credit: '1', grade: 'O' },
    ]
  },
  {
    id: 2,
    title: 'Semester # 2',
    sgpa: '8.98',
    cgpa: '8.95',
    subjects: [
      { code: 'ETBS-T-BS-201', name: 'Mathematics-II', type: 'T', credit: '3', grade: 'E' },
      { code: 'ETES-T-ES-201', name: 'Basic Electronics Engineering', type: 'T', credit: '3', grade: 'E' },
      { code: 'ETES-T-ES-202', name: 'Programming Using Data Structure', type: 'T', credit: '3', grade: 'A' },
      { code: 'ETBS-T-BS-202', name: 'Applied Chemistry', type: 'T', credit: '3', grade: 'B' },
      { code: 'ETES-T-ES-203', name: 'Basic Civil Engineering', type: 'T', credit: '2', grade: 'E' },
      { code: 'ETHS-T-HS-201', name: 'English for Engineers-II', type: 'T', credit: '1', grade: 'A' },
      { code: 'ETMC-T-MC-201', name: 'Constitution of India', type: 'T', credit: '0', grade: 'O' },
      { code: 'ETES-P-ES-201', name: 'Programming Using Data Structure Lab', type: 'P', credit: '2', grade: 'O' },
      { code: 'ETES-P-ES-202', name: 'Workshop Practice-I', type: 'P', credit: '1.5', grade: 'E' },
      { code: 'ETBS-P-BS-201', name: 'Applied Chemistry Lab', type: 'P', credit: '1', grade: 'O' },
      { code: 'ETES-P-ES-203', name: 'Basic Civil Engineering Lab', type: 'P', credit: '1', grade: 'O' },
      { code: 'ETES-P-ES-204', name: 'Basic Electronics Engineering Lab', type: 'P', credit: '1', grade: 'O' },
      { code: 'ETPS-P-PR-201', name: 'Project-I', type: 'P', credit: '1', grade: 'O' },
    ]
  },
  {
    id: 1,
    title: 'Semester # 1',
    sgpa: '8.92',
    cgpa: '8.92',
    subjects: [
      { code: 'ETBS-T-BS-101', name: 'Mathematics-I', type: 'T', credit: '3', grade: 'E' },
      { code: 'ETES-T-ES-101', name: 'Basic Programming Skills', type: 'T', credit: '3', grade: 'A' },
      { code: 'ETBS-T-BS-102', name: 'Elements of Engineering Physics', type: 'T', credit: '3', grade: 'A' },
      { code: 'ETES-T-ES-102', name: 'Basic Electrical Engg', type: 'T', credit: '3', grade: 'E' },
      { code: 'ETES-T-ES-103', name: 'Basic Mechanical Engineering', type: 'T', credit: '2', grade: 'A' },
      { code: 'ETHS-T-HS-101', name: 'English for Engineer - I', type: 'T', credit: '1', grade: 'B' },
      { code: 'ETES-P-ES-101', name: 'Basic Programming Skills Lab', type: 'P', credit: '1', grade: 'O' },
      { code: 'ETPS-P-PR-101', name: 'Project - III', type: 'P', credit: '2', grade: 'O' },
      { code: 'ETES-P-ES-102', name: 'Engineering Graphics with AutoCAD', type: 'P', credit: '1.5', grade: 'O' },
      { code: 'ETBS-P-BS-101', name: 'Elements of Engineering Physics Lab', type: 'P', credit: '1', grade: 'O' },
      { code: 'ETES-P-ES-103', name: 'Basic Mechanical Engineering Lab', type: 'P', credit: '1', grade: 'O' },
      { code: 'ETES-P-ES-104', name: 'Basic Electrical Engg. Lab', type: 'P', credit: '1', grade: 'E' },
      { code: 'ETHS-P-HS-101', name: 'English For Engineer Lab-I', type: 'P', credit: '1', grade: 'O' },
      { code: 'ETPS-P-PR-102', name: 'Project-I', type: 'P', credit: '1', grade: 'O' },
    ]
  }
];

export default function UniversityMarksView({ onBack, account }) {
  const [activeSemFilter, setActiveSemFilter] = useState('all'); // 'all', 1, 2, 3, 4

  const handleDownloadMarksheet = (sem) => {
    downloadGradeCardPdf({
      semester: sem.title,
      sgpa: sem.sgpa,
      result: 'PASSED',
      subjects: sem.subjects.map(s => {
        const gradePointMap = { 'O': 10, 'E': 9, 'A': 8, 'B': 7, 'C': 6, 'D': 5, 'F': 0 };
        const pt = gradePointMap[s.grade] || 8;
        return {
          code: s.code,
          name: s.name,
          credits: parseFloat(s.credit) || 1,
          grade: s.grade,
          internal: Math.round(pt * 1.9),
          external: Math.round(pt * 7.5),
          total: Math.round(pt * 9.4),
          points: pt
        };
      })
    }, {
      name: account?.name || 'Aarav Sharma',
      rollNo: account?.registrationNumber || account?.id || '2305201001'
    });
  };

  const displayedSemesters = activeSemFilter === 'all'
    ? universitySemesterData
    : universitySemesterData.filter((s) => s.id === activeSemFilter);

  return (
    <div className="univ-marks-container">
      {/* Top action & navigation bar */}
      <div className="univ-marks-nav-bar">
        <div className="univ-marks-nav-info">
          <div className="univ-marks-tag">
            <GraduationCap size={15} />
            <span>Autonomous Examination Branch</span>
          </div>
          <h2>Biju Patnaik University of Technology (BPUT) Examination Results</h2>
          <p>Official certified semester-wise marks, course credits, and cumulative grade point average (CGPA).</p>
        </div>
        <div className="univ-marks-actions">
          {onBack && (
            <button className="univ-back-btn" type="button" onClick={onBack}>
              <ArrowLeft size={14} /> Back to profile
            </button>
          )}
        </div>
      </div>

      {/* Semester Selection Quick Filter Bar */}
      <div className="univ-sem-selector-bar">
        <span className="univ-sem-selector-label">Select Semester:</span>
        <div className="univ-sem-pills">
          <button
            type="button"
            className={`univ-sem-pill ${activeSemFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveSemFilter('all')}
          >
            All Semesters
          </button>
          {[1, 2, 3, 4].map((semNum) => {
            const semInfo = universitySemesterData.find((s) => s.id === semNum);
            return (
              <button
                key={semNum}
                type="button"
                className={`univ-sem-pill ${activeSemFilter === semNum ? 'active' : ''}`}
                onClick={() => setActiveSemFilter(semNum)}
              >
                <span>Sem {semNum}</span>
                {semInfo && <small className="sem-pill-gpa">SGPA: {semInfo.sgpa}</small>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stacked Semester Cards matching Reference Image 2 */}
      <div className="univ-semesters-list">
        {displayedSemesters.map((sem) => (
          <div className="univ-semester-card" key={sem.id}>
            {/* Header row: Red semester text on left, Blue Download button on right */}
            <div 
              className="univ-sem-header"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveSemFilter(activeSemFilter === sem.id ? 'all' : sem.id)}
              title={activeSemFilter === sem.id ? "Click to view all semesters" : "Click to view only this semester"}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="univ-sem-title">{sem.title}</span>
                {activeSemFilter === 'all' && (
                  <span style={{ fontSize: '0.7rem', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '12px' }}>
                    Click to view only this sem
                  </span>
                )}
              </div>
              <button
                type="button"
                className="univ-download-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadMarksheet(sem);
                }}
                title={`Download official marksheet for ${sem.title}`}
              >
                <Download size={13} />
                <span>Download Marksheet</span>
              </button>
            </div>

            {/* University Table */}
            <div className="univ-table-responsive">
              <table className="univ-marks-table">
                <thead>
                  <tr>
                    <th className="col-code">Subject Code</th>
                    <th className="col-name">Subject Name</th>
                    <th className="col-type">Type</th>
                    <th className="col-credit">Credit</th>
                    <th className="col-grade">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {sem.subjects.map((sub, sIdx) => (
                    <tr key={`${sub.code}-${sIdx}`}>
                      <td className="col-code font-mono">{sub.code}</td>
                      <td className="col-name">{sub.name}</td>
                      <td className="col-type">{sub.type}</td>
                      <td className="col-credit">{sub.credit}</td>
                      <td className="col-grade font-bold">{sub.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Light cyan / teal footer bar with SGPA & CGPA */}
            <div className="univ-sem-footer">
              <div className="univ-gpa-box">
                <span className="univ-gpa-item">
                  <span className="gpa-label">SGPA</span>
                  <span className="gpa-val">{sem.sgpa}</span>
                </span>
                <span className="univ-gpa-item">
                  <span className="gpa-label">CGPA</span>
                  <span className="gpa-val">{sem.cgpa}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
