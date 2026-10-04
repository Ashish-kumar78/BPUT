import React, { useState } from 'react';
import {
  Building,
  Bed,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  Layers,
  FileText,
  LogOut,
  Search,
  Plus,
  Home,
  ShieldCheck,
  Download,
  Calendar,
  Eye,
  X
} from 'lucide-react';
import './HostelPortal.css';
import '../components/AdminPortal.css';
import { downloadHostelCensusPdf } from '../utils/pdfGenerator';
import {
  initialHostels,
  initialHostelRooms,
  initialHostelComplaints,
  initialHostelVisitors,
  generateAllStudents
} from '../data/collegeData.js';
import { api } from '../services/api.js';

export default function HostelPortal({ account, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hostels, setHostels] = useState(initialHostels);
  const [rooms, setRooms] = useState(initialHostelRooms);
  const [complaints, setComplaints] = useState(initialHostelComplaints);
  const [visitors, setVisitors] = useState(initialHostelVisitors);
  const [students] = useState(() => generateAllStudents());

  const [selectedHostelFilter, setSelectedHostelFilter] = useState('All');
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [visitorForm, setVisitorForm] = useState({
    visitorName: '',
    relation: 'Father',
    studentName: 'Rakesh Das',
    rollNumber: '01',
    inTime: '05:00 PM',
    purpose: 'Academic visit'
  });

  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleUpdateComplaintStatus = async (id, newStatus) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus,
          resolutionNotes: newStatus === 'Resolved' ? 'Verified by hostel maintenance supervisor.' : c.resolutionNotes
        };
      }
      return c;
    }));
    showToast(`Complaint ${id} status updated to ${newStatus}`);
    try {
      await api.updateComplaintStatus(id, newStatus);
    } catch (err) {
      console.warn('Backend complaint status sync failed:', err.message);
    }
  };

  const handleAddVisitor = async (e) => {
    e.preventDefault();
    const newVisitor = {
      id: `VIS-${Math.floor(500 + Math.random() * 500)}`,
      visitorName: visitorForm.visitorName,
      relation: visitorForm.relation,
      studentName: visitorForm.studentName,
      rollNumber: visitorForm.rollNumber,
      inTime: visitorForm.inTime,
      outTime: 'Pending Sign-out',
      passNumber: `PASS-${Math.floor(800 + Math.random() * 200)}`,
      purpose: visitorForm.purpose
    };
    setVisitors(prev => [newVisitor, ...prev]);
    setIsVisitorModalOpen(false);
    showToast(`Visitor pass issued for ${newVisitor.visitorName}!`);
    try {
      await api.issueVisitorPass(visitorForm);
    } catch (err) {
      console.warn('Backend visitor pass sync failed:', err.message);
    }
  };

  const totalBeds = hostels.reduce((acc, h) => acc + h.totalBeds, 0);
  const occupiedBeds = hostels.reduce((acc, h) => acc + h.occupiedBeds, 0);
  const availableBeds = totalBeds - occupiedBeds;
  const pendingComplaints = complaints.filter(c => c.status !== 'Resolved').length;

  return (
    <div className="hostel-portal-root">
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
          borderLeft: '4px solid #8b5cf6'
        }}>
          <CheckCircle2 size={18} color="#a78bfa" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="hostel-header">
        <div className="hostel-brand">
          <div className="hostel-brand-icon">
            <Home size={20} />
          </div>
          <div className="hostel-brand-text">
            <h1>GIFT AUTONOMOUS · HOSTEL & RESIDENTIAL SERVICES</h1>
            <p>Chief Warden & Student Accommodation Office</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="hostel-role-badge">
            <ShieldCheck size={14} />
            Chief Warden
          </span>
          <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>
            {account?.name || 'Chief Hostel Warden'}
          </span>
          <button className="admin-signout-btn" onClick={onLogout} title="Sign Out">
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="hostel-layout">
        {/* Sidebar */}
        <aside className="hostel-sidebar">
          <button
            className={`hostel-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Layers size={17} /> Dashboard
          </button>
          <button
            className={`hostel-nav-btn ${activeTab === 'hostels' ? 'active' : ''}`}
            onClick={() => setActiveTab('hostels')}
          >
            <Building size={17} /> Hostels & Buildings
          </button>
          <button
            className={`hostel-nav-btn ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            <Bed size={17} /> Rooms & Bed Allocations
          </button>
          <button
            className={`hostel-nav-btn ${activeTab === 'complaints' ? 'active' : ''}`}
            onClick={() => setActiveTab('complaints')}
          >
            <AlertCircle size={17} /> Complaints ({pendingComplaints})
          </button>
          <button
            className={`hostel-nav-btn ${activeTab === 'visitors' ? 'active' : ''}`}
            onClick={() => setActiveTab('visitors')}
          >
            <Users size={17} /> Visitor Management
          </button>
          <button
            className={`hostel-nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FileText size={17} /> Occupancy Reports
          </button>
        </aside>

        {/* Dynamic Content Pane */}
        <main className="hostel-main">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Hostel Administration & Resident Welfare</h2>
                  <p>Monitoring residential occupancy across Gandhi Block, Kalam Block, and Sarojini Girls Block.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={() => setIsVisitorModalOpen(true)}>
                  <Plus size={15} /> Issue Visitor Pass
                </button>
              </div>

              {/* KPI Grid */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Total Hostels</span>
                    <div className="admin-kpi-card-icon blue"><Building size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">{hostels.length}</div>
                  <small style={{ color: '#64748b' }}>2 Boys & 1 Girls Residence</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Total Rooms</span>
                    <div className="admin-kpi-card-icon emerald"><Home size={18} /></div>
                  </div>
                  <div className="admin-kpi-val">170</div>
                  <small style={{ color: '#64748b' }}>Across 9 residential floors</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Occupied Beds</span>
                    <div className="admin-kpi-card-icon purple"><Bed size={18} /></div>
                  </div>
                  <div className="admin-kpi-val" style={{ color: '#7c3aed' }}>{occupiedBeds} / {totalBeds}</div>
                  <small style={{ color: '#059669', fontWeight: 600 }}>94.5% Current Occupancy</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Available Vacant Beds</span>
                    <div className="admin-kpi-card-icon amber"><Bed size={18} /></div>
                  </div>
                  <div className="admin-kpi-val" style={{ color: '#059669' }}>{availableBeds}</div>
                  <small style={{ color: '#64748b' }}>Ready for allocation</small>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-card-header">
                    <span className="admin-kpi-label">Active Complaints</span>
                    <div className="admin-kpi-card-icon rose"><AlertCircle size={18} /></div>
                  </div>
                  <div className="admin-kpi-val" style={{ color: '#e11d48' }}>{pendingComplaints}</div>
                  <small style={{ color: '#e11d48', fontWeight: 600 }}>Action Required</small>
                </div>
              </div>

              {/* Residential Blocks Overview */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {hostels.map(h => (
                  <div key={h.id} className="admin-card" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span className="admin-badge active">{h.type} Hostel</span>
                      <strong style={{ color: '#7c3aed' }}>{h.occupiedBeds} / {h.totalBeds} Beds</strong>
                    </div>
                    <h3 style={{ margin: '0 0 0.4rem 0', color: '#0f172a' }}>{h.name}</h3>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
                      Warden: <strong>{h.warden}</strong> ({h.contact})
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.round((h.occupiedBeds / h.totalBeds) * 100)}%`, height: '100%', background: '#7c3aed', borderRadius: '9999px' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
                      <span>{h.totalRooms} Rooms · {h.totalFloors} Floors</span>
                      <span style={{ color: '#059669', fontWeight: 600 }}>{h.availableBeds} Vacant</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Maintenance Feed */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Pending Maintenance & Resident Requests</h3>
                  <button className="admin-action-btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={() => setActiveTab('complaints')}>
                    View All Complaints
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {complaints.filter(c => c.status !== 'Resolved').map(c => (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '8px', borderLeft: `4px solid ${c.priority === 'High' ? '#e11d48' : '#d97706'}` }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{c.title}</strong>
                          <span className={`admin-badge ${c.priority === 'High' ? 'rejected' : 'pending'}`}>{c.priority} Priority</span>
                        </div>
                        <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '0.2rem' }}>
                          Reported by: <strong>{c.studentName}</strong> (Roll {c.rollNumber}) · {c.hostel} · Room {c.roomNumber} · {c.filedDate}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          className="admin-action-btn-secondary"
                          style={{ padding: '0.35rem 0.7rem', fontSize: '0.775rem' }}
                          onClick={() => handleUpdateComplaintStatus(c.id, 'In Progress')}
                        >
                          Mark In-Progress
                        </button>
                        <button
                          className="admin-action-btn-primary"
                          style={{ padding: '0.35rem 0.7rem', fontSize: '0.775rem', background: '#059669' }}
                          onClick={() => handleUpdateComplaintStatus(c.id, 'Resolved')}
                        >
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOSTELS & BUILDINGS */}
          {activeTab === 'hostels' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Hostel Infrastructure & Building Complexes</h2>
                  <p>Residential blocks equipped with Wi-Fi, dining halls, biometric check-in, and recreational zones.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
                {hostels.map(h => (
                  <div key={h.id} className="admin-card" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span className="admin-badge active">{h.type} Hostel</span>
                      <span className="admin-badge approved">Biometric Active</span>
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>{h.name}</h3>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                      Resident Warden: <strong>{h.warden}</strong><br />Emergency Contact: {h.contact}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#7c3aed' }}>{h.totalRooms}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Rooms</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#059669' }}>{h.occupiedBeds}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Occupied</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2563eb' }}>{h.availableBeds}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Vacant</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ROOMS & BED ALLOCATIONS */}
          {activeTab === 'rooms' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Room & Bed Inventory Matrix</h2>
                  <p>Bed level allocation tracking across triple deluxe, double, and standard resident rooms.</p>
                </div>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Room #</th>
                      <th>Hostel Residence</th>
                      <th>Floor</th>
                      <th>Room Type</th>
                      <th>Capacity</th>
                      <th>Occupancy Status</th>
                      <th>Allocated Residents</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map(rm => (
                      <tr key={rm.id}>
                        <td><strong style={{ fontSize: '1rem', color: '#7c3aed' }}>Room {rm.roomNumber}</strong></td>
                        <td>{rm.hostelName}</td>
                        <td>{rm.floor}</td>
                        <td><span className="admin-badge active">{rm.type}</span></td>
                        <td>{rm.capacity} Beds</td>
                        <td>
                          <span className={`admin-badge ${rm.occupied === rm.capacity ? 'approved' : 'pending'}`}>
                            {rm.occupied} / {rm.capacity} Beds Occupied
                          </span>
                        </td>
                        <td style={{ fontSize: '0.8rem' }}>
                          {rm.roomNumber === '204' ? 'Rakesh Das (B1), Priya Patra (B2), Sneha Mohanty (B3)' : 'Resident students enrolled'}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="admin-action-btn-secondary"
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                            onClick={() => showToast(`Room ${rm.roomNumber} allocation details inspected.`)}
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COMPLAINTS */}
          {activeTab === 'complaints' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Resident Maintenance Complaints Desk</h2>
                  <p>Electrical, plumbing, internet, and carpentry tickets logged by hostel residents.</p>
                </div>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Student & Roll</th>
                      <th>Hostel & Room</th>
                      <th>Category</th>
                      <th>Issue Description</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map(c => (
                      <tr key={c.id}>
                        <td><strong>{c.id}</strong></td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{c.studentName}</div>
                          <small style={{ color: '#64748b' }}>Roll {c.rollNumber}</small>
                        </td>
                        <td>
                          <div>{c.hostel}</div>
                          <small style={{ color: '#7c3aed', fontWeight: 600 }}>Room {c.roomNumber}</small>
                        </td>
                        <td><span className="admin-badge active">{c.category}</span></td>
                        <td>{c.title}</td>
                        <td>
                          <span className={`admin-badge ${c.priority === 'High' ? 'rejected' : c.priority === 'Medium' ? 'pending' : 'active'}`}>
                            {c.priority}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-badge ${c.status === 'Resolved' ? 'approved' : c.status === 'In Progress' ? 'pending' : 'rejected'}`}>
                            {c.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <select
                            className="admin-select"
                            value={c.status}
                            onChange={e => handleUpdateComplaintStatus(c.id, e.target.value)}
                            style={{ fontSize: '0.75rem', padding: '2px 6px' }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: VISITORS */}
          {activeTab === 'visitors' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Hostel Visitor Gate Pass Register</h2>
                  <p>Real-time campus security log of visiting parents, guardians, and approved guests.</p>
                </div>
                <button className="admin-action-btn-primary" onClick={() => setIsVisitorModalOpen(true)}>
                  <Plus size={15} /> Log New Visitor
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Pass ID</th>
                      <th>Visitor Name & Relation</th>
                      <th>Visiting Resident</th>
                      <th>Time-In</th>
                      <th>Time-Out</th>
                      <th>Purpose</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.map(v => (
                      <tr key={v.id}>
                        <td><code>{v.passNumber}</code></td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{v.visitorName}</div>
                          <small style={{ color: '#64748b' }}>Relation: {v.relation}</small>
                        </td>
                        <td>
                          <div>{v.studentName}</div>
                          <small style={{ color: '#64748b' }}>Roll {v.rollNumber}</small>
                        </td>
                        <td>{v.inTime}</td>
                        <td>{v.outTime}</td>
                        <td>{v.purpose}</td>
                        <td>
                          <span className={`admin-badge ${v.outTime.includes('Pending') ? 'pending' : 'approved'}`}>
                            {v.outTime.includes('Pending') ? 'On Campus' : 'Departed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: REPORTS */}
          {activeTab === 'reports' && (
            <div>
              <div className="admin-view-header">
                <div>
                  <h2>Hostel Occupancy & Maintenance Gazettes</h2>
                  <p>Comprehensive accommodation returns for campus administrative records.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                <div className="admin-card">
                  <h3 className="admin-card-title">Hostel Occupancy Census Report</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 1rem 0' }}>
                    Bed-by-bed resident list across all 3 residences with emergency contact details.
                  </p>
                  <button className="admin-action-btn-primary" onClick={() => {
                    downloadHostelCensusPdf(hostels);
                    showToast('Generated and downloaded Hostel Occupancy Census PDF.');
                  }}>
                    <Download size={15} /> Download PDF Census
                  </button>
                </div>

                <div className="admin-card">
                  <h3 className="admin-card-title">Maintenance & Infrastructure Audit</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 1rem 0' }}>
                    Summary of resolution turnaround times for electrical and plumbing tickets.
                  </p>
                  <button className="admin-action-btn-primary" onClick={() => showToast('Exported Maintenance Audit to Excel.')}>
                    <Download size={15} /> Export Excel / CSV
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ISSUE VISITOR PASS */}
      {isVisitorModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>Issue Hostel Gate Visitor Pass</h3>
              <button className="admin-table-action-btn" onClick={() => setIsVisitorModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddVisitor}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Visitor Full Name</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={visitorForm.visitorName}
                      onChange={e => setVisitorForm({ ...visitorForm, visitorName: e.target.value })}
                      placeholder="e.g. Mr. Ramesh Das"
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Relationship</label>
                    <select
                      className="admin-form-select"
                      value={visitorForm.relation}
                      onChange={e => setVisitorForm({ ...visitorForm, relation: e.target.value })}
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Local Guardian">Local Guardian</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Resident Roll #</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={visitorForm.rollNumber}
                      onChange={e => setVisitorForm({ ...visitorForm, rollNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Resident Student Name</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={visitorForm.studentName}
                      onChange={e => setVisitorForm({ ...visitorForm, studentName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Purpose of Visit</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={visitorForm.purpose}
                    onChange={e => setVisitorForm({ ...visitorForm, purpose: e.target.value })}
                    placeholder="e.g. Delivering essential study materials"
                    required
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-btn-secondary" onClick={() => setIsVisitorModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn-primary">
                  Generate Visitor Gate Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
