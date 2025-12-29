-- ===================================================
-- COMMON FEATURES (Notices & Events)
-- ===================================================

-- 1. NOTICES TABLE
create table if not exists public.notices (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text,
  date date default current_date,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Seed Notices
insert into public.notices (title, content, date) values 
('Christmas Holiday', 'School closed until Jan 5th.', '2024-12-25'),
('Exam Results', 'Term 1 Exams Results will be published on the portal.', '2025-01-05')
on conflict do nothing;

-- 2. SCHOOL EVENTS TABLE
create table if not exists public.school_events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  event_date date not null,
  location text,
  type text check (type in ('academic', 'social', 'meeting', 'holiday')),
  created_at timestamptz default now()
);

-- Seed Events
insert into public.school_events (title, description, event_date, location, type) values 
('Parent Meeting', 'Term 2 Orientation', '2025-01-15', 'Main Hall', 'meeting'),
('Science Fair', 'Annual Science Exhibition', '2025-02-01', 'Campus', 'academic')
on conflict do nothing;

-- 3. RPCs to Fetch Data

create or replace function get_active_notices()
returns table (id uuid, title text, content text, date date)
language sql
security definer
as $$
  select id, title, content, date 
  from public.notices 
  where is_active = true 
  order by date desc 
  limit 5;
$$;

create or replace function get_upcoming_events()
returns table (id uuid, title text, description text, event_date date, location text, type text)
language sql
security definer
as $$
  select id, title, description, event_date, location, type
  from public.school_events
  where event_date >= current_date
  order by event_date asc
  limit 5;
$$;
