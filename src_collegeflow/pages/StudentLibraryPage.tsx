import { useState } from 'react';
import {
  AlertCircle,
  BookMarked,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Filter,
  Library,
  RotateCw,
  Search,
  Sparkles,
} from 'lucide-react';
import { DashboardShell } from '../components/DashboardShell';
import { MetricCard } from '../components/MetricCard';
import type { UserSession } from '../data/mockData';

interface BookItem {
  id: string;
  title: string;
  author: string;
  edition: string;
  isbn: string;
  category: string;
  available: number;
  total: number;
  shelf: string;
  rating: number;
}

interface IssuedBook {
  id: string;
  bookId: string;
  title: string;
  author: string;
  issueDate: string;
  dueDate: string;
  status: 'active' | 'overdue' | 'renewed';
  fine: number;
}

const initialCatalog: BookItem[] = [
  {
    id: 'BK-101',
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell & Peter Norvig',
    edition: '4th Edition (2020)',
    isbn: '978-0134610993',
    category: 'AI & Machine Learning',
    available: 3,
    total: 6,
    shelf: 'Stack A-12',
    rating: 4.9,
  },
  {
    id: 'BK-102',
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Cormen, Leiserson, Rivest & Stein',
    edition: '4th Edition (2022)',
    isbn: '978-0262046305',
    category: 'Algorithms & Theory',
    available: 1,
    total: 8,
    shelf: 'Stack B-04',
    rating: 4.8,
  },
  {
    id: 'BK-103',
    title: 'Operating Systems: Three Easy Pieces',
    author: 'Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau',
    edition: 'Version 1.10 (2023)',
    isbn: '978-1985086593',
    category: 'Operating Systems',
    available: 4,
    total: 5,
    shelf: 'Stack C-02',
    rating: 4.9,
  },
  {
    id: 'BK-104',
    title: 'Computer Networks: A Systems Approach',
    author: 'Larry L. Peterson & Bruce S. Davie',
    edition: '6th Edition',
    isbn: '978-0128182000',
    category: 'Computer Networks',
    available: 2,
    total: 4,
    shelf: 'Stack D-08',
    rating: 4.6,
  },
  {
    id: 'BK-105',
    title: 'Pattern Recognition and Machine Learning',
    author: 'Christopher M. Bishop',
    edition: '1st Edition',
    isbn: '978-0387310732',
    category: 'AI & Machine Learning',
    available: 2,
    total: 3,
    shelf: 'Stack A-14',
    rating: 4.8,
  },
  {
    id: 'BK-106',
    title: 'Compilers: Principles, Techniques, & Tools (Dragon Book)',
    author: 'Aho, Lam, Sethi & Ullman',
    edition: '2nd Edition',
    isbn: '978-0321486813',
    category: 'Compilers & PL',
    available: 0,
    total: 4,
    shelf: 'Stack C-09',
    rating: 4.7,
  },
  {
    id: 'BK-107',
    title: 'Cloud Computing: Concepts, Technology & Architecture',
    author: 'Thomas Erl, Ricardo Puttini, Zaigham Mahmood',
    edition: '1st Edition',
    isbn: '978-0133387520',
    category: 'Cloud & Architecture',
    available: 3,
    total: 4,
    shelf: 'Stack E-01',
    rating: 4.5,
  },
  {
    id: 'BK-108',
    title: 'Database System Concepts',
    author: 'Silberschatz, Korth & Sudarshan',
    edition: '7th Edition (2019)',
    isbn: '978-0078022159',
    category: 'Databases',
    available: 5,
    total: 7,
    shelf: 'Stack B-11',
    rating: 4.7,
  },
];

