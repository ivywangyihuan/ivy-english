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

function SettingsPage() {
  const { learningStage, setLearningStage } = useAppState();

  return (
    <div className="journal-page space-y-10">
      <PageHeader title="设置" subtitle="只保留真正会影响你学习体验的选项。" />

      <section>
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-[var(--journal-blue)]" strokeWidth={1.6} />
          <div>
            <h2 className="display text-lg text-[var(--journal-ink)]">学习阶段</h2>
            <p className="mt-1 text-xs text-[#63709A]">
              先用来标记你现在处在哪个阶段，不会锁住任何练习内容。
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {learningStages.map((stage,index) => {
            const selected = learningStage === stage.key;
            return (
              <button
                key={stage.key}
                type="button"
                onClick={() => setLearningStage(stage.key)}
                className={cn(
                  "journal-index-card flex min-h-40 flex-col justify-between p-5 pt-7 text-left transition-all",
                  index%2===0?"md:-rotate-[0.15deg]":"md:rotate-[0.15deg]",
                  selected ? "border-[var(--journal-blue)] bg-[var(--journal-lavender)]" : "border-[var(--journal-line)] bg-[var(--journal-paper)] hover:border-[var(--journal-turquoise)]",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--journal-ink)]">{stage.label}</p>
                    <p className="mt-1 text-[11px] tracking-wide text-[#63709A]">{stage.english}</p>
                  </div>
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center border",
                      selected ? "border-[var(--journal-blue)] bg-[var(--journal-blue)] text-white" : "border-[var(--journal-line)] bg-[var(--journal-paper)] text-transparent",
                    )}
                    aria-hidden="true"
                  >
                    <Check className="size-3.5" strokeWidth={2} />
                  </span>
                </div>
                <p className="mt-6 text-xs leading-relaxed text-[#52608C]">{stage.description}</p>
              </button>
            );
          })}
        </div>

        <p className="journal-ledger mt-4 border border-[color:var(--journal-line)] bg-[var(--journal-paper)] p-4 text-[11px] leading-relaxed text-[#63709A]">
          目前切换阶段会同步首页的阶段标签。等后面接入真实学习数据后，我们再让 Today Plan 和推荐重点跟着阶段变化。
        </p>
      </section>
    </div>
  );
}
