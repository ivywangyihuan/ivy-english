export interface SessionQuestionDetail {
  number?: number;
  question: string;
  answer?: string;
  correctAnswer?: string;
  isCorrect?: boolean;
}

export interface SessionDetail {
  sessionId: string;
  kind: "daily" | "ielts";
  subtype: string;
  completedAt: string;
  prompt?: string;
  sourceTitle?: string;
  sourceText?: string;
  userResponse?: string;
  mediaLabel?: string;
  recordingIds?: string[];
  questions?: SessionQuestionDetail[];
  highlights?: string[];
  notes?: string;
  vocabulary?: string[];
  metrics?: Record<string, string | number | boolean>;
}

const KEY = "ivy-english-session-details-v1";

function read(): Record<string, SessionDetail> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as Record<string, SessionDetail> : {};
  } catch {
    return {};
  }
}

function write(value: Record<string, SessionDetail>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(value));
}

export function saveSessionDetail(detail: SessionDetail) {
  const current = read();
  current[detail.sessionId] = detail;
  write(current);
  return detail;
}

export function getSessionDetail(sessionId: string) {
  return read()[sessionId] ?? null;
}

export function listSessionDetails() {
  return Object.values(read()).sort((a, b) => b.completedAt.localeCompare(a.completedAt));
}

export function removeSessionDetail(sessionId: string) {
  const current = read();
  delete current[sessionId];
  write(current);
}
