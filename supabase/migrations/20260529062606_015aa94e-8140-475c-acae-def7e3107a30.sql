
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  subtitle text,
  cover_url text,
  content_html text NOT NULL DEFAULT '',
  category text,
  tags text[] NOT NULL DEFAULT '{}',
  meta_description text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all posts" ON public.posts
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert posts" ON public.posts
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update posts" ON public.posts
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete posts" ON public.posts
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX posts_status_idx ON public.posts(status);
CREATE INDEX posts_slug_idx ON public.posts(slug);

-- Storage bucket for cover images
INSERT INTO storage.buckets (id, name, public) VALUES ('post-covers', 'post-covers', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Post covers are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-covers');

CREATE POLICY "Admins can upload post covers"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'post-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update post covers"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'post-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete post covers"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'post-covers' AND public.has_role(auth.uid(), 'admin'));
