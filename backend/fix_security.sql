-- ===================================================
-- SECURITY FIX SCRIPT
-- Addresses Supabase Security Advisor Vulnerabilities
-- ===================================================

-- 0. Enable PGCrypto Extension (Required for crypt() function)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Enable RLS on All Tables
-- Often the cause of "vulnerability" warnings is RLS being disabled.

ALTER TABLE IF EXISTS public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.attendance ENABLE ROW LEVEL SECURITY; -- Fix: RLS Disabled
ALTER TABLE IF EXISTS public.absences ENABLE ROW LEVEL SECURITY;   -- Fix: RLS Disabled
ALTER TABLE IF EXISTS public.notices ENABLE ROW LEVEL SECURITY;    -- Fix: RLS Disabled
ALTER TABLE IF EXISTS public.school_events ENABLE ROW LEVEL SECURITY; -- Fix: RLS Disabled


-- 2. Define Default Policies (Deny All)
-- It's best practice to start closed. Policies like in rbac_policies.sql open it up.
-- If rbac_policies.sql is already run, existing policies will work. 
-- If not, we risk locking everyone out. 
-- WARNING: We assume rbac_policies.sql logic applies, but we must ensure we don't break the app.
-- For now, we mainly focus on fixing the FUNCTION definitions which is the critical 'Code Injection' risk.

-- 3. Fix SECURITY DEFINER Functions (Search Path Injection Risk)
-- "ERROR: Function is security definer but does not set search_path"

-- Fix: register_student
CREATE OR REPLACE FUNCTION public.register_student(
  p_surname text,
  p_full_name text,
  p_cycle text,
  p_classe text,
  p_phone text,
  p_password text,
  p_terms boolean
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions -- FIX: Force search path to public
AS $$
DECLARE
  v_student_id uuid;
BEGIN
  if exists (select 1 from public.students where surname = p_surname) then
    return json_build_object('error', 'Surname already taken');
  end if;

  insert into public.students (surname, full_name, cycle, classe, phone, password_hash, terms_accepted)
  values (
    p_surname,
    p_full_name,
    p_cycle,
    p_classe,
    p_phone,
    crypt(p_password, gen_salt('bf')),
    p_terms
  )
  returning id into v_student_id;

  return json_build_object('success', true, 'id', v_student_id);
END;
$$;

-- Fix: login_student
CREATE OR REPLACE FUNCTION public.login_student(
  p_surname text,
  p_password text
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions -- FIX
AS $$
DECLARE
  v_student record;
BEGIN
  select id, surname, full_name, cycle, classe, role
  into v_student
  from public.students
  where surname = p_surname;

  if v_student is null then
    return json_build_object('error', 'Invalid credentials');
  end if;

  if v_student.id is not null and 
     (select password_hash from public.students where id = v_student.id) = crypt(p_password, (select password_hash from public.students where id = v_student.id)) then
     
     return json_build_object(
       'success', true,
       'student', json_build_object(
         'id', v_student.id,
         'surname', v_student.surname,
         'full_name', v_student.full_name,
         'cycle', v_student.cycle,
         'classe', v_student.classe,
         'role', v_student.role
       )
     );
  else
     return json_build_object('error', 'Invalid credentials');
  end if;
END;
$$;

-- Fix: upsert_grade
CREATE OR REPLACE FUNCTION public.upsert_grade(
  p_student_id uuid,
  p_subject_code text,
  p_term integer,
  p_type text,
  p_value decimal
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions -- FIX
AS $$
DECLARE
  v_subject_id uuid;
BEGIN
  select id into v_subject_id from public.subjects where code = p_subject_code;
  
  if v_subject_id is null then
    return json_build_object('error', 'Subject code not found');
  end if;

  if p_type not in ('devoir', 'composition') then
    return json_build_object('error', 'Invalid type');
  end if;
  
  -- Check permission (Basic check ensuring caller is teacher could be added here or relied on RLS/RPC grant)
  -- For now we just fix the search_path issue.

  delete from public.grades 
  where student_id = p_student_id 
    and subject_id = v_subject_id
    and term = p_term
    and type = p_type;
    
  insert into public.grades (student_id, subject_id, term, type, value)
  values (p_student_id, v_subject_id, p_term, p_type, p_value);
  
  return json_build_object('success', true);
END;
$$;

-- Fix: get_students_by_class
CREATE OR REPLACE FUNCTION public.get_students_by_class(p_classe text)
RETURNS TABLE (
  id uuid,
  surname text,
  full_name text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions -- FIX
AS $$
BEGIN
  return query
  select s.id, s.surname, s.full_name
  from public.students s
  where s.classe = p_classe 
    AND (s.role = 'student' OR s.role IS NULL)
    AND s.role != 'admin' -- Careful with nulls in role
  order by s.surname;
END;
$$;

-- Fix: get_admin_stats
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions -- FIX
AS $$
DECLARE
  v_total_students bigint;
  v_total_teachers bigint;
  v_total_users bigint;
  v_classes_count bigint;
BEGIN
  select count(*) into v_total_students from public.students where role = 'student';
  select count(*) into v_total_teachers from public.students where role = 'teacher';
  select count(*) into v_total_users from public.students;
  select count(distinct classe) into v_classes_count from public.students;

  return json_build_object(
    'total_users', v_total_users,
    'total_students', v_total_students,
    'total_teachers', v_total_teachers,
    'active_classes', v_classes_count
  );
END;
$$;

-- Fix: manage_user
CREATE OR REPLACE FUNCTION public.manage_user(
  p_action text,
  p_user_data json
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions -- FIX
AS $$
DECLARE
  v_new_id uuid;
  v_surname text;
  v_password text;
BEGIN
  if p_action = 'create' then
    v_surname := p_user_data->>'surname';
    
    if exists (select 1 from public.students where surname = v_surname) then
       return json_build_object('error', 'Username/Surname already exists');
    end if;

    insert into public.students (surname, full_name, cycle, classe, phone, password_hash, role, terms_accepted)
    values (
      v_surname,
      p_user_data->>'full_name',
      p_user_data->>'cycle',
      p_user_data->>'classe',
      p_user_data->>'phone',
      crypt(p_user_data->>'password', gen_salt('bf')),
      p_user_data->>'role',
      true
    )
    returning id into v_new_id;
    
    return json_build_object('success', true, 'id', v_new_id);

  elsif p_action = 'update' then
    v_password := p_user_data->>'password';
    
    update public.students
    set
      full_name = coalesce(p_user_data->>'full_name', full_name),
      cycle = coalesce(p_user_data->>'cycle', cycle),
      classe = coalesce(p_user_data->>'classe', classe),
      phone = coalesce(p_user_data->>'phone', phone),
      role = coalesce(p_user_data->>'role', role),
      password_hash = case 
        when v_password is not null and length(v_password) > 0 then crypt(v_password, gen_salt('bf')) 
        else password_hash 
      end
    where id = (p_user_data->>'id')::uuid;
    
    return json_build_object('success', true);

  elsif p_action = 'delete' then
    delete from public.students where id = (p_user_data->>'id')::uuid;
    return json_build_object('success', true);
  
  else
    return json_build_object('error', 'Invalid action');
  end if;
END;
$$;
