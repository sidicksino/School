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
  -- Count unique classes taught by this teacher (using flexible lookup)
  select count(distinct c.name) into v_classes_count 
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
