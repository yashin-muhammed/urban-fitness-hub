import { supabase } from "@/integrations/supabase/client";

export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  cover_url: string | null;
  content_html: string;
  category: string | null;
  tags: string[];
  meta_description: string | null;
  status: PostStatus;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PostInput = {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  cover_url?: string | null;
  content_html: string;
  category?: string | null;
  tags?: string[];
  meta_description?: string | null;
  status: PostStatus;
};

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function listPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Post) ?? null;
}

export async function upsertPost(input: PostInput): Promise<Post> {
  const { data: { user } } = await supabase.auth.getUser();
  const payload: Record<string, unknown> = {
    slug: input.slug,
    title: input.title,
    subtitle: input.subtitle ?? null,
    cover_url: input.cover_url ?? null,
    content_html: input.content_html,
    category: input.category ?? null,
    tags: input.tags ?? [],
    meta_description: input.meta_description ?? null,
    status: input.status,
    author_id: user?.id ?? null,
  };
  if (input.status === "published") {
    payload.published_at = new Date().toISOString();
  }

  if (input.id) {
    const { data, error } = await supabase
      .from("posts")
      .update(payload)
      .eq("id", input.id)
      .select("*")
      .single();
    if (error) throw error;
    return data as Post;
  }
  const { data, error } = await supabase
    .from("posts")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw error;
  return data as Post;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadCover(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("post-covers")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("post-covers").getPublicUrl(path);
  return data.publicUrl;
}
