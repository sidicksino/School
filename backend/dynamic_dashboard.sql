-- =========================================================
-- 1. UPDATE STUDENT STATS (Use 'attendance' table)
-- =========================================================

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

  -- 4. Absences (UPDATED to use 'attendance' table)
  -- Count only 'Absent' status. 'Sick' might be excused, so let's count only Absent for now or both if requested.
  -- User generic request "absences", usually implies unjustified. 
  -- Let's count 'Absent' only for strictness, or 'Absent' + 'Sick' if we want total days missed.
  -- Defaulting to just 'Absent' as per typical dashboard stats logic.
  select count(*) into v_absences 
  from public.attendance 
  where student_id = p_student_id and status = 'Absent';

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
-- 2. GET TODAY'S SCHEDULE
-- =========================================================

create or replace function get_student_today_schedule(p_student_id uuid)
returns json
language plpgsql
security definer
as $$
declare
  v_student_class text;
  v_today text;
begin
  -- Get user's class
  select classe into v_student_class from public.students where id = p_student_id;
  
  -- Get today's day name (Trimmed because Postgres pads with spaces)
  select trim(to_char(current_date, 'Day')) into v_today;

  -- Fix: Enforce English day names to match DB constraint if server locale varies
  -- For robustness, let's rely on standard English setup or handle it via frontend date, 
  -- but RPC is safer for server consistency. 
  -- Assuming server runs in English or Standard configuration.

  -- Return sorted schedule for today
  return (
    select coalesce(json_agg(
      json_build_object(
        'id', sch.id,
        'subject', sub.name,
        'code', sub.code,
        'start_time', to_char(sch.start_time, 'HH24:MI'),
        'end_time', to_char(sch.end_time, 'HH24:MI'),
        'room', sch.room
      )
      order by sch.start_time asc
    ), '[]'::json)
    from public.schedule sch
    join public.subjects sub on sch.subject_id = sub.id
    where sch.classe = v_student_class
      and sch.day_of_week = v_today
  );
end;
$$;
