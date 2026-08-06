# Redux Reducer Module Catalogue

**When to load:** Finding which Redux module owns a domain concept, action type, or piece of app state — before reading, writing, or tracing any Redux code.

## Quick Summary

The reducer modules present at scan time under `app/global/reducers/` cover every Redux domain in the SPA: intervention/session authoring, question editing, SMS plans, live chat, org hierarchy, reporting, admin utilities, and cross-cutting UI concerns. Legacy JS modules use an `actionBuilder` pattern; TypeScript modules use `typesafe-actions` with `createAction`. Each module owns its own `constants`, `actions`, `reducer`, `selectors`, and `sagas/` sub-tree.

**Answers questions like:**
- Which reducer handles live chat conversations and messages?
- Where are intervention collaboration / editor-lock actions defined?
- What module manages report templates or dashboard chart sections?
- Which module owns SMS plan variants and trackable SmsLinks?
- Where is authentication, logout, and current-user profile state kept?

**Common scenarios:** tracing a saga to its action creator, finding the right `loaders`/`errors` key for a feature, discovering which module to extend when adding a new capability.

---

## Intervention Authoring _(src: app/global/reducers/intervention/actions.js, app/global/reducers/interventions/actions.js, app/global/reducers/session/actions.js)_

| Reducer module | Responsibility | Representative actions |
|---|---|---|
| `intervention` | Single-intervention editor: sessions list, live editor lock, collaborators, access control, predefined participants, logos, translation | `fetchInterventionRequest`, `createSessionRequest`, `addCollaboratorsRequest`, `setCurrentEditor`, `onCollaboratorRemovedReceive` |
| `interventions` | Intervention list / dashboard: fetch all, copy, import, star/unstar, filters | `fetchInterventionsRequest`, `copyInterventionRequest`, `importInterventionRequest`, `starInterventionRequest` |
| `session` | Single session fetch and edit including narrator settings | `getSessionRequest`, `editSessionRequest`, `bulkEditSessionRequest`, `updateNarratorSuccess` |

## Question Editing _(src: app/global/reducers/questions/actions.js, app/global/reducers/questionGroups/actions.js)_

| Reducer module | Responsibility | Representative actions |
|---|---|---|
| `questions` | Question CRUD within a session: create, edit, copy, reorder, delete, type change, images, variables | `createQuestionRequest`, `editQuestionRequest`, `changeQuestionTypeRequest`, `reorderQuestionListRequest`, `addQuestionImageRequest` |
| `questionGroups` | Question-group CRUD: grouping, duplication, external sharing, reorder, settings | `groupQuestionsRequest`, `duplicateGroupsHereRequest`, `shareGroupsExternallyRequest`, `reorderGroupListRequest` |

## SMS Plans & TLFB _(src: app/global/reducers/textMessages/actions.js, app/global/reducers/tlfb/actions.ts)_

| Reducer module | Responsibility | Representative actions |
|---|---|---|
| `textMessages` | SMS plan editor: text messages, formula variants, attachments, phone numbers, trackable SmsLinks | `fetchTextMessagesRequest`, `createVariantRequest`, `createSmsLinkRequest`, `uploadTextMessageAttachmentRequest`, `cloneTextMessageRequest` |
| `tlfb` | Timeline Follow-Back calendar assessment: event definitions and per-day question answers | `addNewTlfbEventRequest`, `deleteEventRequest`, `addTlfbQuestionAnswerRequest`, `fetchCalendarDataRequest` |

## Live Chat & Notifications _(src: app/global/reducers/liveChat/actions.ts, app/global/reducers/notifications/actions.ts, app/global/reducers/chatWidget/actions.ts)_

| Reducer module | Responsibility | Representative actions |
|---|---|---|
| `liveChat` | Navigator ↔ participant chat: active/archived conversations, messages, read receipts, navigator call-out, transcripts, helping materials | `fetchActiveConversationsRequest`, `fetchConversationMessagesRequest`, `onMessageSentReceive`, `onConversationCreatedReceive`, `generateConversationTranscriptRequest` |
| `notifications` | System notification feed, largely WebSocket-driven | `onUnreadNotificationsFetchedReceive`, `onNewNotificationReceive`, `markNotificationReadLocally`, `setNavigatorAvailabilityLocally` |
| `chatWidget` | Live-chat widget visibility toggle | `setChatEnabled`, `setChatDisabled` |

## Navigator Setup _(src: app/global/reducers/navigatorSetup/actions.ts)_

