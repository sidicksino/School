-- ===================================================
-- FIX PERMISSIONS AND ENSURE DATA EXISTS
-- ===================================================

-- 1. Grant Permissions on Tables (if RLS is on, or just in case)
grant all on table public.notices to anon, authenticated, service_role;
grant all on table public.school_events to anon, authenticated, service_role;
-- (Attendance should already be fine, but let's Ensure)
grant select on table public.attendance to anon, authenticated;

-- 2. Grant Execute on Functions
grant execute on function get_active_notices() to anon, authenticated, service_role;
grant execute on function get_upcoming_events() to anon, authenticated, service_role;
grant execute on function get_weekly_attendance_stats(uuid) to anon, authenticated, service_role;
grant execute on function get_teacher_classes_list(uuid) to anon, authenticated, service_role;
grant execute on function get_teacher_stats(uuid) to anon, authenticated, service_role;

-- 3. Re-Seed Data (Idempotent)
insert into public.notices (title, content, date) values 
('System Update', 'The dashboard has been updated with new features.', current_date)
on conflict do nothing;

insert into public.school_events (title, description, event_date, location, type) values 
('Sports Day', 'Annual Sports Meet', current_date + interval '7 days', 'Sports Complex', 'social')
on conflict do nothing;

-- 4. Verify RPCs work (for Debug Output)
select * from get_active_notices();
select * from get_upcoming_events();
