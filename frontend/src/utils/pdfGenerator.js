import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Safe constructor helper for both ESM and CJS bundling contexts
function createPdfDoc(options) {
  const Constructor = typeof jsPDF === 'function' 
    ? jsPDF 
    : (jsPDF?.jsPDF || (typeof window !== 'undefined' && window.jspdf?.jsPDF) || jsPDF?.default);
  return new Constructor(options);
}

// Safe autoTable runner helper
function renderTable(doc, tableOptions) {
  const runner = typeof autoTable === 'function' ? autoTable : (autoTable?.default || doc.autoTable);
  if (typeof runner === 'function') {
    runner(doc, tableOptions);
  } else if (doc.autoTable) {
    doc.autoTable(tableOptions);
  }
}

// Institutional branding colors
const PRIMARY_COLOR = [15, 43, 72];    // Deep Navy
const SECONDARY_COLOR = [220, 38, 38]; // Crimson Red
const ACCENT_COLOR = [2, 132, 199];    // Sky Blue
const TEXT_DARK = [15, 23, 42];        // Slate 900
const TEXT_MUTED = [100, 116, 139];    // Slate 500

/**
 * Draws standard institutional header on PDF document
 */
function addInstitutionalHeader(doc, docTitle, subTitle = '') {
  // Top decorative bar
  doc.setFillColor(...PRIMARY_COLOR);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 26, 'F');
  
  // Crimson accent strip
  doc.setFillColor(...SECONDARY_COLOR);
  doc.rect(0, 26, doc.internal.pageSize.getWidth(), 2, 'F');

  // Institution title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('GANDHI INSTITUTE FOR TECHNOLOGY (GIFT AUTONOMOUS)', 14, 11);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  doc.text('Affiliated to BPUT, Rourkela, Odisha | Approved by AICTE, New Delhi | NAAC "A" Grade Accredited', 14, 17);
  doc.text('Bhubaneswar, Odisha - 752054 | www.gift.edu.in | ERP Academic System', 14, 22);

  // Document title header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(docTitle.toUpperCase(), 14, 38);

  if (subTitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(subTitle, 14, 44);
  }

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, 48, doc.internal.pageSize.getWidth() - 14, 48);
}

/**
 * Adds official institutional footer with verification watermark
 */
function addInstitutionalFooter(doc, pageNumber = 1, totalPages = 1) {
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, pageHeight - 16, pageWidth - 14, pageHeight - 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('This is a computer-generated official academic document authenticated via BPUT ERP Gateway.', 14, pageHeight - 10);
  doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 14, pageHeight - 6);

  doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - 14, pageHeight - 10, { align: 'right' });
  doc.text('Authorized Academic Office Signature', pageWidth - 14, pageHeight - 6, { align: 'right' });
}

/**
 * Draws an official verification stamp / seal box
 */
