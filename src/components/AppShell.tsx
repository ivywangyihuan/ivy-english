import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Home, Library, LineChart, Menu, Settings, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuickCaptureButton, QuickCaptureDialog } from "@/components/QuickCapture";

const nav = [
  { to: "/", label: "Home", mobileLabel: "首页", icon: Home },
  { to: "/practice", label: "学习", mobileLabel: "学习", icon: Sparkles },
  { to: "/bank", label: "题库", mobileLabel: "题库", icon: BookOpen },
  { to: "/progress", label: "进度", mobileLabel: "进度", icon: LineChart },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      <div className="absolute right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-40 md:hidden">
        <button
          type="button"
          aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex size-10 touch-manipulation items-center justify-center rounded-full border border-border bg-paper/95 text-foreground shadow-sm backdrop-blur transition-colors duration-100 active:bg-secondary"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {mobileMenuOpen ? (
          <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border border-border bg-paper/98 p-1.5 shadow-lift backdrop-blur">
            <a
              href="https://www.notion.so"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex touch-manipulation items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors duration-100 active:bg-secondary active:text-foreground"
            >
              <Library className="size-4" />
              <span>资料库</span>
              <ExternalLink className="ml-auto size-3" />
            </a>
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex touch-manipulation items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors duration-100 active:bg-secondary active:text-foreground"
            >
              <Settings className="size-4" />
              <span>设置</span>
            </Link>
          </div>
        ) : null}
      </div>

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

      <QuickCaptureButton />
      <QuickCaptureDialog />
    </div>
  );
}
