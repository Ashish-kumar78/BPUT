// src/marks/TeacherMarksTable.jsx
import React, { useState, useMemo } from 'react'
import {
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Save,
  FileCheck2,
  Upload,
  Download,
  ArrowUpDown,
  ExternalLink,
  Info,
} from 'lucide-react'
import {
  ASSESSMENT_TYPES,
  ASSESSMENT_CONFIG,
  computeStudentSubjectTotal,
} from './marksData'

export default function TeacherMarksTable({
  subject,
  students,
  marksMap,
  onUpdateMarks,
  onSaveDraft,
  onFinalize,
  assessmentStatus,
  onOpenIndividualAssessment,
  onOpenBulkUpload,
}) {
  const [selectedType, setSelectedType] = useState('all') // 'all' | 'modular' | 'quizzes' | 'assignments' | 'surprise' | 'lab'
  const [searchTerm, setSearchTerm] = useState('')
  const [sectionFilter, setSectionFilter] = useState('all') // 'all' | 'A' | 'B'
  const [activeCell, setActiveCell] = useState(null) // { studentId, key }

  // Filter columns based on assessment tab
  const visibleAssessments = useMemo(() => {
    if (selectedType === 'all') return ASSESSMENT_CONFIG
    return ASSESSMENT_CONFIG.filter((a) => a.type === selectedType)
  }, [selectedType])

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (sectionFilter !== 'all' && student.section !== sectionFilter) return false
      if (!searchTerm.trim()) return true
      const q = searchTerm.toLowerCase()
      return (
        student.name.toLowerCase().includes(q) ||
        student.rollNo.includes(q) ||
        student.regNo.toLowerCase().includes(q)
      )
    })
  }, [students, searchTerm, sectionFilter])

  function handleCellChange(studentId, assessmentKey, maxMarks, rawValue) {
    if (rawValue === '') {
      onUpdateMarks(subject.id, studentId, assessmentKey, '')
      return
    }
    const num = Number(rawValue)
    if (isNaN(num)) return
    if (num < 0 || num > maxMarks) {
      alert(`Marks must be between 0 and ${maxMarks}`)
      return
    }
    onUpdateMarks(subject.id, studentId, assessmentKey, num)
  }

  // Keyboard navigation across matrix
  function handleKeyDown(e, rowIdx, colIdx) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const el = document.getElementById(`matrix-cell-${rowIdx + 1}-${colIdx}`)
      if (el) el.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const el = document.getElementById(`matrix-cell-${rowIdx - 1}-${colIdx}`)
      if (el) el.focus()
    } else if (e.key === 'ArrowRight' && e.target.selectionStart === e.target.value.length) {
      const el = document.getElementById(`matrix-cell-${rowIdx}-${colIdx + 1}`)
      if (el) el.focus()
    } else if (e.key === 'ArrowLeft' && e.target.selectionStart === 0) {
      const el = document.getElementById(`matrix-cell-${rowIdx}-${colIdx - 1}`)
      if (el) el.focus()
    }
  }

  // Export current table view as mock CSV
  function handleExportCSV() {
    let csv = `Roll No,Reg No,Student Name,Section,${visibleAssessments.map((a) => `${a.label} (${a.maxMarks})`).join(',')},Total,Pct%\n`
    filteredStudents.forEach((student) => {
      const sMarks = marksMap[subject.id]?.[student.id] || {}
      const { earned, pct } = computeStudentSubjectTotal(sMarks)
      const values = visibleAssessments.map((a) => (sMarks[a.key] !== undefined ? sMarks[a.key] : ''))
      csv += `${student.rollNo},${student.regNo},"${student.name}",${student.section},${values.join(',')},${earned},${pct}%\n`
    })

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${subject.code}_Marks_Export.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="mm-teacher-table-view">
      {/* Assessment Tabs bar */}
      <div className="mm-tabs-wrapper">
        <div className="mm-assessment-tabs" role="tablist">
          {ASSESSMENT_TYPES.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              className={`mm-tab-btn ${selectedType === t.key ? 'active' : ''}`}
              aria-selected={selectedType === t.key}
              onClick={() => setSelectedType(t.key)}
            >
              <span>{t.label}</span>
              {t.key !== 'all' && (
                <small className="mm-tab-count">
                  {ASSESSMENT_CONFIG.filter((a) => a.type === t.key).length}
                </small>
              )}
            </button>
          ))}
        </div>

        {/* Sub-selector buttons if a specific category is chosen */}
        {selectedType !== 'all' && (
          <div className="mm-sub-chips-row">
            <span className="mm-sub-chip-label">Quick Jump to Single Assessment:</span>
            {visibleAssessments.map((a) => {
              const status = assessmentStatus?.[subject.id]?.[a.key] || 'draft'
              return (
                <button
                  key={a.key}
                  type="button"
                  className="mm-sub-chip"
                  onClick={() => onOpenIndividualAssessment(a.key)}
                  title={`Open dedicated entry page for ${a.fullName}`}
                >
                  <span className={`mm-dot-indicator status-${status}`} />
                  <strong>{a.fullName}</strong>
                  <small>Max {a.maxMarks}</small>
                  <ExternalLink size={12} className="mm-ml-1" />
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Control bar: search, section filter, bulk upload, CSV */}
      <div className="mm-table-controls-bar">
        <div className="mm-controls-left">
          <div className="mm-search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search student by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mm-filter-group">
            <span className="mm-filter-label">Section:</span>
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="mm-select-inline"
            >
              <option value="all">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>
        </div>

        <div className="mm-controls-right">
          <button
            type="button"
            className="mm-btn mm-btn-outline"
            onClick={onOpenBulkUpload}
            title="Upload marks using Excel or CSV template"
          >
            <Upload size={15} />
            <span>Bulk Upload Marks</span>
          </button>

          <button
            type="button"
            className="mm-btn mm-btn-outline"
            onClick={handleExportCSV}
            title="Download marks spreadsheet"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            className="mm-btn mm-btn-secondary"
            onClick={() => onSaveDraft(subject.id, 'all')}
          >
            <Save size={15} />
            <span>Save All Drafts</span>
          </button>
        </div>
      </div>

      {/* Matrix Table with Sticky Columns and Headers */}
      <div className="mm-matrix-table-wrap">
        <table className="mm-data-table mm-matrix-table">
          <thead>
            <tr>
              <th className="sticky-col col-roll" style={{ left: 0, zIndex: 12 }}>
                Roll
              </th>
              <th className="sticky-col col-name" style={{ left: '60px', zIndex: 12 }}>
                Student Name
              </th>

              {visibleAssessments.map((a) => {
                const status = assessmentStatus?.[subject.id]?.[a.key] || 'draft'
                return (
                  <th key={a.key} className="col-assessment">
                    <div
                      className="mm-col-header-interactive"
                      onClick={() => onOpenIndividualAssessment(a.key)}
                      title={`Click to open dedicated view for ${a.fullName}`}
                    >
                      <div className="mm-th-top">
                        <span className={`mm-th-status-dot status-${status}`} />
                        <strong>{a.label}</strong>
                      </div>
                      <div className="mm-th-sub">
                        <span>Max {a.maxMarks}</span>
                        <ExternalLink size={10} />
                      </div>
                    </div>
                  </th>
                )
              })}

              <th className="col-total" style={{ textAlign: 'center' }}>Total</th>
              <th className="col-pct" style={{ textAlign: 'center' }}>Pct %</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={visibleAssessments.length + 4} className="mm-empty-row">
                  No students found matching current filters.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, rowIdx) => {
                const sMarks = marksMap[subject.id]?.[student.id] || {}
                const { earned, totalMax, pct, pendingCount } = computeStudentSubjectTotal(sMarks)

                return (
                  <tr key={student.id}>
                    {/* Sticky Roll column */}
                    <td className="sticky-col col-roll" style={{ left: 0 }}>
                      <span className="mm-roll-text">{student.rollNo}</span>
                    </td>

                    {/* Sticky Student Name column */}
                    <td className="sticky-col col-name" style={{ left: '60px' }}>
                      <div className="mm-student-cell">
                        <div className="mm-mini-avatar">
                          {student.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                        </div>
                        <div className="mm-student-name-stack">
                          <strong className="mm-name-text">{student.name}</strong>
                          <small className="mm-sub-reg">{student.regNo}</small>
                        </div>
                      </div>
                    </td>

                    {/* Assessment mark cells */}
                    {visibleAssessments.map((a, colIdx) => {
                      const val = sMarks[a.key]
                      const isFilled = val !== '' && val !== null && val !== undefined
                      const isHigh = isFilled && Number(val) >= a.maxMarks * 0.85
                      const isLow = isFilled && Number(val) < a.maxMarks * 0.5

                      return (
                        <td key={a.key} className="col-assessment-cell">
                          <input
                            id={`matrix-cell-${rowIdx}-${colIdx}`}
                            type="number"
                            min={0}
                            max={a.maxMarks}
                            step={1}
                            className={`mm-matrix-input ${!isFilled ? 'empty' : isHigh ? 'high' : isLow ? 'low' : 'normal'}`}
                            value={val !== undefined ? val : ''}
                            onChange={(e) => handleCellChange(student.id, a.key, a.maxMarks, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, rowIdx, colIdx)}
                            onFocus={() => setActiveCell({ studentId: student.id, key: a.key })}
                            placeholder="—"
                          />
                        </td>
                      )
                    })}

                    {/* Student total */}
                    <td className="col-total" style={{ textAlign: 'center' }}>
                      <span className="mm-cell-total">{earned}</span>
                      <small className="mm-cell-max">/{totalMax}</small>
                    </td>

                    {/* Student percentage badge */}
                    <td className="col-pct" style={{ textAlign: 'center' }}>
                      <span className={`mm-pct-badge ${pct >= 85 ? 'high' : pct >= 70 ? 'mid' : 'low'}`}>
                        {pct}%
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer guidance & status legend */}
      <div className="mm-table-legend-footer">
        <div className="mm-legend-strip">
          <span className="mm-legend-label">Column Status:</span>
          <span className="mm-legend-item"><i className="dot status-finalized" /> Finalized</span>
          <span className="mm-legend-item"><i className="dot status-draft" /> Draft</span>
          <span className="mm-legend-item"><i className="dot status-pending" /> Pending</span>
        </div>

        <div className="mm-footer-tips">
          <Info size={14} />
          <span>Click any column header to zoom into that single assessment. Arrow keys (↑, ↓, ←, →) navigate between cells.</span>
        </div>
      </div>
    </div>
  )
}
