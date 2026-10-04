import { useState } from 'react'
import {
  Award,
  Briefcase,
  Building,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  MapPin,
  Search,
  Star,
  Upload,
  User,
} from 'lucide-react'
import './InternshipPage.css'

const internships = [
  {
    id: 'INT001',
    company: 'TechSurge India',
    role: 'Machine Learning Intern',
    location: 'Bhubaneswar (On-site)',
    duration: '2 Months',
    stipend: '₹8,000/month',
    deadline: '20 Oct 2026',
    skills: ['Python', 'TensorFlow', 'Data Analysis'],
    logo: 'TS',
    color: '#4a90e2',
    status: 'open',
  },
  {
    id: 'INT002',
    company: 'CloudNest Solutions',
    role: 'Cloud & DevOps Intern',
    location: 'Remote',
    duration: '3 Months',
    stipend: '₹12,000/month',
    deadline: '25 Oct 2026',
    skills: ['AWS', 'Docker', 'CI/CD'],
    logo: 'CN',
    color: '#27ae60',
    status: 'open',
  },
  {
    id: 'INT003',
    company: 'DataSense Analytics',
    role: 'Data Science Intern',
    location: 'Hyderabad (Hybrid)',
    duration: '6 Months',
    stipend: '₹15,000/month',
    deadline: '30 Oct 2026',
    skills: ['Python', 'SQL', 'Tableau', 'ML'],
    logo: 'DS',
    color: '#8e44ad',
    status: 'open',
  },
  {
    id: 'INT004',
    company: 'InnoSoft Technologies',
    role: 'Web Development Intern',
    location: 'Remote',
    duration: '2 Months',
    stipend: '₹6,000/month',
    deadline: '10 Oct 2026',
    skills: ['React', 'Node.js', 'MongoDB'],
    logo: 'IS',
    color: '#e67e22',
    status: 'closed',
  },
]

const myApplications = [
  {
    id: 'APP001',
    company: 'TechSurge India',
    role: 'Machine Learning Intern',
    appliedOn: '02 Oct 2026',
    status: 'under_review',
    nextStep: 'Technical Round scheduled on 15 Oct 2026',
  },
]

export default function InternshipPage() {
  const [activeTab, setActiveTab] = useState('listings')
  const [search, setSearch] = useState('')
  const [applied, setApplied] = useState({ APP001: true })
  const [applyMsg, setApplyMsg] = useState('')

  const filteredInternships = internships.filter((i) => {
    const q = search.toLowerCase()
    return !q || i.company.toLowerCase().includes(q) || i.role.toLowerCase().includes(q) || i.skills.some((s) => s.toLowerCase().includes(q))
  })

  function applyFor(intern) {
    setApplied((prev) => ({ ...prev, [intern.id]: true }))
    setApplyMsg(`Application submitted for "${intern.role}" at ${intern.company}. You will receive updates at your registered email.`)
    setTimeout(() => setApplyMsg(''), 5000)
  }

  return (
    <div className="internship-page">
      <div className="internship-header">
        <div>
          <p className="internship-kicker"><Briefcase size={13} />INTERNSHIP PORTAL</p>
          <h2>Internship</h2>
          <p className="internship-caption">Browse and apply for internships curated by the T&P Cell for CSE students.</p>
        </div>
        <div className="internship-stats">
          <div><strong>{internships.filter((i) => i.status === 'open').length}</strong><small>Open Positions</small></div>
          <div><strong>{Object.keys(applied).length}</strong><small>Applications</small></div>
        </div>
      </div>

      <div className="internship-tabs" role="tablist">
        {[
          { key: 'listings', label: 'Available Internships' },
          { key: 'applications', label: 'My Applications' },
          { key: 'documents', label: 'Documents' },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={activeTab === key ? 'active' : ''}
            role="tab"
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {applyMsg && <div className="internship-apply-msg"><Check size={13} />{applyMsg}</div>}

      {activeTab === 'listings' && (
        <div className="internship-listings">
          <label className="internship-search">
            <Search size={14} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by company, role or skill..." />
          </label>
          <div className="internship-list">
            {filteredInternships.map((intern) => (
              <div key={intern.id} className={`internship-card ${intern.status}`}>
                <div className="internship-card-logo" style={{ background: intern.color }}>
                  {intern.logo}
                </div>
                <div className="internship-card-body">
                  <div className="internship-card-top">
                    <div>
                      <h3>{intern.role}</h3>
                      <p className="internship-company"><Building size={12} />{intern.company}</p>
                    </div>
                    <span className={`internship-status-tag ${intern.status}`}>
                      {intern.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <div className="internship-meta">
                    <span><MapPin size={11} />{intern.location}</span>
                    <span><Clock size={11} />{intern.duration}</span>
                    <span><Star size={11} />{intern.stipend}</span>
                    <span><CalendarDays size={11} />Deadline: {intern.deadline}</span>
                  </div>
                  <div className="internship-skills">
                    {intern.skills.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="internship-card-action">
                  {applied[intern.id] ? (
                    <span className="internship-applied"><Check size={13} />Applied</span>
                  ) : intern.status === 'closed' ? (
                    <span className="internship-closed-tag">Applications Closed</span>
                  ) : (
                    <button className="internship-apply-btn" onClick={() => applyFor(intern)}>
                      Apply Now <ChevronRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredInternships.length === 0 && <p className="internship-empty">No internships match your search.</p>}
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="internship-applications">
          {myApplications.length === 0 ? (
            <div className="internship-empty-state">
              <Briefcase size={32} />
              <strong>No applications yet</strong>
              <p>Browse listings and apply for internships that match your skills.</p>
            </div>
          ) : (
            <div className="application-list">
              {myApplications.map((app) => (
                <div key={app.id} className="application-card">
                  <div className="app-card-header">
                    <div>
                      <h3>{app.role}</h3>
                      <p><Building size={12} />{app.company}</p>
                    </div>
                    <span className={`app-status-tag ${app.status}`}>
                      {app.status === 'under_review' ? 'Under Review' : app.status === 'selected' ? 'Selected' : 'Rejected'}
                    </span>
                  </div>
                  <div className="app-card-meta">
                    <span><CalendarDays size={11} />Applied: {app.appliedOn}</span>
                    <span><ChevronRight size={11} />Next: {app.nextStep}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="internship-documents">
          <div className="documents-note">
            <FileText size={14} />
            <span>Upload and manage your career documents. These will be shared with companies during applications.</span>
          </div>
          <div className="document-upload-list">
            {[
              { label: 'Resume / CV', uploaded: true, filename: 'rakesh_das_resume_v3.pdf', date: '28 Sep 2026' },
              { label: 'Cover Letter Template', uploaded: false, filename: null },
              { label: 'GitHub Profile Link', uploaded: true, filename: 'github.com/rakesh-das', date: '15 Aug 2026' },
              { label: 'LinkedIn Profile Link', uploaded: false, filename: null },
              { label: 'Certificates / Achievements', uploaded: false, filename: null },
            ].map((doc, i) => (
              <div key={i} className="document-row">
                <div className="document-row-left">
                  <FileText size={16} />
                  <div>
                    <strong>{doc.label}</strong>
                    {doc.uploaded && <small>{doc.filename} · {doc.date}</small>}
                  </div>
                </div>
                {doc.uploaded ? (
                  <div className="document-row-actions">
                    <span className="document-uploaded"><Check size={12} />Uploaded</span>
                    <button className="document-update-btn"><Upload size={12} />Update</button>
                  </div>
                ) : (
                  <button className="document-upload-btn"><Upload size={12} />Upload</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
