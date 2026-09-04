import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronLeft, CircleHelp, Clock3, FastForward, Headphones, Pause, Play, Rewind, RotateCcw, Volume2, X } from "lucide-react";
import type { ExamMode } from "@/data/exam-demo";
import { listeningDemo } from "@/data/listening-demo";
import { PracticeTimerPopover, type PracticeTimerSnapshot } from "@/components/PracticeTimerPopover";
import { cn } from "@/lib/utils";

type ListeningScope = "section" | "full";
type Answers = Record<string, string>;
type AudioState = "idle" | "playing" | "paused" | "finished";

export const Route = createFileRoute("/listening-exam-v2")({
  validateSearch: (search: Record<string, unknown>): { mode: ExamMode; scope: ListeningScope } => ({
    mode: search.mode === "exam" ? "exam" : "familiarisation",
    scope: search.scope === "full" ? "full" : "section",
  }),
  head: () => ({ meta: [{ title: "IELTS Listening Computer Mode · Ivy English" }] }),
  component: ListeningExamPage,
});

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60).toString().padStart(2, "0");
  const rest = (safe % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function normalise(value: string) {
  return value.trim().toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ");
}

const rawDurations = listeningDemo.script.map((line) => Math.max(3, line.split(/\s+/).length / 2.1 + 0.7));
const durationScale = listeningDemo.estimatedSeconds / rawDurations.reduce((sum, value) => sum + value, 0);
const segmentDurations = rawDurations.map((value) => value * durationScale);
const segmentStarts = segmentDurations.map((_, index) => segmentDurations.slice(0, index).reduce((sum, value) => sum + value, 0));

function ListeningExamPage() {
  const { mode, scope } = Route.useSearch();
  const defaultMinutes = scope === "full" ? 30 : 10;
  const [answers, setAnswers] = useState<Answers>({});
  const [strictTimeLeft, setStrictTimeLeft] = useState(defaultMinutes * 60);
  const [practiceTimer, setPracticeTimer] = useState<PracticeTimerSnapshot>({ mode: "off", seconds: 0, running: false, countdownMinutes: defaultMinutes });
  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [audioStarted, setAudioStarted] = useState(false);
  const [audioElapsed, setAudioElapsed] = useState(0);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [helpOpen, setHelpOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const generationRef = useRef(0);
  const audioClockRef = useRef<number | null>(null);
  const storageKey = `ivy-listening-v2-${scope}`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as { answers?: Answers; volume?: number };
      if (saved.answers) setAnswers(saved.answers);
      if (typeof saved.volume === "number" && Number.isFinite(saved.volume)) setVolume(Math.min(1, Math.max(0.1, saved.volume)));
    } catch {
      // Ignore malformed local state.
    }
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ answers, volume }));
  }, [answers, storageKey, volume]);

  useEffect(() => {
    setStrictTimeLeft(defaultMinutes * 60);
  }, [defaultMinutes]);

  useEffect(() => {
    if (mode !== "exam" || completed || strictTimeLeft <= 0) return;
    const timer = window.setInterval(() => setStrictTimeLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [completed, mode, strictTimeLeft]);

  const handleTimerSnapshot = useCallback((snapshot: PracticeTimerSnapshot) => setPracticeTimer(snapshot), []);

  useEffect(() => {
    if (audioState !== "playing") return;
    audioClockRef.current = window.setInterval(() => setAudioElapsed((value) => Math.min(listeningDemo.estimatedSeconds, value + 1)), 1000);
    return () => {
      if (audioClockRef.current) window.clearInterval(audioClockRef.current);
      audioClockRef.current = null;
    };
  }, [audioState]);

  useEffect(() => () => {
    generationRef.current += 1;
    window.speechSynthesis?.cancel();
    if (audioClockRef.current) window.clearInterval(audioClockRef.current);
  }, []);

  const answeredCount = useMemo(() => listeningDemo.questions.filter((question) => answers[question.id]?.trim()).length, [answers]);
  const score = useMemo(() => listeningDemo.questions.reduce((total, question) => {
    const given = normalise(answers[question.id] ?? "");
    return total + (given && question.correctAnswers.some((answer) => normalise(answer) === given) ? 1 : 0);
  }, 0), [answers]);

  function speakSegment(index: number, generation: number) {
    if (!("speechSynthesis" in window) || index >= listeningDemo.script.length) {
      setAudioState("finished");
      setAudioElapsed(listeningDemo.estimatedSeconds);
      return;
    }
    setCurrentSegment(index);
    const utterance = new SpeechSynthesisUtterance(listeningDemo.script[index]);
    utterance.lang = "en-GB";
    utterance.rate = 0.88;
    utterance.pitch = 1;
    utterance.volume = volume;
    utterance.onend = () => {
      if (generation !== generationRef.current) return;
      const next = index + 1;
      if (next >= listeningDemo.script.length) {
        setAudioState("finished");
        setAudioElapsed(listeningDemo.estimatedSeconds);
      } else {
        setAudioElapsed(Math.round(segmentStarts[next]));
        speakSegment(next, generation);
      }
    };
    utterance.onerror = () => {
      if (generation === generationRef.current) setAudioState("paused");
    };
    window.speechSynthesis.speak(utterance);
  }

  function playFrom(index: number) {
    if (!("speechSynthesis" in window)) return;
    generationRef.current += 1;
    const generation = generationRef.current;
    window.speechSynthesis.cancel();
    const safeIndex = Math.min(listeningDemo.script.length - 1, Math.max(0, index));
    setAudioElapsed(Math.round(segmentStarts[safeIndex] ?? 0));
    setAudioStarted(true);
    setAudioState("playing");
    speakSegment(safeIndex, generation);
  }

  function startAudio() {
    if (mode === "exam" && audioStarted) return;
    if (audioState === "paused" && mode === "familiarisation") {
      window.speechSynthesis.resume();
      setAudioState("playing");
      return;
    }
    playFrom(audioState === "finished" ? 0 : currentSegment);
  }

  function pauseAudio() {
    if (mode !== "familiarisation" || audioState !== "playing") return;
    window.speechSynthesis.pause();
    setAudioState("paused");
  }

  function seekBy(delta: number) {
    if (mode !== "familiarisation") return;
    const target = Math.min(listeningDemo.estimatedSeconds - 1, Math.max(0, audioElapsed + delta));
    let index = 0;
    for (let i = 0; i < segmentStarts.length; i += 1) if (segmentStarts[i] <= target) index = i;
    playFrom(index);
  }

  function replay() {
    if (mode !== "familiarisation") return;
    playFrom(0);
  }

  function finishSession() {
    generationRef.current += 1;
    window.speechSynthesis?.cancel();
    setAudioState("paused");
    setFinishOpen(false);
    setCompleted(true);
  }

  if (completed) {
    const usedTime = mode === "exam" ? defaultMinutes * 60 - strictTimeLeft : practiceTimer.mode === "off" ? null : practiceTimer.mode === "elapsed" ? practiceTimer.seconds : practiceTimer.countdownMinutes * 60 - practiceTimer.seconds;
    return (
      <div className="min-h-screen bg-[#f2f2f2] px-6 py-10 text-[#222]">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-sm border border-[#c9c9c9] bg-white shadow-sm">
          <div className="border-b border-[#ddd] px-7 py-6"><div className="flex size-11 items-center justify-center rounded-full bg-[#e8f3ec] text-[#286344]"><Check className="size-5" /></div><h1 className="mt-5 text-xl font-semibold">Listening session complete</h1><p className="mt-2 text-sm text-[#666]">{scope === "full" ? "Full Listening timer shell · current prototype contains the Section 1 sample." : "Section 1 practice"}</p></div>
          <div className="grid gap-4 border-b border-[#ddd] p-7 sm:grid-cols-3"><div className="rounded-sm border border-[#ddd] p-5"><p className="text-xs text-[#666]">Score</p><p className="mt-2 text-2xl font-semibold">{score} / 10</p></div><div className="rounded-sm border border-[#ddd] p-5"><p className="text-xs text-[#666]">Answered</p><p className="mt-2 text-2xl font-semibold">{answeredCount} / 10</p></div><div className="rounded-sm border border-[#ddd] p-5"><p className="text-xs text-[#666]">Practice time</p><p className="mt-2 text-2xl font-semibold">{usedTime === null ? "—" : formatTime(usedTime)}</p></div></div>
          <div className="divide-y divide-[#e1e1e1]">{listeningDemo.questions.map((question) => { const given = answers[question.id]?.trim() || "—"; const correct = question.correctAnswers.some((answer) => normalise(answer) === normalise(given)); return <div key={question.id} className="grid gap-3 px-7 py-4 sm:grid-cols-[52px_1fr_auto] sm:items-center"><span className={cn("flex size-8 items-center justify-center rounded-full text-xs font-semibold", correct ? "bg-[#e8f3ec] text-[#286344]" : "bg-[#fff0dd] text-[#8d5c18]")}>{question.number}</span><div><p className="text-sm">{question.stem}</p><p className="mt-1 text-xs text-[#666]">Your answer: {given}</p></div><div className="text-xs text-[#555]">Correct: {question.correctAnswers[0]}</div></div>; })}</div>
          <div className="flex justify-end gap-2 border-t border-[#ddd] px-7 py-5"><button type="button" onClick={() => setCompleted(false)} className="h-10 rounded-sm border border-[#aaa] px-4 text-xs hover:bg-[#eee]">Review questions</button><a href="/practice?module=listening" className="inline-flex h-10 items-center rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Return to learning</a></div>
        </div>
      </div>
    );
  }

  const progress = Math.min(100, (audioElapsed / listeningDemo.estimatedSeconds) * 100);

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#222]">
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:hidden"><div className="max-w-md rounded-md border border-[#c8c8c8] bg-white p-7 text-center shadow-sm"><Headphones className="mx-auto size-7 text-[#355f7a]" /><h1 className="mt-4 text-xl font-semibold">IELTS Listening Computer Mode</h1><p className="mt-3 text-sm leading-6 text-[#5b5b5b]">为了保留真实机考的题目密度与操作习惯，这个界面请在电脑或平板横屏下使用。</p><a href="/practice?module=listening" className="mt-6 inline-flex rounded-sm bg-[#2f2f2f] px-5 py-2.5 text-sm text-white">返回学习页</a></div></div>

      <div className="hidden h-screen flex-col overflow-hidden bg-white lg:flex">
        <header className="flex h-[58px] shrink-0 items-center border-b border-[#c7c7c7] bg-[#f7f7f7] px-4">
          <div className="flex min-w-0 flex-1 items-center gap-3"><a href="/practice?module=listening" className="flex size-9 items-center justify-center rounded-sm border border-[#b9b9b9] bg-white hover:bg-[#efefef]" aria-label="Exit listening mode"><ChevronLeft className="size-4" /></a><div className="min-w-0"><p className="truncate text-sm font-semibold">IELTS Academic Listening</p><p className="text-[11px] text-[#666]">{mode === "exam" ? "Exam mode" : "Familiarisation mode"} · {scope === "full" ? "Full timer" : "Section 1 practice"}</p></div></div>
          {mode === "exam" ? <div className={cn("flex items-center gap-2 rounded-sm border px-4 py-2 text-[15px] font-semibold", strictTimeLeft < 300 ? "border-[#ba4b43] bg-[#fff2f1] text-[#8b201b]" : "border-[#bdbdbd] bg-white")}><Clock3 className="size-4" /><span className="font-mono">{formatTime(strictTimeLeft)}</span></div> : <PracticeTimerPopover defaultMinutes={defaultMinutes} storageKey={`ivy-listening-timer-${scope}`} onSnapshot={handleTimerSnapshot} />}
          <div className="flex flex-1 justify-end gap-2"><button type="button" onClick={() => setHelpOpen(true)} className="flex h-9 items-center gap-2 rounded-sm border border-[#b9b9b9] bg-white px-3 text-xs hover:bg-[#efefef]"><CircleHelp className="size-4" />Help</button><button type="button" onClick={() => setFinishOpen(true)} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Finish</button></div>
        </header>

        <div className="shrink-0 border-b border-[#ccc] bg-white px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#edf3f6] text-[#355f7a]"><Volume2 className="size-4" /></div>
            <div className="min-w-0 flex-1"><div className="mb-1.5 flex items-center justify-between text-[10px] text-[#666]"><span>{audioState === "idle" ? "Audio not started" : audioState === "playing" ? "Playing" : audioState === "paused" ? "Paused" : "Finished"}</span><span>{formatTime(audioElapsed)} / ~{formatTime(listeningDemo.estimatedSeconds)}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#ddd]"><div className="h-full bg-[#557b92]" style={{ width: `${progress}%` }} /></div></div>
            <div className="flex items-center gap-1.5">
              {mode === "familiarisation" ? <><button type="button" onClick={() => seekBy(-5)} disabled={!audioStarted} className="flex h-9 items-center gap-1 rounded-sm border border-[#bbb] px-2 text-[10px] disabled:opacity-40"><Rewind className="size-3.5" />5s</button>{audioState === "playing" ? <button type="button" onClick={pauseAudio} className="flex h-9 items-center gap-1 rounded-sm border border-[#bbb] px-3 text-[11px]"><Pause className="size-3.5" />暂停</button> : <button type="button" onClick={startAudio} className="flex h-9 items-center gap-1 rounded-sm border border-[#557b92] bg-[#eef5f8] px-3 text-[11px] text-[#264f67]"><Play className="size-3.5" />{audioState === "paused" ? "继续" : "播放"}</button>}<button type="button" onClick={() => seekBy(5)} disabled={!audioStarted} className="flex h-9 items-center gap-1 rounded-sm border border-[#bbb] px-2 text-[10px] disabled:opacity-40">5s<FastForward className="size-3.5" /></button><button type="button" onClick={replay} disabled={!audioStarted} className="flex h-9 items-center gap-1 rounded-sm border border-[#bbb] px-2 text-[10px] disabled:opacity-40"><RotateCcw className="size-3.5" />重放</button></> : <button type="button" onClick={startAudio} disabled={audioStarted} className="flex h-9 items-center gap-1 rounded-sm bg-[#2d2d2d] px-4 text-[11px] font-semibold text-white disabled:opacity-45"><Play className="size-3.5" />{audioStarted ? "Audio started" : "Start audio"}</button>}
              <input type="range" min="0.1" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="ml-2 w-24" aria-label="Listening volume" />
            </div>
          </div>
          {mode === "familiarisation" ? <p className="mt-2 text-[10px] text-[#777]">当前原型使用浏览器语音；±5 秒会跳到最接近的语句位置。接入真实音频后会变成精确 seek。</p> : <p className="mt-2 text-[10px] text-[#777]">Exam mode: audio can be started once and cannot be paused, skipped or replayed.</p>}
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto bg-[#fbfbfb] px-7 py-6"><div className="mx-auto max-w-3xl"><p className="text-xs font-semibold tracking-wide text-[#555]">{listeningDemo.sectionLabel}</p><h1 className="mt-2 text-xl font-semibold">Photography workshop booking</h1><p className="mt-2 text-xs leading-5 text-[#666]">Questions 1–10. Answer while you listen.</p><div className="mt-6 space-y-4">{listeningDemo.questions.map((question) => <div key={question.id} className="rounded-sm border border-[#d1d1d1] bg-white p-5"><p className="text-[12px] leading-5 text-[#666]">{question.instruction}</p><div className="mt-3 flex items-start gap-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-[#2a2a2a] text-xs font-semibold text-white">{question.number}</span><p className="pt-0.5 text-[15px] leading-6">{question.stem}</p></div>{question.type === "text" ? <input value={answers[question.id] ?? ""} onChange={(event) => setAnswers((previous) => ({ ...previous, [question.id]: event.target.value }))} spellCheck={false} autoCorrect="off" autoCapitalize="off" className="mt-4 h-10 w-full max-w-sm rounded-sm border border-[#8b8b8b] px-3 text-sm outline-none focus:border-[#557b92]" placeholder="Type your answer" /> : <div className="mt-4 space-y-2">{question.options?.map((option) => <button key={option.value} type="button" onClick={() => setAnswers((previous) => ({ ...previous, [question.id]: option.value }))} className="flex w-full items-center gap-3 rounded-sm border border-[#c9c9c9] px-3 py-2.5 text-left text-sm hover:border-[#777]"><span className={cn("flex size-4 items-center justify-center rounded-full border border-[#777]", answers[question.id] === option.value && "border-[#1d5f8c]")}>{answers[question.id] === option.value ? <span className="size-2 rounded-full bg-[#1d5f8c]" /> : null}</span><strong>{option.value}</strong><span>{option.label}</span></button>)}</div>}</div>)}</div></div></main>

        <footer className="flex h-[58px] shrink-0 items-center justify-between border-t border-[#bbb] bg-[#f5f5f5] px-5 text-xs"><span>Section 1 · Questions 1–10</span><span>{answeredCount} / 10 answered</span></footer>

        {helpOpen ? <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/35 p-6"><div className="w-full max-w-xl rounded-sm bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-[#ccc] px-5 py-4"><h2 className="text-base font-semibold">Listening help</h2><button type="button" onClick={() => setHelpOpen(false)} className="flex size-8 items-center justify-center hover:bg-[#eee]"><X className="size-4" /></button></div><div className="space-y-4 p-6 text-sm leading-6 text-[#444]"><p>Practice mode includes pause, continue, approximate ±5 second seeking and replay.</p><p>Its timer can be untimed, elapsed or countdown. Section practice defaults to 10 minutes; full Listening defaults to 30 minutes, and both can be customised.</p><p>Exam mode keeps the one-play rule and removes practice audio controls.</p></div></div></div> : null}
        {finishOpen ? <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-6"><div className="w-full max-w-md rounded-sm bg-white shadow-2xl"><div className="border-b border-[#ccc] px-6 py-5"><h2 className="text-base font-semibold">Finish this listening session?</h2></div><div className="p-6"><p className="text-sm">{answeredCount} / 10 answered</p><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setFinishOpen(false)} className="h-9 rounded-sm border border-[#aaa] px-4 text-xs hover:bg-[#eee]">Continue</button><button type="button" onClick={finishSession} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Finish</button></div></div></div></div> : null}
      </div>
    </div>
  );
}
