import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  eyebrow,
  title,
  href,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
        )}
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      </div>
      {href && (
        <Link to={href} className="hidden items-center gap-1 text-sm font-medium text-foreground hover:text-brand md:inline-flex">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
