# E2E triage

Decide whether one change to a web app warrants new end-to-end test scenarios. Read `pr.md` and
`diff.patch` (paths in the task); nothing else is needed.

**Yes** (`e2e_worthy: true`) when the change adds or alters behaviour a user can exercise in the browser: a new or
changed control, flow, validation, gating rule, or what a screen shows after an action.

**No** when it cannot change what a user does or sees: refactors, types, tests, build and tooling, logging,
dependency bumps, or pure styling or copy tweaks with no behaviour attached.

When in doubt, answer yes. A human reviews the scenarios anyway, while a wrong "no" silently skips coverage.

Answer with JSON matching the schema. `reason` is one sentence naming what in the diff decided it.
