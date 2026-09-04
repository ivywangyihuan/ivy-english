import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Ear, FileText, Headphones, Mic, PenLine, BookOpenText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout, MiniBars, SectionTitle, StatusPill } from "@/components/ui-kit";
import { useAppState } from "@/state/app-state";
import { weekBreakdown } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ivy English · 个人英语与 IELTS 学习空间" },
      {
        name: "description",
        content: "Ivy English 是一个安静的个人英语学习空间：今天学什么、听说读写练习、近期 IELTS 考场题回忆与长期进度，都在一处。",
      },
      { property: "og:title", content: "Ivy English · 个人英语学习空间" },
      {
        property: "og:description",
        content: "今天学什么、听说读写练习、近期题库与长期进度，一个安静的个人学习空间。",
      },
    ],
  }),
  component: HomePage,
});

const quickStart = [
  { title: "听力", hint: "真实英语 · 听写 · Shadowing", icon: Headphones, module: "listening" as const },
  { title: "口语", hint: "自由表达 · IELTS Speaking", icon: Mic, module: "speaking" as const },
  { title: "阅读", hint: "文章阅读 · IELTS CBT", icon: BookOpenText, module: "reading" as const },
  { title: "写作", hint: "自由写作 · IELTS Writing", icon: PenLine, module: "writing" as const },
];

function HomePage() {
  const { plan, isShortPlan, setShortPlan, signals } = useAppState();
  const totalMinutes = plan.reduce((a, b) => a + b.minutes, 0);

  return (
    <div className="space-y-10">
      <header>
        <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-sage-foreground">
          <span className="size-1.5 rounded-full bg-sage" />
          9月3日 · 英语基础阶段
        </div>
        <h1 className="display text-3xl sm:text-4xl">晚上好，Ivy ♡</h1>
        <p className="mt-2 text-sm text-muted-foreground">按你舒服的节奏推进，今天也只做真正有用的练习。</p>
      </header>

      <section className="surface p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Today&apos;s plan</p>
            <h2 className="mt-1 text-xl">今天</h2>
          </div>
          <span className="text-xs text-muted-foreground">共 {totalMinutes} 分钟</span>
        </div>
        <div className="mt-5 divide-y divide-border">
          {plan.map((item) => (
            <div key={item.module} className="flex items-center justify-between gap-4 py-3.5">
              <div>
                <p className="text-sm">{item.module}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.hint}</p>
              </div>
              <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{item.minutes} 分钟</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link to="/practice" search={{ module: "listening" }}>
              开始今天的学习
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setShortPlan(!isShortPlan)}
            className="text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            {isShortPlan ? "恢复完整计划" : "我今天只有 20 分钟"}
          </button>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="lg:col-span-1">
          <SectionTitle title="继续上次" />
          <div className="surface hover-lift flex h-full flex-col justify-between gap-5 p-5 sm:p-6">
            <div>
              <p className="text-sm">IELTS Reading</p>
              <p className="mt-1 text-xs text-muted-foreground">Cambridge 18 · Test 2 · Passage 3</p>
              <p className="mt-4 text-xs text-muted-foreground">
                <span className="text-foreground tabular-nums">31 / 40</span>
                <span className="mx-2 text-border">·</span>38 分钟
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit rounded-full">
              <Link to="/practice" search={{ module: "reading" }}>
                继续查看
              </Link>
            </Button>
          </div>
        </section>

        <section className="lg:col-span-2">
          <SectionTitle title="开始学习" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {quickStart.map((card) => (
              <Link
                key={card.title}
                to="/practice"
                search={{ module: card.module }}
                className="surface hover-lift flex min-h-36 flex-col justify-between p-5"
              >
                <card.icon className="size-5 text-sage" strokeWidth={1.6} />
                <div className="mt-6">
                  <p className="text-sm">{card.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{card.hint}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section>
        <SectionTitle title="这周" />
        <div className="surface p-6 sm:p-8">
          <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
            <div>
              <p className="text-[11px] text-muted-foreground">总学习时间</p>
              <p className="display mt-1 text-2xl">3小时42分钟</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">学习次数</p>
              <p className="display mt-1 text-2xl">6 次</p>
            </div>
          </div>
          <div className="mt-6">
            <MiniBars data={weekBreakdown.map((w) => ({ label: w.module, minutes: w.minutes }))} />
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section>
          <SectionTitle
            title="最近需要注意"
            subtitle="反复出现的卡点，比一次分数更值得追踪。"
            action={
              <Link to="/progress" className="inline-flex items-center gap-1 text-xs text-sage-foreground hover:underline">
                查看全部 <ArrowRight className="size-3" />
              </Link>
            }
          />
          <div className="surface divide-y divide-border overflow-hidden">
            {signals.slice(0, 3).map((signal) => (
              <Link
                key={signal.id}
                to="/progress"
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-secondary/40"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm">{signal.title}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {signal.module} · 已出现 {signal.occurrenceCount} 次
                  </p>
                </div>
                <StatusPill status={signal.status} />
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle
            title="最近考场题"
            subtitle="近期考生回忆整理 · 非官方真题"
            action={
              <Link
                to="/bank"
                search={{ tab: "recent", subject: "全部" }}
                className="inline-flex items-center gap-1 text-xs text-sage-foreground hover:underline"
              >
                进入题库 <ArrowRight className="size-3" />
              </Link>
            }
          />
          <div className="surface p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                to="/bank"
                search={{ tab: "recent", subject: "口语" }}
                className="rounded-xl border border-border bg-secondary/50 p-4 transition-colors hover:border-sage"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Mic className="size-4 text-sage" strokeWidth={1.6} />Speaking
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Sep–Dec 2026 · 本季口语题库</p>
              </Link>
              <Link
                to="/bank"
                search={{ tab: "recent", subject: "写作" }}
                className="rounded-xl border border-border bg-secondary/50 p-4 transition-colors hover:border-sage"
              >
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="size-4 text-sage" strokeWidth={1.6} />Writing
                </div>
                <p className="mt-2 text-xs text-muted-foreground">近期 Task 1 / Task 2 考场回忆</p>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Callout>
        <span className="inline-flex items-center gap-2">
          <Ear className="size-3.5" />现在以真实英语输入为主，IELTS 练习保持低频接触。
        </span>
      </Callout>
    </div>
  );
}
