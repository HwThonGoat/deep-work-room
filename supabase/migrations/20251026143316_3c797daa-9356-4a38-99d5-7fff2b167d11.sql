-- Enable realtime for chat_messages table so users can see messages in real-time
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;