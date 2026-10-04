import { useState } from 'react';
import { Activity, BookOpen, CalendarDays, CheckCircle2, ClipboardList, UserRound } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { DashboardShell } from '../components/DashboardShell';
import { MetricCard } from '../components/MetricCard';
import { studentSummary, type UserSession } from '../data/mockData';

const courses = [
  { code: 'CS501', name: 'Advanced Data Structures', faculty: 'Dr. Meera Rao', credits: 4, progress: 78 },
  { code: 'CS503', name: 'Operating Systems', faculty: 'Prof. K. Mohanty', credits: 4, progress: 84 },
  { code: 'CS505', name: 'Database Management Systems', faculty: 'Dr. S. Das', credits: 3, progress: 91 },
  { code: 'CS507', name: 'Computer Networks', faculty: 'Prof. A. Sen', credits: 3, progress: 73 },
  { code: 'CS509', name: 'Software Engineering Lab', faculty: 'Prof. A. Sen', credits: 4, progress: 88 },
];

const attendance = [
  { code: 'CS501', name: 'Advanced Data Structures', held: 40, attended: 37 },
  { code: 'CS503', name: 'Operating Systems', held: 32, attended: 30 },
  { code: 'CS505', name: 'Database Management Systems', held: 28, attended: 27 },
  { code: 'CS507', name: 'Computer Networks', held: 30, attended: 27 },
  { code: 'CS509', name: 'Software Engineering Lab', held: 30, attended: 27 },
];

const attendanceTrend = [
  { month: 'Jun', rate: 89 },
  { month: 'Jul', rate: 91 },
  { month: 'Aug', rate: 90 },
  { month: 'Sep', rate: 94 },
  { month: 'Oct', rate: 92.5 },
];

const resultTerms = [
  { term: 'Semester 4', sgpa: '8.72', published: 'May 2026', rows: [
    { code: 'CS401', subject: 'Algorithms', internal: 27, external: 62, total: 89, grade: 'A' },
    { code: 'CS403', subject: 'Software Engineering', internal: 25, external: 58, total: 83, grade: 'A' },
    { code: 'CS405', subject: 'Theory of Computation', internal: 28, external: 54, total: 82, grade: 'A' },
    { code: 'CS407', subject: 'Microprocessors', internal: 26, external: 61, total: 87, grade: 'A' },
  ] },
  { term: 'Semester 3', sgpa: '8.64', published: 'December 2025', rows: [
    { code: 'CS301', subject: 'Data Structures', internal: 28, external: 60, total: 88, grade: 'A' },
    { code: 'CS303', subject: 'Digital Logic', internal: 24, external: 57, total: 81, grade: 'A' },
    { code: 'CS305', subject: 'Discrete Mathematics', internal: 26, external: 55, total: 81, grade: 'A' },
    { code: 'CS307', subject: 'Object Oriented Programming', internal: 29, external: 63, total: 92, grade: 'O' },
  ] },
];

function studentName(user: UserSession | null) {
  return user ? `${user.firstName} ${user.lastName}` : studentSummary.name;
}

