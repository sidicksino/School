-- =========================================================
-- 1. SCHEDULE TABLE (IMPROVED)
-- =========================================================
create table if not exists public.schedule (
  id uuid primary key default uuid_generate_v4(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  classe text not null,
  day_of_week text not null check (
    day_of_week in (
      'Monday','Tuesday','Wednesday',
      'Thursday','Friday','Saturday'
    )
  ),
  start_time time not null,
  end_time time not null,
  room text,
  created_at timestamp with time zone default now(),

  constraint valid_time_range check (end_time > start_time),
  constraint unique_schedule_slot unique (classe, day_of_week, start_time)
);

create index if not exists idx_schedule_classe_day
on public.schedule (classe, day_of_week);

-- =========================================================
-- 2. RPC: GET STUDENT SCHEDULE (SECURE & SORTED)
-- =========================================================
create or replace function get_student_schedule(p_student_id uuid)
returns json
language plpgsql
security definer
as $$
declare
  v_student_class text;
begin
  select classe
  into v_student_class
  from public.students
  where id = p_student_id;

  if v_student_class is null then
    raise exception 'Student not found or class not assigned';
  end if;

  return (
    select coalesce(json_agg(
      json_build_object(
        'id', sch.id,
        'subject', sub.name,
        'code', sub.code,
        'day', sch.day_of_week,
        'start_time', sch.start_time,
        'end_time', sch.end_time,
        'room', sch.room
      )
      order by
        case sch.day_of_week
          when 'Monday' then 1
          when 'Tuesday' then 2
          when 'Wednesday' then 3
          when 'Thursday' then 4
          when 'Friday' then 5
          when 'Saturday' then 6
        end,
        sch.start_time
    ), '[]'::json)
    from public.schedule sch
    join public.subjects sub on sch.subject_id = sub.id
    where sch.classe = v_student_class
  );
end;
$$;

-- =========================================================
-- 3. SEED DATA (TERMINALE S)
-- =========================================================
with subject_ids as (
  select id, code from public.subjects
)
insert into public.schedule (subject_id, classe, day_of_week, start_time, end_time, room)
select id, 'Terminale S', 'Monday', '08:00'::time, '10:00'::time, 'Salle 101' from subject_ids where code = 'MATH'
union all
select id, 'Terminale S', 'Monday', '10:00'::time, '12:00'::time, 'Salle 102' from subject_ids where code = 'PC'
union all
select id, 'Terminale S', 'Tuesday', '08:00'::time, '10:00'::time, 'Labo SVT' from subject_ids where code = 'SVT'
union all
select id, 'Terminale S', 'Tuesday', '10:00'::time, '12:00'::time, 'Salle 103' from subject_ids where code = 'ANG'
union all
select id, 'Terminale S', 'Wednesday', '08:00'::time, '10:00'::time, 'Salle 104' from subject_ids where code = 'PHIL'
on conflict do nothing;
