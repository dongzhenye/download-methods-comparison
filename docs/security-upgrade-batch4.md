# Dependency validation — 2026-10-26

Updated Vite 7.0.0 to 7.3.7 and refreshed vulnerable transitive dependencies within their existing compatible ranges. React and React DOM remain locked at 19.1.0. No major upgrades or overrides were required.

Validation on Node 26.12.1 / pnpm 11.25.0:

- Baseline lint and production build passed.
- Updated lint and production build passed.
- Full and production-only `pnpm audit`: zero known vulnerabilities.
- Headless Chromium production-preview smoke passed: synthetic CSV download, HTTP 404 feedback, and button recovery. All non-loopback requests were blocked. The visible toggle was used because its native checkbox is intentionally hidden.
- No dedicated unit-test or typecheck scripts exist.

The registry was queried for Vite 7 releases; 7.3.7 is the latest published 7.x. Audit results are a dated registry snapshot, not a guarantee against future advisories. The existing ESLint 9.29.0 emits an end-of-support warning; a lint-toolchain migration is outside this patch.

No push, deployment, release, or live external download was performed.
