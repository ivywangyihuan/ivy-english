import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { questions as seedQuestions } from "@/data/mock";
import type { LearningSignal, Module, Question, SignalStatus, StudySession } from "@/data/mock";

interface PlanItem {
  module: string;
  minutes: number;
  hint: string;
}

export type LearningStageKey = "foundation" | "familiarisation" | "targeted" | "exam";
export type MistakeStatus = "待复习" | "已复习" | "已掌握";
export type VocabularyStatus = "新词" | "复习中" | "已掌握";
export type LibraryItemType = "pdf" | "link" | "question" | "note";

export interface MistakeRecord {
  id: string;
  module: Module;
  source: string;
  questionNumber?: number;
  question: string;
  answer: string;
  correctAnswer: string;
  kind?: string;
  status: MistakeStatus;
  createdAt: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  module: Module;
  source: string;
  context?: string;
  meaning?: string;
  notes?: string;
  status: VocabularyStatus;
  createdAt: string;
}

export interface LibraryItem {
  id: string;
  type: LibraryItemType;
  title: string;
  module?: Module;
  url?: string;
  notes?: string;
  createdAt: string;
}

export const learningStages: {
  key: LearningStageKey;
  label: string;
  english: string;
  description: string;
}[] = [
  { key: "foundation", label: "英语基础阶段", english: "English Foundation", description: "以真实英语输入、表达习惯和基础能力为主，低频接触 IELTS。" },
  { key: "familiarisation", label: "IELTS 熟悉阶段", english: "IELTS Familiarisation", description: "开始熟悉题型、机考界面和评分要求，但不进入高强度刷题。" },
  { key: "targeted", label: "IELTS 定向训练阶段", english: "Targeted Training", description: "围绕薄弱项、题型和分项目标做更系统的专项训练。" },
  { key: "exam", label: "IELTS 考试阶段", english: "Exam Mode", description: "临近考试时使用，增加完整计时练习、模考和考前复盘。" },
];

interface AppState {
  sessions: StudySession[];
  addSession: (s: Omit<StudySession, "id">) => string;
  questions: Question[];
  markPracticed: (id: string) => void;
  signals: LearningSignal[];
  updateSignalStatus: (id: string, status: SignalStatus) => void;
  mistakes: MistakeRecord[];
  addMistakes: (items: Omit<MistakeRecord, "id" | "createdAt" | "status">[]) => void;
  updateMistakeStatus: (id: string, status: MistakeStatus) => void;
  removeMistake: (id: string) => void;
  vocabulary: VocabularyItem[];
  addVocabulary: (item: Omit<VocabularyItem, "id" | "createdAt" | "status">) => void;
  updateVocabularyStatus: (id: string, status: VocabularyStatus) => void;
  removeVocabulary: (id: string) => void;
  libraryItems: LibraryItem[];
  addLibraryItem: (item: Omit<LibraryItem, "id" | "createdAt">) => void;
  removeLibraryItem: (id: string) => void;
  learningStage: LearningStageKey;
  setLearningStage: (stage: LearningStageKey) => void;
  plan: PlanItem[];
  isShortPlan: boolean;
  setShortPlan: (v: boolean) => void;
  captureOpen: boolean;
  setCaptureOpen: (v: boolean) => void;
}

const fullPlan: PlanItem[] = [
  { module: "听力", minutes: 20, hint: "访谈盲听 · 逐句对照" },
  { module: "口语", minutes: 10, hint: "一分钟话题" },
  { module: "词汇", minutes: 8, hint: "昨天的生词回顾" },
];
const shortPlan: PlanItem[] = [
  { module: "听力", minutes: 12, hint: "一段 3 分钟素材" },
  { module: "词汇", minutes: 8, hint: "昨天的生词回顾" },
];

const Ctx = createContext<AppState | null>(null);
const keys = {
  stage: "ivy-english-learning-stage",
  sessions: "ivy-english-sessions-v2",
  questions: "ivy-english-questions-v2",
  signals: "ivy-english-signals-v2",
  mistakes: "ivy-english-mistakes-v1",
  vocabulary: "ivy-english-vocabulary-v1",
  library: "ivy-english-library-v1",
  demoMigration: "ivy-english-demo-history-migrated-v1",
};

const LEGACY_DEMO_SESSION_IDS = new Set(["s1", "s2", "s3", "s4", "s5"]);
const LEGACY_DEMO_SIGNAL_IDS = new Set(["g1", "g2", "g3", "g4"]);

