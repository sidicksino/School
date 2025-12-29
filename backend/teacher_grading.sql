-- ===================================================
-- TEACHER GRADING MODULE
-- ===================================================

-- 1. Helper: Get Students in a specific class
create or replace function get_students_by_class(p_classe text)
returns table (
  id uuid,
  surname text,
  full_name text
)
language plpgsql
security definer
as $$
begin
  return query
  select s.id, s.surname, s.full_name
  from public.students s
  where s.classe = p_classe AND s.role = 'student'
  order by s.surname;
end;
$$;

-- 2. Action: Upsert Grade
-- Inserts a grade or updates it if it exists for that specific (student, subject, term, type)
create or replace function upsert_grade(
  p_student_id uuid,
  p_subject_code text, -- We accept Code (e.g. 'MATH') for ease of use from UI
  p_term integer,
  p_type text, -- 'devoir' or 'composition'
  p_value decimal
)
returns json
language plpgsql
security definer
as $$
declare
  v_subject_id uuid;
begin
  -- Resolve Subject ID from Code
  select id into v_subject_id from public.subjects where code = p_subject_code;
  
  if v_subject_id is null then
    return json_build_object('error', 'Subject code not found');
  end if;

  -- Validate Type
  if p_type not in ('devoir', 'composition') then
    return json_build_object('error', 'Invalid type. Use "devoir" or "composition".');
  end if;

  -- Insert or Update
  -- We assume one grade per type per term for simplicity in this MVP?
  -- Wait, 'devoir' usually allows multiple. 'composition' is usually one.
  -- For this prompt, let's treat 'devoir' as a SINGLE averaged value or just ONE entry for now to make UI simple.
  -- Or, we can insert multiple. 
  -- Current `grades` table doesn't have a unique constraint on (student, subject, term, type).
  -- Let's enforce ONE entry per type per term per subject for simplicity (Overwrite behavior).
  
  -- Check if exists
  delete from public.grades 
  where student_id = p_student_id 
    and subject_id = v_subject_id
    and term = p_term
    and type = p_type;
    
  insert into public.grades (student_id, subject_id, term, type, value)
  values (p_student_id, v_subject_id, p_term, p_type, p_value);
  
  return json_build_object('success', true);
end;
$$;
