-- Update room policies to allow all authenticated users to create rooms
DROP POLICY IF EXISTS "Premium users can create rooms" ON public.rooms;

-- Allow all authenticated users to create rooms
CREATE POLICY "Authenticated users can create rooms"
  ON public.rooms FOR INSERT
  WITH CHECK (auth.uid() = created_by AND auth.uid() IS NOT NULL);

-- Update select policy to be more permissive
DROP POLICY IF EXISTS "Users can view their own private rooms" ON public.rooms;

CREATE POLICY "Users can view active rooms"
  ON public.rooms FOR SELECT
  USING (is_active = true);