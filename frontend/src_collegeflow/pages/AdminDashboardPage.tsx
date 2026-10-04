import { Building2, CheckCircle2 } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { DashboardShell } from '../components/DashboardShell';
import { MetricCard } from '../components/MetricCard';
import { adminKpis, recentActivity, studentAttendanceData, type UserSession } from '../data/mockData';

export function AdminDashboardPage({ user }: { user: UserSession | null }) {
  return (
    <DashboardShell title="Admin dashboard" subtitle="Operational overview across campus systems" user={user}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminKpis.map((kpi) => (
          <MetricCard
            key={kpi.label}
            icon={<Building2 />}
            label={kpi.label}
            value={kpi.value}
            detail={kpi.change}
            tone={kpi.label.includes('Fees') ? 'warning' : kpi.label.includes('Attendance') ? 'success' : 'brand'}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <ChartCard title="Enrollment and attendance trend">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={studentAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Recent activity">
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="mt-1 rounded-full bg-emerald-100 p-1 text-emerald-600"><CheckCircle2 size={14} /></div>
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartCard title="Department health">
          <div className="space-y-4">
            {['Computer Science', 'Electronics', 'Mechanical', 'Civil'].map((department, index) => (
              <div key={department}>
                <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                  <span>{department}</span>
                  <span className="font-medium text-slate-800">{88 + index * 3}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400" style={{ width: `${88 + index * 3}%` }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="User access">
          <div className="flex items-center justify-center">
            <div className="flex h-48 w-48 items-center justify-center rounded-full border-[14px] border-brand-100 bg-white">
              <div className="text-center">
                <p className="text-3xl font-semibold text-slate-900">91.4%</p>
                <p className="text-sm text-slate-500">attendance</p>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </DashboardShell>
  );
}
