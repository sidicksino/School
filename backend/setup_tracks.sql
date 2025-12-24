-- =========================================================
-- SETUP TRACKS: SCIENTIFIQUE (S) VS LITTÉRAIRE (L)
-- =========================================================

-- 1. Ensure all subjects exist
INSERT INTO public.subjects (code, name) VALUES
('MATH', 'Mathématiques'),
('PC', 'Physique-Chimie'), -- Not for L
('SVT', 'Sciences de la Vie et de la Terre'),
('FR', 'Français'),
('HG', 'Histoire-Géographie'),
('PHILO', 'Philosophie'),
('ANG', 'Anglais'),
('AR', 'Arabe')
ON CONFLICT (code) DO NOTHING;

-- 2. Clear existing configurations to restart fresh
TRUNCATE public.class_subjects;

-- 3. Configure TERMINALE S (Scientifique)
-- Heavy on Math, PC, SVT. Light on Lit.
INSERT INTO public.class_subjects (class_name, subject_id, coefficient, category)
SELECT 'Terminale S', id, 7, 'Scientifique' FROM public.subjects WHERE code = 'MATH';

INSERT INTO public.class_subjects (class_name, subject_id, coefficient, category)
SELECT 'Terminale S', id, 6, 'Scientifique' FROM public.subjects WHERE code = 'PC';

INSERT INTO public.class_subjects (class_name, subject_id, coefficient, category)
SELECT 'Terminale S', id, 5, 'Scientifique' FROM public.subjects WHERE code = 'SVT';

INSERT INTO public.class_subjects (class_name, subject_id, coefficient, category)
SELECT 'Terminale S', id, 2, 'Littéraire' FROM public.subjects WHERE code IN ('FR', 'PHILO', 'HG', 'ANG', 'AR');


-- 4. Configure TERMINALE L (Littéraire)
-- Heavy on Lit. No PC. Light on Math/SVT.
INSERT INTO public.class_subjects (class_name, subject_id, coefficient, category)
SELECT 'Terminale L', id, 7, 'Littéraire' FROM public.subjects WHERE code = 'PHILO';

INSERT INTO public.class_subjects (class_name, subject_id, coefficient, category)
SELECT 'Terminale L', id, 6, 'Littéraire' FROM public.subjects WHERE code = 'FR';

INSERT INTO public.class_subjects (class_name, subject_id, coefficient, category)
SELECT 'Terminale L', id, 4, 'Littéraire' FROM public.subjects WHERE code IN ('HG', 'ANG', 'AR');

INSERT INTO public.class_subjects (class_name, subject_id, coefficient, category)
SELECT 'Terminale L', id, 2, 'Scientifique' FROM public.subjects WHERE code IN ('MATH', 'SVT');

-- Note: PC is completely omitted for Terminale L (Standard Chadian/French L track)


-- 5. Helper: Re-seed grades based on track for ALL students
-- (Clears old grades and inserts new ones valid for their specific class)
BEGIN;

DELETE FROM public.grades;

-- Insert for Terminale S Students (Includes PC, higher Math scores)
INSERT INTO public.grades (student_id, subject_id, term, type, value)
SELECT s.id, sub.id, 1, 'devoir', floor(random() * 6 + 12) -- 12-18
FROM public.students s
JOIN public.class_subjects cs ON s.classe = cs.class_name
JOIN public.subjects sub ON cs.subject_id = sub.id
WHERE s.classe = 'Terminale S' AND s.role = 'student';

INSERT INTO public.grades (student_id, subject_id, term, type, value)
SELECT s.id, sub.id, 1, 'composition', floor(random() * 6 + 11) -- 11-17
FROM public.students s
JOIN public.class_subjects cs ON s.classe = cs.class_name
JOIN public.subjects sub ON cs.subject_id = sub.id
WHERE s.classe = 'Terminale S' AND s.role = 'student';


-- Insert for Terminale L Students (No PC, higher Philo/Fr scores)
INSERT INTO public.grades (student_id, subject_id, term, type, value)
SELECT s.id, sub.id, 1, 'devoir', floor(random() * 6 + 10)
FROM public.students s
JOIN public.class_subjects cs ON s.classe = cs.class_name
JOIN public.subjects sub ON cs.subject_id = sub.id
WHERE s.classe = 'Terminale L' AND s.role = 'student';

INSERT INTO public.grades (student_id, subject_id, term, type, value)
SELECT s.id, sub.id, 1, 'composition', floor(random() * 6 + 10)
FROM public.students s
JOIN public.class_subjects cs ON s.classe = cs.class_name
JOIN public.subjects sub ON cs.subject_id = sub.id
WHERE s.classe = 'Terminale L' AND s.role = 'student';

COMMIT;

SELECT 'Tracks configured successfully. Students in Terminale S see one set, Terminale L see another.' as result;
