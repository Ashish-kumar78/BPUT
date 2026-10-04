import { useState } from 'react'
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Star,
  TrendingUp,
  X,
} from 'lucide-react'
import './ExaminationPage.css'

const internalSchedule = [
  { date: '15 Oct 2026', subject: 'Artificial Intelligence', code: 'CS501', time: '10:00 AM', room: 'Hall-A', duration: '90 min', status: 'upcoming' },
  { date: '17 Oct 2026', subject: 'Machine Learning', code: 'CS502', time: '10:00 AM', room: 'Hall-B', duration: '90 min', status: 'upcoming' },
  { date: '20 Oct 2026', subject: 'Cloud Computing', code: 'CS503', time: '02:00 PM', room: 'Hall-A', duration: '90 min', status: 'upcoming' },
  { date: '22 Oct 2026', subject: 'Compiler Design', code: 'CS504', time: '10:00 AM', room: 'Hall-C', duration: '90 min', status: 'upcoming' },
]

const universityResults = [
  {
    semester: '4th Semester',
    exam: 'End Semester Exam 2026',
    subjects: [
      { code: 'CS401', name: 'Operating Systems', internal: 18, external: 62, total: 80, max: 100, grade: 'A', points: 8.5 },
      { code: 'CS402', name: 'Algorithms', internal: 19, external: 68, total: 87, max: 100, grade: 'A+', points: 9.0 },
      { code: 'CS403', name: 'Computer Networks', internal: 17, external: 58, total: 75, max: 100, grade: 'B+', points: 7.5 },
      { code: 'CS404', name: 'Theory of Computation', internal: 18, external: 62, total: 80, max: 100, grade: 'A', points: 8.5 },
      { code: 'CS405', name: 'Web Technologies', internal: 19, external: 70, total: 89, max: 100, grade: 'A+', points: 9.0 },
    ],
    sgpa: 8.68,
    result: 'Passed',
  },
  {
    semester: '3rd Semester',
    exam: 'End Semester Exam 2025',
    subjects: [
      { code: 'CS301', name: 'Discrete Mathematics', internal: 17, external: 62, total: 79, max: 100, grade: 'A', points: 8.5 },
      { code: 'CS302', name: 'Data Structures', internal: 19, external: 70, total: 89, max: 100, grade: 'A+', points: 9.0 },
      { code: 'CS303', name: 'Computer Organization', internal: 16, external: 59, total: 75, max: 100, grade: 'B+', points: 7.5 },
      { code: 'CS304', name: 'Database Systems', internal: 18, external: 62, total: 80, max: 100, grade: 'A', points: 8.5 },
      { code: 'CS305', name: 'Software Engineering', internal: 18, external: 62, total: 80, max: 100, grade: 'A', points: 8.5 },
    ],
    sgpa: 8.45,
    result: 'Passed',
  },
]

