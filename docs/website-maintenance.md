# Website maintenance

The production website uses Node 24, React 18, TypeScript 5 and Tailwind 3.
The static renderer, React Helmet integration, React type definitions and
Tailwind Merge 2 are maintained together on this stack. A new platform major
is an architectural change, rather than an automatic dependency update.

Dependabot continues to propose compatible minor/patch updates in separate
data, UI and tooling groups. Node/React type majors track their runtimes.
Platform major migrations are excluded from automatic version PRs. The
dependency security audit remains mandatory for PRs and deployments.

ESLint 10 and React Hooks 7 enforce hook ordering, effect dependencies and
runtime safety. React Compiler is not enabled in the Vite/SWC build, so its
optimization-specific diagnostics are not enabled. No compiler migration is
required to build or release this website.

Only UI components imported by the website or its tests are retained.
The unused Recharts adapter and redundant Sonner notification root were
removed; contact notifications use the existing Radix toast implementation.
Brand SVGs are maintained separately from Lucide because Lucide 1 removed
brand icons. The existing artwork and its ISC license are retained.

Before publishing: clean install, lint without warnings, TypeScript, tests,
dependency audit and the production HTML/SEO build must pass. Check affected
flows on desktop/mobile, merge the release PR, wait for Pages publication
and confirm that the regular website URL serves the new asset entry.
