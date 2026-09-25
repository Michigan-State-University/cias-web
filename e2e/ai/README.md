# E2E AI pipeline

Turns a merged change into reviewed E2E coverage. AI drafts **test scenarios** from the change's diff and the
project's knowledge docs. A developer edits and **approves** them in a draft PR. AI then writes **Playwright specs**
in the suite's own style, verifies them live, and pushes them onto the same PR for the developer to review and
merge.

Nothing AI-written reaches `dev` unless a developer merges it.

```
PR merged into dev ─▶ triage ─▶ planner (Opus) ⇄ reviewer (Sonnet) ─▶ draft PR  e2e-ai/pr-<N>   (scenarios)
                                                                        │  developer edits, then comments /e2e approve
                                                                        ▼
                    codegen (Opus, live browser) ─▶ tsc · lint · 2 live runs ─▶ healer ─▶ same PR, Ready  (specs)
                                                                        │  developer reviews, merges
                                                                        ▼
                                                                   dev (+ e2e-tests.yml)
```

## Quick start (local)

```bash
npm run e2e:ai -- doctor                   # is this machine ready? (no model calls)
npm run e2e:ai -- generate --pr 406        # scenarios for a merged PR  → e2e/scenarios/pr-406/
# review and edit e2e/scenarios/pr-406/scenarios.md — running codegen next is your approval
npm run e2e:ai -- codegen --run pr-406     # specs, verified live  → an uncommitted worktree (path printed)
```

- **Before merging:** `generate --branch feature/x` works on a local branch instead.
- **Without the staging account:** add `--no-live` to codegen for static checks only.
- **To see what would run, free:** add `--dry-run` to either command. It builds the inputs and prints each stage's
  `claude` command.

## In CI: how the team uses it

| You do | The pipeline does |
|---|---|
| Merge a PR into `dev` (with repo variable `E2E_AI_AUTO=on`) | Drafts scenarios and opens draft PR `e2e-ai/pr-<N>`, @-mentioning you |
| Actions → **E2E AI pipeline** → Run workflow, `pr: N` | The same, for any merged PR: backfill or retry. Works with `E2E_AI_AUTO` off |
| Edit `scenarios.md` in the draft PR | Nothing; editing before approval is the normal flow |
| Comment **`/e2e approve`** | Generates, verifies and pushes the specs onto the PR, then marks it Ready |
| Comment `/e2e regenerate <notes>` | Redrafts the scenarios from your current version plus the notes, on the same PR |
| Comment `/e2e decline` | Closes the draft and labels it `e2e-declined` |
| Edit the scenarios **after** approving | Comments once: the specs were generated from the old version. `/e2e approve` regenerates them |
| Leave a draft for 14 days | The daily sweep closes it |

Only the **first line** of a comment counts, and only from someone with write access.

## The approval gate

- **While scenarios are in review, the PR is a draft,** so it can't be merged.
- **`/e2e approve` records who approved which commit.** Specs are generated from **exactly** that commit, merged
  with current `dev`, so they're verified against current code.
- **If the scenarios change between approval and the push, the push fails** (non-fast-forward) rather than
  publishing specs for scenarios nobody approved.
- **The Ready PR is reviewed like any PR.** Push fixes to it and merge when happy. `e2e-tests.yml` runs the whole
  suite on it.

## Reading the scenarios

Each scenario is Markdown with parsed metadata. Keep the `### ID — title` header and the `- key:` lines when you
edit.

```md
### RAE-S06 — A new SMS plan in an RA session defaults to Alert and the participant type is disabled
- automation: spec            # or: manual — <why it can't be automated>
- priority: P0
- covers: <what in the diff this exercises>
- grounded-in: <pills and files the expected behaviour comes from>
- preconditions: <state the test builds first>
- steps:
  1. <action> → <expected, observable result>
- page-objects: <existing methods to reuse>
```

**`manual`** means the suite's harness can't automate it: another role, a real SMS/email/fax, days of waiting, or
backend work not yet on staging (`CONVENTIONS.md → What can be automated`). Manual scenarios stay in the file for a
human, or `/qa-run`, to check.

**Decisions, not questions.** The pipeline never asks the developer anything. Where the pills and code don't
settle something (how to locate a control with no test id, how far an assertion goes, a product call), the planner
takes the option it recommends, writes the scenarios to follow it, and records it under `## Decisions` at the top of
`scenarios.md`. The PR body lists them as "Decisions made for you". Codegen follows them. To overturn one, edit the
decision and the scenarios it affects before approving. The reviewer turns an undecided ambiguity into a correction
("take option X and record it"), and overturns a decision only when a source proves it wrong.

