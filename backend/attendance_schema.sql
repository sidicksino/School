-- =========================================================
-- ATTENDANCE SCHEMA & RPCs
-- Stores daily attendance status for students
-- =========================================================

-- 1. Create Table (If not exists)
create table if not exists public.attendance (
    id uuid primary key default uuid_generate_v4(),
    student_id uuid not null references public.students(id),
    date date not null default current_date,
    status text not null check (status in ('Present', 'Absent', 'Sick')),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(student_id, date)
);

create index if not exists attendance_student_date_idx on public.attendance(student_id, date);

-- 2. DISABLE RLS (Recalling that we use custom auth RPCs)
-- Since we don't have Supabase Auth tokens, standard RLS blocks us.
-- We will rely on RPCs for access control logic (or lack thereof for this prototype level).
alter table public.attendance disable row level security;

-- 3. RPC: Get Class Attendance Sheet
-- Returns list of students in a class with their status for a specific date
create or replace function get_class_attendance_sheet(
  p_classe text,
  p_date date
)
returns table (
  student_id uuid,
  full_name text,
  status text
)
language plpgsql
security definer
as $$
begin
  return query
  select 
    s.id as student_id,
    s.full_name,
    coalesce(a.status, 'Present') as status -- Default to 'Present' if no record
  from public.students s
  left join public.attendance a on s.id = a.student_id and a.date = p_date
  where s.classe = p_classe
  order by s.full_name;
end;
$$;

-- 4. RPC: Save Attendance Bulk
-- Takes a JSON array of records to upsert: [{ student_id, date, status }, ...]
create or replace function save_attendance_bulk(
  p_records json
)
returns json
language plpgsql
security definer
as $$
declare
  v_record json;
begin
  -- Loop through records and upsert
  for v_record in select * from json_array_elements(p_records)
  loop
    insert into public.attendance (student_id, date, status)
    values (
      (v_record->>'student_id')::uuid,
      (v_record->>'date')::date,
      v_record->>'status'
    )
    on conflict (student_id, date) 
    do update set 
      status = excluded.status,
      updated_at = now();
  end loop;
  
  return json_build_object('success', true);
exception when others then
  return json_build_object('error', SQLERRM);
end;
$$;

-- 5. RPC: Get Student Attendance Range
-- For the WeeklyAttendance component
create or replace function get_student_attendance_range(
  p_student_id uuid,
  p_start_date date,
  p_end_date date
)
returns table (
  date date,
  status text
)
language plpgsql
security definer
as $$
begin
  return query
  select 
    a.date,
    a.status
  from public.attendance a
  where a.student_id = p_student_id
    and a.date >= p_start_date
    and a.date <= p_end_date;
end;
$$;
