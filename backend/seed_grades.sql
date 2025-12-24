-- =========================================================
-- SEED DATA: INSERT SAMPLE GRADES
-- =========================================================
-- Use this script to insert test grades for a specific student
-- so you can verify the Dashboard "Average" card calculation.

do $$
declare
  v_student_username text := 'sidick'; -- 👈 CHANGE THIS to your login surname!
  v_student_id uuid;
  v_math_id uuid;
  v_pc_id uuid;
  v_svt_id uuid;
  v_phil_id uuid;
begin
  -- 1. Find the Student
  select id into v_student_id from public.students where surname = v_student_username;

  if v_student_id is null then
    raise exception 'Student with surname % not found. Please change the v_student_username variable at the top.', v_student_username;
  end if;

  -- 2. Get Subject IDs
  select id into v_math_id from public.subjects where code = 'MATH';
  select id into v_pc_id from public.subjects where code = 'PC';
  select id into v_svt_id from public.subjects where code = 'SVT';
  select id into v_phil_id from public.subjects where code = 'PHIL';

  -- 3. Clear existing grades for this student (to avoid duplicates during testing)
  delete from public.grades where student_id = v_student_id;

  -- 4. Insert Grades (Term 1)
  
  -- MATH (Coef 4): Devoir 15, Composition 17 => Avg = (15 + 17)/2 = 16
  insert into public.grades (student_id, subject_id, term, type, value) values
  (v_student_id, v_math_id, 1, 'devoir', 15),
  (v_student_id, v_math_id, 1, 'composition', 17);

  -- PC (Coef 4): Devoir 12, Devoir 14 (Avg 13), Composition 11 => Avg = (13 + 11)/2 = 12
  insert into public.grades (student_id, subject_id, term, type, value) values
  (v_student_id, v_pc_id, 1, 'devoir', 12),
  (v_student_id, v_pc_id, 1, 'devoir', 14),
  (v_student_id, v_pc_id, 1, 'composition', 11);

  -- SVT (Coef 3): Devoir 18, Composition 18 => Avg = 18
  insert into public.grades (student_id, subject_id, term, type, value) values
  (v_student_id, v_svt_id, 1, 'devoir', 18),
  (v_student_id, v_svt_id, 1, 'composition', 18);

  -- PHIL (Coef 2): Only Devoir 14 (No Composition).
  -- Logic says: Incomplete. Excluded from average? Or counts as 0? 
  -- Our function excludes it from the calculation if strict. 
  -- Let's add a composition to make it count.
  insert into public.grades (student_id, subject_id, term, type, value) values
  (v_student_id, v_phil_id, 1, 'devoir', 14),
  (v_student_id, v_phil_id, 1, 'composition', 15); -- Avg 14.5

  -- EXPECTED CALCULATION:
  -- Math: 16 * 4 = 64
  -- PC:   12 * 4 = 48
  -- SVT:  18 * 3 = 54
  -- Phil: 14.5 * 2 = 29
  -- Total Coef: 4+4+3+2 = 13
  -- Total Points: 64+48+54+29 = 195
  -- Global Average: 195 / 13 = 15.00

end $$;
