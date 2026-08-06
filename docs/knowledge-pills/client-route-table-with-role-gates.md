# Client Route Table with Role Gates

**When to load:** Looking up which React component handles a specific client-side URL path, or which user roles are required to access a given route.

## Quick Summary

The cias-web SPA defines its full route table inside a single `<Switch>` in `app/containers/App/index.js`. Every route is rendered through the `AppRoute` wrapper, which enforces three access modes: public (no gate), `unauthorizedUsersOnly` (logged-out users only), and `protectedRoute` with an explicit `allowedRoles` array. Role wire-strings come from the `Roles` enum; two pre-built arrays — `PasswordAuthenticatedRoles` and `AuthenticatedRoles` — cover broad authenticated access.

**Answers questions like:**
- What component renders when a user visits `/interventions/:id/sessions/:id/edit`?
- Which roles can access the admin console?
- Is the session fill page protected?
- What is the difference between routes that use `AuthenticatedRoles` vs `PasswordAuthenticatedRoles`?

**Common scenarios:** adding a new route, debugging an access-denied redirect, checking whether a page is reachable by a specific role, understanding the full list of public (unauthenticated) pages.

---

## Role Constants _(src: app/models/User/RolesManager/UserRoles.ts)_

| Constant | Wire string |
|---|---|
| `Roles.Admin` | `admin` |
| `Roles.TeamAdmin` | `team_admin` |
| `Roles.Researcher` | `researcher` |
| `Roles.Participant` | `participant` |
| `Roles.Guest` | `guest` |
| `Roles.ThirdParty` | `third_party` |
| `Roles.OrganizationAdmin` | `organization_admin` |
| `Roles.EInterventionAdmin` | `e_intervention_admin` |
| `Roles.HealthSystemAdmin` | `health_system_admin` |
| `Roles.ClinicAdmin` | `health_clinic_admin` |
| `Roles.Navigator` | `navigator` |
| `Roles.PredefinedParticipant` | `predefined_participant` |

**`PasswordAuthenticatedRoles`** — all roles except `guest` and `predefined_participant`.

**`AuthenticatedRoles`** — `PasswordAuthenticatedRoles` plus `predefined_participant` (all non-guest roles).

---

## Public Routes (no authentication required) _(src: app/containers/App/index.js)_

| Path | Handler component | Notes |
|---|---|---|
| `/logout` | `Logout` | Clears session |
| `/interventions/:interventionId/sessions/:sessionId/fill` | `AnswerSessionPage` | Participant session fill — open to anonymous |
| `/user_interventions/:userInterventionId` | `UserInterventionPage` | Participant entry point |
| `/interventions/:interventionId/invite` | `UserInterventionInvitePage` | Intervention invite landing |
| `/accessibility-statement` | `AccessibilityStatementPage` | Static content |
| `/no-access` | `ForbiddenPage` | 403 landing |
| `/int/:slug` | `VerifyShortLinkPage` | Short-link resolver |
| `/link/:slug` | `VerifySmsLinkPage` | SMS link click handler |
| `/user_sms_link` | `UserSmsLinkPage` | SMS link display |
| `/usr/:userKey` | `VerifyUserKeyPage` | User-key verification |
| `/not-found-page` | `NotFoundPage` | 404 landing |
| `/not-available` | `InterventionNotAvailablePage` | Unavailable intervention |
| `/session-completed` | `SessionCompletedPage` | Post-fill completion screen |
| `*` (catch-all) | Redirect → `/not-found-page` | Wildcard fallback |

---

## Logged-Out Only Routes _(src: app/containers/App/index.js)_

These routes use `unauthorizedUsersOnly`; authenticated users are redirected away.

| Path | Handler component |
|---|---|
| `/login` | `LoginPage` |
| `/register` | `RegisterPage` |
| `/reset-password` | `ResetPasswordPage` |
| `/set-new-password` | `SetNewPasswordPage` |

---

## Protected Routes — All Authenticated Users _(src: app/containers/App/index.js)_

| Path | Handler | `allowedRoles` |
|---|---|---|
| `/` | `renderDashboardByRole` (role-aware render fn) | `AuthenticatedRoles` (all except guest) |
| `/profile` | `AccountSettings` | `PasswordAuthenticatedRoles` (excludes predefined_participant) |

---

## Protected Routes — Researcher / Admin _(src: app/containers/App/index.js)_

| Path | Handler | `allowedRoles` |
|---|---|---|
| `/interventions/:interventionId` | `InterventionDetailsPage` | `admin`, `researcher` |
| `/interventions/:interventionId/sessions/:sessionId/edit` | `EditSessionPage` | `admin`, `researcher` |
| `/interventions/:interventionId/sessions/:sessionId/settings` | `SettingsSessionPage` | `admin`, `researcher` |
| `/interventions/:interventionId/sessions/:sessionId/report-templates` | `ReportTemplatesPage` | `admin`, `researcher` |
| `/interventions/:interventionId/sessions/:sessionId/generated-reports` | `GeneratedReportsPage` | `admin`, `researcher` |
| `/interventions/:interventionId/sessions/:sessionId/sms-messaging` | `TextMessagesPage` | `admin`, `researcher` |
| `/interventions/:interventionId/sessions/:sessionId/map` | `SessionMapPage` | `admin`, `researcher` |
| `/interventions/:interventionId/sessions/:sessionId/preview` | `AnswerSessionPage (isPreview)` | `admin`, `researcher` |
| `/interventions/:interventionId/sessions/:sessionId/preview/:index` | `AnswerSessionPage (isPreview)` | `admin`, `researcher` |
| `/users` | `renderUserListByRole` (role-aware render fn) | `admin`, `researcher` |

---

## Protected Routes — Admin / Team Admin _(src: app/containers/App/index.js)_

| Path | Handler | `allowedRoles` |
|---|---|---|
| `/teams` | `TeamsListPage` | `admin`, `team_admin` |
| `/teams/:teamId` | `TeamDetails` | `admin`, `team_admin` |
| `/users/:userId` | `UserDetails` | `admin`, `team_admin` |

---

## Protected Routes — Admin / E-Intervention Admin _(src: app/containers/App/index.js)_

| Path | Handler | `allowedRoles` |
|---|---|---|
| `/organization/:organizationId` | `ReportingDashboardPage` (MANAGE_ORGANIZATIONS view) | `admin`, `e_intervention_admin` |
| `/organization/:organizationId/dashboard-setup` | `ReportingDashboardPage` (DASHBOARD_SETUP view) | `admin`, `e_intervention_admin` |

---

## Protected Routes — Reporting Dashboard (Broader Org Roles) _(src: app/containers/App/index.js)_

| Path | Handler | `allowedRoles` |
|---|---|---|
| `/organization/:organizationId/dashboard` | `ReportingDashboardPage` (DASHBOARD_VIEW view) | `admin`, `e_intervention_admin`, `organization_admin`, `health_clinic_admin` |

---

## Protected Routes — Single-Role Gates _(src: app/containers/App/index.js)_

| Path | Handler | `allowedRoles` |
|---|---|---|
| `/live-chat` | `InboxPage` | `navigator` only |
| `/live-chat/archive` | `ArchivePage` | `navigator` only |
| `/reports` | `ParticipantReportsPage` | `participant` only |
| `/admin-console` | `SuperadminConsolePage` | `admin` only |

---

## Path Constants _(src: app/global/constants/router.ts)_

All path strings used in `AppRoute` declarations are sourced from the `RoutePath` enum; the enum member names map directly to the paths shown above. A wildcard path constant handles the catch-all redirect.
