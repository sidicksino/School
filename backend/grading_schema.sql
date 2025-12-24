-- =========================================================
-- 1. TABLES
-- =========================================================

-- Subjects Table (Generic)
create table if not exists public.subjects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text not null, -- Removed inline unique to handle it explicitly below for robustness
  created_at timestamp with time zone default now()
);

-- Ensure Unique Check for code (Robust vs Table Exists)
create unique index if not exists subjects_code_idx on public.subjects (code);

-- Class Configuration (Subjects & Coefficients per Class)
-- This drives "Total Subjects" and weighted averages
create table if not exists public.class_subjects (
  id uuid primary key default uuid_generate_v4(),
  class_name text not null, -- e.g. 'Terminale S'
  subject_id uuid not null references public.subjects(id),
  coefficient integer not null default 1,
  category text default 'General', -- Scientific, Literary, etc.
  unique(class_name, subject_id)
);

-- Ensure Unique Check for Class Subject (Robust)
create unique index if not exists class_subjects_idx on public.class_subjects (class_name, subject_id);

-- Grades Table
-- Stores individual marks. 
-- Type: 'devoir' (continuous assessment) or 'composition' (final exam)
create table if not exists public.grades (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.students(id),
  subject_id uuid not null references public.subjects(id),
  term integer not null check (term in (1, 2, 3)),
  type text not null check (type in ('devoir', 'composition')),
  value decimal(4, 2) not null check (value >= 0 and value <= 20),
  created_at timestamp with time zone default now()
);

-- Absences Table
create table if not exists public.absences (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.students(id),
  date date not null default current_date,
  reason text,
  justified boolean default false,
  created_at timestamp with time zone default now()
);

-- =========================================================
-- 2. RPC: CALCULATE STUDENT DASHBOARD STATS
-- =========================================================
-- =========================================================
-- 2. RPC: CALCULATE STUDENT DASHBOARD STATS (DYNAMIC TERM)
-- =========================================================
-- Returns: { total_subjects, total_grades, average, absences }
create or replace function get_student_stats(
  p_student_id uuid,
  p_term integer
)
returns json
language plpgsql
security definer
as $$
declare
  v_classe text;
  v_total_subjects bigint;
  v_total_grades bigint;
  v_absences bigint;
  v_global_sum decimal(10, 2) := 0;
  v_coef_sum integer := 0;
  v_final_average decimal(4, 2) := 0;
  
  -- Cursor for subjects in the student's class
  cur_subjects cursor for 
    select cs.subject_id, cs.coefficient 
    from public.class_subjects cs 
    where cs.class_name = v_classe;
    
  v_subj_id uuid;
  v_coef integer;
  
  -- Calculation variables
  v_avg_devoirs decimal(4, 2);
  v_comp_grade decimal(4, 2);
  v_subj_avg decimal(4, 2);
  
begin
  -- 0. Security Check (RLS-like logic inside RPC)
  -- Ensure the requesting user is the student owner or has permission
  -- For now, trust the p_student_id passed from authenticated context

  -- 1. Get Student Class
  select classe into v_classe from public.students where id = p_student_id;
  
  if v_classe is null then
    return json_build_object('error', 'Student class not found');
  end if;

  -- 2. Total Subjects
  select count(*) into v_total_subjects 
  from public.class_subjects 
  where class_name = v_classe;

  -- 3. Total Grades (Count of entries for this term)
  select count(*) into v_total_grades 
  from public.grades 
  where student_id = p_student_id and term = p_term;

  -- 4. Absences (All time? Or per term? Usually per term in report cards)
  -- Let's assume absences are holistic or add term column to absences later. 
  -- For now, count all logic as per request, but let's filter by date range if we had term dates.
  select count(*) into v_absences 
  from public.absences 
  where student_id = p_student_id;

  -- 5. Calculate Average (Chadian Logic)
  
  open cur_subjects;
  
  loop
    fetch cur_subjects into v_subj_id, v_coef;
    exit when not found;
    
    -- Calculate Devoir Average for Specific Term
    select avg(value) into v_avg_devoirs
    from public.grades 
    where student_id = p_student_id 
      and subject_id = v_subj_id 
      and term = p_term 
      and type = 'devoir';
      
    -- Get Composition Grade for Specific Term
    select value into v_comp_grade
    from public.grades 
    where student_id = p_student_id 
      and subject_id = v_subj_id 
      and term = p_term 
      and type = 'composition'
      limit 1;
      
    -- Logic: If composition missing -> Average Incomplete (ignore this subject in global avg? or return null?)
    -- Chadian logic: "Moyenne is incomplete". 
    -- Implementation: We usually treat it as NULL and exclude it from the global divisor, 
    -- OR we treat it as 0. 
    -- User said: "not 0". So we skip it from the sum.
    
    if v_avg_devoirs is not null and v_comp_grade is not null then
       -- Calculate Subject Average
       v_subj_avg := (v_avg_devoirs + v_comp_grade) / 2;
       
       -- Add to global sums
       v_global_sum := v_global_sum + (v_subj_avg * v_coef);
       v_coef_sum := v_coef_sum + v_coef;
    end if;
    
  end loop;
  
  close cur_subjects;
  
  if v_coef_sum > 0 then
    v_final_average := v_global_sum / v_coef_sum;
  else
    -- Return null or 0 to indicate no average available yet
    v_final_average := 0; 
  end if;

  return json_build_object(
    'total_subjects', v_total_subjects,
    'total_grades', v_total_grades,
    'average', round(v_final_average, 2),
    'absences', v_absences
  );
