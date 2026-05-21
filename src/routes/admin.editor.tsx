import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  ImageIcon, Video, Link2, Package, Bold, Italic, List, ListOrdered,
  Heading2, Heading3, Quote, Code, Save, Eye, Send, Undo, Redo, Strikethrough,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/editor")({
  component: EditorPage,
});

function EditorPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [meta, setMeta] = useState("");
  const [cover, setCover] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Image,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-brand underline" } }),
      Placeholder.configure({ placeholder: "Start writing your story. Use the toolbar above to format…" }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-neutral max-w-none min-h-[420px] focus:outline-none text-[17px] leading-[1.8]",
      },
    },
  });

  const seoScore = Math.min(100, 30 + Math.min(title.length, 60) + Math.min(meta.length, 60) / 2 + (cover ? 10 : 0));

  function handleCover(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCover(String(reader.result));
    reader.readAsDataURL(file);
  }

  function insertImage() {
    const url = window.prompt("Image URL");
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  }
  function insertLink() {
    const url = window.prompt("Link URL");
    if (url && editor) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }
  function insertVideo() {
    const url = window.prompt("YouTube / video URL");
    if (url && editor) {
      editor.chain().focus().insertContent(
        `<p><a href="${url}" target="_blank" rel="noopener">▶ ${url}</a></p>`,
      ).run();
    }
  }
  function insertProduct() {
    if (!editor) return;
    editor.chain().focus().insertContent(
      `<blockquote><strong>Product:</strong> Replace with product name — affiliate card placeholder.</blockquote>`,
    ).run();
  }

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
          <Toolbar
            editor={editor}
            onImage={insertImage}
            onLink={insertLink}
            onVideo={insertVideo}
            onProduct={insertProduct}
          />

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
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="A short, punchy subtitle…"
              className="w-full bg-transparent text-lg text-muted-foreground outline-none placeholder:text-muted-foreground/40"
            />

            <label className="block cursor-pointer">
              <input type="file" accept="image/*" hidden onChange={(e) => handleCover(e.target.files?.[0])} />
              {cover ? (
                <img src={cover} alt="Cover" className="h-60 w-full rounded-xl object-cover" />
              ) : (
                <div className="flex h-44 items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface text-sm text-muted-foreground hover:border-foreground/30">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-6 w-6" />
                    <p className="mt-2">Drop a cover image or <span className="font-semibold text-foreground">browse</span></p>
                  </div>
                </div>
              )}
            </label>

            <EditorContent editor={editor} />
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
                <span className="font-semibold">{Math.round(seoScore)}/100</span>
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
            <Button onClick={insertProduct} variant="outline" size="sm" className="w-full gap-1.5">
              <Package className="h-4 w-4" /> Insert product card
            </Button>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function Toolbar({
  editor, onImage, onLink, onVideo, onProduct,
}: {
  editor: Editor | null;
  onImage: () => void; onLink: () => void; onVideo: () => void; onProduct: () => void;
}) {
  if (!editor) return <div className="h-12 border-b border-border" />;
  const btn = (active: boolean) =>
    `grid h-9 w-9 place-items-center rounded-md transition-colors ${
      active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
      <ToolBtn title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo className="h-4 w-4" /></ToolBtn>
      <ToolBtn title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo className="h-4 w-4" /></ToolBtn>
      <Divider />
      <button type="button" title="Bold" aria-label="Bold" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))}><Bold className="h-4 w-4" /></button>
      <button type="button" title="Italic" aria-label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))}><Italic className="h-4 w-4" /></button>
      <button type="button" title="Strikethrough" aria-label="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive("strike"))}><Strikethrough className="h-4 w-4" /></button>
      <Divider />
      <button type="button" title="Heading 2" aria-label="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))}><Heading2 className="h-4 w-4" /></button>
      <button type="button" title="Heading 3" aria-label="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))}><Heading3 className="h-4 w-4" /></button>
      <button type="button" title="Quote" aria-label="Quote" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive("blockquote"))}><Quote className="h-4 w-4" /></button>
      <button type="button" title="Code" aria-label="Code" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btn(editor.isActive("codeBlock"))}><Code className="h-4 w-4" /></button>
      <Divider />
      <button type="button" title="Bullet list" aria-label="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))}><List className="h-4 w-4" /></button>
      <button type="button" title="Numbered list" aria-label="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))}><ListOrdered className="h-4 w-4" /></button>
      <Divider />
      <ToolBtn title="Image" onClick={onImage}><ImageIcon className="h-4 w-4" /></ToolBtn>
      <ToolBtn title="Video" onClick={onVideo}><Video className="h-4 w-4" /></ToolBtn>
      <ToolBtn title="Product card" onClick={onProduct}><Package className="h-4 w-4" /></ToolBtn>
      <ToolBtn title="Link" onClick={onLink}><Link2 className="h-4 w-4" /></ToolBtn>
    </div>
  );
}

function ToolBtn({ title, onClick, children }: { title: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-6 w-px bg-border" />;
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
