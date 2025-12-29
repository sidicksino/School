-- ===================================================
-- ASSIGNMENTS MODULE
-- ===================================================

-- 1. Table
create table if not exists public.assignments (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  due_date date not null,
  class_name text not null, -- e.g. 'Terminale S'
  subject_id uuid references public.subjects(id),
  teacher_id uuid, -- Optional link to teacher?
  created_at timestamp with time zone default now()
);

-- 2. RPC: Get Assignments for a Student
create or replace function get_student_assignments(p_student_id uuid)
returns table (
  id uuid,
  title text,
  description text,
  due_date date,
  subject_name text,
  subject_code text,
  is_overdue boolean
)
language plpgsql
security definer
as $$
declare
  v_classe text;
begin
  select classe into v_classe from public.students where id = p_student_id;

  return query
  select 
    a.id,
    a.title,
    a.description,
    a.due_date,
    s.name,
    s.code,
    (a.due_date < current_date) as is_overdue
  from public.assignments a
  left join public.subjects s on a.subject_id = s.id
  where a.class_name = v_classe
  order by a.due_date asc;
end;
$$;

-- 3. RPC: Create Assignment (For Teachers/Admins)
create or replace function create_assignment(
  p_title text,
  p_description text,
  p_due_date date,
  p_class_name text,
  p_subject_code text
)
returns json
language plpgsql
security definer
as $$
declare 
  v_subject_id uuid;
begin
  select id into v_subject_id from public.subjects where code = p_subject_code;
  
  insert into public.assignments (title, description, due_date, class_name, subject_id)
  values (p_title, p_description, p_due_date, p_class_name, v_subject_id);
  
  return json_build_object('success', true);
end;
$$;

-- Seed some test data
do $$
declare
  v_math uuid;
  v_pc uuid;
begin
  select id into v_math from public.subjects where code = 'MATH' limit 1;
  select id into v_pc from public.subjects where code = 'PC' limit 1;

  if v_math is not null then
    insert into public.assignments (title, description, due_date, class_name, subject_id)
    values ('Exercices Chapitre 1', 'Page 12, Ex 1-5', current_date + interval '2 days', 'Terminale S', v_math);
  end if;
  
  if v_pc is not null then
    insert into public.assignments (title, description, due_date, class_name, subject_id)
    values ('TP Chimie', 'Preparer le compte rendu', current_date + interval '5 days', 'Terminale S', v_pc);
  end if;
end;
$$;
