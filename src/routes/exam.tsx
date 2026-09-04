import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  CircleHelp,
  Clock3,
  FileText,
  Highlighter,
  Menu,
  Minus,
  Plus,
  Settings2,
  StickyNote,
  X,
} from "lucide-react";
import { demoReadingExam, type ExamMode, type ExamQuestion } from "@/data/exam-demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/exam")({
  validateSearch: (search: Record<string, unknown>): { mode: ExamMode } => ({
    mode: search.mode === "exam" ? "exam" : "familiarisation",
  }),
  head: () => ({
    meta: [
      { title: "IELTS Computer Mode · Ivy English" },
      { name: "description", content: "Ivy English 的 IELTS 电脑考试熟悉与模拟界面。" },
    ],
  }),
  component: ExamPage,
});

type Answers = Record<string, string>;

const section = demoReadingExam.sections[0]!;
const storageKey = "ivy-english-exam-demo-reading";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightedText(text: string, highlights: string[]): ReactNode {
  const usable = highlights.filter((value) => value.length > 2 && text.includes(value));
  if (!usable.length) return text;
  const pattern = new RegExp(`(${usable.map(escapeRegExp).join("|")})`, "g");
  return text.split(pattern).map((part, index) =>
    usable.includes(part) ? (
      <mark key={`${part}-${index}`} className="bg-[#fff19b] px-0.5 text-inherit">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function OptionButtons({ question, answer, onAnswer }: { question: ExamQuestion; answer?: string; onAnswer: (value: string) => void }) {
  return (
    <div className="mt-4 space-y-2">
      {question.options?.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onAnswer(option.value)}
          className="flex w-full items-start gap-3 rounded-sm border border-[#c9c9c9] bg-white px-3 py-2.5 text-left text-[14px] leading-5 hover:border-[#6c6c6c]"
        >
          <span
            className={cn(
              "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-[#777]",
              answer === option.value && "border-[#1d5f8c]",
            )}
          >
            {answer === option.value ? <span className="size-2 rounded-full bg-[#1d5f8c]" /> : null}
          </span>
          <span>
            {question.type === "multiple-choice" ? <strong className="mr-2 font-semibold">{option.value}</strong> : null}
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}

function SelectAnswer({ question, answer, onAnswer }: { question: ExamQuestion; answer?: string; onAnswer: (value: string) => void }) {
  return (
    <label className="mt-4 block max-w-sm">
      <span className="sr-only">Answer for question {question.number}</span>
      <select
        value={answer ?? ""}
        onChange={(event) => onAnswer(event.target.value)}
        className="h-10 w-full rounded-sm border border-[#8b8b8b] bg-white px-3 text-sm outline-none focus:border-[#1d5f8c] focus:ring-1 focus:ring-[#1d5f8c]"
      >
        <option value="">Choose an answer</option>
        {question.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value} · {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAnswer({ question, answer, onAnswer }: { question: ExamQuestion; answer?: string; onAnswer: (value: string) => void }) {
  return (
    <input
      value={answer ?? ""}
      onChange={(event) => onAnswer(event.target.value)}
      spellCheck={false}
      autoCorrect="off"
      autoCapitalize="off"
      className="mt-4 h-10 w-full max-w-sm rounded-sm border border-[#8b8b8b] bg-white px-3 text-sm outline-none focus:border-[#1d5f8c] focus:ring-1 focus:ring-[#1d5f8c]"
      placeholder={question.maxWords ? `NO MORE THAN ${question.maxWords} WORD${question.maxWords > 1 ? "S" : ""}` : "Type your answer"}
    />
  );
}

function QuestionRenderer({ question, answer, onAnswer }: { question: ExamQuestion; answer?: string; onAnswer: (value: string) => void }) {
  const optionTypes = ["multiple-choice", "true-false-not-given", "yes-no-not-given"];
  const selectTypes = ["matching-headings", "matching-information"];

  return (
    <>
      <p className="text-[13px] leading-5 text-[#555]">{question.instruction}</p>
      <div className="mt-3 flex items-start gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-[#2a2a2a] text-xs font-semibold text-white">
          {question.number}
        </span>
        <p className="pt-0.5 text-[15px] leading-6 text-[#222]">{question.stem}</p>
      </div>
      {optionTypes.includes(question.type) ? <OptionButtons question={question} answer={answer} onAnswer={onAnswer} /> : null}
      {selectTypes.includes(question.type) ? <SelectAnswer question={question} answer={answer} onAnswer={onAnswer} /> : null}
      {["text-input", "summary-completion", "short-answer"].includes(question.type) ? (
        <TextAnswer question={question} answer={answer} onAnswer={onAnswer} />
      ) : null}
    </>
  );
}

function ExamPage() {
  const { mode } = Route.useSearch();
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLeft, setTimeLeft] = useState(demoReadingExam.durationMinutes * 60);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [displayOpen, setDisplayOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [selectedText, setSelectedText] = useState("");
  const [highlights, setHighlights] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved) as { answers?: Answers; highlights?: string[]; note?: string };
      if (parsed.answers) setAnswers(parsed.answers);
      if (parsed.highlights) setHighlights(parsed.highlights);
      if (parsed.note) setNote(parsed.note);
    } catch {
      // Ignore malformed local demo state.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ answers, highlights, note }));
  }, [answers, highlights, note]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = window.setInterval(() => setTimeLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [timeLeft]);

  const answeredCount = useMemo(() => Object.values(answers).filter((answer) => answer.trim()).length, [answers]);
  const unanswered = section.questions.filter((question) => !answers[question.id]?.trim()).map((question) => question.number);

  function setAnswer(id: string, value: string) {
    setAnswers((previous) => ({ ...previous, [id]: value }));
  }

  function jumpTo(number: number) {
    setCurrentQuestion(number);
    setReviewOpen(false);
    questionRefs.current[number]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function captureSelection() {
    const selection = window.getSelection()?.toString().trim() ?? "";
    if (selection.length > 2 && selection.length < 240) setSelectedText(selection);
  }

  function addHighlight() {
    if (!selectedText) return;
    setHighlights((previous) => (previous.includes(selectedText) ? previous : [...previous, selectedText]));
    setSelectedText("");
    window.getSelection()?.removeAllRanges();
  }

  function addSelectionToNote() {
    if (selectedText) {
      setNote((previous) => `${previous}${previous ? "\n\n" : ""}“${selectedText}”\n`);
      setSelectedText("");
    }
    setNotesOpen(true);
    window.getSelection()?.removeAllRanges();
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-[#222]">
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:hidden">
        <div className="max-w-md rounded-md border border-[#c8c8c8] bg-white p-7 text-center shadow-sm">
          <FileText className="mx-auto size-7 text-[#355f7a]" />
          <h1 className="mt-4 text-xl font-semibold">IELTS Computer Mode</h1>
          <p className="mt-3 text-sm leading-6 text-[#5b5b5b]">
            为了保留真实机考的双栏比例与操作习惯，这个界面请在电脑或平板横屏下使用。
          </p>
          <a href="/practice?module=reading" className="mt-6 inline-flex rounded-sm bg-[#2f2f2f] px-5 py-2.5 text-sm text-white">
            返回学习页
          </a>
        </div>
      </div>

      <div className="hidden h-screen flex-col overflow-hidden bg-white lg:flex">
        <header className="flex h-[58px] shrink-0 items-center border-b border-[#c7c7c7] bg-[#f7f7f7] px-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <a href="/practice?module=reading" className="flex size-9 items-center justify-center rounded-sm border border-[#b9b9b9] bg-white hover:bg-[#efefef]" aria-label="Exit exam mode">
              <ChevronLeft className="size-4" />
            </a>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">IELTS Academic Reading</p>
              <p className="text-[11px] text-[#666]">{mode === "exam" ? "Exam mode" : "Familiarisation mode"} · Ivy sample</p>
            </div>
          </div>

          <div className={cn("flex items-center gap-2 rounded-sm border px-4 py-2 font-mono text-[15px] font-semibold", timeLeft < 300 ? "border-[#ba4b43] bg-[#fff2f1] text-[#8b201b]" : "border-[#bdbdbd] bg-white")}>
            <Clock3 className="size-4" />
            {formatTime(timeLeft)}
          </div>

          <div className="flex flex-1 justify-end gap-2">
            <button type="button" onClick={() => setHelpOpen(true)} className="flex h-9 items-center gap-2 rounded-sm border border-[#b9b9b9] bg-white px-3 text-xs hover:bg-[#efefef]">
              <CircleHelp className="size-4" /> Help
            </button>
            <button type="button" onClick={() => setReviewOpen(true)} className="flex h-9 items-center gap-2 rounded-sm border border-[#b9b9b9] bg-white px-3 text-xs hover:bg-[#efefef]">
              <Menu className="size-4" /> Review
            </button>
            <button type="button" onClick={() => setSubmitOpen(true)} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white hover:bg-black">
              Finish test
            </button>
          </div>
        </header>

        <div className="relative flex h-[46px] shrink-0 items-center justify-between border-b border-[#d4d4d4] bg-white px-4 text-xs">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setDisplayOpen((open) => !open)} className="flex h-8 items-center gap-2 rounded-sm border border-[#c4c4c4] px-3 hover:bg-[#f4f4f4]">
              <Settings2 className="size-3.5" /> Display
            </button>
            <button type="button" onClick={() => setNotesOpen(true)} className="flex h-8 items-center gap-2 rounded-sm border border-[#c4c4c4] px-3 hover:bg-[#f4f4f4]">
              <StickyNote className="size-3.5" /> Notes
            </button>
            {highlights.length ? (
              <button type="button" onClick={() => setHighlights([])} className="h-8 rounded-sm px-2 text-[#555] underline underline-offset-2">
                Clear {highlights.length} highlight{highlights.length > 1 ? "s" : ""}
              </button>
            ) : null}
          </div>
          <div className="text-[#666]">Questions 1–10</div>

          {displayOpen ? (
            <div className="absolute left-4 top-10 z-40 w-56 rounded-sm border border-[#aaa] bg-white p-4 shadow-lg">
              <p className="font-semibold">Text size</p>
              <div className="mt-3 flex items-center justify-between rounded-sm border border-[#ccc]">
                <button type="button" onClick={() => setFontSize((size) => Math.max(14, size - 1))} className="flex size-9 items-center justify-center hover:bg-[#eee]"><Minus className="size-4" /></button>
                <span className="font-mono">{fontSize}px</span>
                <button type="button" onClick={() => setFontSize((size) => Math.min(21, size + 1))} className="flex size-9 items-center justify-center hover:bg-[#eee]"><Plus className="size-4" /></button>
              </div>
            </div>
          ) : null}
        </div>

        <main className="grid min-h-0 flex-1 grid-cols-2 divide-x divide-[#bdbdbd]">
          <section className="min-h-0 overflow-y-auto bg-white px-8 py-7" onMouseUp={captureSelection}>
            <p className="text-xs font-semibold tracking-wide text-[#555]">{section.title}</p>
            <h1 className="mt-4 text-[24px] font-semibold leading-tight">{section.passageTitle}</h1>
            <p className="mt-4 border-b border-[#ddd] pb-5 text-[13px] leading-5 text-[#5c5c5c]">{section.instruction}</p>
            <div className="mt-6 space-y-5" style={{ fontSize }}>
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${paragraph.label}-${index}`} className="leading-[1.72]">
                  {paragraph.label ? <strong className="mr-2 font-semibold">{paragraph.label}</strong> : null}
                  {highlightedText(paragraph.text, highlights)}
                </p>
              ))}
            </div>
          </section>

          <section className="min-h-0 overflow-y-auto bg-[#fbfbfb] px-7 py-6">
            <div className="mx-auto max-w-2xl space-y-4">
              {section.questions.map((question) => (
                <div
                  key={question.id}
                  ref={(node) => { questionRefs.current[question.number] = node; }}
                  onClick={() => setCurrentQuestion(question.number)}
                  className={cn(
                    "scroll-m-8 rounded-sm border bg-white p-5 transition-shadow",
                    currentQuestion === question.number ? "border-[#4e7894] shadow-[0_0_0_1px_#4e7894]" : "border-[#d1d1d1]",
                  )}
                >
                  <QuestionRenderer question={question} answer={answers[question.id]} onAnswer={(value) => setAnswer(question.id, value)} />
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="flex h-[64px] shrink-0 items-center border-t border-[#bdbdbd] bg-[#f5f5f5] px-4">
          <div className="mr-4 text-xs font-semibold">Part 1</div>
          <div className="flex flex-1 items-center gap-1.5 overflow-x-auto">
            {section.questions.map((question) => {
              const answered = Boolean(answers[question.id]?.trim());
              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => jumpTo(question.number)}
                  aria-label={`Question ${question.number}${answered ? ", answered" : ""}`}
                  className={cn(
                    "relative flex size-9 shrink-0 items-center justify-center rounded-sm border text-xs font-semibold",
                    currentQuestion === question.number
                      ? "border-[#222] bg-[#222] text-white"
                      : answered
                        ? "border-[#54809b] bg-[#e6f0f5] text-[#163f58]"
                        : "border-[#aaa] bg-white text-[#333] hover:bg-[#ececec]",
                  )}
                >
                  {question.number}
                  {answered && currentQuestion !== question.number ? <span className="absolute -right-1 -top-1 size-2 rounded-full bg-[#2e6f4e]" /> : null}
                </button>
              );
            })}
          </div>
          <div className="ml-4 text-xs text-[#555]">{answeredCount} / {section.questions.length} answered</div>
        </footer>

        {selectedText ? (
          <div className="fixed left-1/4 top-[110px] z-50 flex -translate-x-1/2 items-center gap-1 rounded-sm bg-[#252525] p-1 text-xs text-white shadow-xl">
            <button type="button" onClick={addHighlight} className="flex items-center gap-1.5 rounded-sm px-2.5 py-2 hover:bg-white/10"><Highlighter className="size-3.5" /> Highlight</button>
            <button type="button" onClick={addSelectionToNote} className="flex items-center gap-1.5 rounded-sm px-2.5 py-2 hover:bg-white/10"><StickyNote className="size-3.5" /> Note</button>
            <button type="button" onClick={() => setSelectedText("")} className="flex size-7 items-center justify-center rounded-sm hover:bg-white/10"><X className="size-3.5" /></button>
          </div>
        ) : null}

        {notesOpen ? (
          <aside className="fixed inset-y-0 right-0 z-[70] flex w-[360px] flex-col border-l border-[#aaa] bg-white shadow-2xl">
            <div className="flex h-14 items-center justify-between border-b border-[#ccc] px-4">
              <div className="flex items-center gap-2 text-sm font-semibold"><StickyNote className="size-4" /> Notes</div>
              <button type="button" onClick={() => setNotesOpen(false)} className="flex size-8 items-center justify-center hover:bg-[#eee]"><X className="size-4" /></button>
            </div>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              spellCheck={false}
              className="min-h-0 flex-1 resize-none p-5 text-sm leading-6 outline-none"
              placeholder="Type your notes here..."
            />
          </aside>
        ) : null}

        {reviewOpen ? (
          <div className="fixed inset-0 z-[80] bg-black/25" onClick={() => setReviewOpen(false)}>
            <aside className="ml-auto h-full w-[390px] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <div className="flex h-16 items-center justify-between border-b border-[#ccc] px-5">
                <div><p className="text-sm font-semibold">Review questions</p><p className="mt-0.5 text-[11px] text-[#666]">{answeredCount} of {section.questions.length} answered</p></div>
                <button type="button" onClick={() => setReviewOpen(false)} className="flex size-8 items-center justify-center hover:bg-[#eee]"><X className="size-4" /></button>
              </div>
              <div className="grid grid-cols-5 gap-2 p-5">
                {section.questions.map((question) => {
                  const answered = Boolean(answers[question.id]?.trim());
                  return <button key={question.id} type="button" onClick={() => jumpTo(question.number)} className={cn("flex h-11 items-center justify-center rounded-sm border text-sm font-semibold", answered ? "border-[#54809b] bg-[#e6f0f5] text-[#163f58]" : "border-[#aaa] bg-white")}>{question.number}</button>;
                })}
              </div>
              <div className="border-t border-[#ddd] px-5 py-4 text-xs text-[#555]">
                {unanswered.length ? `Unanswered: ${unanswered.join(", ")}` : "All questions have been answered."}
              </div>
            </aside>
          </div>
        ) : null}

        {helpOpen ? (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/35 p-6">
            <div className="w-full max-w-xl rounded-sm bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#ccc] px-5 py-4">
                <h2 className="text-base font-semibold">Computer test help</h2>
                <button type="button" onClick={() => setHelpOpen(false)} className="flex size-8 items-center justify-center hover:bg-[#eee]"><X className="size-4" /></button>
              </div>
              <div className="space-y-4 p-6 text-sm leading-6 text-[#444]">
                <p>Select text in the passage to highlight it or add it to your notes.</p>
                <p>Use the numbered boxes at the bottom to move directly to a question. Answered questions are shown in blue.</p>
                <p>This first Ivy sample is a familiarisation build using original practice content, not an official IELTS test paper.</p>
              </div>
            </div>
          </div>
        ) : null}

        {submitOpen ? (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-6">
            <div className="w-full max-w-md rounded-sm bg-white shadow-2xl">
              <div className="border-b border-[#ccc] px-6 py-5">
                <h2 className="text-base font-semibold">Finish this test?</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className={cn("flex size-11 items-center justify-center rounded-full", unanswered.length ? "bg-[#fff0dd] text-[#8d5c18]" : "bg-[#e8f3ec] text-[#286344]")}>{unanswered.length ? <FileText className="size-5" /> : <Check className="size-5" />}</div>
                  <div><p className="text-sm font-semibold">{answeredCount} / {section.questions.length} answered</p><p className="mt-1 text-xs text-[#666]">{unanswered.length ? `${unanswered.length} question${unanswered.length > 1 ? "s are" : " is"} still unanswered.` : "All questions are answered."}</p></div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button type="button" onClick={() => setSubmitOpen(false)} className="h-9 rounded-sm border border-[#aaa] px-4 text-xs hover:bg-[#eee]">Continue test</button>
                  <button type="button" onClick={() => { setSubmitOpen(false); setReviewOpen(true); }} className="h-9 rounded-sm bg-[#2d2d2d] px-4 text-xs font-semibold text-white">Review answers</button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
