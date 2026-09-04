import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Ellipsis, ExternalLink, Home, Library, LineChart, Plus, Settings, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuickCaptureButton, QuickCaptureDialog } from "@/components/QuickCapture";
import { useAppState } from "@/state/app-state";

const nav = [
  { to: "/", label: "Home", mobileLabel: "首页", icon: Home },
  { to: "/practice", label: "学习", mobileLabel: "学习", icon: Sparkles },
  { to: "/bank", label: "题库", mobileLabel: "题库", icon: BookOpen },
  { to: "/progress", label: "进度", mobileLabel: "进度", icon: LineChart },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const { setCaptureOpen } = useAppState();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isExamRoute = pathname.startsWith("/exam");

  function openCapture() {
    setQuickMenuOpen(false);
    setCaptureOpen(true);
  }

  if (isExamRoute) return <>{children}</>;

  return (
    <div className="relative min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-sidebar px-4 py-7 md:flex">
        <div className="px-2">
          <p className="display text-lg leading-tight">Ivy English</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Personal Workspace</p>
        </div>
        <nav className="mt-9 flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="flex touch-manipulation items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-100 hover:bg-sidebar-accent/60 hover:text-foreground"
              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-1 border-t border-sidebar-border pt-4">
          <a
            href="https://www.notion.so"
            target="_blank"
            rel="noreferrer"
            className="flex touch-manipulation items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-100 hover:bg-sidebar-accent/60 hover:text-foreground"
          >
            <Library className="size-4" />资料库
            <ExternalLink className="ml-auto size-3" />
          </a>
          <Link
            to="/settings"
            className="flex touch-manipulation items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-100 hover:bg-sidebar-accent/60 hover:text-foreground"
            activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
          >
            <Settings className="size-4" />设置
          </Link>
        </div>
      </aside>

      <main className="md:pl-56">
        <div className="mx-auto w-full max-w-5xl px-5 pt-8 pb-32 sm:px-8 md:pt-10 md:pb-20">{children}</div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <div className="grid grid-cols-4">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className={cn("flex touch-manipulation flex-col items-center gap-1 py-3 text-[11px] text-muted-foreground transition-colors duration-100")}
              activeProps={{ className: "text-sage-foreground" }}
            >
              <item.icon className="size-5" />
              {item.mobileLabel}
            </Link>
          ))}
        </div>
      </nav>

      <div className="fixed right-5 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] z-40 md:hidden">
        <div className="relative size-12">
          <button
            type="button"
            aria-label="记录一次学习"
            onClick={openCapture}
            className={cn(
              "absolute right-[4.35rem] bottom-0 flex size-11 touch-manipulation items-center justify-center rounded-full border border-border bg-paper text-foreground shadow-lift transition-all duration-200",
              quickMenuOpen
                ? "pointer-events-auto translate-x-0 translate-y-0 scale-100 opacity-100"
                : "pointer-events-none translate-x-8 scale-75 opacity-0",
            )}
          >
            <Plus className="size-[18px]" strokeWidth={1.8} />
          </button>

          <a
            href="https://www.notion.so"
            target="_blank"
            rel="noreferrer"
            aria-label="打开资料库"
            onClick={() => setQuickMenuOpen(false)}
            className={cn(
              "absolute right-[3.15rem] bottom-[3.35rem] flex size-11 touch-manipulation items-center justify-center rounded-full border border-border bg-paper text-foreground shadow-lift transition-all duration-200",
              quickMenuOpen
                ? "pointer-events-auto translate-x-0 translate-y-0 scale-100 opacity-100 delay-[35ms]"
                : "pointer-events-none translate-x-5 translate-y-5 scale-75 opacity-0",
            )}
          >
            <Library className="size-[18px]" strokeWidth={1.7} />
          </a>

          <Link
            to="/settings"
            aria-label="打开设置"
            onClick={() => setQuickMenuOpen(false)}
            className={cn(
              "absolute right-0 bottom-[4.75rem] flex size-11 touch-manipulation items-center justify-center rounded-full border border-border bg-paper text-foreground shadow-lift transition-all duration-200",
              quickMenuOpen
                ? "pointer-events-auto translate-x-0 translate-y-0 scale-100 opacity-100 delay-[70ms]"
                : "pointer-events-none translate-y-7 scale-75 opacity-0",
            )}
          >
            <Settings className="size-[18px]" strokeWidth={1.7} />
          </Link>

          <button
            type="button"
            aria-label={quickMenuOpen ? "关闭快捷菜单" : "打开快捷菜单"}
            aria-expanded={quickMenuOpen}
            onClick={() => setQuickMenuOpen((open) => !open)}
            className="absolute inset-0 flex size-12 touch-manipulation items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform duration-200 active:scale-95"
          >
            {quickMenuOpen ? <X className="size-5" strokeWidth={1.8} /> : <Ellipsis className="size-5" strokeWidth={2} />}
          </button>
        </div>
      </div>

      <QuickCaptureButton />
      <QuickCaptureDialog />
    </div>
  );
}
