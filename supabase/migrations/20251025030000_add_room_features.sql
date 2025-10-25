-- Add missing columns to rooms table for CreateRoom functionality
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS allow_chat BOOLEAN DEFAULT true;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS session_duration INTEGER DEFAULT 45;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS break_duration INTEGER DEFAULT 5;

-- Update existing rooms with default values
UPDATE public.rooms 
SET allow_chat = true, 
    session_duration = 45, 
    break_duration = 5
WHERE allow_chat IS NULL OR session_duration IS NULL OR break_duration IS NULL;