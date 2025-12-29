-- ===================================================
-- SETTINGS MODULE
-- ===================================================

-- 1. Change Password RPC
-- Works for any user in the 'students' table (Admins, Teachers, Students)
create or replace function change_user_password(
  p_user_id uuid,
  p_old_password text,
  p_new_password text
)
returns json
language plpgsql
security definer
as $$
declare
  v_current_hash text;
begin
  -- Get current hash
  select password_hash into v_current_hash
  from public.students
  where id = p_user_id;

  if v_current_hash is null then
    return json_build_object('error', 'User not found');
  end if;

  -- Verify old password
  if v_current_hash != crypt(p_old_password, v_current_hash) then
    return json_build_object('error', 'Incorrect current password');
  end if;

  -- Update to new password
  update public.students
  set password_hash = crypt(p_new_password, gen_salt('bf'))
  where id = p_user_id;

  return json_build_object('success', true);
end;
$$;
