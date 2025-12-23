-- Enable RLS (already enabled, but assuring it)
alter table public.students enable row level security;

-- Policy to allow ANYONE to insert (Registration is public)
create policy "Enable insert for registration"
on public.students
for insert
with check (true);

-- Policy to allow anonymous read (needed for login check locally if not service role)
-- NOTE: In production, better to use Service Role for SELECT in backend, but this unblocks.
create policy "Enable read for backend"
on public.students
for select
using (true);
