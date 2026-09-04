import { useEffect, useRef } from "react";
import { useAppState } from "@/state/app-state";
import { readingFullDemo } from "@/data/reading-full-demo";
import { listeningSections } from "@/data/listening-demo";

function normalise(value: string) {
  return value.trim().toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ");
}

function timerSeconds(storageKey: string) {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return 0;
    const timer = JSON.parse(raw) as { mode?: string; seconds?: number; countdownMinutes?: number };
    if (timer.mode === "elapsed") return Math.max(0, timer.seconds ?? 0);
    if (timer.mode === "countdown") return Math.max(0, (timer.countdownMinutes ?? 0) * 60 - (timer.seconds ?? 0));
  } catch {
    return 0;
  }
  return 0;
}

function countWords(value: string) {
  const clean = value.trim();
  return clean ? clean.split(/\s+/).filter(Boolean).length : 0;
}

export function ExamCompletionBridge() {
  const { addSession, addMistakes } = useAppState();
  const lastRecordedRef = useRef(0);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");
      if (!button || button.textContent?.trim() !== "Finish") return;
      if (!button.closest(".fixed.inset-0")) return;
      if (Date.now() - lastRecordedRef.current < 1500) return;

      const pathname = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const scope = params.get("scope") ?? "full";
      const today = new Date().toISOString().slice(0, 10);

      if (pathname === "/exam-v3") {
        const sections = scope === "full" ? readingFullDemo.sections : [readingFullDemo.sections[0]!];
        const questions = sections.flatMap((section) => section.questions);
        let answers: Record<string, string> = {};
        try { answers = JSON.parse(window.localStorage.getItem(`ivy-reading-v3-${scope}`) ?? "{}").answers ?? {}; } catch { /* empty */ }
        const score = questions.reduce((sum, question) => {
          const given = normalise(answers[question.id] ?? "");
          return sum + (given && question.correctAnswers?.some((answer) => normalise(answer) === given) ? 1 : 0);
        }, 0);
        const used = timerSeconds(`ivy-reading-timer-v3-${scope}`);
        addSession({
          date: today,
          module: "阅读",
          activity: scope === "full" ? "IELTS Reading · 完整 CBT" : "IELTS Reading · 单 Passage",
          tool: "Ivy IELTS Computer Mode",
          durationMinutes: Math.max(1, Math.round(used / 60)),
          score: `${score} / ${questions.length}`,
          notes: `${questions.filter((question) => answers[question.id]?.trim()).length}/${questions.length} answered`,
        });
        addMistakes(questions.flatMap((question) => {
          const given = answers[question.id]?.trim() ?? "";
          const correct = question.correctAnswers?.some((answer) => normalise(answer) === normalise(given));
          return correct ? [] : [{
            module: "阅读" as const,
            source: scope === "full" ? "IELTS Reading · 完整 CBT" : "IELTS Reading · 单 Passage",
            questionNumber: question.number,
            question: question.stem,
            answer: given || "未作答",
            correctAnswer: question.correctAnswers?.[0] ?? "—",
            kind: question.type,
          }];
        }));
        lastRecordedRef.current = Date.now();
        return;
      }

      if (pathname === "/listening-exam-v3") {
        const sections = scope === "full" ? listeningSections : [listeningSections[0]!];
        const questions = sections.flatMap((section) => section.questions);
        let answers: Record<string, string> = {};
        try { answers = JSON.parse(window.localStorage.getItem(`ivy-listening-v3-${scope}`) ?? "{}").answers ?? {}; } catch { /* empty */ }
        const score = questions.reduce((sum, question) => {
          const given = normalise(answers[question.id] ?? "");
          return sum + (given && question.correctAnswers.some((answer) => normalise(answer) === given) ? 1 : 0);
        }, 0);
        const used = timerSeconds(`ivy-listening-timer-v3-${scope}`);
        addSession({
          date: today,
          module: "听力",
          activity: scope === "full" ? "IELTS Listening · 完整 CBT" : "IELTS Listening · Section 练习",
          tool: "Ivy IELTS Computer Mode",
          durationMinutes: Math.max(1, Math.round(used / 60)),
          score: `${score} / ${questions.length}`,
          notes: `${questions.filter((question) => answers[question.id]?.trim()).length}/${questions.length} answered`,
        });
        addMistakes(questions.flatMap((question) => {
          const given = answers[question.id]?.trim() ?? "";
          const correct = question.correctAnswers.some((answer) => normalise(answer) === normalise(given));
          return correct ? [] : [{
            module: "听力" as const,
            source: scope === "full" ? "IELTS Listening · 完整 CBT" : "IELTS Listening · Section 练习",
            questionNumber: question.number,
            question: question.stem,
            answer: given || "未作答",
            correctAnswer: question.correctAnswers[0] ?? "—",
            kind: question.type,
          }];
        }));
        lastRecordedRef.current = Date.now();
        return;
      }

      if (pathname === "/writing-exam-v2") {
        let drafts: Record<"1" | "2", string> = { "1": "", "2": "" };
        try { drafts = { ...drafts, ...(JSON.parse(window.localStorage.getItem(`ivy-writing-v2-${scope}`) ?? "{}").drafts ?? {}) }; } catch { /* empty */ }
        const used = timerSeconds(`ivy-writing-timer-${scope}`);
        const words1 = countWords(drafts["1"]);
        const words2 = countWords(drafts["2"]);
        const total = scope === "task1" ? words1 : scope === "task2" ? words2 : words1 + words2;
        addSession({
          date: today,
          module: "写作",
          activity: scope === "task1" ? "IELTS Writing · Task 1" : scope === "task2" ? "IELTS Writing · Task 2" : "IELTS Writing · 完整模拟",
          tool: "Ivy IELTS Computer Mode",
          durationMinutes: Math.max(1, Math.round(used / 60)),
          score: `${total} words`,
          notes: scope === "full" ? `Task 1 ${words1} words · Task 2 ${words2} words` : undefined,
        });
        lastRecordedRef.current = Date.now();
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [addMistakes, addSession]);

  return null;
}
