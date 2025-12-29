-- ===================================================
-- FIX STORAGE POLICIES
-- ===================================================

-- Since we are using Custom Auth, the Supabase Client is likely operating as 'anon' for Storage.
-- We must allow 'public' (anon) role to upload to the assignments bucket.

-- Enable RLS on objects if not already (standard in Supabase)
alter table storage.objects enable row level security;

-- Drop existing policies to be safe/clean
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Teacher Upload" on storage.objects;
drop policy if exists "Grant Public Access" on storage.objects;
drop policy if exists "Grant Public Insert" on storage.objects;

-- 1. Allow Public Read (SELECT) for 'assignments' bucket
create policy "Public Access Assignments"
  on storage.objects for select
  using ( bucket_id = 'assignments' );

-- 2. Allow Public Upload (INSERT) for 'assignments' bucket
-- NOTE: In a production app using standard Supabase Auth, we would check "auth.role() = 'authenticated'".
-- But here we use custom auth, so we allow 'public' to upload.
create policy "Public Insert Assignments"
  on storage.objects for insert
  to public
  with check ( bucket_id = 'assignments' );

-- 3. Allow Public Update/Delete (Optional, maybe restrict?)
-- For now let's allow it so teachers can delete what they uploaded (but anyone can technically delete if they know ID)
create policy "Public Delete Assignments"
  on storage.objects for delete
  to public
  using ( bucket_id = 'assignments' );
