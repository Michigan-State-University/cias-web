# E2E scenarios — [CIAS-4187] Test participants on live dashboards

Source: https://github.com/Michigan-State-University/cias-web/pull/416 · Ticket: CIAS30-4187

The change adds a "Test participants" tab to the participant inviter that mints a short-lived test link
(`POST /v1/interventions/:id/test_link`, 201), and a `TestLinkTokenGate` that verifies the token
(`POST /v1/test_link_tokens/verify`, 200) **before** the fill page or the invite page mounts — only an explicit
`valid` lets the page through, everything else replaces it with expired / invalid / unavailable copy, and a fill
whose marker the server refuses is blocked outright. These scenarios cover the new tab and its gating, minting
and its toast, all four gate verdicts, the token's intervention scoping and reload behaviour, and the refactor of
`CopyLinkForm` onto the shared `InviteUrlFormProvider`. They deliberately do **not** cover the participant side
end to end: the backend only marks **guest** users (`V1::TestRuns::MarkGuest#markable?`), so the marked fill, the
`TestRunBanner` and the 24-hour purge are manual scenarios.

Pills used: none — `pills-index.md` lists no pills for this repo at this commit, so expected behaviour is grounded
in the diff, the checkout source and the paired `cias-api` sources in `paired-api.patch`.

## Decisions

- **How does a spec get hold of a real test-link token, given the button writes it to the clipboard?** → Read it
  from the mint response body (`data.attributes.token` of `POST /v1/interventions/:id/test_link`) with
  `waitForApiResponse`, as `question-create.spec.ts:27-29` already does for a session id. Clipboard reads need
  permissions WebKit does not grant headlessly, and the copy itself is asserted through the toast instead.
  Alternatives: read `navigator.clipboard.readText()` / mint through a direct API request outside the browser.
- **How do we exercise the gate verdicts staging will not produce on demand (`expired`, unreachable)?** → Intercept
  `**/v1/test_link_tokens/verify` with `page.route` — `route.fulfill` a 200 `{"status":"expired"}` body for the
  expired branch and `route.abort()` for the unavailable branch. A real expiry needs the server's 15-minute TTL
  (`V1::TestRuns::LinkToken::DEFAULT_TTL_MINUTES`), which CONVENTIONS → What can be automated rules out as "real
  waiting"; the `invalid` verdict is left un-stubbed because a garbage token produces it for real. Alternatives:
  leave both manual / set `TEST_LINK_TOKEN_TTL_MINUTES` on staging.
- **Do we automate the marker-refusal block, given the harness can only drive a signed-in admin?** → Yes. An admin
  is not a guest, so `MarkGuest` refuses, `meta.test_run` comes back `false` with a token sent, and the gate shows
  the marker-failed page — the same code path a link that expires between landing and "Start session" takes. The
  scenario states that it reaches the path by role rather than by expiry; the expiry cause stays manual (TL-S13).
  Alternatives: leave the whole marker-refusal behaviour manual.