| Reducer module | Responsibility | Representative actions |
|---|---|---|
| `navigatorSetup` | Navigator configuration per intervention: participant/navigator links and files, email invitations, script templates | `fetchNavigatorSetupRequest`, `addParticipantLinkRequest`, `inviteNavigatorsByEmailRequest`, `uploadFilledScriptTemplateRequest` |

## Organization & User Admin _(src: app/global/reducers/organizations/actions.js, app/global/reducers/userList/actions.js, app/global/reducers/user/actions.js, app/global/reducers/teamList/actions.js)_

| Reducer module | Responsibility | Representative actions |
|---|---|---|
| `organizations` | Organization / HealthSystem / HealthClinic hierarchy CRUD, admin invitations, dashboard view options | `fetchOrganizationsRequest`, `addHealthSystemRequest`, `addClinicRequest`, `inviteAdminRequest`, `fetchDashboardViewSelectOptionsRequest` |
| `userList` | Paginated user lists and researcher selectors | `fetchUsers`, `fetchResearchersRequest`, `deleteUserFromTeamRequest`, `setUsersItemsState` |
| `user` | Admin view/edit of a single other user account | `fetchUserRequest`, `editOtherUserRequest`, `changeActivateStatusRequest`, `resendInvitationLinkRequest` |
| `teamList` | Teams CRUD and team invitations | `fetchTeamsRequest`, `createTeamRequest`, `inviteToTeamRequest`, `deleteTeamRequest` |

## Authentication & Current User _(src: app/global/reducers/auth/constants.js, app/global/reducers/userIntervention/actions.ts)_

| Reducer module | Responsibility | Representative actions |
|---|---|---|
| `auth` | Login, guest login, logout, password/email/phone changes, SMS 2FA, short-link and sms-link verification, current-user profile | `loginRequest`, `logOut`, `logInGuest`, `changePasswordRequest`, `verifyShortLinkRequest`, `verifySmsLinkRequest` |
| `userIntervention` | Participant accepting an intervention invitation | `acceptInterventionInvite` |

## Reporting _(src: app/global/reducers/reportTemplates/actions.js, app/global/reducers/dashboardSections/actions.js, app/global/reducers/generatedReports/actions.js)_

| Reducer module | Responsibility | Representative actions |
|---|---|---|
| `reportTemplates` | Report-template editor: templates, sections, formula-based section cases, logos, test report generation | `fetchReportTemplatesRequest`, `addReportTemplateRequest`, `addTemplateSectionRequest`, `addSectionCaseRequest`, `generateTestReportRequest` |
| `dashboardSections` | Reporting dashboard composition: sections and charts with reorder, filters, copy | `fetchDashboardSectionsRequest`, `addChartRequest`, `editChartRequest`, `copyChartRequest`, `reorderSectionsRequest` |
| `generatedReports` | Participant/clinician generated-reports list and download tracking | `fetchReportsRequest`, `markReportDownloadedRequest` |

## Cross-Cutting & Editor Utilities _(src: app/global/reducers/globalState/actions.js, app/global/reducers/localState/actions.js, app/global/reducers/copyModalReducer/actions.js, app/global/reducers/answers/actions.ts, app/global/reducers/ttsLanguages/actions.js, app/global/reducers/audioPreview/actions.js, app/global/reducers/adminConsole/actions.js)_

| Reducer module | Responsibility | Representative actions |
|---|---|---|
| `globalState` | Cross-cutting UI state: file download orchestration, navbar height | `downloadFileRequest`, `saveNavbarHeight` |
| `localState` | In-editor UI state for narrator block selection, character drag, question-settings preview | `changeCurrentNarratorBlock`, `setCharacterDraggable`, `setQuestionSettings`, `updatePreviewAnimation` |
| `copyModalReducer` | Navigation state for copy-modal (browse interventions / sessions / question-groups) | `fetchInterventionsWithPaginationRequest`, `fetchSessionsRequest`, `changeViewAction` |
| `answers` | Fetch a user-session's answers (TypeScript canonical module) | `fetchAnswersRequest`, `fetchAnswersSuccess`, `fetchAnswersError` |
| `ttsLanguages` | Google TTS language and voice catalogue | `fetchLanguagesRequest`, `fetchLanguageVoiceRequest` |
| `audioPreview` | TTS phonetic audio preview in the narrator editor | `phoneticPreviewRequest`, `resetPhoneticPreview` |
| `adminConsole` | Superadmin console operations (e.g. reset TTS audio cache) | `resetAudioRequest`, `resetAudioSuccess`, `resetAudioError` |
