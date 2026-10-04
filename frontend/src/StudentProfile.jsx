import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Award,
  BarChart2,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  Fingerprint,
  GraduationCap,
  Heart,
  HeartPulse,
  IdCard,
  MapPin,
  ShieldCheck,
  UserRound,
  UsersRound,
  Utensils,
} from 'lucide-react'
import './StudentProfile.css'
import './ProfileModern.css'
import AttendancePage from './pages/AttendancePage.jsx'
import MarksPage from './pages/MarksPage.jsx'
import ExaminationPage from './pages/ExaminationPage.jsx'
import FeesPage from './pages/FeesPage.jsx'
import BiometricPage from './pages/BiometricPage.jsx'
import CanteenPage from './pages/CanteenPage.jsx'
import HealthPage from './pages/HealthPage.jsx'
import UniversityMarksView from './components/UniversityMarksView.jsx'

const profileTabs = [
  { label: 'Personal', icon: UserRound },
  { label: 'Academic', icon: GraduationCap },
  { label: 'Attendance Dashboard', icon: CheckCircle2 },
  { label: 'Fee Details', icon: CreditCard },
  { label: 'Health & Medical', icon: Heart },
  { label: 'Guardians', icon: UsersRound },
  { label: 'Address', icon: MapPin },
  { label: 'Documents', icon: FileText },
  { label: 'ID Card', icon: IdCard },
]

