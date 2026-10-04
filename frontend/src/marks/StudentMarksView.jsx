// src/marks/StudentMarksView.jsx
import React, { useState } from 'react'
import {
  BookOpen,
  Award,
  ChevronRight,
  TrendingUp,
  X,
  CheckCircle2,
  Calendar,
  Sparkles,
  BarChart3,
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react'
import {
  SUBJECTS,
  ASSESSMENT_CONFIG,
  computeStudentSubjectTotal,
} from './marksData'

export default function StudentMarksView({
  student,
  marksMap,
  onOpenAnalytics,
}) {
  const [selectedSubject, setSelectedSubject] = useState(null)

  // Compute student stats across all subjects
  const subjectScores = SUBJECTS.map((subject) => {
    const sMarks = marksMap[subject.id]?.[student.id] || {}
    const stats = computeStudentSubjectTotal(sMarks)
    return {
      ...subject,
      stats,
    }
  })

  const overallAvg = Math.round(
    subjectScores.reduce((sum, s) => sum + s.stats.pct, 0) / subjectScores.length
  )

  return (
    <div className="mm-student-view">
      {/* Student Welcome Hero Header */}
      <div className="mm-student-hero">
        <div className="mm-student-hero-content">
          <div className="mm-student-avatar-lg">
            {student.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
          </div>
          <div className="mm-student-hero-details">
            <span className="mm-student-hero-eyebrow">
              <Sparkles size={13} /> Student Performance Record · Semester 5
            </span>
            <h2>{student.name}</h2>
            <p className="mm-student-hero-sub">
              Roll No: <strong>{student.rollNo}</strong> · Registration No: <strong>{student.regNo}</strong> · Section: <strong>{student.section}</strong>
            </p>
          </div>
        </div>

        <div className="mm-student-overall-badge">
          <div className="mm-overall-score-circle">
            <strong>{overallAvg}%</strong>
            <small>Average</small>
          </div>
          <div className="mm-overall-copy">
            <strong>Cumulative Internal</strong>
            <span>Above class cutoff</span>
          </div>
        </div>
      </div>

      {/* 6 Subject Cards Grid (Requirement Section 5) */}
      <div className="mm-section-head">
        <div>
          <h3>Enrolled Subjects (Semester 5)</h3>
          <p>Continuous internal evaluation across modular exams, quizzes, assignments, surprise tests, and lab.</p>
        </div>
      </div>

      <div className="mm-student-subjects-grid">
        {subjectScores.map((subject) => {
          const pct = subject.stats.pct
          const tone = pct >= 85 ? 'green' : pct >= 75 ? 'blue' : pct >= 60 ? 'amber' : 'purple'

          return (
            <div key={subject.id} className="mm-student-card">
              <div className="mm-student-card-header">
                <div>
                  <span className="mm-card-code">{subject.code}</span>
                  <h4 className="mm-card-title">{subject.name}</h4>
                  <small className="mm-card-faculty">{subject.faculty} · {subject.credits} Credits</small>
                </div>
                <div className={`mm-badge-pct tone-${tone}`}>
                  {pct}%
                </div>
              </div>

              <div className="mm-student-card-body">
                <div className="mm-score-stat-line">
                  <span>Internal Marks:</span>
                  <strong>{pct}% ({subject.stats.earned} / {subject.stats.totalMax})</strong>
                </div>

                <div className="mm-progress-bar-wrapper">
                  <div className="mm-progress-bar-bg">
                    <div
                      className={`mm-progress-bar-fill tone-${tone}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="mm-mini-indicators">
                  <span>Mod: 2/2</span>
                  <span>Quiz: 6/6</span>
                  <span>Assign: 2/2</span>
                  <span>ST: 2/2</span>
                  <span>Lab: 1/1</span>
                </div>
              </div>

              <div className="mm-student-card-footer">
                <button
                  type="button"
                  className="mm-btn-view-details"
                  onClick={() => setSelectedSubject(subject)}
                >
                  <span>View Details</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Subject Details Modal / Breakdown (Requirement Section 6) */}
      {selectedSubject && (
        <div className="mm-modal-backdrop" onClick={() => setSelectedSubject(null)}>
          <div
            className="mm-modal-window mm-subject-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mm-modal-header">
              <div className="mm-modal-title-stack">
                <span className="mm-pill-tag">{selectedSubject.code} · {selectedSubject.credits} Credits</span>
                <h3>{selectedSubject.name}</h3>
                <p>Faculty: {selectedSubject.faculty} · {selectedSubject.room}</p>
              </div>
              <button
                type="button"
                className="mm-modal-close-btn"
                onClick={() => setSelectedSubject(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mm-modal-body">
              {/* Modular Exams */}
              <div className="mm-breakdown-section">
                <div className="mm-breakdown-header">
                  <div className="mm-icon-wrap blue"><FileText size={16} /></div>
                  <h4>Modular Exams</h4>
                </div>
                <div className="mm-breakdown-grid">
                  {ASSESSMENT_CONFIG.filter((a) => a.type === 'modular').map((a) => {
                    const mark = marksMap[selectedSubject.id]?.[student.id]?.[a.key]
                    const val = mark !== '' && mark !== undefined ? mark : '—'
                    return (
                      <div key={a.key} className="mm-breakdown-row">
                        <span className="mm-row-label">{a.fullName}</span>
                        <strong className="mm-row-val">{val} <small>/ {a.maxMarks}</small></strong>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quizzes */}
              <div className="mm-breakdown-section">
                <div className="mm-breakdown-header">
                  <div className="mm-icon-wrap green"><CheckCircle2 size={16} /></div>
                  <h4>Quizzes</h4>
                </div>
                <div className="mm-breakdown-grid cols-3">
                  {ASSESSMENT_CONFIG.filter((a) => a.type === 'quizzes').map((a) => {
                    const mark = marksMap[selectedSubject.id]?.[student.id]?.[a.key]
                    const val = mark !== '' && mark !== undefined ? mark : '—'
                    return (
                      <div key={a.key} className="mm-breakdown-row">
                        <span className="mm-row-label">{a.fullName}</span>
                        <strong className="mm-row-val">{val} <small>/ {a.maxMarks}</small></strong>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Assignments */}
              <div className="mm-breakdown-section">
                <div className="mm-breakdown-header">
                  <div className="mm-icon-wrap purple"><BookOpen size={16} /></div>
                  <h4>Assignments</h4>
                </div>
                <div className="mm-breakdown-grid">
                  {ASSESSMENT_CONFIG.filter((a) => a.type === 'assignments').map((a) => {
                    const mark = marksMap[selectedSubject.id]?.[student.id]?.[a.key]
                    const val = mark !== '' && mark !== undefined ? mark : '—'
                    return (
                      <div key={a.key} className="mm-breakdown-row">
                        <span className="mm-row-label">{a.fullName}</span>
                        <strong className="mm-row-val">{val} <small>/ {a.maxMarks}</small></strong>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Surprise Tests */}
              <div className="mm-breakdown-section">
                <div className="mm-breakdown-header">
                  <div className="mm-icon-wrap amber"><Sparkles size={16} /></div>
                  <h4>Surprise Tests</h4>
                </div>
                <div className="mm-breakdown-grid">
                  {ASSESSMENT_CONFIG.filter((a) => a.type === 'surprise').map((a) => {
                    const mark = marksMap[selectedSubject.id]?.[student.id]?.[a.key]
                    const val = mark !== '' && mark !== undefined ? mark : '—'
                    return (
                      <div key={a.key} className="mm-breakdown-row">
                        <span className="mm-row-label">{a.fullName}</span>
                        <strong className="mm-row-val">{val} <small>/ {a.maxMarks}</small></strong>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Lab */}
              <div className="mm-breakdown-section">
                <div className="mm-breakdown-header">
                  <div className="mm-icon-wrap teal"><Clock size={16} /></div>
                  <h4>Lab Practical</h4>
                </div>
                <div className="mm-breakdown-grid">
                  {ASSESSMENT_CONFIG.filter((a) => a.type === 'lab').map((a) => {
                    const mark = marksMap[selectedSubject.id]?.[student.id]?.[a.key]
                    const val = mark !== '' && mark !== undefined ? mark : '—'
                    return (
                      <div key={a.key} className="mm-breakdown-row">
                        <span className="mm-row-label">{a.fullName}</span>
                        <strong className="mm-row-val">{val} <small>/ {a.maxMarks}</small></strong>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Overall Performance summary */}
              <div className="mm-overall-summary-card">
                <div>
                  <span>Overall Performance</span>
                  <h3>{selectedSubject.stats.pct}%</h3>
                  <small>Total: {selectedSubject.stats.earned} of {selectedSubject.stats.totalMax} Points</small>
                </div>
                <button
                  type="button"
                  className="mm-btn mm-btn-primary"
                  onClick={() => {
                    setSelectedSubject(null)
                    if (onOpenAnalytics) onOpenAnalytics(selectedSubject.id)
                  }}
                >
                  <BarChart3 size={15} />
                  <span>View Performance Analytics</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
