import { Link } from "@tanstack/react-router";
import { Dumbbell, Instagram, Youtube, Twitter, Facebook } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-foreground text-background">
              <Dumbbell className="h-5 w-5" />
            </span>
            <span className="text-[15px] font-bold tracking-tight">
              Urban Fitness <span className="text-brand">Cart</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Independent reviews of fitness gear, gadgets and home gym equipment — written by athletes in the UAE.
          </p>
        </div>

        <FooterCol title="Explore" items={["Reviews", "Gadgets", "Home Gym", "Best Lists", "Events"]} />
        <FooterCol title="Company" items={["About", "Editorial Policy", "Contact", "Advertise", "Careers"]} />

        <div>
          <h4 className="text-sm font-semibold">Follow</h4>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            {[Instagram, Youtube, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© 2026 Urban Fitness Cart. All rights reserved.</p>
          <p>Made with rigor in Dubai, UAE.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}><a href="#" className="hover:text-foreground">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}
