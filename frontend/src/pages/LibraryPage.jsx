import { useState } from 'react'
import {
  AlertCircle,
  BookMarked,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Download,
  LibraryBig,
  Search,
  Star,
  User,
} from 'lucide-react'
import { downloadLibraryBookPdf } from '../utils/pdfGenerator'
import './LibraryPage.css'

const catalog = [
  { id: 'BK001', title: 'Artificial Intelligence: A Modern Approach', author: 'Russell & Norvig', edition: '4th', available: 3, total: 5, category: 'AI/ML' },
  { id: 'BK002', title: 'Pattern Recognition and Machine Learning', author: 'Bishop', edition: '1st', available: 1, total: 3, category: 'AI/ML' },
  { id: 'BK003', title: 'Introduction to Algorithms', author: 'Cormen et al.', edition: '3rd', available: 2, total: 6, category: 'CS Theory' },
  { id: 'BK004', title: 'Computer Networks', author: 'Tanenbaum & Wetherall', edition: '5th', available: 0, total: 4, category: 'Networking' },
  { id: 'BK005', title: 'Operating Systems: Three Easy Pieces', author: 'Arpaci-Dusseau', edition: '1.10', available: 4, total: 4, category: 'Systems' },
  { id: 'BK006', title: 'Cloud Computing: Concepts, Technology & Architecture', author: 'Erl et al.', edition: '1st', available: 2, total: 3, category: 'Cloud' },
  { id: 'BK007', title: 'Compilers: Principles, Techniques and Tools', author: 'Aho et al.', edition: '2nd', available: 1, total: 4, category: 'Compilers' },
  { id: 'BK008', title: 'Deep Learning', author: 'Goodfellow, Bengio & Courville', edition: '1st', available: 2, total: 3, category: 'AI/ML' },
]

const issuedBooks = [
  { id: 'ISS001', bookId: 'BK003', title: 'Introduction to Algorithms', issueDate: '20 Sep 2026', dueDate: '10 Oct 2026', status: 'overdue', fine: 40 },
  { id: 'ISS002', bookId: 'BK007', title: 'Compilers: Principles, Techniques and Tools', issueDate: '25 Sep 2026', dueDate: '15 Oct 2026', status: 'issued', fine: 0 },
]