function SectionHeading({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return (
    <div className="mb-6 flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h2>
      </div>
      <p className="max-w-xl text-sm text-slate-500">{detail}</p>
    </div>
  );
}

export function StudentProfilePage({ user }: { user: UserSession | null }) {
  return (
    <DashboardShell title="Student profile" subtitle="Your campus identity and enrollment details" user={user}>
      <SectionHeading eyebrow="My records" title="Profile & enrollment" detail="Personal and academic details associated with your student record." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-800"><UserRound size={28} /></div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{studentName(user)}</h3>
              <p className="mt-1 text-sm text-slate-500">{studentSummary.studentId}</p>
            </div>
          </div>
          <div className="mt-6 border-t border-slate-200 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Program</p>
            <p className="mt-2 font-medium text-slate-900">B.Tech, Computer Science & Engineering</p>
            <p className="mt-1 text-sm text-slate-500">School of Computing · 2024–2028</p>
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-700"><CheckCircle2 size={17} /> Enrollment active</div>
        </section>
        <section className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-base font-semibold text-slate-900">Personal information</h3>
          <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <ProfileField label="College email" value={user?.email ?? 'aarav.sharma@collegeflow.edu'} />
            <ProfileField label="Student number" value={studentSummary.studentId} />
            <ProfileField label="Department" value="Computer Science & Engineering" />
            <ProfileField label="Current semester" value={`Semester ${studentSummary.semester}`} />
            <ProfileField label="Academic standing" value="Good standing" />
            <ProfileField label="Academic advisor" value="Dr. Meera Rao" />
          </dl>
        </section>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <MetricCard icon={<BookOpen />} label="Credits completed" value={String(studentSummary.creditsCompleted)} detail="Out of 160 program credits" tone="brand" />
        <MetricCard icon={<Activity />} label="Cumulative GPA" value={studentSummary.cgpa.toFixed(2)} detail="Across completed semesters" tone="success" />
        <MetricCard icon={<CalendarDays />} label="Expected graduation" value="May 2028" detail="Four-year undergraduate program" tone="warning" />
      </div>
    </DashboardShell>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1.5 text-sm font-medium text-slate-900">{value}</dd></div>;
}

export function StudentAcademicsPage({ user }: { user: UserSession | null }) {
  return (
    <DashboardShell title="Academic overview" subtitle="Your current term, courses, and credit progress" user={user}>
      <SectionHeading eyebrow="Semester 5 · 2026–27" title="Academic overview" detail="A consolidated view of your enrolled courses and progress toward your degree." />
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard icon={<BookOpen />} label="Enrolled courses" value="5" detail="Current semester" tone="brand" />
        <MetricCard icon={<CheckCircle2 />} label="Term GPA" value={studentSummary.sgpa.toFixed(2)} detail="Previous semester" tone="success" />
        <MetricCard icon={<ClipboardList />} label="Credits this term" value="18" detail={`${studentSummary.creditsCompleted} completed to date`} tone="warning" />
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div><h3 className="font-semibold text-slate-900">Current course load</h3><p className="mt-1 text-sm text-slate-500">Course completion reflects scheduled teaching weeks.</p></div>
          <span className="hidden rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 sm:inline">Semester 5</span>
        </div>
        <div className="divide-y divide-slate-100">
          {courses.map((course) => (
            <div key={course.code} className="grid gap-3 px-5 py-4 sm:grid-cols-[1.3fr_0.8fr_0.4fr_1fr] sm:items-center">
              <div><p className="text-xs font-semibold text-slate-500">{course.code}</p><p className="mt-1 text-sm font-medium text-slate-900">{course.name}</p></div>
              <p className="text-sm text-slate-600">{course.faculty}</p>
              <p className="text-sm text-slate-600">{course.credits} credits</p>
              <div><div className="mb-1 flex justify-between text-xs text-slate-500"><span>Term progress</span><span>{course.progress}%</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-600" style={{ width: `${course.progress}%` }} /></div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <InfoPanel title="Next academic milestone" primary="Mid-semester examinations" secondary="October 19–24, 2026" />
        <InfoPanel title="Registration status" primary="Semester registration complete" secondary="Registered on September 2, 2026" />
      </div>
    </DashboardShell>
  );
}

export function StudentAttendancePage({ user }: { user: UserSession | null }) {
  const totalHeld = attendance.reduce((sum, item) => sum + item.held, 0);
  const totalAttended = attendance.reduce((sum, item) => sum + item.attended, 0);
  const overall = (totalAttended / totalHeld) * 100;
  return (
    <DashboardShell title="Attendance" subtitle="Term attendance by course and monthly trend" user={user}>
      <SectionHeading eyebrow="Semester 5 · 2026–27" title="Attendance record" detail="Attendance is calculated from attended sessions divided by sessions held." />
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard icon={<Activity />} label="Overall attendance" value={`${overall.toFixed(1)}%`} detail="Across all current courses" tone="success" />
        <MetricCard icon={<CalendarDays />} label="Sessions attended" value={`${totalAttended} / ${totalHeld}`} detail="Recorded this semester" tone="brand" />
        <MetricCard icon={<CheckCircle2 />} label="Minimum required" value="75%" detail="Current standing: eligible" tone="warning" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartCard title="Monthly attendance">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={attendanceTrend}>
              <defs><linearGradient id="attendanceTrendFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0f766e" stopOpacity={0.3} /><stop offset="95%" stopColor="#0f766e" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="month" tickLine={false} axisLine={false} /><YAxis domain={[70, 100]} tickLine={false} axisLine={false} /><Tooltip /><Area type="monotone" dataKey="rate" name="Attendance" unit="%" stroke="#0f766e" fill="url(#attendanceTrendFill)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Attendance planning</p>
          <h3 className="mt-3 text-lg font-semibold text-slate-900">Keep your course eligibility on track</h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">Your overall attendance is above the 75% minimum. Check course-level records regularly, since eligibility is assessed separately for each course.</p>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Course</th><th className="px-5 py-3">Attended</th><th className="px-5 py-3">Held</th><th className="px-5 py-3">Attendance</th><th className="px-5 py-3">Status</th></tr></thead>
          <tbody className="divide-y divide-slate-100">{attendance.map((item) => { const rate = (item.attended / item.held) * 100; return <tr key={item.code}><td className="px-5 py-4"><span className="block text-xs font-semibold text-slate-500">{item.code}</span><span className="mt-1 block font-medium text-slate-900">{item.name}</span></td><td className="px-5 py-4 text-slate-700">{item.attended}</td><td className="px-5 py-4 text-slate-700">{item.held}</td><td className="px-5 py-4 font-medium text-slate-900">{rate.toFixed(1)}%</td><td className="px-5 py-4"><span className={`rounded-md px-2 py-1 text-xs font-medium ${rate >= 75 ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>{rate >= 75 ? 'Eligible' : 'At risk'}</span></td></tr>; })}</tbody>
        </table>
      </div>
    </DashboardShell>
  );
}

export function StudentResultsPage({ user }: { user: UserSession | null }) {
  const [selectedTerm, setSelectedTerm] = useState(resultTerms[0].term);
  const term = resultTerms.find((item) => item.term === selectedTerm) ?? resultTerms[0];
  return (
    <DashboardShell title="Results & grades" subtitle="Published semester results and subject grades" user={user}>
      <SectionHeading eyebrow="Academic history" title="Results & grades" detail="Review published marks, grades, and semester performance." />
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Semester</span><select value={selectedTerm} onChange={(event) => setSelectedTerm(event.target.value)} className="min-w-48 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-700">{resultTerms.map((item) => <option key={item.term}>{item.term}</option>)}</select></label>
        <p className="text-sm text-slate-500">Published {term.published}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard icon={<Activity />} label="Semester GPA" value={term.sgpa} detail={term.term} tone="brand" />
        <MetricCard icon={<ClipboardList />} label="Subjects completed" value={String(term.rows.length)} detail="All results published" tone="success" />
        <MetricCard icon={<CheckCircle2 />} label="Academic standing" value="Passed" detail="No pending course results" tone="warning" />
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Course</th><th className="px-5 py-3">Internal / 30</th><th className="px-5 py-3">External / 70</th><th className="px-5 py-3">Total / 100</th><th className="px-5 py-3">Grade</th></tr></thead>
          <tbody className="divide-y divide-slate-100">{term.rows.map((row) => <tr key={row.code}><td className="px-5 py-4"><span className="block text-xs font-semibold text-slate-500">{row.code}</span><span className="mt-1 block font-medium text-slate-900">{row.subject}</span></td><td className="px-5 py-4 text-slate-700">{row.internal}</td><td className="px-5 py-4 text-slate-700">{row.external}</td><td className="px-5 py-4 font-semibold text-slate-900">{row.total}</td><td className="px-5 py-4"><span className="inline-flex min-w-9 justify-center rounded-md bg-teal-50 px-2 py-1 font-semibold text-teal-800">{row.grade}</span></td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-slate-500">For a formal transcript or grade correction request, contact the examination office.</p>
    </DashboardShell>
  );
}

function InfoPanel({ title, primary, secondary }: { title: string; primary: string; secondary: string }) {
  return <section className="rounded-2xl border border-slate-200 p-5"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p><p className="mt-3 font-semibold text-slate-900">{primary}</p><p className="mt-1 text-sm text-slate-500">{secondary}</p></section>;
}