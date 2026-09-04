import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SignalStatus } from "@/data/mock";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <header className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><h1 className="display text-3xl sm:text-4xl">{title}</h1>{subtitle ? <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p> : null}</div>{action}</header>;
}

export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2"><div><h2 className="text-lg">{title}</h2>{subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}</div>{action}</div>;
}

export function StatusPill({ status }: { status: SignalStatus | string }) {
  const tone = status === "正在进步" ? "bg-sage-soft text-sage-foreground border-transparent" : status === "已稳定" ? "bg-secondary text-secondary-foreground border-transparent" : "bg-transparent text-muted-foreground border-border";
  return <span className={cn("inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[11px] tracking-wide", tone)}>{status}</span>;
}

export function Meta({ label, value }: { label: string; value: ReactNode }) {
  return <div><p className="text-[11px] text-muted-foreground">{label}</p><p className="mt-0.5 text-sm">{value}</p></div>;
}

export function Callout({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-border bg-secondary/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">{children}</div>;
}

export function formatCnDate(iso: string) {
  const [, m, d] = iso.split("-");
  return `${Number(m)}月${Number(d)}日`;
}

export function MiniBars({ data }: { data: { label: string; minutes: number }[] }) {
  const max = Math.max(...data.map((d) => d.minutes), 1);
  return <div className="space-y-3">{data.map((d) => <div key={d.label} className="flex items-center gap-3"><span className="w-10 shrink-0 text-xs text-muted-foreground">{d.label}</span><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-sage transition-all duration-500" style={{ width: `${Math.max((d.minutes / max) * 100, 2)}%` }} /></div><span className="w-14 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{d.minutes} min</span></div>)}</div>;
}

export function TrendChart({ data }: { data: { label: string; minutes: number }[] }) {
  const width = 640;
  const height = 168;
  const insetX = 20;
  const top = 18;
  const bottom = 34;
  const chartHeight = height - top - bottom;
  const max = Math.max(...data.map((d) => d.minutes), 1);
  const step = data.length > 1 ? (width - insetX * 2) / (data.length - 1) : 0;
  const points = data.map((d, index) => ({
    x: insetX + step * index,
    y: top + chartHeight - (d.minutes / max) * chartHeight,
    ...d,
  }));
  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");

  return <div>
    <div className="w-full overflow-hidden text-sage-foreground">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" role="img" aria-label="学习时间趋势折线图">
        <line x1={insetX} y1={top + chartHeight} x2={width - insetX} y2={top + chartHeight} className="stroke-border" strokeWidth="1" />
        <polyline points={polyline} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4" fill="currentColor" />
          <title>{`${point.label}: ${point.minutes} min`}</title>
        </g>)}
      </svg>
    </div>
    <div className="-mt-7 grid" style={{ gridTemplateColumns: `repeat(${Math.max(data.length, 1)}, minmax(0, 1fr))` }}>
      {data.map((d) => <span key={d.label} className="text-center text-[10px] text-muted-foreground">{d.label}</span>)}
    </div>
  </div>;
}

export function Chip({ active, children, onClick }: { active?: boolean; children: ReactNode; onClick?: () => void }) {
  return <button type="button" onClick={onClick} className={cn("shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors", active ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-sage hover:text-foreground")}>{children}</button>;
}
