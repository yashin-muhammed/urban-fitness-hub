import { createFileRoute } from "@tanstack/react-router";
import { Twitter, Facebook, Linkedin, Link2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ProductCard } from "@/components/site/ProductCard";
import { heroArticle, articles, products } from "@/lib/mock-data";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: `${heroArticle.title} — Urban Fitness Cart` },
      { name: "description", content: heroArticle.excerpt },
      { property: "og:title", content: heroArticle.title },
      { property: "og:description", content: heroArticle.excerpt },
      { property: "og:image", content: heroArticle.cover },
    ],
  }),
  component: BlogDetail,
});

const toc = [
  "Why adjustable dumbbells",
  "How we tested",
  "Top pick: PowerBlock Pro 50",
  "Best value",
  "Best budget",
  "Verdict",
];

function BlogDetail() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <article className="container-page pb-20 pt-12">
        <div className="mx-auto max-w-3xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            {heroArticle.category}
          </span>
          <h1 className="mt-3 text-balance text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            {heroArticle.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{heroArticle.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm">
            <span className="font-semibold">{heroArticle.author}</span>
            <span className="text-muted-foreground">{heroArticle.date} · {heroArticle.readTime}</span>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl bg-surface">
          <img src={heroArticle.cover} alt={heroArticle.title} className="aspect-[16/9] w-full object-cover" />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-[200px_1fr_60px]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                On this page
              </p>
              <ul className="mt-4 space-y-2 border-l border-border pl-4 text-sm">
                {toc.map((t, i) => (
                  <li key={i}>
                    <a href={`#s${i}`} className="text-muted-foreground transition-colors hover:text-foreground">
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="prose-content text-[17px] leading-[1.8] text-foreground/90">
            <p>
              Adjustable dumbbells used to feel like a compromise — clunky dials, plates that rattled,
              and weight selections you couldn't fine-tune. In 2026 that's no longer the case.
            </p>

            <h2 id="s0" className="mt-10 text-2xl font-bold tracking-tight">Why adjustable dumbbells</h2>
            <p>
              A pair of adjustables replaces an entire dumbbell rack and gives back the floor of your
              apartment. For most home gym owners in the UAE — where square meters are precious — they're
              the single highest-ROI purchase you can make.
            </p>

            <ProductEmbed product={products[0]} />

            <h2 id="s1" className="mt-10 text-2xl font-bold tracking-tight">How we tested</h2>
            <p>
              We trained five different athletes through identical 8-week programs, swapping each
              dumbbell set weekly. We logged dial speed, plate noise, grip comfort and how each held up
              after being dropped from bench height.
            </p>

            <div className="my-8 overflow-hidden rounded-2xl bg-foreground">
              <div className="aspect-video w-full bg-foreground">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Review video"
                  allowFullScreen
                />
              </div>
            </div>

            <h2 id="s2" className="mt-10 text-2xl font-bold tracking-tight">Top pick: PowerBlock Pro 50</h2>
            <p>
              It's the quietest, most precise system we tested. The 2.5kg micro-loading lets you progress
              like you would in a commercial gym, and the cube-stack design means nothing rolls.
            </p>

            <ProductEmbed product={products[1]} />

            <h2 id="s5" className="mt-10 text-2xl font-bold tracking-tight">Verdict</h2>
            <p>
              If you can stretch your budget, the PowerBlock Pro 50 is the easy winner. If not, the Garmin
              ecosystem makes the watch pair a smart long-term investment.
            </p>

            <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
              <span className="text-sm font-medium">Share:</span>
              {[Twitter, Facebook, Linkedin, Link2].map((Icon, i) => (
                <button
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
                  aria-label="Share"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div />
        </div>
      </article>

      <section className="container-page py-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">Related reading</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {articles.map((a) => <ArticleCard key={a.slug} {...a} />)}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ProductEmbed({ product }: { product: (typeof products)[number] }) {
  return (
    <div className="my-8 not-prose">
      <ProductCard product={product} />
    </div>
  );
}
