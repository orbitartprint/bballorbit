-- Create contact_messages table for storing contact form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact messages (public form)
CREATE POLICY "Anyone can insert contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

-- Create policy to restrict viewing contact messages (admin only - we'll handle this later if needed)
CREATE POLICY "Admin can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (false); -- For now, disable all SELECT operations

-- Add index for created_at for better query performance
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at DESC);