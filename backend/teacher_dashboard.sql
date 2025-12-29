-- ===================================================
-- TEACHER DASHBOARD RPCs
-- ===================================================

-- 1. Get Teacher Stats
create or replace function get_teacher_stats(p_teacher_id uuid)
returns json
language plpgsql
security definer
as $$
declare
  v_classes_count bigint;
  v_students_count bigint;
  v_hours_week bigint; -- approximate
begin
  -- Count unique classes taught by this teacher
  select count(distinct class_name) into v_classes_count 
  from public.class_subjects 
  where teacher_id = p_teacher_id;

  -- Count total students in those classes
  select count(distinct s.id) into v_students_count
  from public.students s
  join public.class_subjects cs on s.classe = cs.class_name
  where cs.teacher_id = p_teacher_id;

  -- Count hours per week from schedule
  select count(*) * 2 -- Assuming 2 hours per slot, or calculate duration
  into v_hours_week
  from public.schedule sch
  join public.class_subjects cs on sch.subject_id = cs.subject_id and sch.classe = cs.class_name
  where cs.teacher_id = p_teacher_id;

  return json_build_object(
    'classes_taught', coalesce(v_classes_count, 0),
    'total_students', coalesce(v_students_count, 0),
    'hours_week', coalesce(v_hours_week, 0),
    'pending_grades', 0 -- Placeholder or complex query
  );
end;
$$;

-- 2. Get Teacher Classes List
create or replace function get_teacher_classes_list(p_teacher_id uuid)
returns table (
  class_name text,
  subject_name text,
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
    (select count(*) from public.students s where s.classe = c.name) as student_count
  from public.class_subjects cs
  join public.classes c on cs.class_id = c.id
  join public.subjects sub on cs.subject_id = sub.id
  where cs.teacher_id = p_teacher_id;
end;
$$;