const initialIssued: IssuedBook[] = [
  {
    id: 'ISS-401',
    bookId: 'BK-102',
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Cormen, Leiserson, Rivest & Stein',
    issueDate: '15 Sep 2026',
    dueDate: '29 Sep 2026',
    status: 'overdue',
    fine: 40,
  },
  {
    id: 'ISS-402',
    bookId: 'BK-106',
    title: 'Compilers: Principles, Techniques, & Tools',
    author: 'Aho, Lam, Sethi & Ullman',
    issueDate: '26 Sep 2026',
    dueDate: '10 Oct 2026',
    status: 'active',
    fine: 0,
  },
];

const categories = [
  'All',
  'AI & Machine Learning',
  'Algorithms & Theory',
  'Operating Systems',
  'Computer Networks',
  'Databases',
  'Cloud & Architecture',
  'Compilers & PL',
];

export function StudentLibraryPage({ user }: { user: UserSession | null }) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'issued' | 'digital'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [catalog, setCatalog] = useState<BookItem[]>(initialCatalog);
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>(initialIssued);
  const [reservedIds, setReservedIds] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const filteredBooks = catalog.filter((book) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.isbn.toLowerCase().includes(q) ||
      book.category.toLowerCase().includes(q);

    const matchesCat = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleReserve = (book: BookItem) => {
    if (book.available === 0) return;
    if (reservedIds.includes(book.id)) return;

    setReservedIds((prev) => [...prev, book.id]);
    setCatalog((prev) =>
      prev.map((b) => (b.id === book.id ? { ...b, available: b.available - 1 } : b))
    );
    setNotification(`"${book.title}" has been reserved! Pick it up at circulation desk within 24h.`);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleRenew = (issuedId: string) => {
    setIssuedBooks((prev) =>
      prev.map((item) =>
        item.id === issuedId
          ? {
              ...item,
              dueDate: '24 Oct 2026',
              status: 'renewed',
              fine: 0,
            }
          : item
      )
    );
    setNotification('Book loan extended by 14 days successfully.');
    setTimeout(() => setNotification(null), 4000);
  };

  const totalFine = issuedBooks.reduce((sum, b) => sum + b.fine, 0);

  return (
    <DashboardShell
      title="Student Library"
      subtitle="Central university book catalog, circulation history, and digital resources"
      user={user}
    >
      {/* Top Notification Banner */}
      {notification && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs text-blue-700 underline hover:text-blue-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Overview Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<BookMarked className="h-5 w-5" />}
          label="Books currently issued"
          value={String(issuedBooks.length)}
          detail="1 active · 1 due for return"
          tone="brand"
        />
        <MetricCard
          icon={<AlertCircle className="h-5 w-5" />}
          label="Pending overdue fine"
          value={`₹${totalFine}`}
          detail="Payable at desk or online"
          tone={totalFine > 0 ? 'warning' : 'success'}
        />
        <MetricCard
          icon={<Library className="h-5 w-5" />}
          label="Active reservations"
          value={String(reservedIds.length)}
          detail={reservedIds.length > 0 ? 'Ready at Counter 2' : 'No pending reservations'}
          tone="purple"
        />
        <MetricCard
          icon={<Clock className="h-5 w-5" />}
          label="Central Library Hours"
          value="8 AM – 8 PM"
          detail="Reading rooms open 24/7"
          tone="success"
        />
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              activeTab === 'catalog'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Search Book Catalog
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('issued')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              activeTab === 'issued'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookMarked className="h-4 w-4" />
            My Borrowed Books ({issuedBooks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('digital')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              activeTab === 'digital'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Download className="h-4 w-4" />
            E-Resources & Journals
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Clock className="h-4 w-4 text-blue-600" />
          <span>Last synchronized with Library ERP: Today, 01:00 AM</span>
        </div>
      </div>

      {/* Tab 1: Book Catalog */}
      {activeTab === 'catalog' && (
        <div className="mt-6 space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by book title, author, subject, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <Filter className="h-4 w-4 text-slate-400 shrink-0" />
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Book Catalog Grid */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredBooks.map((book) => {
              const isReserved = reservedIds.includes(book.id);
              const isAvailable = book.available > 0;

              return (
                <div
                  key={book.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-300"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                        {book.category}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          isAvailable
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {isAvailable ? `${book.available} available` : 'Out of stock'}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-500">by {book.author}</p>

                    <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2.5 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Edition</span>
                        <span className="font-semibold text-slate-700">{book.edition}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                        <span className="font-semibold text-slate-700">{book.shelf}</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-slate-200/60">
                        <span className="text-slate-400 text-[10px] uppercase font-bold mr-1">ISBN:</span>
                        <span className="font-mono text-slate-600">{book.isbn}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold text-slate-500">
                      Total copies: <strong>{book.total}</strong>
                    </span>

                    {isReserved ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800">
                        <CheckCircle2 className="h-4 w-4" />
                        Reserved
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleReserve(book)}
                        disabled={!isAvailable}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                          isAvailable
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:scale-95'
                            : 'cursor-not-allowed bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isAvailable ? 'Reserve for Pickup' : 'Join Waitlist'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBooks.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-3 text-lg font-bold text-slate-800">No books found</h3>
              <p className="mt-1 text-sm text-slate-500">
                Try searching for another keyword or select "All" categories.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Borrowed Books */}
      {activeTab === 'issued' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <h3 className="text-base font-bold text-slate-900">Current Borrowings & Due Dates</h3>
              <p className="text-xs text-slate-500">
                Students can hold up to 3 books concurrently for a 14-day duration.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {issuedBooks.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold ${
                        item.status === 'overdue'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      <BookOpen className="h-6 w-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                        {item.status === 'overdue' && (
                          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-700">
                            Overdue
                          </span>
                        )}
                        {item.status === 'renewed' && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                            Renewed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Author: {item.author}</p>
                      <div className="mt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
                        <span>Issued: {item.issueDate}</span>
                        <span className={item.status === 'overdue' ? 'text-rose-600 font-bold' : ''}>
                          Due Date: {item.dueDate}
                        </span>
                        {item.fine > 0 && (
                          <span className="text-rose-600 font-bold">Accumulated Fine: ₹{item.fine}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleRenew(item.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
                    >
                      <RotateCw className="h-3.5 w-3.5 text-blue-600" />
                      Renew 14 Days
                    </button>
                    {item.fine > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          alert(`Redirecting to online campus payment gateway for ₹${item.fine}`)
                        }
                        className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700"
                      >
                        Pay ₹{item.fine} Fine
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Digital E-Resources */}
      {activeTab === 'digital' && (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                IEEE Xplore
              </span>
              <ExternalLink className="h-4 w-4 text-slate-400" />
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900">IEEE Electronic Library (IEL)</h3>
            <p className="mt-1 text-xs text-slate-500">
              Campus institutional IP access to 5M+ journal papers, conference proceedings, and standards.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600">● IP Authenticated</span>
              <a
                href="https://ieeexplore.ieee.org"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Access Portal &rarr;
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-purple-50 px-2 py-1 text-xs font-bold text-purple-700">
                ACM Digital Library
              </span>
              <ExternalLink className="h-4 w-4 text-slate-400" />
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900">ACM Full-Text Collection</h3>
            <p className="mt-1 text-xs text-slate-500">
              Complete archive of ACM publications including computing surveys, transactions, and SIGs.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600">● Campus Access Active</span>
              <a
                href="https://dl.acm.org"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Access Portal &rarr;
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">
                NPTEL & SWAYAM
              </span>
              <Download className="h-4 w-4 text-slate-400" />
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900">Semester Course Lecture Notes</h3>
            <p className="mt-1 text-xs text-slate-500">
              Curated lecture transcripts, video offline archives, and problem sets for CS501–CS509.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">12 Course Packs</span>
              <button
                type="button"
                onClick={() => alert('Downloading selected course syllabus pack...')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Download Pack &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
