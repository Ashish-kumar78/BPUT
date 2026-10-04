import { useState } from 'react'
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ScrollText,
  TrendingDown,
  TrendingUp,
  XCircle,
} from 'lucide-react'
import './AttendancePage.css'

const S = [
  { code: 'CS501', name: 'Artificial Intelligence', faculty: 'Dr. P. Mohapatra', held: 42, attended: 40, type: 'Theory' },
  { code: 'CS502', name: 'Machine Learning', faculty: 'Dr. S. Rath', held: 38, attended: 35, type: 'Theory' },
  { code: 'CS503', name: 'Cloud Computing', faculty: 'Prof. R. Nayak', held: 36, attended: 28, type: 'Theory' },
  { code: 'CS504', name: 'Compiler Design', faculty: 'Dr. A. Panda', held: 40, attended: 38, type: 'Theory' },
  { code: 'CS505', name: 'AI Lab', faculty: 'Dr. P. Mohapatra', held: 20, attended: 20, type: 'Lab' },
  { code: 'CS506', name: 'Project Work - Phase I', faculty: 'Dr. S. Mohanty', held: 14, attended: 13, type: 'Project' }
]

const M = [
  { month: 'Jul', pct: 96 },
  { month: 'Aug', pct: 94 },
  { month: 'Sep', pct: 88 },
  { month: 'Oct', pct: 92 }
]

function generateClassHistory(sub) {
  const { code, held, attended } = sub
  const absentCount = held - attended

  const dayOffsets = {
    CS501: [1, 3], // Mon, Wed
    CS502: [2, 4], // Tue, Thu
    CS503: [1, 5], // Mon, Fri
    CS504: [2, 5], // Tue, Fri
    CS505: [3],    // Wed
    CS506: [4],    // Thu
  }
  const targetDays = dayOffsets[code] || [1, 3]

  const absentSet = new Set()
  if (absentCount > 0) {
    const step = Math.floor(held / (absentCount + 1)) || 1
    for (let i = 1; i <= absentCount; i++) {
      const pos = Math.min(held, i * step + ((code.charCodeAt(3) || 0) % 2))
      absentSet.add(pos)
    }
  }

  const startDate = new Date(2026, 6, 15) // 15 July 2026
  const dates = []
  const curr = new Date(startDate)

  let count = 0
  while (count < held && curr <= new Date(2026, 9, 30)) {
    if (targetDays.includes(curr.getDay())) {
      count++
      const dayFormatted = new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        weekday: 'short',
      }).format(curr)

      dates.push({
        slNo: count,
        date: dayFormatted,
        status: absentSet.has(count) ? 'Absent' : 'Present',
      })
    }
    curr.setDate(curr.getDate() + 1)
  }

  return dates
}

function genMap() {
  const map = {}
  const absents = [3, 10, 17]
  const holidays = [2, 14, 15, 16]
  for (let d = 1; d <= 31; d++) {
    const date = new Date(2026, 9, d)
    if (date.getMonth() !== 9) break
    const key = '2026-10-' + d
    if (holidays.includes(d)) map[key] = 'holiday'
    else if (date.getDay() === 0 || date.getDay() === 6) map[key] = 'weekend'
    else if (absents.includes(d)) map[key] = 'absent'
    else if (d <= new Date().getDate()) map[key] = 'present'
  }
  return map
}

const CM = genMap()
const TH = 75