end;
$$;

-- =========================================================
-- 4. RLS POLICIES
-- =========================================================
alter table public.grades enable row level security;

-- Drop policy if it exists to avoid errors on re-run
drop policy if exists "Students can view own grades" on public.grades;

-- Students can only read their own grades
create policy "Students can view own grades"
on public.grades for select
using ( auth.uid()::text = (select id::text from public.students where id = student_id) );
-- Note: complex casting due to custom students table. 
-- Ideally, ensure auth.uid() matches student.id if using Supabase Auth, 
-- but we are using custom auth returning a JWT with our student ID? 
-- Actually, our RPC bypasses RLS ('security definer'), so this Policy is for direct API access if enabled.
-- Since we use RPC, this is valid but less critical.



-- =========================================================
-- 5. RPC: GET STUDENT BULLETIN (DETAILED REPORT CARD)
-- =========================================================
-- Returns rows matching the Chadian Bulletin format:
-- Discipline | Moy Dev | Moy Comp | Moy Gen | Coef | Total | Appreciation
create or replace function get_student_bulletin(
  p_student_id uuid,
  p_term integer
)
returns table (
  subject_name text,
  subject_code text,
  category text,
  coefficient integer,
  moy_devoir decimal(4,2),
  moy_composition decimal(4,2),
  moy_general decimal(4,2),
  total_points decimal(6,2),
  appreciation text
)
language plpgsql
security definer
as $$
begin
  return query
  with subject_stats as (
    select 
      s.name as subj_name,
      s.code as subj_code,
      cs.category as subj_category,
      cs.coefficient as subj_coef,
      -- Calculate Moyenne Devoirs
      (select avg(value) from public.grades g 
       where g.student_id = p_student_id 
       and g.subject_id = s.id 
       and g.term = p_term 
       and g.type = 'devoir') as m_dev,
       
      -- Get Composition Grade
      (select value from public.grades g 
       where g.student_id = p_student_id 
       and g.subject_id = s.id 
       and g.term = p_term 
       and g.type = 'composition' 
       limit 1) as m_comp
    from public.class_subjects cs
    join public.subjects s on cs.subject_id = s.id
    join public.students stu on stu.classe = cs.class_name
    where stu.id = p_student_id
  )
  select 
    subj_name,
    subj_code,
    subj_category,
    subj_coef,
    coalesce(round(m_dev, 2), 0) as moy_devoir,
    coalesce(m_comp, 0) as moy_composition,
    
    -- Calculate Moyenne Generale: (Dev + Comp) / 2
    case 
      when m_dev is not null and m_comp is not null then 
        round((m_dev + m_comp) / 2, 2)
      else 
        0 -- Incomplete
    end as moy_general,
    
    -- Calculate Total Points: Moy_Gen * Coef
    case 
      when m_dev is not null and m_comp is not null then 
        round(((m_dev + m_comp) / 2) * subj_coef, 2)
      else 
        0 
    end as total_points,
    
    -- Appreciation Logic
    case 
      when (coalesce(m_dev, 0) + coalesce(m_comp, 0)) / 2 >= 18 then 'Excellent'
      when (coalesce(m_dev, 0) + coalesce(m_comp, 0)) / 2 >= 16 then 'Très Bien'
      when (coalesce(m_dev, 0) + coalesce(m_comp, 0)) / 2 >= 14 then 'Bien'
      when (coalesce(m_dev, 0) + coalesce(m_comp, 0)) / 2 >= 12 then 'Assez Bien'
      when (coalesce(m_dev, 0) + coalesce(m_comp, 0)) / 2 >= 10 then 'Passable'
      else 'Médiocre'
    end as appreciation
    
  from subject_stats
  order by 
    case when subj_category = 'Scientifique' then 1 else 2 end, -- Group Sciences first (mimicking bulletin)
    subj_name;
end;
$$;

-- =========================================================
-- 6. RPC: GET STUDENT COURSES (TRACK SPECIFIC)
-- =========================================================
-- Returns list of subjects for the student's specific class
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
as $$
declare
  v_classe text;
begin
  -- Get user's class
  select classe into v_classe from public.students where id = p_student_id;
  
  return query
  select 
    s.id,
    s.name,
    s.code,
    cs.coefficient,
    cs.category
  from public.class_subjects cs
  join public.subjects s on cs.subject_id = s.id
  where cs.class_name = v_classe
  order by cs.category, s.name;
end;
$$;

-- =========================================================
-- END OF SCHEMA
-- =========================================================
-- Note: Seed data is now handled by 'setup_tracks.sql' and 'seed_grades.sql'
-- to prevent duplicates and ensure clean separation of concerns.

