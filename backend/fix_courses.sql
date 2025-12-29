-- 1. SEED SUBJECTS (Ensure data exists)
-- This ensures the table is not empty.
insert into public.subjects (name, code) values 
('Mathématiques', 'MATH'),
('Physique-Chimie', 'PC'),
('SVT', 'SVT'),
('Français', 'FR'),
('Anglais', 'ANG'),
('Histoire-Géo', 'HG'),
('Philosophie', 'PHILO'),
('EPS', 'EPS')
on conflict (code) do nothing;

-- 2. UPDATE FUNCTION (Fail-safe)
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
begin
  -- Get user's class
  select classe into v_classe from public.students where id = p_student_id;
  
  -- 1. Check if "Class Subjects" are configured (Best case)
  select exists(select 1 from public.class_subjects where class_name = v_classe) into v_has_config;
  
  if v_has_config then
      return query
      select s.id, s.name, s.code, cs.coefficient, cs.category
      from public.class_subjects cs
      join public.subjects s on cs.subject_id = s.id
      where cs.class_name = v_classe
      order by cs.category, s.name;
      return; -- Exit function
  end if;

  -- 2. Fallback: Return ALL subjects (Guaranteed to show something)
  -- We assume default coefficient 1 and category 'General'
  return query
  select 
    s.id, 
    s.name, 
    s.code, 
    1 as coefficient, 
    'General'::text as category
  from public.subjects s
  order by s.name;
end;
$$;

-- 3. RELOAD CACHE
NOTIFY pgrst, 'reload config';
