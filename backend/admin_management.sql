-- =========================================================
-- 1. ADMIN STATS
-- =========================================================
create or replace function get_admin_stats()
returns json
language plpgsql
security definer
as $$
declare
  v_total_students bigint;
  v_total_teachers bigint;
  v_total_users bigint;
  v_classes_count bigint;
begin
  -- Count Students
  select count(*) into v_total_students from public.students where role = 'student';
  
  -- Count Teachers
  select count(*) into v_total_teachers from public.students where role = 'teacher';
  
  -- Total Users
  v_total_users := v_total_students + v_total_teachers;
  
  -- Count Active Classes (distinct classes from students or schedule)
  select count(distinct classe) into v_classes_count from public.students;

  return json_build_object(
    'total_users', v_total_users,
    'total_students', v_total_students,
    'total_teachers', v_total_teachers,
    'active_classes', v_classes_count
  );
end;
$$;


-- =========================================================
-- 2. USER MANAGEMENT
-- =========================================================

-- Get All Users (Directory)
create or replace function get_all_users(p_role_filter text default null)
returns table (
  id uuid,
  surname text,
  full_name text,
  role text,
  classe text,
  cycle text,
  phone text,
  created_at timestamp with time zone
)
language plpgsql
security definer
as $$
begin
  return query
  select 
    s.id, s.surname, s.full_name, s.role, s.classe, s.cycle, s.phone, s.created_at
  from public.students s
  where (p_role_filter is null or s.role = p_role_filter)
  order by s.created_at desc;
end;
$$;

-- Manage User (Create/Update/Delete)
create or replace function manage_user(
  p_action text, -- 'create', 'update', 'delete'
  p_user_data json
)
returns json
language plpgsql
security definer
as $$
declare
  v_new_id uuid;
  v_surname text;
  v_password text;
begin
  -- CREATE
  if p_action = 'create' then
    v_surname := p_user_data->>'surname';
    
    -- Check uniqueness
    if exists (select 1 from public.students where surname = v_surname) then
       return json_build_object('error', 'Username/Surname already exists');
    end if;

    insert into public.students (
      surname, 
      full_name, 
      cycle, 
      classe, 
      phone, 
      password_hash, 
      role, 
      terms_accepted
    )
    values (
      v_surname,
      p_user_data->>'full_name',
      p_user_data->>'cycle',
      p_user_data->>'classe',
      p_user_data->>'phone',
      crypt(p_user_data->>'password', gen_salt('bf')), -- Hash password
      p_user_data->>'role',
      true -- Admin creations implies terms accepted
    )
    returning id into v_new_id;
    
    return json_build_object('success', true, 'id', v_new_id);

  -- UPDATE
  elsif p_action = 'update' then
    v_password := p_user_data->>'password';
    
    update public.students
    set
      full_name = coalesce(p_user_data->>'full_name', full_name),
      cycle = coalesce(p_user_data->>'cycle', cycle),
      classe = coalesce(p_user_data->>'classe', classe),
      phone = coalesce(p_user_data->>'phone', phone),
      role = coalesce(p_user_data->>'role', role),
      -- Only update password if provided and not empty
      password_hash = case 
                        when v_password is not null and length(v_password) > 0 
                        then crypt(v_password, gen_salt('bf')) 
                        else password_hash 
                      end
    where id = (p_user_data->>'id')::uuid;
    
    return json_build_object('success', true);

  -- DELETE
  elsif p_action = 'delete' then
    delete from public.students where id = (p_user_data->>'id')::uuid;
    return json_build_object('success', true);
  
  else
    return json_build_object('error', 'Invalid action');
  end if;
end;
$$;


-- =========================================================
-- 3. SCHEDULE MANAGEMENT
-- =========================================================

-- Upsert Schedule Slot (Add/Edit)
create or replace function manage_schedule_slot(
  p_classe text,
  p_day text,
  p_start_time text,
  p_end_time text,
  p_subject_code text, -- pass code (e.g. 'MATH') to look up ID
  p_room text
)
returns json
language plpgsql
security definer
as $$
declare
  v_subject_id uuid;
begin
  -- Find Subject ID from Code
  select id into v_subject_id from public.subjects where code = p_subject_code;
  
  if v_subject_id is null then
    return json_build_object('error', 'Subject code not found');
  end if;

  -- Upsert
  insert into public.schedule (
    classe, day_of_week, start_time, end_time, subject_id, room
  )
  values (
    p_classe, 
    p_day, 
    p_start_time::time, 
    p_end_time::time, 
    v_subject_id, 
    p_room
  )
  on conflict (classe, day_of_week, start_time) 
  do update set
    subject_id = excluded.subject_id,
    end_time = excluded.end_time,
    room = excluded.room;
    
  return json_build_object('success', true);
end;
$$;

-- Delete Schedule Slot
create or replace function delete_schedule_slot(
  p_classe text,
  p_day text,
  p_start_time text
)
returns json
language plpgsql
security definer
as $$
begin
  delete from public.schedule 
  where classe = p_classe 
    and day_of_week = p_day 
    and start_time = p_start_time::time;
    
  return json_build_object('success', true);
end;
$$;


-- =========================================================
-- 5. CLASS MANAGEMENT
-- =========================================================

-- Create Classes Table
create table if not exists public.classes (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  created_at timestamp with time zone default now()
);

-- Seed initial classes if empty
insert into public.classes (name)
select n
from unnest(array['Terminale S', 'Terminale L', 'Première S', 'Première L', 'Seconde S', 'Seconde L', '3ème']) as n
where not exists (select 1 from public.classes where name = n);

-- RPC: Get All Classes
create or replace function get_all_classes()
returns table (
  id uuid,
  name text
)
language plpgsql
security definer
as $$
begin
  return query select c.id, c.name from public.classes c order by c.name;
end;
$$;

-- RPC: Manage Class (Add/Delete)
create or replace function manage_class(
  p_action text, -- 'create', 'delete'
  p_name text
)
returns json
language plpgsql
security definer
as $$
begin
  if p_action = 'create' then
    if exists (select 1 from public.classes where name = p_name) then
       return json_build_object('error', 'Class already exists');
    end if;
    insert into public.classes (name) values (p_name);
    return json_build_object('success', true);
    
  elsif p_action = 'delete' then
    delete from public.classes where name = p_name;
    return json_build_object('success', true);
  end if;
  
  return json_build_object('error', 'Invalid action');
end;
$$;


-- =========================================================
-- 6. SUBJECT MANAGEMENT
-- =========================================================

-- RPC: Manage Subject (Add, Edit, Delete)
create or replace function manage_subject(
  p_action text, -- 'create', 'update', 'delete'
  p_id uuid default null,
  p_name text default null,
  p_code text default null
)
returns json
language plpgsql
security definer
as $$
begin
  if p_action = 'create' then
    if exists (select 1 from public.subjects where code = p_code) then
       return json_build_object('error', 'Subject code already exists');
    end if;
    insert into public.subjects (name, code) values (p_name, p_code);
    return json_build_object('success', true);
    
  elsif p_action = 'update' then
    update public.subjects 
    set name = coalesce(p_name, name),
        code = coalesce(p_code, code)
    where id = p_id;
    return json_build_object('success', true);

  elsif p_action = 'delete' then
    delete from public.subjects where id = p_id;
    return json_build_object('success', true);
  end if;
  
  return json_build_object('error', 'Invalid action');
end;
$$;
