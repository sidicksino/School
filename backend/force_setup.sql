-- =========================================================
-- FORCE SETUP: FIX DASHBOARD DATA
-- =========================================================
-- This script ensures ALL students see data by:
-- 1. Putting everyone in 'Terminale S' (the class we configured).
-- 2. Giving everyone sample grades.

BEGIN;

-- 1. Force all students to be in "Terminale S"
-- This matches the subjects we inserted in class_subjects.
UPDATE public.students 
SET classe = 'Terminale S'
WHERE role = 'student';

-- 2. Clear old grades to avoid duplicates
DELETE FROM public.grades;

-- 3. Insert Grades for EVERY Student
-- Loop through all students and give them grades for Math, PC, SVT
INSERT INTO public.grades (student_id, subject_id, term, type, value)
SELECT 
    s.id, 
    sub.id, 
    1, -- Term 1
    'devoir', 
    floor(random() * (18-12+1) + 12) -- Random grade between 12 and 18
FROM public.students s
CROSS JOIN public.subjects sub
WHERE sub.code IN ('MATH', 'PC', 'SVT', 'PHIL')
AND s.role = 'student';

INSERT INTO public.grades (student_id, subject_id, term, type, value)
SELECT 
    s.id, 
    sub.id, 
    1, -- Term 1
    'composition', 
    floor(random() * (18-10+1) + 10) -- Random grade between 10 and 18
FROM public.students s
CROSS JOIN public.subjects sub
WHERE sub.code IN ('MATH', 'PC', 'SVT') -- No Comp for Phil in this demo? Let's add it to be safe.
AND s.role = 'student';

-- Add Phil Composition separately to be sure
INSERT INTO public.grades (student_id, subject_id, term, type, value)
SELECT s.id, sub.id, 1, 'composition', 14
FROM public.students s
CROSS JOIN public.subjects sub
WHERE sub.code = 'PHIL' AND s.role = 'student';

COMMIT;

SELECT 'SUCCESS: All students set to Terminale S and given grades.' as result;
