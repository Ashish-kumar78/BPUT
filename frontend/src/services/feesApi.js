// Fee Payment Proof & Verification API Handler with Live Endpoint Calling and Initial Mock Fallback

import { api } from './api'

// Mock In-Memory Storage for dynamic testing when backend is offline
let mockPaymentProofs = [
  {
    id: 'PAY-8821',
    studentName: 'Ashish Kumar',
    rollNumber: '2305201037',
    department: 'Computer Science & Engineering',
    amount: 20000,
    paymentDate: '2026-10-05',
    paymentMethod: 'UPI',
    transactionId: 'UPI9842109238',
    referenceNumber: 'REF-2026-0912',
    remarks: 'Semester 7 tuition fee partial payment',
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    fileName: 'upi_screenshot_sem7.jpg',
    fileType: 'image/jpeg',
    status: 'PENDING',
    submittedAt: '2026-10-05T09:30:00Z',
    rejectionReason: null,
    ocrMatch: { txnMatch: 'EXACT', amountMatch: 'EXACT', confidence: 98 }
  },
  {
    id: 'PAY-8819',
    studentName: 'Rahul Sharma',
    rollNumber: '2305201038',
    department: 'Computer Science & Engineering',
    amount: 15000,
    paymentDate: '2026-10-05',
    paymentMethod: 'Bank Transfer',
    transactionId: 'HDFC00019284',
    referenceNumber: 'TXN-98124',
    remarks: 'Hostel and Mess fee installment',
    proofUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    fileName: 'bank_ack_receipt.pdf',
    fileType: 'application/pdf',
    status: 'APPROVED',
    submittedAt: '2026-10-04T14:15:00Z',
    verifiedBy: 'Accounts Officer (Subhashree Jena)',
    verifiedAt: '2026-10-04T16:00:00Z',
    rejectionReason: null,
    ocrMatch: { txnMatch: 'EXACT', amountMatch: 'EXACT', confidence: 99 }
  },
  {
    id: 'PAY-8815',
    studentName: 'Amit Verma',
    rollNumber: '2305201039',
    department: 'Mechanical Engineering',
    amount: 10000,
    paymentDate: '2026-10-04',
    paymentMethod: 'NEFT',
    transactionId: 'NEFT77123984',
    referenceNumber: 'REF-7712',
    remarks: 'Library & Exam Fee',
    proofUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
    fileName: 'blurry_slip.jpg',
    fileType: 'image/jpeg',
    status: 'REJECTED',
    submittedAt: '2026-10-04T11:00:00Z',
    verifiedBy: 'Accounts Officer (Subhashree Jena)',
    verifiedAt: '2026-10-04T12:30:00Z',
    rejectionReason: 'Transaction ID could not be verified in bank statement log.',
    ocrMatch: { txnMatch: 'MISMATCH', amountMatch: 'EXACT', confidence: 45 }
  }
];

export const feesApi = {
  // 1. Fetch Fee Statement & Payment History for Student
  getFeeStatement: async (rollNumber = '2305201001') => {
    try {
      const res = await api.getFeeStatement(rollNumber);
      if (res && res.success) return res.data;
    } catch {
      // Fallback mock payload
    }
    const studentHistory = mockPaymentProofs.filter(
      (item) => item.rollNumber === rollNumber || item.rollNumber === '2305201037' || item.rollNumber === '2305201001'
    );
    return {
      studentName: 'Rakesh Das',
      rollNumber: '2305201001',
      department: 'Computer Science & Engineering',
      totalFee: 89000,
      scholarship: 15000,
      paidAmount: 62000,
      pendingAmount: 12000,
      currentSemester: 'Semester 7 (4th Year)',
      paymentHistory: studentHistory
    };
  },

  // 2. Upload Fee Payment Proof
  uploadPaymentProof: async (payload) => {
    try {
      const res = await fetch('http://localhost:4000/api/fees/payment-proof', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('collegeflow_token') || ''}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data && data.success) return data;
    } catch {
      // Fallback mock behavior
    }

    const newProof = {
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: payload.studentName || 'Rakesh Das',
      rollNumber: payload.rollNumber || '2305201001',
      department: payload.department || 'Computer Science & Engineering',
      amount: Number(payload.amount),
      paymentDate: payload.paymentDate,
      paymentMethod: payload.paymentMethod,
      transactionId: payload.transactionId,
      referenceNumber: payload.referenceNumber || `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      remarks: payload.remarks || '',
      proofUrl: payload.previewUrl || payload.fileUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      fileName: payload.fileName || 'payment_proof.jpg',
      fileType: payload.fileType || 'image/jpeg',
      status: 'PENDING',
      submittedAt: new Date().toISOString(),
      rejectionReason: null,
      ocrMatch: { txnMatch: 'VERIFYING', amountMatch: 'MATCH', confidence: 95 }
    };

    mockPaymentProofs.unshift(newProof);
    return {
      success: true,
      message: 'Payment proof submitted successfully for verification!',
      data: newProof
    };
  },

  // 3. Fetch All Pending/Reviewed Payment Proofs for Accounts Verification Dashboard
  getPaymentVerifications: async (statusFilter = 'ALL', search = '') => {
    try {
      const res = await fetch(`http://localhost:4000/api/accounts/payment-verifications?status=${statusFilter}&search=${encodeURIComponent(search)}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('collegeflow_token') || ''}` }
      });
      const data = await res.json();
      if (data && data.success) return data.data;
    } catch {
      // Fallback mock filtering
    }

    let filtered = [...mockPaymentProofs];
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.studentName.toLowerCase().includes(q) ||
          item.rollNumber.toLowerCase().includes(q) ||
          item.transactionId.toLowerCase().includes(q)
      );
    }
    return filtered;
  },

  // 4. Approve Payment Verification (Accounts Section)
  approvePayment: async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/accounts/payment-verifications/${id}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('collegeflow_token') || ''}` }
      });
      const data = await res.json();
      if (data && data.success) return data;
    } catch {
      // Fallback mock update
    }

    mockPaymentProofs = mockPaymentProofs.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: 'APPROVED',
          verifiedBy: 'Accounts Officer (Subhashree Jena)',
          verifiedAt: new Date().toISOString(),
          rejectionReason: null
        };
      }
      return item;
    });

    return {
      success: true,
      message: 'Payment verified and approved! Student fee ledger updated.'
    };
  },

  // 5. Reject Payment Verification (Accounts Section)
  rejectPayment: async (id, rejectionReason) => {
    try {
      const res = await fetch(`http://localhost:4000/api/accounts/payment-verifications/${id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('collegeflow_token') || ''}`
        },
        body: JSON.stringify({ rejectionReason })
      });
      const data = await res.json();
      if (data && data.success) return data;
    } catch {
      // Fallback mock update
    }

    mockPaymentProofs = mockPaymentProofs.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: 'REJECTED',
          verifiedBy: 'Accounts Officer (Subhashree Jena)',
          verifiedAt: new Date().toISOString(),
          rejectionReason: rejectionReason || 'Transaction proof could not be validated.'
        };
      }
      return item;
    });

    return {
      success: true,
      message: 'Payment rejected. Reason sent to student.'
    };
  }
};