- **How are the two new mint buttons located, when `CopyTestLinkButton` has no `data-cy`?** → By
  `getByRole('button', { name })` with the `defaultMessage` copy ("Copy test link to this session" / "…to this
  intervention"), which is locator preference 2 in CONVENTIONS. Adding a `data-cy` would mean threading a new prop
  through `TextButton`'s `buttonProps`, and it would vanish anyway while the button is in its `loading` state.
  Alternatives: add `data-cy="copy-session-test-link-button"` to `CopyTestLinkButton.tsx`.
- **How is the tab strip addressed, since `Tabs` renders labels as plain divs?** → Scope `getByText(label, { exact:
  true })` to `[data-cy="tabs"]` (`app/components/Tabs/index.js:38`). A hidden tab is not rendered at all
  (`app/components/Tabs/index.js:48`), so absence is asserted with `toHaveCount(0)`. Alternatives: `.nth()` on the
  tab row / add a `data-cy` to `Tabs`.

### TL-S01 — The participant inviter offers a "Test participants" tab whose controls replace the e-mail copy-link form
- automation: spec
- priority: P0
- covers: `ParticipantListView.tsx:60-61` (`showTestLinkTab`), `:129` (the new tab), `:140-141` (the copy-link form is now tied to the e-mail tab); `TestLinkTab.tsx`
- grounded-in: `app/containers/InterventionDetailsPage/containers/ParticipantInviter/ParticipantListView.tsx:60-61,129,140-141`, `app/containers/InterventionDetailsPage/containers/ParticipantInviter/TestLinkTab.tsx`, `app/containers/InterventionDetailsPage/containers/ParticipantInviter/messages.ts:64` and the new `copySessionTestLinkButtonTitle` / `copyTestLinkHint` entries, `app/containers/InterventionDetailsPage/containers/ParticipantInviter/InviteParticipantsModalContent.tsx:190-191`, `app/models/Status/statusPermissions.js:9` (a DRAFT intervention may copy invitation links)
- preconditions: a fresh draft intervention (default, non-modular type) created by the test, with one classic session.
- steps:
  1. `DashboardPage.goto()`, `DashboardPage.createIntervention()`, keep the id from `DashboardPage.getInterventionIdFromUrl()`, then `InterventionPage.createSession('classic')` → the intervention page lists one session (`[data-cy="enter-session-0"]` visible).
  2. Click the header's "Invite Participants" button → the modal opens and `[data-cy="tabs"]` shows the tabs "E-mail participants", "Predefined participants" and "Test participants".
  3. With the default "E-mail participants" tab active → the e-mail copy-link control "Copy URL link to this session" is visible.
  4. Click the "Test participants" tab inside `[data-cy="tabs"]` → the button "Copy test link to this session" is visible, the session picker (`#sessionOption`) is visible, and the hint "A test link marks the participant it creates as test data; their fill is deleted automatically about 24 hours later, together with its contribution to the relevant charts. Open it in a private or incognito window and complete the fill in that tab." is visible.
  5. Assert on the same screen → the e-mail tab's "Copy URL link to this session" control has count 0, and "Copy test link to this intervention" has count 0 (a non-modular intervention gets the session control only).
- page-objects: `DashboardPage.goto`, `DashboardPage.createIntervention`, `DashboardPage.getInterventionIdFromUrl`, `InterventionPage.createSession` — add `ParticipantInviterPage` (new page object for the inviter modal, exported from `e2e/pages/index.ts`) with `open()` and `openTab(label)`

### TL-S02 — Copying a session test link mints a token and reports when it expires
- automation: spec
- priority: P0
- covers: `CopyTestLinkButton.tsx` (`handleClick`, `announceCopied`), `app/global/reducers/intervention/sagas/generateTestLink.ts`, `InviteUrlFormProvider.tsx` (`sessionLinkDisabled`)
- grounded-in: `app/containers/InterventionDetailsPage/containers/ParticipantInviter/CopyTestLinkButton.tsx`, `app/global/reducers/intervention/sagas/generateTestLink.ts`, `app/containers/InterventionDetailsPage/containers/ParticipantInviter/InviteUrlFormProvider.tsx`, `app/containers/InterventionDetailsPage/containers/ParticipantInviter/messages.ts` (`copyTestLinkSuccess`), `app/components/FormikSelect/index.js:57` (the select's `inputId` is the formik key), cias-api `V1::InterventionsController#test_link` → 201 with `data.attributes.token` / `expires_at` (paired-api.patch)
- preconditions: the state TL-S01 builds — a draft, non-modular intervention with one classic session, inviter modal open on the "Test participants" tab.
- steps:
  1. Before touching the session picker → the button "Copy test link to this session" is disabled.
  2. Click `#sessionOption` and click the first `[role="option"]` in the portalled menu → the picker shows the session's name and the button "Copy test link to this session" is enabled.
  3. Register `waitForApiResponse(page, { urlIncludes: '/test_link', method: 'POST', status: 201 })`, then click "Copy test link to this session" → the response arrives with 201 and its JSON body carries a non-empty `data.attributes.token` and an ISO `data.attributes.expires_at`.
  4. Assert on the modal → a toast matching `/^Test link copied\. It works until .+\. Open it in a private\/incognito window\.$/` is visible. (The 1-second "Copied!" popup is deliberately not asserted.)
- page-objects: `DashboardPage.goto`, `DashboardPage.createIntervention`, `InterventionPage.createSession` — add `ParticipantInviterPage.open`, `ParticipantInviterPage.openTab`, `ParticipantInviterPage.selectFirstSession`, `ParticipantInviterPage.copySessionTestLink` (returns the parsed token and `expires_at` from the mint response)

### TL-S03 — A modular intervention also offers an intervention-level test link, mintable without picking a session
- automation: spec
- priority: P1
- covers: `TestLinkTab.tsx` `renderInterventionControl`, `InviteUrlFormProvider.tsx` (`interventionLinkDisabled` is weaker than the session one)
- grounded-in: `app/containers/InterventionDetailsPage/containers/ParticipantInviter/TestLinkTab.tsx`, `app/containers/InterventionDetailsPage/containers/ParticipantInviter/InviteUrlFormProvider.tsx`, `app/containers/InterventionDetailsPage/containers/ParticipantInviter/messages.ts` (`copyInterventionTestLinkButtonTitle`), `app/containers/InterventionDetailsPage/containers/ParticipantInviter/InviteParticipantsModalContent.tsx:69` (modular = any type other than the default)
- preconditions: a fresh draft intervention switched to the Fixed-order (modular) type, with one classic session.
- steps:
  1. `DashboardPage.goto()`, `DashboardPage.createIntervention()`, `InterventionPage.changeInterventionType(InterventionType.FIXED)` → the PATCH `/interventions/` returns 200.
  2. `InterventionPage.createSession('classic')`, open the inviter and its "Test participants" tab → both "Copy test link to this intervention" and "Copy test link to this session" are visible; "Copy test link to this intervention" is enabled while no session is picked, "Copy test link to this session" is disabled.
  3. Register `waitForApiResponse(page, { urlIncludes: '/test_link', method: 'POST', status: 201 })`, click "Copy test link to this intervention" → the response arrives with 201 and a toast matching `/^Test link copied\. It works until .+\. Open it in a private\/incognito window\.$/` is visible.
- page-objects: `DashboardPage.goto`, `DashboardPage.createIntervention`, `InterventionPage.changeInterventionType`, `InterventionPage.createSession` — add `ParticipantInviterPage.open`, `ParticipantInviterPage.openTab`, `ParticipantInviterPage.copyInterventionTestLink`

### TL-S04 — An unrecognised test-link token blocks the fill page before it mounts and is scrubbed from the URL
- automation: spec
- priority: P0
- covers: `TestLinkTokenGate/index.tsx` (`blockedCopy` default branch, the "gate before children" rule), `app/utils/testLinkToken.ts` (`captureTestLinkTokenFromUrl` + `replaceState`), `app/containers/App/index.js:417-418`
- grounded-in: `app/containers/TestLinkTokenGate/index.tsx`, `app/containers/TestLinkTokenGate/messages.ts` (`invalidHeader`, `invalidText`), `app/utils/testLinkToken.ts`, `app/containers/App/index.js:417-418`, cias-api `V1::TestRuns::LinkTokensController#verify` → 200 `{"status":"invalid"}` for a token that is not a valid message (paired-api.patch)
- preconditions: a published intervention shared with "Anyone with the link", with one classic session that has one single-answer screen; the test keeps the intervention id and the session id from the `POST /sessions` response.
- steps:
  1. Create the intervention and session, add one screen (`[data-cy="add-screen-button"]` → `[data-cy="question-type-single"]`, `POST /question_groups` → 201), `InterventionPage.changeAccessSettings(InterventionAccessType.ANYONE)`, `InterventionPage.publishIntervention()` → `InterventionPage.getInterventionStatus()` contains "published".
  2. Register `waitForApiResponse(page, { urlIncludes: '/test_link_tokens/verify', method: 'POST', status: 200 })` and go to `/interventions/<interventionId>/sessions/<sessionId>/fill?test_link_token=not-a-real-token` → the verify response arrives with 200 and its JSON body has `status: "invalid"`.
  3. Assert on the blocked page → the heading "This test link is not valid" is visible, the text "The link could not be recognised, so it cannot be used for a test run. No session was started from this link. Copy a fresh test link from the intervention and open it straight away." is visible, and `[data-cy="start-preview-button"]` has count 0 (the fill page never mounted, so no session can be created).
  4. Assert the URL → it no longer contains `test_link_token` (the capture strips the param through `history.replaceState`).
- page-objects: `DashboardPage.goto`, `DashboardPage.createIntervention`, `DashboardPage.getInterventionIdFromUrl`, `InterventionPage.createSession`, `InterventionPage.changeAccessSettings`, `InterventionPage.publishIntervention`, `InterventionPage.getInterventionStatus` — add `SessionFillPage` (new page object for the fill route) with `gotoFill(interventionId, sessionId, token?)` and `expectBlocked(header, text)`

### TL-S05 — A freshly minted token passes the gate and the landing page carries the test-run notice
- automation: spec
- priority: P0
- covers: `TestLinkTokenGate/index.tsx` (`VALID` branch, `showNotice && !serverHasRuled`, `data-cy="test-link-notice"`), `app/utils/testLinkToken.ts` (`captureTestLinkTokenFromUrl`)
- grounded-in: `app/containers/TestLinkTokenGate/index.tsx`, `app/containers/TestLinkTokenGate/messages.ts` (`testLinkNotice`), `app/containers/AnswerSessionPage/index.js:1043` (the landing button), `app/containers/AnswerSessionPage/messages.js:74-77` ("Start session"), cias-api `V1::TestRuns::LinkToken.inspect_token` → `valid` for a freshly minted token (paired-api.patch)
- preconditions: as TL-S04 — a published "Anyone with the link" intervention with one classic session holding one screen — plus a token minted through the inviter as in TL-S02.
- steps:
  1. Build the published intervention and session, open the inviter's "Test participants" tab, pick the session and mint → `POST /interventions/<id>/test_link` returns 201; keep `data.attributes.token`.
  2. Register `waitForApiResponse(page, { urlIncludes: '/test_link_tokens/verify', method: 'POST', status: 200 })` and go to `/interventions/<interventionId>/sessions/<sessionId>/fill?test_link_token=<token>` → the verify response arrives with 200 and `status: "valid"`.
  3. Assert on the landing page → `[data-cy="test-link-notice"]` is visible and reads "This is a test run. The data recorded here is marked as test data and will be deleted automatically 24 hours from now.", and `[data-cy="start-preview-button"]` is visible with the text "Start session" (the page underneath mounted).
  4. Assert the URL → it no longer contains `test_link_token`.
- page-objects: `DashboardPage.goto`, `DashboardPage.createIntervention`, `InterventionPage.createSession`, `InterventionPage.changeAccessSettings`, `InterventionPage.publishIntervention` — add `ParticipantInviterPage.copySessionTestLink`, `SessionFillPage.gotoFill`

### TL-S06 — A fill the server refuses to mark as a test run is blocked, not merely warned about
- automation: spec
- priority: P0
- covers: `AnswerSessionPage/saga.js` `createUserSession` (`testLinkTokenSent` + `setTestRunFill`), `AnswerSessionPage/reducer.js` (`testRunMarkerFailed`), `TestLinkTokenGate/index.tsx` (`markerRefused`)
- grounded-in: `app/containers/AnswerSessionPage/saga.js` (`createUserSession`), `app/containers/AnswerSessionPage/reducer.js` (`SET_TEST_RUN_FILL`), `app/containers/AnswerSessionPage/selectors.js` (`makeSelectTestRunMarkerFailed`), `app/containers/TestLinkTokenGate/index.tsx`, `app/containers/TestLinkTokenGate/messages.ts` (`markerFailedHeader`, `markerFailedText`), `app/containers/AnswerSessionPage/index.js:853-863` (Start session creates the user session), cias-api `V1::TestRuns::MarkGuest#markable?` — only a `guest` user is markable, so the signed-in admin the harness drives is refused and `meta.test_run` comes back `false` (paired-api.patch). The scenario therefore reaches the refusal path by role; the expiry cause is covered manually by TL-S13.
- preconditions: the state TL-S05 ends in — the landing page of a published "Anyone with the link" session, reached with a valid token, notice showing, signed in as the suite's admin.
- steps:
  1. Register `waitForApiResponse(page, { urlIncludes: '/v1/user_sessions', method: 'POST', status: 200 })` and click `[data-cy="start-preview-button"]` ("Start session") → the response arrives with 200 and its JSON `meta.test_run` is `false`.
  2. Assert on the resulting screen → the heading "This test link is no longer valid" is visible and the text "It most likely expired before the session started, so this fill would be recorded as a real participant and could not be deleted afterwards. Copy a fresh test link from the intervention and open it straight away." is visible.
  3. Assert the same screen → `[data-cy="test-link-notice"]` has count 0, `[data-cy="test-run-banner"]` has count 0 and `[data-cy="continue-button"]` has count 0 (the fill is blocked, leaving only the empty session shell).
- page-objects: as TL-S05 — add `SessionFillPage.startSession`, `SessionFillPage.expectBlocked`

### TL-S07 — The captured token survives a reload of its own intervention and never applies to another one
- automation: spec
- priority: P1
- covers: `app/utils/testLinkToken.ts` (`storeToken` / `storeInterventionId` / `testLinkTokenAppliesTo`), `app/utils/history.js` (capture before `createBrowserHistory()`)
- grounded-in: `app/utils/testLinkToken.ts`, `app/utils/history.js`, `app/containers/TestLinkTokenGate/index.tsx` (`testLinkTokenAppliesTo(interventionId) ? getTestLinkToken() : null`)
- preconditions: two published "Anyone with the link" interventions, A and B, each created by the test with one classic session holding one screen; a token minted on A.
- steps:
  1. Build intervention A with its session, mint a session test link on A and go to `/interventions/<A>/sessions/<sessionA>/fill?test_link_token=<token>` → `[data-cy="test-link-notice"]` is visible.
  2. Reload `/interventions/<A>/sessions/<sessionA>/fill` (no token in the URL this time) → `POST /v1/test_link_tokens/verify` answers 200 `valid` again and `[data-cy="test-link-notice"]` is visible — the token was mirrored into `sessionStorage` under intervention A.
  3. Build intervention B the same way, then go to `/interventions/<B>/sessions/<sessionB>/fill` in the same tab → `[data-cy="test-link-notice"]` has count 0 and `[data-cy="start-preview-button"]` is visible with the text "Start session": A's token does not reach B's fill.
- page-objects: `DashboardPage.goto`, `DashboardPage.createIntervention`, `DashboardPage.getInterventionIdFromUrl`, `InterventionPage.createSession`, `InterventionPage.changeAccessSettings`, `InterventionPage.publishIntervention` — add `ParticipantInviterPage.copySessionTestLink`, `SessionFillPage.gotoFill`

### TL-S08 — A verification the app cannot reach blocks the page and stands the spinner down
- automation: spec
- priority: P1
- covers: `TestLinkTokenGate/index.tsx` (`PENDING` spinner → `verdict`, `UNAVAILABLE` branch), `app/global/reducers/testLinkToken/sagas/verifyTestLinkToken.ts` (`catch` → `verifyTestLinkTokenError`), `app/global/reducers/testLinkToken/reducer.ts`
- grounded-in: `app/containers/TestLinkTokenGate/index.tsx`, `app/containers/TestLinkTokenGate/messages.ts` (`unavailableHeader`, `unavailableText`), `app/global/reducers/testLinkToken/sagas/verifyTestLinkToken.ts`, `app/global/reducers/testLinkToken/reducer.ts`
- preconditions: a published "Anyone with the link" intervention with one classic session holding one screen; a token minted on it. Per the decision above, `page.route('**/v1/test_link_tokens/verify', (route) => route.abort())` is installed before navigating.
- steps:
  1. Build the intervention and mint a session test link, then install the aborting route.
  2. Go to `/interventions/<interventionId>/sessions/<sessionId>/fill?test_link_token=<token>` → the heading "We could not check this test link" is visible and the text "No session was started from this link. Reload the page to try again." is visible (the pending spinner has stood down).
  3. Assert the same screen → `[data-cy="start-preview-button"]` has count 0 and `[data-cy="test-link-notice"]` has count 0: an unreachable check blocks exactly like an invalid token.
- page-objects: as TL-S07 — add `SessionFillPage.gotoFill`, `SessionFillPage.expectBlocked`

### TL-S09 — An expired verdict blocks the page with its own copy
- automation: spec
- priority: P1
- covers: `TestLinkTokenGate/index.tsx` (`blockedCopy` → `EXPIRED`), `app/models/TestLinkToken/index.ts`
- grounded-in: `app/containers/TestLinkTokenGate/index.tsx`, `app/containers/TestLinkTokenGate/messages.ts` (`expiredHeader`, `expiredText`), `app/models/TestLinkToken/index.ts`, `app/global/reducers/testLinkToken/sagas/verifyTestLinkToken.ts` (`VERIFIED_STATUSES`), cias-api `V1::TestRuns::LinkToken.inspect_token` → `:expired` once the 15-minute TTL has passed (paired-api.patch)
- preconditions: a published "Anyone with the link" intervention with one classic session holding one screen; a token minted on it. Per the decision above, `page.route('**/v1/test_link_tokens/verify', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: 'expired', valid: false, intervention_id: interventionId }) }))` is installed before navigating — staging's real TTL cannot be reached without real waiting.
- steps:
  1. Build the intervention and mint a session test link, then install the fulfilling route.
  2. Go to `/interventions/<interventionId>/sessions/<sessionId>/fill?test_link_token=<token>` → the heading "This test link has expired" is visible and the text "Test links are short-lived. No session was started from this link. Copy a fresh test link from the intervention and open it straight away." is visible.
  3. Assert the same screen → `[data-cy="start-preview-button"]` has count 0: no session is started from an expired link.
- page-objects: as TL-S08 — add `SessionFillPage.gotoFill`, `SessionFillPage.expectBlocked`

### TL-S10 — A status that forbids copying invitation links hides the "Test participants" tab
- automation: spec
- priority: P1
- covers: `ParticipantListView.tsx:60-61` (`showTestLinkTab = copyingInvitationLinkPossible && canMintTestLink`), `:129` (`hidden`)
- grounded-in: `app/containers/InterventionDetailsPage/containers/ParticipantInviter/ParticipantListView.tsx:60-61,129`, `app/models/Status/statusPermissions.js:9,59` (only DRAFT, PUBLISHED and PAUSED may copy invitation links), `app/containers/InterventionDetailsPage/containers/ParticipantInviter/InviteParticipantsModalContent.tsx:190-191`, `app/components/Tabs/index.js:48` (a hidden tab is not rendered)
- preconditions: a fresh intervention with one classic session, published and then closed by the test.
- steps:
  1. `DashboardPage.goto()`, `DashboardPage.createIntervention()`, `InterventionPage.createSession('classic')`, open the inviter → `[data-cy="tabs"]` contains "Test participants".
  2. Close the modal (press Escape), `InterventionPage.publishIntervention()` then `InterventionPage.closeIntervention()` → `InterventionPage.getInterventionStatus()` contains "closed".
  3. Reopen the inviter → inside `[data-cy="tabs"]`, "Test participants" has count 0 while "E-mail participants" and "Predefined participants" are visible, and the e-mail tab's "Copy URL link to this session" control has count 0.
- page-objects: `DashboardPage.goto`, `DashboardPage.createIntervention`, `InterventionPage.createSession`, `InterventionPage.publishIntervention`, `InterventionPage.closeIntervention`, `InterventionPage.getInterventionStatus` — add `ParticipantInviterPage.open`, `ParticipantInviterPage.close`

### TL-S11 — The refactored e-mail copy-link form still gates its control on the session pick
- automation: spec
- priority: P1
- covers: regression from moving `CopyLinkForm` onto `InviteUrlFormProvider` — `CopyLinkForm.tsx` `renderSessionControl`, `InviteUrlFormProvider.tsx` (`sessionActionDisabled` / `sessionLinkDisabled`)
- grounded-in: `app/containers/InterventionDetailsPage/containers/ParticipantInviter/CopyLinkForm.tsx`, `app/containers/InterventionDetailsPage/containers/ParticipantInviter/InviteUrlFormProvider.tsx`, `app/containers/InterventionDetailsPage/containers/ParticipantInviter/messages.ts:31-35` (`copyLinkButtonTitle` renders as "Copy URL link to this session" for a non-modular intervention), `app/components/CopyToClipboard/index.js:46-53,76-83` (the control is a clickable `Box`, not a `button`: it shows the "Copied!" popup for one second and does nothing at all while `buttonDisabled`), `app/components/CopyToClipboard/messages.js:6-9`
- preconditions: a fresh draft intervention (non-modular) with one classic session; the inviter modal open on the default "E-mail participants" tab.
- steps:
  1. Open the inviter on the "E-mail participants" tab → the control "Copy URL link to this session" is visible and the session picker `#sessionOption` is visible.
  2. Click "Copy URL link to this session" before picking a session → the "Copied!" popup has count 0 (the control is inert while `values.sessionOption` is empty).
  3. Click `#sessionOption` and click the first `[role="option"]` → the picker shows the session's name.
  4. Click "Copy URL link to this session" and assert immediately → the "Copied!" popup is visible (it is cleared after one second, so assert without any intervening step); the refactored form still wires the picked session through the new provider.
- page-objects: `DashboardPage.goto`, `DashboardPage.createIntervention`, `InterventionPage.createSession` — add `ParticipantInviterPage.open`, `ParticipantInviterPage.selectFirstSession`

### TL-S12 — A guest who opens a test link is marked as a test participant for the whole fill
- automation: manual — needs a participant (guest) session in a private window; only `guest` users are markable (`V1::TestRuns::MarkGuest#markable?`), so the suite's signed-in admin can never reach this path, and the purge is an out-of-band background job.
- priority: P0
- covers: `AnswerSessionPage/components/TestRunBanner.tsx`, `AnswerSessionPage/saga.js` (`setTestRunFill` from `meta.test_run`), `TestLinkTokenGate/index.tsx` (`serverHasRuled` stands the notice down)
- grounded-in: `app/containers/AnswerSessionPage/components/TestRunBanner.tsx`, `app/containers/AnswerSessionPage/messages.js` (`testRunBanner`), `app/containers/AnswerSessionPage/saga.js`, `app/containers/TestLinkTokenGate/index.tsx`, cias-api `V1::TestRuns::MarkGuest`, `TestParticipants::PurgeTestParticipantsJob::RETENTION_WINDOW` = 24 hours (paired-api.patch)
- preconditions: a published "Anyone with the link" intervention with one classic session holding at least one screen; a test link copied from its "Test participants" tab less than 15 minutes earlier.
- steps:
  1. Paste the copied test link into a **private/incognito window** (not signed in) → the landing page shows `[data-cy="test-link-notice"]` with "This is a test run. The data recorded here is marked as test data and will be deleted automatically 24 hours from now." and a "Start session" button.
  2. Click "Start session" → `POST /v1/user_sessions` answers 200 with `meta.test_run: true`, the notice is replaced by `[data-cy="test-run-banner"]` carrying the same sentence, and the first screen of the session is shown.
  3. Answer every screen to the end of the session → the banner stays visible on each screen and the fill finishes normally.
  4. In the researcher's window, open the intervention's charts/dashboard → the fill is counted like any other.
  5. About 24 hours later, reload the same dashboard → the fill and its contribution to the charts are gone (`V1::Intervention::TestParticipants::PurgeService`), and the intervention's other data is untouched.
- page-objects: none

### TL-S13 — A test link that expires between landing and "Start session" blocks the guest's fill outright
- automation: manual — needs a guest participant and a real 15-minute wait for `V1::TestRuns::LinkToken`'s TTL; CONVENTIONS → What can be automated rules both out.
- priority: P1
- covers: `AnswerSessionPage/saga.js` (`hasTestLinkToken()` read before the request), `AnswerSessionPage/reducer.js` (`testRunMarkerFailed`), `TestLinkTokenGate/index.tsx` (`markerRefused`)
- grounded-in: `app/containers/AnswerSessionPage/saga.js`, `app/containers/AnswerSessionPage/reducer.js`, `app/containers/TestLinkTokenGate/index.tsx`, `app/containers/TestLinkTokenGate/messages.ts` (`markerFailedHeader`, `markerFailedText`), cias-api `V1::TestRuns::LinkToken::DEFAULT_TTL_MINUTES` = 15 (paired-api.patch)
- preconditions: a published "Anyone with the link" intervention with one classic session holding at least one screen; a freshly copied test link.
- steps:
  1. Open the test link in a private/incognito window and stop on the landing page → `[data-cy="test-link-notice"]` is visible and the "Start session" button is enabled.
  2. Wait on that page for more than 15 minutes without reloading → the notice is still shown (the gate verified the link when the page loaded).
  3. Click "Start session" → `POST /v1/user_sessions` answers 200 with `meta.test_run: false`, and the page is replaced by "This test link is no longer valid" with the text "It most likely expired before the session started, so this fill would be recorded as a real participant and could not be deleted afterwards. Copy a fresh test link from the intervention and open it straight away."
  4. Confirm there is no way forward → no "Start session", "Continue" or skip control is offered, and the researcher's participant list shows no finished fill for this attempt (only an empty session shell may exist).
- page-objects: none

### TL-S14 — Logging out drops a captured test-link token
- automation: manual — signing out invalidates the worker's shared signed-in admin (the API rotates the access token on every request), so a spec cannot log out without breaking the rest of its worker's run.
- priority: P2
- covers: `app/global/reducers/auth/sagas/logOut.js` (`clearTestLinkToken`), `app/utils/localStorageService.js` (`clearUserData` → `clearTestLinkToken`), `app/utils/testLinkToken.ts` (`clearTestLinkToken`)
- grounded-in: `app/global/reducers/auth/sagas/logOut.js`, `app/utils/localStorageService.js`, `app/utils/testLinkToken.ts`
- preconditions: a published "Anyone with the link" intervention with one classic session; a freshly copied test link; a signed-in user in the same browser tab.
- steps:
  1. Open the test link in the tab → the landing page shows `[data-cy="test-link-notice"]`.
  2. Log out from the account menu → the app returns to the login screen.
  3. In the same tab, go back to `/interventions/<interventionId>/sessions/<sessionId>/fill` without any query parameter → no test-run notice is shown and the landing page renders normally; `sessionStorage` holds neither `cias.testLinkToken` nor `cias.testLinkTokenInterventionId`.
- page-objects: none
