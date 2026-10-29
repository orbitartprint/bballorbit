# Main website operations

The main website is deployed from `main` by `.github/workflows/deploy.yml` to GitHub Pages. The App has its own release process. Lovable's Publish button is not this production deployment.

Use Node 24 and `npm ci`, `npm test`, `npm run typecheck`, `npm audit`, `npm run build`. The build renders complete React HTML, metadata and structured data for every public route, then verifies the resulting files. It fails on invalid or incomplete public drill data, rather than replacing a good deployment with missing pages. `dist-ssr` contains build-time code and must never be published; only `dist` is deployed.

## Published library updates

Repository pushes and manual workflow runs build immediately. Every 15 minutes, a scheduled workflow compares public drill slug/version/render timestamp metadata against the deployed manifest. It installs dependencies and rebuilds only if this fingerprint changed. This also detects unpublished drills. The minimal public check needs no private Supabase or new GitHub credential. GitHub schedules are best effort and can be delayed; GitHub can disable scheduled workflows after prolonged repository inactivity. A manual **Deploy to GitHub Pages** workflow run is the recovery path. `repository_dispatch: public-library-published` remains available for a future authenticated publisher integration.

The deploy action uses the existing `GH_PAT` repository secret. Do not expose it to public or pull-request builds. Action revisions are pinned; Dependabot proposes updates. The quality workflow has read-only permissions and no deployment secrets.

## Website contact form

Deploy only `website-contact` for this website. Its Turnstile secret is the Supabase Edge Function secret `WEBSITE_TURNSTILE_SECRET_KEY`; the site key in `src/data/contactConfig.json` is public. Widget hostnames are `bballorbit.com` (including www), managed mode, action `website-contact`, pre-clearance off. The server verifies token success, hostname and action. No service-role secret belongs in `VITE_*`, source control or browser code.

The migrations in `supabase/migrations/20261029153000_website_contact_queue.sql` and `20261029153100_website_contact_worker.sql` have been applied to production. The worker key is generated inside Supabase Vault, only its digest is readable by the Edge Function's server role. The minutely cron job `website-contact-outbox` uses this scoped credential. Do not replace it with the Supabase service-role key. The operations SQL creates/updates this named cron job.

Messages and notification work are recorded atomically before the frontend confirms receipt. The worker claims with a lease, uses a stable Resend idempotency key and retries with backoff. Automatic retries stop before the provider's 24-hour idempotency window expires; exhausted jobs need inspection. To check outstanding work without exposing message contents:

```sql
select status, count(*) from public.website_contact_outbox group by status;
select request_id, attempts, created_at, last_error
from public.website_contact_outbox where status = 'needs_review';
```

Do not blindly replay jobs after 24 hours; check Resend delivery first to prevent duplicates. Provider acceptance does not prove inbox delivery. Contact retention follows the existing privacy policy; only hashed rate counters are automatically pruned after seven days. `supabase/tests/website-contact.sql` tests database behavior inside a rolled-back transaction and sends no email.

`send-contact-email` is shared with App support and withdrawal declarations. Its index is synchronized with the pre-change production source for documentation; do not deploy it from this website workflow or overwrite it with the website handler. Its live deployment was not changed.

## Consent and analytics

CookieYes manages consent. GA4 loads only after explicit analytics opt-in, and embedded YouTube loads only after advertising opt-in plus a click on Play. The public page remains readable without either. GA4 browser-history measurement is disabled in the web stream; the application emits one page view after route content loads. Do not re-enable history page views without removing the manual tracker, or navigation will be counted twice. Consent revocation disables further events and removes GA cookies; already transmitted events cannot be recalled.

## Security headers

`config/security-headers.json` records the Cloudflare response-header rule applied to the bare and www main hostnames. It excludes the App and checkout. The current CSP restricts object, base and framing; it is not a comprehensive script CSP. A future script policy should start in report-only mode and include all essential providers before enforcement.
