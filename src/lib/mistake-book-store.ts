export type MistakeSource = 'reading' | 'listening' | 'writing' | 'speaking'

export interface MistakeRecord {
  id: string
  source: MistakeSource
  questionId: string
  prompt: string
  userAnswer: string
  correctAnswer?: string
  category?: string
  createdAt: string
  reviewed: boolean
}

const STORAGE_KEY = 'ivy-english-mistakes'

function readMistakes(): MistakeRecord[] {
  if (typeof window === 'undefined') return []

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function writeMistakes(items: MistakeRecord[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addMistake(
  mistake: Omit<MistakeRecord, 'id' | 'createdAt' | 'reviewed'>,
) {
  const item: MistakeRecord = {
    ...mistake,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    reviewed: false,
  }

  writeMistakes([item, ...readMistakes()])
  return item
}

export function getMistakes() {
  return readMistakes()
}

export function markMistakeReviewed(id: string) {
  writeMistakes(
    readMistakes().map((item) =>
      item.id === id ? { ...item, reviewed: true } : item,
    ),
  )
}
