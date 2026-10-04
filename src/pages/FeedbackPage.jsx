import { useState } from 'react'
import {
  Check,
  ChevronDown,
  MessageSquare,
  Send,
  Star,
  ThumbsUp,
} from 'lucide-react'
import './FeedbackPage.css'

const feedbackForms = [
  {
    id: 'fb-course',
    title: 'Course Feedback',
    description: 'Rate and review the courses you are currently enrolled in for Semester 5.',
    deadline: '25 Oct 2026',
    status: 'open',
  },
  {
    id: 'fb-faculty',
    title: 'Faculty Appraisal',
    description: 'Provide anonymous feedback on teaching quality, availability, and course delivery.',
    deadline: '25 Oct 2026',
    status: 'open',
  },
  {
    id: 'fb-infra',
    title: 'Infrastructure Survey',
    description: 'Share your experience regarding campus facilities, labs, library, and canteen.',
    deadline: '30 Oct 2026',
    status: 'open',
  },
  {
    id: 'fb-placement',
    title: 'Training & Placement Feedback',
    description: 'Evaluate the T&P cell activities, mock interviews and placement preparation sessions.',
    deadline: '20 Oct 2026',
    status: 'completed',
  },
]

const courses = [
  'Artificial Intelligence (CS501)',
  'Machine Learning (CS502)',
  'Cloud Computing (CS503)',
  'Compiler Design (CS504)',
]

const facultyMembers = [
  { name: 'Dr. P. Mohapatra', subject: 'Artificial Intelligence' },
  { name: 'Dr. S. Rath', subject: 'Machine Learning' },
  { name: 'Prof. R. Nayak', subject: 'Cloud Computing' },
  { name: 'Dr. A. Panda', subject: 'Compiler Design' },
]

