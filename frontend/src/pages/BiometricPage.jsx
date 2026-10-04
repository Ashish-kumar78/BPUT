import { useState } from 'react'
import { 
  Fingerprint, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  ArrowRightCircle, 
  ArrowLeftCircle,
  Filter,
  CheckCircle2
} from 'lucide-react'
import './BiometricPage.css'

const punchLogs = [
  { id: 1, date: '02 Oct 2026', time: '08:42 AM', point: 'Campus Main Gate (Turnstile 02)', mode: 'RFID Tap', direction: 'IN', status: 'Authorized' },
  { id: 2, date: '02 Oct 2026', time: '09:05 AM', point: 'Academic Block 3 - CSE Wing', mode: 'Fingerprint', direction: 'IN', status: 'Authorized' },
  { id: 3, date: '02 Oct 2026', time: '01:15 PM', point: 'Central Canteen Turnstile', mode: 'Facial Rec.', direction: 'IN', status: 'Authorized' },
  { id: 4, date: '02 Oct 2026', time: '01:50 PM', point: 'Central Library Turnstile', mode: 'RFID Tap', direction: 'IN', status: 'Authorized' },
  { id: 5, date: '02 Oct 2026', time: '05:20 PM', point: 'Campus Main Gate (Turnstile 01)', mode: 'RFID Tap', direction: 'OUT', status: 'Authorized' },
  { id: 6, date: '02 Oct 2026', time: '07:45 PM', point: 'Hostel Block C Entry Turnstile', mode: 'Fingerprint', direction: 'IN', status: 'In before curfew' },
  { id: 7, date: '01 Oct 2026', time: '08:50 AM', point: 'Campus Main Gate', mode: 'RFID Tap', direction: 'IN', status: 'Authorized' },
  { id: 8, date: '01 Oct 2026', time: '05:10 PM', point: 'Campus Main Gate', mode: 'RFID Tap', direction: 'OUT', status: 'Authorized' },
]

export default function BiometricPage() {
  const [filterDirection, setFilterDirection] = useState('ALL')

  const filteredLogs = punchLogs.filter(p => {
    if (filterDirection === 'ALL') return true
    return p.direction === filterDirection
  })

  return (
    <div className="biometric-page">
      <div className="biometric-header">
        <div>
          <h1 className="biometric-title">Campus Turnstile & Biometric Logs</h1>
          <p className="biometric-subtitle">Real-time smart sensor checkpoints, gate passes, and entry/exit verification logs</p>
        </div>
      </div>

      <div className="biometric-status-bar">
        <div className="bio-indicator">
          <div className="bio-dot" />
          <div className="bio-status-text">
            <strong>Current Campus Location: Hostel Block C (Room 204)</strong>
            <small>Last scanned: 02 Oct 2026 at 07:45 PM via Fingerprint Sensor #4</small>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#047857', background: '#ecfdf5', padding: '6px 14px', borderRadius: '20px', fontSize: '0.84rem', fontWeight: 600 }}>
          <ShieldCheck size={16} /> Campus Curfew Compliant (8:30 PM cutoff)
        </div>
      </div>

      <div className="bio-grid">
        <div className="bio-card">
          <div className="bio-card-title">Campus Presence Today</div>
          <div className="bio-card-val">8h 38m</div>
          <div className="bio-card-sub">From 08:42 AM to 05:20 PM</div>
        </div>
        <div className="bio-card">
          <div className="bio-card-title">Biometric Credential</div>
          <div className="bio-card-val">Active (Sync OK)</div>
          <div className="bio-card-sub">Template #FP-99410 registered</div>
        </div>
        <div className="bio-card">
          <div className="bio-card-title">Hostel Night Curfew Status</div>
          <div className="bio-card-val" style={{ color: '#059669' }}>Present (On-Time)</div>
          <div className="bio-card-sub">Check-in at 07:45 PM</div>
        </div>
        <div className="bio-card">
          <div className="bio-card-title">RFID Card Health</div>
          <div className="bio-card-val">100% Signal</div>
          <div className="bio-card-sub">No reader collision warnings</div>
        </div>
      </div>

      <div className="health-card">
        <div className="health-card-header">
          <h3><Fingerprint size={18} color="#2563eb" /> Security Turnstile Access History</h3>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'IN', 'OUT'].map((dir) => (
              <button
                key={dir}
                className={`notices-cat-btn ${filterDirection === dir ? 'active' : ''}`}
                style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                onClick={() => setFilterDirection(dir)}
              >
                {dir === 'ALL' ? 'All Movements' : dir === 'IN' ? 'Gate IN' : 'Gate OUT'}
              </button>
            ))}
          </div>
        </div>

        <div className="fee-table-wrap">
          <table className="bio-log-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Access Checkpoint Location</th>
                <th>Authentication Mechanism</th>
                <th>Movement</th>
                <th>Security System Verdict</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <strong>{log.date}</strong> <span style={{ color: '#64748b', fontSize: '0.8rem' }}>at {log.time}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} color="#64748b" />
                      <span>{log.point}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px' }}>
                      {log.mode}
                    </span>
                  </td>
                  <td>
                    <span className={`bio-badge ${log.direction.toLowerCase()}`}>
                      {log.direction === 'IN' ? <ArrowRightCircle size={12} /> : <ArrowLeftCircle size={12} />}
                      {log.direction}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: '#047857', fontWeight: 600, fontSize: '0.82rem' }}>
                      ✓ {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
