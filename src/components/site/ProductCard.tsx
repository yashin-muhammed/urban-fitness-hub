import { Star, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
      <div className="relative aspect-square overflow-hidden bg-surface">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-foreground">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {product.brand}
        </p>
        <h4 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug">{product.title}</h4>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-brand">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-current" : "opacity-25"}`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-muted-foreground">{product.rating}</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <span className="text-lg font-bold">{product.price}</span>
          <Button asChild size="sm" className="gap-1.5">
            <a href={product.affiliate} target="_blank" rel="noreferrer">
              Buy <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
