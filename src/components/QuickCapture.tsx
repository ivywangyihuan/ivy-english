import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppState } from "@/state/app-state";
import type { Module } from "@/data/mock";
import { cn } from "@/lib/utils";

const modules: Module[] = ["听力", "口语", "阅读", "写作", "词汇"];
const subjectClass:Record<string,string>={听力:"subject-listening",口语:"subject-speaking",阅读:"subject-reading",写作:"subject-writing",词汇:""};

export function QuickCaptureButton() {
  const { setCaptureOpen } = useAppState();
  return (
    <button
      type="button"
      aria-label="记录一次学习"
      onClick={() => setCaptureOpen(true)}
      className="fixed right-8 bottom-8 z-40 hidden size-12 items-center justify-center rounded-full border border-[var(--journal-ink)] bg-[var(--journal-ink)] text-white shadow-[3px_3px_0_rgba(63,99,242,.20)] transition-transform duration-150 hover:scale-105 md:flex"
    >
      <Plus className="size-5" />
    </button>
  );
}

export function QuickCaptureDialog() {
  const { captureOpen, setCaptureOpen, addSession } = useAppState();
  const [module, setModule] = useState<Module>("听力");
  const [activity, setActivity] = useState("");
  const [minutes, setMinutes] = useState("20");
  const [score, setScore] = useState("");
  const [tool, setTool] = useState("");
  const [notes, setNotes] = useState("");

  function save() {
    addSession({
      date: new Date().toISOString().slice(0, 10),
      module,
      activity: activity.trim() || `${module}练习`,
      durationMinutes: Number(minutes) || 0,
      ...(score.trim() ? { score: score.trim() } : {}),
      ...(tool.trim() ? { tool: tool.trim() } : {}),
      ...(notes.trim() ? { notes: notes.trim() } : {}),
    });
    setCaptureOpen(false);
    setActivity("");
    setScore("");
    setTool("");
    setNotes("");
    toast.success("已记录这次学习");
  }

  return (
    <Dialog open={captureOpen} onOpenChange={setCaptureOpen}>
      <DialogContent className="journal-app max-w-md rounded-sm border-[var(--journal-line)] bg-[var(--journal-canvas)]">
        <DialogHeader>
          <DialogTitle className="display text-xl text-[var(--journal-ink)]">记录一次学习</DialogTitle>
          <DialogDescription className="text-xs text-[#63709A]">随手记下来就好，不需要写得完整。</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-[#63709A]">科目</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {modules.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setModule(m)}
                  className={cn(
                    subjectClass[m],
                    "border px-3 py-1.5 text-xs transition-colors",
                    module === m
                      ? m==="词汇"?"border-[var(--journal-blue)] bg-[var(--journal-lavender)] text-[var(--journal-ink)]":"border-[var(--subject-color)] bg-[var(--subject-soft)] text-[var(--journal-ink)]"
                      : "border-[var(--journal-line)] bg-[var(--journal-paper)] text-[#63709A]",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="qc-activity" className="text-xs text-[#63709A]">学习内容</Label>
            <Input id="qc-activity" value={activity} onChange={(e) => setActivity(e.target.value)} placeholder="例如：访谈盲听 · 逐句对照" className="mt-2"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label htmlFor="qc-min" className="text-xs text-[#63709A]">时间（分钟）</Label><Input id="qc-min" inputMode="numeric" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="mt-2"/></div>
            <div><Label htmlFor="qc-score" className="text-xs text-[#63709A]">成绩（可选）</Label><Input id="qc-score" value={score} onChange={(e) => setScore(e.target.value)} placeholder="31 / 40" className="mt-2"/></div>
          </div>
          <div><Label htmlFor="qc-tool" className="text-xs text-[#63709A]">工具（可选）</Label><Input id="qc-tool" value={tool} onChange={(e) => setTool(e.target.value)} placeholder="English Trainer / IELTS CBT" className="mt-2"/></div>
          <div><Label htmlFor="qc-notes" className="text-xs text-[#63709A]">备注（可选）</Label><Textarea id="qc-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="mt-2 resize-none"/></div>
          <Button className="journal-button w-full rounded-sm" onClick={save}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}