function drawOfficialSeal(doc, x, y, title = 'BPUT AUTONOMOUS') {
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.setLineWidth(1);
  doc.roundedRect(x, y, 46, 20, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(title, x + 23, y + 6, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...SECONDARY_COLOR);
  doc.text('OFFICIALLY VERIFIED', x + 23, y + 11, { align: 'center' });

  doc.setFontSize(6);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(new Date().toLocaleDateString('en-IN'), x + 23, y + 16, { align: 'center' });
}

// -------------------------------------------------------------
// 1. Digital Student ID Card Pass PDF
// -------------------------------------------------------------
export function downloadIdCardPdf(studentData = {}) {
  const doc = createPdfDoc({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  addInstitutionalHeader(doc, 'Digital Campus Identity Pass', 'Secure Student RFID & Examination Authorization Credential');

  const student = {
    name: studentData.name || 'Aarav Sharma',
    rollNo: studentData.rollNo || studentData.rollNumber || '2301289140',
    course: studentData.course || 'B.Tech',
    branch: studentData.branch || 'Computer Science & Engineering',
    semester: studentData.semester || '7th Semester',
    bloodGroup: studentData.bloodGroup || 'O+',
    rfidTag: studentData.rfidTag || 'RF-882194',
    hostel: studentData.hostel || 'Block C - Room 204',
    validity: '2023 - 2027',
    contact: studentData.contact || '+91 98765 43210'
  };

  // Card Outer Container (Badge format)
  const cardX = 25;
  const cardY = 56;
  const cardW = 160;
  const cardH = 96;

  // Badge background card with shadow style border
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.setLineWidth(1.5);
  doc.roundedRect(cardX, cardY, cardW, cardH, 4, 4, 'FD');

  // Top badge ribbon
  doc.setFillColor(...PRIMARY_COLOR);
  doc.roundedRect(cardX, cardY, cardW, 20, 4, 4, 'F');
  doc.rect(cardX, cardY + 16, cardW, 4, 'F'); // square bottom edges of ribbon

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('GIFT AUTONOMOUS COLLEGE, BHUBANESWAR', cardX + 8, cardY + 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(226, 232, 240);
  doc.text('Affiliated to BPUT, Odisha | NAAC "A" Grade Accredited', cardX + 8, cardY + 14);

  // Validity pill in top right
  doc.setFillColor(30, 58, 138);
  doc.roundedRect(cardX + cardW - 38, cardY + 5, 32, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text(`VALID: ${student.validity}`, cardX + cardW - 22, cardY + 11.5, { align: 'center' });

  // Photo Box
  const photoX = cardX + 10;
  const photoY = cardY + 28;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.8);
  doc.roundedRect(photoX, photoY, 32, 40, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('STUDENT', photoX + 16, photoY + 18, { align: 'center' });
  doc.text('PHOTO', photoX + 16, photoY + 24, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('DIGITAL PASS', photoX + 16, photoY + 30, { align: 'center' });

  // Student Details inside Badge
  const infoX = photoX + 38;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(student.name, infoX, photoY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...SECONDARY_COLOR);
  doc.text(`REG NO / ROLL: ${student.rollNo}`, infoX, photoY + 12);

  // Two column grid for details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_DARK);

  const leftX = infoX;
  const rightX = infoX + 54;
  let currY = photoY + 19;

  doc.text(`Program: ${student.course}`, leftX, currY);
  doc.text(`Semester: ${student.semester}`, rightX, currY);
  currY += 6;
  doc.text(`Branch: ${student.branch}`, leftX, currY);
  doc.text(`Blood Group: ${student.bloodGroup}`, rightX, currY);
  currY += 6;
  doc.text(`RFID Chip: ${student.rfidTag}`, leftX, currY);
  doc.text(`Hostel: ${student.hostel}`, rightX, currY);
  currY += 6;
  doc.text(`Emergency: ${student.contact}`, leftX, currY);
  doc.text(`Library UID: LIB-${student.rollNo}`, rightX, currY);

  // Bottom card strip with Barcode simulation and QR code mock
  doc.setFillColor(241, 245, 249);
  doc.rect(cardX + 1, cardY + cardH - 22, cardW - 2, 21, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(cardX, cardY + cardH - 22, cardX + cardW, cardY + cardH - 22);

  // Simulated Barcode
  doc.setFont('courier', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...TEXT_DARK);
  doc.text('||| | |||| || ||| | ||| || ||| ||||', cardX + 10, cardY + cardH - 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(`CODE-128: ${student.rollNo}-BPUT-AUTH`, cardX + 10, cardY + cardH - 5);

  // QR Code Mock block
  const qrX = cardX + cardW - 32;
  const qrY = cardY + cardH - 20;
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.setLineWidth(0.5);
  doc.setFillColor(255, 255, 255);
  doc.rect(qrX, qrY, 18, 18, 'FD');
  doc.setFont('courier', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('[QR]', qrX + 9, qrY + 10, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(37, 99, 235);
  doc.text('CHIP ACTIVE', cardX + cardW - 12, qrY + 8, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Registrar / Principal', cardX + cardW - 12, qrY + 14, { align: 'right' });

  // Instructions below the badge
  const instY = cardY + cardH + 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('TERMS OF USAGE & CAMPUS RULES', 14, instY);

  const instructions = [
    '1. This digital identity pass is recognized across GIFT Autonomous turnstiles, libraries, and mess facilities.',
    '2. For University End-Semester Examinations, students must present this document or smart badge.',
    '3. Transfer or duplication of this smart pass is strictly prohibited under BPUT Disciplinary By-laws.',
    '4. In case of lost credentials, contact Student Affairs or email: support@gift.edu.in immediately.'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_DARK);
  instructions.forEach((line, idx) => {
    doc.text(line, 14, instY + 6 + (idx * 5));
  });

  drawOfficialSeal(doc, 150, instY + 6, 'BPUT AUTONOMOUS');
  addInstitutionalFooter(doc, 1, 1);

  doc.save(`Student_ID_Pass_${student.rollNo}.pdf`);
}

// -------------------------------------------------------------
// 2. Official College Fee Receipt PDF
// -------------------------------------------------------------
export function downloadFeeReceiptPdf(receipt = {}, studentInfo = {}) {
  const doc = createPdfDoc({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addInstitutionalHeader(doc, 'Official Accounts Fee Receipt', 'Student Copy & University Autonomous Enrollment Clearance');

  const receiptNo = receipt.receiptNo || receipt.id || 'TXN-98421';
  const amount = Number(receipt.amount || receipt.paid || 48500);
  const head = receipt.head || 'Tuition & Development Fee';
  const mode = receipt.mode || 'Net Banking (HDFC)';
  const date = receipt.date || new Date().toLocaleDateString('en-IN');
  const studentName = receipt.studentName || studentInfo.name || 'Aarav Sharma';
  const rollNumber = receipt.rollNumber || studentInfo.rollNumber || studentInfo.rollNo || '2301289140';

  // Receipt voucher summary box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 52, doc.internal.pageSize.getWidth() - 28, 30, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(`RECEIPT NO: ${receiptNo}`, 20, 60);
  doc.text(`DATE: ${date}`, 130, 60);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT_DARK);
  doc.text(`Student Name: ${studentName}`, 20, 68);
  doc.text(`Registration No: ${rollNumber}`, 130, 68);
  doc.text(`Course: B.Tech (Computer Science & Engineering)`, 20, 75);
  doc.text(`Academic Session: 2026-27 | 7th Semester`, 130, 75);

  // Fee table breakdown
  const tableData = [
    ['1', head, `₹${amount.toLocaleString('en-IN')}`, 'Cleared (100%)'],
    ['2', 'Autonomous Examination & Assessment Fee', 'Included', 'Cleared'],
    ['3', 'Digital ERP & Library Access Services', 'Included', 'Cleared'],
    ['4', 'Campus Infrastructure & Laboratory Caution', 'Included', 'Cleared']
  ];

  renderTable(doc, {
    startY: 88,
    head: [['Sl. No', 'Fee Head Description', 'Amount Paid (INR)', 'Payment Status']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    bodyStyles: {
      fontSize: 8,
      textColor: TEXT_DARK
    },
    columnStyles: {
      0: { cellWidth: 16, halign: 'center' },
      1: { cellWidth: 100 },
      2: { cellWidth: 38, halign: 'right' },
      3: { cellWidth: 28, halign: 'center' }
    }
  });

  const finalY = doc.lastAutoTable.finalY + 8;

  // Total summary row
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, finalY, doc.internal.pageSize.getWidth() - 28, 18, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('TOTAL RECEIVED:', 20, finalY + 11);
  doc.setFontSize(13);
  doc.setTextColor(5, 150, 105);
  doc.text(`INR ₹${amount.toLocaleString('en-IN')}`, 145, finalY + 12);

  // Mode and verification notes
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(`Payment Instrument: ${mode} | Transaction Ref: TXN-${Math.floor(100000 + Math.random() * 900000)}`, 14, finalY + 26);
  doc.text('Amount in words: Indian Rupees Only. Valid for semester examination clearance.', 14, finalY + 31);

  // Seal & Signature
  drawOfficialSeal(doc, 14, finalY + 40, 'ACCOUNTS DEPT');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('Finance & Accounts Officer', 145, finalY + 54);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('GIFT Autonomous College, Bhubaneswar', 145, finalY + 58);

  addInstitutionalFooter(doc, 1, 1);

  doc.save(`Fee_Receipt_${receiptNo}.pdf`);
}

// -------------------------------------------------------------
// 3. Examination Grade Card / Marksheet PDF
// -------------------------------------------------------------
export function downloadGradeCardPdf(examData = {}, studentInfo = {}) {
  const doc = createPdfDoc({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addInstitutionalHeader(doc, 'Semester Grade Card & Academic Marksheet', 'Autonomous Examination Branch • BPUT Rourkela');

  const rollNo = studentInfo.rollNo || studentInfo.rollNumber || '2301289140';
  const name = studentInfo.name || 'Aarav Sharma';
  const semester = examData.semester || '5th Semester';
  const sgpa = examData.sgpa || '8.64';
  const result = examData.result || 'PASSED';

  // Candidate Details Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 52, doc.internal.pageSize.getWidth() - 28, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(`NAME: ${name.toUpperCase()}`, 20, 60);
  doc.text(`REG NO: ${rollNo}`, 125, 60);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_DARK);
  doc.text('Program: Bachelor of Technology (B.Tech)', 20, 67);
  doc.text('Discipline: Computer Science & Engineering', 125, 67);
  doc.text(`Examination: ${semester} Regular Examination 2025-26`, 20, 73);
  doc.text('College Code: 204 (GIFT Autonomous)', 125, 73);

  // Subject rows
  const subjects = examData.subjects || [
    { code: 'CS501', name: 'Artificial Intelligence', credits: 4, internal: 18, external: 72, total: 90, grade: 'O', points: 10 },
    { code: 'CS502', name: 'Machine Learning', credits: 4, internal: 19, external: 68, total: 87, grade: 'A+', points: 9 },
    { code: 'CS503', name: 'Cloud Computing & DevOps', credits: 3, internal: 17, external: 65, total: 82, grade: 'A', points: 8.5 },
    { code: 'CS504', name: 'Compiler Design', credits: 3, internal: 16, external: 64, total: 80, grade: 'A', points: 8.5 },
    { code: 'CS511', name: 'AI & Data Science Laboratory', credits: 2, internal: 20, external: 75, total: 95, grade: 'O', points: 10 },
    { code: 'CS512', name: 'Cloud Infrastructure Lab', credits: 2, internal: 19, external: 71, total: 90, grade: 'O', points: 10 }
  ];

  const body = subjects.map((sub, idx) => [
    idx + 1,
    sub.code,
    sub.name,
    sub.credits || 3,
    sub.internal,
    sub.external,
    sub.total,
    sub.grade,
    sub.points
  ]);

  renderTable(doc, {
    startY: 83,
    head: [['#', 'Code', 'Course / Subject Title', 'Credits', 'Int (20)', 'Ext (80)', 'Total (100)', 'Grade', 'Points']],
    body: body,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: TEXT_DARK
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 20, fontStyle: 'bold' },
      2: { cellWidth: 70 },
      3: { cellWidth: 16, halign: 'center' },
      4: { cellWidth: 16, halign: 'center' },
      5: { cellWidth: 16, halign: 'center' },
      6: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
      7: { cellWidth: 16, halign: 'center', fontStyle: 'bold' },
      8: { cellWidth: 16, halign: 'center' }
    }
  });

  const finalY = doc.lastAutoTable.finalY + 8;

  // Performance Summary Card
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, finalY, doc.internal.pageSize.getWidth() - 28, 22, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('SEMESTER SGPA:', 20, finalY + 9);
  doc.setFontSize(14);
  doc.setTextColor(37, 99, 235);
  doc.text(String(sgpa), 60, finalY + 10);

  doc.setFontSize(9);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('CUMULATIVE CGPA:', 95, finalY + 9);
  doc.setFontSize(14);
  doc.setTextColor(5, 150, 105);
  doc.text('8.42', 140, finalY + 10);

  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(`RESULT STATUS: ${result.toUpperCase()}`, 20, finalY + 18);
  doc.text('TOTAL CREDITS EARNED: 18', 95, finalY + 18);

  // Signature Blocks
  const sigY = finalY + 32;
  drawOfficialSeal(doc, 14, sigY, 'EXAM BRANCH');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('Controller of Examinations', 135, sigY + 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Biju Patnaik University of Technology (BPUT)', 135, sigY + 18);

  addInstitutionalFooter(doc, 1, 1);

  doc.save(`Grade_Card_${semester.replace(/\s+/g, '_')}_${rollNo}.pdf`);
}

// -------------------------------------------------------------
// 3b. Examination Admit Card / Hall Ticket PDF
// -------------------------------------------------------------
export function downloadAdmitCardPdf(schedule = [], studentInfo = {}) {
  const doc = createPdfDoc({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addInstitutionalHeader(doc, 'Examination Admit Card & Hall Ticket', 'BPUT Autonomous Examination Branch • Internal Assessment & Midterms');

  const rollNo = studentInfo.rollNo || studentInfo.rollNumber || '2301289140';
  const name = studentInfo.name || 'Aarav Sharma';

  // Candidate Details Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 52, doc.internal.pageSize.getWidth() - 28, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(`CANDIDATE: ${name.toUpperCase()}`, 20, 60);
  doc.text(`REG NO: ${rollNo}`, 125, 60);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_DARK);
  doc.text('Course: B.Tech (Computer Science & Engineering)', 20, 67);
  doc.text('Examination Center: Academic Block 2, Exam Hall-A', 125, 67);
  doc.text('Session: Autumn 2026-27 | 5th Semester', 20, 74);
  doc.text('Roll Tag / Desk Code: DESK-CSE-042', 125, 74);

  const defaultSchedule = [
    ['1', '15 Oct 2026', '10:00 AM - 11:30 AM', 'CS501', 'Artificial Intelligence', 'Hall-A', 'Verified [  ]'],
    ['2', '17 Oct 2026', '10:00 AM - 11:30 AM', 'CS502', 'Machine Learning', 'Hall-B', 'Verified [  ]'],
    ['3', '20 Oct 2026', '02:00 PM - 03:30 PM', 'CS503', 'Cloud Computing', 'Hall-A', 'Verified [  ]'],
    ['4', '22 Oct 2026', '10:00 AM - 11:30 AM', 'CS504', 'Compiler Design', 'Hall-C', 'Verified [  ]']
  ];

  renderTable(doc, {
    startY: 86,
    head: [['#', 'Exam Date', 'Reporting Time', 'Code', 'Course / Subject Title', 'Hall', 'Invigilator Sign']],
    body: defaultSchedule,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: TEXT_DARK
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 26 },
      2: { cellWidth: 34 },
      3: { cellWidth: 18, fontStyle: 'bold' },
      4: { cellWidth: 50 },
      5: { cellWidth: 18, halign: 'center' },
      6: { cellWidth: 26, halign: 'center' }
    }
  });

  const finalY = doc.lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('MANDATORY EXAM HALL PROTOCOLS:', 14, finalY);

  const instructions = [
    '1. Students must carry this printed Admit Card along with their College RFID Smart Card.',
    '2. Electronic devices, smartwatches, and programmable calculators are strictly banned inside the hall.',
    '3. Students will not be permitted to enter the examination hall 15 minutes after commencement.'
  ];
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_DARK);
  instructions.forEach((ins, idx) => {
    doc.text(ins, 14, finalY + 5 + (idx * 4.5));
  });

  drawOfficialSeal(doc, 14, finalY + 22, 'EXAM CELL');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('Controller of Examinations', 135, finalY + 34);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Autonomous Examination Division • GIFT', 135, finalY + 38);

  addInstitutionalFooter(doc, 1, 1);

  doc.save(`Admit_Card_${rollNo}_Internal_Assessment.pdf`);
}

// -------------------------------------------------------------
// 4. Class Timetable / Schedule PDF
// -------------------------------------------------------------
export function downloadTimetablePdf(scheduleData = {}) {
  const doc = createPdfDoc({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // Landscape header
  doc.setFillColor(...PRIMARY_COLOR);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 24, 'F');
  doc.setFillColor(...SECONDARY_COLOR);
  doc.rect(0, 24, doc.internal.pageSize.getWidth(), 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('GANDHI INSTITUTE FOR TECHNOLOGY (GIFT AUTONOMOUS) • CSE DEPARTMENT', 14, 11);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text('Master Weekly Academic Class Routine • 5th Semester B.Tech (Section A) • Autumn 2026', 14, 18);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const tableData = [
    ['09:30 - 10:25', 'Artificial Intelligence (CS501)\nRoom 301 · Dr. P. Nayak', 'Cloud Computing (CS503)\nRoom 301 · Prof. M. Das', 'Operating Systems (CS502)\nRoom 301 · Dr. K. Rao', 'Compiler Design (CS504)\nRoom 301 · Prof. S. Jena', 'Machine Learning (CS502)\nRoom 301 · Dr. R. Mishra'],
    ['10:25 - 11:20', 'Operating Systems (CS502)\nRoom 301 · Dr. K. Rao', 'Compiler Design (CS504)\nRoom 301 · Prof. S. Jena', 'Artificial Intelligence (CS501)\nRoom 301 · Dr. P. Nayak', 'Machine Learning (CS502)\nRoom 301 · Dr. R. Mishra', 'Cloud Computing (CS503)\nRoom 301 · Prof. M. Das'],
    ['11:30 - 12:25', 'Machine Learning (CS502)\nRoom 301 · Dr. R. Mishra', 'Artificial Intelligence (CS501)\nRoom 301 · Dr. P. Nayak', 'Compiler Design (CS504)\nRoom 301 · Prof. S. Jena', 'Cloud Computing (CS503)\nRoom 301 · Prof. M. Das', 'Operating Systems (CS502)\nRoom 301 · Dr. K. Rao'],
    ['12:25 - 01:20', 'Compiler Design (CS504)\nRoom 301 · Prof. S. Jena', 'AI Lab (Group 1)\nLab 4 · Dr. P. Nayak', 'Cloud Lab (Group 1)\nLab 2 · Prof. M. Das', 'AI Lab (Group 2)\nLab 4 · Dr. P. Nayak', 'Seminar / Aptitude Prep\nAuditorium · T&P Team'],
    ['01:20 - 02:10', '— LUNCH BREAK —', '— LUNCH BREAK —', '— LUNCH BREAK —', '— LUNCH BREAK —', '— LUNCH BREAK —'],
    ['02:10 - 03:05', 'Cloud Lab (Group 2)\nLab 2 · Prof. M. Das', 'Library / Self Study\nCentral Library', 'Project Phase-1 Mentoring\nProject Lab · Faculty Guides', 'Technical Coding Drill\nLab 5 · Coding Cell', 'Sports / Co-Curricular\nCampus Ground'],
    ['03:05 - 04:00', 'Project Phase-1 Mentoring\nProject Lab · Faculty Guides', 'Research Colloquium\nSeminar Hall', 'Mentorship & Counseling\nFaculty Chambers', 'Club Activities\nSAC Building', 'Open Elective Lecture\nLH-2']
  ];

  renderTable(doc, {
    startY: 32,
    head: [['Time Slot', ...days]],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 7,
      textColor: TEXT_DARK,
      cellPadding: 2.5
    },
    columnStyles: {
      0: { cellWidth: 26, fontStyle: 'bold', halign: 'center' }
    }
  });

  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Note: 75% minimum attendance is mandatory as per BPUT autonomous norms.', 14, pageHeight - 8);
  doc.text('Head of Department (CSE) • GIFT Autonomous', pageWidth - 14, pageHeight - 8, { align: 'right' });

  doc.save('Class_Timetable_5th_Sem_CSE.pdf');
}

// -------------------------------------------------------------
// 5. Official University Notice / Circular PDF
// -------------------------------------------------------------
export function downloadNoticePdf(notice = {}) {
  const doc = createPdfDoc({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addInstitutionalHeader(doc, 'Office of the Registrar & Autonomous Council', 'University Notification & Official Circular');

  const title = notice.title || 'Official University Academic Notification';
  const tag = (notice.tag || 'Academic').toUpperCase();
  const date = notice.date || new Date().toLocaleDateString('en-IN');
  const publisher = notice.publisher || 'Dean Academics';
  const content = notice.content || notice.summary || 'Official notification details released for student information and institutional compliance.';
  const refNo = `GIFT/AUTO/NOTIF/2026/${Math.floor(100 + Math.random() * 900)}`;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(`REF NO: ${refNo}`, 14, 54);
  doc.text(`DATE OF ISSUE: ${date}`, doc.internal.pageSize.getWidth() - 14, 54, { align: 'right' });

  // Tag chip
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(14, 58, 34, 7, 2, 2, 'FD');
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(7.5);
  doc.text(`CATEGORY: ${tag}`, 31, 63, { align: 'center' });

  // Notice subject
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...PRIMARY_COLOR);
  const splitTitle = doc.splitTextToSize(`SUBJECT: ${title}`, doc.internal.pageSize.getWidth() - 28);
  doc.text(splitTitle, 14, 73);

  const titleHeight = splitTitle.length * 6;

  // Body content box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 73 + titleHeight, doc.internal.pageSize.getWidth() - 28, 80, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...TEXT_DARK);
  const splitContent = doc.splitTextToSize(content, doc.internal.pageSize.getWidth() - 40);
  doc.text(splitContent, 20, 81 + titleHeight);

  // Dispatch distribution list
  const dispatchY = 165 + titleHeight;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('Copy forwarded for information and necessary action to:', 14, dispatchY);

  const copies = [
    '1. All Heads of Academic Departments (CSE, ECE, EEE, MECH, CIVIL)',
    '2. Controller of Examinations & Dean Student Affairs',
    '3. Chief Warden, Campus Boys & Girls Hostels',
    '4. Notice Boards & College ERP Portal Repository'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_DARK);
  copies.forEach((c, idx) => {
    doc.text(c, 18, dispatchY + 6 + (idx * 5));
  });

  // Stamp and signature
  drawOfficialSeal(doc, 14, dispatchY + 30, 'REGISTRAR');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(`By Order,`, doc.internal.pageSize.getWidth() - 60, dispatchY + 36);
  doc.text(publisher, doc.internal.pageSize.getWidth() - 60, dispatchY + 42);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('GIFT Autonomous College, Bhubaneswar', doc.internal.pageSize.getWidth() - 60, dispatchY + 47);

  addInstitutionalFooter(doc, 1, 1);

  doc.save(`Official_Notice_${(notice.attachment || 'Circular').replace(/\s+/g, '_')}`);
}

// -------------------------------------------------------------
// 6. Subject Curriculum Syllabus PDF
// -------------------------------------------------------------
export function downloadSyllabusPdf(subject = {}) {
  const doc = createPdfDoc({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const code = subject.code || 'CS501';
  const name = subject.name || 'Artificial Intelligence';

  addInstitutionalHeader(doc, `Course Syllabus: ${code} - ${name}`, 'Department of Computer Science & Engineering • 4 Credits');

  // Course Overview Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 52, doc.internal.pageSize.getWidth() - 28, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(`SUBJECT CODE: ${code}`, 20, 60);
  doc.text('CREDITS: 4 (L:3, T:1, P:0)', 125, 60);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_DARK);
  doc.text(`Title: ${name}`, 20, 67);
  doc.text('Prerequisites: Data Structures & Discrete Mathematics', 125, 67);
  doc.text('Evaluation Scheme: CIA (20 Marks) + End Sem Exam (80 Marks)', 20, 74);
  doc.text('Approved by: BPUT Academic Council', 125, 74);

  const modules = [
    ['Module 1', 'Search Algorithms & Problem Formulation', 'State space search, BFS, DFS, Heuristic search, A*, AO*, Adversarial games, Minimax algorithm with alpha-beta pruning.', '8 Hours'],
    ['Module 2', 'Knowledge Representation & Logic', 'Propositional logic, First-order predicate calculus, Resolution refutation, Forward/backward chaining, Ontologies, Semantic nets.', '10 Hours'],
    ['Module 3', 'Probabilistic Reasoning & Uncertainty', 'Bayesian networks, Conditional probability, Exact inference, Dempster-Shafer theory, Fuzzy reasoning models.', '8 Hours'],
    ['Module 4', 'Machine Learning Foundations', 'Supervised vs unsupervised learning, Decision trees, Support Vector Machines, Neural representations, Reinforcement learning basics.', '10 Hours'],
    ['Module 5', 'Natural Language Processing & Ethics', 'N-gram language models, syntactic parsing, semantic representations, Ethical considerations, Bias in AI systems.', '6 Hours']
  ];

  renderTable(doc, {
    startY: 85,
    head: [['Module', 'Theme', 'Detailed Syllabus Topics', 'Lectures']],
    body: modules,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: TEXT_DARK
    },
    columnStyles: {
      0: { cellWidth: 20, fontStyle: 'bold' },
      1: { cellWidth: 45, fontStyle: 'bold' },
      2: { cellWidth: 95 },
      3: { cellWidth: 22, halign: 'center' }
    }
  });

  const finalY = doc.lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('RECOMMENDED TEXTBOOKS & REFERENCES:', 14, finalY);

  const books = [
    '1. Stuart Russell & Peter Norvig, "Artificial Intelligence: A Modern Approach", Pearson Education, 4th Edition.',
    '2. Elaine Rich, Kevin Knight & Shivashankar B. Nair, "Artificial Intelligence", McGraw Hill, 3rd Edition.'
  ];
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_DARK);
  books.forEach((b, idx) => {
    doc.text(b, 14, finalY + 6 + (idx * 5));
  });

  addInstitutionalFooter(doc, 1, 1);

  doc.save(`Syllabus_${code}_${name.replace(/\s+/g, '_')}.pdf`);
}

// -------------------------------------------------------------
// 7. Library Book E-Copy Summary PDF
// -------------------------------------------------------------
export function downloadLibraryBookPdf(book = {}) {
  const doc = createPdfDoc({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addInstitutionalHeader(doc, 'Central Library Digital Resource', 'Autonomous E-Learning & Reference Repository');

  const title = book.title || 'Core Computer Science Reference Work';
  const author = book.author || 'Academic Faculty Press';
  const callNo = book.callNo || `QA76.73.${Math.floor(100 + Math.random() * 899)}`;
  const category = book.category || 'Computer Science & Engineering';

  // Book Meta Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 52, doc.internal.pageSize.getWidth() - 28, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(title, 20, 62);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT_DARK);
  doc.text(`Primary Author: ${author}`, 20, 70);
  doc.text(`Discipline: ${category}`, 125, 70);
  doc.text(`Library Call Number: ${callNo}`, 20, 77);
  doc.text('Institutional Access: Licensed for GIFT Students & Faculty', 125, 77);

  // Chapter breakdown table
  const chapters = [
    ['Chapter 1', 'Foundations & Architectural Principles', 'Core theoretical framework, historical context, and fundamental paradigms.'],
    ['Chapter 2', 'Algorithmic Complexity & Design Patterns', 'Big-O notation, asymptotic analysis, divide-and-conquer methodologies.'],
    ['Chapter 3', 'State of the Art Implementation Protocols', 'Applied code examples, production engineering considerations.'],
    ['Chapter 4', 'Advanced Topics & Emerging Research', 'Distributed paradigms, scalability bottlenecks, future directions.'],
    ['Appendix', 'Mathematical Formulations & Notation Reference', 'Proof sketches, symbol tables, benchmark benchmark summaries.']
  ];

  renderTable(doc, {
    startY: 94,
    head: [['Section', 'Chapter Title', 'Abstract & Coverage Summary']],
    body: chapters,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    bodyStyles: {
      fontSize: 8,
      textColor: TEXT_DARK
    },
    columnStyles: {
      0: { cellWidth: 26, fontStyle: 'bold' },
      1: { cellWidth: 64, fontStyle: 'bold' },
      2: { cellWidth: 92 }
    }
  });

  drawOfficialSeal(doc, 14, doc.lastAutoTable.finalY + 12, 'CENTRAL LIBRARY');
  addInstitutionalFooter(doc, 1, 1);

  doc.save(`Library_ECopy_${title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)}.pdf`);
}

// -------------------------------------------------------------
// 8. Hostel Occupancy Census & Maintenance PDF
// -------------------------------------------------------------
export function downloadHostelCensusPdf(hostels = []) {
  const doc = createPdfDoc({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addInstitutionalHeader(doc, 'Hostel Occupancy Census & Resident Register', 'Office of Chief Warden & Campus Housing Administration');

  const defaultHostels = [
    ['Kharavela Boys Residence (Block A)', '250', '238', '12', '95.2%'],
    ['Kapilash Boys Residence (Block B)', '200', '192', '8', '96.0%'],
    ['Mahanadi Girls Residence (Block C)', '220', '215', '5', '97.7%']
  ];

  const bodyData = hostels.length > 0 
    ? hostels.map(h => [h.name, h.capacity, h.occupied, h.capacity - h.occupied, `${((h.occupied / h.capacity) * 100).toFixed(1)}%`])
    : defaultHostels;

  renderTable(doc, {
    startY: 54,
    head: [['Hostel Residence Name', 'Total Capacity (Beds)', 'Occupied Beds', 'Vacant Beds', 'Occupancy %']],
    body: bodyData,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    bodyStyles: {
      fontSize: 8,
      textColor: TEXT_DARK
    },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 28, halign: 'center' },
      2: { cellWidth: 28, halign: 'center' },
      3: { cellWidth: 28, halign: 'center' },
      4: { cellWidth: 28, halign: 'center', fontStyle: 'bold' }
    }
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  // Census Key Metrics
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, finalY, doc.internal.pageSize.getWidth() - 28, 26, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('CAMPUS HOUSING METRICS SUMMARY', 20, finalY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_DARK);
  doc.text('• Total Accommodation Capacity: 670 Beds across 3 residential complexes', 20, finalY + 15);
  doc.text('• Total Resident Scholars Registered: 645 Scholars (96.3% Aggregate Occupancy)', 20, finalY + 21);

  drawOfficialSeal(doc, 14, finalY + 36, 'CHIEF WARDEN');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('Chief Warden & Student Housing', 135, finalY + 48);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('GIFT Autonomous College, Bhubaneswar', 135, finalY + 52);

  addInstitutionalFooter(doc, 1, 1);

  doc.save('Hostel_Occupancy_Census_Report.pdf');
}

// -------------------------------------------------------------
// 9. Accounts Daily Fee Collection Register PDF
// -------------------------------------------------------------
export function downloadAccountsRegisterPdf(transactions = []) {
  const doc = createPdfDoc({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addInstitutionalHeader(doc, 'Daily Fee Collection & Revenue Register', 'Office of Accounts & Financial Audit Section');

  const defaultTxns = [
    ['TXN-98421', 'Aarav Sharma', '2301289140', 'Tuition Fee', 'INR 48,500', 'Net Banking'],
    ['TXN-98422', 'Rohan Verma', '2301289142', 'Exam Fee', 'INR 3,500', 'UPI'],
    ['TXN-98423', 'Sneha Patel', '2301289145', 'Hostel Fee', 'INR 32,000', 'Credit Card'],
    ['TXN-98424', 'Rakesh Das', '2301289146', 'Caution Deposit', 'INR 5,000', 'Bank Challan'],
    ['TXN-98425', 'Vikram Singh', '2301289148', 'Tuition Fee', 'INR 48,500', 'UPI']
  ];

  const bodyData = transactions.length > 0
    ? transactions.map(t => [t.id || t.receiptNo, t.studentName || 'Student', t.rollNumber || '2301289000', t.head, `INR ${Number(t.amount).toLocaleString('en-IN')}`, t.mode])
    : defaultTxns;

  renderTable(doc, {
    startY: 54,
    head: [['Txn ID', 'Student Name', 'Roll Number', 'Fee Head', 'Amount', 'Payment Mode']],
    body: bodyData,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: TEXT_DARK
    },
    columnStyles: {
      0: { cellWidth: 26, fontStyle: 'bold' },
      1: { cellWidth: 38 },
      2: { cellWidth: 28 },
      3: { cellWidth: 38 },
      4: { cellWidth: 26, halign: 'right', fontStyle: 'bold' },
      5: { cellWidth: 26, halign: 'center' }
    }
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  drawOfficialSeal(doc, 14, finalY, 'BURSAR OFFICE');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('Senior Finance Officer / Bursar', 135, finalY + 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Accounts Section • GIFT Autonomous College', 135, finalY + 16);

  addInstitutionalFooter(doc, 1, 1);

  doc.save('Daily_Fee_Collection_Register.pdf');
}

// -------------------------------------------------------------
// 10. Department Continuous Internal Assessment (CIA) Gazette PDF
// -------------------------------------------------------------
export function downloadDepartmentGazettePdf(courseTitle = 'Data Structures (CS501) CIA Gazette') {
  const doc = createPdfDoc({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addInstitutionalHeader(doc, courseTitle, 'Office of Head of Department (CSE) • Continuous Evaluation Return');

  const rows = [
    ['1', '2301289140', 'Aarav Sharma', '18.5', '19.0', '18.0', '19.5', '19.0', 'O'],
    ['2', '2301289141', 'Priya Jena', '17.0', '18.5', '17.5', '18.0', '17.8', 'A+'],
    ['3', '2301289142', 'Rohan Verma', '16.5', '16.0', '15.5', '17.0', '16.3', 'A'],
    ['4', '2301289143', 'Ishita Mohanty', '19.0', '19.5', '18.5', '20.0', '19.3', 'O'],
    ['5', '2301289144', 'Siddharth Sahoo', '15.0', '16.0', '15.0', '15.5', '15.4', 'B+'],
    ['6', '2301289145', 'Sneha Patel', '18.0', '17.5', '18.0', '19.0', '18.1', 'A+'],
    ['7', '2301289146', 'Rakesh Das', '19.5', '20.0', '19.0', '20.0', '19.6', 'O']
  ];

  renderTable(doc, {
    startY: 54,
    head: [['#', 'Roll Number', 'Student Name', 'Quiz (20)', 'Mid-1 (20)', 'Mid-2 (20)', 'Assign (20)', 'Final CIA (20)', 'Grade']],
    body: rows,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: TEXT_DARK
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 26, fontStyle: 'bold' },
      2: { cellWidth: 42 },
      3: { cellWidth: 18, halign: 'center' },
      4: { cellWidth: 18, halign: 'center' },
      5: { cellWidth: 18, halign: 'center' },
      6: { cellWidth: 18, halign: 'center' },
      7: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
      8: { cellWidth: 12, halign: 'center', fontStyle: 'bold' }
    }
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  drawOfficialSeal(doc, 14, finalY, 'CSE DEPT');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('Head of Department (CSE)', 135, finalY + 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Department of Computer Science & Engineering', 135, finalY + 16);

  addInstitutionalFooter(doc, 1, 1);

  doc.save(`${courseTitle.replace(/\s+/g, '_')}.pdf`);
}

// -------------------------------------------------------------
// 11. Canteen Daily Sales Statement PDF
// -------------------------------------------------------------
export function downloadCanteenStatementPdf() {
  const doc = createPdfDoc({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addInstitutionalHeader(doc, 'Daily Canteen Sales & Token Register', 'Campus Central Cafeteria • Daily Financial Return');

  const rows = [
    ['1', 'Special South Indian Thali', '48', 'INR 75', 'INR 3,600'],
    ['2', 'Masala Dosa with Sambar', '65', 'INR 50', 'INR 3,250'],
    ['3', 'Chicken Biryani Plate', '84', 'INR 120', 'INR 10,080'],
    ['4', 'Veg Paneer Fried Rice', '52', 'INR 80', 'INR 4,160'],
    ['5', 'Cold Coffee / Milkshakes', '76', 'INR 35', 'INR 2,660'],
    ['6', 'Tea & Fresh Snacks', '140', 'INR 15', 'INR 2,100']
  ];

  renderTable(doc, {
    startY: 54,
    head: [['#', 'Menu Item Name', 'Quantity Dispatched', 'Unit Price', 'Gross Total (INR)']],
    body: rows,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    bodyStyles: {
      fontSize: 8,
      textColor: TEXT_DARK
    },
    columnStyles: {
      0: { cellWidth: 14, halign: 'center' },
      1: { cellWidth: 70 },
      2: { cellWidth: 36, halign: 'center' },
      3: { cellWidth: 32, halign: 'right' },
      4: { cellWidth: 30, halign: 'right', fontStyle: 'bold' }
    }
  });

  const finalY = doc.lastAutoTable.finalY + 8;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, finalY, doc.internal.pageSize.getWidth() - 28, 16, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('TOTAL DAILY GROSS REVENUE:', 20, finalY + 10);
  doc.setFontSize(13);
  doc.setTextColor(5, 150, 105);
  doc.text('INR ₹25,850', 145, finalY + 11);

  drawOfficialSeal(doc, 14, finalY + 24, 'CANTEEN ADMIN');
  addInstitutionalFooter(doc, 1, 1);

  doc.save('Daily_Canteen_Sales_Statement.pdf');
}

// -------------------------------------------------------------
// 12. Institutional College-wide Performance Report PDF
// -------------------------------------------------------------
export function downloadAdminReportPdf(reportType = 'College-wide Performance Report') {
  const doc = createPdfDoc({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addInstitutionalHeader(doc, reportType, 'Office of Principal & Academic Council • Annual Institutional Review');

  const rows = [
    ['Computer Science & Engineering', '480', '96.2%', '8.48', '94.5%'],
    ['Electronics & Communication Eng.', '240', '92.4%', '8.12', '88.0%'],
    ['Electrical & Electronics Eng.', '180', '89.5%', '7.84', '82.5%'],
    ['Mechanical Engineering', '180', '88.0%', '7.76', '80.0%'],
    ['Civil Engineering', '120', '91.2%', '7.92', '83.0%']
  ];

  renderTable(doc, {
    startY: 54,
    head: [['Academic Department', 'Total Enrolled', 'Pass Rate (%)', 'Average CGPA', 'Placement Rate (%)']],
    body: rows,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    bodyStyles: {
      fontSize: 8,
      textColor: TEXT_DARK
    },
    columnStyles: {
      0: { cellWidth: 64 },
      1: { cellWidth: 28, halign: 'center' },
      2: { cellWidth: 28, halign: 'center' },
      3: { cellWidth: 28, halign: 'center', fontStyle: 'bold' },
      4: { cellWidth: 34, halign: 'center', fontStyle: 'bold' }
    }
  });

  const finalY = doc.lastAutoTable.finalY + 12;
  drawOfficialSeal(doc, 14, finalY, 'COLLEGE COUNCIL');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text('Principal & Director of Academics', 130, finalY + 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('GIFT Autonomous College, Bhubaneswar', 130, finalY + 16);

  addInstitutionalFooter(doc, 1, 1);

  doc.save(`${reportType.replace(/\s+/g, '_')}.pdf`);
}
