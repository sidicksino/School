-- 1. CLEAR BROKEN LINKS
-- We delete all existing configurations because they likely point to 'dead' Subject IDs.
truncate table public.class_subjects;

-- 2. RE-SEED LINKS (Dynamic IDs)
-- We insert subjects for 'Terminale S' by looking up the actual IDs in the subjects table.
-- This guarantees the JOIN works.

do $$
declare
  v_math uuid;
  v_pc uuid;
  v_svt uuid;
  v_fr uuid;
  v_ang uuid;
  v_hg uuid;
  v_philo uuid;
  v_eps uuid;
begin
  -- Get IDs
  select id into v_math from public.subjects where code = 'MATH' limit 1;
  select id into v_pc from public.subjects where code = 'PC' limit 1;
  select id into v_svt from public.subjects where code = 'SVT' limit 1;
  select id into v_fr from public.subjects where code = 'FR' limit 1;
  select id into v_ang from public.subjects where code = 'ANG' limit 1;
  select id into v_hg from public.subjects where code = 'HG' limit 1;
  select id into v_philo from public.subjects where code = 'PHILO' limit 1;
  select id into v_eps from public.subjects where code = 'EPS' limit 1;

  -- Insert for Terminale S (Scientific)
  if v_math is not null then
    insert into public.class_subjects (class_name, subject_id, coefficient, category) values 
    ('Terminale S', v_math, 7, 'Scientifique'),
    ('Terminale S', v_pc, 6, 'Scientifique'),
    ('Terminale S', v_svt, 6, 'Scientifique'),
    ('Terminale S', v_fr, 2, 'Litteraire'),
    ('Terminale S', v_ang, 2, 'Litteraire'),
    ('Terminale S', v_hg, 2, 'Litteraire'),
    ('Terminale S', v_philo, 2, 'Litteraire'),
    ('Terminale S', v_eps, 2, 'Sport');
  end if;
  
   -- Insert for Terminale L (Literary - Example)
  if v_philo is not null then
    insert into public.class_subjects (class_name, subject_id, coefficient, category) values 
    ('Terminale L', v_philo, 7, 'Litteraire'),
    ('Terminale L', v_fr, 6, 'Litteraire'),
    ('Terminale L', v_hg, 5, 'Litteraire'),
    ('Terminale L', v_ang, 4, 'Litteraire'),
    ('Terminale L', v_math, 2, 'Scientifique'),
    ('Terminale L', v_eps, 2, 'Sport');
  end if;
end;
$$;

-- 3. RELOAD
NOTIFY pgrst, 'reload config';