const categories = ['All', 'AI/ML', 'CS Theory', 'Networking', 'Systems', 'Cloud', 'Compilers']

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('catalog')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [reservedBooks, setReservedBooks] = useState({})
  const [reserveMsg, setReserveMsg] = useState('')

  const filteredBooks = catalog.filter((book) => {
    const q = searchQuery.toLowerCase()
    const matchQuery = !q || book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q) || book.category.toLowerCase().includes(q)
    const matchCat = selectedCategory === 'All' || book.category === selectedCategory
    return matchQuery && matchCat
  })

  function reserveBook(book) {
    if (book.available === 0) return
    setReservedBooks((prev) => ({ ...prev, [book.id]: true }))
    setReserveMsg(`"${book.title}" has been reserved. Please collect it from the library counter within 24 hours.`)
    setTimeout(() => setReserveMsg(''), 5000)
  }

  return (
    <div className="library-page">
      <div className="library-header">
        <div>
          <p className="library-kicker"><LibraryBig size={13} />CAMPUS LIBRARY</p>
          <h2>Library</h2>
          <p className="library-caption">Search catalog, manage issue history and reserve books online.</p>
        </div>
        <div className="library-hours">
          <Clock size={13} />
          <div>
            <strong>Library Hours</strong>
            <small>Mon–Sat: 8 AM – 8 PM &nbsp;|&nbsp; Sun: 10 AM – 4 PM</small>
          </div>
        </div>
      </div>

      <div className="library-summary-strip">
        <div><BookOpen size={16} /><strong>2</strong><small>Books Issued</small></div>
        <div><AlertCircle size={16} /><strong style={{ color: '#c0392b' }}>₹40</strong><small>Fine Pending</small></div>
        <div><BookMarked size={16} /><strong>{Object.keys(reservedBooks).length}</strong><small>Reserved</small></div>
        <div><Star size={16} /><strong>24</strong><small>Wishlist</small></div>
      </div>

      <div className="library-tabs" role="tablist">
        {[
          { key: 'catalog', label: 'Book Catalog' },
          { key: 'issued', label: 'My Books' },
          { key: 'history', label: 'Borrow History' },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={activeTab === key ? 'active' : ''}
            role="tab"
            aria-selected={activeTab === key}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {reserveMsg && (
        <div className="library-reserve-msg">
          <Check size={13} />{reserveMsg}
        </div>
      )}

      {activeTab === 'catalog' && (
        <div className="library-catalog">
          <div className="catalog-controls">
            <label className="library-search">
              <Search size={14} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author or subject..."
              />
            </label>
            <div className="catalog-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={selectedCategory === cat ? 'active' : ''}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="book-grid">
            {filteredBooks.map((book) => (
              <div key={book.id} className={`book-card ${book.available === 0 ? 'unavailable' : ''}`}>
                <div className="book-card-icon">
                  <BookOpen size={28} />
                </div>
                <div className="book-card-body">
                  <span className="book-category">{book.category}</span>
                  <h3>{book.title}</h3>
                  <p className="book-author"><User size={11} />{book.author} · {book.edition} Edition</p>
                  <div className="book-availability">
                    <span className={book.available > 0 ? 'available' : 'not-available'}>
                      {book.available > 0 ? `${book.available} available` : 'Not available'}
                    </span>
                    <small>({book.total} total)</small>
                  </div>
                </div>
                <div className="book-card-actions">
                  {reservedBooks[book.id] ? (
                    <span className="book-reserved"><Check size={12} />Reserved</span>
                  ) : (
                    <button
                      className="book-reserve-btn"
                      disabled={book.available === 0}
                      onClick={() => reserveBook(book)}
                    >
                      {book.available === 0 ? 'Unavailable' : 'Reserve'}
                      {book.available > 0 && <ChevronRight size={12} />}
                    </button>
                  )}
                  <button className="book-detail-btn" onClick={() => downloadLibraryBookPdf(book)}>
                    <Download size={12} />E-Copy
                  </button>
                </div>
              </div>
            ))}
            {filteredBooks.length === 0 && (
              <p className="library-empty">No books match your search or filter.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'issued' && (
        <div className="library-issued">
          {issuedBooks.length === 0 ? (
            <div className="library-empty-state">
              <BookOpen size={32} />
              <strong>No books currently issued</strong>
              <p>Browse the catalog to reserve books for pickup.</p>
            </div>
          ) : (
            <div className="issued-list">
              {issuedBooks.map((issue) => (
                <div key={issue.id} className={`issued-card ${issue.status}`}>
                  <div className="issued-icon"><BookOpen size={22} /></div>
                  <div className="issued-body">
                    <h3>{issue.title}</h3>
                    <div className="issued-meta">
                      <span><strong>Issued:</strong> {issue.issueDate}</span>
                      <span><strong>Due:</strong> {issue.dueDate}</span>
                    </div>
                    {issue.fine > 0 && (
                      <div className="issued-fine">
                        <AlertCircle size={12} />
                        Fine pending: <strong>₹{issue.fine}</strong>
                      </div>
                    )}
                  </div>
                  <span className={`issued-status-tag ${issue.status}`}>
                    {issue.status === 'overdue' ? 'Overdue' : 'Issued'}
                  </span>
                </div>
              ))}
              <div className="issued-total-fine">
                <AlertCircle size={14} />
                <span>Total fine pending: <strong>₹40.00</strong></span>
                <button className="pay-fine-btn">Pay Fine</button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="library-history">
          <div className="history-table-wrap">
            <table className="library-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book Title</th>
                  <th>Issue Date</th>
                  <th>Return Date</th>
                  <th>Fine Paid</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['BK001', 'Introduction to Algorithms', '01 Aug 2026', '22 Aug 2026', '₹0', 'Returned'],
                  ['BK002', 'Computer Networks', '10 Jul 2026', '02 Aug 2026', '₹20', 'Returned'],
                  ['BK003', 'Operating Systems: Three Easy Pieces', '15 Jun 2026', '06 Jul 2026', '₹0', 'Returned'],
                ].map(([id, title, issue, ret, fine, status], idx) => (
                  <tr key={id}>
                    <td>{idx + 1}</td>
                    <td><strong>{title}</strong></td>
                    <td>{issue}</td>
                    <td>{ret}</td>
                    <td>{fine}</td>
                    <td><span className="history-status returned">{status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