function StarRating({ value, onChange, label }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="star-rating" role="group" aria-label={label}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star-btn ${star <= (hovered || value) ? 'filled' : ''}`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          aria-label={`${star} star`}
        >
          <Star size={18} />
        </button>
      ))}
      {value > 0 && <span className="star-label">{['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][value]}</span>}
    </div>
  )
}

export default function FeedbackPage() {
  const [activeForm, setActiveForm] = useState(null)
  const [submitted, setSubmitted] = useState({})

  // Course feedback state
  const [courseRatings, setCourseRatings] = useState({})
  const [courseComments, setCourseComments] = useState({})

  // Faculty appraisal state
  const [facultyRatings, setFacultyRatings] = useState({})
  const [facultyAspects, setFacultyAspects] = useState({})

  // Infrastructure state
  const [infraRatings, setInfraRatings] = useState({})
  const [infraComment, setInfraComment] = useState('')

  function submitForm(formId) {
    setSubmitted((prev) => ({ ...prev, [formId]: true }))
    setActiveForm(null)
  }

  if (activeForm) {
    const form = feedbackForms.find((f) => f.id === activeForm)
    return (
      <div className="feedback-page">
        <div className="feedback-form-view">
          <div className="feedback-form-header">
            <button className="feedback-back-btn" onClick={() => setActiveForm(null)}>
              ← Back to forms
            </button>
            <h2>{form.title}</h2>
            <p>{form.description}</p>
          </div>

          {activeForm === 'fb-course' && (
            <form className="feedback-form-body" onSubmit={(e) => { e.preventDefault(); submitForm(activeForm) }}>
              <p className="feedback-form-note">Your feedback is anonymous and will only be used to improve course quality.</p>
              {courses.map((course) => (
                <div key={course} className="feedback-course-block">
                  <h3>{course}</h3>
                  <div className="feedback-aspect-row">
                    <label>Overall Quality</label>
                    <StarRating
                      value={courseRatings[`${course}-overall`] || 0}
                      onChange={(v) => setCourseRatings((p) => ({ ...p, [`${course}-overall`]: v }))}
                      label={`Overall quality for ${course}`}
                    />
                  </div>
                  <div className="feedback-aspect-row">
                    <label>Course Material</label>
                    <StarRating
                      value={courseRatings[`${course}-material`] || 0}
                      onChange={(v) => setCourseRatings((p) => ({ ...p, [`${course}-material`]: v }))}
                      label={`Course material for ${course}`}
                    />
                  </div>
                  <div className="feedback-aspect-row">
                    <label>Difficulty Level</label>
                    <StarRating
                      value={courseRatings[`${course}-difficulty`] || 0}
                      onChange={(v) => setCourseRatings((p) => ({ ...p, [`${course}-difficulty`]: v }))}
                      label={`Difficulty for ${course}`}
                    />
                  </div>
                  <div className="feedback-comment-wrap">
                    <label>Comments (optional)</label>
                    <textarea
                      value={courseComments[course] || ''}
                      onChange={(e) => setCourseComments((p) => ({ ...p, [course]: e.target.value }))}
                      placeholder={`Share your thoughts on ${course}...`}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              <button className="feedback-submit-btn" type="submit">
                <Send size={14} />Submit Course Feedback
              </button>
            </form>
          )}

          {activeForm === 'fb-faculty' && (
            <form className="feedback-form-body" onSubmit={(e) => { e.preventDefault(); submitForm(activeForm) }}>
              <p className="feedback-form-note">Your appraisal is completely anonymous. Please be honest and constructive.</p>
              {facultyMembers.map((faculty) => (
                <div key={faculty.name} className="feedback-course-block">
                  <h3>{faculty.name} <small>· {faculty.subject}</small></h3>
                  {['Teaching Clarity', 'Subject Knowledge', 'Student Engagement', 'Punctuality'].map((aspect) => (
                    <div key={aspect} className="feedback-aspect-row">
                      <label>{aspect}</label>
                      <StarRating
                        value={facultyAspects[`${faculty.name}-${aspect}`] || 0}
                        onChange={(v) => setFacultyAspects((p) => ({ ...p, [`${faculty.name}-${aspect}`]: v }))}
                        label={`${aspect} for ${faculty.name}`}
                      />
                    </div>
                  ))}
                </div>
              ))}
              <button className="feedback-submit-btn" type="submit">
                <Send size={14} />Submit Faculty Appraisal
              </button>
            </form>
          )}

          {activeForm === 'fb-infra' && (
            <form className="feedback-form-body" onSubmit={(e) => { e.preventDefault(); submitForm(activeForm) }}>
              <p className="feedback-form-note">Help us improve campus infrastructure. This survey takes less than 2 minutes.</p>
              {['Classrooms', 'Computer Labs', 'Library', 'Canteen', 'Hostel', 'Sports Facilities', 'Wi-Fi Connectivity'].map((facility) => (
                <div key={facility} className="feedback-aspect-row">
                  <label>{facility}</label>
                  <StarRating
                    value={infraRatings[facility] || 0}
                    onChange={(v) => setInfraRatings((p) => ({ ...p, [facility]: v }))}
                    label={`Rating for ${facility}`}
                  />
                </div>
              ))}
              <div className="feedback-comment-wrap" style={{ marginTop: 16 }}>
                <label>Additional Comments</label>
                <textarea
                  value={infraComment}
                  onChange={(e) => setInfraComment(e.target.value)}
                  placeholder="Any suggestions for improving campus infrastructure..."
                  rows={4}
                />
              </div>
              <button className="feedback-submit-btn" type="submit">
                <Send size={14} />Submit Infrastructure Survey
              </button>
            </form>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="feedback-page">
      <div className="feedback-header">
        <div>
          <p className="feedback-kicker"><MessageSquare size={13} />FEEDBACK & APPRAISAL</p>
          <h2>Feedback, Appraisal & Surveys</h2>
          <p className="feedback-caption">Share your anonymous feedback to help improve academics, faculty and campus experience.</p>
        </div>
      </div>

      <div className="feedback-forms-grid">
        {feedbackForms.map((form) => {
          const isDone = submitted[form.id] || form.status === 'completed'
          return (
            <div key={form.id} className={`feedback-form-card ${isDone ? 'completed' : ''}`}>
              <div className="feedback-form-card-icon">
                {isDone ? <ThumbsUp size={22} /> : <MessageSquare size={22} />}
              </div>
              <div className="feedback-form-card-body">
                <h3>{form.title}</h3>
                <p>{form.description}</p>
                <div className="feedback-form-meta">
                  <span>Deadline: <strong>{form.deadline}</strong></span>
                  <span className={`feedback-status-tag ${isDone ? 'done' : 'open'}`}>
                    {isDone ? <><Check size={10} />Submitted</> : 'Open'}
                  </span>
                </div>
              </div>
              {!isDone && (
                <button className="feedback-open-btn" onClick={() => setActiveForm(form.id)}>
                  Fill Form <ChevronDown size={13} className="rotate-270" />
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="feedback-privacy-note">
        <MessageSquare size={14} />
        All feedback is anonymized and aggregated before being shared with faculty or administration. Your identity is never revealed.
      </div>
    </div>
  )
}
