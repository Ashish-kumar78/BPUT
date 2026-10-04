import React, { useState } from 'react';
import {
  Home,
  Bed,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Phone,
  Plus,
  Send,
  X
} from 'lucide-react';
import './StudentHostelPage.css';
import { initialStudentHostelDetail, initialHostelComplaints } from '../data/collegeData.js';

export default function StudentHostelPage() {
  const [hostelDetail] = useState(initialStudentHostelDetail);
  const [complaints, setComplaints] = useState(initialHostelComplaints.filter(c => c.rollNumber === '01'));
  const [isLodgeModalOpen, setIsLodgeModalOpen] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    category: 'Electrical',
    title: '',
    priority: 'Medium'
  });

  const handleLodgeComplaint = (e) => {
    e.preventDefault();
    if (!complaintForm.title.trim()) return;

    const newTicket = {
      id: `CMP-${Math.floor(250 + Math.random() * 250)}`,
      studentName: 'Ananya Das',
      rollNumber: '01',
      hostel: hostelDetail.hostelName,
      roomNumber: hostelDetail.roomNumber,
      category: complaintForm.category,
      title: complaintForm.title,
      priority: complaintForm.priority,
      status: 'Pending',
      filedDate: 'Today, Just now',
      resolutionNotes: 'Assigned to resident warden for contractor scheduling.'
    };

    setComplaints(prev => [newTicket, ...prev]);
    setIsLodgeModalOpen(false);
    setComplaintForm({ category: 'Electrical', title: '', priority: 'Medium' });
    alert('Hostel maintenance ticket lodged successfully! The warden has been notified.');
  };

  return (
    <div className="student-hostel-page">
      {/* Header */}
      <div className="student-hostel-header">
        <div>
          <h1>My Hostel Residence & Accommodation</h1>
          <p>Room allocation, roommates, hostel guidelines, and 24/7 maintenance desk</p>
        </div>
        <button
          className="admin-action-btn-primary"
          style={{ background: '#7c3aed' }}
          onClick={() => setIsLodgeModalOpen(true)}
        >
          <Plus size={15} /> Lodge Maintenance Request
        </button>
      </div>

      {/* Info Cards */}
      <div className="hostel-info-grid">
        <div className="hostel-info-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Allocated Room
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>
            Room {hostelDetail.roomNumber}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            {hostelDetail.bedNumber} · {hostelDetail.floor}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, marginTop: '0.25rem' }}>
            ✓ AC Triple Deluxe Accommodation
          </div>
        </div>

        <div className="hostel-info-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Residence Complex
          </span>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
            {hostelDetail.hostelName}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Resident Warden: <strong>{hostelDetail.wardenName}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#2563eb', marginTop: '0.25rem' }}>
            <Phone size={13} /> {hostelDetail.wardenContact}
          </div>
        </div>

        <div className="hostel-info-card">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Hostel Fee Status
          </span>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#059669' }}>
            Partially Paid
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            ₹20,000 Paid · ₹12,000 Balance Due
          </div>
          <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600, marginTop: '0.25rem' }}>
            Mess Clearance: Active
          </div>
        </div>
      </div>

      {/* Roommates & Rules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Roommates */}
        <div className="hostel-info-card" style={{ gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Room 204 Roommates</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {hostelDetail.roommates.map((mate, idx) => (
              <div key={idx} className="roommate-card">
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#7c3aed', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700 }}>
                  {mate.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>{mate.name}</div>
                  <small style={{ color: '#64748b' }}>Roll {mate.roll} · {mate.branch} · {mate.bed}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hostel Rules */}
        <div className="hostel-info-card" style={{ gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Hostel Regulations & Code of Conduct</h3>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#475569' }}>
            {hostelDetail.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* My Maintenance Complaints */}
      <div className="hostel-info-card" style={{ gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>My Maintenance Complaints</h3>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{complaints.length} tickets recorded</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {complaints.map(c => (
            <div key={c.id} className="complaint-item">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{c.title}</strong>
                  <span className={`admin-badge ${c.priority === 'High' ? 'rejected' : 'pending'}`}>{c.priority}</span>
                  <span className="admin-badge active">{c.category}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Ticket: <code>{c.id}</code> · Filed: {c.filedDate} · {c.resolutionNotes}
                </div>
              </div>
              <span className={`admin-badge ${c.status === 'Resolved' ? 'approved' : c.status === 'In Progress' ? 'pending' : 'rejected'}`}>
                {c.status}
              </span>
            </div>
          ))}
          {complaints.length === 0 && (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: '#64748b', fontSize: '0.85rem' }}>
              No active maintenance complaints recorded.
            </div>
          )}
        </div>
      </div>

      {/* MODAL: LODGE COMPLAINT */}
      {isLodgeModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>Lodge Hostel Maintenance Request</h3>
              <button className="admin-table-action-btn" onClick={() => setIsLodgeModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleLodgeComplaint}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Category</label>
                    <select
                      className="admin-form-select"
                      value={complaintForm.category}
                      onChange={e => setComplaintForm({ ...complaintForm, category: e.target.value })}
                    >
                      <option value="Electrical">Electrical (Fan, Light, Switch)</option>
                      <option value="Plumbing">Plumbing (Tap, Shower, Geyser)</option>
                      <option value="Internet / Wi-Fi">Internet / Wi-Fi</option>
                      <option value="Carpentry">Carpentry (Bed, Table, Almirah)</option>
                      <option value="Housekeeping">Housekeeping & Cleaning</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Priority</label>
                    <select
                      className="admin-form-select"
                      value={complaintForm.priority}
                      onChange={e => setComplaintForm({ ...complaintForm, priority: e.target.value })}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High (Urgent)</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Describe the Issue</label>
                  <textarea
                    rows={4}
                    className="admin-form-input"
                    value={complaintForm.title}
                    onChange={e => setComplaintForm({ ...complaintForm, title: e.target.value })}
                    placeholder="e.g. The ceiling fan regulator in Room 204 is sparking when switched to speed 5."
                    required
                  />
                  <small style={{ color: '#64748b' }}>Warden and campus facilities team will inspect within 24 hours.</small>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-action-btn-secondary" onClick={() => setIsLodgeModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn-primary" style={{ background: '#7c3aed' }}>
                  Submit Maintenance Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
