import { useState } from 'react'
import { 
  CreditCard, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Receipt, 
  DollarSign, 
  ArrowUpRight,
  ShieldAlert,
  Wallet,
  History,
  Calendar,
  Layers,
  FileCheck,
  X
} from 'lucide-react'
import { downloadFeeReceiptPdf } from '../utils/pdfGenerator'
import './FeesPage.css'

export const yearlyFeeLedger = [
  {
    year: '1st Year',
    session: 'Academic Session 2023–24',
    semesters: 'Semester 1 & 2',
    totalDue: 75000,
    amountPaid: 75000,
    outstanding: 0,
    status: 'Cleared',
    percent: '100%',
    receiptsCount: 2,
    details: 'Admission fee, 1st & 2nd semester academic packages, basic workshop & university registration'
  },
  {
    year: '2nd Year',
    session: 'Academic Session 2024–25',
    semesters: 'Semester 3 & 4',
    totalDue: 78400,
    amountPaid: 78400,
    outstanding: 0,
    status: 'Cleared',
    percent: '100%',
    receiptsCount: 2,
    details: 'Tuition fees, lab maintenance, university semester registration, development fee'
  },
  {
    year: '3rd Year',
    session: 'Academic Session 2025–26',
    semesters: 'Semester 5 & 6',
    totalDue: 82000,
    amountPaid: 82000,
    outstanding: 0,
    status: 'Cleared',
    percent: '100%',
    receiptsCount: 2,
    details: 'Specialization labs, cloud computing resources, mid-term & end-term examination fee'
  },
  {
    year: '4th Year (Current)',
    session: 'Academic Session 2026–27',
    semesters: 'Semester 7 & 8',
    totalDue: 89000,
    amountPaid: 77000,
    outstanding: 12000,
    status: 'Pending: ₹12,000',
    percent: '86.5%',
    receiptsCount: 4,
    details: 'Semester 7 tuition fee, library caution, university exams, hostel & mess charge (balance ₹12,000 due 30 Oct 2026)'
  }
];

