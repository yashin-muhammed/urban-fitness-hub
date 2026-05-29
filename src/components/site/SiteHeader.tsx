import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Menu, Dumbbell } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home", search: undefined as undefined | { category: string } },
  { to: "/blog", label: "Reviews", search: { category: "Reviews" } },
  { to: "/blog", label: "Gadgets", search: { category: "Gadgets" } },
  { to: "/blog", label: "Home Gym", search: { category: "Home Gym" } },
  { to: "/blog", label: "Events", search: { category: "Events" } },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-foreground text-background">
            <Dumbbell className="h-5 w-5" />
          </span>
          <span className="text-[15px] font-bold tracking-tight">
            Urban Fitness <span className="text-brand">Cart</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n, i) => (
            <Link
              key={i}
              to={n.to}
              className={`text-sm font-medium transition-colors hover:text-brand ${
                path === n.to ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Link to="/admin" className="hidden md:block">
            <Button variant="outline" size="sm">Admin</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="container-page flex flex-col py-3">
            {nav.map((n, i) => (
              <Link
                key={i}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/admin" onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-brand">
              Admin Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
