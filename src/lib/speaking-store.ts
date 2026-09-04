export interface SpeakingAttempt {
  id: string
  part: 'part1' | 'part2' | 'part3'
  prompt: string
  durationSeconds: number
  audioUrl?: string
  createdAt: string
  notes?: string
}

const STORAGE_KEY = 'ivy-english-speaking-attempts'

function readAttempts(): SpeakingAttempt[] {
  if (typeof window === 'undefined') return []

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveSpeakingAttempt(attempt: Omit<SpeakingAttempt, 'id' | 'createdAt'>) {
  const item = {
    ...attempt,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }

  const attempts = [item, ...readAttempts()]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts))
  return item
}

export function getSpeakingHistory() {
  return readAttempts()
}