export const feeHistory = [
  // 4th Year (Current 2026-27)
  { id: 'TXN-98421', term: 'Semester 7 (4th Year)', head: 'Tuition & Development Fee', amount: 48500, paid: 48500, status: 'Paid', date: '12 Aug 2026', mode: 'Net Banking (HDFC)' },
  { id: 'TXN-98422', term: 'Semester 7 (4th Year)', head: 'Examination & University Reg.', amount: 3500, paid: 3500, status: 'Paid', date: '15 Aug 2026', mode: 'UPI' },
  { id: 'TXN-98423', term: 'Semester 7 (4th Year)', head: 'Hostel & Mess Charges', amount: 32000, paid: 20000, due: 12000, status: 'Partial', date: '20 Aug 2026', mode: 'Credit Card' },
  { id: 'TXN-98424', term: 'Semester 7 (4th Year)', head: 'Library & Laboratory Caution', amount: 5000, paid: 5000, status: 'Paid', date: '10 Aug 2026', mode: 'Challan' },
  // 3rd Year (2025-26)
  { id: 'TXN-87211', term: 'Semester 6 (3rd Year)', head: 'Full Semester Academic Package', amount: 41000, paid: 41000, status: 'Paid', date: '18 Jan 2026', mode: 'Net Banking' },
  { id: 'TXN-76192', term: 'Semester 5 (3rd Year)', head: 'Full Semester Academic Package', amount: 41000, paid: 41000, status: 'Paid', date: '22 Jul 2025', mode: 'Net Banking' },
  // 2nd Year (2024-25)
  { id: 'TXN-24751', term: 'Semester 4 (2nd Year)', head: 'Tuition & Examination Fee', amount: 39200, paid: 39200, status: 'Paid', date: '12 Jan 2025', mode: 'UPI' },
  { id: 'TXN-24103', term: 'Semester 3 (2nd Year)', head: 'Tuition & Development Fee', amount: 39200, paid: 39200, status: 'Paid', date: '10 Jul 2024', mode: 'Net Banking' },
  // 1st Year (2023-24)
  { id: 'TXN-23842', term: 'Semester 2 (1st Year)', head: 'Tuition & Laboratory Fee', amount: 35000, paid: 35000, status: 'Paid', date: '15 Jan 2024', mode: 'Net Banking' },
  { id: 'TXN-23011', term: 'Semester 1 (1st Year)', head: 'Admission & 1st Sem Tuition', amount: 40000, paid: 40000, status: 'Paid', date: '12 Aug 2023', mode: 'Online SBI' },
];

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState('current')
  const [showPayModal, setShowPayModal] = useState(false)
  const [showYearlyModal, setShowYearlyModal] = useState(false)
  const [selectedPayMode, setSelectedPayMode] = useState('upi')
  const [paidSuccess, setPaidSuccess] = useState(false)

  // Overall calculations from 1st Year to till now
  const totalOverallPaid = yearlyFeeLedger.reduce((sum, item) => sum + item.amountPaid, 0) // ₹3,12,400
  const totalOverallDues = yearlyFeeLedger.reduce((sum, item) => sum + item.totalDue, 0)    // ₹3,24,400
  const overallClearedPercent = ((totalOverallPaid / totalOverallDues) * 100).toFixed(1)

  const handlePay = () => {
    setPaidSuccess(true)
    setTimeout(() => {
      setPaidSuccess(false)
      setShowPayModal(false)
    }, 2000)
  }

  const handleDownload = (id) => {
    const row = feeHistory.find(item => item.id === id) || { id, amount: 48500, head: 'Tuition Fee', mode: 'Net Banking' }
    downloadFeeReceiptPdf(row, { name: 'Aarav Sharma', rollNo: '2301289140' })
  }

  const handleDownloadConsolidatedStatement = () => {
    downloadFeeReceiptPdf({
      id: 'BPUT-CONS-FEE-2026',
      term: '1st Year to Till Now (4-Year Consolidated)',
      head: 'Overall Institutional BPUT Fee Clearance Statement',
      amount: totalOverallDues,
      paid: totalOverallPaid,
      mode: 'Consolidated Electronic Transfer',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    }, { name: 'Aarav Sharma', rollNo: '2301289140' })
  }

  return (
    <div className="fees-page">
      <div className="fees-header">
        <div>
          <h1 className="fees-title">Fees & Accounts Statement</h1>
          <p className="fees-subtitle">Monitor academic dues, hostel invoices, and official BPUT clearance slips</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            type="button"
            className="btn-receipt"
            style={{ background: '#ffffff', borderColor: '#6366f1', color: '#4338ca', padding: '10px 16px', fontSize: '0.86rem' }}
            onClick={() => setShowYearlyModal(true)}
          >
            <History size={16} />
            <span>1st Yr to Date Statement</span>
          </button>
          <button className="btn-pay-now" onClick={() => setShowPayModal(true)}>
            <CreditCard size={18} />
            <span>Pay Outstanding (₹12,000)</span>
          </button>
        </div>
      </div>

      {/* Metrics Row: 5 Cards including Overall Paid from 1st Year Till Now */}
      <div className="fees-metrics">
        {/* Card 1: Overall Amount Paid from 1st Year to Till Now (NEW FUNCTION) */}
        <div 
          className="fee-metric-card interactive" 
          onClick={() => setShowYearlyModal(true)}
          title="Click to view complete year-by-year fee breakdown from 1st Year to till now"
          style={{ border: '1.5px solid #818cf8', background: 'linear-gradient(180deg, #ffffff 0%, #f8faff 100%)' }}
        >
          <div className="fee-metric-icon indigo"><History size={24} /></div>
          <div className="fee-metric-body" style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
              <h4>Overall Paid (1st Yr – Now)</h4>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, background: '#e0e7ff', color: '#4338ca', padding: '2px 6px', borderRadius: '4px' }}>
                All Years
              </span>
            </div>
            <div className="fee-val" style={{ color: '#4338ca' }}>₹{totalOverallPaid.toLocaleString('en-IN')}</div>
            <div className="fee-sub" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6366f1', fontWeight: 600 }}>
              <span>{overallClearedPercent}% cleared</span> · <span>Yearly Breakdown →</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Annual Dues */}
        <div className="fee-metric-card">
          <div className="fee-metric-icon blue"><DollarSign size={24} /></div>
          <div className="fee-metric-body">
            <h4>Total Annual Dues</h4>
            <div className="fee-val">₹89,000</div>
            <div className="fee-sub">Academic Session 2026-27</div>
          </div>
        </div>

        {/* Card 3: Total Paid (Current Year) */}
        <div className="fee-metric-card">
          <div className="fee-metric-icon green"><CheckCircle2 size={24} /></div>
          <div className="fee-metric-body">
            <h4>Total Paid</h4>
            <div className="fee-val">₹77,000</div>
            <div className="fee-sub">86.5% cleared</div>
          </div>
        </div>

        {/* Card 4: Outstanding Balance */}
        <div className="fee-metric-card">
          <div className="fee-metric-icon amber"><Clock size={24} /></div>
          <div className="fee-metric-body">
            <h4>Outstanding Balance</h4>
            <div className="fee-val" style={{ color: '#d97706' }}>₹12,000</div>
            <div className="fee-sub">Due by: 30 Oct 2026</div>
          </div>
        </div>

        {/* Card 5: Hostel Caution Deposit */}
        <div className="fee-metric-card">
          <div className="fee-metric-icon purple"><Wallet size={24} /></div>
          <div className="fee-metric-body">
            <h4>Hostel Caution Deposit</h4>
            <div className="fee-val">₹5,000</div>
            <div className="fee-sub">Refundable upon course end</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="fees-tabs">
        <button 
          className={`fee-tab-btn ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => setActiveTab('current')}
        >
          Current Semester Invoices
        </button>
        <button 
          className={`fee-tab-btn ${activeTab === 'yearly' ? 'active' : ''}`}
          onClick={() => setActiveTab('yearly')}
        >
          Year-Wise Ledger (1st Year to Till Now)
        </button>
        <button 
          className={`fee-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Consolidated Payment Receipts
        </button>
      </div>

      {/* Section Content based on selected tab */}
      {activeTab === 'yearly' ? (
        <div className="fees-section-card">
          <div className="fee-sec-header">
            <div>
              <h3>Cumulative Year-Wise Fee Breakdown (1st Year to Till Now)</h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#64748b' }}>
                Complete certified financial ledger from admission session (2023) through current 4th Year (2026).
              </p>
            </div>
            <button className="btn-receipt" onClick={handleDownloadConsolidatedStatement}>
              <Download size={14} />
              Consolidated Statement PDF
            </button>
          </div>

          {/* Quick Summary Pill Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', padding: '16px', background: '#f8fafc', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total 4-Year Demand:</span>
              <p style={{ margin: '4px 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>₹{totalOverallDues.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, textTransform: 'uppercase' }}>Overall Amount Paid:</span>
              <p style={{ margin: '4px 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#059669' }}>₹{totalOverallPaid.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 600, textTransform: 'uppercase' }}>Net Pending Balance:</span>
              <p style={{ margin: '4px 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#d97706' }}>₹12,000</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#4338ca', fontWeight: 600, textTransform: 'uppercase' }}>Program Clearance:</span>
              <p style={{ margin: '4px 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#4338ca' }}>{overallClearedPercent}% Completed</p>
            </div>
          </div>

          <div className="fee-table-wrap">
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Academic Year</th>
                  <th>Session</th>
                  <th>Semesters</th>
                  <th>Total Dues</th>
                  <th>Amount Paid</th>
                  <th>Outstanding</th>
                  <th>Clearance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {yearlyFeeLedger.map((row) => (
                  <tr key={row.year} style={{ background: row.year.includes('Current') ? '#fffdfa' : '#ffffff' }}>
                    <td><strong style={{ color: '#0f172a', fontWeight: 700 }}>{row.year}</strong></td>
                    <td style={{ color: '#475569' }}>{row.session}</td>
                    <td><span style={{ fontSize: '0.8rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#334155', fontWeight: 600 }}>{row.semesters}</span></td>
                    <td><strong>₹{row.totalDue.toLocaleString('en-IN')}</strong></td>
                    <td style={{ color: '#059669', fontWeight: 700 }}>₹{row.amountPaid.toLocaleString('en-IN')}</td>
                    <td style={{ color: row.outstanding > 0 ? '#d97706' : '#64748b', fontWeight: row.outstanding > 0 ? 700 : 500 }}>
                      ₹{row.outstanding.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: row.percent, height: '100%', background: row.outstanding === 0 ? '#10b981' : '#f59e0b' }} />
                        </div>
                        <span style={{ fontSize: '0.76rem', fontWeight: 600, color: '#475569' }}>{row.percent}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`fee-badge ${row.outstanding === 0 ? 'paid' : 'partial'}`}>
                        {row.outstanding === 0 ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="fees-section-card">
          <div className="fee-sec-header">
            <h3>{activeTab === 'current' ? 'Semester 7 Fee Breakdown' : 'All Past Transactions & Ledgers (1st Year to Till Now)'}</h3>
            <span style={{ fontSize: '0.84rem', color: '#64748b' }}>Curated Accounts Ledger</span>
          </div>

          <div className="fee-table-wrap">
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Receipt ID</th>
                  <th>Semester / Session</th>
                  <th>Fee Head</th>
                  <th>Total Invoiced</th>
                  <th>Paid Amount</th>
                  <th>Status</th>
                  <th>Payment Mode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {feeHistory
                  .filter(item => activeTab === 'current' ? item.term.includes('Semester 7') : true)
                  .map((row) => (
                    <tr key={row.id}>
                      <td><strong style={{ fontFamily: 'monospace', color: '#2563eb' }}>{row.id}</strong></td>
                      <td>{row.term}</td>
                      <td>{row.head}</td>
                      <td><strong>₹{row.amount.toLocaleString('en-IN')}</strong></td>
                      <td>₹{row.paid.toLocaleString('en-IN')}</td>
                      <td>
                        <span className={`fee-badge ${row.status.toLowerCase()}`}>
                          {row.status === 'Paid' && <CheckCircle2 size={12} />}
                          {row.status === 'Partial' && <AlertCircle size={12} />}
                          {row.status}
                        </span>
                      </td>
                      <td><small style={{ color: '#64748b' }}>{row.mode}</small></td>
                      <td>
                        <button className="btn-receipt" onClick={() => handleDownload(row.id)}>
                          <Download size={14} />
                          Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Interactive Modal: Overall Paid from 1st Year to Till Now */}
      {showYearlyModal && (
        <div className="payment-modal-backdrop" onClick={() => setShowYearlyModal(false)}>
          <div className="payment-modal" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <button className="payment-modal-close" onClick={() => setShowYearlyModal(false)}>×</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div className="fee-metric-icon indigo" style={{ width: '38px', height: '38px' }}><History size={20} /></div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 }}>Overall Amount Paid (1st Year to Till Now)</h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: '#64748b' }}>Consolidated institutional fee ledger across all 4 undergraduate years.</p>
              </div>
            </div>

            {/* Total Highlight Bar */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', color: '#ffffff', borderRadius: '12px', padding: '16px 20px', margin: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#c7d2fe', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Total Cumulative Paid:</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>₹{totalOverallPaid.toLocaleString('en-IN')}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.78rem', color: '#c7d2fe' }}>4-Year Program Demand:</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e0e7ff' }}>₹{totalOverallDues.toLocaleString('en-IN')}</div>
                <span style={{ fontSize: '0.75rem', color: '#a5b4fc', fontWeight: 600 }}>{overallClearedPercent}% Cleared</span>
              </div>
            </div>

            {/* Year-by-Year Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
              {yearlyFeeLedger.map((y) => (
                <div key={y.year} style={{ padding: '12px 14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{y.year}</strong>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: '8px' }}>({y.session})</span>
                    <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#475569' }}>{y.details}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: y.outstanding === 0 ? '#059669' : '#d97706' }}>
                      ₹{y.amountPaid.toLocaleString('en-IN')}
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: y.outstanding === 0 ? '#059669' : '#d97706' }}>
                      {y.outstanding === 0 ? '✓ 100% Cleared' : '₹12,000 Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #e2e8f0' }}>
              <button 
                type="button" 
                className="btn-pay-now" 
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={handleDownloadConsolidatedStatement}
              >
                <Download size={16} /> Download 4-Year Statement PDF
              </button>
              <button 
                type="button" 
                className="btn-receipt" 
                style={{ padding: '10px 18px' }}
                onClick={() => setShowYearlyModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pay Modal */}
      {showPayModal && (
        <div className="payment-modal-backdrop" onClick={() => setShowPayModal(false)}>
          <div className="payment-modal" onClick={e => e.stopPropagation()}>
            <button className="payment-modal-close" onClick={() => setShowPayModal(false)}>×</button>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.25rem' }}>Secure Dues Payment Gateway</h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 16px' }}>
              Pending Hostel & Mess balance: <strong style={{ color: '#0a0f1e' }}>₹12,000</strong>
            </p>

            {paidSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <CheckCircle2 size={54} color="#10b981" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ margin: 0, color: '#065f46', fontSize: '1.2rem' }}>Payment Successful!</h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '6px' }}>Generating digital receipt and clearing dues...</p>
              </div>
            ) : (
              <>
                <div className="pay-opts">
                  <div 
                    className={`pay-opt-btn ${selectedPayMode === 'upi' ? 'active' : ''}`}
                    onClick={() => setSelectedPayMode('upi')}
                  >
                    UPI / QR Code
                  </div>
                  <div 
                    className={`pay-opt-btn ${selectedPayMode === 'cards' ? 'active' : ''}`}
                    onClick={() => setSelectedPayMode('cards')}
                  >
                    Debit / Credit Card
                  </div>
                  <div 
                    className={`pay-opt-btn ${selectedPayMode === 'netbanking' ? 'active' : ''}`}
                    onClick={() => setSelectedPayMode('netbanking')}
                  >
                    Net Banking
                  </div>
                  <div 
                    className={`pay-opt-btn ${selectedPayMode === 'challan' ? 'active' : ''}`}
                    onClick={() => setSelectedPayMode('challan')}
                  >
                    Bank Challan (Offline)
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', fontSize: '0.82rem', color: '#475569', marginBottom: '20px' }}>
                  256-Bit SSL Encrypted Transaction. Automatic ERP clearance receipt generated immediately.
                </div>

                <button 
                  className="btn-pay-now" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={handlePay}
                >
                  Confirm & Pay ₹12,000
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
