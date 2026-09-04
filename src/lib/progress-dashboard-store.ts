import { getExamHistory } from './exam-engine-store'
import { getMistakes } from './mistake-book-store'

export function getProgressDashboard() {
  const sessions = getExamHistory()
  const mistakes = getMistakes()

  const completed = sessions.filter((session) => session.status === 'completed')

  return {
    totalSessions: sessions.length,
    completedSessions: completed.length,
    totalMistakes: mistakes.length,
    moduleBreakdown: {
      reading: sessions.filter((s) => s.module === 'reading').length,
      listening: sessions.filter((s) => s.module === 'listening').length,
      writing: sessions.filter((s) => s.module === 'writing').length,
      speaking: sessions.filter((s) => s.module === 'speaking').length,
    },
    recentSessions: sessions.slice(0, 10),
  }
}
