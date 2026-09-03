import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Home, Library, LineChart, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuickCaptureButton, QuickCaptureDialog } from "@/components/QuickCapture";

const nav = [
  { to: "/", label: "Home", mobileLabel: "首页", icon: Home },
  { to: "/practice", label: "学习", mobileLabel: "学习", icon: Sparkles },
  { to: "/bank", label: "题库", mobileLabel: "题库", icon: BookOpen },
  { to: "/progress", label: "进度", mobileLabel: "进度", icon: LineChart },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-sidebar px-4 py-7 md:flex">
        <div className="px-2"><p className="display text-lg leading-tight">Ivy English</p><p className="mt-1 text-[11px] text-muted-foreground">English Foundation</p></div>
        <nav className="mt-9 flex flex-col gap-1">
          {nav.map((item) => <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground" activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}><item.icon className="size-4" />{item.label}</Link>)}
        </nav>
        <div className="mt-auto flex flex-col gap-1 border-t border-sidebar-border pt-4"><a href="https://www.notion.so" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"><Library className="size-4" />资料库<ExternalLink className="ml-auto size-3" /></a><button type="button" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"><Settings className="size-4" />设置</button></div>
      </aside>
      <main className="md:pl-56"><div className="mx-auto w-full max-w-5xl px-5 pt-8 pb-32 sm:px-8 md:pt-12 md:pb-20">{children}</div></main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-paper/95 backdrop-blur md:hidden"><div className="grid grid-cols-4">{nav.map((item) => <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className={cn("flex flex-col items-center gap-1 py-3 text-[11px] text-muted-foreground transition-colors")} activeProps={{ className: "text-sage-foreground" }}><item.icon className="size-5" />{item.mobileLabel}</Link>)}</div></nav>
      <QuickCaptureButton /><QuickCaptureDialog />
    </div>
  );
}