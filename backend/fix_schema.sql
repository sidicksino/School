-- =========================================================
-- FIX SCHEMA: RECREATE GRADES TABLE
-- =========================================================
-- The previous error "column 'term' does not exist" happened because
-- an old version of the 'grades' table already existed.
-- This script deletes the old table and creates the correct new one.

-- 1. Drop the old table (Warning: Deletes existing grades, which is fine for dev)
drop table if exists public.grades;

-- 2. Recreate with correct columns (term, type, etc.)
create table public.grades (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.students(id),
  subject_id uuid not null references public.subjects(id),
  term integer not null check (term in (1, 2, 3)),
  type text not null check (type in ('devoir', 'composition')),
  value decimal(4, 2) not null check (value >= 0 and value <= 20),
  created_at timestamp with time zone default now()
);

-- 3. Re-enable RLS policy
alter table public.grades enable row level security;

create policy "Students can view own grades"
on public.grades for select
using ( auth.uid()::text = (select id::text from public.students where id = student_id) );

-- 4. Success Message
select 'Grades table fixed successfully' as result;
