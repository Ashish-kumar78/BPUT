import { useState } from 'react'
import {
  AlertCircle,
  BookOpen,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Star,
  Trophy,
  X,
} from 'lucide-react'
import './OnlineExamPage.css'

const availableTests = [
  {
    id: 'quiz-ai-1',
    subject: 'Artificial Intelligence',
    code: 'CS501',
    title: 'Unit Test 1 – Foundations of AI',
    questions: 20,
    duration: 30,
    maxMarks: 20,
    deadline: '20 Oct 2026',
    attempts: 1,
    status: 'available',
  },
  {
    id: 'quiz-ml-1',
    subject: 'Machine Learning',
    code: 'CS502',
    title: 'Unit Quiz – Supervised Learning',
    questions: 15,
    duration: 20,
    maxMarks: 15,
    deadline: '18 Oct 2026',
    attempts: 1,
    status: 'available',
  },
  {
    id: 'quiz-cc-1',
    subject: 'Cloud Computing',
    code: 'CS503',
    title: 'Module 1 Quiz – Cloud Fundamentals',
    questions: 10,
    duration: 15,
    maxMarks: 10,
    deadline: '15 Oct 2026',
    attempts: 2,
    status: 'completed',
    score: 9,
    maxScore: 10,
  },
]

const sampleQuestions = [
  {
    id: 1,
    question: 'Which of the following is a type of Artificial Intelligence?',
    options: ['Narrow AI', 'General AI', 'Super AI', 'All of the above'],
    correct: 3,
  },
  {
    id: 2,
    question: 'The Turing Test was proposed by:',
    options: ['John McCarthy', 'Alan Turing', 'Marvin Minsky', 'Claude Shannon'],
    correct: 1,
  },
  {
    id: 3,
    question: 'Which search algorithm explores all nodes at the present depth before moving to deeper nodes?',
    options: ['Depth First Search', 'Breadth First Search', 'A* Search', 'Hill Climbing'],
    correct: 1,
  },
  {
    id: 4,
    question: 'In a knowledge-based agent, the knowledge base is a set of:',
    options: ['Actions', 'Sentences', 'Goals', 'Percepts'],
    correct: 1,
  },
  {
    id: 5,
    question: 'Which of the following is NOT a component of an intelligent agent?',
    options: ['Sensors', 'Actuators', 'Compiler', 'Knowledge Base'],
    correct: 2,
  },
]

