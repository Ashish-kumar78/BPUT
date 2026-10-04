import {
  Activity,
  Calendar,
  CheckCircle2,
  CreditCard,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DashboardShell } from '../components/DashboardShell';
import { MetricCard } from '../components/MetricCard';
import { ChartCard } from '../components/ChartCard';
import { feeBreakdown, noticeFeed, studentAttendanceData, studentSummary, subjectPerformance, type UserSession } from '../data/mockData';

export function StudentDashboardPage({ user }: { user: UserSession | null }) {
  const currentUser = user ?? { firstName: 'Aarav', lastName: 'Sharma', role: 'student' };

  return (
    <DashboardShell title="Student dashboard" subtitle={`Welcome back, ${currentUser.firstName}`} user={user}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={<Activity />} label="Current CGPA" value={studentSummary.cgpa.toFixed(2)} detail="+0.18 this term" tone="brand" />
        <MetricCard icon={<CheckCircle2 />} label="Attendance" value={`${studentSummary.attendance}%`} detail="Above target" tone="success" />
        <MetricCard icon={<CreditCard />} label="Pending fees" value={`₹${studentSummary.pendingFees.toLocaleString('en-IN')}`} detail="Due in 8 days" tone="warning" />
        <MetricCard icon={<Calendar />} label="Upcoming exams" value={String(studentSummary.upcomingExams)} detail="4 scheduled" tone="purple" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <ChartCard title="Semester performance">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={studentAttendanceData}>
              <defs>
                <linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#2563eb" fill="url(#attendanceFill)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Subject performance">
          <div className="space-y-4">
            {subjectPerformance.map((subject) => (
              <div key={subject.name}>
                <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                  <span>{subject.name}</span>
                  <span className="font-medium text-slate-800">{subject.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${subject.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ChartCard title="Fee status">
          <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={feeBreakdown} dataKey="value" nameKey="name" innerRadius={48} outerRadius={82} paddingAngle={3}>
                    {feeBreakdown.map((entry, index) => (
                      <Cell key={entry.name} fill={index === 0 ? '#2563eb' : '#cbd5e1'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-5">
              <div>
                <p className="text-sm text-slate-500">Total fees</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">₹1,24,000</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Paid</p>
                <p className="mt-1 text-xl font-semibold text-emerald-600">₹1,06,000</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Outstanding</p>
                <p className="mt-1 text-xl font-semibold text-amber-600">₹18,000</p>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Important notices">
          <div className="space-y-3">
            {noticeFeed.map((notice) => (
              <div key={notice.title} className="rounded-2xl border border-slate-200 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-800">{notice.title}</p>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700">{notice.priority}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>{notice.type}</span>
                  <span>{notice.date}</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </DashboardShell>
  );
}