function StudentProfile({ account, onBack, initialTab, initialQuickView }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'Personal')
  const [activeQuickView, setActiveQuickView] = useState(initialQuickView || '')
  const [message, setMessage] = useState('')
  const firstName = account.name.split(' ')[0]
  const lastName = account.name.split(' ').slice(1).join(' ')
  const emailName = account.name.toLowerCase().replaceAll(' ', '.')
  const summaryRows = [
    ['Last Date of Class Attendance', '01/10/2026'],
    ['Registration No.', account.registrationNumber],
    ['Serial No.', '16'],
    ['Name', account.name.toUpperCase()],
    ['Mentor', 'Dr. Pratyush Mohapatra'],
    ['Course', 'B.Tech'],
    ['Batch', 'BTECH 2023–P'],
    ['Branch', account.department],
    ['Section', 'CSE (AI) · Genius'],
    ['Domain Email ID', `${emailName}@gift.edu.in`],
    ['Email ID', `${emailName}@gmail.com`],
    ['Mobile No.', '+91 98610 23010'],
    ['WhatsApp No.', '+91 98610 23010'],
    ['Aadhaar No.', 'XXXX XXXX 2341'],
    ['Voter ID', 'Not provided'],
    ['PAN No.', 'Not provided'],
    ['Driving License No.', 'Not provided'],
    ['Passport No.', 'Not provided'],
  ]

  const details = {
    Personal: [
      [{ label: 'Admission Category', value: 'General', wide: true }],
      [{ label: 'Title', value: 'Ms.', wide: true }],
      [{ label: 'First Name', value: firstName }, { label: 'Last Name', value: lastName }],
      [{ label: 'Middle Name', value: 'Not provided' }, { label: 'Gender', value: 'Female' }],
      [{ label: 'Date of Birth', value: '15-03-2005' }, { label: 'Nationality', value: 'Indian' }],
      [{ label: 'Caste', value: 'General' }, { label: 'Religion', value: 'Hindu' }],
      [{ label: 'Blood Group', value: 'O+' }, { label: 'Birthplace', value: 'Bhubaneswar, Odisha' }],
      [{ label: 'Identification Mark', value: 'Not provided', wide: true }],
      [{ label: 'Thumb ID', value: `GFT${account.registrationNumber}`, wide: true }],
      [{ label: 'Hostel', value: 'No' }, { label: 'Transport', value: 'No' }],
      [{ label: 'Lunch', value: 'No' }, { label: 'NSS', value: 'No' }],
      [{ label: 'Languages Known', value: 'Odia, English, Hindi', wide: true }],
      [{ label: 'Hobbies', value: 'Not provided', wide: true }],
    ],
    Guardians: [
      [{ label: 'Father / Guardian', value: 'Sanjay Das' }, { label: 'Relationship', value: 'Father' }],
      [{ label: 'Contact Number', value: '+91 94370 10001' }, { label: 'Email', value: 'sanjay.das@example.com' }],
      [{ label: 'Mother / Guardian', value: 'Madhuri Das' }, { label: 'Relationship', value: 'Mother' }],
      [{ label: 'Contact Number', value: '+91 94370 10002' }, { label: 'Email', value: 'madhuri.das@example.com' }],
    ],
    Address: [
      [{ label: 'Address Type', value: 'Permanent', wide: true }],
      [{ label: 'Address', value: 'Plot 18, Unit 4', wide: true }],
      [{ label: 'City', value: 'Bhubaneswar' }, { label: 'State', value: 'Odisha' }],
      [{ label: 'Country', value: 'India' }, { label: 'PIN Code', value: '751001' }],
      [{ label: 'Address Type', value: 'Current', wide: true }],
      [{ label: 'Address', value: 'GIFT Campus Residence', wide: true }],
      [{ label: 'City', value: 'Bhubaneswar' }, { label: 'State', value: 'Odisha' }],
    ],
    Health: [
      [{ label: 'Blood Group', value: 'O+' }, { label: 'Known Allergies', value: 'None reported' }],
      [{ label: 'Emergency Contact', value: 'Sanjay Das' }, { label: 'Contact Number', value: '+91 94370 10001' }],
      [{ label: 'Medical Notes', value: 'No notes on file', wide: true }],
    ],
  }

  function selectQuickLink(label) {
    setActiveQuickView(label)
    setMessage('')
  }

  const studentPhoto = useMemo(() => {
    if (account?.photo) return account.photo
    if (/Aarav|Rohan|Vikram|Siddharth|Rahul|Amit|Rajesh|Pradeep|Debasish|Bishnu|Manoj/i.test(account?.name || '')) {
      return '/passport_photo_male.svg'
    }
    return '/passport_photo.svg'
  }, [account])

  return (
    <section className="student-profile-page sp-modern" id="student-profile">
      <div className="profile-breadcrumb">
        <button type="button" onClick={onBack}>Home</button>
        <span>/</span><span>Student</span><span>/</span><span>Manage Students</span><span>/</span>
        <strong>{account.name}</strong>
      </div>

      <div className="profile-title-row">
        <h1><UserRound size={18} />Student Profile</h1>
        <button className="profile-return" type="button" onClick={onBack}><ArrowLeft size={15} />Dashboard</button>
      </div>

      <section className="profile-overview-strip" aria-label="Student identity summary">
        <div className="profile-photo" style={{ padding: 0, overflow: 'hidden', border: '2px solid #ffffff' }}>
          <img src={studentPhoto} alt={account.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="profile-overview-copy">
          <span className="profile-overview-label">STUDENT RECORD · ACTIVE</span>
          <h2>{account.name}</h2>
          <p>{account.department}</p>
        </div>
        <div className="profile-overview-facts">
          <span><small>Registration number</small><strong>{account.registrationNumber}</strong></span>
          <span><small>Program</small><strong>B.Tech · 2023–2027</strong></span>
          <span><small>Current section</small><strong>CSE · Section A</strong></span>
        </div>
        <details className="profile-registry-summary">
          <summary><FileText size={15} /><span>Full registry</span></summary>
          <dl className="profile-summary-table">
            {summaryRows.map(([label, value]) => (
              <div className="profile-summary-row" key={label}>
                <dt>{label}</dt>
                <dd>{label === 'WhatsApp No.' ? <a href="tel:+919861023010">{value}</a> : value}</dd>
              </div>
            ))}
            <div className="profile-summary-row">
              <dt>Status</dt>
              <dd><span className="profile-active"><Check size={10} />Active</span></dd>
            </div>
          </dl>
        </details>
      </section>

      <div className="profile-layout">
        <div className="profile-main-column">
          <nav className="profile-quick-links" aria-label="Student records">
            <button className={activeQuickView === 'College Marks' ? 'active' : ''} type="button" aria-pressed={activeQuickView === 'College Marks'} onClick={() => selectQuickLink('College Marks')}><Building2 size={14} />College Marks</button>
            <button className={activeQuickView === 'University Marks' ? 'active' : ''} type="button" aria-pressed={activeQuickView === 'University Marks'} onClick={() => selectQuickLink('University Marks')}><GraduationCap size={14} />University Marks</button>
            <button className={activeQuickView === 'Campus Biometric' ? 'active' : ''} type="button" aria-pressed={activeQuickView === 'Campus Biometric'} onClick={() => selectQuickLink('Campus Biometric')}><Fingerprint size={14} />Campus Biometric</button>
            <button className={activeQuickView === 'Canteen Access Log' ? 'active' : ''} type="button" aria-pressed={activeQuickView === 'Canteen Access Log'} onClick={() => selectQuickLink('Canteen Access Log')}><Utensils size={14} />Canteen Access Log</button>
          </nav>

          <div className="profile-tabs" role="tablist" aria-label="Student profile sections">
            {profileTabs.map(({ label, icon: Icon }) => (
              <button
                className={activeTab === label ? 'active' : ''}
                id={`profile-tab-${label.toLowerCase().replaceAll(' ', '-')}`}
                type="button"
                role="tab"
                aria-selected={activeTab === label}
                key={label}
                onClick={() => {
                  setActiveTab(label)
                  setActiveQuickView('')
                  setMessage('')
                }}
              >
                <Icon size={12} />{label}
              </button>
            ))}
          </div>

          {(() => {
            const isEmbeddedPage = !activeQuickView && [
              'Attendance Dashboard',
              'Attendance',
              'Fee Details',
              'Fees',
              'Health & Medical',
              'Health',
            ].includes(activeTab);
            const panelTitle = activeQuickView || (activeTab.endsWith('Details') ? activeTab : `${activeTab} Details`);

            return (
              <section className={`profile-detail-panel ${isEmbeddedPage ? 'has-embedded-page' : ''}`} role="tabpanel" aria-label={`${activeTab} details`}>
                {!isEmbeddedPage && activeQuickView !== 'University Marks' && <h2><ShieldCheck size={15} />{panelTitle}</h2>}
                {activeQuickView ? (
                  activeQuickView === 'College Marks' ? (
                    <div className="profile-embedded-marks-wrap">
                      <div className="profile-marks-header-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a', fontWeight: 800 }}>College Internal Marks &amp; Assessment Management</h3>
                          <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>Complete continuous internal evaluation grade book, quiz, midterm, and practical performance breakdown.</p>
                        </div>
                        <button className="profile-return" type="button" onClick={() => setActiveQuickView('')}>
                          <ArrowLeft size={13} /> Back to profile
                        </button>
                      </div>
                      <MarksPage initialRole="student" />
                    </div>
                  ) : activeQuickView === 'University Marks' ? (
                    <UniversityMarksView onBack={() => setActiveQuickView('')} account={account} />
                  ) : (
                    <QuickRecordDetails view={activeQuickView} onBack={() => setActiveQuickView('')} />
                  )
                ) : (
                  <>
                    {message && <p className="profile-status-message" role="status">{message}</p>}
            {activeTab === 'Attendance Dashboard' || activeTab === 'Attendance' ? (
              <AttendancePage />
            ) : activeTab === 'Internal Marks' ? (
              <MarksPage />
            ) : activeTab === 'Examination' ? (
              <ExaminationPage />
            ) : activeTab === 'Fee Details' || activeTab === 'Fees' ? (
              <FeesPage />
            ) : activeTab === 'Campus Biometrics' ? (
              <BiometricPage />
            ) : activeTab === 'Canteen & Mess' ? (
              <CanteenPage />
            ) : activeTab === 'Health & Medical' || activeTab === 'Health' ? (
              <HealthPage />
            ) : activeTab === 'Academic' ? (
              <AcademicDetails account={account} />
            ) : activeTab === 'Documents' ? (
              <div className="profile-documents">
                {['Passport-size photograph', 'Government ID proof', 'Class 10 certificate', 'Class 12 certificate'].map((document) => (
                  <div className="profile-document-row" key={document}>
                    <span><FileText size={15} />{document}</span>
                    <button type="button" onClick={() => setMessage(`${document}: no file is attached in this demo.`)}>View</button>
                  </div>
                ))}
              </div>
            ) : activeTab === 'ID Card' ? (
              <div className="profile-id-card">
                <span className="profile-id-mark">G</span>
                <span className="profile-id-copy"><strong>GIFT AUTONOMOUS</strong><small>BHUBANESWAR · STUDENT ID</small></span>
                <span className="profile-id-avatar" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src={studentPhoto} alt={account.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </span>
                <strong className="profile-id-name">{account.name}</strong>
                <span>Registration No. {account.registrationNumber}</span>
                <span>B.Tech · CSE · 2023–2027</span>
              </div>
            ) : (
              <div className="profile-data-table">
                {(details[activeTab] || details.Personal).map((row, index) => (
                  <div className={`profile-data-row ${row.some((field) => field.wide) ? 'wide-row' : ''}`} key={`${activeTab}-${index}`}>
                    {row.map((field) => (
                      <div className="profile-data-field" key={field.label}>
                        <span>{field.label}</span><strong>{field.value}</strong>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
              </>
            )}
              </section>
            );
          })()}
          <div className="profile-extra-links"><span><Award size={13} />Academic records</span><span><CalendarDays size={13} />Updated 02 Oct 2026</span></div>
        </div>
      </div>
    </section>
  )
}

function QuickRecordDetails({ view, onBack }) {
  const records = {
    'College Marks': {
      note: 'Internal assessment entries shown here are sample data.',
      columns: ['Subject', 'Assessment', 'Marks', 'Maximum'],
      rows: [
        ['Mathematics-I', 'Internal Assessment 1', '18', '20'],
        ['Basic Programming Skills', 'Internal Assessment 1', '17', '20'],
        ['Basic Electronics Engineering', 'Internal Assessment 1', '16', '20'],
      ],
    },
    'University Marks': {
      note: 'University result entries shown here are sample data.',
      columns: ['Semester', 'SGPA', 'Result', 'Credits'],
      rows: [
        ['1st Semester', '8.14', 'Passed', '20'],
        ['2nd Semester', '8.42', 'Passed', '21'],
        ['3rd Semester', 'Pending', 'Awaiting result', '—'],
      ],
    },
    'Campus Biometric': {
      note: 'Recent biometric events shown here are sample data.',
      columns: ['Date', 'First entry', 'Last exit', 'Location', 'Status'],
      rows: [
        ['02 Oct 2026', '08:42 AM', '04:13 PM', 'Main Gate', 'Verified'],
        ['01 Oct 2026', '08:51 AM', '04:02 PM', 'Main Gate', 'Verified'],
        ['30 Sep 2026', '08:39 AM', '04:18 PM', 'Main Gate', 'Verified'],
      ],
    },
    'Canteen Access Log': {
      note: 'Canteen transactions shown here are sample data.',
      columns: ['Date', 'Time', 'Outlet', 'Transaction', 'Amount', 'Status'],
      rows: [
        ['02 Oct 2026', '01:12 PM', 'Campus Canteen', 'Lunch', '₹65.00', 'Paid'],
        ['01 Oct 2026', '09:18 AM', 'Campus Canteen', 'Breakfast', '₹35.00', 'Paid'],
        ['30 Sep 2026', '01:06 PM', 'Campus Canteen', 'Lunch', '₹65.00', 'Paid'],
      ],
    },
  }
  const record = records[view]

  return (
    <div className="profile-quick-record">
      <div className="profile-quick-record-heading">
        <p className="profile-status-message">{record.note}</p>
        <button className="profile-return" type="button" onClick={onBack}><ArrowLeft size={13} />Back to profile</button>
      </div>
      <div className="attendance-table-wrap">
        <table className="attendance-summary-table">
          <thead><tr>{record.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>{record.rows.map((row) => <tr key={row.join('-')}>{row.map((value, index) => index === 0 ? <th scope="row" key={index}>{value}</th> : <td key={index}>{value}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}

function FeesDetails() {
  const [receiptMessage, setReceiptMessage] = useState('')
  const feeDemands = [
    ['2023–24', 'Admission and tuition fee', '₹78,400.00'],
    ['2024–25', 'Tuition and academic fee', '₹78,400.00'],
    ['2025–26', 'Tuition and academic fee', '₹78,400.00'],
    ['2026–27', 'Tuition and academic fee', '₹87,400.00'],
  ]
  const payments = [
    ['PMT-2301', '12-08-2023', 'Online', 'UTR •••• 4812', 'SBI', 'Bhubaneswar', 'Admission fee', '₹40,000.00'],
    ['PMT-2404', '15-03-2024', 'Online', 'UTR •••• 1470', 'SBI', 'Bhubaneswar', 'Tuition fee', '₹35,000.00'],
    ['PMT-2417', '20-06-2024', 'Online', 'UTR •••• 2964', 'HDFC', 'Bhubaneswar', 'Tuition fee', '₹30,000.00'],
    ['PMT-2503', '12-01-2025', 'Online', 'UTR •••• 5038', 'SBI', 'Bhubaneswar', 'Tuition fee', '₹30,000.00'],
    ['PMT-2509', '10-07-2025', 'Online', 'UTR •••• 9441', 'SBI', 'Bhubaneswar', 'Tuition fee', '₹29,680.00'],
    ['PMT-2602', '01-02-2026', 'Online', 'UTR •••• 6812', 'HDFC', 'Bhubaneswar', 'Tuition fee', '₹30,000.00'],
  ]
  const paidTotal = 194680
  const totalFees = 322600
  const outstanding = totalFees - paidTotal
  const paidReceiptSections = [
    { title: 'Student Paid (GIFT Money Receipt - Old Portal)', columns: ['Receipt No.', 'Money Receipt No.', 'Session', 'Paid Towards', 'Amount Paid'] },
    { title: 'Student Paid (RB Infracon Money Receipt - Old Portal)', columns: ['Receipt No.', 'Session', 'Paid Towards', 'Amount Paid'] },
  ]

  return (
    <div className="fees-details-view">
      <section className="fee-overview" aria-label="Fee summary">
        <p><span>Student's Total Fees</span><strong>₹{totalFees.toLocaleString('en-IN')}.00</strong></p>
        <p><span>Total paid by Student</span><strong>₹{paidTotal.toLocaleString('en-IN')}.00</strong></p>
        <p><span>Amount Outstanding</span><strong>₹{outstanding.toLocaleString('en-IN')}.00 ({((outstanding / totalFees) * 100).toFixed(2)}%)</strong></p>
      </section>

      <aside className="fee-notice">
        <strong>Important:</strong> If you notice a discrepancy in your fee statement, contact the Accounts Office at <a href="mailto:info@gift.edu.in">info@gift.edu.in</a> with your registration number.
      </aside>

      <FeeTableSection title="Fee Details" className="fee-demand-section">
        <table className="fee-data-table demand-table">
          <thead><tr><th>#</th><th>Demand Session ID</th><th>Demand Name</th><th>Demand Amount</th></tr></thead>
          <tbody>
            {feeDemands.map(([session, name, amount], index) => (
              <tr key={session}><td>{index + 1}</td><td>{session}</td><td>{name}</td><td>{amount}</td></tr>
            ))}
          </tbody>
          <tfoot><tr><th colSpan="3">Total Fees</th><td>₹{totalFees.toLocaleString('en-IN')}.00</td></tr></tfoot>
        </table>
      </FeeTableSection>

      <FeeTableSection title="Payment History" className="payment-history-section">
        <table className="fee-data-table payment-table">
          <thead><tr><th>#</th><th>Payment Id</th><th>Payment Date</th><th>Payment Mode</th><th>Cheque/UTR/Transaction No.</th><th>Bank Name</th><th>Bank Branch</th><th>Towards</th><th>Amount Paid</th><th>Action</th></tr></thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment[0]}>
                <td>{index + 1}</td>
                {payment.map((value) => <td key={value}>{value}</td>)}
                <td><button className="fee-receipt-button" type="button" aria-label={`View receipt ${payment[0]}`} onClick={() => setReceiptMessage(`Receipt ${payment[0]} is available when payment records are connected.`)}><FileText size={12} /></button></td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr><th colSpan="8">Total Paid</th><td colSpan="2">₹{paidTotal.toLocaleString('en-IN')}.00</td></tr></tfoot>
        </table>
        {receiptMessage && <p className="fee-receipt-message" role="status">{receiptMessage}</p>}
      </FeeTableSection>

      {paidReceiptSections.map(({ title, columns }) => (
        <FeeTableSection title={title} key={title} className="legacy-receipt-section">
          <table className="fee-data-table legacy-table">
            <thead><tr><th>#</th>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody><tr><td colSpan={columns.length + 1}>No records found.</td></tr></tbody>
            <tfoot><tr><th colSpan={columns.length}>Amount Paid</th><td>₹0.00</td></tr></tfoot>
          </table>
        </FeeTableSection>
      ))}

      <FeeTableSection title="Refund History" className="refund-history-section">
        <table className="fee-data-table refund-table">
          <thead><tr><th>#</th><th>Refund Id</th><th>Payment Date</th><th>Payment Mode</th><th>Cheque/UTR/Transaction No.</th><th>Bank Name</th><th>Bank Branch</th><th>Amount Refunded</th></tr></thead>
          <tbody><tr><td colSpan="8">No refund records found.</td></tr></tbody>
          <tfoot><tr><th colSpan="7">Total Refunded</th><td>₹0.00</td></tr></tfoot>
        </table>
      </FeeTableSection>
    </div>
  )
}

function FeeTableSection({ title, className = '', children }) {
  return (
    <section className={`fee-table-section ${className}`}>
      <h3>{title}</h3>
      <div className="fee-table-wrap">{children}</div>
    </section>
  )
}

function AttendanceDetails() {
  const [selectedSemester, setSelectedSemester] = useState(0)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const semesters = [
    {
      label: '1ST Semester', held: 406, present: 391,
      subjects: [
        ['Mathematics-I (TT) [ALL]', 41, 39],
        ['Basic Civil Engineering (T) [ALL]', 38, 37],
        ['Workshop Practice Lab [ALL]', 15, 15],
        ['Constitution of India (T) [ALL]', 22, 22],
        ['Basic Programming Skills (T) [ALL]', 48, 47],
        ['English for Engineers-I (T) [ALL]', 22, 22],
        ['English for Engineers Lab-I [GR1]', 15, 15],
        ['Basic Electronics Engineering Lab [GR1]', 17, 16],
        ['Basic Electronics Engineering (T) [ALL]', 52, 49],
        ['Basic Programming Skills Lab [ALL]', 50, 50],
        ['Project-I [GR1]', 16, 15],
        ['Applied Chemistry (T) [ALL]', 40, 39],
        ['Applied Chemistry Lab [GR1]', 15, 10],
        ['Basic Civil Engineering Lab [GR1]', 15, 15],
      ],
    },
    {
      label: '2ND Semester', held: 313, present: 284,
      subjects: [['Mathematics-II', 68, 62], ['Engineering Physics', 74, 67], ['Digital Logic', 71, 64], ['Programming Lab', 55, 50], ['Professional Communication', 45, 41]],
    },
    {
      label: '3RD Semester', held: 414, present: 387,
      subjects: [['Discrete Mathematics', 85, 80], ['Data Structures', 86, 81], ['Computer Organization', 82, 77], ['Database Systems', 81, 76], ['Software Engineering', 80, 73]],
    },
    {
      label: '4TH Semester', held: 344, present: 321,
      subjects: [['Operating Systems', 70, 67], ['Algorithms', 68, 62], ['Computer Networks', 69, 64], ['Theory of Computation', 67, 63], ['Web Technologies', 70, 65]],
    },
    {
      label: '5TH Semester', held: 201, present: 182,
      subjects: [['Artificial Intelligence', 41, 38], ['Machine Learning', 40, 36], ['Cloud Computing', 40, 36], ['Compiler Design', 40, 36], ['Project Work', 40, 36]],
    },
  ]
  const semester = semesters[selectedSemester]

  return (
    <div className="attendance-view">
      <div className="attendance-table-wrap">
        <table className="attendance-summary-table">
          <thead><tr><th>Semester</th><th>Total Classes Held</th><th>Total Classes Attended</th><th>% Attendance</th></tr></thead>
          <tbody>
            {semesters.map((item, index) => (
              <tr className={selectedSemester === index ? 'selected' : ''} key={item.label}>
                <th scope="row"><button type="button" onClick={() => {
                  setSelectedSemester(index)
                  setDetailsOpen(false)
                }}>{item.label}</button></th>
                <td>{item.held}</td>
                <td>{item.present}</td>
                <td className="attendance-percent">{((item.present / item.held) * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="attendance-action-row">
        <button className="attendance-detail-toggle" type="button" aria-expanded={detailsOpen} onClick={() => setDetailsOpen((open) => !open)}>
          {detailsOpen ? 'Hide' : 'View'} Subject Wise Detail Attendance
        </button>
      </div>

      {detailsOpen && (
        <section className="subject-attendance" aria-label={`${semester.label} subject attendance`}>
          <h3>{semester.label}</h3>
          <div className="attendance-table-wrap">
            <table className="subject-attendance-table">
              <thead><tr><th>Subject Name</th><th>Classes Held</th><th>Classes Present</th><th>Attendance (%)</th></tr></thead>
              <tbody>
                {semester.subjects.map(([name, held, present]) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    <td>{held}</td>
                    <td>{present}</td>
                    <td>{((present / held) * 100).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot><tr><th>Total</th><td>{semester.held}</td><td>{semester.present}</td><td>{((semester.present / semester.held) * 100).toFixed(2)}%</td></tr></tfoot>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}

function AcademicDetails({ account }) {
  const fields = [
    ['Course', 'Bachelor of Technology'],
    ['Batch', 'BTECH 2023–2027'],
    ['Branch', account.department],
    ['Section', 'CSE · Section A'],
    ['House', 'Not assigned'],
    ['Lab Group', '1'],
    ['Honors', 'No'],
    ['Minor', 'No'],
    ['Value added course-1', 'Not selected'],
    ['Value added course-2', 'Not selected'],
    ['Value added course-3', 'Not selected'],
    ['Admission Date', '05-08-2023'],
    ['Entrance Examination', 'JEE (Main)'],
    ['Rank', 'Not provided'],
  ]
  const qualifications = [
    ['10th', 'Demo Secondary School', '2021', '82.00%'],
    ['12th', 'Demo Senior Secondary School', '2023', '86.00%'],
    ['ITI', 'Not applicable', '—', '—'],
    ['Diploma', 'Not applicable', '—', '—'],
    ['+3', 'Not applicable', '—', '—'],
    ['BCA', 'Not applicable', '—', '—'],
    ['BBA', 'Not applicable', '—', '—'],
    ['BTECH', 'GIFT Autonomous, Bhubaneswar', '2027', 'In progress'],
  ]

  return (
    <div className="academic-details">
      <div className="profile-data-table academic-data-table">
        {fields.map(([label, value]) => (
          <div className="profile-data-row wide-row" key={label}>
            <div className="profile-data-field"><span>{label}</span><strong>{value}</strong></div>
          </div>
        ))}
      </div>
      <div className="qualification-table-wrap">
        <table className="qualification-table">
          <thead>
            <tr><th>Qualification</th><th>Institute Name</th><th>Passout Year</th><th>Marks</th></tr>
          </thead>
          <tbody>
            {qualifications.map(([qualification, institute, year, marks]) => (
              <tr key={qualification}><th scope="row">{qualification}</th><td>{institute}</td><td>{year}</td><td>{marks}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="profile-data-table academic-status-table">
        <div className="profile-data-row wide-row"><div className="profile-data-field"><span>Student Status</span><strong>Active</strong></div></div>
        <div className="profile-data-row wide-row"><div className="profile-data-field"><span>Active/Inactive</span><strong>Active</strong></div></div>
      </div>
    </div>
  )
}

export default StudentProfile
