import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, FileText, Package, Image as ImageIcon, Users, Settings, LogOut, Dumbbell, Search, Bell,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Urban Fitness Cart" }] }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/posts", label: "Posts", icon: FileText },
  { to: "/admin/editor", label: "New Post", icon: FileText },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/media", label: "Media Library", icon: ImageIcon },
  { to: "/admin/users", label: "Team", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-64 flex-col border-r border-border bg-background md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground text-background">
            <Dumbbell className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold">Urban Fitness</p>
            <p className="text-[11px] text-muted-foreground">Content Studio</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            return (
              <Link
                key={n.to + n.label}
                to={n.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3">
          <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
            <LogOut className="h-4 w-4" /> Back to site
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-background px-6">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search posts, products, media…" className="h-10 pl-9" />
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand" />
            </button>
            <div className="flex items-center gap-3 rounded-full border border-border bg-background py-1 pl-1 pr-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-brand-foreground">LH</span>
              <div className="hidden text-left leading-tight sm:block">
                <p className="text-xs font-semibold">Layla Hassan</p>
                <p className="text-[10px] text-muted-foreground">Editor</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
