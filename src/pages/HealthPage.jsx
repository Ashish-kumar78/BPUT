import { useState } from 'react'
import { 
  Heart, 
  Activity, 
  ShieldAlert, 
  PhoneCall, 
  CheckCircle2, 
  Calendar,
  AlertTriangle,
  FileHeart,
  Thermometer,
  Stethoscope
} from 'lucide-react'
import './HealthPage.css'

export default function HealthPage() {
  const [submittedCheckup, setSubmittedCheckup] = useState(false)

  return (
    <div className="health-page">
      <div className="health-header">
        <div>
          <h1 className="health-title">Campus Healthcare & Medical Profile</h1>
          <p className="health-subtitle">Emergency contact protocols, medical history, allergies, and dispensary records</p>
        </div>
        <button 
          className="btn-pay-now" 
          style={{ background: '#059669' }}
          onClick={() => {
            setSubmittedCheckup(true)
            setTimeout(() => setSubmittedCheckup(false), 3000)
          }}
        >
          <Stethoscope size={18} />
          <span>Book Dispensary Appointment</span>
        </button>
      </div>

      {submittedCheckup && (
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '14px 20px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={20} color="#059669" />
          <span>Appointment token generated! Dr. R. K. Mohapatra will attend you at Campus Health Clinic (Room 104) at 04:30 PM today.</span>
        </div>
      )}

      <div className="health-grid">
        <div className="health-card">
          <div className="health-card-header">
            <h3><Heart size={18} color="#e11d48" /> Vital Statistics</h3>
            <span style={{ fontSize: '0.78rem', background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>Normal</span>
          </div>
          <div className="health-info-row">
            <span className="label">Blood Group</span>
            <span className="value" style={{ color: '#dc2626' }}>O Positive (O+)</span>
          </div>
          <div className="health-info-row">
            <span className="label">Height & Weight</span>
            <span className="value">176 cm / 68 kg</span>
          </div>
          <div className="health-info-row">
            <span className="label">BMI Index</span>
            <span className="value">21.9 (Optimal Range)</span>
          </div>
          <div className="health-info-row">
            <span className="label">Resting Blood Pressure</span>
            <span className="value">118 / 78 mmHg</span>
          </div>
          <div className="health-info-row">
            <span className="label">COVID-19 Vaccination</span>
            <span className="value">Both Doses + Booster (Covishield)</span>
          </div>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <h3><AlertTriangle size={18} color="#f59e0b" /> Medical Warnings & Allergies</h3>
            <span style={{ fontSize: '0.78rem', background: '#fffbeb', color: '#d97706', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>Active Alert</span>
          </div>
          <div className="health-info-row">
            <span className="label">Known Drug Allergies</span>
            <span className="value" style={{ color: '#d97706' }}>Penicillin / Sulfa Drugs</span>
          </div>
          <div className="health-info-row">
            <span className="label">Dietary Intolerances</span>
            <span className="value">None (Lactose tolerant)</span>
          </div>
          <div className="health-info-row">
            <span className="label">Chronic Ailments</span>
            <span className="value">Mild seasonal bronchial asthma</span>
          </div>
          <div className="health-info-row">
            <span className="label">Prescribed Inhaler</span>
            <span className="value">Salbutamol 100mcg (Self-carry)</span>
          </div>
          <div className="health-info-row">
            <span className="label">Vision / Glasses</span>
            <span className="value">-1.25 D (Both eyes)</span>
          </div>
        </div>

        <div className="health-card">
          <div className="health-card-header">
            <h3><PhoneCall size={18} color="#2563eb" /> Emergency Protocol</h3>
            <span style={{ fontSize: '0.78rem', background: '#fef2f2', color: '#dc2626', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>24x7 Campus Line</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 10px' }}>
            In case of sudden acute medical emergency inside the campus hostel or academic block:
          </p>
          <div className="emergency-contact-box">
            <ShieldAlert size={28} color="#dc2626" />
            <div>
              <div style={{ fontSize: '0.78rem', color: '#991b1b', fontWeight: 600 }}>CAMPUS AMBULANCE DESK</div>
              <div className="emergency-phone">+91 674 256 9911</div>
            </div>
          </div>
          <div className="health-info-row" style={{ marginTop: '12px' }}>
            <span className="label">Designated Guardian</span>
            <span className="value">Sunil Sharma (Father)</span>
          </div>
          <div className="health-info-row">
            <span className="label">Guardian Emergency Phone</span>
            <span className="value">+91 98610 44219</span>
          </div>
        </div>
      </div>

      <div className="health-card">
        <div className="health-card-header">
          <h3><FileHeart size={18} color="#2563eb" /> Recent Campus Dispensary Visits</h3>
          <span style={{ fontSize: '0.84rem', color: '#64748b' }}>College Health Center</span>
        </div>
        <div className="fee-table-wrap">
          <table className="fee-table">
            <thead>
              <tr>
                <th>Consult Date</th>
                <th>Attending Doctor</th>
                <th>Chief Complaint / Symptoms</th>
                <th>Diagnosis & Advice</th>
                <th>Medication Issued</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>14 Aug 2026</td>
                <td>Dr. R. K. Mohapatra, MBBS</td>
                <td>Mild fever and throat congestion</td>
                <td>Acute viral pharyngitis, 3 days rest advised</td>
                <td>Paracetamol 650mg, Azithromycin</td>
              </tr>
              <tr>
                <td>02 May 2026</td>
                <td>Dr. Sunita Ray, MD</td>
                <td>Routine Annual Physical & Fitness Exam</td>
                <td>Declared physically fit for sports & lab activities</td>
                <td>Multivitamin supplements</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
