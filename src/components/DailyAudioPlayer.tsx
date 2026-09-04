import { useEffect, useMemo, useRef, useState } from "react";
import { FastForward, Pause, Play, Rewind, RotateCcw, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DailyAudioPlayerProps {
  text: string;
  storageKey: string;
  onPlayStateChange?: (playing: boolean) => void;
}

type PlayerState = "idle" | "playing" | "paused" | "finished";

function format(seconds: number) {
  const safe = Math.max(0, Math.round(seconds));
  return `${Math.floor(safe / 60).toString().padStart(2, "0")}:${(safe % 60).toString().padStart(2, "0")}`;
}

export function DailyAudioPlayer({ text, storageKey, onPlayStateChange }: DailyAudioPlayerProps) {
  const segments = useMemo(() => text.split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter(Boolean), [text]);
  const durations = useMemo(() => segments.map((item) => Math.max(3, item.split(/\s+/).length / 2.2 + 0.8)), [segments]);
  const starts = useMemo(() => durations.map((_, index) => durations.slice(0, index).reduce((sum, value) => sum + value, 0)), [durations]);
  const total = useMemo(() => Math.max(1, Math.round(durations.reduce((sum, value) => sum + value, 0))), [durations]);
  const [state, setState] = useState<PlayerState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [rate, setRate] = useState(0.9);
  const [segmentIndex, setSegmentIndex] = useState(0);
  const generationRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as { elapsed?: number; volume?: number; rate?: number };
      if (typeof saved.elapsed === "number") setElapsed(Math.min(total, Math.max(0, saved.elapsed)));
      if (typeof saved.volume === "number") setVolume(Math.min(1, Math.max(0.1, saved.volume)));
      if (typeof saved.rate === "number") setRate(Math.min(1.2, Math.max(0.7, saved.rate)));
    } catch {
      // Ignore malformed local state.
    }
  }, [storageKey, total]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ elapsed, volume, rate }));
  }, [elapsed, rate, storageKey, volume]);

  useEffect(() => {
    onPlayStateChange?.(state === "playing");
  }, [onPlayStateChange, state]);

  useEffect(() => {
    if (state !== "playing") return;
    timerRef.current = window.setInterval(() => setElapsed((value) => Math.min(total, value + 1)), 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [state, total]);

  useEffect(() => () => {
    generationRef.current += 1;
    window.speechSynthesis?.cancel();
    if (timerRef.current) window.clearInterval(timerRef.current);
  }, []);

  function indexForSecond(target: number) {
    let index = 0;
    for (let i = 0; i < starts.length; i += 1) if ((starts[i] ?? 0) <= target) index = i;
    return index;
  }

  function speakFrom(index: number, generation: number) {
    if (!("speechSynthesis" in window) || index >= segments.length) {
      setState("finished");
      setElapsed(total);
      return;
    }
    setSegmentIndex(index);
    const utterance = new SpeechSynthesisUtterance(segments[index]);
    utterance.lang = "en-GB";
    utterance.rate = rate;
    utterance.volume = volume;
    utterance.onend = () => {
      if (generation !== generationRef.current) return;
      const next = index + 1;
      if (next >= segments.length) {
        setState("finished");
        setElapsed(total);
      } else {
        setElapsed(Math.round(starts[next] ?? 0));
        speakFrom(next, generation);
      }
    };
    utterance.onerror = () => {
      if (generation === generationRef.current) setState("paused");
    };
    window.speechSynthesis.speak(utterance);
  }

  function playFrom(target: number) {
    if (!("speechSynthesis" in window)) return;
    generationRef.current += 1;
    const generation = generationRef.current;
    window.speechSynthesis.cancel();
    const safe = Math.min(Math.max(0, target), Math.max(0, total - 1));
    setElapsed(safe);
    const index = indexForSecond(safe);
    setSegmentIndex(index);
    setState("playing");
    speakFrom(index, generation);
  }

  function toggle() {
    if (state === "playing") {
      window.speechSynthesis.pause();
      setState("paused");
      return;
    }
    if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
      return;
    }
    playFrom(state === "finished" ? 0 : elapsed);
  }

  function seek(target: number) {
    playFrom(target);
  }

  function replay() {
    playFrom(0);
  }

  function changeRate(next: number) {
    setRate(next);
    if (state === "playing") window.setTimeout(() => playFrom(elapsed), 0);
  }

  function changeVolume(next: number) {
    setVolume(next);
    if (state === "playing") window.setTimeout(() => playFrom(elapsed), 0);
  }

  return <div className="rounded-2xl border border-[#d6d5ce] bg-[#f7f7f3] p-4 sm:p-5">
    <div className="flex items-center gap-3">
      <button type="button" aria-label="后退 5 秒" onClick={() => seek(elapsed - 5)} className="flex size-10 items-center justify-center rounded-full border border-[#c8cbc6] bg-white hover:bg-[#eff2ed]"><Rewind className="size-4"/></button>
      <button type="button" aria-label={state === "playing" ? "暂停" : "播放"} onClick={toggle} className="flex size-12 items-center justify-center rounded-full bg-[#2e3e33] text-white shadow-sm">{state === "playing" ? <Pause className="size-5"/> : <Play className="ml-0.5 size-5"/>}</button>
      <button type="button" aria-label="前进 5 秒" onClick={() => seek(elapsed + 5)} className="flex size-10 items-center justify-center rounded-full border border-[#c8cbc6] bg-white hover:bg-[#eff2ed]"><FastForward className="size-4"/></button>
      <button type="button" aria-label="重新播放" onClick={replay} className="ml-auto flex size-9 items-center justify-center rounded-full text-[#626a64] hover:bg-white"><RotateCcw className="size-4"/></button>
    </div>
    <div className="mt-4 flex items-center gap-3">
      <span className="w-10 text-[11px] tabular-nums text-[#727873]">{format(elapsed)}</span>
      <input aria-label="音频进度" type="range" min={0} max={total} step={1} value={Math.min(total, elapsed)} onChange={(event) => setElapsed(Number(event.target.value))} onMouseUp={(event) => seek(Number((event.target as HTMLInputElement).value))} onTouchEnd={(event) => seek(Number((event.target as HTMLInputElement).value))} className="h-1.5 flex-1 accent-[#48624f]"/>
      <span className="w-10 text-right text-[11px] tabular-nums text-[#727873]">{format(total)}</span>
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-[#6d746f]">
      <div className="flex items-center gap-2"><Volume2 className="size-3.5"/><input aria-label="音量" type="range" min={0.1} max={1} step={0.1} value={volume} onChange={(event) => changeVolume(Number(event.target.value))} className="w-24 accent-[#48624f]"/></div>
      <div className="ml-auto flex gap-1">{[0.8,0.9,1,1.1].map((value) => <button key={value} type="button" onClick={() => changeRate(value)} className={cn("rounded-full px-2.5 py-1", rate === value ? "bg-[#dce7dc] text-[#36503e]" : "bg-white text-[#68706a]")}>{value.toFixed(1)}×</button>)}</div>
    </div>
    <p className="mt-3 text-[10px] text-[#8a908b]">Daily English player · 当前段 {segmentIndex + 1}/{Math.max(1, segments.length)}</p>
  </div>;
}