function readSaved<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function stripLegacyDemoRecords(sessions: StudySession[], signals: LearningSignal[]) {
  return {
    sessions: sessions.filter((item) => !LEGACY_DEMO_SESSION_IDS.has(item.id)),
    signals: signals.filter((item) => !LEGACY_DEMO_SIGNAL_IDS.has(item.id)),
  };
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [questionList, setQuestionList] = useState<Question[]>(seedQuestions);
  const [signals, setSignals] = useState<LearningSignal[]>([]);
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [learningStage, setLearningStageState] = useState<LearningStageKey>("foundation");
  const [isShortPlan, setShortPlan] = useState(false);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedStage = window.localStorage.getItem(keys.stage) as LearningStageKey | null;
    if (savedStage && learningStages.some((stage) => stage.key === savedStage)) setLearningStageState(savedStage);

    const savedSessions = readSaved(keys.sessions, [] as StudySession[]);
    const savedSignals = readSaved(keys.signals, [] as LearningSignal[]);
    const cleaned = stripLegacyDemoRecords(savedSessions, savedSignals);

    setSessions(cleaned.sessions);
    setQuestionList(readSaved(keys.questions, seedQuestions));
    setSignals(cleaned.signals);
    setMistakes(readSaved(keys.mistakes, [] as MistakeRecord[]));
    setVocabulary(readSaved(keys.vocabulary, [] as VocabularyItem[]));
    setLibraryItems(readSaved(keys.library, [] as LibraryItem[]));

    if (!window.localStorage.getItem(keys.demoMigration)) {
      window.localStorage.setItem(keys.sessions, JSON.stringify(cleaned.sessions));
      window.localStorage.setItem(keys.signals, JSON.stringify(cleaned.signals));
      window.localStorage.setItem(keys.demoMigration, new Date().toISOString());
    }
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) window.localStorage.setItem(keys.sessions, JSON.stringify(sessions)); }, [hydrated, sessions]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(keys.questions, JSON.stringify(questionList)); }, [hydrated, questionList]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(keys.signals, JSON.stringify(signals)); }, [hydrated, signals]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(keys.mistakes, JSON.stringify(mistakes)); }, [hydrated, mistakes]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(keys.vocabulary, JSON.stringify(vocabulary)); }, [hydrated, vocabulary]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(keys.library, JSON.stringify(libraryItems)); }, [hydrated, libraryItems]);

  const setLearningStage = useCallback((stage: LearningStageKey) => {
    setLearningStageState(stage);
    window.localStorage.setItem(keys.stage, stage);
  }, []);

  const addSession = useCallback((s: Omit<StudySession, "id">) => {
    const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setSessions((prev) => [{ ...s, id }, ...prev]);
    return id;
  }, []);

  const markPracticed = useCallback((id: string) => {
    setQuestionList((prev) => prev.map((q) => q.id === id ? { ...q, practiceCount: q.practiceCount + 1, status: q.practiceCount === 0 ? "练过 1 次" : "练过多次" } : q));
  }, []);

  const updateSignalStatus = useCallback((id: string, status: SignalStatus) => {
    setSignals((prev) => prev.map((signal) => signal.id === id ? { ...signal, status } : signal));
  }, []);

  const addMistakes = useCallback((items: Omit<MistakeRecord, "id" | "createdAt" | "status">[]) => {
    if (!items.length) return;
    const now = new Date().toISOString();
    setMistakes((prev) => [
      ...items.map((item, index) => ({ ...item, id: `mistake-${Date.now()}-${index}`, createdAt: now, status: "待复习" as const })),
      ...prev,
    ]);
  }, []);
  const updateMistakeStatus = useCallback((id: string, status: MistakeStatus) => setMistakes((prev) => prev.map((item) => item.id === id ? { ...item, status } : item)), []);
  const removeMistake = useCallback((id: string) => setMistakes((prev) => prev.filter((item) => item.id !== id)), []);

  const addVocabulary = useCallback((item: Omit<VocabularyItem, "id" | "createdAt" | "status">) => {
    const word = item.word.trim();
    if (!word) return;
    setVocabulary((prev) => {
      const existing = prev.find((entry) => entry.word.toLowerCase() === word.toLowerCase());
      if (existing) return prev.map((entry) => entry.id === existing.id ? { ...entry, ...item, word, status: entry.status } : entry);
      return [{ ...item, word, id: `vocab-${Date.now()}`, createdAt: new Date().toISOString(), status: "新词" }, ...prev];
    });
  }, []);
  const updateVocabularyStatus = useCallback((id: string, status: VocabularyStatus) => setVocabulary((prev) => prev.map((item) => item.id === id ? { ...item, status } : item)), []);
  const removeVocabulary = useCallback((id: string) => setVocabulary((prev) => prev.filter((item) => item.id !== id)), []);

  const addLibraryItem = useCallback((item: Omit<LibraryItem, "id" | "createdAt">) => {
    setLibraryItems((prev) => [{ ...item, id: `library-${Date.now()}`, createdAt: new Date().toISOString() }, ...prev]);
  }, []);
  const removeLibraryItem = useCallback((id: string) => setLibraryItems((prev) => prev.filter((item) => item.id !== id)), []);

  const value = useMemo(() => ({
    sessions, addSession,
    questions: questionList, markPracticed,
    signals, updateSignalStatus,
    mistakes, addMistakes, updateMistakeStatus, removeMistake,
    vocabulary, addVocabulary, updateVocabularyStatus, removeVocabulary,
    libraryItems, addLibraryItem, removeLibraryItem,
    learningStage, setLearningStage,
    plan: isShortPlan ? shortPlan : fullPlan,
    isShortPlan, setShortPlan,
    captureOpen, setCaptureOpen,
  }), [sessions, addSession, questionList, markPracticed, signals, updateSignalStatus, mistakes, addMistakes, updateMistakeStatus, removeMistake, vocabulary, addVocabulary, updateVocabularyStatus, removeVocabulary, libraryItems, addLibraryItem, removeLibraryItem, learningStage, setLearningStage, isShortPlan, captureOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