export default function AttendancePage() {
  const [vm, setVm] = useState(() => new Date(2026, 9, 1))
  const [tab, setTab] = useState('overview')
  const [expandedSubject, setExpandedSubject] = useState(null)
  const held = S.reduce((s, r) => s + r.held, 0)
  const att = S.reduce((s, r) => s + r.attended, 0)
  const pct = Math.round((att / held) * 100)
  const missed = held - att
  const low = S.filter(s => Math.round((s.attended / s.held) * 100) < TH)
  const ml = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(vm)
  const fd = new Date(vm.getFullYear(), vm.getMonth(), 1).getDay()
  const dim = new Date(vm.getFullYear(), vm.getMonth() + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < fd; i++) cells.push(null)
  for (let d = 1; d <= dim; d++) cells.push(d)
  const gs = d => {
    if (!d) return ''
    const k = vm.getFullYear() + '-' + (vm.getMonth() + 1) + '-' + d
    return CM[k] || ''
  }
  const bs = p => p >= 85 ? 'excellent' : p >= 75 ? 'good' : p >= 65 ? 'warn' : 'danger'

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <div>
          <p className="att-kicker"><CalendarDays size={13} /> ATTENDANCE</p>
          <h2>Attendance Dashboard</h2>
          <p className="att-caption">Track your class attendance across all subjects for Semester 5.</p>
        </div>
        <div className="att-overall-badge">
          <span className="att-pct-circle">{pct}%</span>
          <div>
            <strong>Overall Attendance</strong>
            <small>Semester 5 • {att}/{held} classes</small>
          </div>
        </div>
      </div>

      <div className="att-summary-strip">
        <div className="att-stat-card blue"><CalendarDays size={18} /><strong>{held}</strong><span>Classes Held</span></div>
        <div className="att-stat-card green"><CheckCircle2 size={18} /><strong>{att}</strong><span>Attended</span></div>
        <div className="att-stat-card red"><XCircle size={18} /><strong>{missed}</strong><span>Missed</span></div>
        <div className="att-stat-card purple"><TrendingUp size={18} /><strong>{pct}%</strong><span>Rate</span></div>
      </div>

      {low.length > 0 && (
        <div className="att-alert">
          <AlertTriangle size={15} />
          <div>
            <strong>Low Attendance Warning</strong>
            <span>{low.map(s => s.name).join(', ')} — below {TH}% threshold. Minimum attendance required is {TH}%.</span>
          </div>
        </div>
      )}

      <div className="att-tabs" role="tablist">
        {[['overview', 'Subject-wise'], ['calendar', 'Calendar View'], ['trend', 'Monthly Trend']].map(([k, l]) => (
          <button key={k} className={tab === k ? 'active' : ''} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="att-subject-list">
          {S.map(sub => {
            const p = Math.round((sub.attended / sub.held) * 100)
            const st = bs(p)
            const nd = (sub.attended / sub.held) < TH / 100 ? Math.ceil(((TH / 100) * sub.held - sub.attended) / (1 - TH / 100)) : 0
            const isExpanded = expandedSubject === sub.code
            const history = isExpanded ? generateClassHistory(sub) : []
            return (
              <div key={sub.code} className="att-subject-card">
                <div className="att-subject-meta">
                  <div>
                    <span className="att-type-tag">{sub.type}</span>
                    <strong>{sub.name}</strong>
                    <small>{sub.code} • {sub.faculty}</small>
                  </div>
                  <div className="att-subject-numbers">
                    <span className={`att-pct-badge ${st}`}>{p}%</span>
                    <small>{sub.attended}/{sub.held}</small>
                    <button
                      type="button"
                      className={`att-history-toggle ${isExpanded ? 'active' : ''}`}
                      onClick={() => setExpandedSubject(isExpanded ? null : sub.code)}
                      title="Click to view date-wise attendance log"
                    >
                      <ScrollText size={13} />
                      <span>{isExpanded ? 'Hide History' : 'Class History'}</span>
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </div>
                </div>
                <div className="att-bar-track">
                  <div className={`att-bar-fill ${st}`} style={{ width: `${p}%` }} role="progressbar" aria-valuenow={p} aria-valuemin="0" aria-valuemax="100" />
                  <div className="att-threshold-marker" style={{ left: `${TH}%` }} />
                </div>
                {nd > 0 && (
                  <p className="att-needed-note">
                    <TrendingDown size={11} /> Need {nd} more consecutive classes to reach {TH}%.
                  </p>
                )}

                {isExpanded && (
                  <div className="att-history-container">
                    <div className="att-history-header">
                      <p className="att-history-title">
                        <ScrollText size={14} /> Date-wise Attendance Log — {sub.name} ({sub.code})
                      </p>
                      <span className="att-history-count">Held: {sub.held} | Present: {sub.attended} | Absent: {sub.held - sub.attended}</span>
                    </div>
                    <div className="att-history-table-wrapper">
                      <table className="att-history-table">
                        <thead>
                          <tr>
                            <th style={{ width: '70px', textAlign: 'center' }}>Sl. No.</th>
                            <th>Class Date</th>
                            <th style={{ width: '140px', textAlign: 'center' }}>Attendance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history.map((row) => (
                            <tr key={row.slNo} className={row.status === 'Absent' ? 'row-absent' : 'row-present'}>
                              <td className="sl-col" style={{ textAlign: 'center' }}>{row.slNo}</td>
                              <td className="date-col">
                                <CalendarDays size={13} />
                                <span>{row.date}</span>
                              </td>
                              <td className="status-col" style={{ textAlign: 'center' }}>
                                {row.status === 'Present' ? (
                                  <span className="att-status-badge present">
                                    <CheckCircle2 size={12} /> Present
                                  </span>
                                ) : (
                                  <span className="att-status-badge absent">
                                    <XCircle size={12} /> Absent
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {tab === 'calendar' && (
        <div className="att-calendar-section">
          <div className="att-calendar-nav">
            <button onClick={() => setVm(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))} aria-label="Previous month">
              <ChevronLeft size={16} />
            </button>
            <strong>{ml}</strong>
            <button onClick={() => setVm(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))} aria-label="Next month">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="att-cal-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <span key={d} className="att-cal-day-label">{d}</span>
            ))}
            {cells.map((d, i) => (
              <span key={i} className={`att-cal-cell ${gs(d)}`}>{d || ''}</span>
            ))}
          </div>
          <div className="att-cal-legend">
            <span><i className="legend-dot present" /> Present</span>
            <span><i className="legend-dot absent" /> Absent</span>
            <span><i className="legend-dot holiday" /> Holiday</span>
            <span><i className="legend-dot weekend" /> Weekend</span>
          </div>
        </div>
      )}

      {tab === 'trend' && (
        <div className="att-trend-section">
          <p className="att-trend-caption">Month-by-month attendance percentage for the current academic year.</p>
          <div className="att-bar-chart">
            {M.map(({ month, pct: p }) => (
              <div key={month} className="att-bar-chart-col">
                <span className="att-bar-chart-label">{p}%</span>
                <div className="att-bar-chart-track">
                  <div className={`att-bar-chart-fill ${bs(p)}`} style={{ height: `${p}%` }} />
                  <div className="att-bar-chart-threshold" style={{ bottom: `${TH}%` }} />
                </div>
                <span className="att-bar-chart-month">{month}</span>
              </div>
            ))}
          </div>
          <div className="att-trend-summary">
            {M.map(({ month, pct: p }, i) => {
              const prev = M[i - 1]
              const delta = prev ? p - prev.pct : null
              return (
                <div key={month} className="att-trend-row">
                  <strong>{month} 2026</strong>
                  <span className={`att-pct-badge ${bs(p)}`}>{p}%</span>
                  {delta !== null && (
                    <span className={`att-delta ${delta >= 0 ? 'pos' : 'neg'}`}>
                      {delta >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      {Math.abs(delta)}%
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
