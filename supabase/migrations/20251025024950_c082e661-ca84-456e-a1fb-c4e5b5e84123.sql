-- Fix search_path for security definer functions
CREATE OR REPLACE FUNCTION reset_daily_usage()
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET daily_sessions_used = 0,
      daily_messages_used = 0,
      last_reset_date = CURRENT_DATE
  WHERE last_reset_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION can_join_session(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_plan TEXT;
  sessions_used INTEGER;
  last_reset DATE;
BEGIN
  SELECT subscription_plan, daily_sessions_used, last_reset_date
  INTO user_plan, sessions_used, last_reset
  FROM profiles
  WHERE id = p_user_id;
  
  IF last_reset < CURRENT_DATE THEN
    UPDATE profiles 
    SET daily_sessions_used = 0,
        daily_messages_used = 0,
        last_reset_date = CURRENT_DATE
    WHERE id = p_user_id;
    RETURN true;
  END IF;
  
  IF user_plan IN ('premium_monthly', 'premium_yearly') THEN
    RETURN true;
  END IF;
  
  RETURN sessions_used < 3;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION increment_session_usage(p_user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET daily_sessions_used = daily_sessions_used + 1
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;