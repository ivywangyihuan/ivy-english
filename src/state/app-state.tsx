import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { learningSignals as seedSignals, questions as seedQuestions, studySessions as seedSessions } from "@/data/mock";
import type { LearningSignal, Question, SignalStatus, StudySession } from "@/data/mock";

interface PlanItem {
  module: string;
  minutes: number;
  hint: string;
}

export type LearningStageKey = "foundation" | "familiarisation" | "targeted" | "exam";

export const learningStages: {
  key: LearningStageKey;
  label: string;
  english: string;
  description: string;
}[] = [
  {
    key: "foundation",
    label: "英语基础阶段",
    english: "English Foundation",
    description: "以真实英语输入、表达习惯和基础能力为主，低频接触 IELTS。",
  },
  {
    key: "familiarisation",
    label: "IELTS 熟悉阶段",
    english: "IELTS Familiarisation",
    description: "开始熟悉题型、机考界面和评分要求，但不进入高强度刷题。",
  },
  {
    key: "targeted",
    label: "IELTS 定向训练阶段",
    english: "Targeted Training",
    description: "围绕薄弱项、题型和分项目标做更系统的专项训练。",
  },
  {
    key: "exam",
    label: "IELTS 考试阶段",
    english: "Exam Mode",
    description: "临近考试时使用，增加完整计时练习、模考和考前复盘。",
  },
];

interface AppState {
  sessions: StudySession[];
  addSession: (s: Omit<StudySession, "id">) => void;
  questions: Question[];
  markPracticed: (id: string) => void;
  signals: LearningSignal[];
  updateSignalStatus: (id: string, status: SignalStatus) => void;
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

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<StudySession[]>(seedSessions);
  const [questionList, setQuestionList] = useState<Question[]>(seedQuestions);
  const [signals, setSignals] = useState<LearningSignal[]>(seedSignals);
  const [learningStage, setLearningStage] = useState<LearningStageKey>("foundation");
  const [isShortPlan, setShortPlan] = useState(false);
  const [captureOpen, setCaptureOpen] = useState(false);

  const addSession = useCallback((s: Omit<StudySession, "id">) => {
    setSessions((prev) => [{ ...s, id: `local-${Date.now()}` }, ...prev]);
  }, []);

  const markPracticed = useCallback((id: string) => {
    setQuestionList((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              practiceCount: q.practiceCount + 1,
              status: q.practiceCount === 0 ? "练过 1 次" : "练过多次",
            }
          : q,
      ),
    );
  }, []);

  const updateSignalStatus = useCallback((id: string, status: SignalStatus) => {
    setSignals((prev) => prev.map((signal) => (signal.id === id ? { ...signal, status } : signal)));
  }, []);

  const value = useMemo(
    () => ({
      sessions,
      addSession,
      questions: questionList,
      markPracticed,
      signals,
      updateSignalStatus,
      learningStage,
      setLearningStage,
      plan: isShortPlan ? shortPlan : fullPlan,
      isShortPlan,
      setShortPlan,
      captureOpen,
      setCaptureOpen,
    }),
    [
      sessions,
      addSession,
      questionList,
      markPracticed,
      signals,
      updateSignalStatus,
      learningStage,
      isShortPlan,
      captureOpen,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
