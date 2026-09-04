import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronLeft, CircleHelp, Clock3, FileText, X } from "lucide-react";
import type { ExamMode } from "@/data/exam-demo";
import { demoWritingTasks, type WritingTaskKey } from "@/data/writing-demo";
import { PracticeTimerPopover, type PracticeTimerSnapshot } from "@/components/PracticeTimerPopover";
import { cn } from "@/lib/utils";

type WritingScope = "task1" | "task2" | "full";
type Drafts = Record<WritingTaskKey, string>;

export const Route = createFileRoute("/writing-exam-v2")({
  validateSearch: (search: Record<string, unknown>): { mode: ExamMode; scope: WritingScope } => ({
    mode: search.mode === "exam" ? "exam" : "familiarisation",
    scope: search.scope === "task2" ? "task2" : search.scope === "full" ? "full" : "task1",
  }),
  head: () => ({ meta: [{ title: "IELTS Writing Computer Mode · Ivy English" }] }),
  component: WritingExamPage,
});

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60).toString().padStart(2, "0");
  const rest = (safe % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function countWords(value: string) {
  const clean = value.trim();
  return clean ? clean.split(/\s+/).filter(Boolean).length : 0;
}

function CommuteChart() {
  const rows = [
    { label: "Bus", old: 42, now: 36 },
    { label: "Car", old: 31, now: 38 },
    { label: "Train", old: 48, now: 41 },
    { label: "Bike", old: 24, now: 19 },
  ];
  return (
    <div className="mt-5 rounded-sm border border-[#cfcfcf] bg-white p-5">
      <div className="flex items-end justify-between gap-4 border-b border-[#777] pb-2">
        <div><p className="text-xs font-semibold">Average commute time</p><p className="mt-1 text-[10px] text-[#666]">minutes · fictional city</p></div>
        <div className="flex gap-3 text-[10px] text-[#555]"><span className="flex items-center gap-1.5"><span className="size-2.5 bg-[#7b7b7b]" />2010</span><span className="flex items-center gap-1.5"><span className="size-2.5 bg-[#b9b9b9]" />2025</span></div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {rows.map((row) => <div key={row.label} className="flex min-w-0 flex-col items-center"><div className="flex h-40 items-end gap-2"><div className="w-7 bg-[#7b7b7b]" style={{ height: `${row.old * 2.6}px` }} /><div className="w-7 bg-[#b9b9b9]" style={{ height: `${row.now * 2.6}px` }} /></div><p className="mt-2 text-[11px] font-medium">{row.label}</p><p className="mt-1 text-[10px] text-[#666]">{row.old} / {row.now}</p></div>)}
      </div>
    </div>
  );
}

function WritingExamPage() {
  const { mode, scope } = Route.useSearch();
  const availableTasks: WritingTaskKey[] = scope === "task1" ? ["1"] : scope === "task2" ? ["2"] : ["1", "2"];
  const defaultTask = availableTasks[0]!;
  const defaultMinutes = scope === "task1" ? 20 : scope === "task2" ? 40 : 60;
  const [activeTask, setActiveTask] = useState<WritingTaskKey>(defaultTask);
  const [drafts, setDrafts] = useState<Drafts>({ "1": "", "2": "" });
  const [strictTimeLeft, setStrictTimeLeft] = useState(defaultMinutes * 60);
  const [practiceTimer, setPracticeTimer] = useState<PracticeTimerSnapshot>({ mode: "off", seconds: 0, running: false, countdownMinutes: defaultMinutes });
  const [helpOpen, setHelpOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const storageKey = `ivy-writing-v2-${scope}`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as { drafts?: Partial<Drafts> };
      if (saved.drafts) setDrafts({ "1": saved.drafts["1"] ?? "", "2": saved.drafts["2"] ?? "" });
    } catch {
      // Ignore malformed local draft state.
    }
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ drafts }));
  }, [drafts, storageKey]);

  useEffect(() => {
    setActiveTask(defaultTask);
    setStrictTimeLeft(defaultMinutes * 60);
  }, [defaultMinutes, defaultTask]);

  useEffect(() => {
    if (mode !== "exam" || completed || strictTimeLeft <= 0) return;
    const timer = window.setInterval(() => setStrictTimeLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [completed, mode, strictTimeLeft]);

  const handleTimerSnapshot = useCallback((snapshot: PracticeTimerSnapshot) => setPracticeTimer(snapshot), []);
  const task = demoWritingTasks[activeTask];
  const wordCounts = useMemo(() => ({ "1": countWords(drafts["1"]), "2": countWords(drafts["2"]) }), [drafts]);
  const currentWords = wordCounts[activeTask];
  const scopeLabel = scope === "task1" ? "Task 1 practice" : scope === "task2" ? "Task 2 practice" : "Full Writing simulation";

  if (completed) {
    const usedTime = mode === "exam" ? defaultMinutes * 60 - strictTimeLeft : practiceTimer.mode === "off" ? null : practiceTimer.mode === "elapsed" ? practiceTimer.seconds : practiceTimer.countdownMinutes * 60 - practiceTimer.seconds;
    return (
      <div className="min-h-screen bg-[#f2f2f2] px-6 py-10 text-[#222]">
        <div className="mx-auto max-w-3xl rounded-sm border border-[#c9c9c9] bg-white shadow-sm">
          <div className="border-b border-[#ddd] px-7 py-6"><div className="flex size-11 items-center justify-center rounded-full bg-[#e8f3ec] text-[#286344]"><Check className="size-5" /></div><h1 className="mt-5 text-xl font-semibold">Writing session complete</h1><p className="mt-2 text-sm text-[#666]">{scopeLabel}</p></div>
          <div className={cn("grid gap-4 p-7", availableTasks.length === 2 && "sm:grid-cols-2")}>
            {availableTasks.map((key) => { const item = demoWritingTasks[key]; return <div key={key} className="rounded-sm border border-[#d5d5d5] p-5"><p className="text-xs font-semibold">{item.label}</p><p className="mt-3 text-2xl font-semibold tabular-nums">{wordCounts[key]} words</p><p className={cn("mt-1 text-xs", wordCounts[key] >= item.minimumWords ? "text-[#286344]" : "text-[#8b5c18]")}>Minimum: {item.minimumWords}</p></div>; })}
          </div>
          <div className="border-t border-[#ddd] px-7 py-5 text-sm text-[#555]">{usedTime === null ? "Practice time was not recorded." : `Time used: ${formatTime(usedTime)}`}</div>
          <div className="flex justify-end gap-2 border-t border-[#ddd] px-7 py-5"><button type="button" onClick={() => setCompleted(false)} className="h-10 rounded-sm border border-[#aaa] px-4 text-xs hover:bg-[#eee]">Review writing</button><a href="/practice?module=writing" className="inline-flex h-10 items-center rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Return to learning</a></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#222]">
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:hidden"><div className="max-w-md rounded-md border border-[#c8c8c8] bg-white p-7 text-center shadow-sm"><FileText className="mx-auto size-7 text-[#355f7a]" /><h1 className="mt-4 text-xl font-semibold">IELTS Writing Computer Mode</h1><p className="mt-3 text-sm leading-6 text-[#5b5b5b]">为了保留真实机考的写作区域比例与操作习惯，这个界面请在电脑或平板横屏下使用。</p><a href="/practice?module=writing" className="mt-6 inline-flex rounded-sm bg-[#2f2f2f] px-5 py-2.5 text-sm text-white">返回学习页</a></div></div>

      <div className="hidden h-screen flex-col overflow-hidden bg-white lg:flex">
        <header className="flex h-[58px] shrink-0 items-center border-b border-[#c7c7c7] bg-[#f7f7f7] px-4">
          <div className="flex min-w-0 flex-1 items-center gap-3"><a href="/practice?module=writing" className="flex size-9 items-center justify-center rounded-sm border border-[#b9b9b9] bg-white hover:bg-[#efefef]" aria-label="Exit writing mode"><ChevronLeft className="size-4" /></a><div className="min-w-0"><p className="truncate text-sm font-semibold">IELTS Academic Writing</p><p className="text-[11px] text-[#666]">{mode === "exam" ? "Exam mode" : "Familiarisation mode"} · {scopeLabel}</p></div></div>
          {mode === "exam" ? <div className={cn("flex items-center gap-2 rounded-sm border px-4 py-2 text-[15px] font-semibold", strictTimeLeft < 300 ? "border-[#ba4b43] bg-[#fff2f1] text-[#8b201b]" : "border-[#bdbdbd] bg-white")}><Clock3 className="size-4" /><span className="font-mono">{formatTime(strictTimeLeft)}</span></div> : <PracticeTimerPopover defaultMinutes={defaultMinutes} storageKey={`ivy-writing-timer-${scope}`} onSnapshot={handleTimerSnapshot} />}
          <div className="flex flex-1 justify-end gap-2"><button type="button" onClick={() => setHelpOpen(true)} className="flex h-9 items-center gap-2 rounded-sm border border-[#b9b9b9] bg-white px-3 text-xs hover:bg-[#efefef]"><CircleHelp className="size-4" />Help</button><button type="button" onClick={() => setFinishOpen(true)} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white hover:bg-black">Finish</button></div>
        </header>

        {availableTasks.length === 2 ? <div className="flex h-[48px] shrink-0 items-stretch border-b border-[#cfcfcf] bg-white px-4">{availableTasks.map((key) => { const item = demoWritingTasks[key]; return <button key={key} type="button" onClick={() => setActiveTask(key)} className={cn("border-b-2 px-5 text-xs font-semibold", activeTask === key ? "border-[#2b5874] bg-[#f4f8fa] text-[#21465d]" : "border-transparent text-[#555] hover:bg-[#f5f5f5]")}>{item.label}<span className="ml-2 font-normal text-[#888]">{wordCounts[key]} words</span></button>; })}</div> : <div className="flex h-[48px] shrink-0 items-center border-b border-[#cfcfcf] bg-white px-5 text-xs font-semibold">{task.label}<span className="ml-2 font-normal text-[#888]">{task.recommendedMinutes} min recommended</span></div>}

        <main className="grid min-h-0 flex-1 grid-cols-[0.9fr_1.1fr] divide-x divide-[#bdbdbd]">
          <section className="min-h-0 overflow-y-auto bg-white px-8 py-7"><p className="text-xs font-semibold tracking-wide text-[#555]">{task.eyebrow}</p><p className="mt-5 text-sm font-semibold">{task.instruction}</p><p className="mt-4 text-[15px] leading-7">{task.prompt}</p>{task.visual === "commute-chart" ? <CommuteChart /> : null}<div className="mt-6 rounded-sm border-l-2 border-[#777] bg-[#f7f7f7] px-4 py-3 text-xs leading-5 text-[#555]">Write at least {task.minimumWords} words.</div></section>
          <section className="flex min-h-0 flex-col bg-[#fbfbfb]"><div className="flex h-11 shrink-0 items-center justify-between border-b border-[#ddd] px-5 text-xs text-[#666]"><span>Your answer</span><span>{currentWords} words</span></div><textarea value={drafts[activeTask]} onChange={(event) => setDrafts((previous) => ({ ...previous, [activeTask]: event.target.value }))} spellCheck={false} autoCorrect="off" autoCapitalize="off" className="min-h-0 flex-1 resize-none bg-white p-6 text-[16px] leading-7 outline-none" placeholder="Start typing your answer here..." /><div className="flex h-12 shrink-0 items-center justify-between border-t border-[#ddd] bg-[#f7f7f7] px-5 text-xs"><span className="text-[#666]">Draft saved automatically on this device</span><span className={cn("font-semibold tabular-nums", currentWords >= task.minimumWords ? "text-[#286344]" : "text-[#8b5c18]")}>{currentWords} / {task.minimumWords} words</span></div></section>
        </main>

        {helpOpen ? <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/35 p-6"><div className="w-full max-w-xl rounded-sm bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-[#ccc] px-5 py-4"><h2 className="text-base font-semibold">Writing help</h2><button type="button" onClick={() => setHelpOpen(false)} className="flex size-8 items-center justify-center hover:bg-[#eee]"><X className="size-4" /></button></div><div className="space-y-4 p-6 text-sm leading-6 text-[#444]"><p>{scope === "full" ? "Full simulation contains both Task 1 and Task 2, with a 60-minute exam timer." : `${task.label} practice contains only ${task.label}; the other task is intentionally hidden.`}</p><p>Practice mode supports untimed, elapsed and countdown timers. The default countdown follows the recommended time for this scope, and you can set a custom number of minutes.</p><p>Spell check, autocorrect and automatic capitalisation are disabled.</p></div></div></div> : null}
        {finishOpen ? <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-6"><div className="w-full max-w-md rounded-sm bg-white shadow-2xl"><div className="border-b border-[#ccc] px-6 py-5"><h2 className="text-base font-semibold">Finish this writing session?</h2></div><div className="p-6"><div className="space-y-2 text-sm">{availableTasks.map((key) => <div key={key} className="flex justify-between"><span>{demoWritingTasks[key].label}</span><span className="font-semibold">{wordCounts[key]} words</span></div>)}</div><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setFinishOpen(false)} className="h-9 rounded-sm border border-[#aaa] px-4 text-xs hover:bg-[#eee]">Continue</button><button type="button" onClick={() => { setFinishOpen(false); setCompleted(true); }} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Finish</button></div></div></div></div> : null}
      </div>
    </div>
  );
}