export default function OnlineExamPage() {
  const [view, setView] = useState('list') // list | instructions | exam | result
  const [selectedTest, setSelectedTest] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 min in seconds
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [score, setScore] = useState(null)

  function startExam(test) {
    setSelectedTest(test)
    setCurrentQuestion(0)
    setAnswers({})
    setView('instructions')
  }

  function beginExam() {
    setView('exam')
  }

  function selectAnswer(qId, optionIndex) {
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }))
  }

  function submitExam() {
    let correct = 0
    sampleQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) correct++
    })
    setScore(correct)
    setExamSubmitted(true)
    setView('result')
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  if (view === 'instructions' && selectedTest) {
    return (
      <div className="online-exam-page">
        <div className="exam-instructions">
          <div className="instructions-header">
            <ClipboardList size={28} />
            <h2>Exam Instructions</h2>
            <p>{selectedTest.title}</p>
          </div>
          <div className="instructions-meta-grid">
            <div><Clock size={14} /><span>Duration</span><strong>{selectedTest.duration} minutes</strong></div>
            <div><BookOpen size={14} /><span>Questions</span><strong>{selectedTest.questions}</strong></div>
            <div><Star size={14} /><span>Max Marks</span><strong>{selectedTest.maxMarks}</strong></div>
            <div><AlertCircle size={14} /><span>Attempts</span><strong>{selectedTest.attempts}</strong></div>
          </div>
          <ul className="instructions-list">
            <li><Check size={12} />Read each question carefully before answering.</li>
            <li><Check size={12} />All questions are compulsory. Each carries 1 mark.</li>
            <li><Check size={12} />Once started, the timer cannot be paused.</li>
            <li><Check size={12} />Do not refresh or close the browser tab during the exam.</li>
            <li><Check size={12} />You can review and change answers before final submission.</li>
            <li><Check size={12} />The exam will auto-submit when the timer expires.</li>
          </ul>
          <div className="instructions-actions">
            <button className="instructions-cancel" onClick={() => setView('list')}>
              <ChevronLeft size={14} />Back
            </button>
            <button className="instructions-start" onClick={beginExam}>
              Start Exam <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'exam' && selectedTest) {
    const q = sampleQuestions[currentQuestion]
    const answered = Object.keys(answers).length
    const progress = (answered / sampleQuestions.length) * 100

    return (
      <div className="online-exam-page exam-active">
        <div className="exam-topbar">
          <div className="exam-topbar-left">
            <ClipboardList size={16} />
            <span>{selectedTest.title}</span>
          </div>
          <div className="exam-timer">
            <Clock size={14} />
            <strong>{formatTime(timeLeft)}</strong>
          </div>
          <button className="exam-submit-btn" onClick={submitExam}>Submit Exam</button>
        </div>

        <div className="exam-body">
          <div className="exam-question-area">
            <div className="exam-question-meta">
              <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
              <span>{answered} answered</span>
            </div>
            <div className="exam-progress-bar">
              <div className="exam-progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="exam-question-card">
              <p className="exam-question-text">
                <span className="q-number">Q{currentQuestion + 1}.</span>
                {q.question}
              </p>
              <div className="exam-options">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className={`exam-option ${answers[q.id] === i ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[q.id] === i}
                      onChange={() => selectAnswer(q.id, i)}
                    />
                    <span className="opt-letter">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="exam-nav-buttons">
              <button
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion((c) => c - 1)}
              >
                <ChevronLeft size={14} />Previous
              </button>
              <button
                disabled={currentQuestion === sampleQuestions.length - 1}
                onClick={() => setCurrentQuestion((c) => c + 1)}
              >
                Next<ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="exam-palette">
            <p>Question Palette</p>
            <div className="palette-grid">
              {sampleQuestions.map((question, i) => (
                <button
                  key={i}
                  className={`palette-btn ${i === currentQuestion ? 'current' : ''} ${answers[question.id] !== undefined ? 'answered' : ''}`}
                  onClick={() => setCurrentQuestion(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="palette-legend">
              <span className="palette-answered">Answered</span>
              <span className="palette-not-answered">Not Answered</span>
              <span className="palette-current">Current</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'result') {
    const percentage = ((score / sampleQuestions.length) * 100).toFixed(0)
    return (
      <div className="online-exam-page">
        <div className="exam-result-card">
          <div className={`result-icon ${score >= 14 ? 'excellent' : score >= 10 ? 'good' : 'average'}`}>
            <Trophy size={34} />
          </div>
          <h2>Exam Submitted!</h2>
          <p>Your response has been recorded for <strong>{selectedTest?.title}</strong></p>
          <div className="result-score-display">
            <strong>{score}</strong>
            <span>/ {sampleQuestions.length}</span>
          </div>
          <div className="result-percentage">{percentage}%</div>
          <div className="result-review">
            {sampleQuestions.map((q, i) => (
              <div key={i} className={`result-q-row ${answers[q.id] === q.correct ? 'correct' : 'incorrect'}`}>
                <span className="result-q-icon">
                  {answers[q.id] === q.correct ? <Check size={12} /> : <X size={12} />}
                </span>
                <span className="result-q-text">Q{i + 1}. {q.question}</span>
              </div>
            ))}
          </div>
          <button className="instructions-start" onClick={() => setView('list')}>
            Back to Tests
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="online-exam-page">
      <div className="online-exam-header">
        <div>
          <p className="online-exam-kicker"><ClipboardList size={13} />ONLINE EXAMINATION</p>
          <h2>Online Examination</h2>
          <p className="online-exam-caption">Attempt unit tests, quizzes and practice assessments assigned by faculty.</p>
        </div>
      </div>

      <div className="online-exam-list">
        {availableTests.map((test) => (
          <div key={test.id} className={`online-exam-card ${test.status}`}>
            <div className="oec-subject">
              <span className="oec-code">{test.code}</span>
              <span className="oec-subject-name">{test.subject}</span>
            </div>
            <div className="oec-body">
              <h3>{test.title}</h3>
              <div className="oec-meta">
                <span><BookOpen size={11} />{test.questions} questions</span>
                <span><Clock size={11} />{test.duration} min</span>
                <span><Star size={11} />{test.maxMarks} marks</span>
                <span><AlertCircle size={11} />Due: {test.deadline}</span>
              </div>
            </div>
            <div className="oec-action">
              {test.status === 'completed' ? (
                <div className="oec-completed">
                  <CheckCircle size={16} />
                  <div>
                    <strong>{test.score}/{test.maxScore}</strong>
                    <small>Completed</small>
                  </div>
                </div>
              ) : (
                <button className="oec-start-btn" onClick={() => startExam(test)}>
                  Start Test <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
