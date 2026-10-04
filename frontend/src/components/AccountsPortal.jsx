import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  DollarSign,
  Receipt,
  Download,
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  FileText,
  LogOut,
  Users,
  Building2,
  TrendingUp,
  X,
  Printer
} from 'lucide-react';
import './AccountsPortal.css';
import '../components/AdminPortal.css';
import { downloadFeeReceiptPdf, downloadAccountsRegisterPdf } from '../utils/pdfGenerator';
import {
  initialFeeStructures,
  initialFeeTransactions,
  initialScholarships,
  generateAllStudents
} from '../data/collegeData.js';
import { api } from '../services/api.js';

export default function AccountsPortal({ account, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [feeStructures, setFeeStructures] = useState(initialFeeStructures);
  const [transactions, setTransactions] = useState(initialFeeTransactions);
  const [scholarships, setScholarships] = useState(initialScholarships);
  const [students] = useState(() => generateAllStudents());

  // Search & Filter
  const [searchStudent, setSearchStudent] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modals
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    rollNumber: '01',
    studentName: 'Rakesh Das',
    head: 'Tuition & Development Fee',
    amount: '48500',
    mode: 'Net Banking',
    semester: 'Semester 5'
  });

  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    const newTxn = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      studentName: paymentForm.studentName,
      rollNumber: paymentForm.rollNumber,
      semester: paymentForm.semester,
      head: paymentForm.head,
      amount: Number(paymentForm.amount),
      mode: paymentForm.mode,
      date: 'Today, Just now',
      status: 'Verified',
      receiptNo: `RCPT-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setTransactions(prev => [newTxn, ...prev]);
    setIsRecordPaymentOpen(false);
    showToast(`Payment of ₹${Number(paymentForm.amount).toLocaleString('en-IN')} recorded for Roll ${paymentForm.rollNumber}! Receipt generated.`);
    try {
      await api.recordFeePayment(paymentForm);
    } catch (err) {
      console.warn('Backend payment record sync failed:', err.message);
    }
  };

  const filteredTransactions = transactions.filter(t => {
    const matchSearch = t.studentName.toLowerCase().includes(searchStudent.toLowerCase()) ||
                        t.rollNumber.includes(searchStudent) ||
                        t.id.toLowerCase().includes(searchStudent.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="accounts-portal-root">
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#0f172a',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          borderLeft: '4px solid #10b981'
        }}>
          <CheckCircle2 size={18} color="#34d399" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="accounts-header">
        <div className="accounts-brand">
          <div className="accounts-brand-icon">₹</div>
          <div className="accounts-brand-text">
            <h1>GIFT AUTONOMOUS · ACCOUNTS & FINANCE</h1>
            <p>Bursar Office & Fee Management System</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="accounts-role-badge">
            <CreditCard size={14} />
            Accounts Officer
          </span>
          <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>
            {account?.name || 'Accounts Officer'}
          </span>
          <button className="admin-signout-btn" onClick={onLogout} title="Sign Out">
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="accounts-layout">
        {/* Sidebar */}
        <aside className="accounts-sidebar">
          <button
            className={`accounts-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Layers size={17} /> Dashboard
          </button>
          <button
            className={`accounts-nav-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <Users size={17} /> Student Fee Ledger
          </button>
          <button
            className={`accounts-nav-btn ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            <Receipt size={17} /> Payment Transactions
          </button>
          <button
            className={`accounts-nav-btn ${activeTab === 'structure' ? 'active' : ''}`}
            onClick={() => setActiveTab('structure')}
          >
            <Building2 size={17} /> Fee Structures
          </button>
          <button
            className={`accounts-nav-btn ${activeTab === 'scholarships' ? 'active' : ''}`}
            onClick={() => setActiveTab('scholarships')}
          >
            <DollarSign size={17} /> Scholarships
          </button>
          <button
            className={`accounts-nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FileText size={17} /> Financial Reports
          </button>
        </aside>

        {/* Dynamic Content Pane */}
        <main className="accounts-main">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Institutional Fee & Accounts Dashboard</h2>
                  <p>Real-time financial status, semester fee collections, dues, and scholarship disbursements.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={() => setIsRecordPaymentOpen(true)}>
                  <Plus size={15} /> Record Student Payment
                </button>
              </div>

              {/* Accounts KPI Grid */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Annual Projected Fees</span>
                    <div className="admin-kpi-card-icon blue"><Building2 size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">₹2.48 Cr</div>
                  <small style={{ color: '#64748b' }}>For 2,480 enrolled students</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Fees Collected</span>
                    <div className="admin-kpi-card-icon emerald"><CheckCircle2 size={18} /></div>
                  </div>
                  <div className="admin-kpi-val" style={{ color: '#059669' }}>₹2.19 Cr</div>
                  <small style={{ color: '#059669', fontWeight: 600 }}>88.1% Clearance rate</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Outstanding Dues</span>
                    <div className="admin-kpi-card-icon amber"><AlertTriangle size={18} /></div>
                  </div>
                  <div className="admin-kpi-val" style={{ color: '#d97706' }}>₹29.5 L</div>
                  <small style={{ color: '#d97706', fontWeight: 600 }}>Semester 5 pending invoices</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Scholarships Disbursed</span>
                    <div className="admin-kpi-card-icon purple"><DollarSign size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">₹18.4 L</div>
                  <small style={{ color: '#64748b' }}>265 Beneficiaries</small>
                </div>
              </div>

              {/* Recent Transactions Section */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Recent Payment Transactions</h3>
                  <button className="admin-action-btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={() => setActiveTab('transactions')}>
                    View All Transactions
                  </button>
                </div>

                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Txn ID</th>
                        <th>Student Name & Roll</th>
                        <th>Fee Head</th>
                        <th>Amount</th>
                        <th>Payment Mode</th>
                        <th>Receipt No</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.slice(0, 5).map(txn => (
                        <tr key={txn.id}>
                          <td><strong>{txn.id}</strong></td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{txn.studentName}</div>
                            <small style={{ color: '#64748b' }}>Roll {txn.rollNumber} · {txn.semester}</small>
                          </td>
                          <td>{txn.head}</td>
                          <td><strong style={{ color: '#059669' }}>₹{txn.amount.toLocaleString('en-IN')}</strong></td>
                          <td><span className="admin-badge active">{txn.mode}</span></td>
                          <td><code>{txn.receiptNo}</code></td>
                          <td><span className="admin-badge approved">{txn.status}</span></td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              className="admin-table-action-btn"
                              title="Print / View Receipt"
                              onClick={() => setSelectedReceipt(txn)}
                            >
                              <Receipt size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENT FEE LEDGER */}
          {activeTab === 'students' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Student Fee Ledger & Clearance Status</h2>
                  <p>Individual student accounts, annual tuition dues, and hostel invoice tracking.</p>
                </div>
              </div>

              <div className="admin-card" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
                <div className="admin-search-wrap" style={{ minWidth: '320px' }}>
                  <Search size={16} />
                  <input
                    type="text"
                    className="admin-search-input"
                    placeholder="Search by student name or roll number..."
                    value={searchStudent}
                    onChange={e => setSearchStudent(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Roll</th>
                      <th>Student Name</th>
                      <th>Program & Semester</th>
                      <th>Annual Fee Package</th>
                      <th>Paid Amount</th>
                      <th>Outstanding Balance</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice(0, 20).map(s => {
                      const rollNum = parseInt(s.rollNumber);
                      const isCleared = rollNum % 3 !== 0;
                      const paidAmt = isCleared ? 98500 : 70000;
                      const dueAmt = isCleared ? 0 : 28500;

                      return (
                        <tr key={s.id}>
                          <td><strong>{s.rollNumber}</strong></td>
                          <td style={{ fontWeight: 600 }}>{s.name}</td>
                          <td>CSE · Semester 5 (Sec A)</td>
                          <td>₹98,500</td>
                          <td><strong style={{ color: '#059669' }}>₹{paidAmt.toLocaleString('en-IN')}</strong></td>
                          <td>
                            <strong style={{ color: dueAmt > 0 ? '#e11d48' : '#64748b' }}>
                              ₹{dueAmt.toLocaleString('en-IN')}
                            </strong>
                          </td>
                          <td>
                            <span className={`admin-badge ${dueAmt === 0 ? 'approved' : 'pending'}`}>
                              {dueAmt === 0 ? 'No Dues Clear' : 'Dues Pending'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              className="admin-action-btn-secondary"
                              style={{ padding: '0.35rem 0.65rem', fontSize: '0.775rem' }}
                              onClick={() => {
                                setPaymentForm({
                                  rollNumber: s.rollNumber,
                                  studentName: s.name,
                                  head: 'Semester Dues Clearance',
                                  amount: String(dueAmt || 48500),
                                  mode: 'Net Banking',
                                  semester: 'Semester 5'
                                });
                                setIsRecordPaymentOpen(true);
                              }}
                            >
                              Collect Fee
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENT TRANSACTIONS */}
          {activeTab === 'transactions' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>All Payment Transactions & Official Receipts</h2>
                  <p>Audit trail of all online, UPI, Challan, and card fee settlements.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={() => setIsRecordPaymentOpen(true)}>
                  <Plus size={15} /> Record Payment
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Txn ID</th>
                      <th>Student</th>
                      <th>Fee Category</th>
                      <th>Amount Paid</th>
                      <th>Date</th>
                      <th>Payment Channel</th>
                      <th>Receipt #</th>
                      <th>Verification</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map(txn => (
                      <tr key={txn.id}>
                        <td><strong>{txn.id}</strong></td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{txn.studentName}</div>
                          <small style={{ color: '#64748b' }}>Roll {txn.rollNumber}</small>
                        </td>
                        <td>{txn.head}</td>
                        <td><strong style={{ color: '#059669' }}>₹{txn.amount.toLocaleString('en-IN')}</strong></td>
                        <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{txn.date}</td>
                        <td><span className="admin-badge active">{txn.mode}</span></td>
                        <td><code>{txn.receiptNo}</code></td>
                        <td><span className="admin-badge approved">{txn.status}</span></td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="admin-table-action-btn"
                            title="Generate Official PDF Receipt"
                            onClick={() => setSelectedReceipt(txn)}
                          >
                            <Receipt size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: FEE STRUCTURES */}
          {activeTab === 'structure' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Institutional Fee Structure Matrix</h2>
                  <p>Curricular package breakdown approved by GIFT Autonomous Finance Committee.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
                {feeStructures.map(str => (
                  <div key={str.id} className="admin-card" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span className="admin-badge active">{str.program}</span>
                      <strong style={{ color: '#059669', fontSize: '1.2rem' }}>₹{str.total.toLocaleString('en-IN')}</strong>
                    </div>
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', color: '#0f172a' }}>{str.term}</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Tuition Fee</span>
                        <strong>₹{str.tuitionFee.toLocaleString('en-IN')}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Development Fee</span>
                        <strong>₹{str.developmentFee.toLocaleString('en-IN')}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Lab & Library Deposit</span>
                        <strong>₹{str.labLibraryFee.toLocaleString('en-IN')}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Autonomous Exam Fee</span>
                        <strong>₹{str.examinationFee.toLocaleString('en-IN')}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '0.4rem' }}>
                        <span style={{ color: '#64748b' }}>Hostel & Mess Charge (Optional)</span>
                        <strong>₹{str.hostelMessFee.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SCHOLARSHIPS */}
          {activeTab === 'scholarships' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Government & Institutional Scholarships</h2>
                  <p>Direct Benefit Transfer (DBT) verifications and merit tuition fee waivers.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {scholarships.map(sch => (
                  <div key={sch.id} className="admin-card" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span className="admin-badge active">{sch.status}</span>
                      <strong style={{ color: '#2563eb' }}>{sch.benefit}</strong>
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: '#0f172a' }}>{sch.name}</h3>
                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: '#64748b' }}>{sch.authority}</p>

                    <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span>Enrolled Beneficiaries:</span>
                      <strong>{sch.beneficiaries} Students</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FINANCIAL REPORTS */}
          {activeTab === 'reports' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Finance & Accounts Audit Gazettes</h2>
                  <p>Export reconciliation sheets, daily collection registers, and bank statements.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                <div className="admin-card">
                  <h3 className="admin-card-title">Daily Collection Ledger</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 1rem 0' }}>
                    Itemized receipt log across counter cash, online UPI, and Net Banking collections.
                  </p>
                  <button className="admin-action-btn-primary" onClick={() => {
                    downloadAccountsRegisterPdf(feeTransactions);
                    showToast('Generated & downloaded Daily Fee Collection Register PDF.');
                  }}>
                    <Download size={15} /> Download Register PDF
                  </button>
                </div>

                <div className="admin-card">
                  <h3 className="admin-card-title">Semester 5 Defaulters & Outstanding Sheet</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 1rem 0' }}>
                    Student-wise dues list with parent phone contacts for semester clearance reminders.
                  </p>
                  <button className="admin-action-btn-primary" onClick={() => showToast('Exported Defaulters Sheet to Excel.')}>
                    <Download size={15} /> Export Excel / CSV
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: RECORD PAYMENT */}
      {isRecordPaymentOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>Record Student Fee Payment</h3>
              <button className="admin-table-action-btn" onClick={() => setIsRecordPaymentOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleRecordPayment}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Roll Number</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={paymentForm.rollNumber}
                      onChange={e => setPaymentForm({ ...paymentForm, rollNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Student Name</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={paymentForm.studentName}
                      onChange={e => setPaymentForm({ ...paymentForm, studentName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Fee Head / Category</label>
                  <select
                    className="admin-form-select"
                    value={paymentForm.head}
                    onChange={e => setPaymentForm({ ...paymentForm, head: e.target.value })}
                  >
                    <option value="Tuition & Development Fee">Tuition & Development Fee</option>
                    <option value="Hostel & Mess Charges">Hostel & Mess Charges</option>
                    <option value="Autonomous Examination Fee">Autonomous Examination Fee</option>
                    <option value="Library Caution Deposit">Library Caution Deposit</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Amount Paid (₹)</label>
                    <input
                      type="number"
                      className="admin-form-input"
                      value={paymentForm.amount}
                      onChange={e => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Payment Channel</label>
                    <select
                      className="admin-form-select"
                      value={paymentForm.mode}
                      onChange={e => setPaymentForm({ ...paymentForm, mode: e.target.value })}
                    >
                      <option value="Net Banking">Net Banking</option>
                      <option value="UPI">UPI</option>
                      <option value="Debit / Credit Card">Debit / Credit Card</option>
                      <option value="Bank Challan">Bank Challan</option>
                      <option value="Cash at Counter">Cash at Counter</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-btn-secondary" onClick={() => setIsRecordPaymentOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn-primary">
                  Verify & Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW / PRINT RECEIPT */}
      {selectedReceipt && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card" style={{ maxWidth: '480px' }}>
            <div className="admin-modal-header">
              <h3>Official College Fee Receipt</h3>
              <button className="admin-table-action-btn" onClick={() => setSelectedReceipt(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="admin-modal-body" style={{ background: '#ffffff', border: '1px dashed #cbd5e1', margin: '1rem', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', color: '#1e3a8a' }}>GANDHI INSTITUTE FOR TECHNOLOGY (GIFT)</h4>
                <small style={{ color: '#64748b' }}>Autonomous College · Affiliated to BPUT</small>
                <div style={{ marginTop: '0.4rem', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                  FEE PAYMENT RECEIPT
                </div>
              </div>

              <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.825rem' }}>
                <div><dt style={{ color: '#64748b' }}>Receipt Number</dt><dd style={{ margin: 0, fontWeight: 700 }}>{selectedReceipt.receiptNo}</dd></div>
                <div><dt style={{ color: '#64748b' }}>Transaction ID</dt><dd style={{ margin: 0 }}>{selectedReceipt.id}</dd></div>
                <div><dt style={{ color: '#64748b' }}>Student Name</dt><dd style={{ margin: 0, fontWeight: 600 }}>{selectedReceipt.studentName}</dd></div>
                <div><dt style={{ color: '#64748b' }}>Roll Number</dt><dd style={{ margin: 0 }}>{selectedReceipt.rollNumber}</dd></div>
                <div><dt style={{ color: '#64748b' }}>Payment Head</dt><dd style={{ margin: 0 }}>{selectedReceipt.head}</dd></div>
                <div><dt style={{ color: '#64748b' }}>Payment Mode</dt><dd style={{ margin: 0 }}>{selectedReceipt.mode}</dd></div>
              </dl>

              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '2px solid #0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>TOTAL RECEIVED</span>
                <strong style={{ fontSize: '1.25rem', color: '#059669' }}>₹{selectedReceipt.amount.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', marginTop: '1rem' }}>
                Computer generated electronic receipt. Valid for autonomous semester enrollment clearance.
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-action-btn-secondary" onClick={() => downloadFeeReceiptPdf(selectedReceipt)}>
                <Download size={15} /> Download PDF Receipt
              </button>
              <button className="admin-action-btn-primary" onClick={() => setSelectedReceipt(null)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
