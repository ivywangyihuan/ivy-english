export type ExamModule = 'reading' | 'listening' | 'writing' | 'speaking'

export type ExamSessionStatus = 'in_progress' | 'completed' | 'abandoned'

export interface ExamAnswerRecord {
  questionId: string
  answer: string
  correctAnswer?: string
  isCorrect?: boolean
}

export interface ExamSession {
  id: string
  module: ExamModule
  mode: 'practice' | 'full_exam'
  startedAt: string
  completedAt?: string
  status: ExamSessionStatus
  durationSeconds: number
  answers: ExamAnswerRecord[]
  score?: number
  notes?: string[]
  highlights?: string[]
  vocabulary?: string[]
}

const STORAGE_KEY = 'ivy-english-exam-sessions'

function readSessions(): ExamSession[] {
  if (typeof window === 'undefined') return []

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function writeSessions(sessions: ExamSession[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

export function createExamSession(
  session: Omit<ExamSession, 'id' | 'startedAt' | 'status'>,
): ExamSession {
  return {
    ...session,
    id: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
    status: 'in_progress',
  }
}

export function saveExamSession(session: ExamSession) {
  const sessions = readSessions().filter((item) => item.id !== session.id)
  writeSessions([session, ...sessions])
}

export function completeExamSession(
  id: string,
  result: Pick<ExamSession, 'score' | 'answers' | 'durationSeconds'>,
) {
  const sessions = readSessions().map((session) =>
    session.id === id
      ? {
          ...session,
          ...result,
          completedAt: new Date().toISOString(),
          status: 'completed' as const,
        }
      : session,
  )

  writeSessions(sessions)
}

export function getExamHistory() {
  return readSessions()
}
