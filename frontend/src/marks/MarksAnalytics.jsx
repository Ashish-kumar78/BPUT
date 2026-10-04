// src/marks/MarksAnalytics.jsx
import React, { useState, useMemo } from 'react'
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  PieChart,
  Layers,
  ArrowRight,
} from 'lucide-react'
import {
  SUBJECTS,
  ASSESSMENT_CONFIG,
  computeStudentSubjectTotal,
} from './marksData'

export default function MarksAnalytics({
  students,
  marksMap,
  currentSubjectId,
  onSelectSubject,
}) {
  const [selectedSubjId, setSelectedSubjId] = useState(currentSubjectId || 'dsa')

  const currentSubject = SUBJECTS.find((s) => s.id === selectedSubjId) || SUBJECTS[0]

  // Calculate subject-wise averages for all 6 subjects
  const subjectPerformance = useMemo(() => {
    return SUBJECTS.map((subj) => {
      let totalPct = 0
      students.forEach((student) => {
        const sm = marksMap[subj.id]?.[student.id]
        if (sm) {
          const { pct } = computeStudentSubjectTotal(sm)
          totalPct += pct
        }
      })
      const avg = Math.round(totalPct / students.length)
      return {
        ...subj,
        avg,
      }
    })
  }, [students, marksMap])

  // Category breakdown for current selected subject
  const categoryStats = useMemo(() => {
    const cats = [
      { key: 'modular', label: 'Modular Exams', color: '#2563eb' },
      { key: 'quizzes', label: 'Quizzes', color: '#059669' },
      { key: 'assignments', label: 'Assignments', color: '#7c3aed' },
      { key: 'surprise', label: 'Surprise Tests', color: '#d97706' },
      { key: 'lab', label: 'Lab Practical', color: '#0284c7' },
    ]

    return cats.map((cat) => {
      const items = ASSESSMENT_CONFIG.filter((a) => a.type === cat.key)
      let sumPct = 0
      let count = 0

      students.forEach((student) => {
        const sMarks = marksMap[selectedSubjId]?.[student.id] || {}
        items.forEach((item) => {
          const val = sMarks[item.key]
          if (val !== '' && val !== null && val !== undefined && !isNaN(Number(val))) {
            sumPct += (Number(val) / item.maxMarks) * 100
            count++
          }
        })
      })

      const avg = count > 0 ? Math.round(sumPct / count) : 0
      return {
        ...cat,
        avg,
        assessmentsCount: items.length,
      }
    })
  }, [students, marksMap, selectedSubjId])

  // Grade distribution for current selected subject
  const gradeDistribution = useMemo(() => {
    const dist = {
      'O (90-100%)': { count: 0, color: '#10b981', label: 'Outstanding' },
      'A+ (80-89%)': { count: 0, color: '#2563eb', label: 'Excellent' },
      'A (70-79%)': { count: 0, color: '#6366f1', label: 'Very Good' },
      'B+ (60-69%)': { count: 0, color: '#f59e0b', label: 'Good' },
      'B (50-59%)': { count: 0, color: '#f97316', label: 'Above Average' },
      'Needs Work (<50%)': { count: 0, color: '#ef4444', label: 'Review Needed' },
    }

    students.forEach((student) => {
      const sm = marksMap[selectedSubjId]?.[student.id]
      if (sm) {
        const { pct } = computeStudentSubjectTotal(sm)
        if (pct >= 90) dist['O (90-100%)'].count++
        else if (pct >= 80) dist['A+ (80-89%)'].count++
        else if (pct >= 70) dist['A (70-79%)'].count++
        else if (pct >= 60) dist['B+ (60-69%)'].count++
        else if (pct >= 50) dist['B (50-59%)'].count++
        else dist['Needs Work (<50%)'].count++
      }
    })

    return dist
  }, [students, marksMap, selectedSubjId])

  // Top 5 performers in this subject
  const topPerformers = useMemo(() => {
    const list = students.map((student) => {
      const sm = marksMap[selectedSubjId]?.[student.id] || {}
      const { earned, pct } = computeStudentSubjectTotal(sm)
      return {
        ...student,
        earned,
        pct,
      }
    })

    list.sort((a, b) => b.pct - a.pct)
    return list.slice(0, 5)
  }, [students, marksMap, selectedSubjId])

  return (
    <div className="mm-analytics-container">
      {/* Header with Subject Switcher */}
      <div className="mm-analytics-header">
        <div>
          <h3>Marks & Continuous Assessment Analytics</h3>
          <p>Multi-dimensional performance breakdown, cohort distributions, and trend analysis.</p>
        </div>

        <div className="mm-analytics-subject-select">
          <label>Analyze Subject:</label>
          <select
            value={selectedSubjId}
            onChange={(e) => {
              setSelectedSubjId(e.target.value)
              if (onSelectSubject) onSelectSubject(e.target.value)
            }}
            className="mm-select"
          >
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code} - {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 1: All 6 Subjects Comparison (Requirement Section 7) */}
      <div className="mm-analytics-card">
        <div className="mm-card-head-simple">
          <div>
            <h4>Subject Performance Comparison (Class Average)</h4>
            <p>Overall performance across all 6 continuous evaluation subjects</p>
          </div>
          <span className="mm-pill-badge">{students.length} Students Evaluated</span>
        </div>

        <div className="mm-chart-bars-list">
          {subjectPerformance.map((item) => (
            <div
              key={item.id}
              className={`mm-bar-item ${item.id === selectedSubjId ? 'highlighted' : ''}`}
              onClick={() => setSelectedSubjId(item.id)}
            >
              <div className="mm-bar-labels">
                <strong>{item.shortName}</strong>
                <span className="mm-bar-full-name">{item.name}</span>
                <span className="mm-bar-pct-val">{item.avg}%</span>
              </div>
              <div className="mm-bar-track-outer">
                <div
                  className="mm-bar-track-inner"
                  style={{
                    width: `${item.avg}%`,
                    background: item.id === selectedSubjId ? 'linear-gradient(90deg, #2563eb, #4f46e5)' : '#94a3b8',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Category Breakdown & Grade Distribution */}
      <div className="mm-analytics-two-col">
        {/* Assessment Categories Breakdown */}
        <div className="mm-analytics-card">
          <div className="mm-card-head-simple">
            <div>
              <h4>{currentSubject.shortName} Assessment Categories</h4>
              <p>Average score by component type</p>
            </div>
            <Layers size={18} className="mm-text-blue" />
          </div>

          <div className="mm-cat-grid">
            {categoryStats.map((cat) => (
              <div key={cat.key} className="mm-cat-card">
                <div className="mm-cat-header">
                  <span>{cat.label}</span>
                  <strong style={{ color: cat.color }}>{cat.avg}%</strong>
                </div>
                <div className="mm-progress-bar-bg mini">
                  <div
                    className="mm-progress-bar-fill"
                    style={{ width: `${cat.avg}%`, backgroundColor: cat.color }}
                  />
                </div>
                <small className="mm-cat-sub">{cat.assessmentsCount} Assessments Included</small>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="mm-analytics-card">
          <div className="mm-card-head-simple">
            <div>
              <h4>Grade Cohort Distribution</h4>
              <p>Score spread for {currentSubject.name}</p>
            </div>
            <PieChart size={18} className="mm-text-purple" />
          </div>

          <div className="mm-grade-list">
            {Object.entries(gradeDistribution).map(([gradeKey, item]) => {
              const pctOfClass = Math.round((item.count / students.length) * 100)
              return (
                <div key={gradeKey} className="mm-grade-row">
                  <div className="mm-grade-label-wrap">
                    <span className="mm-grade-dot" style={{ backgroundColor: item.color }} />
                    <span className="mm-grade-name">{gradeKey}</span>
                    <small className="mm-grade-desc">({item.label})</small>
                  </div>
                  <div className="mm-grade-bar-wrap">
                    <div className="mm-progress-bar-bg mini">
                      <div
                        className="mm-progress-bar-fill"
                        style={{ width: `${pctOfClass}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                  <div className="mm-grade-counts">
                    <strong>{item.count}</strong>
                    <small>{pctOfClass}%</small>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Row 3: Top Performers Leaderboard */}
      <div className="mm-analytics-card">
        <div className="mm-card-head-simple">
          <div>
            <h4>Top Performers · {currentSubject.name}</h4>
            <p>Students with the highest continuous evaluation marks in this course</p>
          </div>
          <Award size={18} className="mm-text-amber" />
        </div>

        <div className="mm-leaderboard-grid">
          {topPerformers.map((student, idx) => (
            <div key={student.id} className="mm-leaderboard-card">
              <div className="mm-rank-badge">#{idx + 1}</div>
              <div className="mm-mini-avatar">
                {student.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div className="mm-lead-info">
                <strong>{student.name}</strong>
                <small>Roll {student.rollNo} · Sec {student.section}</small>
              </div>
              <div className="mm-lead-score">
                <span className="mm-lead-pct">{student.pct}%</span>
                <small>{student.earned} pts</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