## What the specs look like

- They follow [`CONVENTIONS.md`](CONVENTIONS.md):
  - the fixture's signed-in `test`;
  - page objects for actions;
  - `waitForApiResponse` before the triggering action;
  - retrying `expect`, and no sleeps.
- **Titles start with the scenario ID**, so every test traces back to its scenario.
- **A test still red after healing is committed as `test.fixme`,** with the failure as a comment above it. Its intent
  stays visible, and it can't turn CI red.

## Guardrails

| Risk | What stops it |
|---|---|
| A stage edits what it shouldn't | [`hooks/guard-writes.js`](hooks/guard-writes.js): writes only inside the stage's allowed paths. Existing specs, fixtures, the approved scenarios and this directory are read-only |
| Fixed sleeps, network-idle waits, forced clicks | The same hook blocks them in e2e code; the lint rules ([`eslintrc.js`](eslintrc.js)) catch the rest |
| Scenarios cite test ids, files or methods that don't exist | [`lib/grounding.ts`](lib/grounding.ts) checks every test id, every `file:line` in `covers`/`grounded-in` and every page-object method against the checkout, the paired source and the pills, in under a second, after each draft. Misses go to the revision as corrections; the reviewer gets the results and doesn't redo them. It flags only certain misses: quoted copy it can't find (maybe test data) is a hint for the reviewer, and anything a scenario says codegen will "add" is skipped. On the 5 calibration runs: 0 false flags, and all 4 planted errors caught |
| Generated code adds lint debt to a page object | The lint gate compares each edited file with its version before codegen, per rule: no new errors |
| The model reads secrets | Every stage is denied `.env*` for all file tools, and GitHub tokens are stripped from its environment. Pushes, PRs and comments are done by the orchestrator, never by the model |
| Stages pick up a developer's local Claude setup | Every stage runs `claude -p --restricted --strict-mcp-config` with an explicit tool list, `dontAsk` permissions and the MCP config passed in |
| MCP tools bypass the write guard | Only browser/test tools are allowed. MCP tools that write files (`generator_write_test`) are never allowed. Codegen gets no code-running tool; the healer gets `browser_evaluate` for debugging, as the stock Playwright healer does |
| Runaway cost | A per-stage `--max-budget-usd`, a per-command ceiling, and timeouts. `run.json` records the real cost of every stage, failed ones included |
| Logging out CI's shard accounts | Pipeline mode (`E2E_AI=1`) signs in only its own account, the one after the shard pool, on one worker |

## Costs and knobs

All in [`pipeline.config.json`](pipeline.config.json): each stage's model, `maxBudgetUsd`, timeout and `effort`,
`maxRevisions`, the heal rounds and escalation model, and `maxBudgetUsdPerCommand`.

A stage's cost is roughly its turns × its context: every turn (one model round trip) re-sends everything so far.
So the pipeline keeps both small rather than just capping the bill:
- **Behaviour-only diffs.** Translations, snapshots, tests and tooling stay out of `diff.patch`; `pr.md` lists them.
  The paired backend PR gets the same treatment (`pairedBehaviour`): on #414 its specs were 234 KB of a 317 KB patch.
- **Sized to the change.** `changeSize` counts behaviour files and changed lines (`change` in `run.json`). Within
  `smallChange` (default ≤ 3 files and ≤ 60 lines) the planner and reviewer get its lower `effort` and budgets, and
  the prompt tells them to read the changed files, their direct callers and one or two pills, not the whole area.
- **Paired source.** With the backend's source readable, stages look up defaults, validation and status codes
  instead of turning them into decisions.
- **No question round-trips.** Ambiguities become recorded decisions, never questions, so there's nothing for a
  stage to re-raise or a developer to answer.
- **Targeted review.** The reviewer checks the `file:line`s each scenario cites, instead of re-exploring the area.

| Stage | Model | Measured / expected |
|---|---|---|
| triage | Haiku 4.5 | ~$0.05 |
| planner | Opus 5 | ~$3–5 for a 20-file feature PR. PR #406's first run hit the then-$5 cap before the stages got a behaviour-only diff; re-measure |
| reviewer, per round | Sonnet 5 | ~$0.3–1 |
| codegen | Opus 5 | ~$2.5–6 (estimate) |
| healer, per round | Sonnet 5, Opus 5 on the last | ~$0–1 |

