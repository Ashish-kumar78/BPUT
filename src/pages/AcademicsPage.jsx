import { useState } from 'react'
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Star,
} from 'lucide-react'
import './AcademicsPage.css'

const semesters = [
  {
    label: '5th Semester (Current)',
    current: true,
    subjects: [
      { code: 'CS501', name: 'Artificial Intelligence', credits: 4, faculty: 'Dr. P. Mohapatra', type: 'Theory', syllabus: true },
      { code: 'CS502', name: 'Machine Learning', credits: 4, faculty: 'Dr. S. Rath', type: 'Theory', syllabus: true },
      { code: 'CS503', name: 'Cloud Computing', credits: 3, faculty: 'Prof. R. Nayak', type: 'Theory', syllabus: true },
      { code: 'CS504', name: 'Compiler Design', credits: 3, faculty: 'Dr. A. Panda', type: 'Theory', syllabus: true },
      { code: 'CS505', name: 'AI Lab', credits: 2, faculty: 'Dr. P. Mohapatra', type: 'Lab', syllabus: false },
      { code: 'CS506', name: 'Project Work – Phase I', credits: 2, faculty: 'Dr. S. Mohanty', type: 'Project', syllabus: false },
    ],
  },
  {
    label: '4th Semester',
    current: false,
    subjects: [
      { code: 'CS401', name: 'Operating Systems', credits: 4, faculty: 'Dr. R. Sahoo', type: 'Theory', grade: 'A', sgpa: 8.5 },
      { code: 'CS402', name: 'Algorithms', credits: 4, faculty: 'Prof. S. Mishra', type: 'Theory', grade: 'A+', sgpa: 9.0 },
      { code: 'CS403', name: 'Computer Networks', credits: 3, faculty: 'Dr. B. Das', type: 'Theory', grade: 'B+', sgpa: 7.5 },
      { code: 'CS404', name: 'Theory of Computation', credits: 3, faculty: 'Dr. P. Behera', type: 'Theory', grade: 'A', sgpa: 8.5 },
      { code: 'CS405', name: 'Web Technologies', credits: 3, faculty: 'Prof. N. Sethi', type: 'Theory', grade: 'A+', sgpa: 9.0 },
    ],
  },
  {
    label: '3rd Semester',
    current: false,
    subjects: [
      { code: 'CS301', name: 'Discrete Mathematics', credits: 4, faculty: 'Dr. A. Tripathy', type: 'Theory', grade: 'A', sgpa: 8.5 },
      { code: 'CS302', name: 'Data Structures', credits: 4, faculty: 'Dr. S. Mohanty', type: 'Theory', grade: 'A+', sgpa: 9.0 },
      { code: 'CS303', name: 'Computer Organization', credits: 3, faculty: 'Prof. B. Pati', type: 'Theory', grade: 'B+', sgpa: 7.5 },
      { code: 'CS304', name: 'Database Systems', credits: 3, faculty: 'Dr. K. Dash', type: 'Theory', grade: 'A', sgpa: 8.5 },
      { code: 'CS305', name: 'Software Engineering', credits: 3, faculty: 'Prof. S. Nanda', type: 'Theory', grade: 'A', sgpa: 8.5 },
    ],
  },
]

const gradePoints = {
  'O': 10, 'A+': 9, 'A': 8.5, 'B+': 7.5, 'B': 7, 'C': 6, 'D': 5, 'F': 0,
}

