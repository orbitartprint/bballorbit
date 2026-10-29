# Website contact intake

This endpoint is separate from `send-contact-email`, which is also used by the
Practice Planner support and withdrawal flows. Never overwrite that deployed
function from an older website-only version.

Deploy the contact-queue migration first, then this function with JWT verification
disabled (the public form uses validated Turnstile tokens, a strict origin list,
durable limits and typed input). Configure `WEBSITE_TURNSTILE_SECRET_KEY` only in
Supabase; the public widget key belongs in the website config.

Accepted messages and the outbox job are committed in one database transaction.
The response confirms receipt, including when email must be retried. A worker
claims at most two jobs with a 60-second lease. Each email uses the stable provider
idempotency key `website-contact-v1/<request-id>`. Automatic retries stop before
23 hours or after eight attempts, within Resend's 24-hour idempotency window.

Configure a per-minute `pg_cron` invocation of this function with
`{"action":"drain"}` and the dedicated worker credential stored in Supabase Vault. Public
and anonymous requests cannot invoke the worker or the database RPCs. Verify the
scheduled invocation and a controlled email before switching the website form.

Operational check (run as a database administrator):

```sql
select status, count(*) from public.website_contact_outbox group by status;
select request_id, attempts, last_error, created_at
from public.website_contact_outbox where status = 'needs_review';
```

Customer messages stay in the existing `contact_messages` table. Only hashed
abuse counters expire after seven days. Counter hashes are keyed with the server
credential; raw IP addresses and message contents are never logged by the code.
Rotating the database service credential also resets rate-key continuity, so rotation should be
an operational action, not an automatic response to an individual request.

References: [Turnstile server verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/),
[Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys),
[Supabase scheduled functions](https://supabase.com/docs/guides/functions/schedule-functions).
