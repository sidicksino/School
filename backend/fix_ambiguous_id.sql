-- FIX AMBIGUOUS ID ERROR
create or replace function get_student_courses(p_student_id uuid)
returns table (
  id uuid,
  name text,
  code text,
  coefficient integer,
  category text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_classe text;
  v_has_config boolean;
  v_has_schedule boolean;
begin
  -- FIX: Use alias 'stu' to avoid conflict with output column 'id'
  select stu.classe into v_classe from public.students stu where stu.id = p_student_id;
  
  -- Strategy 1: Check Config
  select exists(select 1 from public.class_subjects cs where cs.class_name = v_classe) into v_has_config;
  
  if v_has_config then
      return query
      select s.id, s.name, s.code, cs.coefficient, cs.category
      from public.class_subjects cs
      join public.subjects s on cs.subject_id = s.id
      where cs.class_name = v_classe
      order by cs.category, s.name;
      return; 
  end if;

  -- Strategy 2: Check Schedule
  select exists(select 1 from public.schedule sc where sc.classe = v_classe) into v_has_schedule;
  
  if v_has_schedule then
      return query
      select distinct s.id, s.name, s.code, 1 as coefficient, 'General'::text as category
      from public.schedule sc
      join public.subjects s on sc.subject_id = s.id
      where sc.classe = v_classe
      order by s.name;
      return; 
  end if;

  -- Strategy 3: Fallback
  return query
  select s.id, s.name, s.code, 1 as coefficient, 'General'::text as category
  from public.subjects s
  order by s.name;
end;
$$;
