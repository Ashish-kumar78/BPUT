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
  Wallet
} from 'lucide-react'
import './FeesPage.css'

const feeHistory = [
  { id: 'TXN-98421', term: 'Semester 7 (Current)', head: 'Tuition & Development Fee', amount: 48500, paid: 48500, status: 'Paid', date: '12 Aug 2026', mode: 'Net Banking (HDFC)' },
  { id: 'TXN-98422', term: 'Semester 7 (Current)', head: 'Examination & University Reg.', amount: 3500, paid: 3500, status: 'Paid', date: '15 Aug 2026', mode: 'UPI' },
  { id: 'TXN-98423', term: 'Semester 7 (Current)', head: 'Hostel & Mess Charges', amount: 32000, paid: 20000, due: 12000, status: 'Partial', date: '20 Aug 2026', mode: 'Credit Card' },
  { id: 'TXN-98424', term: 'Semester 7 (Current)', head: 'Library & Laboratory Caution', amount: 5000, paid: 5000, status: 'Paid', date: '10 Aug 2026', mode: 'Challan' },
  { id: 'TXN-87211', term: 'Semester 6', head: 'Full Semester Package', amount: 82000, paid: 82000, status: 'Paid', date: '18 Jan 2026', mode: 'Net Banking' },
  { id: 'TXN-76192', term: 'Semester 5', head: 'Full Semester Package', amount: 80000, paid: 80000, status: 'Paid', date: '22 Jul 2025', mode: 'Net Banking' },
]

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState('current')
  const [showPayModal, setShowPayModal] = useState(false)
  const [selectedPayMode, setSelectedPayMode] = useState('upi')
  const [paidSuccess, setPaidSuccess] = useState(false)

  const handlePay = () => {
    setPaidSuccess(true)
    setTimeout(() => {
      setPaidSuccess(false)
      setShowPayModal(false)
    }, 2000)
  }

  const handleDownload = (id) => {
    alert(`Downloading Official College Receipt: ${id}.pdf`)
  }

  return (
    <div className="fees-page">
      <div className="fees-header">
        <div>
          <h1 className="fees-title">Fees & Accounts Statement</h1>
          <p className="fees-subtitle">Monitor academic dues, hostel invoices, and official BPUT clearance slips</p>
        </div>
        <button className="btn-pay-now" onClick={() => setShowPayModal(true)}>
          <CreditCard size={18} />
          <span>Pay Outstanding (₹12,000)</span>
        </button>
      </div>

      <div className="fees-metrics">
        <div className="fee-metric-card">
          <div className="fee-metric-icon blue"><DollarSign size={24} /></div>
          <div className="fee-metric-body">
            <h4>Total Annual Dues</h4>
            <div className="fee-val">₹89,000</div>
            <div className="fee-sub">Academic Session 2026-27</div>
          </div>
        </div>
        <div className="fee-metric-card">
          <div className="fee-metric-icon green"><CheckCircle2 size={24} /></div>
          <div className="fee-metric-body">
            <h4>Total Paid</h4>
            <div className="fee-val">₹77,000</div>
            <div className="fee-sub">86.5% cleared</div>
          </div>
        </div>
        <div className="fee-metric-card">
          <div className="fee-metric-icon amber"><Clock size={24} /></div>
          <div className="fee-metric-body">
            <h4>Outstanding Balance</h4>
            <div className="fee-val" style={{ color: '#d97706' }}>₹12,000</div>
            <div className="fee-sub">Due by: 30 Oct 2026</div>
          </div>
        </div>
        <div className="fee-metric-card">
          <div className="fee-metric-icon purple"><Wallet size={24} /></div>
          <div className="fee-metric-body">
            <h4>Hostel Caution Deposit</h4>
            <div className="fee-val">₹5,000</div>
            <div className="fee-sub">Refundable upon course end</div>
          </div>
        </div>
      </div>

      <div className="fees-tabs">
        <button 
          className={`fee-tab-btn ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => setActiveTab('current')}
        >
          Current Semester Invoices
        </button>
        <button 
          className={`fee-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Consolidated Payment History
        </button>
      </div>

      <div className="fees-section-card">
        <div className="fee-sec-header">
          <h3>{activeTab === 'current' ? 'Semester 7 Fee Breakdown' : 'All Past Transactions & Ledgers'}</h3>
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
