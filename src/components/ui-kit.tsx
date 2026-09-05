import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SignalStatus } from "@/data/mock";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <header className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-[color:var(--journal-line)] pb-5"><div><h1 className="display text-3xl text-[var(--journal-ink)] sm:text-4xl">{title}</h1>{subtitle ? <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#52608C]">{subtitle}</p> : null}</div>{action}</header>;
}

export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2"><div><h2 className="display text-lg text-[var(--journal-ink)]">{title}</h2>{subtitle ? <p className="mt-1 text-xs text-[#63709A]">{subtitle}</p> : null}</div>{action}</div>;
}

export function StatusPill({ status }: { status: SignalStatus | string }) {
  const tone = status === "正在进步" ? "border-[var(--journal-ink)] bg-[#EEF4FF] text-[var(--journal-ink)]" : status === "已稳定" ? "border-[#63C94A] bg-[var(--journal-mint)] text-[var(--journal-ink)]" : "border-[var(--journal-line)] bg-[var(--journal-paper)] text-[#52608C]";
  return <span className={cn("inline-flex shrink-0 items-center rounded-sm border px-2.5 py-0.5 text-[11px] tracking-wide", tone)}>{status}</span>;
}

export function Meta({ label, value }: { label: string; value: ReactNode }) {
  return <div className="border-l-2 border-[var(--journal-line)] pl-3"><p className="text-[10px] uppercase tracking-[0.08em] text-[#63709A]">{label}</p><p className="mt-1 text-sm text-[var(--journal-ink)]">{value}</p></div>;
}

export function Callout({ children }: { children: ReactNode }) {
  return <div className="journal-ledger border border-[color:var(--journal-line)] bg-[var(--journal-yellow)] px-4 py-3 text-xs leading-relaxed text-[#52608C] shadow-[3px_4px_0_rgba(255,93,177,.07)]">{children}</div>;
}

export function formatCnDate(iso: string) {
  const [, m, d] = iso.split("-");
  return `${Number(m)}月${Number(d)}日`;
}

export function MiniBars({ data }: { data: { label: string; minutes: number }[] }) {
  const max = Math.max(...data.map((d) => d.minutes), 1);
  return <div className="space-y-3">{data.map((d) => <div key={d.label} className="flex items-center gap-3"><span className="w-10 shrink-0 text-xs text-[#63709A]">{d.label}</span><div className="h-2 flex-1 overflow-hidden bg-[#EEF4FF]"><div className="h-full bg-[var(--page-subject,var(--journal-ink))] transition-all duration-500" style={{ width: `${Math.max((d.minutes / max) * 100, 2)}%` }} /></div><span className="w-14 shrink-0 text-right text-xs tabular-nums text-[#63709A]">{d.minutes} min</span></div>)}</div>;
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
    <div className="w-full overflow-hidden text-[var(--page-subject,var(--journal-ink))]">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" role="img" aria-label="学习时间趋势折线图">
        <line x1={insetX} y1={top + chartHeight} x2={width - insetX} y2={top + chartHeight} stroke="var(--journal-line)" strokeWidth="1" />
        <polyline points={polyline} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4" fill="var(--journal-paper)" stroke="currentColor" strokeWidth="2" />
          <title>{`${point.label}: ${point.minutes} min`}</title>
        </g>)}
      </svg>
    </div>
    <div className="-mt-7 grid" style={{ gridTemplateColumns: `repeat(${Math.max(data.length, 1)}, minmax(0, 1fr))` }}>
      {data.map((d) => <span key={d.label} className="text-center text-[10px] text-[#63709A]">{d.label}</span>)}
    </div>
  </div>;
}

export function Chip({ active, children, onClick }: { active?: boolean; children: ReactNode; onClick?: () => void }) {
  return <button type="button" onClick={onClick} className={cn("shrink-0 rounded-sm border px-3 py-1.5 text-xs transition-all", active ? "border-[var(--journal-ink)] bg-[#EEF4FF] text-[var(--journal-ink)] shadow-[2px_2px_0_rgba(63,99,242,.10)]" : "border-[var(--journal-line)] bg-[var(--journal-paper)] text-[#52608C] hover:border-[var(--journal-ink)] hover:text-[var(--journal-ink)]")}>{children}</button>;
}
