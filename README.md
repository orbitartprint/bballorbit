# Basketball Orbit main website

React 18, TypeScript, Vite and Tailwind website for https://bballorbit.com. The Practice Planner App is maintained separately.

Use Node 24 and `npm ci`. `npm run dev` starts local development. Before release, run `npm test`, `npm run typecheck`, `npm audit` and `npm run build`.

The production build renders complete route HTML, public drill snapshots, metadata, structured data and a sitemap. Deploy only `dist`; `dist-ssr` is a build-time bundle. Production is published from GitHub Actions on `main`, with periodic checks for new public drills.

See [website operations](docs/website-operations.md) for deployment, public-library synchronization, contact queue, consent, analytics and security headers. Public Supabase configuration and the Turnstile site key are deliberately public. Private server credentials must never be stored in `VITE_*` or committed.

The [Lovable project](https://lovable.dev/projects/1a238d7d-7757-4d9f-b4d6-94b886766d62) can still be used for source editing. Its Publish button is not the production release path for this main website.
