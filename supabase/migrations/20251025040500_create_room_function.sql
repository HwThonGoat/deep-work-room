-- Create function to create room (bypasses RLS)
CREATE OR REPLACE FUNCTION create_user_room(
  p_name TEXT,
  p_description TEXT DEFAULT NULL,
  p_category TEXT DEFAULT 'general',
  p_user_id UUID DEFAULT auth.uid()
)
RETURNS UUID AS $$
DECLARE
  room_id UUID;
BEGIN
  -- Insert new room
  INSERT INTO public.rooms (name, description, category, created_by, is_active)
  VALUES (p_name, p_description, p_category, p_user_id, true)
  RETURNING id INTO room_id;
  
  RETURN room_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;