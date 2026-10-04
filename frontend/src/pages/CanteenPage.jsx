import { useState } from 'react'
import { 
  Utensils, 
  Coffee, 
  QrCode, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  Flame, 
  CreditCard,
  ShoppingBag
} from 'lucide-react'
import './CanteenPage.css'

export default function CanteenPage() {
  const [balance, setBalance] = useState(1450)
  const [showTopupModal, setShowTopupModal] = useState(false)
  const [topupAmount, setTopupAmount] = useState('500')
  const [redeemedToken, setRedeemedToken] = useState(null)

  const handleOrder = (mealTitle, cost) => {
    if (balance < cost) {
      alert('Insufficient Canteen Wallet balance. Please top up.')
      return
    }
    setBalance(prev => prev - cost)
    setRedeemedToken({
      code: `MEAL-${Math.floor(100000 + Math.random() * 900000)}`,
      item: mealTitle,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  }

  const handleTopup = () => {
    setBalance(prev => prev + parseInt(topupAmount))
    setShowTopupModal(false)
  }

  return (
    <div className="canteen-page">
      <div className="canteen-header">
        <div>
          <h1 className="canteen-title">Hostel Mess & Smart Canteen Portal</h1>
          <p className="canteen-subtitle">Pre-order daily meals, redeem digital RFID tokens, and monitor nutrition balance</p>
        </div>
        <button className="btn-pay-now" onClick={() => setShowTopupModal(true)}>
          <PlusCircle size={18} />
          <span>Top Up Canteen Wallet</span>
        </button>
      </div>

      <div className="canteen-wallet-banner">
        <div>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            RFID Smart Card Balance
          </span>
          <div className="canteen-balance-box">
            <strong>₹{balance.toLocaleString('en-IN')}</strong>
          </div>
          <small style={{ color: '#cbd5e1' }}>Linked to Student ID: 2301289140 (Hostel Block C)</small>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600 }}>
            Hostel Mess Subscription: ACTIVE
          </span>
          <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#94a3b8' }}>
            Next billing renewal: 31 Oct 2026
          </div>
        </div>
      </div>

      {redeemedToken && (
        <div style={{ background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '14px', padding: '18px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#047857', fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Token Generated: {redeemedToken.item}</span>
            </div>
            <p style={{ margin: '4px 0 0', color: '#065f46', fontSize: '0.88rem' }}>
              Show this token at the Canteen Counter #2. Valid for 30 minutes.
            </p>
          </div>
          <div style={{ background: '#ffffff', padding: '10px 18px', borderRadius: '10px', textAlign: 'center', border: '1px dashed #059669' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>TOKEN PASSCODE</span>
            <strong style={{ fontSize: '1.25rem', color: '#065f46', letterSpacing: '2px', fontFamily: 'monospace' }}>
              {redeemedToken.code}
            </strong>
          </div>
        </div>
      )}

      <h3 style={{ fontSize: '1.2rem', margin: '0 0 16px', color: '#0a0f1e' }}>Today's Curated Mess & Canteen Menu</h3>
      <div className="canteen-menu-grid">
        <div className="canteen-meal-card">
          <div>
            <span className="canteen-meal-type breakfast">Breakfast (07:30 AM - 09:30 AM)</span>
            <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', color: '#0a0f1e' }}>Idli Vada & Masala Dosa Combo</h4>
            <ul className="canteen-items-list">
              <li>✓ Steamed Rice Idli (3 pcs) with Sambar</li>
              <li>✓ Crispy Medu Vada with Coconut Chutney</li>
              <li>✓ Filter Coffee or Milk Tea</li>
              <li style={{ color: '#d97706', fontSize: '0.8rem' }}><Flame size={12} /> 420 Calories | 12g Protein</li>
            </ul>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹45</span>
            <button className="btn-pay-now" style={{ padding: '6px 14px', fontSize: '0.82rem' }} onClick={() => handleOrder('Breakfast Combo', 45)}>
              Order Token
            </button>
          </div>
        </div>

        <div className="canteen-meal-card">
          <div>
            <span className="canteen-meal-type lunch">Special Lunch (12:30 PM - 02:45 PM)</span>
            <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', color: '#0a0f1e' }}>Odisha Special Thali (Deluxe)</h4>
            <ul className="canteen-items-list">
              <li>✓ Basmati Rice + Phulka Rotis (3 pcs)</li>
              <li>✓ Dal Fry + Paneer Butter Masala / Fish Curry</li>
              <li>✓ Seasonal Bhaja (Crispy Veg) + Sweet Curd</li>
              <li style={{ color: '#d97706', fontSize: '0.8rem' }}><Flame size={12} /> 680 Calories | 26g Protein</li>
            </ul>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹85</span>
            <button className="btn-pay-now" style={{ padding: '6px 14px', fontSize: '0.82rem' }} onClick={() => handleOrder('Deluxe Thali', 85)}>
              Order Token
            </button>
          </div>
        </div>

        <div className="canteen-meal-card">
          <div>
            <span className="canteen-meal-type dinner">Night Dinner (07:30 PM - 09:45 PM)</span>
            <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', color: '#0a0f1e' }}>Butter Naan & Chicken / Kadhai Veg</h4>
            <ul className="canteen-items-list">
              <li>✓ Fresh Butter Tandoori Naan (2 pcs)</li>
              <li>✓ Kadhai Chicken or Shahi Paneer Gravy</li>
              <li>✓ Jeera Rice + Mixed Green Salad + Gulab Jamun</li>
              <li style={{ color: '#d97706', fontSize: '0.8rem' }}><Flame size={12} /> 610 Calories | 24g Protein</li>
            </ul>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹95</span>
            <button className="btn-pay-now" style={{ padding: '6px 14px', fontSize: '0.82rem' }} onClick={() => handleOrder('Night Dinner Feast', 95)}>
              Order Token
            </button>
          </div>
        </div>
      </div>

      {showTopupModal && (
        <div className="payment-modal-backdrop" onClick={() => setShowTopupModal(false)}>
          <div className="payment-modal" onClick={e => e.stopPropagation()}>
            <button className="payment-modal-close" onClick={() => setShowTopupModal(false)}>×</button>
            <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem' }}>Recharge Canteen RFID Card</h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 16px' }}>Select amount to top up your food wallet instantly:</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              {['200', '500', '1000', '2000'].map((amt) => (
                <button
                  key={amt}
                  className={`notices-cat-btn ${topupAmount === amt ? 'active' : ''}`}
                  onClick={() => setTopupAmount(amt)}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <button className="btn-pay-now" style={{ width: '100%', justifyContent: 'center' }} onClick={handleTopup}>
              Add ₹{topupAmount} via UPI / Card
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
