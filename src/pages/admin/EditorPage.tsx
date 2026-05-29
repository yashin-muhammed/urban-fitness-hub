import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ImageIcon, Video, Link2, Package, Bold, Italic, List, ListOrdered,
  Heading2, Heading3, Quote, Code, Save, Eye, Send, Undo, Redo, Strikethrough, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPost, upsertPost, uploadCover, slugify, type PostStatus } from "@/lib/posts";

export default function EditorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id") ?? undefined;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [postId, setPostId] = useState<string | undefined>(id);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [meta, setMeta] = useState("");
  const [category, setCategory] = useState("Reviews");
  const [tags, setTags] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [status, setStatus] = useState<PostStatus>("draft");

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

  const { data: existing, isLoading: loadingPost } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (existing && editor) {
      setPostId(existing.id);
      setTitle(existing.title);
      setSubtitle(existing.subtitle ?? "");
      setSlug(existing.slug);
      setMeta(existing.meta_description ?? "");
      setCategory(existing.category ?? "Reviews");
      setTags(existing.tags.join(", "));
      setCover(existing.cover_url);
      setStatus(existing.status);
      editor.commands.setContent(existing.content_html || "");
    }
  }, [existing, editor]);

  const save = useMutation({
    mutationFn: async (nextStatus: PostStatus) => {
      if (!title.trim()) throw new Error("Title is required");
      const finalSlug = slug.trim() || slugify(title);
      return upsertPost({
        id: postId,
        slug: finalSlug,
        title: title.trim(),
        subtitle: subtitle.trim() || null,
        cover_url: cover,
        content_html: editor?.getHTML() ?? "",
        category,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        meta_description: meta.trim() || null,
        status: nextStatus,
      });
    },
    onSuccess: (p, nextStatus) => {
      setPostId(p.id);
      setStatus(p.status);
      qc.invalidateQueries({ queryKey: ["posts"] });
      qc.invalidateQueries({ queryKey: ["posts", p.id] });
      toast.success(nextStatus === "published" ? "Post published" : "Draft saved");
      if (nextStatus === "published") {
        navigate("/admin/posts");
      } else if (!id) {
        setSearchParams({ id: p.id }, { replace: true });
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const seoScore = Math.min(100, 30 + Math.min(title.length, 60) + Math.min(meta.length, 60) / 2 + (cover ? 10 : 0));

  async function handleCover(file?: File) {
    if (!file) return;
    setCoverUploading(true);
    try {
      const url = await uploadCover(file);
      setCover(url);
      toast.success("Cover uploaded");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setCoverUploading(false);
    }
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

  if (id && loadingPost) {
    return (
      <div className="grid place-items-center py-20 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {postId ? "Edit" : "Draft"}
          </p>
          <h1 className="text-2xl font-bold tracking-tight">{postId ? title || "Untitled" : "New post"}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {postId && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => window.open(`/admin/preview/${postId}`, "_blank")}
            >
              <Eye className="h-4 w-4" /> Preview
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={save.isPending}
            onClick={() => save.mutate("draft")}
          >
            {save.isPending && save.variables === "draft" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save draft
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            disabled={save.isPending}
            onClick={() => save.mutate("published")}
          >
            {save.isPending && save.variables === "published" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Publish
          </Button>
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
                if (!postId) setSlug(slugify(e.target.value));
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
                <div className="relative">
                  <img src={cover} alt="Cover" className="h-60 w-full rounded-xl object-cover" />
                  {coverUploading && (
                    <div className="absolute inset-0 grid place-items-center rounded-xl bg-background/60">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-44 items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface text-sm text-muted-foreground hover:border-foreground/30">
                  {coverUploading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-6 w-6" />
                      <p className="mt-2">Drop a cover image or <span className="font-semibold text-foreground">browse</span></p>
                    </div>
                  )}
                </div>
              )}
            </label>

            <EditorContent editor={editor} />
          </div>
        </div>

        <aside className="space-y-4">
          <Panel title="Status">
            <Row label="Status" value={<Pill tone={status === "published" ? "ok" : "warn"}>{status}</Pill>} />
            <Row label="Visibility" value="Admin preview" />
          </Panel>

          <Panel title="Category & Tags">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option>Reviews</option>
              <option>Gadgets</option>
              <option>Home Gym</option>
              <option>News</option>
              <option>Events</option>
            </select>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Comma-separated tags…"
              className="mt-2"
            />
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
