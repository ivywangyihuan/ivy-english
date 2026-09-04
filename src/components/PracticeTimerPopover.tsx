import { useEffect, useRef, useState } from "react";
import { Check, Clock3, Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export type PracticeTimerMode = "off" | "elapsed" | "countdown";

export interface PracticeTimerSnapshot {
  mode: PracticeTimerMode;
  seconds: number;
  running: boolean;
  countdownMinutes: number;
}

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60).toString().padStart(2, "0");
  const rest = (safe % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

export function PracticeTimerPopover({
  defaultMinutes,
  storageKey,
  onSnapshot,
}: {
  defaultMinutes: number;
  storageKey: string;
  onSnapshot?: (snapshot: PracticeTimerSnapshot) => void;
}) {
  const [mode, setMode] = useState<PracticeTimerMode>("off");
  const [seconds, setSeconds] = useState(0);
  const [countdownMinutes, setCountdownMinutes] = useState(defaultMinutes);
  const [customMinutes, setCustomMinutes] = useState(String(defaultMinutes));
  const [running, setRunning] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<PracticeTimerSnapshot>;
      if (saved.mode === "off" || saved.mode === "elapsed" || saved.mode === "countdown") setMode(saved.mode);
      if (typeof saved.countdownMinutes === "number" && saved.countdownMinutes > 0) {
        setCountdownMinutes(saved.countdownMinutes);
        setCustomMinutes(String(saved.countdownMinutes));
      }
      if (typeof saved.seconds === "number" && Number.isFinite(saved.seconds) && saved.seconds >= 0) setSeconds(Math.floor(saved.seconds));
      if (typeof saved.running === "boolean") setRunning(saved.running);
    } catch {
      // Ignore malformed local timer state.
    }
  }, [storageKey]);

  useEffect(() => {
    if (!running || mode === "off") return;
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (mode === "countdown") {
          if (value <= 1) {
            setRunning(false);
            return 0;
          }
          return value - 1;
        }
        return value + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode, running]);

  useEffect(() => {
    const snapshot = { mode, seconds, running, countdownMinutes } satisfies PracticeTimerSnapshot;
    window.localStorage.setItem(storageKey, JSON.stringify(snapshot));
    onSnapshot?.(snapshot);
  }, [countdownMinutes, mode, onSnapshot, running, seconds, storageKey]);

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    window.addEventListener("pointerdown", closeOutside);
    return () => window.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  function selectMode(next: PracticeTimerMode) {
    setMode(next);
    setRunning(false);
    if (next === "elapsed" && mode !== "elapsed") setSeconds(0);
    if (next === "countdown" && mode !== "countdown") setSeconds(countdownMinutes * 60);
  }

  function applyCountdown(minutes: number) {
    const safe = Math.min(240, Math.max(1, Math.round(minutes)));
    setCountdownMinutes(safe);
    setCustomMinutes(String(safe));
    setSeconds(safe * 60);
    setRunning(false);
  }

  function reset() {
    setRunning(false);
    setSeconds(mode === "countdown" ? countdownMinutes * 60 : 0);
  }

  const label = mode === "off" ? "Untimed" : formatTime(seconds);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-sm border border-[#bdbdbd] bg-white px-4 py-2 text-[15px] font-semibold hover:bg-[#f2f2f2]"
      >
        <Clock3 className="size-4" />
        <span className={mode === "off" ? "text-xs font-medium" : "font-mono"}>{label}</span>
        {mode !== "off" ? <span className={cn("size-1.5 rounded-full", running ? "bg-[#2e6f4e]" : seconds === 0 && mode === "countdown" ? "bg-[#ba4b43]" : "bg-[#9b9b9b]")} /> : null}
      </button>

      {open ? (
        <div className="absolute left-1/2 top-[46px] z-[80] w-80 -translate-x-1/2 rounded-sm border border-[#aaa] bg-white p-2 shadow-xl">
          {([
            ["off", "不计时", "隐藏计时，不记录本轮用时"],
            ["elapsed", "正数计时", "从 00:00 开始记录实际用时"],
            ["countdown", "倒数计时", `默认 ${defaultMinutes} 分钟，也可以自定义`],
          ] as const).map(([key, title, hint]) => (
            <button
              key={key}
              type="button"
              onClick={() => selectMode(key)}
              className={cn("flex w-full items-start gap-3 rounded-sm px-3 py-2.5 text-left hover:bg-[#f2f2f2]", mode === key && "bg-[#f2f6f8]")}
            >
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center">{mode === key ? <Check className="size-4" /> : null}</span>
              <span><span className="block text-xs font-semibold">{title}</span><span className="mt-0.5 block text-[10px] leading-4 text-[#666]">{hint}</span></span>
            </button>
          ))}

          {mode === "countdown" ? (
            <div className="mt-2 border-t border-[#ddd] px-2 pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#777]">倒计时时长</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[defaultMinutes, 20, 30, 40, 60].filter((value, index, all) => all.indexOf(value) === index).map((minutes) => (
                  <button key={minutes} type="button" onClick={() => applyCountdown(minutes)} className={cn("h-8 rounded-sm border px-2.5 text-[11px]", countdownMinutes === minutes ? "border-[#557b92] bg-[#eef5f8] text-[#264f67]" : "border-[#bbb] hover:bg-[#f2f2f2]")}>{minutes}m</button>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={240}
                  value={customMinutes}
                  onChange={(event) => setCustomMinutes(event.target.value)}
                  className="h-9 min-w-0 flex-1 rounded-sm border border-[#bbb] px-3 text-xs outline-none focus:border-[#557b92]"
                  aria-label="自定义倒计时分钟数"
                />
                <button type="button" onClick={() => applyCountdown(Number(customMinutes) || defaultMinutes)} className="h-9 rounded-sm border border-[#bbb] px-3 text-[11px] hover:bg-[#f2f2f2]">设定分钟</button>
              </div>
            </div>
          ) : null}

          {mode !== "off" ? (
            <div className="mt-3 border-t border-[#ddd] p-2 pt-3">
              <div className="flex items-center justify-between px-1">
                <div>
                  <p className="font-mono text-lg font-semibold leading-none">{formatTime(seconds)}</p>
                  <p className="mt-1 text-[10px] text-[#666]">{running ? "正在计时" : mode === "countdown" && seconds === 0 ? "时间到" : seconds > 0 ? "已停止，可继续" : "尚未开始"}</p>
                </div>
                <span className={cn("rounded-full px-2 py-1 text-[10px]", running ? "bg-[#e8f3ec] text-[#286344]" : "bg-[#eee] text-[#666]")}>{running ? "RUNNING" : "PAUSED"}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <button type="button" onClick={reset} className="flex h-9 items-center justify-center gap-1.5 rounded-sm border border-[#bbb] text-[11px] hover:bg-[#f2f2f2]"><RotateCcw className="size-3.5" />重置</button>
                <button type="button" onClick={() => setRunning(true)} disabled={running || (mode === "countdown" && seconds <= 0)} className="flex h-9 items-center justify-center gap-1.5 rounded-sm border border-[#557b92] bg-[#eef5f8] text-[11px] text-[#264f67] disabled:opacity-45"><Play className="size-3.5" />{mode === "elapsed" && seconds === 0 ? "开始" : "继续"}</button>
                <button type="button" onClick={() => setRunning(false)} disabled={!running} className="flex h-9 items-center justify-center gap-1.5 rounded-sm border border-[#bbb] text-[11px] disabled:opacity-45"><Pause className="size-3.5" />停止</button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
