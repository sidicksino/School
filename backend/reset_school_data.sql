-- DANGER: This script wipes all school data!
-- It preserves 'admin' users so you remain logged in.

BEGIN;

-- 1. Operational Data
DELETE FROM public.grades;
DELETE FROM public.attendance;
DELETE FROM public.assignments;
DELETE FROM public.notices;
DELETE FROM public.school_events;
DELETE FROM public.schedule;

-- 2. Curriculum & Structure
DELETE FROM public.class_subjects;

-- 3. Core Entities
-- We delete students and teachers, but KEEP Admins
DELETE FROM public.students WHERE role IN ('student', 'teacher');

DELETE FROM public.classes;
DELETE FROM public.subjects;

COMMIT;

-- Verification
SELECT count(*) as users_left FROM public.students;
SELECT count(*) as classes_left FROM public.classes;
