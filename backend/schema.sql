-- 1. Enable UUID extension and PGCrypto for secure hashing
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- 2. Create the Custom Students Table (No relation to auth.users)
create table public.students (
  id uuid primary key default uuid_generate_v4(),
  surname text unique not null,          -- Acts as Username (Surnom)
  full_name text not null,               -- 'Nom et Prénom'
  cycle text not null check (cycle in ('College', 'Lycee')),
  classe text not null,
  phone text not null,
  password_hash text not null,           -- Securely hashed password
  role text not null default 'student',
  terms_accepted boolean not null default false,
  created_at timestamp with time zone default now(),
  constraint surname_length check (char_length(surname) >= 3)
);

-- 3. Secure Registration Function (RPC)
-- Call this from frontend: supabase.rpc('register_student', { surname, full_name, ... })
create or replace function register_student(
  p_surname text,
  p_full_name text,
  p_cycle text,
  p_classe text,
  p_phone text,
  p_password text,
  p_terms boolean
) returns json
language plpgsql
security definer -- Runs with admin privileges to insert
as $$
declare
  v_student_id uuid;
begin
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
    crypt(p_password, gen_salt('bf')), -- Hash password securely
    p_terms
  )
  returning id into v_student_id;

  return json_build_object('success', true, 'id', v_student_id);
end;
$$;

-- 4. Secure Login Function (RPC)
-- Call this from frontend: supabase.rpc('login_student', { surname, password })
create or replace function login_student(
  p_surname text,
  p_password text
) returns json
language plpgsql
security definer
as $$
declare
  v_student record;
begin
  select id, surname, full_name, cycle, classe, role
  into v_student
  from public.students
  where surname = p_surname;

  if v_student is null then
    return json_build_object('error', 'Invalid credentials');
  end if;

  -- Verify password
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
end;
$$;

-- 5. Enable RLS (Optional logic for future)
alter table public.students enable row level security;

-- Allow public read/write only via the secure functions defined above? 
-- Actually, for RPC-only approach, we can keep the table private (no direct SELECT/INSERT/UPDATE policy for public/anon).
-- The 'security definer' functions bypass RLS, which is perfect for this use case.
