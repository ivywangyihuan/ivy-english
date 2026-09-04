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
    <div className="space-y-10">
      <PageHeader title="设置" subtitle="只保留真正会影响你学习体验的选项。" />

      <section>
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-sage" strokeWidth={1.6} />
          <div>
            <h2 className="text-lg">学习阶段</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              先用来标记你现在处在哪个阶段，不会锁住任何练习内容。
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {learningStages.map((stage) => {
            const selected = learningStage === stage.key;
            return (
              <button
                key={stage.key}
                type="button"
                onClick={() => setLearningStage(stage.key)}
                className={cn(
                  "surface hover-lift flex min-h-40 flex-col justify-between p-5 text-left transition-colors",
                  selected && "border-sage bg-sage-soft/45",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{stage.label}</p>
                    <p className="mt-1 text-[11px] tracking-wide text-muted-foreground">{stage.english}</p>
                  </div>
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full border",
                      selected ? "border-sage bg-sage text-white" : "border-border text-transparent",
                    )}
                    aria-hidden="true"
                  >
                    <Check className="size-3.5" strokeWidth={2} />
                  </span>
                </div>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{stage.description}</p>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          目前切换阶段会同步首页的阶段标签。等后面接入真实学习数据后，我们再让 Today Plan 和推荐重点跟着阶段变化。
        </p>
      </section>
    </div>
  );
}
