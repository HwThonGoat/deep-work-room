-- Add subscription plans and usage tracking to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'premium_monthly', 'premium_yearly'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS daily_sessions_used INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS daily_messages_used INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_reset_date DATE DEFAULT CURRENT_DATE;

-- Create chat messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on chat_messages
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Chat messages policies
CREATE POLICY "Users can view messages in rooms they're in"
  ON public.chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add room_id and is_private to study_sessions if not exists
ALTER TABLE study_sessions ADD COLUMN IF NOT EXISTS room_id UUID;
ALTER TABLE study_sessions ADD COLUMN IF NOT EXISTS is_private BOOLEAN DEFAULT false;

-- Update rooms table to support user-created rooms
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS is_private BOOLEAN DEFAULT false;
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS max_participants INTEGER DEFAULT 8;

-- Update rooms RLS to allow users to create rooms
CREATE POLICY "Premium users can create rooms"
  ON public.rooms FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view their own private rooms"
  ON public.rooms FOR SELECT
  USING (is_active = true AND (is_private = false OR created_by = auth.uid()));

-- Function to reset daily usage counters
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

-- Function to check and increment session usage
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
  
  -- Reset if needed
  IF last_reset < CURRENT_DATE THEN
    UPDATE profiles 
    SET daily_sessions_used = 0,
        daily_messages_used = 0,
        last_reset_date = CURRENT_DATE
    WHERE id = p_user_id;
    RETURN true;
  END IF;
  
  -- Premium users have unlimited sessions
  IF user_plan IN ('premium_monthly', 'premium_yearly') THEN
    RETURN true;
  END IF;
  
  -- Free users limited to 3 sessions
  RETURN sessions_used < 3;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to increment session count
CREATE OR REPLACE FUNCTION increment_session_usage(p_user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET daily_sessions_used = daily_sessions_used + 1
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_room_id ON chat_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_completed ON study_sessions(user_id, completed, started_at DESC);