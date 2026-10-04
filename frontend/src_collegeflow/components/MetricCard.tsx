import type { ReactNode } from 'react';

export function MetricCard({ icon, label, value, detail, tone }: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  tone: 'brand' | 'success' | 'warning' | 'purple';
}) {
  const tones = {
    brand: 'bg-blue-50 text-brand-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    purple: 'bg-violet-50 text-violet-700',
  };

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <div className={`rounded-2xl p-2.5 ${tones[tone]}`}>{icon}</div>
        <span className="text-xs font-medium text-slate-500">Live</span>
      </div>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </div>
  );
}
