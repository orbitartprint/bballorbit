# Website build and release checks

Use Node.js 24 (the production workflow version), install from the lockfile with
`npm ci`, and run:

```sh
npm run typecheck
npm test
npm run check:app-distribution:release
npm run build
```

`npm run build` includes the postbuild pipeline. It generates route metadata,
the public drill snapshot, sitemap, HTTP-404 fallback and legacy `/app` redirect,
then validates the generated output. Running `vite build` directly omits those
steps and is not a complete release build.

## Public drill publication

The browser reads published drills live, while GitHub Pages needs a generated
HTML file for each route. Publish/unpublish events should trigger the production
workflow using the `public-library-published` repository-dispatch event. That
receiver is configured, but connecting the app's server-side publication event
requires work in the app/backend repository. Never put a GitHub token in the
browser or a `VITE_` variable.

Until that connection is available, the daily scheduled build limits the delay.
Manual dispatch is available for an immediate refresh. Pushes to `main` also
build and publish. A missing/empty public catalog or invalid/duplicate slug
fails the build so an incomplete library is not deployed.

After deployment, compare the current published catalog to the live sitemap and
request each newly published URL directly. Published routes must return HTTP 200;
unknown routes must still return HTTP 404. A successful client-side page render
does not prove a correct HTTP status. Existing files in `dist` are not release
evidence; use a fresh successful build and the deployed HTTP responses.

## Metadata

`src/lib/seo.ts` is the shared source for static-route metadata, canonical URLs,
image URLs and Article structured data. Keep build and client metadata together.
Article/drill detail pages override shared defaults only after their content
loads. Update the shared static map when adding a static page. The generated
`public-route-manifest.json` and drill snapshot are checked against the sitemap.
Sitemap `lastmod` uses content publication/render timestamps, not the build date.

The current generator writes metadata into the SPA shell. **Full server/static
rendering of the actual page body is still pending.** That work must include the
React hydration strategy and regression checks for readable HTML before JS.

## Forms and privacy

Only the inline newsletter form is embedded, in its own React-owned container.
Individual PDF cards link to their existing hosted signup pages. Do not re-add
global modal embed scripts with automatic scroll triggers. The inline form has
an always-available hosted fallback. Keep signup expectations and the privacy
link next to the form; adjust them if the real Kit delivery process changes.

The contact endpoint validates methods, content type, body size and typed input,
checks configuration before storage, and only confirms success after both
storage and notification. Its tests use fake dependencies and send no emails.
Deploy the Supabase function separately from the static website.

The per-instance in-memory contact limit is **best effort**. A durable gateway/
database rate limit, verified bot protection and an outbox/idempotent notification
retry process remain follow-up work. A provider failure after storage currently
returns an error; do not treat the static website deployment as a backend release.

Checkout label colors are managed in Kit, separately from website CSS. Consent
and GA4/GTM request-level verification, security response headers at the hosting
layer, and dependency security upgrades remain separate checks.
