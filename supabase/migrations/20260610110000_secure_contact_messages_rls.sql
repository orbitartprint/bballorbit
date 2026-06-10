-- Harden contact form storage access.
-- Contact submissions are written by the send-contact-email Edge Function with
-- the service role key, so public clients should not insert directly.
DROP POLICY IF EXISTS "Anyone can insert contact messages"
ON public.contact_messages;

DROP POLICY IF EXISTS "Admin can view contact messages"
ON public.contact_messages;

DROP POLICY IF EXISTS "Admins can view contact messages"
ON public.contact_messages;

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
