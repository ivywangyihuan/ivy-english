import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  CircleHelp,
  Clock3,
  FileText,
  Headphones,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  X,
} from "lucide-react";
import type { ExamMode } from "@/data/exam-demo";
import { listeningDemo } from "@/data/listening-demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/listening-exam")({
  validateSearch: (search: Record<string, unknown>): { mode: ExamMode } => ({
    mode: search.mode === "exam" ? "exam" : "familiarisation",
  }),
  head: () => ({
    meta: [
      { title: "IELTS Listening Computer Mode · Ivy English" },
      { name: "description", content: "Ivy English 的 IELTS Listening 电脑考试熟悉与模拟界面。" },
    ],
  }),
  component: ListeningExamPage,
});

type Answers = Record<string, string>;
type FamiliarisationTimerMode = "off" | "elapsed";

const storageKey = "ivy-english-listening-exam-demo";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function normalise(value: string) {
  return value.trim().toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ");
}

function ListeningExamPage() {
  const { mode } = Route.useSearch();
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerMode, setTimerMode] = useState<FamiliarisationTimerMode>("off");
  const [elapsedRunning, setElapsedRunning] = useState(false);
  const [timerMenuOpen, setTimerMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioFinished, setAudioFinished] = useState(false);
  const [audioElapsed, setAudioElapsed] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const timerPopoverRef = useRef<HTMLDivElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioClockRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        answers?: Answers;
        elapsedSeconds?: number;
        timerMode?: FamiliarisationTimerMode;
        volume?: number;
      };
      if (saved.answers) setAnswers(saved.answers);
      if (typeof saved.elapsedSeconds === "number" && Number.isFinite(saved.elapsedSeconds) && saved.elapsedSeconds >= 0) setElapsedSeconds(Math.floor(saved.elapsedSeconds));
      if (saved.timerMode === "off" || saved.timerMode === "elapsed") setTimerMode(saved.timerMode);
      if (typeof saved.volume === "number" && Number.isFinite(saved.volume)) setVolume(Math.min(1, Math.max(0.1, saved.volume)));
    } catch {
      // Ignore malformed local demo state.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ answers, elapsedSeconds, timerMode, volume }));
  }, [answers, elapsedSeconds, timerMode, volume]);

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

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (audioClockRef.current) window.clearInterval(audioClockRef.current);
    };
  }, []);

  const answeredCount = useMemo(() => listeningDemo.questions.filter((question) => answers[question.id]?.trim()).length, [answers]);
  const score = useMemo(
    () => listeningDemo.questions.reduce((total, question) => {
      const given = normalise(answers[question.id] ?? "");
      if (!given) return total;
      return total + (question.correctAnswers.some((answer) => normalise(answer) === given) ? 1 : 0);
    }, 0),
    [answers],
  );

  function stopAudioClock() {
    if (audioClockRef.current) {
      window.clearInterval(audioClockRef.current);
      audioClockRef.current = null;
    }
  }

  function startAudio() {
    if (audioPlaying) return;
    if (mode === "exam" && audioStarted) return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    stopAudioClock();
    setAudioElapsed(0);
    setAudioStarted(true);
    setAudioFinished(false);
    setAudioPlaying(true);

    const utterance = new SpeechSynthesisUtterance(listeningDemo.script.join(" "));
    utterance.lang = "en-GB";
    utterance.rate = 0.88;
    utterance.pitch = 1;
    utterance.volume = volume;
    utterance.onend = () => {
      setAudioPlaying(false);
      setAudioFinished(true);
      stopAudioClock();
    };
    utterance.onerror = () => {
      setAudioPlaying(false);
      stopAudioClock();
    };
    utteranceRef.current = utterance;
    audioClockRef.current = window.setInterval(() => setAudioElapsed((value) => value + 1), 1000);
    window.speechSynthesis.speak(utterance);
  }

  function finishSession() {
    window.speechSynthesis?.cancel();
    stopAudioClock();
    setAudioPlaying(false);
    setElapsedRunning(false);
    setFinishOpen(false);
    setCompleted(true);
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] px-6 py-10 text-[#222]">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-sm border border-[#c9c9c9] bg-white shadow-sm">
          <div className="border-b border-[#ddd] px-7 py-6">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#e8f3ec] text-[#286344]"><Check className="size-5" /></div>
            <h1 className="mt-5 text-xl font-semibold">Listening session complete</h1>
            <p className="mt-2 text-sm text-[#666]">This is a 10-question Ivy sample, so no IELTS band is estimated.</p>
          </div>
          <div className="grid gap-4 border-b border-[#ddd] p-7 sm:grid-cols-3">
            <div className="rounded-sm border border-[#ddd] p-5"><p className="text-xs text-[#666]">Score</p><p className="mt-2 text-2xl font-semibold tabular-nums">{score} / 10</p></div>
            <div className="rounded-sm border border-[#ddd] p-5"><p className="text-xs text-[#666]">Answered</p><p className="mt-2 text-2xl font-semibold tabular-nums">{answeredCount} / 10</p></div>
            <div className="rounded-sm border border-[#ddd] p-5"><p className="text-xs text-[#666]">Time</p><p className="mt-2 text-2xl font-semibold tabular-nums">{mode === "exam" ? formatTime(30 * 60 - timeLeft) : elapsedSeconds > 0 ? formatTime(elapsedSeconds) : "—"}</p></div>
          </div>
          <div className="divide-y divide-[#e1e1e1]">
            {listeningDemo.questions.map((question) => {
              const given = answers[question.id]?.trim() || "—";
              const correct = question.correctAnswers.some((answer) => normalise(answer) === normalise(given));
              return (
                <div key={question.id} className="grid gap-3 px-7 py-4 sm:grid-cols-[52px_1fr_auto] sm:items-center">
                  <span className={cn("flex size-8 items-center justify-center rounded-full text-xs font-semibold", correct ? "bg-[#e8f3ec] text-[#286344]" : "bg-[#fff0dd] text-[#8d5c18]")}>{question.number}</span>
                  <div><p className="text-sm">{question.stem}</p><p className="mt-1 text-xs text-[#666]">Your answer: {given}</p></div>
                  <div className="text-xs text-[#555]">Correct: {question.correctAnswers[0]}</div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-2 border-t border-[#ddd] px-7 py-5"><button type="button" onClick={() => setCompleted(false)} className="h-10 rounded-sm border border-[#aaa] px-4 text-xs hover:bg-[#eee]">Review questions</button><a href="/practice?module=listening" className="inline-flex h-10 items-center rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Return to learning</a></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#222]">
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:hidden">
        <div className="max-w-md rounded-md border border-[#c8c8c8] bg-white p-7 text-center shadow-sm">
          <Headphones className="mx-auto size-7 text-[#355f7a]" />
          <h1 className="mt-4 text-xl font-semibold">IELTS Listening Computer Mode</h1>
          <p className="mt-3 text-sm leading-6 text-[#5b5b5b]">为了保留真实机考的题目密度与操作习惯，这个界面请在电脑或平板横屏下使用。</p>
          <a href="/practice?module=listening" className="mt-6 inline-flex rounded-sm bg-[#2f2f2f] px-5 py-2.5 text-sm text-white">返回学习页</a>
        </div>
      </div>

      <div className="hidden h-screen flex-col overflow-hidden bg-white lg:flex">
        <header className="flex h-[58px] shrink-0 items-center border-b border-[#c7c7c7] bg-[#f7f7f7] px-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <a href="/practice?module=listening" className="flex size-9 items-center justify-center rounded-sm border border-[#b9b9b9] bg-white hover:bg-[#efefef]" aria-label="Exit listening mode"><ChevronLeft className="size-4" /></a>
            <div className="min-w-0"><p className="truncate text-sm font-semibold">IELTS Academic Listening</p><p className="text-[11px] text-[#666]">{mode === "exam" ? "Exam mode" : "Familiarisation mode"} · Ivy sample</p></div>
          </div>

          {mode === "exam" ? (
            <div className={cn("flex items-center gap-2 rounded-sm border px-4 py-2 text-[15px] font-semibold", timeLeft < 300 ? "border-[#ba4b43] bg-[#fff2f1] text-[#8b201b]" : "border-[#bdbdbd] bg-white")}><Clock3 className="size-4" /><span className="font-mono">{formatTime(timeLeft)}</span></div>
          ) : (
            <div ref={timerPopoverRef} className="relative">
              <button type="button" onClick={() => setTimerMenuOpen((open) => !open)} className="flex items-center gap-2 rounded-sm border border-[#bdbdbd] bg-white px-4 py-2 text-[15px] font-semibold hover:bg-[#f2f2f2]" aria-expanded={timerMenuOpen}><Clock3 className="size-4" /><span className={timerMode === "elapsed" ? "font-mono" : "text-xs font-medium"}>{timerMode === "elapsed" ? formatTime(elapsedSeconds) : "Untimed"}</span>{timerMode === "elapsed" ? <span className={cn("size-1.5 rounded-full", elapsedRunning ? "bg-[#2e6f4e]" : "bg-[#9b9b9b]")} /> : null}</button>
              {timerMenuOpen ? (
                <div className="absolute left-1/2 top-[46px] z-[60] w-72 -translate-x-1/2 rounded-sm border border-[#aaa] bg-white p-2 shadow-xl">
                  <button type="button" onClick={() => { setTimerMode("off"); setElapsedRunning(false); }} className={cn("flex w-full items-start gap-3 rounded-sm px-3 py-2.5 text-left hover:bg-[#f2f2f2]", timerMode === "off" && "bg-[#f2f6f8]")}><span className="mt-0.5 flex size-4 items-center justify-center">{timerMode === "off" ? <Check className="size-4" /> : null}</span><span><span className="block text-xs font-semibold">不计时</span><span className="mt-0.5 block text-[10px] text-[#666]">隐藏练习时间</span></span></button>
                  <button type="button" onClick={() => setTimerMode("elapsed")} className={cn("mt-1 flex w-full items-start gap-3 rounded-sm px-3 py-2.5 text-left hover:bg-[#f2f2f2]", timerMode === "elapsed" && "bg-[#f2f6f8]")}><span className="mt-0.5 flex size-4 items-center justify-center">{timerMode === "elapsed" ? <Check className="size-4" /> : null}</span><span><span className="block text-xs font-semibold">正数计时</span><span className="mt-0.5 block text-[10px] text-[#666]">记录这一轮实际用时</span></span></button>
                  {timerMode === "elapsed" ? <div className="mt-2 border-t border-[#ddd] p-2 pt-3"><div className="flex items-center justify-between px-1"><div><p className="font-mono text-lg font-semibold leading-none">{formatTime(elapsedSeconds)}</p><p className="mt-1 text-[10px] text-[#666]">{elapsedRunning ? "正在计时" : elapsedSeconds > 0 ? "已停止，可继续" : "尚未开始"}</p></div><span className={cn("rounded-full px-2 py-1 text-[10px]", elapsedRunning ? "bg-[#e8f3ec] text-[#286344]" : "bg-[#eee] text-[#666]")}>{elapsedRunning ? "RUNNING" : "PAUSED"}</span></div><div className="mt-3 grid grid-cols-3 gap-2"><button type="button" onClick={() => { setElapsedSeconds(0); setElapsedRunning(false); }} className="flex h-9 items-center justify-center gap-1.5 rounded-sm border border-[#bbb] text-[11px]"><RotateCcw className="size-3.5" />重置</button><button type="button" onClick={() => setElapsedRunning(true)} disabled={elapsedRunning} className="flex h-9 items-center justify-center gap-1.5 rounded-sm border border-[#557b92] bg-[#eef5f8] text-[11px] text-[#264f67] disabled:opacity-45"><Play className="size-3.5" />{elapsedSeconds > 0 ? "继续" : "开始"}</button><button type="button" onClick={() => setElapsedRunning(false)} disabled={!elapsedRunning} className="flex h-9 items-center justify-center gap-1.5 rounded-sm border border-[#bbb] text-[11px] disabled:opacity-45"><Pause className="size-3.5" />停止</button></div></div> : null}
                </div>
              ) : null}
            </div>
          )}

          <div className="flex flex-1 justify-end gap-2"><button type="button" onClick={() => setHelpOpen(true)} className="flex h-9 items-center gap-2 rounded-sm border border-[#b9b9b9] bg-white px-3 text-xs hover:bg-[#efefef]"><CircleHelp className="size-4" />Help</button><button type="button" onClick={() => setFinishOpen(true)} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Finish test</button></div>
        </header>

        <div className="flex min-h-[74px] shrink-0 items-center gap-5 border-b border-[#cfcfcf] bg-white px-5">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <button type="button" onClick={startAudio} disabled={audioPlaying || (mode === "exam" && audioStarted)} className="flex h-10 min-w-32 items-center justify-center gap-2 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white disabled:bg-[#aaa]"><Play className="size-4" />{audioPlaying ? "Audio playing" : mode === "exam" && audioStarted ? "Audio used" : audioFinished && mode === "familiarisation" ? "Replay audio" : "Start audio"}</button>
            <div className="min-w-0 flex-1"><div className="flex items-center justify-between text-[10px] text-[#666]"><span>{audioPlaying ? "Playing once — no pause or rewind" : audioFinished ? "Audio finished" : "Ready"}</span><span className="font-mono">{formatTime(audioElapsed)}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e5e5e5]"><div className="h-full bg-[#6d7f8c] transition-[width] duration-500" style={{ width: `${Math.min(100, (audioElapsed / listeningDemo.estimatedSeconds) * 100)}%` }} /></div></div>
          </div>
          <label className="flex w-44 items-center gap-2 text-xs text-[#555]"><Volume2 className="size-4" /><input type="range" min="0.1" max="1" step="0.1" value={volume} onChange={(event) => setVolume(Number(event.target.value))} disabled={audioPlaying} className="w-full" /></label>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto bg-[#fbfbfb] px-8 py-7">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold tracking-wide text-[#555]">{listeningDemo.sectionLabel}</p>
            <h1 className="mt-2 text-lg font-semibold">Questions 1–10</h1>
            <p className="mt-2 text-sm text-[#666]">Listen and answer the questions. In Exam mode the recording can be started only once.</p>
            <div className="mt-6 divide-y divide-[#ddd] overflow-hidden rounded-sm border border-[#ccc] bg-white">
              {listeningDemo.questions.map((question) => (
                <div key={question.id} className="p-5">
                  <p className="text-[12px] leading-5 text-[#666]">{question.instruction}</p>
                  <div className="mt-3 flex items-start gap-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-[#2a2a2a] text-xs font-semibold text-white">{question.number}</span><p className="pt-0.5 text-[15px] leading-6">{question.stem}</p></div>
                  {question.type === "text" ? <input value={answers[question.id] ?? ""} onChange={(event) => setAnswers((previous) => ({ ...previous, [question.id]: event.target.value }))} spellCheck={false} autoCorrect="off" autoCapitalize="off" className="mt-4 h-10 w-full max-w-sm rounded-sm border border-[#888] px-3 text-sm outline-none focus:border-[#1d5f8c] focus:ring-1 focus:ring-[#1d5f8c]" placeholder="Type your answer" /> : <div className="mt-4 space-y-2">{question.options?.map((option) => <button key={option.value} type="button" onClick={() => setAnswers((previous) => ({ ...previous, [question.id]: option.value }))} className="flex w-full items-start gap-3 rounded-sm border border-[#c9c9c9] px-3 py-2.5 text-left text-sm hover:border-[#777]"><span className={cn("mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-[#777]", answers[question.id] === option.value && "border-[#1d5f8c]")}>{answers[question.id] === option.value ? <span className="size-2 rounded-full bg-[#1d5f8c]" /> : null}</span><span><strong className="mr-2">{option.value}</strong>{option.label}</span></button>)}</div>}
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="flex h-[58px] shrink-0 items-center border-t border-[#bdbdbd] bg-[#f5f5f5] px-5"><span className="text-xs font-semibold">Section 1</span><div className="ml-5 flex flex-1 items-center gap-1.5">{listeningDemo.questions.map((question) => { const answered = Boolean(answers[question.id]?.trim()); return <span key={question.id} className={cn("relative flex size-8 items-center justify-center rounded-sm border text-[11px] font-semibold", answered ? "border-[#54809b] bg-[#e6f0f5] text-[#163f58]" : "border-[#aaa] bg-white")}>{question.number}{answered ? <span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-[#2e6f4e]" /> : null}</span>; })}</div><span className="text-xs text-[#555]">{answeredCount} / 10 answered</span></footer>

        {helpOpen ? <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 p-6"><div className="w-full max-w-xl rounded-sm bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-[#ccc] px-5 py-4"><h2 className="text-base font-semibold">Listening test help</h2><button type="button" onClick={() => setHelpOpen(false)} className="flex size-8 items-center justify-center hover:bg-[#eee]"><X className="size-4" /></button></div><div className="space-y-4 p-6 text-sm leading-6 text-[#444]"><p>This prototype uses your browser's English speech voice to play original Ivy sample material.</p><p>Exam mode allows the recording to start only once and provides no pause, rewind or replay control.</p><p>Familiarisation mode lets you replay the sample after it finishes.</p><p>Set the volume before starting the recording. Browsers do not all support changing synthetic speech volume during playback.</p></div></div></div> : null}

        {finishOpen ? <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-6"><div className="w-full max-w-md rounded-sm bg-white shadow-2xl"><div className="border-b border-[#ccc] px-6 py-5"><h2 className="text-base font-semibold">Finish this listening session?</h2></div><div className="p-6"><p className="text-sm font-semibold">{answeredCount} / 10 answered</p><p className="mt-2 text-xs text-[#666]">Submitting will show the answer key and score for this Ivy sample.</p><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setFinishOpen(false)} className="h-9 rounded-sm border border-[#aaa] px-4 text-xs">Continue test</button><button type="button" onClick={finishSession} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Submit sample</button></div></div></div></div> : null}
      </div>
    </div>
  );
}
