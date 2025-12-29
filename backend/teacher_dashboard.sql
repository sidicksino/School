-- ===================================================
-- TEACHER DASHBOARD RPCs
-- ===================================================

-- 1. Get Teacher Stats
-- 1. Get Teacher Stats
create or replace function get_teacher_stats(
  p_teacher_id uuid default null,
  p_surname text default null
)
returns json
language plpgsql
security definer
as $$
declare
  v_classes_count bigint;
  v_students_count bigint;
  v_hours_week bigint;
begin
  -- Count total subjects taught (e.g. Math @ Term L + Phys @ Term L = 2)
  select count(*) into v_classes_count 
  from public.class_subjects cs
  join public.classes c on cs.class_id = c.id
  left join public.students teacher on cs.teacher_id = teacher.id
  where 
    (p_teacher_id is not null and cs.teacher_id = p_teacher_id)
    OR 
    (p_surname is not null and teacher.surname = p_surname);

  -- Count total students
  select count(distinct s.id) into v_students_count
  from public.students s
  join public.class_subjects cs on s.classe = (select name from public.classes where id = cs.class_id)
  left join public.students teacher on cs.teacher_id = teacher.id
  where 
    (p_teacher_id is not null and cs.teacher_id = p_teacher_id)
    OR 
    (p_surname is not null and teacher.surname = p_surname);

  -- Count hours per week
  select count(*) * 2 
  into v_hours_week
  from public.schedule sch
  join public.subjects sub on sch.subject_id = sub.id
  join public.class_subjects cs on cs.subject_id = sub.id 
    and (select name from public.classes where id = cs.class_id) = sch.classe
  left join public.students teacher on cs.teacher_id = teacher.id
  where 
    (p_teacher_id is not null and cs.teacher_id = p_teacher_id)
    OR 
    (p_surname is not null and teacher.surname = p_surname);

  return json_build_object(
    'classes_taught', coalesce(v_classes_count, 0),
    'total_students', coalesce(v_students_count, 0),
    'hours_week', coalesce(v_hours_week, 0),
    'pending_grades', 0
  );
end;
$$;

-- 2. Get Teacher Classes List
create or replace function get_teacher_classes_list(
  p_teacher_id uuid default null,
  p_surname text default null
)
returns table (
  class_name text,
  subject_name text,
  subject_code text,
  student_count bigint
)
language plpgsql
security definer
as $$
begin
  return query
  select 
    c.name as class_name,
    sub.name as subject_name,
    sub.code as subject_code,
    (select count(*) from public.students s where s.classe = c.name) as student_count
  from public.class_subjects cs
  join public.classes c on cs.class_id = c.id
  join public.subjects sub on cs.subject_id = sub.id
  left join public.students teacher on cs.teacher_id = teacher.id
  where
    (p_teacher_id is not null and cs.teacher_id = p_teacher_id)
    OR 
    (p_surname is not null and teacher.surname = p_surname);
end;
$$;

-- 3. Get Recent Assignments for Teacher Dashboard
create or replace function get_teacher_assignments(
  p_teacher_id uuid default null,
  p_surname text default null,
  p_limit integer default 5
)
returns table (
  id uuid,
  title text,
  class_name text,
  subject_code text,
  due_date timestamp with time zone,
  created_at timestamp with time zone
)
language plpgsql
security definer
as $$
begin
  return query
  select 
    a.id,
    a.title,
    c.name as class_name,
    sub.code as subject_code,
    a.due_date,
    a.created_at
  from public.assignments a
  join public.classes c on a.class_id = c.id
  join public.subjects sub on a.subject_id = sub.id
  left join public.students teacher on 
    (exists (select 1 from public.class_subjects cs where cs.class_id = c.id and cs.subject_id = sub.id and cs.teacher_id = teacher.id))
  where 
    -- Filter assignments created by this teacher OR belonging to their class/subject pairs
    (p_teacher_id is not null and exists (
       select 1 from public.class_subjects cs 
       where cs.class_id = a.class_id and cs.subject_id = a.subject_id and cs.teacher_id = p_teacher_id
    ))
    OR
    (p_surname is not null and exists (
       select 1 from public.class_subjects cs 
       join public.students t on cs.teacher_id = t.id
       where cs.class_id = a.class_id and cs.subject_id = a.subject_id and t.surname = p_surname
    ))
  order by a.created_at desc
  limit p_limit;
end;
$$;
