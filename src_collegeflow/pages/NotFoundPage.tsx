import { Link } from 'react-router-dom';
import type { UserSession } from '../data/mockData';

export function NotFoundPage({ session }: { session: UserSession | null }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="max-w-md rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="text-sm uppercase tracking-[0.22em] text-brand-600">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">The route you requested does not exist in this CollegeFlow workspace.</p>
        <Link
          to={session ? (session.role === 'college_admin' ? '/admin' : '/dashboard') : '/login'}
          className="mt-6 inline-flex rounded-xl bg-brand-600 px-4 py-3 text-sm font-medium text-white hover:bg-brand-700"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
