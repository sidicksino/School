-- check_classes.sql

-- 1. Check what the student's class is (for a sample student, or all students)
select id, surname, classe from public.students limit 5;

-- 2. Check what classes are in the assignments table
select id, title, class_name from public.assignments order by created_at desc limit 5;

-- 3. Check the exact match logic that the RPC uses
-- The RPC does: select classe into v_classe from students...; select * from assignments where class_name = v_classe;
