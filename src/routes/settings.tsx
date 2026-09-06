import { createFileRoute } from "@tanstack/react-router";
import { Check, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui-kit";
import { cn } from "@/lib/utils";
import { learningStages, useAppState } from "@/state/app-state";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "设置 · Ivy English" },
      { name: "description", content: "调整 Ivy English 的学习阶段和个人学习偏好。" },
    ],
  }),
  component: SettingsPage,
});

const stageTones = [
  { paper: "bg-[var(--journal-yellow)]", tape: "bg-[var(--journal-paper)]", accent: "bg-[var(--journal-peach)]" },
  { paper: "bg-[var(--journal-paper)]", tape: "bg-[var(--journal-yellow)]", accent: "bg-[var(--journal-peach)]" },
  { paper: "bg-[var(--journal-peach)]", tape: "bg-[var(--journal-paper)]", accent: "bg-[var(--journal-yellow)]" },
  { paper: "journal-ledger bg-[var(--journal-paper)]", tape: "bg-[var(--journal-peach)]", accent: "bg-[var(--journal-yellow)]" },
];

function SettingsPage() {
  const { learningStage, setLearningStage } = useAppState();
  const selectedStage = learningStages.find((stage) => stage.key === learningStage) ?? learningStages[0];

  return (
    <div className="journal-page space-y-10">
      <PageHeader title="设置" subtitle="只保留真正会影响你学习体验的选项。" />

      <section className="journal-grid relative overflow-hidden border border-[var(--journal-line)] p-5 shadow-[4px_5px_0_rgba(23,48,109,.06)] sm:p-6">
        <span className="absolute right-6 top-0 h-5 w-20 translate-y-[-45%] rotate-2 bg-[var(--journal-peach)] opacity-85" />
        <div className="flex items-start gap-3">
          <SlidersHorizontal className="mt-0.5 size-4 text-[var(--journal-ink)]" strokeWidth={1.6} />
          <div className="min-w-0 flex-1">
            <h2 className="display text-lg text-[var(--journal-ink)]">学习阶段</h2>
            <p className="mt-1 text-xs text-[#63709A]">
              先用来标记你现在处在哪个阶段，不会锁住任何练习内容。
            </p>
          </div>
          <span className="shrink-0 rotate-[-2deg] border border-[var(--journal-ink)] bg-[var(--journal-paper)] px-2 py-1 text-[9px] font-semibold tracking-[0.12em] text-[var(--journal-ink)]">
            CURRENT
          </span>
        </div>
        {selectedStage ? <div className="mt-5 inline-flex max-w-full items-center gap-2 border border-[var(--journal-line)] bg-[var(--journal-paper)] px-3 py-2 text-xs text-[var(--journal-ink)] shadow-[2px_3px_0_rgba(23,48,109,.05)]"><span className="font-medium">{selectedStage.label}</span><span className="text-[#63709A]">· {selectedStage.english}</span></div> : null}
      </section>

      <section>
        <div className="grid gap-4 sm:grid-cols-2">
          {learningStages.map((stage,index) => {
            const selected = learningStage === stage.key;
            const tone = stageTones[index % stageTones.length];
            return (
              <button
                key={stage.key}
                type="button"
                onClick={() => setLearningStage(stage.key)}
                className={cn(
                  "relative flex min-h-44 overflow-visible border p-5 pt-8 text-left shadow-[4px_5px_0_rgba(23,48,109,.07)] transition-all sm:min-h-48",
                  tone.paper,
                  index%2===0?"md:-rotate-[0.15deg]":"md:rotate-[0.15deg]",
                  selected ? "border-[var(--journal-ink)] ring-1 ring-[var(--journal-ink)]" : "border-[var(--journal-line)] hover:-translate-y-0.5 hover:border-[var(--journal-ink)]",
                )}
              >
                <span className={cn("absolute left-1/2 top-0 h-4 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[-1deg] border-x border-[rgba(23,48,109,.10)] opacity-90",tone.tape)} />
                <span className={cn("absolute -right-px top-8 h-8 w-3 border-y border-l border-[var(--journal-line)]",tone.accent)} />
                <div className="flex w-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-[var(--journal-ink)]">{stage.label}</p>
                      <p className="mt-1 text-[11px] tracking-wide text-[#63709A]">{stage.english}</p>
                    </div>
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center border",
                        selected ? "border-[var(--journal-ink)] bg-[var(--journal-ink)] text-white" : "border-[var(--journal-line)] bg-[var(--journal-paper)] text-transparent",
                      )}
                      aria-hidden="true"
                    >
                      <Check className="size-3.5" strokeWidth={2} />
                    </span>
                  </div>
                  <p className="mt-7 border-t border-[color:var(--journal-line)] pt-3 text-xs leading-relaxed text-[#52608C]">{stage.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="relative mt-5 overflow-visible border border-[var(--journal-line)] bg-[var(--journal-paper)] p-4 shadow-[4px_5px_0_rgba(23,48,109,.05)]">
          <span className="absolute left-6 top-0 h-3 w-20 -translate-y-1/2 bg-[var(--journal-yellow)]" />
          <p className="journal-ledger p-2 text-[11px] leading-7 text-[#63709A]">
            目前切换阶段会同步首页的阶段标签。等后面接入真实学习数据后，我们再让 Today Plan 和推荐重点跟着阶段变化。
          </p>
        </div>
      </section>
    </div>
  );
}
