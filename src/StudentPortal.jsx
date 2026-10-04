import { useEffect, useMemo, useState } from 'react'
import {
  Building2,
  GraduationCap,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  CreditCard,
  ExternalLink,
  Home,
  Briefcase,
  LibraryBig,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  MessageSquare,
  Rss,
  TrendingUp,
  UserRound,
  UsersRound,
  X,
  CheckCircle2,
  BarChart2,
  Heart,
  Fingerprint,
  Utensils,
  FileText,
  Sparkles,
  Megaphone,
  Clock,
  PartyPopper,
  MapPin,
} from 'lucide-react'
import './StudentPortal.css'
import './DashboardHome.css'
import StudentProfile from './StudentProfile.jsx'
import AcademicsPage from './pages/AcademicsPage.jsx'
import BloggingPage from './pages/BloggingPage.jsx'
import ExaminationPage from './pages/ExaminationPage.jsx'
import FeedbackPage from './pages/FeedbackPage.jsx'
import InternshipPage from './pages/InternshipPage.jsx'
import LibraryPage from './pages/LibraryPage.jsx'
import OnlineExamPage from './pages/OnlineExamPage.jsx'
import PlacementPage from './pages/PlacementPage.jsx'
import TimetablePage from './pages/TimetablePage.jsx'
import AttendancePage from './pages/AttendancePage.jsx'
import MarksPage from './pages/MarksPage.jsx'
import FeesPage from './pages/FeesPage.jsx'
import NoticesPage from './pages/NoticesPage.jsx'
import HealthPage from './pages/HealthPage.jsx'
import IDCardPage from './pages/IDCardPage.jsx'
import BiometricPage from './pages/BiometricPage.jsx'
import CanteenPage from './pages/CanteenPage.jsx'
import StudentHostelPage from './pages/StudentHostelPage.jsx'

const profilePageTabMap = {
  attendance: 'Attendance Dashboard',
  fees: 'Fee Details',
  health: 'Health & Medical',
}

const navigation = [
  { label: 'Dashboard', icon: Home, page: 'dashboard' },
  { label: 'Marks Management', icon: BarChart2, page: 'marks' },
  { label: 'Hostel Residence', icon: Building2, page: 'hostel' },
  { label: 'Mess & Canteen', icon: Utensils, page: 'canteen' },
  { label: 'Fees & Accounts', icon: CreditCard, page: 'fees' },
  { label: 'Attendance', icon: CheckCircle2, page: 'attendance' },
  { label: 'Library', icon: LibraryBig, page: 'library' },
  { label: 'Academics', icon: BookOpen, page: 'academics' },
  { label: 'Timetable', icon: CalendarDays, page: 'timetable' },
  { label: 'Self Development & Placement', icon: TrendingUp, page: 'placement' },
  { label: 'Internship', icon: Briefcase, page: 'internship' },
  { label: 'Online Examination', icon: ClipboardList, page: 'online-exam' },
  { label: 'Blogging', icon: Rss, page: 'blogging' },
  { label: 'Feedback/Appraisal/Survey', icon: MessageSquare, page: 'feedback' },
]

const latestNotices = [
  { tag: 'SCHOLARSHIP', title: 'PRERANA Scholarship', detail: 'Eligible students can submit their application through the state scholarship portal.', date: '27 Sep 2026' },
  { tag: 'SCHOLARSHIP', title: 'National Scholarship Portal', detail: 'Renewal applications are open. Please verify your bank and identity details before submission.', date: '24 Sep 2026' },
  { tag: 'CAREER', title: 'GATE preparation support', detail: 'Registration for the weekend preparation program is available through the department office.', date: '19 Sep 2026' },
  { tag: 'EXAMINATION', title: 'Internal examination timetable', detail: 'The draft timetable for the upcoming internal assessments is ready for review.', date: '16 Sep 2026' },
]

const archivedNotices = [
  { tag: 'ACADEMIC', title: 'Course feedback window', detail: 'The course feedback form for the previous term is now closed.', date: '02 Sep 2026' },
  { tag: 'CAMPUS', title: 'Library hours during break', detail: 'The central library will operate on revised hours during the term break.', date: '28 Aug 2026' },
]

const holidays = [
  ['14-10-2026', 'Durga Puja Saptami'],
  ['15-10-2026', 'Durga Puja Ashtami'],
  ['16-10-2026', 'Durga Puja Navami'],
  ['20-10-2026', 'Diwali'],
  ['25-12-2026', 'Christmas Day'],
  ['26-01-2027', 'Republic Day'],
  ['15-08-2027', 'Independence Day'],
]

