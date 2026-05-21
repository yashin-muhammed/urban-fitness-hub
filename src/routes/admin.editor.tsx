import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImageIcon, Video, Link2, Package, Bold, Italic, List, Heading2, Save, Eye, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/editor")({
  component: Editor,
});

const tools = [
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Heading2, label: "Heading" },
  { icon: List, label: "List" },
  { icon: ImageIcon, label: "Image" },
  { icon: Video, label: "Video" },
  { icon: Package, label: "Product" },
  { icon: Link2, label: "Link" },
];

function Editor() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [meta, setMeta] = useState("");
  const seoScore = Math.min(100, 40 + title.length * 2 + meta.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Draft</p>
          <h1 className="text-2xl font-bold tracking-tight">New post</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Auto-saved · just now</span>
          <Button variant="outline" size="sm" className="gap-1.5"><Save className="h-4 w-4" /> Save draft</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><Eye className="h-4 w-4" /> Preview</Button>
          <Button size="sm" className="gap-1.5"><Send className="h-4 w-4" /> Publish</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-border bg-card">
          <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
            {tools.map((t) => (
              <button
                key={t.label}
                title={t.label}
                aria-label={t.label}
                className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <t.icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <div className="space-y-5 p-6 md:p-10">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(e.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
              }}
              placeholder="Untitled post"
              className="w-full bg-transparent text-4xl font-bold tracking-tight outline-none placeholder:text-muted-foreground/40"
            />
            <input
              placeholder="A short, punchy subtitle…"
              className="w-full bg-transparent text-lg text-muted-foreground outline-none placeholder:text-muted-foreground/40"
            />

            <div className="flex h-44 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface text-sm text-muted-foreground hover:border-foreground/30">
              <div className="text-center">
                <ImageIcon className="mx-auto h-6 w-6" />
                <p className="mt-2">Drop a cover image or <span className="font-semibold text-foreground">browse</span></p>
              </div>
            </div>

            <Textarea
              placeholder="Start writing your story. Type / for blocks…"
              className="min-h-[420px] resize-none border-0 bg-transparent text-[17px] leading-[1.8] shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        <aside className="space-y-4">
          <Panel title="Status">
            <Row label="Status" value={<Pill tone="warn">Draft</Pill>} />
            <Row label="Visibility" value="Public" />
            <Row label="Schedule" value="Now" />
          </Panel>

          <Panel title="Category & Tags">
            <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>Reviews</option><option>Gadgets</option><option>Home Gym</option><option>News</option><option>Events</option>
            </select>
            <Input placeholder="Add tags…" className="mt-2" />
          </Panel>

          <Panel title="SEO">
            <label className="text-xs font-medium text-muted-foreground">URL slug</label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="my-post-url" />
            <label className="mt-3 block text-xs font-medium text-muted-foreground">Meta description</label>
            <Textarea
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              placeholder="Show in Google search results…"
              className="min-h-[80px]"
            />
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">SEO score</span>
                <span className="font-semibold">{seoScore}/100</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${seoScore}%`,
                    background: seoScore > 75 ? "var(--success)" : "var(--brand)",
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Readability: Good</p>
            </div>
          </Panel>

          <Panel title="Product embeds">
            <Button variant="outline" size="sm" className="w-full gap-1.5">
              <Package className="h-4 w-4" /> Insert product card
            </Button>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-sm font-bold">{title}</h3>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Pill({ tone, children }: { tone: "warn" | "ok"; children: React.ReactNode }) {
  const cls = tone === "warn" ? "bg-brand/15 text-brand" : "bg-success/15 text-success";
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${cls}`}>{children}</span>;
}
