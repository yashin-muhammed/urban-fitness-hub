GRANT SELECT ON public.posts TO anon;

CREATE POLICY "Public can view published posts"
ON public.posts
FOR SELECT
TO anon, authenticated
USING (status = 'published');