# E2E conventions

House rules for Playwright code in `e2e/`. They are distilled from the existing suite and written for two readers:
developers, and the AI pipeline's code-generation and healer stages, which get this file as their instructions.

Where the existing suite breaks a rule (most visibly ~100 `waitForTimeout` calls), that is debt, not precedent:
**new code follows the rule.**

## Structure

- Specs live in `e2e/<area>/<feature>.spec.ts` (areas today: `interventions/`, `sessions/`), one `test.describe`
  per feature. Test titles describe behaviour in plain English. Generated tests prefix the title with their
  scenario ID: `test('RA-S03 blocks copying an RA session into an intervention that has one', …)`.
- Specs import `test` and `expect` from `../fixtures/test`, never from `@playwright/test`. The fixture gives each
  worker its own signed-in admin, because the API rotates the access token on every request. A spec never signs in
  through the login form and never creates its own browser context.
- Page objects live in `e2e/pages/`, import from `@playwright/test`, and are exported from `e2e/pages/index.ts`.
  Construct them per test: `const interventionPage = new InterventionPage(page);`.
- Shared helpers live in `e2e/utils/`.

## Test data

- Every test creates its own data: `await dashboardPage.goto(); await dashboardPage.createIntervention();`.
  Never search for or reuse existing interventions. The staging accounts are shared, so lists contain other
  runs' data. `InterventionPage.selectCopyTarget` shows why lookups by name are unreliable.
- Keep ids, not names: `const id = await dashboardPage.getInterventionIdFromUrl();`, then navigate by id with
  `await page.goto(`/interventions/${id}`);`.
- No clean-up. Staging data is throwaway.

## Actions go through page objects

- A spec reads as a sequence of page-object calls. Clicks, fills and multi-step flows belong in page objects.
- Before adding a method, look for an existing one in `e2e/pages/`. Reuse beats a near-duplicate.
- A new method goes into the page object for that screen, is named for the user's intent (`createRaSession`,
  `publishIntervention`, not `clickSecondButton`), and waits for the API call it triggers (see Waiting).
- A new screen gets a new page object in the same shape: `readonly page`, readonly locators for stable elements,
  async methods. Export it from `e2e/pages/index.ts`.
- One-off assertions may use an inline locator in the spec. That is the house style:
  `await expect(page.locator('[data-cy="enter-session-0"]')).toBeVisible();`. A check used by more than one test
  becomes a page-object method named `expect…` (like `InterventionPage.expectSessionCount`).

## Locators, in order of preference

1. **`data-cy`** — the suite's primary selector: `[data-cy="create-intervention-button"]`, dynamic
   `[data-cy="intervention-tile-${id}"]`, prefix-match for lists `[data-cy^="enter-session-"]`.
2. **`getByRole(role, { name })`** for accessible controls without a `data-cy`.
3. **`getByText(…)`** for asserting visible copy (toasts, headings). The copy is the English `defaultMessage` in the
   component's `messages` file.

Never use:
- styled-components class names (hashed, they change every build);
- XPath;
- `.locator('..')` parent chains;
- `.nth()` where an id-based `data-cy` exists.

The react-select `[class*="multiValue"]`-style parts already used in `DashboardPage` are stable and fine.

If a new element has no `data-cy`, add one to the component (only in files the change under test already
touched), in kebab-case, named for the element: `data-cy="create-session-submit-button"`.

## Waiting

- **Never** `page.waitForTimeout()`, `waitForLoadState('networkidle')` (the app keeps an AnyCable WebSocket
  open), `waitForSelector`, `waitForNavigation`, or `{ force: true }`.
- **Wait for the API call the action triggers**, using `waitForApiResponse` from `e2e/utils/`. Register it
  **before** the action and keep the expected status in the match, so a failure reports what the API answered
  instead of a bare timeout:

  ```ts
  const created = waitForApiResponse(this.page, {
    urlIncludes: '/sessions',
    method: 'POST',
    status: 201,
  });
  await submitButton.click();
  await created;
  ```

- **Assert with retrying, web-first expectations:** `toBeVisible`, `toHaveCount`, `toHaveText`, `toBeEnabled`,
  `toBeChecked`. Never one-shot reads: `expect(await locator.count()).toBe(2)` fails right after a navigation
  because the list hasn't loaded from staging yet. That is why `expectSessionCount` exists next to
  `getSessionCount`.
- For a value with no locator to wait on, use `expect.poll(…)` (as in `selectCopyTarget`).
- Don't pass explicit timeouts. `playwright.config.ts` raises the action, navigation and expect timeouts on CI
  for the remote staging API, and a hard-coded short timeout overrides them.

## App behaviour to design around

The pipeline's prompts refer to this section by name. Scenarios and specs must respect all of it.

- A freshly created intervention is a **draft**. Status-gated actions need `publishIntervention()` first.
- Most views **don't live-update** after create, duplicate, delete or reorder. Navigate or reload before asserting
  on a list, then assert with a retrying expectation.
- Virtualised lists (react-window) render only the visible rows. Scroll until the row exists (the
  `selectCopyTarget` pattern) rather than waiting for a name to appear.
- Test accounts are shared staging accounts, so every test creates its own data and never searches for existing
  data.

## What can be automated

The pipeline's prompts refer to this section by name when tagging scenarios `spec` or `manual`.

- **Automatable (`spec`):** anything an **admin** can do in the browser against the staging API, from fresh data,
  with the result observable on screen or in an API response. CI runs **webkit only**, in 5 shards with 1 worker
  each.
- **Manual:**
  - flows that need another role: a participant filling a session, researcher, navigator,
    organization / health-system / clinic admin, predefined participant;
  - out-of-band effects: a real SMS, email or fax, a delivered PDF;
  - real waiting, such as scheduling over days;
  - backend behaviour not yet deployed to staging.

  Manual scenarios stay in `scenarios.md` for a human (or `/qa-run`) to check.

## Every test

- Makes at least one assertion: an `expect`, or a page-object `expect…` method.
- Awaits every Playwright call.
- Has no conditionals on UI state (`if`, ternaries). The test created its state, so it knows it.
- Comments only where the *why* isn't obvious, in the suite's style: *"The copy is blocked client-side: an error
  toast shows and the picker stays open."*
- A scenario that can't be made green is committed as `test.fixme('RA-S03: <why>', …)`. It is never skipped and
  never deleted.

## Checks

Run these on the files you wrote or changed:

```bash
npm run e2e:typecheck                                    # whole e2e/ — clean today, keep it that way
npm run e2e:ai:lint -- e2e/sessions/<feature>.spec.ts    # the rules above that a linter can check
npx playwright test e2e/sessions/<feature>.spec.ts --project=webkit
```

`e2e:ai:lint` lints whole files. When you change an existing page object, what matters is that you add **no new**
violations. The existing ones are known debt.

## AI pipeline environment

`E2E_AI=1` switches Playwright into pipeline mode (see `playwright.config.ts`):
- It signs in as the pipeline's own admin, the account right after the CI shards' pool of 5 (index 5, same
  `E2E_ADMIN_EMAIL_PATTERN`), and only that one.
- It runs on a single worker.
- It enables the `ai` project, which runs `e2e/ai/seed.spec.ts`.

Playwright's test MCP server (`e2e/ai/mcp.json`) starts every generated or healed scenario from that seed:
project `ai`, seed file `e2e/ai/seed.spec.ts`.

`e2e/ai/agents/` holds Playwright's own healer and generator agent definitions. Refresh them after every
`@playwright/test` upgrade with `npm run e2e:ai:sync-agents`.