Every run's `run.json` (committed next to the scenarios) and the PR body show the real numbers.

## Setup

**Local**
- Node 22.
- Claude Code **≥ 2.1.282** first on `PATH`, or `E2E_AI_CLAUDE_BIN=/path/to/claude`. An old global install
  (e.g. under nvm) shadows a newer one; `doctor` catches this.
- `gh` signed in.
- For live codegen:
  - `.env` with the E2E credentials;
  - port 4200 free;
  - the pipeline's own staging admin: index 5 of `E2E_ADMIN_EMAIL_PATTERN`, the account after CI's pool of 5.
- Knowledge pills are found in `knowledgeDirs` (the workspace's `.claude/knowledge-pills` locally), and the
  paired repo's source in `pairedRepoDirs` (the `../cias-api` checkout next to this one). Neither is required.

**CI** ([`.github/workflows/e2e-ai.yml`](../../.github/workflows/e2e-ai.yml))
- **Secrets:** `ANTHROPIC_API_KEY` (or, for development, `CLAUDE_CODE_OAUTH_TOKEN` from `claude setup-token`: runs
  then count against that subscription seat's usage limits), `E2E_AI_APP_PRIVATE_KEY`, `E2E_ADMIN_PASSWORD`, `E2E_VERIFICATION_CODE`,
  `ADDITIONAL_ORIGIN_SECURE_TOKEN`.
- **Variables:** `E2E_AI_APP_ID`, `E2E_ADMIN_EMAIL_PATTERN`, `E2E_AI_AUTO=on`. Leave `E2E_AI_AUTO` off until a
  couple of manual runs look right.
- **A GitHub App** with contents, pull requests and issues read/write on this repo, and contents and pull requests
  read on the paired repo (the generate job checks its `dev` out to `.paired/cias-api`, read-only). Pushes are made
  as the App, so other workflows run on them; `GITHUB_TOKEN` pushes don't trigger workflows.
- **Label:** `e2e-declined`.
- **`e2e-tests.yml`:** add `paths-ignore: ['e2e/scenarios/**']` to its `push` trigger. Otherwise every scenario
  commit and edit runs the full suite against staging.
- **Knowledge in CI:** commit the pills to `docs/knowledge-pills/`. Without them the planner works from the diff and
  code only.

## Commands

| Command | Does |
|---|---|
| `generate --pr N` / `--branch B` | Scenarios for a merged PR or a local branch. `--publish` opens the draft PR (CI) |
| `codegen --run <id>` | Local specs for a local run; running it is the approval |
| `approve --pr <draft> [--by <login>]` | The CI approval path: gate checks, then specs onto the draft PR |
| `regenerate --pr <draft> --by <login> --notes "…"` | Redraft onto the same draft PR |
| `decline --pr <draft> --by <login>` | Close a draft |
| `check-scenarios --pr <draft>` | Warn if approved scenarios changed |
| `sweep` | Close drafts left unapproved for `staleDraftDays` |
| `route --event-name … --event-path …` | CI: decide what a GitHub event means |
| `doctor` | Check this machine's setup |
| `report [<run id>…] [--recordings <dir>]` | Calibration table of local runs: change size, cost and turns per stage, and — once approved — how much the developer edited the scenarios (needs the runs' `--record` dirs) |

Common flags:
- `--dry-run`: build inputs and print the `claude` commands.
- `--record <dir>` / `--replay <dir>`: save or replay stage outputs.
- `--keep-work`: keep the worktree.
- `--no-live` (codegen): no browser.
- `--no-triage`: skip the model triage.

## Extending

- **New screens and areas:** codegen adds page objects in the existing style. If the house style changes, update
  `CONVENTIONS.md`, which is the single source every stage reads.
- **More roles:** add accounts, a fixture for them, and move those flows from manual to automatable in
  `CONVENTIONS.md → What can be automated`.
- **Prompts** live in [`prompts/`](prompts/), with the output schemas in [`schemas/`](schemas/). After changing a
  prompt, re-run a few past PRs with `--record`, and compare with `--replay` runs of the old version.
- **After a Playwright upgrade,** run `npm run e2e:ai:sync-agents`. It refreshes the vendored healer and generator in
  [`agents/`](agents/), whose tool lists track the Playwright version.

## Porting to another HTD Playwright project

1. **Copy the files.** Copy this directory two levels below the repo root, next to the suite (e.g. `tests/ai/`), plus
   `.github/workflows/e2e-ai.yml`. Add the dev dependencies `tsx` and `eslint-plugin-playwright`, and the
   `e2e:ai*` / `e2e:typecheck` npm scripts.
2. **`pipeline.config.json`:** `repo`, `baseBranch`, `branchPrefix`, and the **`e2e` block**:
   - `dir`, `pagesDir`;
   - `browserProject`, `authProject`, `seedProject`;
   - `readOnly`, `selectorAttribute`.

   Also set `scenariosDir`, `knowledgeDirs`, `pairedRepo`, `ticketPattern`, the `skip` patterns, `server.port`, and
   the models and budgets.
3. **Rewrite `CONVENTIONS.md`** for the project. Keep the section names **"App behaviour to design around"** and
   **"What can be automated"**: the prompts refer to them. The prompts themselves are project-neutral.
4. **`playwright.config.ts` pipeline mode** (see this repo's, under `E2E_AI`):
   - the auth, browser and seed projects, none depending on setup;
   - `webServer` off;
   - one worker;
   - sign in as the pipeline's own account only;
   - `testIgnore` this directory.
5. **`seed.spec.ts`:** open a signed-in page through the project's fixture.
6. **The workflow:** the app URLs, secrets, account-lock concurrency group, and the step that writes the dev
   server's `.env`.
7. **Check it:** `doctor`, then `generate --pr N --dry-run`.

## Testing the pipeline itself

```bash
npm run e2e:ai:test                    # unit tests (node:test): router, gate, parser, guard, lint gate, …
npm run e2e:typecheck                  # strict tsc over e2e/, pipeline included
npm run e2e:ai:lint -- e2e/ai          # the lint rules on the pipeline's own code
npm run e2e:ai -- generate --pr N --dry-run
```

The workflow is checked with [`actionlint`](https://github.com/rhysd/actionlint) plus `shellcheck`.

## Troubleshooting

| Symptom | Cause, and what to do |
|---|---|
| `lacks --restricted` | An old `claude` is first on `PATH`. Update it, or set `E2E_AI_CLAUDE_BIN` |
| `port 4200 is in use` | Your dev server is running. The pipeline serves the code under test itself, so stop yours |
| `couldn't sign in` | The pipeline's staging account (index 5) doesn't exist, or the credentials are missing |
| `stage plan: budget_exhausted` | The stage hit its `maxBudgetUsd`. The cost is in `run.json`; raise the cap or look at what it read (`--keep-work`) |
| `stage …: no result within N min (timeoutMinutes); killed` | Usually a dropped connection (a laptop sleep, a VPN change): the stage waited on a reply that never came. Re-run; the stage is killed outright at its timeout rather than left hanging |
| `merging dev … conflicts` on approve | Resolve the conflict on the `e2e-ai/*` branch, then `/e2e approve` again |
| Push rejected on approve | The scenarios changed after approval. Comment `/e2e approve` again |
| Nothing happened on merge | `E2E_AI_AUTO` isn't `on`, or the skip rules matched: Dependabot, promotion branches, no app-code change, `skip-e2e-gen` label |

## Trying it on GitHub before it's on `dev` (temporary)

GitHub runs dispatch, comment and merge triggers only from the default branch. Until the pipeline is on `dev`, a
temporary `push` trigger stands in: **a push to `chore/e2e-ai-pipeline` drafts scenarios for the latest PR merged
into `dev` that the rules don't skip, or for the PR named in the pushed commit's message (`e2e-ai: #416`)**. It opens
the real draft PR `e2e-ai/pr-<N>`.

- Needs only the `CLAUDE_CODE_OAUTH_TOKEN` secret (your seat's token from `claude setup-token`) or `ANTHROPIC_API_KEY`. Without the App it uses `GITHUB_TOKEN`, so CI doesn't run on the
  draft's commits.
- `/e2e` comments don't work in this mode, because they need the workflow on `dev`. To approve, run
  `npm run e2e:ai -- approve --pr <draft>` locally.
- CI has no knowledge pills (they're not in the repo), so the scenarios are grounded in code only.
- To redraft, close the draft PR and delete its branch; until then, pushes for that PR stand down.
- **Remove before merging:** the `push` trigger in `e2e-ai.yml` and `lib/latest.ts` (plus its test and the
  `push` branch in `pipeline.ts`'s route command).

## Known gaps

- **`--record` / `--replay` of codegen** saves the stage's summary but not the files it wrote, so codegen can't be
  replayed offline yet.
- **Calibration on past PRs,** to score accuracy and edit size, hasn't been run yet.
