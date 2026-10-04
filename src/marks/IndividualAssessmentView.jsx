// src/marks/IndividualAssessmentView.jsx
import React, { useState, useMemo } from 'react'
import {
  Search,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Save,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Filter,
  Users,
  Award,
} from 'lucide-react'

export default function IndividualAssessmentView({
  subject,
  assessment,
  students,
  marksMap,
  onUpdateMarks,
  onSaveDraft,
  onFinalize,
  assessmentStatus,
  onBackToMatrix,
  onSwitchAssessment,
  assessmentList,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'filled' | 'pending'

  // Filter students based on search and status
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const markVal = marksMap[subject.id]?.[student.id]?.[assessment.key]
      const isFilled = markVal !== '' && markVal !== null && markVal !== undefined

      if (statusFilter === 'filled' && !isFilled) return false
      if (statusFilter === 'pending' && isFilled) return false

      if (!searchTerm.trim()) return true
      const q = searchTerm.toLowerCase()
      return (
        student.name.toLowerCase().includes(q) ||
        student.rollNo.includes(q) ||
        student.regNo.toLowerCase().includes(q)
      )
    })
  }, [students, marksMap, subject.id, assessment.key, searchTerm, statusFilter])

  // Aggregate stats for this assessment
  const stats = useMemo(() => {
    let filled = 0
    let totalMarks = 0
    let highest = 0
    let lowest = assessment.maxMarks

    students.forEach((student) => {
      const val = marksMap[subject.id]?.[student.id]?.[assessment.key]
      if (val !== '' && val !== null && val !== undefined && !isNaN(Number(val))) {
        const num = Number(val)
        filled++
        totalMarks += num
        if (num > highest) highest = num
        if (num < lowest) lowest = num
      }
    })

    const avg = filled > 0 ? (totalMarks / filled).toFixed(1) : '—'
    return {
      filled,
      pending: students.length - filled,
      avg,
      highest: filled > 0 ? highest : '—',
      lowest: filled > 0 ? lowest : '—',
    }
  }, [students, marksMap, subject.id, assessment.key, assessment.maxMarks])

  const currentStatus = assessmentStatus?.[subject.id]?.[assessment.key] || 'draft'

  // Find next and previous assessments for fast arrow navigation
  const currentIndex = assessmentList.findIndex((a) => a.key === assessment.key)
  const prevAssessment = currentIndex > 0 ? assessmentList[currentIndex - 1] : null
  const nextAssessment = currentIndex < assessmentList.length - 1 ? assessmentList[currentIndex + 1] : null

  function handleInputChange(studentId, rawValue) {
    if (rawValue === '') {
      onUpdateMarks(subject.id, studentId, assessment.key, '')
      return
    }
    const num = Number(rawValue)
    if (isNaN(num)) return
    if (num < 0) return
    if (num > assessment.maxMarks) {
      alert(`Maximum marks for ${assessment.fullName} is ${assessment.maxMarks}`)
      return
    }
    onUpdateMarks(subject.id, studentId, assessment.key, num)
  }

  // Handle keyboard navigation between rows using ArrowUp and ArrowDown
  function handleKeyDown(e, idx) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextInput = document.getElementById(`indiv-mark-input-${idx + 1}`)
      if (nextInput) nextInput.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevInput = document.getElementById(`indiv-mark-input-${idx - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  return (
    <div className="mm-indiv-assessment">
      {/* Header and Back navigation */}
      <div className="mm-indiv-top-bar">
        <button
          type="button"
          className="mm-btn mm-btn-outline"
          onClick={onBackToMatrix}
        >
          <ArrowLeft size={16} />
          <span>Back to All Assessments Matrix</span>
        </button>

        <div className="mm-assessment-switcher">
          <button
            type="button"
            className="mm-btn-icon-nav"
            disabled={!prevAssessment}
            onClick={() => prevAssessment && onSwitchAssessment(prevAssessment.key)}
            title={prevAssessment ? `Previous: ${prevAssessment.fullName}` : 'No previous assessment'}
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>
          <span className="mm-current-nav-label">{assessment.fullName}</span>
          <button
            type="button"
            className="mm-btn-icon-nav"
            disabled={!nextAssessment}
            onClick={() => nextAssessment && onSwitchAssessment(nextAssessment.key)}
            title={nextAssessment ? `Next: ${nextAssessment.fullName}` : 'No next assessment'}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Focus Header Card */}
      <div className="mm-indiv-header-card">
        <div className="mm-indiv-title-block">
          <div className="mm-subject-pill-tag">
            <span>{subject.code}</span> · <strong>{subject.name}</strong>
          </div>
          <h2>{assessment.fullName} ({assessment.label})</h2>
          <div className="mm-indiv-meta-pills">
            <span className="mm-badge-meta">
              <Award size={14} /> Maximum Marks: <strong>{assessment.maxMarks}</strong>
            </span>
            <span className="mm-badge-meta">
              <Users size={14} /> Total Students: <strong>{students.length}</strong>
            </span>
            <span className={`mm-badge-status status-${currentStatus}`}>
              {currentStatus === 'finalized' && <CheckCircle2 size={13} />}
              {currentStatus === 'draft' && <Save size={13} />}
              {currentStatus === 'pending' && <AlertCircle size={13} />}
              <span>Status: {currentStatus.toUpperCase()}</span>
            </span>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="mm-indiv-stats-strip">
          <div className="mm-stat-box">
            <span>Entered</span>
            <strong>{stats.filled} <small>/ {students.length}</small></strong>
          </div>
          <div className="mm-stat-box">
            <span>Pending</span>
            <strong className={stats.pending > 0 ? 'text-amber' : 'text-green'}>
              {stats.pending}
            </strong>
          </div>
          <div className="mm-stat-box">
            <span>Average</span>
            <strong>{stats.avg} <small>/ {assessment.maxMarks}</small></strong>
          </div>
          <div className="mm-stat-box">
            <span>Highest / Lowest</span>
            <strong>{stats.highest} / {stats.lowest}</strong>
          </div>
        </div>
      </div>

      {/* Filter and Action toolbar */}
      <div className="mm-indiv-toolbar">
        <div className="mm-search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by student name, roll number, or reg no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mm-status-filter-pills">
          <button
            type="button"
            className={`mm-pill-filter ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All ({students.length})
          </button>
          <button
            type="button"
            className={`mm-pill-filter ${statusFilter === 'filled' ? 'active' : ''}`}
            onClick={() => setStatusFilter('filled')}
          >
            Entered ({stats.filled})
          </button>
          <button
            type="button"
            className={`mm-pill-filter ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending ({stats.pending})
          </button>
        </div>

        <div className="mm-action-btns">
          <button
            type="button"
            className="mm-btn mm-btn-secondary"
            onClick={() => onSaveDraft(subject.id, assessment.key)}
          >
            <Save size={15} />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            className="mm-btn mm-btn-primary"
            onClick={() => onFinalize(subject.id, assessment.key)}
          >
            <FileCheck2 size={15} />
            <span>Finalize Assessment</span>
          </button>
        </div>
      </div>

      {/* Table view */}
      <div className="mm-table-container">
        <table className="mm-data-table mm-indiv-table">
          <thead>
            <tr>
              <th style={{ width: '90px' }}>Roll No</th>
              <th style={{ width: '140px' }}>Reg Number</th>
              <th>Student Name</th>
              <th style={{ width: '100px' }}>Section</th>
              <th style={{ width: '160px', textAlign: 'center' }}>
                Marks (Max: {assessment.maxMarks})
              </th>
              <th style={{ width: '120px', textAlign: 'center' }}>Percentage</th>
              <th style={{ width: '130px', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={7} className="mm-empty-row">
                  No students found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, idx) => {
                const markVal = marksMap[subject.id]?.[student.id]?.[assessment.key]
                const isEntered = markVal !== '' && markVal !== null && markVal !== undefined
                const pct = isEntered ? Math.round((Number(markVal) / assessment.maxMarks) * 100) : null

                return (
                  <tr key={student.id} className={!isEntered ? 'is-pending-row' : ''}>
                    <td className="mm-bold-roll">{student.rollNo}</td>
                    <td className="mm-text-muted">{student.regNo}</td>
                    <td>
                      <div className="mm-student-cell">
                        <div className="mm-mini-avatar">
                          {student.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                        </div>
                        <strong>{student.name}</strong>
                      </div>
                    </td>
                    <td>
                      <span className="mm-section-badge">Sec {student.section}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div className="mm-input-cell-wrap">
                        <input
                          id={`indiv-mark-input-${idx}`}
                          type="number"
                          min={0}
                          max={assessment.maxMarks}
                          step={1}
                          className={`mm-mark-input ${!isEntered ? 'empty' : 'filled'}`}
                          value={markVal !== undefined ? markVal : ''}
                          onChange={(e) => handleInputChange(student.id, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, idx)}
                          placeholder="—"
                        />
                        <span className="mm-max-sub">/ {assessment.maxMarks}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {pct !== null ? (
                        <div className="mm-pct-wrap">
                          <span className={`mm-pct-pill ${pct >= 80 ? 'high' : pct >= 60 ? 'mid' : 'low'}`}>
                            {pct}%
                          </span>
                        </div>
                      ) : (
                        <span className="mm-text-muted">—</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {isEntered ? (
                        <span className="mm-status-pill success">
                          <CheckCircle2 size={13} />
                          <span>Entered</span>
                        </span>
                      ) : (
                        <span className="mm-status-pill pending">
                          <AlertCircle size={13} />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Save & Finalize floating actions */}
      <div className="mm-bottom-actions-bar">
        <div className="mm-bottom-info">
          <span>Showing <strong>{filteredStudents.length}</strong> of {students.length} students</span>
          <span className="mm-dot-sep">•</span>
          <span>Max Marks: <strong>{assessment.maxMarks}</strong></span>
          <span className="mm-dot-sep">•</span>
          <span>Tip: Use <strong>↑</strong> and <strong>↓</strong> arrow keys to quickly jump between student marks.</span>
        </div>
        <div className="mm-bottom-btns">
          <button
            type="button"
            className="mm-btn mm-btn-secondary"
            onClick={() => onSaveDraft(subject.id, assessment.key)}
          >
            <Save size={15} />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            className="mm-btn mm-btn-primary"
            onClick={() => onFinalize(subject.id, assessment.key)}
          >
            <FileCheck2 size={15} />
            <span>Finalize</span>
          </button>
        </div>
      </div>
    </div>
  )
}
