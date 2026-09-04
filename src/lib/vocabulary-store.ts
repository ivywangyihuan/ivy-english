export interface VocabularyItem {
  id: string
  word: string
  definition?: string
  source: 'reading' | 'listening' | 'writing' | 'speaking'
  context?: string
  createdAt: string
  reviewed: boolean
}

const STORAGE_KEY = 'ivy-english-vocabulary'

function readItems(): VocabularyItem[] {
  if (typeof window === 'undefined') return []

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function writeItems(items: VocabularyItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addVocabularyItem(item: Omit<VocabularyItem, 'id' | 'createdAt' | 'reviewed'>) {
  const next: VocabularyItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    reviewed: false,
  }

  writeItems([next, ...readItems()])
  return next
}

export function getVocabulary() {
  return readItems()
}

export function markVocabularyReviewed(id: string) {
  writeItems(readItems().map((item) => item.id === id ? { ...item, reviewed: true } : item))
}
