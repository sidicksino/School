-- backend/debug_rpc.sql

do $$
declare
  v_student_id uuid;
  v_classe text;
  v_count integer;
begin
  -- 1. Grab the first student found
  select id, classe into v_student_id, v_classe from public.students limit 1;
  
  raise notice 'Debug: Testing for Student ID: %, Class: %', v_student_id, v_classe;

  -- 2. Check if we have assignments for this class (Fuzzy Match)
  select count(*) into v_count 
  from public.assignments 
  where trim(class_name) ilike trim(v_classe);
  
  raise notice 'Debug: Found % assignments matching class "%"', v_count, v_classe;

  -- 3. Check exact match
  select count(*) into v_count 
  from public.assignments 
  where class_name = v_classe;
  
  raise notice 'Debug: Found % assignments with EXACT match', v_count;

  -- 4. Check total assignments
  select count(*) into v_count from public.assignments;
  raise notice 'Debug: Total assignments in table: %', v_count;
  
end;
$$;

-- Run the RPC directly for that student
select * from get_student_assignments((select id from public.students limit 1));