export default function AcademicsPage() {
  const [openSemester, setOpenSemester] = useState(0)
  const [activeTab, setActiveTab] = useState('subjects')

  const cgpa = 8.42

  return (
    <div className="academics-page">
      <div className="academics-header">
        <div className="academics-header-left">
          <p className="academics-kicker"><BookOpen size={13} /> ACADEMIC RECORD</p>
          <h2>Academics</h2>
          <p className="academics-caption">Courses, syllabus and academic performance across all semesters.</p>
        </div>
        <div className="academics-cgpa-badge">
          <Star size={14} />
          <span>CGPA</span>
          <strong>{cgpa}</strong>
          <small>/ 10.0</small>
        </div>
      </div>

      <div className="academics-tabs" role="tablist">
        {['subjects', 'results', 'syllabus'].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'subjects' ? 'Enrolled Subjects' : tab === 'results' ? 'Results & Grades' : 'Syllabus'}
          </button>
        ))}
      </div>

      {activeTab === 'subjects' && (
        <div className="academics-semester-list">
          {semesters.map((sem, index) => (
            <div className={`semester-accordion ${sem.current ? 'current' : ''}`} key={sem.label}>
              <button
                className="semester-accordion-head"
                onClick={() => setOpenSemester(openSemester === index ? -1 : index)}
                aria-expanded={openSemester === index}
              >
                <span className="semester-label">
                  {sem.label}
                  {sem.current && <span className="semester-badge">ACTIVE</span>}
                </span>
                <span className="semester-meta">{sem.subjects.length} subjects · {sem.subjects.reduce((s, c) => s + c.credits, 0)} credits</span>
                <ChevronDown size={14} className={openSemester === index ? 'rotated' : ''} />
              </button>
              {openSemester === index && (
                <div className="semester-accordion-body">
                  <div className="subject-table-wrap">
                    <table className="subject-table">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Subject</th>
                          <th>Type</th>
                          <th>Credits</th>
                          <th>Faculty</th>
                          {!sem.current && <th>Grade</th>}
                          {sem.current && <th>Syllabus</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {sem.subjects.map((sub) => (
                          <tr key={sub.code}>
                            <td><code>{sub.code}</code></td>
                            <td><strong>{sub.name}</strong></td>
                            <td><span className={`subject-type-tag ${sub.type.toLowerCase()}`}>{sub.type}</span></td>
                            <td>{sub.credits}</td>
                            <td>{sub.faculty}</td>
                            {!sem.current && (
                              <td>
                                <span className={`grade-pill grade-${sub.grade?.replace('+', 'p')}`}>{sub.grade}</span>
                              </td>
                            )}
                            {sem.current && (
                              <td>
                                {sub.syllabus
                                  ? <button className="syllabus-link"><Download size={12} />PDF</button>
                                  : <span className="no-syllabus">—</span>
                                }
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'results' && (
        <div className="academics-results">
          <div className="results-summary-grid">
            <div className="results-summary-card">
              <GraduationCap size={22} />
              <strong>8.42</strong>
              <span>Overall CGPA</span>
            </div>
            <div className="results-summary-card">
              <Star size={22} />
              <strong>9.0</strong>
              <span>Highest SGPA</span>
            </div>
            <div className="results-summary-card">
              <BookOpen size={22} />
              <strong>84</strong>
              <span>Total Credits</span>
            </div>
            <div className="results-summary-card">
              <FileText size={22} />
              <strong>4 / 4</strong>
              <span>Semesters Passed</span>
            </div>
          </div>

          <div className="result-semester-table-wrap">
            <table className="result-semester-table">
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Credits Earned</th>
                  <th>SGPA</th>
                  <th>Result</th>
                  <th>Marksheet</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1st Semester', 20, 8.14, 'Passed'],
                  ['2nd Semester', 21, 8.42, 'Passed'],
                  ['3rd Semester', 23, 8.45, 'Passed'],
                  ['4th Semester', 20, 8.68, 'Passed'],
                  ['5th Semester', '—', '—', 'In Progress'],
                ].map(([sem, credits, sgpa, result]) => (
                  <tr key={sem}>
                    <th scope="row">{sem}</th>
                    <td>{credits}</td>
                    <td>{sgpa !== '—' ? <span className="sgpa-chip">{sgpa}</span> : '—'}</td>
                    <td>
                      <span className={`result-status ${result === 'Passed' ? 'passed' : result === 'In Progress' ? 'progress' : 'pending'}`}>
                        {result}
                      </span>
                    </td>
                    <td>
                      {result === 'Passed'
                        ? <button className="marksheet-btn"><ExternalLink size={11} />View</button>
                        : <span className="no-syllabus">—</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'syllabus' && (
        <div className="syllabus-grid">
          {[
            { code: 'CS501', name: 'Artificial Intelligence', size: '2.4 MB' },
            { code: 'CS502', name: 'Machine Learning', size: '1.8 MB' },
            { code: 'CS503', name: 'Cloud Computing', size: '3.1 MB' },
            { code: 'CS504', name: 'Compiler Design', size: '2.0 MB' },
          ].map((item) => (
            <div className="syllabus-card" key={item.code}>
              <div className="syllabus-card-icon"><FileText size={22} /></div>
              <div className="syllabus-card-copy">
                <strong>{item.name}</strong>
                <small>{item.code} · {item.size}</small>
              </div>
              <button className="syllabus-download-btn"><Download size={14} />Download</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