function StudentPortal({ account, onLogout }) {
  const [profileTab, setProfileTab] = useState('')

  const getInitial = () => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    if (hash && hash !== 'portal-top') {
      if (profilePageTabMap[hash]) {
        return { page: 'profile', link: 'View Profile', tab: profilePageTabMap[hash] };
      }
      const match = navigation.find((n) => n.page === hash);
      if (match) return { page: hash, link: match.label, tab: '' };
    }
    return { page: 'dashboard', link: 'Dashboard', tab: '' };
  };
  const init = getInitial();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(init.link);
  const [activePage, setActivePage] = useState(init.page);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'dashboard' || hash === 'portal-top') {
        setActivePage('dashboard');
        setActiveLink('Dashboard');
        setProfileTab('');
        return;
      }
      if (profilePageTabMap[hash]) {
        setActivePage('profile');
        setActiveLink('View Profile');
        setProfileTab(profilePageTabMap[hash]);
        return;
      }
      const match = navigation.find((n) => n.page === hash);
      if (match) {
        setActivePage(match.page);
        setActiveLink(match.label);
        setProfileTab('');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  const [noticeTab, setNoticeTab] = useState('Latest')
  const [noticeQuery, setNoticeQuery] = useState('')
  const [expandedNotice, setExpandedNotice] = useState('')
  const [birthdayView, setBirthdayView] = useState('Today')
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [transferConfirmed, setTransferConfirmed] = useState(false)
  const [campus, setCampus] = useState('')
  const [transferCity, setTransferCity] = useState('')
  const [transferStatus, setTransferStatus] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [today] = useState(() => new Date())
  const todayLabel = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short', month: 'short', day: '2-digit', year: 'numeric',
  }).format(today)
  const monthLabel = new Intl.DateTimeFormat('en-IN', {
    month: 'long', year: 'numeric',
  }).format(currentMonth)
  const noticeList = noticeTab === 'Latest' ? latestNotices : archivedNotices
  const visibleNotices = useMemo(() => noticeList.filter((notice) => {
    const query = noticeQuery.trim().toLowerCase()
    return !query || `${notice.title} ${notice.detail} ${notice.tag}`.toLowerCase().includes(query)
  }), [noticeList, noticeQuery])
  const calendarDays = createCalendarDays(currentMonth, today)
  const initials = account.name.split(' ').map((part) => part[0]).slice(0, 2).join('')
  const holidayItems = useMemo(() => {
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return holidays.map(([raw, name]) => {
      const [d, m, y] = raw.split('-').map(Number)
      const date = new Date(y, m - 1, d)
      const daysLeft = Math.round((date - startOfToday) / 86400000)
      return { raw, name, date, daysLeft, key: `${y}-${m - 1}-${d}` }
    })
  }, [today])
  const holidayMap = useMemo(() => Object.fromEntries(holidayItems.map((h) => [h.key, h.name])), [holidayItems])
  const nextHoliday = holidayItems.find((h) => h.daysLeft >= 0)

  function updateMonth(direction) {
    setCurrentMonth((month) => new Date(month.getFullYear(), month.getMonth() + direction, 1))
  }

  function submitTransfer(event) {
    event.preventDefault()
    setTransferStatus(`Preference saved: ${campus}, ${transferCity.trim()}.`)
  }

  return (
    <div className="campus-os-shell">
      <div className="campus-os-container">
        {/* Floating Sidebar identical to Campus OS Dashboard */}
        {sidebarOpen && (
          <aside className="campus-os-sidebar">
            <div className="campus-os-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="campus-brand-icon">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <p className="campus-brand-kicker">GIFT AUTONOMOUS</p>
                  <h2 className="campus-brand-title">Student Portal</h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#ffffff',
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Close Navigation"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="campus-os-nav">
              {navigation.map(({ label, icon: Icon, page }) => (
                <a
                  className={activeLink === label ? 'active' : ''}
                  href={`#${page}`}
                  aria-current={activeLink === label ? 'page' : undefined}
                  key={label}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveLink(label)
                    setActivePage(page)
                    window.location.hash = page
                    setSidebarOpen(false)
                  }}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              ))}
            </nav>

            <div className="campus-os-role-card">
              <div>
                <p className="campus-role-kicker" style={{ margin: 0 }}>CURRENT ROLE</p>
                <p className="campus-role-val" style={{ margin: 0 }}>Student</p>
              </div>
              <small className="campus-role-sub" style={{ marginTop: '6px' }}>{account.name} • {account.registrationNumber}</small>
            </div>
          </aside>
        )}

        {/* Floating Main Content Card identical to Campus OS Dashboard */}
        <main className="campus-os-main">
          <header className="campus-os-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {!sidebarOpen && (
                <button
                  className="campus-nav-toggle-btn"
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  title="Show Navigation"
                  aria-label="Show Navigation"
                >
                  <Menu size={20} />
                </button>
              )}
              <div>
                <p className="campus-header-kicker">OVERVIEW</p>
                <h1 className="campus-header-title">{activeLink === 'Dashboard' ? 'Student dashboard' : activeLink}</h1>
                <p className="campus-header-subtitle">Welcome back, {account.name}</p>
              </div>
            </div>

            <div className="campus-header-actions">
              <div className="campus-search-box">
                <Search size={16} />
                <input
                  value={noticeQuery}
                  onChange={(event) => setNoticeQuery(event.target.value)}
                  placeholder="Search campus notices..."
                />
              </div>
              <button
                className="campus-icon-btn"
                type="button"
                aria-label="Notifications"
                onClick={() => setShowNotifications((s) => !s)}
              >
                <Bell size={18} />
                <span className="campus-bell-dot" />
              </button>
              {showNotifications && (
                <div className="campus-notif-popover">
                  <strong>Notifications</strong>
                  <span>2 new scholarship and examination updates.</span>
                </div>
              )}
              <div className="campus-user-pill">
                <div className="campus-user-avatar">{initials}</div>
                <div className="campus-user-details">
                  <strong>{account.name}</strong>
                  <small>Student • {account.registrationNumber}</small>
                </div>
                <button className="campus-logout-btn" type="button" onClick={onLogout} title="Log out" aria-label="Log out">
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </header>

          <div className="campus-os-body">
          {activePage !== 'dashboard' && activePage !== 'profile' ? (
            <div className="portal-feature-page" id={activePage}>
              <div className="portal-breadcrumb">
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('dashboard')
                    setActiveLink('Dashboard')
                    window.location.hash = 'dashboard'
                  }}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', color: 'inherit' }}
                  title="Return to Dashboard"
                >
                  <Home size={13} />
                </button>
                <span>/</span>
                <strong>{activeLink}</strong>
              </div>
              {activePage === 'marks' && <MarksPage initialRole="student" />}
              {activePage === 'hostel' && <StudentHostelPage />}
              {activePage === 'fees' && <FeesPage />}
              {activePage === 'canteen' && <CanteenPage />}
              {activePage === 'attendance' && <AttendancePage />}
              {activePage === 'academics' && <AcademicsPage />}
              {activePage === 'timetable' && <TimetablePage />}
              {activePage === 'notices' && <NoticesPage />}
              {activePage === 'idcard' && <IDCardPage />}
              {activePage === 'library' && <LibraryPage />}
              {activePage === 'internship' && <InternshipPage />}
              {activePage === 'online-exam' && <OnlineExamPage />}
              {activePage === 'placement' && <PlacementPage />}
              {activePage === 'blogging' && <BloggingPage />}
              {activePage === 'feedback' && <FeedbackPage />}
            </div>
          ) : activePage === 'profile' ? (
            <StudentProfile
              account={account}
              initialTab={profileTab || 'Personal'}
              onBack={() => {
                setActivePage('dashboard')
                setActiveLink('Dashboard')
                setProfileTab('')
                window.location.hash = 'dashboard'
              }}
            />
          ) : (
            <div className="dash">
          {/* Hero greeting */}
          <section className="dash-hero" aria-label="Welcome">
            <div className="dash-hero-glow" aria-hidden="true" />
            <div className="dash-hero-main">
              <p className="dash-hero-kicker"><Sparkles size={13} /> Student workspace · Semester 5</p>
              <h2 className="dash-hero-title">Good day, {account.name.split(' ')[0]} 👋</h2>
              <p className="dash-hero-caption">Your campus activity and records, together in one place.</p>
              <div className="dash-motd" role="note" aria-label="Message of the day">
                <span className="dash-motd-icon"><Megaphone size={14} /></span>
                <strong>Message of the day</strong>
                <span>Scholarship applications for the 2026–27 session are now open.</span>
              </div>
            </div>
            <div className="dash-hero-meta">
              <span className="dash-chip">Academic year <strong>2026–27</strong></span>
              <time className="dash-date"><CalendarDays size={14} /> {todayLabel}</time>
            </div>
          </section>

          {/* Snapshot stats */}
          <section className="dash-stats" aria-label="Semester snapshot">
            <article className="dash-stat tone-blue">
              <span className="dash-stat-icon"><BookOpen size={18} /></span>
              <div>
                <span className="dash-stat-label">Enrolled courses</span>
                <strong className="dash-stat-value">06</strong>
                <small className="dash-stat-sub">Semester 5 · 22 credits</small>
              </div>
            </article>
            <article className="dash-stat tone-green">
              <span className="dash-stat-icon"><CheckCircle2 size={18} /></span>
              <div>
                <span className="dash-stat-label">Attendance</span>
                <strong className="dash-stat-value">92%</strong>
                <div className="dash-progress" aria-hidden="true"><i style={{ width: '92%' }} /></div>
                <small className="dash-stat-sub"><Check size={12} /> Above required minimum</small>
              </div>
            </article>
            <article className="dash-stat tone-violet">
              <span className="dash-stat-icon"><Clock size={18} /></span>
              <div>
                <span className="dash-stat-label">Next class</span>
                <strong className="dash-stat-value">10:30 <em>AM</em></strong>
                <small className="dash-stat-sub">Data Structures · Room 204</small>
              </div>
            </article>
            <article className="dash-stat tone-amber">
              <span className="dash-stat-icon"><PartyPopper size={18} /></span>
              <div>
                <span className="dash-stat-label">Next holiday</span>
                <strong className="dash-stat-value">{nextHoliday ? (nextHoliday.daysLeft === 0 ? 'Today' : `${nextHoliday.daysLeft} days`) : '—'}</strong>
                <small className="dash-stat-sub">{nextHoliday ? nextHoliday.name : 'No upcoming holidays'}</small>
              </div>
            </article>
          </section>

          {/* Temporary campus preference */}
          <form className="dash-card dash-transfer" id="transfer-form" onSubmit={submitTransfer}>
            <div className="dash-transfer-head">
              <span className="dash-transfer-icon"><MapPin size={18} /></span>
              <div>
                <h3>Temporary campus preference</h3>
                <p><strong>Important:</strong> If you are willing to attend college temporarily from another campus, please update your preferred location using the form below.</p>
              </div>
            </div>
            <label className="dash-check">
              <input
                type="checkbox"
                checked={transferConfirmed}
                onChange={(event) => setTransferConfirmed(event.target.checked)}
                required
              />
              <span>I hereby declare that I am willing to attend college temporarily from the selected campus.</span>
            </label>
            <div className="dash-transfer-fields">
              <label className="dash-select">
                <span className="sr-only">Preferred campus</span>
                <Building2 size={15} aria-hidden="true" />
                <select value={campus} onChange={(event) => setCampus(event.target.value)} required>
                  <option value="">Select campus</option>
                  <option value="GIFT Main Campus">GIFT Main Campus</option>
                  <option value="GIFT Bhubaneswar City Campus">GIFT Bhubaneswar City Campus</option>
                </select>
                <ChevronDown size={14} aria-hidden="true" />
              </label>
              <label className="dash-input">
                <span className="sr-only">Preferred city</span>
                <MapPin size={15} aria-hidden="true" />
                <input
                  id="transfer-city"
                  value={transferCity}
                  onChange={(event) => setTransferCity(event.target.value)}
                  placeholder="Preferred city / location"
                  required
                />
              </label>
              <button className="dash-btn dash-btn-primary" type="submit">Update preference</button>
              <button className="dash-btn dash-btn-ghost" type="reset" onClick={() => {
                setTransferConfirmed(false)
                setCampus('')
                setTransferCity('')
                setTransferStatus('')
              }}>Reset</button>
            </div>
            {transferStatus && <p className="dash-feedback" role="status"><CheckCircle2 size={14} /> {transferStatus}</p>}
          </form>

          {/* Main grid */}
          <div className="dash-grid">
            <section className="dash-card dash-calendar" id="calendar">
              <header className="dash-card-head">
                <h3><span className="dash-head-icon"><CalendarDays size={15} /></span>Calendar</h3>
                <div className="dash-cal-controls">
                  <button type="button" onClick={() => updateMonth(-1)} aria-label="Previous month"><ChevronLeft size={15} /></button>
                  <strong>{monthLabel}</strong>
                  <button type="button" onClick={() => updateMonth(1)} aria-label="Next month"><ChevronRight size={15} /></button>
                </div>
              </header>
              <div className="dash-cal-weekdays">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}</div>
              <div className="dash-cal-days">
                {calendarDays.map(({ key, day, inMonth, isToday, isSunday }) => {
                  const holidayName = holidayMap[key]
                  return (
                    <span
                      className={['dash-day', inMonth ? '' : 'is-outside', isToday ? 'is-today' : '', holidayName ? 'is-holiday' : '', isSunday ? 'is-sunday' : ''].join(' ')}
                      title={holidayName || undefined}
                      key={key}
                    >{day}</span>
                  )
                })}
              </div>
              <div className="dash-legend">
                <span><i className="lg-holiday" />Holiday</span>
                <span><i className="lg-sunday" />Sunday</span>
                <span><i className="lg-today" />Today</span>
              </div>
            </section>

            <section className="dash-card dash-holidays" id="holidays">
              <header className="dash-card-head">
                <h3><span className="dash-head-icon tone-amber"><PartyPopper size={15} /></span>Holiday List</h3>
                <span className="dash-count">{holidayItems.length} days</span>
              </header>
              <ul className="dash-holiday-list" aria-label="Upcoming holidays">
                {holidayItems.map((h) => (
                  <li className={`dash-holiday ${h.daysLeft < 0 ? 'is-past' : ''} ${nextHoliday && nextHoliday.raw === h.raw ? 'is-next' : ''}`} key={h.raw}>
                    <span className="dash-holiday-date">
                      <strong>{h.date.getDate()}</strong>
                      <small>{h.date.toLocaleString('en-IN', { month: 'short' })}</small>
                    </span>
                    <span className="dash-holiday-info">
                      <strong>{h.name}</strong>
                      <small>{h.date.toLocaleString('en-IN', { weekday: 'long' })} · {h.raw}</small>
                    </span>
                    <span className="dash-holiday-badge">
                      {h.daysLeft < 0 ? 'Passed' : h.daysLeft === 0 ? 'Today' : `in ${h.daysLeft}d`}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="dash-card dash-info" id="student-information" aria-label="Student account information">
              <div className="dash-info-cover">
                <span className="dash-info-avatar">{initials}</span>
                <div>
                  <strong>{account.name}</strong>
                  <small>{account.registrationNumber}</small>
                </div>
                <span className="dash-status"><i /> Active</span>
              </div>
              <dl className="dash-info-list">
                <DetailRow label="Registration No." value={account.registrationNumber} />
                <DetailRow label="Name" value={account.name} />
                <DetailRow label="Course" value="B.Tech" />
                <DetailRow label="Batch" value="2023–2027" />
                <DetailRow label="Branch" value={account.department} />
                <DetailRow label="Section" value="CSE · Section A" />
                <DetailRow label="Email ID" value="ananya.das@student.gift.edu.in" />
                <DetailRow label="Mobile No." value="+91 98610 23010" />
              </dl>
              <button className="dash-btn dash-btn-primary dash-info-btn" type="button" onClick={() => {
                setActivePage('profile')
                setActiveLink('Dashboard')
              }}>View profile <ChevronRight size={15} /></button>
            </aside>
          </div>

          <footer className="dash-footer">GIFT Autonomous, Bhubaneswar <span>·</span> Student management portal <span>·</span> {today.getFullYear()}</footer>
            </div>
          )}
          </div>
        </main>
      </div>
    </div>
  )
}

function PortalPanel({ id, title, icon: Icon, className = '', action, children }) {
  return (
    <section className={`portal-panel ${className}`} id={id}>
      <header className="portal-panel-heading">
        <h2><Icon size={14} />{title}</h2>
        {action}
      </header>
      {children}
    </section>
  )
}

function DetailRow({ label, value }) {
  return <div className="student-detail-row"><dt>{label}</dt><dd>{value}</dd></div>
}

function FeeBar({ tone, amount, label }) {
  return <div className={`fee-bar ${tone}`}><strong>{amount}</strong><span>{label}</span><CreditCard size={25} aria-hidden="true" /></div>
}

function createCalendarDays(month, today) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
  const gridStart = new Date(firstDay)
  gridStart.setDate(firstDay.getDate() - firstDay.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    return {
      key,
      day: date.getDate(),
      inMonth: date.getMonth() === month.getMonth(),
      isToday: date.toDateString() === today.toDateString(),
      isSunday: date.getDay() === 0,
    }
  })
}

function GiftMark() {
  return <span className="portal-gift-mark" aria-hidden="true"><span>G</span></span>
}

export default StudentPortal