export default function ExaminationPage() {
  const [activeTab, setActiveTab] = useState('schedule')
  const [selectedSemester, setSelectedSemester] = useState(0)
  const [detailOpen, setDetailOpen] = useState(false)

  const sem = universityResults[selectedSemester]

  return (
    <div className="examination-page">
      <div className="examination-header">
        <div>
          <p className="examination-kicker"><FileText size={13} />EXAMINATIONS</p>
          <h2>Examination</h2>
          <p className="examination-caption">Internal schedules, university results and grade cards.</p>
        </div>
        <div className="exam-cgpa-strip">
          <div className="exam-stat"><strong>8.42</strong><small>CGPA</small></div>
          <div className="exam-stat"><strong>4 / 4</strong><small>Semesters Cleared</small></div>
          <div className="exam-stat"><strong>0</strong><small>Back Papers</small></div>
        </div>
      </div>

      <div className="examination-tabs" role="tablist">
        {[
          { key: 'schedule', label: 'Internal Schedule' },
          { key: 'results', label: 'University Results' },
          { key: 'grades', label: 'Grade Card' },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={activeTab === key ? 'active' : ''}
            role="tab"
            aria-selected={activeTab === key}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'schedule' && (
        <div className="exam-schedule-view">
          <div className="exam-alert">
            <AlertCircle size={14} />
            <span>Internal Assessment 2 is scheduled from <strong>15 Oct – 22 Oct 2026</strong>. Admit cards will be issued through this portal.</span>
          </div>
          <div className="exam-table-wrap">
            <table className="exam-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Code</th>
                  <th>Time</th>
                  <th>Room</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {internalSchedule.map((row) => (
                  <tr key={row.code}>
                    <td><CalendarDays size={11} />{row.date}</td>
                    <td><strong>{row.subject}</strong></td>
                    <td><code>{row.code}</code></td>
                    <td><Clock size={11} />{row.time}</td>
                    <td>{row.room}</td>
                    <td>{row.duration}</td>
                    <td>
                      <span className={`exam-status-tag ${row.status}`}>
                        {row.status === 'upcoming' ? 'Upcoming' : row.status === 'completed' ? 'Completed' : 'Ongoing'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="exam-admit-row">
            <FileText size={14} />
            <span>Admit card for Internal Assessment 2 will be available from <strong>12 Oct 2026</strong>.</span>
            <button className="exam-download-btn" disabled>Download Admit Card</button>
          </div>
        </div>
      )}

      {activeTab === 'results' && (
        <div className="exam-results-view">
          <div className="exam-semester-tabs">
            {universityResults.map((item, index) => (
              <button
                key={item.semester}
                className={selectedSemester === index ? 'active' : ''}
                onClick={() => setSelectedSemester(index)}
              >
                {item.semester}
              </button>
            ))}
          </div>

          <div className="exam-result-header">
            <div>
              <h3>{sem.semester}</h3>
              <p>{sem.exam}</p>
            </div>
            <div className="exam-result-summary">
              <span className="exam-sgpa-badge"><Star size={12} />{sem.sgpa} SGPA</span>
              <span className={`exam-result-pill ${sem.result.toLowerCase()}`}><Check size={11} />{sem.result}</span>
            </div>
          </div>

          <div className="exam-table-wrap">
            <table className="exam-table result-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Subject</th>
                  <th>Internal (20)</th>
                  <th>External (80)</th>
                  <th>Total (100)</th>
                  <th>Grade</th>
                  <th>Grade Points</th>
                </tr>
              </thead>
              <tbody>
                {sem.subjects.map((sub) => (
                  <tr key={sub.code}>
                    <td><code>{sub.code}</code></td>
                    <td><strong>{sub.name}</strong></td>
                    <td>{sub.internal}</td>
                    <td>{sub.external}</td>
                    <td><strong>{sub.total}</strong></td>
                    <td><span className={`grade-pill grade-${sub.grade.replace('+', 'p')}`}>{sub.grade}</span></td>
                    <td>{sub.points}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="6">SGPA</th>
                  <td><strong>{sem.sgpa}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'grades' && (
        <div className="grade-card-view">
          <div className="grade-card-header">
            <TrendingUp size={18} />
            <div>
              <h3>Grade Card — All Semesters</h3>
              <p>Cumulative academic performance across all completed semesters</p>
            </div>
            <button className="exam-download-btn"><FileText size={12} />Download Grade Card</button>
          </div>
          <div className="grade-card-table-wrap">
            <table className="exam-table grade-table">
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Credits Earned</th>
                  <th>SGPA</th>
                  <th>CGPA (Cumulative)</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1st Semester', 20, 8.14, 8.14, 'Passed'],
                  ['2nd Semester', 21, 8.42, 8.28, 'Passed'],
                  ['3rd Semester', 23, 8.45, 8.34, 'Passed'],
                  ['4th Semester', 20, 8.68, 8.42, 'Passed'],
                  ['5th Semester', '—', '—', '—', 'In Progress'],
                ].map(([sem, credits, sgpa, cgpa, result]) => (
                  <tr key={sem}>
                    <th scope="row">{sem}</th>
                    <td>{credits}</td>
                    <td>{sgpa !== '—' ? <span className="sgpa-chip">{sgpa}</span> : '—'}</td>
                    <td>{cgpa !== '—' ? <strong>{cgpa}</strong> : '—'}</td>
                    <td>
                      <span className={`result-status ${result === 'Passed' ? 'passed' : 'progress'}`}>
                        {result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grade-card-footer">
            <div className="grade-scale">
              <strong>Grade Scale:</strong>
              {[['O', '10'], ['A+', '9'], ['A', '8.5'], ['B+', '7.5'], ['B', '7'], ['C', '6'], ['D', '5'], ['F', '0']].map(([g, p]) => (
                <span key={g}><span className={`grade-pill grade-${g.replace('+', 'p')}`}>{g}</span> = {p}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
