-- ===================================================
-- ATTENDANCE CHART STATS
-- ===================================================

create or replace function get_weekly_attendance_stats(p_student_id uuid)
returns table (
  day_name text,
  is_present boolean,
  status text
)
language plpgsql
security definer
as $$
begin
  -- Return last 5 weekdays (simplification: just query actual records or generate series)
  -- For a real app, we'd join with a date series. 
  -- Here we'll just check the last 5 attendance entries.
  
  return query
  select 
    to_char(date, 'Dy') as day_name,
    present as is_present,
    status
  from public.attendance
  where student_id = p_student_id
  order by date desc
  limit 5;
end;
$$;
