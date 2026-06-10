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

-- Contact submissions are written by the send-contact-email Edge Function with
-- the service role key. Public clients should not insert directly.

-- Allow only authenticated administrators to view stored contact messages.
CREATE POLICY "Admins can view contact messages"
ON public.contact_messages
FOR SELECT
USING (
  auth.role() = 'authenticated'
  AND (
    auth.jwt() ->> 'role' = 'admin'
    OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  )
);

-- Add index for created_at for better query performance
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
