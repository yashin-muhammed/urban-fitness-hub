## Goal

Let admins create, edit, and delete blog posts from the admin panel, backed by the database. Public `/blog/*` pages stay as-is for now (admin preview only — no public dynamic URLs in this round).

## What you'll get

- **Posts table** in the database storing title, slug, subtitle, cover image, rich HTML content, category, tags, meta description, status (draft/published), author, and timestamps.
- **Admin → Posts list** shows real posts from the DB with status, date, and an Edit / Delete action per row.
- **Admin → Editor** works for both **New post** and **Edit existing post**:
  - Loads existing content into the TipTap editor when editing
  - Save draft / Publish buttons persist to the DB
  - Cover image uploads to Cloud storage and is saved as a URL
  - Slug auto-generated from title, editable, uniqueness enforced
- **Admin preview** route so admins can preview a post before publishing.
- Only users with the `admin` role can read/write posts (RLS).

## Out of scope (this round)

- Public `/blog/<slug>` pages reading from DB (they'll keep using mock data). We can do that next if you want.
- Image library / media manager beyond cover uploads.
- Revisions/versioning, scheduled publishing.

## Technical details

**Migration** creates:
- `public.posts` table — `id`, `slug` (unique), `title`, `subtitle`, `cover_url`, `content_html`, `category`, `tags text[]`, `meta_description`, `status` (`draft` | `published`), `author_id` (uuid → auth.users), `published_at`, `created_at`, `updated_at`.
- `updated_at` trigger using existing `update_updated_at_column` pattern.
- GRANTs for `authenticated` + `service_role` (no anon — admin preview only).
- RLS policies: all CRUD gated by `has_role(auth.uid(), 'admin')`.
- Storage bucket `post-covers` (public read) with admin-only write policy.

**Frontend changes**
- `src/lib/posts.ts` — typed helpers: `listPosts`, `getPost(id)`, `getPostBySlug`, `upsertPost`, `deletePost`, `uploadCover(file)`.
- `src/routes/admin.posts.tsx` — replace mock rows with live data via `useQuery`; add Edit (links to `/admin/editor?id=...`) and Delete actions; show empty state.
- `src/routes/admin.editor.tsx` — read `?id=` search param; if present, load post into the editor; wire Save draft / Publish buttons to `upsertPost`; wire cover upload to `uploadCover`; toast on success/error; redirect to posts list after publish.
- Add `src/routes/admin.preview.$id.tsx` — admin-only route that renders a post by id using the same layout as `blog.$slug.tsx` but pulling from DB.
- Add "Preview" button in editor → opens `/admin/preview/<id>` in a new tab (only after first save).

**No changes** to public homepage, public blog pages, auth flow, or non-admin routes.

## Order of operations

1. DB migration (posts table + storage bucket + RLS).
2. `src/lib/posts.ts` helpers.
3. Update `admin.posts.tsx` (list + delete + edit link).
4. Update `admin.editor.tsx` (load existing + save/publish + cover upload).
5. Add `admin.preview.$id.tsx`.

After this lands, say the word and I'll wire the public `/blog/*` pages to the same table so published posts go live on the site.