import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronLeft, CircleHelp, Clock3, FileText, GripVertical, Highlighter, StickyNote, X } from "lucide-react";
import type { ExamMode, ExamQuestion } from "@/data/exam-demo";
import { readingFullDemo } from "@/data/reading-full-demo";
import { PracticeTimerPopover, type PracticeTimerSnapshot } from "@/components/PracticeTimerPopover";
import { cn } from "@/lib/utils";

type ReadingScope = "passage" | "full";
type Answers = Record<string, string>;

export const Route = createFileRoute("/exam-v3")({
  validateSearch: (search: Record<string, unknown>): { mode: ExamMode; scope: ReadingScope } => ({
    mode: search.mode === "exam" ? "exam" : "familiarisation",
    scope: search.scope === "full" ? "full" : "passage",
  }),
  head: () => ({ meta: [{ title: "IELTS Reading Computer Mode · Ivy English" }] }),
  component: ReadingExamPage,
});

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safe / 60).toString().padStart(2, "0")}:${(safe % 60).toString().padStart(2, "0")}`;
}

function normalise(value: string) {
  return value.trim().toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightedText(text: string, highlights: string[]): ReactNode {
  const usable = highlights.filter((value) => value.length > 2 && text.includes(value));
  if (!usable.length) return text;
  const pattern = new RegExp(`(${usable.map(escapeRegExp).join("|")})`, "g");
  return text.split(pattern).map((part, index) => usable.includes(part) ? <mark key={`${part}-${index}`} className="bg-[#fff19b] px-0.5 text-inherit">{part}</mark> : part);
}

function QuestionBody({ question, answer, onAnswer }: { question: ExamQuestion; answer?: string; onAnswer: (value: string) => void }) {
  const optionTypes = ["multiple-choice", "true-false-not-given", "yes-no-not-given"];
  return <>
    <p className="text-[13px] leading-5 text-[#555]">{question.instruction}</p>
    <div className="mt-3 flex items-start gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-[#2a2a2a] text-xs font-semibold text-white">{question.number}</span>
      <p className="pt-0.5 text-[15px] leading-6">{question.stem}</p>
    </div>
    {optionTypes.includes(question.type) ? <div className="mt-4 space-y-2">{question.options?.map((option) => <button key={option.value} type="button" onClick={() => onAnswer(option.value)} className="flex w-full items-start gap-3 rounded-sm border border-[#c9c9c9] bg-white px-3 py-2.5 text-left text-[14px] leading-5 hover:border-[#6c6c6c]"><span className={cn("mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-[#777]", answer === option.value && "border-[#1d5f8c]")}>{answer === option.value ? <span className="size-2 rounded-full bg-[#1d5f8c]" /> : null}</span><span>{question.type === "multiple-choice" ? <strong className="mr-2">{option.value}</strong> : null}{option.label}</span></button>)}</div> : null}
    {question.type === "matching-information" ? <select value={answer ?? ""} onChange={(event) => onAnswer(event.target.value)} className="mt-4 h-10 w-full max-w-sm rounded-sm border border-[#8b8b8b] bg-white px-3 text-sm outline-none focus:border-[#1d5f8c]"><option value="">Choose an answer</option>{question.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : null}
    {["text-input", "summary-completion", "short-answer"].includes(question.type) ? <input value={answer ?? ""} onChange={(event) => onAnswer(event.target.value)} spellCheck={false} autoCorrect="off" autoCapitalize="off" className="mt-4 h-10 w-full max-w-sm rounded-sm border border-[#8b8b8b] bg-white px-3 text-sm outline-none focus:border-[#1d5f8c]" placeholder={question.maxWords ? `NO MORE THAN ${question.maxWords} WORD${question.maxWords > 1 ? "S" : ""}` : "Type your answer"} /> : null}
  </>;
}

function MatchingHeadings({ questions, answers, onAnswer }: { questions: ExamQuestion[]; answers: Answers; onAnswer: (id: string, value: string) => void }) {
  const [armed, setArmed] = useState<string | null>(null);
  const options = questions[0]?.options ?? [];
  const used = new Set(questions.map((question) => answers[question.id]).filter(Boolean));
  function assign(question: ExamQuestion, value: string) {
    if (!value) return;
    onAnswer(question.id, value);
    setArmed(null);
  }
  return <div className="overflow-hidden rounded-sm border border-[#c9c9c9] bg-white">
    <div className="border-b border-[#d6d6d6] bg-[#f7f7f7] p-4">
      <p className="text-center text-[13px] font-semibold">List of Headings</p>
      <div className="mt-3 space-y-2">{options.map((option) => { const disabled = used.has(option.value); const active = armed === option.value; return <button key={option.value} type="button" draggable={!disabled} disabled={disabled} onDragStart={(event) => event.dataTransfer.setData("text/plain", option.value)} onClick={() => setArmed((value) => value === option.value ? null : option.value)} className={cn("flex w-full items-center gap-3 rounded-sm border px-3 py-2 text-left text-[13px]", disabled ? "cursor-not-allowed border-[#ddd] bg-[#ededed] text-[#999]" : active ? "border-[#39729a] bg-[#eaf3f8]" : "border-[#bdbdbd] bg-white hover:border-[#777]")}><GripVertical className="size-4" /><strong className="w-6">{option.value}</strong><span>{option.label}</span>{disabled ? <span className="ml-auto text-[10px] uppercase">used</span> : null}</button>; })}</div>
    </div>
    <div className="divide-y divide-[#ddd]">{questions.map((question) => { const selected = options.find((option) => option.value === answers[question.id]); return <div key={question.id} className="p-5"><div className="flex items-center gap-3"><span className="flex size-7 items-center justify-center rounded-sm bg-[#2a2a2a] text-xs font-semibold text-white">{question.number}</span><span className="text-[15px]">{question.stem}</span></div><div role="button" tabIndex={0} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); assign(question, event.dataTransfer.getData("text/plain")); }} onClick={() => armed && assign(question, armed)} className={cn("mt-3 min-h-12 rounded-sm border-2 border-dashed px-3 py-2.5 text-[13px]", selected ? "border-solid border-[#5f8196] bg-[#eef5f8]" : armed ? "border-[#6d94ab] bg-[#f4f9fb]" : "border-[#aaa] bg-white")}>{selected ? <div className="flex items-center gap-2"><strong>{selected.value}</strong><span className="flex-1">{selected.label}</span><button type="button" onClick={(event) => { event.stopPropagation(); onAnswer(question.id, ""); }} className="flex size-7 items-center justify-center"><X className="size-3.5" /></button></div> : <span className="text-[#777]">Drop heading here or select a heading above</span>}</div></div>; })}</div>
  </div>;
}

function ReadingExamPage() {
  const { mode, scope } = Route.useSearch();
  const sections = scope === "full" ? readingFullDemo.sections : [readingFullDemo.sections[0]!];
  const allQuestions = useMemo(() => sections.flatMap((section) => section.questions), [sections]);
  const defaultMinutes = scope === "full" ? 60 : 20;
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [strictTimeLeft, setStrictTimeLeft] = useState(defaultMinutes * 60);
  const [practiceTimer, setPracticeTimer] = useState<PracticeTimerSnapshot>({ mode: "off", seconds: 0, running: false, countdownMinutes: defaultMinutes });
  const [helpOpen, setHelpOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [note, setNote] = useState("");
  const [highlights, setHighlights] = useState<string[]>([]);
  const [selectedText, setSelectedText] = useState("");
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const storageKey = `ivy-reading-v3-${scope}`;
  const activeSection = sections[activeSectionIndex] ?? sections[0]!;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as { answers?: Answers; note?: string; highlights?: string[] };
      if (saved.answers) setAnswers(saved.answers);
      if (saved.note) setNote(saved.note);
      if (saved.highlights) setHighlights(saved.highlights);
    } catch { /* ignore malformed local state */ }
  }, [storageKey]);

  useEffect(() => { window.localStorage.setItem(storageKey, JSON.stringify({ answers, note, highlights })); }, [answers, highlights, note, storageKey]);
  useEffect(() => { setStrictTimeLeft(defaultMinutes * 60); }, [defaultMinutes]);
  useEffect(() => { if (mode !== "exam" || completed || strictTimeLeft <= 0) return; const timer = window.setInterval(() => setStrictTimeLeft((value) => Math.max(0, value - 1)), 1000); return () => window.clearInterval(timer); }, [completed, mode, strictTimeLeft]);
  const handleTimerSnapshot = useCallback((snapshot: PracticeTimerSnapshot) => setPracticeTimer(snapshot), []);

  const answeredCount = useMemo(() => allQuestions.filter((question) => answers[question.id]?.trim()).length, [allQuestions, answers]);
  const score = useMemo(() => allQuestions.reduce((total, question) => { const given = normalise(answers[question.id] ?? ""); return total + (given && question.correctAnswers?.some((answer) => normalise(answer) === given) ? 1 : 0); }, 0), [allQuestions, answers]);

  function setAnswer(id: string, value: string) { setAnswers((previous) => ({ ...previous, [id]: value })); }
  function setMatching(id: string, value: string) {
    const matchingQuestions = activeSection.questions.filter((question) => question.type === "matching-headings");
    setAnswers((previous) => { const next = { ...previous }; if (value) matchingQuestions.forEach((question) => { if (question.id !== id && next[question.id] === value) next[question.id] = ""; }); next[id] = value; return next; });
  }
  function jumpTo(number: number) {
    const sectionIndex = sections.findIndex((section) => section.questions.some((question) => question.number === number));
    if (sectionIndex >= 0) setActiveSectionIndex(sectionIndex);
    window.setTimeout(() => questionRefs.current[number]?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
  }
  function captureSelection() { const selection = window.getSelection()?.toString().trim() ?? ""; if (selection.length > 2 && selection.length < 240) setSelectedText(selection); }
  function addHighlight() { if (!selectedText) return; setHighlights((previous) => previous.includes(selectedText) ? previous : [...previous, selectedText]); setSelectedText(""); window.getSelection()?.removeAllRanges(); }
  function addNote() { if (selectedText) setNote((previous) => `${previous}${previous ? "\n\n" : ""}“${selectedText}”\n`); setSelectedText(""); setNotesOpen(true); window.getSelection()?.removeAllRanges(); }

  if (completed) {
    const usedTime = mode === "exam" ? defaultMinutes * 60 - strictTimeLeft : practiceTimer.mode === "off" ? null : practiceTimer.mode === "elapsed" ? practiceTimer.seconds : practiceTimer.countdownMinutes * 60 - practiceTimer.seconds;
    return <div className="min-h-screen bg-[#f2f2f2] px-6 py-10 text-[#222]"><div className="mx-auto max-w-5xl overflow-hidden rounded-sm border border-[#c9c9c9] bg-white shadow-sm"><div className="border-b border-[#ddd] px-7 py-6"><div className="flex size-11 items-center justify-center rounded-full bg-[#e8f3ec] text-[#286344]"><Check className="size-5" /></div><h1 className="mt-5 text-xl font-semibold">Reading session complete</h1><p className="mt-2 text-sm text-[#666]">{scope === "full" ? "Three passages · 40-question Ivy structural sample" : "Single-passage Ivy practice"}</p></div><div className="grid gap-4 border-b border-[#ddd] p-7 sm:grid-cols-3"><div className="rounded-sm border border-[#ddd] p-5"><p className="text-xs text-[#666]">Score</p><p className="mt-2 text-2xl font-semibold">{score} / {allQuestions.length}</p></div><div className="rounded-sm border border-[#ddd] p-5"><p className="text-xs text-[#666]">Answered</p><p className="mt-2 text-2xl font-semibold">{answeredCount} / {allQuestions.length}</p></div><div className="rounded-sm border border-[#ddd] p-5"><p className="text-xs text-[#666]">Time</p><p className="mt-2 text-2xl font-semibold">{usedTime === null ? "—" : formatTime(usedTime)}</p></div></div><div className="max-h-[55vh] divide-y divide-[#e1e1e1] overflow-y-auto">{allQuestions.map((question) => { const given = answers[question.id]?.trim() || "—"; const correct = question.correctAnswers?.some((answer) => normalise(answer) === normalise(given)); return <div key={question.id} className="grid gap-3 px-7 py-4 sm:grid-cols-[52px_1fr_auto] sm:items-center"><span className={cn("flex size-8 items-center justify-center rounded-full text-xs font-semibold", correct ? "bg-[#e8f3ec] text-[#286344]" : "bg-[#fff0dd] text-[#8d5c18]")}>{question.number}</span><div><p className="text-sm">{question.stem}</p><p className="mt-1 text-xs text-[#666]">Your answer: {given}</p></div><div className="text-xs text-[#555]">Correct: {question.correctAnswers?.[0] ?? "—"}</div></div>; })}</div><div className="flex justify-end gap-2 border-t border-[#ddd] px-7 py-5"><button type="button" onClick={() => setCompleted(false)} className="h-10 rounded-sm border border-[#aaa] px-4 text-xs hover:bg-[#eee]">Review questions</button><a href="/practice?module=reading" className="inline-flex h-10 items-center rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Return to learning</a></div></div></div>;
  }

  const headingQuestions = activeSection.questions.filter((question) => question.type === "matching-headings");
  const regularQuestions = activeSection.questions.filter((question) => question.type !== "matching-headings");

  return <div className="min-h-screen bg-[#f2f2f2] text-[#222]">
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:hidden"><div className="max-w-md rounded-md border border-[#c8c8c8] bg-white p-7 text-center shadow-sm"><FileText className="mx-auto size-7 text-[#355f7a]" /><h1 className="mt-4 text-xl font-semibold">IELTS Reading Computer Mode</h1><p className="mt-3 text-sm leading-6 text-[#5b5b5b]">为了保留真实机考的双栏比例与操作习惯，请在电脑或平板横屏下使用。</p><a href="/practice?module=reading" className="mt-6 inline-flex rounded-sm bg-[#2f2f2f] px-5 py-2.5 text-sm text-white">返回学习页</a></div></div>
    <div className="hidden h-screen flex-col overflow-hidden bg-white lg:flex">
      <header className="flex h-[58px] shrink-0 items-center border-b border-[#c7c7c7] bg-[#f7f7f7] px-4">
        <div className="flex min-w-0 flex-1 items-center gap-3"><a href="/practice?module=reading" className="flex size-9 items-center justify-center rounded-sm border border-[#b9b9b9] bg-white hover:bg-[#efefef]"><ChevronLeft className="size-4" /></a><div><p className="text-sm font-semibold">IELTS Academic Reading</p><p className="text-[11px] text-[#666]">{scope === "full" ? "3 Passages · 40 Questions" : "Single Passage practice"}</p></div></div>
        {mode === "exam" ? <div className={cn("flex items-center gap-2 rounded-sm border px-4 py-2 text-[15px] font-semibold", strictTimeLeft < 300 ? "border-[#ba4b43] bg-[#fff2f1] text-[#8b201b]" : "border-[#bdbdbd] bg-white")}><Clock3 className="size-4" /><span className="font-mono">{formatTime(strictTimeLeft)}</span></div> : <PracticeTimerPopover defaultMinutes={defaultMinutes} storageKey={`ivy-reading-timer-v3-${scope}`} onSnapshot={handleTimerSnapshot} />}
        <div className="flex flex-1 justify-end gap-2"><button type="button" onClick={() => setHelpOpen(true)} className="flex h-9 items-center gap-2 rounded-sm border border-[#b9b9b9] bg-white px-3 text-xs hover:bg-[#efefef]"><CircleHelp className="size-4" />Help</button><button type="button" onClick={() => setFinishOpen(true)} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Finish</button></div>
      </header>
      {scope === "full" ? <div className="flex h-11 shrink-0 border-b border-[#ccc] bg-white px-4">{sections.map((section, index) => <button key={section.id} type="button" onClick={() => setActiveSectionIndex(index)} className={cn("border-b-2 px-5 text-xs font-semibold", activeSectionIndex === index ? "border-[#2b5874] bg-[#f4f8fa] text-[#21465d]" : "border-transparent text-[#666] hover:bg-[#f5f5f5]")}>Passage {index + 1}<span className="ml-2 font-normal text-[#888]">{section.questions[0]?.number}–{section.questions.at(-1)?.number}</span></button>)}</div> : null}
      <main className="grid min-h-0 flex-1 grid-cols-2 divide-x divide-[#bdbdbd]">
        <section onMouseUp={captureSelection} className="min-h-0 overflow-y-auto bg-white px-8 py-7"><p className="text-xs font-semibold tracking-wide text-[#555]">{activeSection.title}</p><h1 className="mt-3 text-xl font-semibold">{activeSection.passageTitle}</h1><p className="mt-4 border-l-2 border-[#777] pl-4 text-xs leading-5 text-[#666]">{activeSection.instruction}</p><div className="mt-7 space-y-5 text-[15px] leading-7">{activeSection.paragraphs.map((paragraph, index) => <p key={index}>{paragraph.label ? <strong className="mr-3">{paragraph.label}</strong> : null}{highlightedText(paragraph.text, highlights)}</p>)}</div></section>
        <section className="min-h-0 overflow-y-auto bg-[#fbfbfb] px-6 py-6"><div className="mb-4 flex flex-wrap items-center gap-2"><button type="button" disabled={!selectedText} onClick={addHighlight} className="flex h-8 items-center gap-1.5 rounded-sm border border-[#bbb] bg-white px-3 text-[11px] disabled:opacity-40"><Highlighter className="size-3.5" />Highlight</button><button type="button" onClick={addNote} className="flex h-8 items-center gap-1.5 rounded-sm border border-[#bbb] bg-white px-3 text-[11px]"><StickyNote className="size-3.5" />Note</button>{selectedText ? <span className="max-w-xs truncate text-[10px] text-[#777]">Selected: {selectedText}</span> : null}</div>
          {headingQuestions.length ? <MatchingHeadings questions={headingQuestions} answers={answers} onAnswer={setMatching} /> : null}
          <div className={cn("space-y-4", headingQuestions.length && "mt-4")}>{regularQuestions.map((question) => <div key={question.id} ref={(node) => { questionRefs.current[question.number] = node; }} className="scroll-m-8 rounded-sm border border-[#d1d1d1] bg-white p-5"><QuestionBody question={question} answer={answers[question.id]} onAnswer={(value) => setAnswer(question.id, value)} /></div>)}</div>
        </section>
      </main>
      <footer className="flex min-h-[64px] shrink-0 items-center gap-3 border-t border-[#bbb] bg-[#f5f5f5] px-4"><span className="shrink-0 text-xs font-semibold">Passage {activeSectionIndex + 1}</span><div className="flex flex-1 flex-wrap items-center gap-1">{allQuestions.map((question) => { const answered = Boolean(answers[question.id]?.trim()); const inActive = activeSection.questions.some((item) => item.id === question.id); return <button key={question.id} type="button" onClick={() => jumpTo(question.number)} className={cn("relative flex size-7 items-center justify-center rounded-sm border text-[10px] font-semibold", inActive ? "border-[#68869a] bg-white" : "border-[#ccc] bg-[#eee] text-[#777]")}>{question.number}{answered ? <span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-[#39785b]" /> : null}</button>; })}</div><span className="shrink-0 text-[11px] text-[#666]">{answeredCount}/{allQuestions.length} answered</span></footer>
      {notesOpen ? <div className="fixed right-5 top-[76px] z-[70] w-80 rounded-sm border border-[#aaa] bg-white shadow-xl"><div className="flex items-center justify-between border-b border-[#ddd] px-4 py-3"><span className="text-xs font-semibold">Notes</span><button type="button" onClick={() => setNotesOpen(false)}><X className="size-4" /></button></div><textarea value={note} onChange={(event) => setNote(event.target.value)} className="h-52 w-full resize-none p-4 text-sm outline-none" placeholder="Type notes here..." /></div> : null}
      {helpOpen ? <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/35 p-6"><div className="w-full max-w-xl rounded-sm bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-[#ccc] px-5 py-4"><h2 className="text-base font-semibold">Reading help</h2><button type="button" onClick={() => setHelpOpen(false)}><X className="size-4" /></button></div><div className="space-y-3 p-6 text-sm leading-6 text-[#444]"><p>Full mode contains three original Ivy passages and 40 questions. Use the Passage tabs or any question number to move between them.</p><p>Practice timing supports untimed, elapsed, countdown and a custom countdown. The default is 20 minutes for one passage and 60 minutes for the full set.</p><p>Select passage text to highlight it or add it to Notes.</p></div></div></div> : null}
      {finishOpen ? <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-6"><div className="w-full max-w-md rounded-sm bg-white shadow-2xl"><div className="border-b border-[#ccc] px-6 py-5"><h2 className="text-base font-semibold">Finish this Reading session?</h2></div><div className="p-6"><p className="text-sm">{answeredCount} / {allQuestions.length} answered</p>{answeredCount < allQuestions.length ? <p className="mt-2 text-xs text-[#8b5c18]">{allQuestions.length - answeredCount} questions are still unanswered.</p> : null}<div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setFinishOpen(false)} className="h-9 rounded-sm border border-[#aaa] px-4 text-xs">Continue</button><button type="button" onClick={() => { setFinishOpen(false); setCompleted(true); }} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Finish</button></div></div></div></div> : null}
    </div>
  </div>;
}
