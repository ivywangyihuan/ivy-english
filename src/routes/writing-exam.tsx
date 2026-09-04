import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  CircleHelp,
  Clock3,
  FileText,
  Pause,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import { demoWritingTasks, type WritingTaskKey } from "@/data/writing-demo";
import type { ExamMode } from "@/data/exam-demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/writing-exam")({
  validateSearch: (search: Record<string, unknown>): { mode: ExamMode; task: WritingTaskKey } => ({
    mode: search.mode === "exam" ? "exam" : "familiarisation",
    task: search.task === "2" ? "2" : "1",
  }),
  head: () => ({
    meta: [
      { title: "IELTS Writing Computer Mode · Ivy English" },
      { name: "description", content: "Ivy English 的 IELTS Writing 电脑考试熟悉与模拟界面。" },
    ],
  }),
  component: WritingExamPage,
});

type FamiliarisationTimerMode = "off" | "elapsed";

type Drafts = Record<WritingTaskKey, string>;

const storageKey = "ivy-english-writing-exam-demo";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function countWords(value: string) {
  const clean = value.trim();
  if (!clean) return 0;
  return clean.split(/\s+/).filter(Boolean).length;
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
        <div>
          <p className="text-xs font-semibold">Average commute time</p>
          <p className="mt-1 text-[10px] text-[#666]">minutes · fictional city</p>
        </div>
        <div className="flex gap-3 text-[10px] text-[#555]">
          <span className="flex items-center gap-1.5"><span className="size-2.5 bg-[#7b7b7b]" />2010</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 bg-[#b9b9b9]" />2025</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {rows.map((row) => (
          <div key={row.label} className="flex min-w-0 flex-col items-center">
            <div className="flex h-40 items-end gap-2">
              <div className="w-7 bg-[#7b7b7b]" style={{ height: `${row.old * 2.6}px` }} title={`2010: ${row.old} minutes`} />
              <div className="w-7 bg-[#b9b9b9]" style={{ height: `${row.now * 2.6}px` }} title={`2025: ${row.now} minutes`} />
            </div>
            <p className="mt-2 text-[11px] font-medium">{row.label}</p>
            <p className="mt-1 text-[10px] text-[#666]">{row.old} / {row.now}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WritingExamPage() {
  const { mode, task: initialTask } = Route.useSearch();
  const [activeTask, setActiveTask] = useState<WritingTaskKey>(initialTask);
  const [drafts, setDrafts] = useState<Drafts>({ "1": "", "2": "" });
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerMode, setTimerMode] = useState<FamiliarisationTimerMode>("off");
  const [elapsedRunning, setElapsedRunning] = useState(false);
  const [timerMenuOpen, setTimerMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const timerPopoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        drafts?: Partial<Drafts>;
        elapsedSeconds?: number;
        timerMode?: FamiliarisationTimerMode;
        elapsedRunning?: boolean;
      };
      if (saved.drafts) {
        setDrafts({ "1": saved.drafts["1"] ?? "", "2": saved.drafts["2"] ?? "" });
      }
      if (typeof saved.elapsedSeconds === "number" && Number.isFinite(saved.elapsedSeconds) && saved.elapsedSeconds >= 0) {
        setElapsedSeconds(Math.floor(saved.elapsedSeconds));
      }
      if (saved.timerMode === "off" || saved.timerMode === "elapsed") setTimerMode(saved.timerMode);
      if (typeof saved.elapsedRunning === "boolean") setElapsedRunning(saved.elapsedRunning);
    } catch {
      // Ignore malformed local demo state.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ drafts, elapsedSeconds, timerMode, elapsedRunning }),
    );
  }, [drafts, elapsedSeconds, timerMode, elapsedRunning]);

  useEffect(() => {
    if (mode !== "exam" || timeLeft <= 0 || completed) return;
    const timer = window.setInterval(() => setTimeLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [mode, timeLeft, completed]);

  useEffect(() => {
    if (mode !== "familiarisation" || timerMode !== "elapsed" || !elapsedRunning || completed) return;
    const timer = window.setInterval(() => setElapsedSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [mode, timerMode, elapsedRunning, completed]);

  useEffect(() => {
    if (!timerMenuOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!timerPopoverRef.current?.contains(event.target as Node)) setTimerMenuOpen(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [timerMenuOpen]);

  const task = demoWritingTasks[activeTask];
  const wordCounts = useMemo(
    () => ({ "1": countWords(drafts["1"]), "2": countWords(drafts["2"]) }),
    [drafts],
  );
  const currentWords = wordCounts[activeTask];

  function finishSession() {
    setElapsedRunning(false);
    setFinishOpen(false);
    setCompleted(true);
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] px-6 py-10 text-[#222]">
        <div className="mx-auto max-w-3xl rounded-sm border border-[#c9c9c9] bg-white shadow-sm">
          <div className="border-b border-[#ddd] px-7 py-6">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#e8f3ec] text-[#286344]"><Check className="size-5" /></div>
            <h1 className="mt-5 text-xl font-semibold">Writing session complete</h1>
            <p className="mt-2 text-sm text-[#666]">Your drafts have been kept on this device for review.</p>
          </div>
          <div className="grid gap-4 p-7 sm:grid-cols-2">
            {(["1", "2"] as WritingTaskKey[]).map((key) => {
              const item = demoWritingTasks[key];
              return (
                <div key={key} className="rounded-sm border border-[#d5d5d5] p-5">
                  <p className="text-xs font-semibold">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold tabular-nums">{wordCounts[key]} words</p>
                  <p className={cn("mt-1 text-xs", wordCounts[key] >= item.minimumWords ? "text-[#286344]" : "text-[#8b5c18]")}>Minimum: {item.minimumWords}</p>
                </div>
              );
            })}
          </div>
          <div className="border-t border-[#ddd] px-7 py-5 text-sm text-[#555]">
            {mode === "exam" ? `Exam timer remaining: ${formatTime(timeLeft)}` : elapsedSeconds > 0 ? `Recorded practice time: ${formatTime(elapsedSeconds)}` : "Practice time was not recorded."}
          </div>
          <div className="flex flex-wrap justify-end gap-2 border-t border-[#ddd] px-7 py-5">
            <button type="button" onClick={() => setCompleted(false)} className="h-10 rounded-sm border border-[#aaa] bg-white px-4 text-xs hover:bg-[#eee]">Review writing</button>
            <a href="/practice?module=writing" className="inline-flex h-10 items-center rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Return to learning</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#222]">
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:hidden">
        <div className="max-w-md rounded-md border border-[#c8c8c8] bg-white p-7 text-center shadow-sm">
          <FileText className="mx-auto size-7 text-[#355f7a]" />
          <h1 className="mt-4 text-xl font-semibold">IELTS Writing Computer Mode</h1>
          <p className="mt-3 text-sm leading-6 text-[#5b5b5b]">为了保留真实机考的写作区域比例与操作习惯，这个界面请在电脑或平板横屏下使用。</p>
          <a href="/practice?module=writing" className="mt-6 inline-flex rounded-sm bg-[#2f2f2f] px-5 py-2.5 text-sm text-white">返回学习页</a>
        </div>
      </div>

      <div className="hidden h-screen flex-col overflow-hidden bg-white lg:flex">
        <header className="flex h-[58px] shrink-0 items-center border-b border-[#c7c7c7] bg-[#f7f7f7] px-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <a href="/practice?module=writing" className="flex size-9 items-center justify-center rounded-sm border border-[#b9b9b9] bg-white hover:bg-[#efefef]" aria-label="Exit writing mode"><ChevronLeft className="size-4" /></a>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">IELTS Academic Writing</p>
              <p className="text-[11px] text-[#666]">{mode === "exam" ? "Exam mode" : "Familiarisation mode"} · Ivy sample</p>
            </div>
          </div>

          {mode === "exam" ? (
            <div className={cn("flex items-center gap-2 rounded-sm border px-4 py-2 text-[15px] font-semibold", timeLeft < 300 ? "border-[#ba4b43] bg-[#fff2f1] text-[#8b201b]" : "border-[#bdbdbd] bg-white")}>
              <Clock3 className="size-4" /><span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          ) : (
            <div ref={timerPopoverRef} className="relative">
              <button type="button" onClick={() => setTimerMenuOpen((open) => !open)} className="flex items-center gap-2 rounded-sm border border-[#bdbdbd] bg-white px-4 py-2 text-[15px] font-semibold hover:bg-[#f2f2f2]" aria-expanded={timerMenuOpen}>
                <Clock3 className="size-4" />
                <span className={timerMode === "elapsed" ? "font-mono" : "text-xs font-medium"}>{timerMode === "elapsed" ? formatTime(elapsedSeconds) : "Untimed"}</span>
                {timerMode === "elapsed" ? <span className={cn("size-1.5 rounded-full", elapsedRunning ? "bg-[#2e6f4e]" : "bg-[#9b9b9b]")} /> : null}
              </button>
              {timerMenuOpen ? (
                <div className="absolute left-1/2 top-[46px] z-[60] w-72 -translate-x-1/2 rounded-sm border border-[#aaa] bg-white p-2 shadow-xl">
                  <button type="button" onClick={() => { setTimerMode("off"); setElapsedRunning(false); }} className={cn("flex w-full items-start gap-3 rounded-sm px-3 py-2.5 text-left hover:bg-[#f2f2f2]", timerMode === "off" && "bg-[#f2f6f8]")}>
                    <span className="mt-0.5 flex size-4 items-center justify-center">{timerMode === "off" ? <Check className="size-4" /> : null}</span>
                    <span><span className="block text-xs font-semibold">不计时</span><span className="mt-0.5 block text-[10px] text-[#666]">隐藏时间；已有记录会保留但暂停</span></span>
                  </button>
                  <button type="button" onClick={() => setTimerMode("elapsed")} className={cn("mt-1 flex w-full items-start gap-3 rounded-sm px-3 py-2.5 text-left hover:bg-[#f2f2f2]", timerMode === "elapsed" && "bg-[#f2f6f8]")}>
                    <span className="mt-0.5 flex size-4 items-center justify-center">{timerMode === "elapsed" ? <Check className="size-4" /> : null}</span>
                    <span><span className="block text-xs font-semibold">正数计时</span><span className="mt-0.5 block text-[10px] text-[#666]">记录这一轮实际写作时间</span></span>
                  </button>
                  {timerMode === "elapsed" ? (
                    <div className="mt-2 border-t border-[#ddd] p-2 pt-3">
                      <div className="flex items-center justify-between px-1">
                        <div><p className="font-mono text-lg font-semibold leading-none">{formatTime(elapsedSeconds)}</p><p className="mt-1 text-[10px] text-[#666]">{elapsedRunning ? "正在计时" : elapsedSeconds > 0 ? "已停止，可继续" : "尚未开始"}</p></div>
                        <span className={cn("rounded-full px-2 py-1 text-[10px]", elapsedRunning ? "bg-[#e8f3ec] text-[#286344]" : "bg-[#eee] text-[#666]")}>{elapsedRunning ? "RUNNING" : "PAUSED"}</span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <button type="button" onClick={() => { setElapsedSeconds(0); setElapsedRunning(false); }} className="flex h-9 items-center justify-center gap-1.5 rounded-sm border border-[#bbb] text-[11px] hover:bg-[#f2f2f2]"><RotateCcw className="size-3.5" />重置</button>
                        <button type="button" onClick={() => setElapsedRunning(true)} disabled={elapsedRunning} className="flex h-9 items-center justify-center gap-1.5 rounded-sm border border-[#557b92] bg-[#eef5f8] text-[11px] text-[#264f67] disabled:opacity-45"><Play className="size-3.5" />{elapsedSeconds > 0 ? "继续" : "开始"}</button>
                        <button type="button" onClick={() => setElapsedRunning(false)} disabled={!elapsedRunning} className="flex h-9 items-center justify-center gap-1.5 rounded-sm border border-[#bbb] text-[11px] disabled:opacity-45"><Pause className="size-3.5" />停止</button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          )}

          <div className="flex flex-1 justify-end gap-2">
            <button type="button" onClick={() => setHelpOpen(true)} className="flex h-9 items-center gap-2 rounded-sm border border-[#b9b9b9] bg-white px-3 text-xs hover:bg-[#efefef]"><CircleHelp className="size-4" />Help</button>
            <button type="button" onClick={() => setFinishOpen(true)} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white hover:bg-black">Finish test</button>
          </div>
        </header>

        <div className="flex h-[48px] shrink-0 items-stretch border-b border-[#cfcfcf] bg-white px-4">
          {(["1", "2"] as WritingTaskKey[]).map((key) => {
            const item = demoWritingTasks[key];
            return (
              <button key={key} type="button" onClick={() => setActiveTask(key)} className={cn("border-b-2 px-5 text-xs font-semibold", activeTask === key ? "border-[#2b5874] bg-[#f4f8fa] text-[#21465d]" : "border-transparent text-[#555] hover:bg-[#f5f5f5]")}>{item.label}<span className="ml-2 font-normal text-[#888]">{wordCounts[key]} words</span></button>
            );
          })}
        </div>

        <main className="grid min-h-0 flex-1 grid-cols-[0.9fr_1.1fr] divide-x divide-[#bdbdbd]">
          <section className="min-h-0 overflow-y-auto bg-white px-8 py-7">
            <p className="text-xs font-semibold tracking-wide text-[#555]">{task.eyebrow}</p>
            <p className="mt-5 text-sm font-semibold">{task.instruction}</p>
            <p className="mt-4 text-[15px] leading-7">{task.prompt}</p>
            {task.visual === "commute-chart" ? <CommuteChart /> : null}
            <div className="mt-6 rounded-sm border-l-2 border-[#777] bg-[#f7f7f7] px-4 py-3 text-xs leading-5 text-[#555]">Write at least {task.minimumWords} words.</div>
          </section>

          <section className="flex min-h-0 flex-col bg-[#fbfbfb]">
            <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#ddd] px-5 text-xs text-[#666]"><span>Your answer</span><span>{currentWords} words</span></div>
            <textarea
              value={drafts[activeTask]}
              onChange={(event) => setDrafts((previous) => ({ ...previous, [activeTask]: event.target.value }))}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              className="min-h-0 flex-1 resize-none bg-white p-6 text-[16px] leading-7 outline-none"
              placeholder="Start typing your answer here..."
            />
            <div className="flex h-12 shrink-0 items-center justify-between border-t border-[#ddd] bg-[#f7f7f7] px-5 text-xs">
              <span className="text-[#666]">Draft saved automatically on this device</span>
              <span className={cn("font-semibold tabular-nums", currentWords >= task.minimumWords ? "text-[#286344]" : "text-[#8b5c18]")}>{currentWords} / {task.minimumWords} words</span>
            </div>
          </section>
        </main>

        {helpOpen ? (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 p-6">
            <div className="w-full max-w-xl rounded-sm bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#ccc] px-5 py-4"><h2 className="text-base font-semibold">Writing test help</h2><button type="button" onClick={() => setHelpOpen(false)} className="flex size-8 items-center justify-center hover:bg-[#eee]"><X className="size-4" /></button></div>
              <div className="space-y-4 p-6 text-sm leading-6 text-[#444]">
                <p>Use the Task 1 and Task 2 tabs to move between answers. Your text is preserved when you switch tasks.</p>
                <p>The live word count is shown beside each task and at the bottom of the answer area.</p>
                <p>Spell check, autocorrect and automatic capitalisation are disabled in this writing area.</p>
                <p>{mode === "exam" ? "Exam mode uses a strict 60-minute countdown." : "Familiarisation mode lets you practise untimed or record elapsed writing time."}</p>
                <p>This Ivy sample uses original practice prompts, not an official IELTS test paper.</p>
              </div>
            </div>
          </div>
        ) : null}

        {finishOpen ? (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-6">
            <div className="w-full max-w-lg rounded-sm bg-white shadow-2xl">
              <div className="border-b border-[#ccc] px-6 py-5"><h2 className="text-base font-semibold">Finish this writing session?</h2></div>
              <div className="space-y-3 p-6">
                {(["1", "2"] as WritingTaskKey[]).map((key) => {
                  const item = demoWritingTasks[key];
                  const enough = wordCounts[key] >= item.minimumWords;
                  return <div key={key} className="flex items-center justify-between rounded-sm border border-[#ddd] px-4 py-3"><span className="text-sm font-semibold">{item.label}</span><span className={cn("text-xs", enough ? "text-[#286344]" : "text-[#8b5c18]")}>{wordCounts[key]} / {item.minimumWords} words</span></div>;
                })}
                <p className="pt-1 text-xs text-[#666]">{mode === "exam" ? `Time remaining: ${formatTime(timeLeft)}` : elapsedSeconds > 0 ? `Recorded time: ${formatTime(elapsedSeconds)}` : "Practice time is not being recorded."}</p>
                <div className="flex justify-end gap-2 pt-3"><button type="button" onClick={() => setFinishOpen(false)} className="h-9 rounded-sm border border-[#aaa] px-4 text-xs hover:bg-[#eee]">Continue writing</button><button type="button" onClick={finishSession} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Finish session</button></div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
