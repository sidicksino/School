-- ===================================================
-- ASSIGNMENT ATTACHMENTS
-- ===================================================

-- 1. Add column to store the file path/url
alter table public.assignments 
add column if not exists file_url text;

-- 2. Create Storage Bucket (Try to create if not exists)
insert into storage.buckets (id, name, public)
values ('assignments', 'assignments', true)
on conflict (id) do nothing;

-- 3. Storage Policies (Allow public read, Authenticated upload)
-- Note: 'create policy' might fail if it already exists, so we wrap or ignore errors in manual execution or use 'if not exists' logic
-- PostgreSQL doesn't have 'create policy if not exists' natively in all versions, but typically safe to run if not exist.
-- Ideally, user manages bucket permissions in Supabase Dashboard.

-- 4. Update Create RPC
-- Drop first to handle signature/return type changes
drop function if exists create_assignment(text, text, date, text, text);
drop function if exists create_assignment(text, text, date, text, text, text);

create or replace function create_assignment(
  p_title text,
  p_description text,
  p_due_date date,
  p_class_name text,
  p_subject_code text,
  p_file_url text default null -- NEW PARAMETER
)
returns json
language plpgsql
security definer
as $$
declare 
  v_subject_id uuid;
begin
  select id into v_subject_id from public.subjects where code = p_subject_code;
  
  insert into public.assignments (title, description, due_date, class_name, subject_id, file_url)
  values (p_title, p_description, p_due_date, p_class_name, v_subject_id, p_file_url);
  
  return json_build_object('success', true);
end;
$$;

-- 5. Update Student Getter
-- Drop first to fix return type error
drop function if exists get_student_assignments(uuid);

create or replace function get_student_assignments(p_student_id uuid)
returns table (
  id uuid,
  title text,
  description text,
  due_date date,
  subject_name text,
  subject_code text,
  is_overdue boolean,
  file_url text -- NEW COLUMN
)
language plpgsql
security definer
as $$
declare
  v_classe text;
begin
  select classe into v_classe from public.students stu where stu.id = p_student_id;

  return query
  select 
    a.id,
    a.title,
    a.description,
    a.due_date,
    s.name,
    s.code,
    (a.due_date < current_date) as is_overdue,
    a.file_url
  from public.assignments a
  left join public.subjects s on a.subject_id = s.id
   where trim(a.class_name) ilike trim(v_classe)
  order by a.due_date asc;
end;
$$;
