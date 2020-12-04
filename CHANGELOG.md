Changelog
=========


v0.2.0
- Add last changes to CHANGELOG and fix version of application in helm chart. [Jerzy Sładkowski]
- Fix copy mismatch. [Michal Grzelak]
- Restore access settings copy. [Michal Grzelak]
- Rename copy. [Michal Grzelak]
- Rename problem => intervention leftovers. [Michal Grzelak]
- Fix wrong rename. [Michal Grzelak]
- Fix tests. [Michal Grzelak]
- Copy fixes. [Michal Grzelak]
- Merge fixes. [Michal Grzelak]
- Branching layout fix. [Michal Grzelak]
- Fixes. [Michal Grzelak]
- Rename intervention container. [Michal Grzelak]
- Rename intervention => session. [Michal Grzelak]
- Fix CharacterAnim bug. [Michal Grzelak]
- Rename all structure entities intervention => session. [Michal
  Grzelak]
- Rename selectors intervention => session. [Michal Grzelak]
- Rename sagas problem => intervention and change keys in components.
  [Michal Grzelak]
- Rename sagas intervention => session. [Michal Grzelak]
- Rename problemId => interventionId. [Michal Grzelak]
- Rename interventionId => sessionId. [Michal Grzelak]
- Rename endpoints and request structure. [Michal Grzelak]
- Add CHANGELOG. [Jerzy Sładkowski]

v0.0.0 (15.05.2020) - v0.1.1 (03.12.2020)
------------
- Add version of app in helm chart. [Jerzy Sładkowski]
- Remove email input (#400) [Jakub Zygmunt]
- [CIAS-650] - Containers tests (#398) [Jakub Zygmunt]

  * Add tests to question settings reducer

  * Simplify mock data

  * Add reflection reducer tests

  * Add reflections snapshot tests

  * Add tabs tests

  * Update mocks
- Unit tests (#396) [Michal Grzelak]

  * Add requestErrorMessageHandler tests

  * Add useAudioHelper tests

  * Add initial usePauseBlock tests

  * Clean up usePauseHelper test

  * Add useMoveHelper tests

  * Extend useMoveHelper tests

  * Extend usePauseHelper test

  * Remove duplicated test

  * Add jest-extended
- [CIAS-650] - Add tests to containers (#394) [Jakub Zygmunt]

  * Add tests to answer components

  * Update snapshot

  * Add tests

  * Fix state update

  * Add tests

  * Add test

  * Update snapshot

  * CR changes
- [CIAS-716] - Wrong session numeration (#395) [Jakub Zygmunt]

  * Fix selector

  * Update snapshots

  * Fix snapshot

  * Fix reducer state

  * CR changes
- [CIAS30-694] - Enhance access setting integration test (#385) [Jakub
  Zygmunt]

  * Add any registered participant test

  * Add any registered participant test

  * Update snapshot

  * Fix answer url

  * Change comments

  * Fix test
- [CIAS30-709] branching session integration test (#393) [Michal
  Grzelak]

  * Add Session Branching tests

  * Add CODEOWNERS file
- [CIAS-] - Enable session copy action (#390) [Jakub Zygmunt]

  * Enable copy

  * Update snapshot
- Disable text button for researcher (#391) [Jakub Zygmunt]

  * Disable text button for researcher

  * Enhance test
- [CIAS30-711] deep diff fix (#388) [Michal Grzelak]

  * Remove deepDiff and implement fields property in action builder

  * Add pickFields tests
- Fix navbar access (#387) [Jakub Zygmunt]
- Add param to component (#386) [Jakub Zygmunt]
- Change copy (#383) [Jakub Zygmunt]
- Hotfix patch difference (#384) [Michal Grzelak]

  * Fix patch difference returning null

  * Improve deep diff

  * Remove InterventionListBranching
- Merge pull request #382 from HTD-Health/CIAS-690. [msniec]

  [CIAS-690] - Use intervention id instead of slug
- Merge branch 'dev' into CIAS-690. [msniec]
- [CIAS-696] - Branching integration tests (#378) [Jakub Zygmunt, Michal
  Grzelak]

  * Init test

  * Cypress commands refactor

  * Refactor Cypress commands

  * Add Deep compare and send only patch difference during intervention update

  * Add answer question command

  * Add force to radio click

  * Fix checking radio

  * Add test base

  * Add simple branch case

  * Fix tests

  * Update snapshots

  * CR changes
- [CIAS-703] - Fix chips input (#381) [Jakub Zygmunt]

  * Fix chips input

  * Change validator to yup

  * Fix test
- Use intervention id instead of slug. [Michał Śnieć]
- Disable empty screen (#380) [Jakub Zygmunt]
- Merge pull request #379 from HTD-Health/CIAS-666-add-settings-
  confirmation. [msniec]

  [CIAS-666] - Confirm settings disable
- Merge branch 'dev' into CIAS-666-add-settings-confirmation. [msniec]
- [CIAS-677] - Problem Access Settings integration test (#369)
  [JakubZygmunt, Michał Śnieć, msniec]

  * Add intervention test

  * WIP tests

  * More tests

  * Add anyone access test

  * Code improvement

  * Change command types

  * Code improvement
- Disable feedback screen narrator toggle (#377) [Michal Grzelak]
- [CIAS30-689] Resize observer and Grid scroll (#376) [Michal Grzelak]

  * Unify Grid scroll behavior

  * Unify ResizeObserver implementation
- Confirm settings disable. [Michał Śnieć]
- Merge pull request #347 from HTD-Health/CIAS-629_finish_screen.
  [msniec]

  [CIAS-629] Finish screen
- Merge branch 'dev' into CIAS-629_finish_screen. [msniec]
- Add send emails cypress test (#373) [Michal Grzelak]

  * Add send emails cypress test

  * Comment integration test workflow
- [CIAS-688] - Change start intervention copy (#374) [Jakub Zygmunt]

  * Change copy

  * Change copy
- Merge pull request #372 from HTD-Health/CIAS-684-refactor-chips-input.
  [msniec]

  [CIAS-684] - Add possibility to clear chips input
- Merge branch 'dev' into CIAS-684-refactor-chips-input. [msniec]
- [CIAS-682] - Change copy (#371) [Jakub Zygmunt]

  * Change copy

  * Update snapshots
- [CIAS-676] - Create e-intervention integration test (#367) [Jakub
  Zygmunt, Michal Grzelak]

  * Add intervention test

  * Add webpack configuration to cypress setup

  * Add create intervention test

  * Update PR template

  * Change test name

  * Update snapshots

  * Change data-cy prop place

  * Comment integration tests
- Code review changes. [Michał Śnieć]
- Add possibility to clear chips input. [Michał Śnieć]
- Merge pull request #375 from HTD-Health/CIAS-687-add-button-to-reset-
  peedy. [msniec]

  [CIAS-687] - Add button to reset peedy position
- Add button to reset peedy position. [Michał Śnieć]
- Update snapshot. [Michal Grzelak]
- Fix error in console. [Michał Śnieć]
- Code review changes. [Michał Śnieć]
- Set correct peedy position in groups. [Michał Śnieć]
- [CIAS-660] - Extract Finish Screen from group in branching (#353)
  [Jakub Zygmunt]

  * Extract finish screen from group in branching

  * Fix question width
- Code review changes. [Michał Śnieć]
- Fix tests. [Michał Śnieć]
- Set correct screen after deletion. [Michał Śnieć]
- Make Finish Screen last screen. [Michal Grzelak]
- Add not answerable questions array. [Michal Grzelak]
- Fix groupId assignment during Question creation. [Michal Grzelak]
- Fix ternary null bug. [Michal Grzelak]
- Hide branching tab for Finish Screen. [Michal Grzelak]
- Code Refactor. [Michal Grzelak]
- Make Finish Group position to be set as it is, not to a fixed number
  (in case its position changes) [Michal Grzelak]
- Clean groups after Question delete. [Michal Grzelak]
- Fix adding new questions to finish group. [Michal Grzelak]
- Disable Finish Group grouping. [Michal Grzelak]
- Remove position for group assigning. [Michal Grzelak]
- Clean groups on group action. [Michal Grzelak]
- Fix finish screen reorder and make it non -copyable and -deleteable.
  [Michal Grzelak]
- Extract Finish Gruop outside reorderable group list. [Michal Grzelak]
- Add possibility to render Group without dnd. [Michal Grzelak]
- Add possibility to render Question without dnd. [Michal Grzelak]
- Do not display Finish Screen in Add new Screen. [Michal Grzelak]
- Make changes to default group type. [Michal Grzelak]
- Fix breaking changes. [Michal Grzelak]
- Add Finish Screen type. [Michal Grzelak]
- [CIAS-679] GitHub actions integration tests (#366) [Michal Grzelak]

  * Add pr workflow

  * Edit Integration workflow

  * Add wait-on to wait for server

  * Add parallel jest tests
- Merge pull request #365 from HTD-Health/CIAS-675-integration-login-
  tests. [msniec]

  [CIAS-675] - Add login integration tests
- Merge branch 'dev' into CIAS-675-integration-login-tests. [msniec]
- [CIAS-680] - Create login without UI command  (#364) [Jakub Zygmunt]

  * Add login command

  * Change env name

  * Fix login command
- Fix invalid URL. [Michał Śnieć]
- Code review changes. [Michał Śnieć]
- Add login integration tests. [Michał Śnieć]
- Merge pull request #363 from HTD-Health/CIAS-667-block-peedy. [msniec]

  [CIAS-667] - Block peedy animation when it's disabled
- Merge branch 'dev' into CIAS-667-block-peedy. [msniec]
- [CIAS-673] - Add Cypress to project (#362) [Jakub Zygmunt]

  * Init Cypress

  * Add prettier cypress rules

  * Remove useless plugin value
- Merge branch 'CIAS-667-block-peedy' of https://github.com/HTD-
  Health/cias-web into CIAS-667-block-peedy. [Michał Śnieć]
- Merge branch 'dev' into CIAS-667-block-peedy. [msniec]
- [CIAS-663] - Add tests to sagas in user, problems (#357) [Jakub
  Zygmunt]

  * Add user saga tests

  * Remove console.log

  * Add problems saga test

  * Add problem saga tests

  * Remove useless cloneDeep
- [CIAS-670] - Fix add variable in use formula (#359) [Jakub Zygmunt]

  * Fix variable chooser

  * Add property in questionGroups

  * Add missing line
- Handle proper block flow for Pause Block (#361) [Michal Grzelak]
- Fix test. [Michał Śnieć]
- Disable block removal for feedback block. [Michał Śnieć]
- Block peedy animation when it's disabled. [Michał Śnieć]
- Merge pull request #360 from HTD-Health/CIAS-664. [msniec]

  [CIAS-664 - Open first block on narrator tab
- Open first block initialy. [Michał Śnieć]
- [CIAS-618] Upgrade dependencies (#358) [Michal Grzelak]

  * Upgrade image-webpack-loader

  * Specify node version

  * Update redux-saga
- [CIAS-618] Upgrade React to v16.14.0 (#350) [Michal Grzelak]

  * Make fixes to Participant Dashboard

  * Fix QuestionVideo tests with react-player being loaded asynchronously

  * Fix broken sagas tests

  * Refactor UrlPreview tests not to make actual HTTP calls

  * Npm audit fix safe changes

  * Change Webpack manifest

  * Update React to 16.14.0 fully working

  * Polyfill stable language features

  * Remove react-toastify-redux

  * Patch react-lottie not to use unsafe lifecycles

  * Update README

  * Remove react-testing-library and update babel

  * Simplify timezone tests

  * Refactor redux-injectors

  * Update jest

  * Update saga tests
- [CIAS-656] - Add tests to sagas in /global (#349) [Jakub Zygmunt]

  * add intervention sagas tests

  * Update jira link

  * Add fetchInterventions sagas tests

  * Add problem sagas tests

  * Add tests to problem sagas

  * Add problem saga tests

  * Fix patterns key

  * Fix test
- [CIAS-659] - Fix page titles (#351) [Jakub Zygmunt]

  * Fix pages title

  * Fix scrollByRef
- [CIAS-652] - Add screen button should always be visible (#346) [Jakub
  Zygmunt]

  * Add sticky button

  * Fix sticky button
- Merge pull request #345 from HTD-Health/CIAS-653. [msniec]

  [CIAS-653] - Add new screen to group of selected question
- Add new screen to group of selected question. [Michał Śnieć]
- [CIAS-559] - Improve code coverage in /global directory CIAS-559 f |
  Improve code coverage in /global directory (#331) [Jakub Zygmunt]

  * addAvatar saga test

  * Add change email saga test

  * Change password saga test

  * Add deleteAvatar saga

  * add index test saga

  * Add reducer test

  * End auth reducer test

  * Fix clone state

  * Add selector test

  * Add problem reducer tests

  * Add user reducer tests

  * Refactor saga tests

  * Add userList reducer test

  * Change to actionBuilder

  * Add problems reducer tests

  * Update snapshot

  * Refactor add/delete avatar saga

  * Change reducer cache approach

  * Recover package-lock.json

  * Fix apiResponseWithSnakeCase

  * Add redux-saga-test-plan library

  * CR changes

  * Fix call parameters
- [CIAS-638 & CIAS-637] - Change text copy and delete action remove in
  modal (#343) [Jakub Zygmunt]

  * Change copy

  * Remove delete action from modal

  * Fix DaysAfterOption input

  * Change condition

  * Move check payload to DaysAfterOption

  * Change copy

  * Change to email

  * Update snapshot

  * Message change
- Merge pull request #342 from HTD-Health/CIAS-693-library-change.
  [msniec]

  [CIAS-693] - Use react testing library in tests
- Merge branch 'dev' into CIAS-693-library-change. [msniec]
- [CIAS-618] Utils tests (#341) [Michal Grzelak]

  * Add actionBuilder tests

  * Add arrayUtils tests

  * Add axios request tests

  * Add axios response interceptors tests

  * Add email valdiators tests

  * Fix Collapse memory leak

  * Add formatMessage test utils test

  * Add dndUtils tests

  * Add proper tests names

  * Mock audio and add AudioWrapper tests

  * Add headers const and getHeaders tests

  * Add hasDuplicates tests

  * Add instantiateEmptyQuestion test

  * Add LocalStorageService tests
- Use react testing library in tests. [Michał Śnieć]
- Merge pull request #328 from HTD-Health/CIAS-693. [msniec]

  [CIAS-693] - Components test
- Merge branch 'dev' into CIAS-693. [Michał Śnieć]
- Add msu logo for participant (#339) [Michal Grzelak]
- [CIAS-620] MSU logo (#337) [Michal Grzelak]

  * Add MSU logo image and component

  * Add group name above participant's container
- Merge pull request #335 from HTD-Health/MASTER-HOTFIX. [msniec]

  HOTFIX
- HOTFIX. [Michał Śnieć]
- Merge pull request #333 from HTD-
  Health/CIAS-619_question_reorder_reorder. [msniec]

  [CIAS-619] Question and Question Groups reorder fix
- Fix questions and question_groups reorder. [Michal Grzelak]
- Update question reorder endpoint. [Michal Grzelak]
- Merge pull request #332 from HTD-Health/hotfix-edit-variable-in-list.
  [msniec]

  Hotfix-variable-list
- Fix editing issue. [Michał Śnieć]
- Add margin. [Michał Śnieć]
- Remove console log. [Michał Śnieć]
- Hotfix-variable-list. [Michał Śnieć]
- Add all tests. [Michał Śnieć]
- More tests. [Michał Śnieć]
- More tests. [Michał Śnieć]
- Extra tests. [Michał Śnieć]
- Merge branch 'dev' into CIAS-693. [Michał Śnieć]
- Merge pull request #330 from HTD-Health/hotfix-variables-loading.
  [msniec]

  Fix variables lodaing
- Merge branch 'dev' into hotfix-variables-loading. [msniec]
- Fix narrator settings (#329) [Jakub Zygmunt]
- Remove console log. [Michał Śnieć]
- Fix variables lodaing. [Michał Śnieć]
- Merge pull request #327 from HTD-Health/CIAS-561-fix. [msniec]

  Hide empty groups in branching layout
- Hide empty groups in branching layout. [Michał Śnieć]
- Merge pull request #271 from HTD-Health/CIAS-561. [msniec]

  [CIAS-561] - Add basic grouping UI
- Fix snap. [Michał Śnieć]
- Merge pull request #326 from HTD-Health/CIAS-561-fix-saga. [msniec]

  [CIAS-561] - Fix sagas
- Fix saga. [Jakub-Zygmunt]
- Merge pull request #325 from HTD-Health/CIAS-561-fixes. [msniec]

  Cias 561 fixes
- Update snapshot. [Michał Śnieć]
- Some fixes. [Michał Śnieć]
- Merge branch 'dev' into CIAS-561. [msniec]
- [CIAS-656] - Change copy of publishing warning modal (#322) [Jakub
  Zygmunt]

  * Change modal text

  * Fix imports

  * Move text to left

  * Change font size

  * CR changes

  * Change margin top
- [CIAS-695] - Add groups names to branching dropdown (#324) [Jakub
  Zygmunt]

  * Add collapse groups to branching dropdown

  * Fix test
- Merge pull request #323 from HTD-Health/CIAS-679_replace_dnd_library.
  [msniec]

  [CIAS-679] Replace dnd library
- Update snapshot. [Michal Grzelak]
- NPM audit fix. [Michal Grzelak]
- Remove 'react-reorder' library. [Michal Grzelak]
- Implement Session reorder with a new library. [Michal Grzelak]
- Change Draggable scope in Accordion. [Michal Grzelak]
- Implement Block reorder with a new library. [Michal Grzelak]
- Merge branch 'dev' into CIAS-561. [msniec]
- [CIAS-685] - Move character to right-bottom corner (#317) [Jakub
  Zygmunt]

  * Change character position

  * Update snapshot

  * Change intervention invitetion urls

  * Change intervention invitetion urls

  * CR changes
- [CIAS-661] Reorder implementation (#321) [Michal Grzelak]

  * Add reorder for Questions

  * Add reorder for Groups

  * Add reorder tests
- [CIAS-661] Reorder (#320) [Michal Grzelak]

  * Replace DnD library
- Merge branch 'CIAS-561' of https://github.com/HTD-Health/cias-web into
  CIAS-561. [Michał Śnieć]
- Merge pull request #319 from HTD-Health/CIAS-667. [msniec]

  [CIAS-667] - Fix grouping tests
- Fix tests. [Michał Śnieć]
- Fix tests. [Michał Śnieć]
- Merge branch 'dev' into CIAS-561. [Michał Śnieć]
- Merge pull request #312 from HTD-Health/CIAS-433. [msniec]

  [CIAS-433] - Collapsable groups
- Extract const to variables. [Michał Śnieć]
- Code review changes. [Michał Śnieć]
- Lint fix. [Michał Śnieć]
- Add accordeon to groups. [Michał Śnieć]
- [CIAS-668] - Add loaders to question groups (#313) [Jakub Zygmunt]

  * Add loaders to reducer

  * Add question list saving state to navbar loader

  * CR changes

  * CR changes

  * Remove loader
- Merge pull request #309 from HTD-Health/CIAS-666. [msniec]

  [CIAS-666] - Handle preview & fill on grouping
- Handle grouping on preview and fill. [Michał Śnieć]
- Fix POST, PUT, DELETE requests for question (#308) [Michal Grzelak]
- Merge pull request #290 from HTD-Health/CIAS-561-grouping-call.
  [msniec]

  Cias 561 grouping call
- CR changes. [Michał Śnieć]
- Fix not valid import. [Michał Śnieć]
- Merge branch 'CIAS-561' into CIAS-561-grouping-call. [Michał Śnieć]
- Merge branch 'dev' into CIAS-561. [Michał Śnieć]
- Some work done. [Michał Śnieć]
- Merge branch 'dev' into CIAS-561-grouping-call. [Michał Śnieć]
- Working version v3. [Michał Śnieć]
- Working version v2. [Michał Śnieć]
- Working version. [Michał Śnieć]
- Refactor group reducer. [Michał Śnieć]
- Initial work. [Michał Śnieć]
- Merge branch 'dev' into CIAS-561. [Michał Śnieć]
- Merge branch 'dev' into CIAS-561. [Michał Śnieć]
- Merge pull request #276 from HTD-Health/CIAS-561-v3. [msniec]

  [CIAS-561] - Add request and modal to select researchers to copy splides
- Add saga/actionss to send copy to reasercheer. [Michał Śnieć]
- Merge branch 'dev' into CIAS-561. [Michał Śnieć]
- Merge pull request #273 from HTD-Health/CIAS-561-v2. [msniec]

  [CIAS-561] - Add sagas/actions to new UI
- Add sagas/actions for grouping. [Michał Śnieć]
- Code review changes. [Michał Śnieć]
- Add basic grouping UI. [Michał Śnieć]
- Fix tests. [Michał Śnieć]
- WIP. [Michał Śnieć]
- Fix snapshot. [Michał Śnieć]
- Fix jest setup. [Michał Śnieć]
- Working test. [Michał Śnieć]
- Add tests to some components. [Michał Śnieć]
- [CIAS-687] - Add info about special characters in password (#318)
  [Jakub Zygmunt]

  * Add password signs info and change regex

  * CR changes
- Fix Feedback target assign (#315) [Michal Grzelak]
- [CIAS-648] - Add link to create CSV with invited participants to
  session (#314) [Jakub Zygmunt]

  * Add export button to ShareBox

  * Add export csv to AccessGiver

  * CR changes
- [CIAS-644] - Different colors for inactive inputs (#307) [Jakub
  Zygmunt]

  * Add styles

  * Change screen setting to screen details
- [CIAS-642] - Remove dashed border from preview mode (#310) [Jakub
  Zygmunt]

  * Remove dashed border

  * Remove useless validation
- [CIAS-639] - Variable names editable in the component (#306) [Jakub
  Zygmunt]

  * Add input to question list items

  * Change QuestionData components constant value

  * Add variable input component

  * Remove variable badge from components

  * Move variable input to question list

  * Update snapshots

  * Remove update var from number question

  * CR changes
- [CIAS-516] - Connect with a new schedule model  (#268) [Jakub Zygmunt]

  * Change schedule model

  * Add access giver and share requests

  * Change parameter name

  * Fix fetch emails saga

  * WiP access giver

  * Fix schedule selector

  * Fix share box

  * Fix user list loading

  * Adjust data scope to backend

  * Update snapshots

  * Fetch users after resend

  * Update snapshot

  * Fix import

  * CR changes

  * Fix import

  * Add delete action

  * Add delete invite saga

  * Remove delete invite loading

  * Fix patch request

  * CR changes

  * Fix user access enable reducer
- [CIAS-651] Fix display number of sessions (#302) [Jakub-Zygmunt, htd-
  mpawlak]

  * REVIEW_APP_NEEDS

  * Change problems model

  * Fix show problem sessions badge

  * Fix test snapshot

  * Remove REVIEW_APP_NEEDS
- [CIAS-641] Scroll Fog (#305) [Michal Grzelak]

  * Add scroll fog hook

  * Implement fog in Grid Screen

  * Implement fog in QuestionTypeChooser

  * Remove redundant ngrok library
- [CIAS-640] - Score / Value differences (#304) [Jakub Zygmunt]

  * Change SingleQuestion value to score

  * Remove unnecessary prop
- [CIAS-637] - Creating session - top bar (#301) [Jakub Zygmunt]

  * Change intervention navbar styles

  * Move settings
- [CIAS-636] & [CIAS-638] - Back button on the session view, Answer
  title (#299) [Jakub Zygmunt]

  * Remove arrow background

  * Add title to answer page
- [CIAS-631] Statuses validation implement (#300) [Michal Grzelak]

  * Implement statuses according to an excel document
- [CIAS-633] - Fix InterventionStatusButtons test (#298) [Jakub Zygmunt]

  * Fix InterventionStatusButtons test

  * Fix messages
- [CIAS-615] - Display warning when Publishing intervention (#297)
  [Jakub Zygmunt]

  * Add confirmation info

  * Update tests

  * Remove letter

  * Change test name

  * Capitalize messages
- [CIAS-616] Statuses implement - EDITING (#296) [Michal Grzelak]

  * Block editing of Question, Session, Intervention when Intervention status is different that draft
- Fix hoverable list add button (#294) [Jakub Zygmunt]
- [CIAS-628] - Scroll actions in Grid Screen (#295) [Jakub Zygmunt]

  * Add scrollable actions

  * Move scroll to file
- [CIAS-524] - Style pagination and connect to backend (#293) [Jakub
  Zygmunt]

  * Scope users

  * Fix sagas scope

  * Add pagination nav

  * Refactor PaginationHelper

  * Refactor PaginationHandler

  * Remove console.log

  * Fix import

  * CR changes
- [CIAS-602] - Problems view shows owner of intervention (#291) [Jakub
  Zygmunt]

  * Add problem details

  * Change user props

  * Udpate snapshot

  * Change jest timezone

  * Simplify ProblemDetails component

  * Fix imports

  * Add fetch interventions

  * Fix duplicated session
- Hide by default archived e-interventions (#289) [Jakub Zygmunt]
- [CIAS-599] - Fix column space in Grid Question (#287) [Jakub Zygmunt]

  * Add more space for first column

  * Change first column to position sticky

  * Fix Column width props

  * Update snapshots

  * CR changes
- Change edit user URL (#288) [Jakub Zygmunt]
- Merge pull request #286 from HTD-Health/hotfix-quill-title-size.
  [msniec]

  Fix quill positioning and make title H1 initially
- Add padding to title box. [Michał Śnieć]
- CR changes. [Michał Śnieć]
- Fix snapshot. [Michał Śnieć]
- Fix quill positioning and make title H1 initially. [Michał Śnieć]
- [CIAS-597] Restore title for participant (#284) [michal-grzelak]
- Add isAxiosError check (#283) [michal-grzelak]
- Merge pull request #282 from HTD-Health/hotfix_title_settings.
  [msniec]

  Remove title from settings
- Skop saga error test. [Michal Grzelak]
- Add errors to invite researcher. [Michal Grzelak]
- Fix + in emails. [Michał Śnieć]
- Set axios headers on request error. [Michal Grzelak]
- Remove title from settings. [Michal Grzelak]
- [CIAS-591] Login and Register error messages (#281) [michal-grzelak]

  * Improve errors on /login page

  * Extract error message handling

  * Display meaningful error on /register page
- Fix user not disappearing when show inactive filter is off (#280)
  [michal-grzelak]
- [CIAS-423] E-mail confirmation toast (#279) [michal-grzelak]

  * Display account confirmation string

  * Bump up lodash and query-string versions
- Fix session schedule (#278) [Jakub Zygmunt]
- [CIAS-571] Intervention details update (#277) [michal-grzelak]

  * Make share to participants modal visible on button click

  * Update Intervention Tile design

  * Add SettingsPanel to Problem Details

  * Change updating session settings to find index based on id
- [CIAS-556] Question Types rename (#269) [michal-grzelak]

  * Make question types to be used as an id for i18n

  * Change Question Type naming
- Merge pull request #275 from HTD-Health/CIAS-572. [msniec]

  [CIAS-572] - Refactor Select Researchers modal
- Refactor Select Researchers modal. [Michał Śnieć]
- Cias 525 Grid Screen scrolling and positioning (#274) [michal-grzelak]

  * Make displaying of Question uniform and decrease margin

  * Add scroll to Grid for Participant's view
- [CIAS-422] - Handle registration by a researcher (#272) [Piotr
  Sokoliński, PiotrSokoliński]

  * WIP:initial work on invite researcher

  * add second saga

  * add tests

  * fix tests
- Merge pull request #266 from HTD-Health/CIAS-528. [msniec]

  [CIAS-528] - New session tile click actions
- Merge branch 'dev' into CIAS-528. [msniec]
- [CIAS-560] Remove title from narrator preview (#270) [michal-grzelak]

  * Remove title from narrator preview
- [CIAS-420] - Add modal for inviting researchers (#220) [Piotr
  Sokoliński, PiotrSokoliński, msniec]

  * add modal for inviting researchers

  * update snapshots

  * add action to send invite

  * remove console log and sort lines

  * add tests to improve coverage

  * add get and delete

  * fix tests

  * CR changes

  * update snapshots

  * refactor user table

  * add more tests

  * test and improve fetching
- [CIAS-506] - Fix side panels width in EIAT (#244) [Jakub Zygmunt,
  Michał Śnieć]

  * Add auto hide questions list

  * Fix hoverable table item

  * Fix question styles

  * Fix settings width

  * Remove template strings

  * Fix side panels scaling

  * WIP

  * Fix intervention navbar

  * Change icon

  * Fix list item space

  * Udpate snap

  * CR changes

  * Fix cross icon

  * Udpate snap

  * Fix question title

  * Fix question title position
- Merge branch 'dev' into CIAS-528. [msniec]
- Remove Title from Participants view (#267) [michal-grzelak]
- [CIAS-512] Active/inactive user filtering (#258) [michal-grzelak]

  * Active/inactive user filtering

  * Add filtering on User List page and change deactivated key to active

  * Add optional fsevents dependency
- [CIAS-499] - Add archive status and filter (#265) [Jakub Zygmunt]

  * Remove show archived text and add filter

  * Change label color
- [CIAS-555] Memory leak (#264) [michal-grzelak]

  * Add useAsync hook

  * Fix memory leak with useAsync hook
- New session tile click actions. [Michał Śnieć]
- Merge pull request #259 from HTD-Health/HOTFIX-fix-hardcoded-url.
  [msniec]

  [HOTFIX] - Fix redirect URL after registration
- Merge branch 'dev' into HOTFIX-fix-hardcoded-url. [msniec]
- Restore Peedy showing up (#261) [michal-grzelak]
- Merge pull request #260 from HTD-Health/HOTFIX-fix-console-error.
  [msniec]

  Hotfix console error
- Merge branch 'dev' into HOTFIX-fix-console-error. [Piotr Sokoliński]
- Hottfix console errorr. [Michał Śnieć]
- Fix. [Michał Śnieć]
- Fix copy (#262) [Piotr Sokoliński, PiotrSokoliński]
- Use env. [PiotrSokoliński]
- [CIAS-500] Screen chooser positioning (#249) [michal-grzelak]

  * Implement Dropdown top/bottom positioning

  * Add bottom fade in scroll container
- Merge pull request #256 from HTD-Health/HOTFIX-change-profile-UI.
  [msniec]

  Hotfix change profile ui
- Fix snapshot. [Michał Śnieć]
- Change width of button. [Michał Śnieć]
- Updatte snapshots. [Michał Śnieć]
- Change profile UI according to Ola. [Michał Śnieć]
- Merge pull request #254 from HTD-Health/CIAS-540_CIAS-541_CIAS-538.
  [msniec]

  [CIAS-540] / [CIAS-541] / [CIAS-538] - UI changes
- Merge branch 'dev' into CIAS-540_CIAS-541_CIAS-538. [msniec]
- Fix table hover (#255) [Jakub Zygmunt]
- Merge branch 'CIAS-540_CIAS-541_CIAS-538' of https://github.com/HTD-
  Health/cias-web into CIAS-540_CIAS-541_CIAS-538. [Michał Śnieć]
- Merge branch 'dev' into CIAS-540_CIAS-541_CIAS-538. [msniec]
- [CIAS-535] - Allow to type url (#250) [Piotr Sokoliński,
  PiotrSokoliński]

  * allow to type url

  * CR changes
- [CIAS-529] - Enlarge title (#251) [Piotr Sokoliński, PiotrSokoliński]

  * enlarge title
- Do not add payload to multi question on add (#252) [Piotr Sokoliński,
  PiotrSokoliński]
- Fix issue with not visible names. [Michał Śnieć]
- Code review changes. [Michał Śnieć]
- UI changes. [Michał Śnieć]
- [CIAS-532] Add else message for branching in Screen and Session (#253)
  [michal-grzelak]

  * Add else message for branching in Screen and Session
- Merge pull request #246 from HTD-Health/CIAS-545. [msniec]

  [CIAS-545] - Change question names and colors
- Merge branch 'dev' into CIAS-545. [Michał Śnieć]
- Merge pull request #248 from HTD-Health/CIAS-539_CIAS-537. [msniec]

  [CIAS-539]/[CIAS-537] - UI changes
- Merge branch 'dev' into CIAS-539_CIAS-537. [Piotr Sokoliński]
- Fix copy (#247) [Piotr Sokoliński, PiotrSokoliński]
- Merge pull request #245 from HTD-Health/CIAS-487. [msniec]

  [CIAS_487] - Add requests to deactivate / activate in user details
- Add requests to deactivate / activate user details. [Michał Śnieć]
- UI changes. [Michał Śnieć]
- Update snapshots. [Michał Śnieć]
- Change question names and colors. [Michał Śnieć]
- Merge pull request #243 from HTD-Health/CIAS-485-Piotr. [msniec]

  [CIAS-485] - User profile edit
- Fix import. [Michał Śnieć]
- Code review part 2. [Michał Śnieć]
- Code review changes. [Michał Śnieć]
- Fix snapshots. [Michał Śnieć]
- Fix mapper. [Michał Śnieć]
- Update snapshots. [Michał Śnieć]
- Merge branch 'dev' into CIAS-485. [Michał Śnieć]
- [CIAS-190] - Deactivate user (#235) [Jakub Zygmunt]

  * Add activation button

  * Refactor sagas

  * Add inactive label

  * Style modal

  * Remove refactor changes

  * Remove refactor changes

  * Fix tests

  * Change ternary operator

  * CR changes

  * Fix reducer

  * Add test case

  * CR changes

  * Remove defaultTitle message

  * Remove maxWidth prop
- [CIAS-493] Subtitle changes (main title, TTS etc.) (#238) [michal-
  grzelak]

  * [CIAS-493] Limit TTS to Subtitle only

  * [CIAS-490] Change default Title and Subtitle

  * [CIAS-494] Change screen title in side panel

  * [CIAS-496] Use question subtitle in variable selector

  * Implement builder pattern for Question
- [CIAS-498] - Fix UX of block removing (#241) [Jakub Zygmunt]

  * Remove hover button and improve filters

  * CR changes
- Fix some defects (#242) [Piotr Sokoliński, PiotrSokoliński]
- [CIAS-495] - Fix empty state in variable selector (#240) [Jakub
  Zygmunt]

  * Add no variables text

  * Update snapshot
- [CIAS-492] Fix auto-play (#237) [michal-grzelak]

  * Add global audio instance and handle fake audio to enable auto play
- [CIAS-497] - Add hover states to add block/case buttons (#236) [Jakub
  Zygmunt]

  * Add styles

  * Update snapshots

  * CR change

  * Update snapshots

  * Fix snapshots
- [CIAS-480] - Add some tests to the project (#223) [Michal Grzelak,
  Piotr Sokoliński, PiotrSokoliński, msniec]

  * Provide tests for variableNameValidator

  * Provide tests for variableNameValidator

  * Provide tests for urlValidator

  * Provide tests for urlValidator

  * Provide tests for numericValidator

  * Provide tests for numericValidator

  * WIP: add initial tests

  * Test useKeyPress hook

  * Test useKeyPress hook

  * Add initial tests for useAudioHelper

  * WIP: add initial tests

  * Add initial tests for useAudioHelper

  * Add more tests

  * Add more tests

  * add some tests to inputs

  * add some tests to inputs

  * remove console log

  * remove console log

  * Change Roles import

  * Update snapshot
- [CIAS-489] Update styled-components and fix container style jumping
  (#228) [michal-grzelak]

  * Update styled-components and fix container style jumping

  * Update styled-components
- Fix same data. [Michał Śnieć]
- Add user profile. [Michał Śnieć]
- Extract actions form component in account settings. [PiotrSokoliński]
- Display sharebox in prod environment (#234) [Michał Śnieć, msniec]
- Fix clear filters (#232) [Jakub Zygmunt]
- [CIAS-484] - Handle access to the session (#227) [Piotr Sokoliński]

  * WIP: work on not found page

  * style not found page

  * fix access giver
- [CIAS-343] - Improve ability to clear e-intervention status filters
  (#226) [Jakub Zygmunt]

  * Add ClearButton component

  * CR changes

  * Remove useless prop

  * Change div to button

  * Update snapshots
- [CIAS-508] - Fix display participant dashboard (#230) [Jakub Zygmunt]

  * Fix display participant dashboard

  * Remove useless prop
- [CIAS-507] Add Yup email validator (#229) [michal-grzelak]
- [CIAS-476] - Calculate schedule sending time by logged user timezone
  (#218) [Jakub Zygmunt, msniec]

  * Add calculateTimeZone function

  * Update snapshot

  * Change library do dayjs

  * Remove timezones map

  * Add Timezone selector

  * Add time_zone after register

  * Fix test

  * Remove useless props

  * Rollback SingleTile

  * Update snapshots

  * CR changes
- [CIAS-416] - Add filters to users table (#224) [Michał Śnieć
  <michal.sniec@htdevelopers.com>    * Code review changes    * Fix not
  needed props    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>, msniec]

  * Add filters to users table

  * [CIAS-417] - Add pagination to user table (#225)

  * Add pagination to user table

  * Code review changes

  * Update snapshots

  * Code review change

  * Remove guest role

  * Rename

  * Rename v2

  * Fix snapsoht
- [CIAS-367] Reflections 2.0 (#222) [michal-grzelak]

  * Add ReflectionFormula block (inside Speech block click use Reflection and then new switch use Formula)
  * Handle formula reflections during answering
- [CIAS-415] - Add UI to user list  (#221) [Michał Śnieć, msniec]

  * Add UI to user table and navbar

  * Fix wrong opacity

  * Remove dropdown user list content

  * Code review changes
- [Cias-447] - Connect Invite to start intervention panel with backend
  (#214) [Jakub Zygmunt]

  * Connect UI with backend

  * Add actions for resend loading

  * Fix test

  * Fix saga import

  * Fix imports

  * CR changes

  * CR changes
- [CIAS-452] - Enhance UI of formula cases (#215) [Michał Śnieć, msniec]

  * Enhance UI of formula cases

  * Add info about available operators

  * Code review changes
- [CIAS-409] - Add resetting password (#217) [Piotr Sokoliński]

  * WIP:reset password

  * add reducers and sagas for requests

  * fix snapshot

  * add request to reset password

  * delete console.log
- Add Sentry to the project (#219) [michal-grzelak]

  * Add Sentry to the project
- [CIAS-457] - Better handling of some special chars in screen titles
  (#216) [Jakub Zygmunt]

  * Fix htmlToPlainText function

  * Change htmlToPlainText function

  * Use lodash in htmlToPlainText function
- [CIAS-477] Fix ServiceWorker caching functionality (#212) [michal-
  grzelak]
- [CIAS-474] - Improve wording for scheduling the next session (#211)
  [Jakub Zygmunt]

  * Change wording

  * Update snapshots
- Fix multiple duplication issue (#208) [Michał Śnieć, msniec]

  * Fix multiple duplication issue

  * Code review change

  * Fix lint issue
- Disable logged user in send copy to reasercher (#209) [Michał Śnieć,
  msniec]
- Fix typo (#207) [Michał Śnieć, msniec]

  * Fix typo

  * Fix snapshot
- Change filter buttons colors (#204) [Jakub Zygmunt, msniec]
- Fix fetch session questions (#205) [Jakub Zygmunt]

  * Fix fetch session questions

  * Code simplification
- [CIAS-365] - Add requests to user profile (#198) [Piotr Sokoliński,
  PiotrSokoliński]

  * add password error

  * WIP: user details requests

  * WIP: add more user actions

  * add requests to display user

  * fix navbar avatar

  * CR fixes
- [CIAS-454] - Fix fetch questions for the initial selected session
  (#203) [Jakub Zygmunt]

  * Fix fetch questions for initia selected session

  * Code simplification
- [CIAS-406] - Connect sending dates UI with backend (#193) [Jakub
  Zygmunt]

  * Add update scheduling action

  * Improve UI styles

  * Fix saga injection key

  * Connect UI with backend

  * Refactor selectOptionPlaceholder

  * Change selectOptionPlaceholder to string

  * Fix fontSize

  * Change saga key

  * CR changes

  * Update snapshots

  * Fix tests

  * Turning on the UI on prod

  * Fix test
- Fix bug (#202) [Jakub Zygmunt]
- [CIAS-450] Create Show Spectrum block along with Feedback screen
  creation (#201) [michal-grzelak]

  * Create Show Spectrum block along with Feedback screen creation

  * Fix Read Question not hiding in chooser if block present and add hiding of Show Spectrum block on chooser if block present

  * Restore Read Question animation select functionality
- Change initial text of slide (#200) [Michał Śnieć, msniec]
- [CIAS-40] Feedback screen (#177) [michal-grzelak]

  * Add Feedback Screen

  * Add Show Spectrum block for showing spectrum

  * Add logic for handling dynamic position for Feedback Screen
- Fix modals (#199) [Michał Śnieć, msniec]
- [CIAS-429] - Apply new UI changes (#197) [Michał Śnieć, msniec]

  * Apply new UI changes

  * FIxes

  * Code review changes

  * Fix snapshots
- [CIAS-411] - Refactor question reducer (#196) [Piotr Sokoliński]

  * refactor question reducer

  * fix lint

  * fix tests

  * check import and fix them

  * CR changes

  * change peedy to character

  * CR changes v2
- [CIAS-185] - Refactor problem tile options (#194) [Michał Śnieć, Piotr
  Sokoliński, msniec]

  * Refactor problem tile options

  * Code review changes
- [CIAS-396] - add pages to reset password (#192) [Piotr Sokoliński]

  [CIAS-396] - add pages to reset password (#192)
- [CIAS-383] - Add branching to the session (#181) [Jakub Zygmunt,
  Michał Śnieć, Michał Śnieć <michal.sniec@htdevelopers.com>    *
  [CIAS-344] - Add pause block (#167)    * Add pause block    * Code
  review changes    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * Fix copy in narrator settings
  (#169)    Co-authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>
  * [CIAS-348] - Add redirect on logo click (#170)    * Add redirect on
  logo click    * Fix wrong request url    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * [CIAS-325] - Refactor peedy
  position (#168)    Refactor peedy position    * Fix drag n drop ghost
  effect (#176)    * style register page (#174)    style register page
  * [CIAS-357] - Refactor retrieving character position (#172)
  Refactor and test retrieving character position    * [CIAS-349] - Fix
  styles in e-intervention view (#173)    * Remove button type from Text
  * Update snapshots    * Fix drag ghost effect    * Revert to last
  commit    Co-authored-by: msniec
  <45016936+msniec@users.noreply.github.com>    * [CIAS-350] - Fix hover
  on intervention tile (#179)    * Change hover to Tooltip    * Remove
  useless file    * Fix test    * Update snapshot    * Fix import    *
  Udpate snapshots    * Refactor Branching component    * Add reducer
  for interventionSettings    * Add saga    * [CIAS-316] - Connect
  access panel to backend (#175)    * Connect access panel to backend
  * Code review changes    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * Fix imports    * Add change
  formula status    * Fix return intervention name instead of id    *
  Change selector to problem    * Refector actions import    * Fix
  select current intervention    * Update snapshot    * Fix ShareBox
  test    * Disable current intervention    * [CIAS-355] - Add request
  to reorder sessions (#180)    * Add request to reoder sessions    *
  Fix snapshot    * Add correct order    * Set correct intetrvention
  position on creation    * Code review change    Co-authored-by: Michał
  Śnieć <michal.sniec@htdevelopers.com>    * [CIAS-390] Copy fixes
  (#183)    * Fix copy on Problem settings page    * Update snapshot
  * add information about character (#182)    Co-authored-by:
  PiotrSokoliński <piotr.sokolinski@htdevelopers.com>, PiotrSokoliński,
  PiotrSokoliński <piotr.sokolinski@htdevelopers.com>    * Fix hover bug
  (#185)    * Fix issue of function invoking when onMouseLeave    * Fix
  typo on Settings Page (#186)    * Add 100% width to dropdown    * Demo
  fixes (#188)    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * [CIAS-320] - Make question
  editable (#187)    * Make question editable    * Fix an issue    *
  Code review changes    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * Move dropdown    * Fix ellipsis
  text    * Update snapshots    * Fix current intervention badge when
  text is overflowed    * Reorder interventions from saga    * Fix
  selected intervention condition    * Remove height from
  StyledEllipsisText    * Update snapshots    * Fix questions dropdown
  loading    * Extract choose intervention function    * Refactor
  intervention branching reducer    Co-authored-by: Piotr Sokoliński
  <37448494+PiotrSokolinski@users.noreply.github.com>, michal-grzelak,
  msniec, msniec <45016936+msniec@users.noreply.github.com>    * Replace
  inject saga    * Fix wrong merge (#184)    * Fix wrong merge    * add
  font weight    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>]

  * fix use filter (#163)

  fix use filter (#163)

  * [CIAS-303] - Add empty screen (#166)

  Add empty screen for intervention

  * [CIAS-338] - Delay proceed action if animation is ongoing (#165)

  * Delay proceed action if animation is ongoing

  * Code review changes
- [CIAS-363/364] - Initial work on account settings (#178) [Piotr
  Sokoliński]

  Initial work on account settings
- Fix linter errors. [Michal Grzelak]
- Update snapshot. [Michal Grzelak]
- Hotfix resolve master conflictts (#191) [Jakub-Zygmunt, Jakub-Zygmunt,
  Michal Grzelak, Michal Grzelak <grzelakm@outlook.com>    * resolve
  conflicts    Co-authored-by: Piotr Sokoliński
  <37448494+PiotrSokolinski@users.noreply.github.com>, Michał Śnieć,
  Michał Śnieć, PiotrSokoliński, PiotrSokoliński, PiotrSokoliński,
  PiotrSokoliński <piotr.sokolinski@htdevelopers.com>    * [CIAS-272] -
  Edit question view with same style as fill view (#101)    * Fix Single
  Answer    * Space independent of position over question    * Fix Multi
  Answer    * Fix TextBox    * Fix Number Question    * Fix Grid
  Question    * Fix Visual Analog Scale Question    * Fix Visual Analog
  Scale Question    * Fix Url Question    * Fix Image Video Question
  * Update snapshots    * Fix placeholders in draggable mode    *
  [CIAS-234] - Change dashbord accoding to new UI (#103)    * Add labels
  without logic    * Add labels without logic    * Add filter logic    *
  Fix filter interventions with multiple criteria    * Refactor
  StatusFilter    * Remove uselessmessage    * Change label color if
  active    Co-authored-by: msniec
  <45016936+msniec@users.noreply.github.com>    * [CIAS-89] - Add users
  list (#104)    * Add users list    * Code review changes    * Fix
  tests    Co-authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>
  * Hide settings where there are no questions (#105)    * Hide settings
  where there are no questions    * FIx    * Code review changes    Co-
  authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>    *
  [CiAS-271] - Add preview for entire intervention (#102)    Add preview
  for entire intervention    * Refactor navbar (#106)    * Refactor
  navbar    * Fix snapshot    * Code review changes    * Remove not
  needed prop    * Fix tests    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * Change text in Speech block to
  array of strings    * Fix prop validation to string array    * Update
  index.html title tag    * Update filter function to remove whitespace
  strings    * Update Speech block instantiate method    * Handle array
  speech and changing between the urls    * Hide play button on focus
  * Add loading button for speech when text changes    * Import hooks
  from CharacterAnim to Edit implementation    * Make BodyAnimation
  fully working    * Make BodyAnimation fully use hook logic    * Remove
  animation dependency    * Handle speech block for preview    * Fix
  Speech onFinish glitch    * [CIAS-276] - Create special participant
  dashboard (#107)    * Define routes based on roles    * Fix routes
  * Add mock data dashboard view    * Remove admin option in participant
  view    * Add dashboard title    * Update tests    * Remove useless
  files    * Update snapshot    * Fix wrong merged file    * Add admin
  access to preview mode    * Refactor dashboard components    * Update
  snapshot    * Fix interventions filter    * Fix snapshots and code
  refactor    * Fix test snapshot    * Set correct navbar icon (#109)
  Co-authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>    * Fix
  scale values (#110)    * [CIAS-282] - Centering labels under visual
  anlogue scale (#111)    * Fix labels centered under component    *
  Refactor labels in edit mode    * Move label style to general.js    *
  Rename style    * [CIAS-283] Number input width and validation (#112)
  * Fix Column typo    * Add onValidation function for input    * Change
  input width and placeholder    * Display message on number validation
  error for NumberQuestion    * [CIAS-288] Continue button greyed out
  when answer is required and no answer provided (#113)    * Make
  Continue button greyed out when Question is required and there is no
  answer    * Fix PropTypes error in Grid and Textbox Questions    * Add
  indicator about intervention being saved (#114)    Co-authored-by:
  Michał Śnieć <michal.sniec@htdevelopers.com>    * Hotfix change
  background (#117)    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * [CIAS-284] - Session preview from
  current slide (#115)    * Add preview current slide    * Add reset
  intervention redux action    * Add reset intervention handler    *
  Restore AppSlider    * Refactor route    * Extract PreviewButton    *
  PreviewButton refactor    * Rename value prop    * [CIAS-285] - Add
  setting to show number in VisualAnalogueScale (#116)    * Add setting
  to show number in VisualAnalogueScale    * Dispay number dependant on
  setting for a reasercher    * Code review changes    Co-authored-by:
  Michał Śnieć <michal.sniec@htdevelopers.com>    * [CIAS-156] Read
  question at the beginning (#118)    * Extract instantiating block to
  utils    * Implement TTS generation from question    * Provide a logic
  for reading a from_question at the beginning    * Fix wrong prop types
  on PreviewButton (#120)    * Fix prop types validation error on edit
  page for Preview button on navbar    * [CIAS-293] Fix Quill blur event
  bug (#122)    * Fix Quill blur event being fired when clicking on the
  toolbar (BUG not fixed till today)    * Make Quill editor bubbles to
  have z-index property only when it is focused    * [CIAS-291] - Fix
  question image resize (#121)    * Fix image size in question    * Fix
  image width    * Update snapshot    * [HOTFIX] - Fix styles in quill
  (#123)    Fix styles in quill    * [CIAS-286] - Add possibility to
  preview on mobile (#119)    Add possibility to preview on mobile    *
  [CIAS-294] - Add logo to navbar (#126)    * Remove useless assets    *
  Add .env to .gitignore    * Add CIAS logo to navbar    * Update
  snapshot    * Remove .env from cache    * Imports refactor    *
  [CIAS-295] - Reloading question in preview mode (#128)    * Fix
  reloading question layout    * Remove useless statement    * Fix issue
  with undefined url request (#129)    * Request to undefined audio url
  is no longer made    * Cias 181 main (#125)    Refactor logic to
  handle interventions and sessions    * [CIAS-297] - List all
  interventions in a single inteview/topic/problem/study/poll (#130)
  * WIP multi-sessions    * Display and create multi interventions    *
  CR chanes    * add useFilter hook    * Display and create multi
  interventions (#124)    * Display and create multi interventions    *
  CR chanes    * CR chanegs    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * resolve conflicts    * change url
  pattern    * change intervention to interventions    * Add
  interventions list in ProblemDetails    * Fix tests    * Rename prop
  * fix lint and tests    * update snapshots    * Merge    * small fixes
  * small fixes    * Udpate snapshot    * CR changes    * Changes from
  CR    * Add useLayoutEffect    * Update snapshots    * Refactor
  imports    * Refactor imports    * Change problemId prop    * Add id
  prop in test    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>, msniec, msniec
  <45016936+msniec@users.noreply.github.com>    * [CIAS-302] - Fix
  fetchProblem (#132)    * Move useInjectSaga    * Inject Sagas with
  compose    * [CIAs-296] - Set correct peedy respondent position (#131)
  * Set correct peedy respondent position    * fix snaphots    * Fix
  spelling    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * [CIAS-277] - Add sharing pannel
  (#133)    add sharing panel    * hide edit features on narrator tab
  active    * CR changes    * CR changes v2    * fix lint    *
  [CIAS-300] - Add intervention list items actions (#136)    * Add
  intervention list actions    * Fix test    * Fix messages    * Change
  Column height value    * [CIAS-305] - Branching between interventions
  (#135)    * Add divider    * Add next session info    * Add branching
  interventions component    * Add branching layout    * Add tests    *
  Move messages to layout    * Fix imports    * Style variable picker
  * Code refactor    * Fix styles    * Fix next session styles    * Fix
  import    * Update snapshots    * CR changes    * Update snapshot    *
  Remove Fragment    * Change Dropdown to clickable    * Update snap
  * Remove wrong files    * [CIAS-301] - Fix peedy start position (#137)
  * Fix peedy start position    * CR chanegs    Co-authored-by: Michał
  Śnieć <michal.sniec@htdevelopers.com>    * fix scrolling on edit
  intervention page    * [CIAS-273] reflections (#142)    * Add
  Reflection-Speech block switching logic    * Add Reflection block    *
  Add get reflection data logic    * Add Reflections audio playing logic
  * Fix audio not playing when animation is turned off    * Fix bug with
  lottie animation remaining after changing screens when it is disabled
  * Add reflections in Reflection block    * Hide reflection when there
  is no text    * Update Question by proper index (prevent bug when
  update is not finished and user switches a Question)    * Update
  Speech/Reflection block layout according to new design    * Add
  Question filtering to display only possible types    * Fix case of
  block stopping when selecting answer during complex speech animation
  * Make list element text overflow ellipsis visible    * Fix Peedy
  Cancel button positioning    * [CIAS-318] - Hide unimplemented
  elements (#143)    * Add env var and statements    * Update snapshot
  * Move appStage    * Add extra object in answers creation (#146)
  Co-authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>    * fix
  useFilter (#145)    Co-authored-by: PiotrSokoliński
  <piotr.sokolinski@htdevelopers.com>, msniec
  <45016936+msniec@users.noreply.github.com>    Co-authored-by: Piotr
  Sokoliński <37448494+PiotrSokolinski@users.noreply.github.com>]

  * DEV -> MASTER (#148)

  * show floating button only on scroll (#100)
- Hotfix master merge (#190) [Jakub-Zygmunt, Jakub-Zygmunt, Michal
  Grzelak, Michal Grzelak <grzelakm@outlook.com>  * resolve conflicts  *
  Fix CI  * Fix snapshot  Co-authored-by: Piotr Sokoliński
  <37448494+PiotrSokolinski@users.noreply.github.com>, Michał Śnieć,
  Michał Śnieć, PiotrSokoliński, PiotrSokoliński, PiotrSokoliński,
  PiotrSokoliński <piotr.sokolinski@htdevelopers.com>  * [CIAS-272] -
  Edit question view with same style as fill view (#101)  * Fix Single
  Answer  * Space independent of position over question  * Fix Multi
  Answer  * Fix TextBox  * Fix Number Question  * Fix Grid Question  *
  Fix Visual Analog Scale Question  * Fix Visual Analog Scale Question
  * Fix Url Question  * Fix Image Video Question  * Update snapshots  *
  Fix placeholders in draggable mode  * [CIAS-234] - Change dashbord
  accoding to new UI (#103)  * Add labels without logic  * Add labels
  without logic  * Add filter logic  * Fix filter interventions with
  multiple criteria  * Refactor StatusFilter  * Remove uselessmessage  *
  Change label color if active  Co-authored-by: msniec
  <45016936+msniec@users.noreply.github.com>  * [CIAS-89] - Add users
  list (#104)  * Add users list  * Code review changes  * Fix tests  Co-
  authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>  * Hide
  settings where there are no questions (#105)  * Hide settings where
  there are no questions  * FIx  * Code review changes  Co-authored-by:
  Michał Śnieć <michal.sniec@htdevelopers.com>  * [CiAS-271] - Add
  preview for entire intervention (#102)  Add preview for entire
  intervention  * Refactor navbar (#106)  * Refactor navbar  * Fix
  snapshot  * Code review changes  * Remove not needed prop  * Fix tests
  Co-authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>  * Change
  text in Speech block to array of strings  * Fix prop validation to
  string array  * Update index.html title tag  * Update filter function
  to remove whitespace strings  * Update Speech block instantiate method
  * Handle array speech and changing between the urls  * Hide play
  button on focus  * Add loading button for speech when text changes  *
  Import hooks from CharacterAnim to Edit implementation  * Make
  BodyAnimation fully working  * Make BodyAnimation fully use hook logic
  * Remove animation dependency  * Handle speech block for preview  *
  Fix Speech onFinish glitch  * [CIAS-276] - Create special participant
  dashboard (#107)  * Define routes based on roles  * Fix routes  * Add
  mock data dashboard view  * Remove admin option in participant view  *
  Add dashboard title  * Update tests  * Remove useless files  * Update
  snapshot  * Fix wrong merged file  * Add admin access to preview mode
  * Refactor dashboard components  * Update snapshot  * Fix
  interventions filter  * Fix snapshots and code refactor  * Fix test
  snapshot  * Set correct navbar icon (#109)  Co-authored-by: Michał
  Śnieć <michal.sniec@htdevelopers.com>  * Fix scale values (#110)  *
  [CIAS-282] - Centering labels under visual anlogue scale (#111)  * Fix
  labels centered under component  * Refactor labels in edit mode  *
  Move label style to general.js  * Rename style  * [CIAS-283] Number
  input width and validation (#112)  * Fix Column typo  * Add
  onValidation function for input  * Change input width and placeholder
  * Display message on number validation error for NumberQuestion  *
  [CIAS-288] Continue button greyed out when answer is required and no
  answer provided (#113)  * Make Continue button greyed out when
  Question is required and there is no answer  * Fix PropTypes error in
  Grid and Textbox Questions  * Add indicator about intervention being
  saved (#114)  Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>  * Hotfix change background (#117)
  Co-authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>  *
  [CIAS-284] - Session preview from current slide (#115)  * Add preview
  current slide  * Add reset intervention redux action  * Add reset
  intervention handler  * Restore AppSlider  * Refactor route  * Extract
  PreviewButton  * PreviewButton refactor  * Rename value prop  *
  [CIAS-285] - Add setting to show number in VisualAnalogueScale (#116)
  * Add setting to show number in VisualAnalogueScale  * Dispay number
  dependant on setting for a reasercher  * Code review changes  Co-
  authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>  *
  [CIAS-156] Read question at the beginning (#118)  * Extract
  instantiating block to utils  * Implement TTS generation from question
  * Provide a logic for reading a from_question at the beginning  * Fix
  wrong prop types on PreviewButton (#120)  * Fix prop types validation
  error on edit page for Preview button on navbar  * [CIAS-293] Fix
  Quill blur event bug (#122)  * Fix Quill blur event being fired when
  clicking on the toolbar (BUG not fixed till today)  * Make Quill
  editor bubbles to have z-index property only when it is focused  *
  [CIAS-291] - Fix question image resize (#121)  * Fix image size in
  question  * Fix image width  * Update snapshot  * [HOTFIX] - Fix
  styles in quill (#123)  Fix styles in quill  * [CIAS-286] - Add
  possibility to preview on mobile (#119)  Add possibility to preview on
  mobile  * [CIAS-294] - Add logo to navbar (#126)  * Remove useless
  assets  * Add .env to .gitignore  * Add CIAS logo to navbar  * Update
  snapshot  * Remove .env from cache  * Imports refactor  * [CIAS-295] -
  Reloading question in preview mode (#128)  * Fix reloading question
  layout  * Remove useless statement  * Fix issue with undefined url
  request (#129)  * Request to undefined audio url is no longer made  *
  Cias 181 main (#125)  Refactor logic to handle interventions and
  sessions  * [CIAS-297] - List all interventions in a single
  inteview/topic/problem/study/poll (#130)  * WIP multi-sessions  *
  Display and create multi interventions  * CR chanes  * add useFilter
  hook  * Display and create multi interventions (#124)  * Display and
  create multi interventions  * CR chanes  * CR chanegs  Co-authored-by:
  Michał Śnieć <michal.sniec@htdevelopers.com>  * resolve conflicts  *
  change url pattern  * change intervention to interventions  * Add
  interventions list in ProblemDetails  * Fix tests  * Rename prop  *
  fix lint and tests  * update snapshots  * Merge  * small fixes  *
  small fixes  * Udpate snapshot  * CR changes  * Changes from CR  * Add
  useLayoutEffect  * Update snapshots  * Refactor imports  * Refactor
  imports  * Change problemId prop  * Add id prop in test  Co-authored-
  by: Michał Śnieć <michal.sniec@htdevelopers.com>, msniec, msniec
  <45016936+msniec@users.noreply.github.com>  * [CIAS-302] - Fix
  fetchProblem (#132)  * Move useInjectSaga  * Inject Sagas with compose
  * [CIAs-296] - Set correct peedy respondent position (#131)  * Set
  correct peedy respondent position  * fix snaphots  * Fix spelling  Co-
  authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>  *
  [CIAS-277] - Add sharing pannel (#133)  add sharing panel  * hide edit
  features on narrator tab active  * CR changes  * CR changes v2  * fix
  lint  * [CIAS-300] - Add intervention list items actions (#136)  * Add
  intervention list actions  * Fix test  * Fix messages  * Change Column
  height value  * [CIAS-305] - Branching between interventions (#135)  *
  Add divider  * Add next session info  * Add branching interventions
  component  * Add branching layout  * Add tests  * Move messages to
  layout  * Fix imports  * Style variable picker  * Code refactor  * Fix
  styles  * Fix next session styles  * Fix import  * Update snapshots  *
  CR changes  * Update snapshot  * Remove Fragment  * Change Dropdown to
  clickable  * Update snap  * Remove wrong files  * [CIAS-301] - Fix
  peedy start position (#137)  * Fix peedy start position  * CR chanegs
  Co-authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>  * fix
  scrolling on edit intervention page  * [CIAS-273] reflections (#142)
  * Add Reflection-Speech block switching logic  * Add Reflection block
  * Add get reflection data logic  * Add Reflections audio playing logic
  * Fix audio not playing when animation is turned off  * Fix bug with
  lottie animation remaining after changing screens when it is disabled
  * Add reflections in Reflection block  * Hide reflection when there is
  no text  * Update Question by proper index (prevent bug when update is
  not finished and user switches a Question)  * Update Speech/Reflection
  block layout according to new design  * Add Question filtering to
  display only possible types  * Fix case of block stopping when
  selecting answer during complex speech animation  * Make list element
  text overflow ellipsis visible  * Fix Peedy Cancel button positioning
  * [CIAS-318] - Hide unimplemented elements (#143)  * Add env var and
  statements  * Update snapshot  * Move appStage  * Add extra object in
  answers creation (#146)  Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>  * fix useFilter (#145)  Co-authored-
  by: PiotrSokoliński <piotr.sokolinski@htdevelopers.com>, msniec
  <45016936+msniec@users.noreply.github.com>  Co-authored-by: Piotr
  Sokoliński <37448494+PiotrSokolinski@users.noreply.github.com>]

  * DEV -> MASTER (#148)

  * show floating button only on scroll (#100)
- [CIAS-320] - Make question editable (#187) [Michał Śnieć, msniec]

  * Make question editable

  * Fix an issue

  * Code review changes
- Demo fixes (#188) [Michał Śnieć, msniec]
- Fix typo on Settings Page (#186) [michal-grzelak]
- Fix hover bug (#185) [michal-grzelak]

  * Fix issue of function invoking when onMouseLeave
- Fix wrong merge (#184) [Michał Śnieć, PiotrSokoliński, msniec]

  * Fix wrong merge

  * add font weight
- Add information about character (#182) [Piotr Sokoliński,
  PiotrSokoliński, msniec]
- [CIAS-390] Copy fixes (#183) [michal-grzelak]

  * Fix copy on Problem settings page

  * Update snapshot
- [CIAS-355] - Add request to reorder sessions (#180) [Michał Śnieć,
  msniec]

  * Add request to reoder sessions

  * Fix snapshot

  * Add correct order

  * Set correct intetrvention position on creation

  * Code review change
- [CIAS-316] - Connect access panel to backend (#175) [Michał Śnieć,
  msniec]

  * Connect access panel to backend

  * Code review changes
- [CIAS-350] - Fix hover on intervention tile (#179) [Jakub Zygmunt]

  * Change hover to Tooltip

  * Remove useless file

  * Fix test

  * Update snapshot

  * Fix import

  * Udpate snapshots
- [CIAS-349] - Fix styles in e-intervention view (#173) [Jakub Zygmunt,
  msniec]

  * Remove button type from Text

  * Update snapshots

  * Fix drag ghost effect

  * Revert to last commit
- [CIAS-357] - Refactor retrieving character position (#172) [Piotr
  Sokoliński]

  Refactor and test retrieving character position
- Style register page (#174) [Piotr Sokoliński]

  style register page
- Fix drag n drop ghost effect (#176) [Jakub Zygmunt]
- [CIAS-325] - Refactor peedy position (#168) [Piotr Sokoliński]

  Refactor peedy position
- [CIAS-348] - Add redirect on logo click (#170) [Michał Śnieć, msniec]

  * Add redirect on logo click

  * Fix wrong request url
- Fix copy in narrator settings (#169) [Michał Śnieć, msniec]
- [CIAS-344] - Add pause block (#167) [Michał Śnieć, msniec]

  * Add pause block

  * Code review changes
- [CIAS-338] - Delay proceed action if animation is ongoing (#165)
  [Michał Śnieć, msniec]

  * Delay proceed action if animation is ongoing

  * Code review changes
- [CIAS-303] - Add empty screen (#166) [Piotr Sokoliński]

  Add empty screen for intervention
- Fix use filter (#163) [Piotr Sokoliński]

  fix use filter (#163)
- Resolve conflicts. [PiotrSokoliński]
- Merge branch 'dev' [PiotrSokoliński]
- [CIAS-334] - Problem actions (#159) [Jakub Zygmunt]

  Problem actions
- Hide features (#161) [Piotr Sokoliński]

  hide features
- Fix get csv (#160) [Piotr Sokoliński]

  fix get csv
- Fix problem loading screen (#157) [Piotr Sokoliński]

  fix problem loading screen
- [Hotfix] - Avoid styles override in StyledButton (#158) [Jakub
  Zygmunt]

  * Add fix

  * Remove styles

  * Remove useless prop
- [CIAS-321] - Fix peedy positioning on researcher side (#156) [Piotr
  Sokoliński]

  Fix peedy positioning on researcher side
- [CIAS-189] - Possibility to close e-intervention in e-intervention
  settings (#155) [Jakub Zygmunt]

  * Add change status buttons

  * Fix saga

  * Add tests

  * Refactor buttons

  * Update snapshots

  * Remove useless Row

  * Remove useless i18n

  * CR changes
- [CIAS-324] - Add reorder to the narrator blocks (#154) [Piotr
  Sokoliński]

  Add reorder to the narrator blocks
- Update snapshots. [PiotrSokoliński]
- Fix problems error. [PiotrSokoliński]
- Improve error alert. [PiotrSokoliński]
- [CIAS-315] - Setting the session order (#152) [Jakub Zygmunt]

  * Add reorder - only cache

  * Update snapshot

  * Add holdTime attr
- [CIAS-299] - Add read question block type (#139) [msniec]

  Add read question block type
- [CIAS-313] - Session scheduling (#141) [Jakub Zygmunt]

  * Add InterventionSchedule component

  * Add utils.js and styled.js

  * Rename InterventionListBranching

  * Add option componenents

  * Add date picker

  * Fix tests

  * Fix date picker button styles

  * Update snapshots

  * Restore file

  * Fix imports

  * Fix package.json

  * Add global styles

  * Fix css import

  * Fix css import

  * Update snapshot

  * CR changes

  * Fix test

  * Add possibility to change schedule option

  * Update package-lock

  * CR changes
- [CIAS-153] - Add button to send csv request (#150) [Jakub Zygmunt]

  * Add csv saga action

  * Update snapshots

  * Fix imports

  * Fix selector

  * Remove useless redux code

  * CR changes

  * Fix import
- [CIAS-317] - Change UI according to new designs (#144) [Piotr
  Sokoliński]

  Change UI according to new designs
- FIx seeds not working (#151) [Michał Śnieć, msniec]
- [CIAS-323] - Make peedy start from bottom left corner of container
  (#149) [Michał Śnieć, msniec]

  * Make peedy start from bottom left corner of container

  * Code review changes

  * Fix bug with peedy setup
- [CIAS-147/CIAS-277] - Add link to intervention and add csv uploading
  (#138) [Michał Śnieć, Piotr Sokoliński, PiotrSokoliński]

  * add link to intervention and add csv uploading

  * fix tests

  * styles fixes

  * fix paddings in chips input

  * style changes according to the new UI
- [CIAS-319] - Fix question answer request (#147) [Jakub Zygmunt]

  * Fix answer question request

  * Fix previous value
- Fix useFilter (#145) [Piotr Sokoliński, PiotrSokoliński, msniec]
- Add extra object in answers creation (#146) [Michał Śnieć, msniec]
- [CIAS-318] - Hide unimplemented elements (#143) [Jakub Zygmunt]

  * Add env var and statements

  * Update snapshot

  * Move appStage
- [CIAS-273] reflections (#142) [michal-grzelak]

  * Add Reflection-Speech block switching logic

  * Add Reflection block

  * Add get reflection data logic

  * Add Reflections audio playing logic

  * Fix audio not playing when animation is turned off

  * Fix bug with lottie animation remaining after changing screens when it is disabled

  * Add reflections in Reflection block

  * Hide reflection when there is no text

  * Update Question by proper index (prevent bug when update is not finished and user switches a Question)

  * Update Speech/Reflection block layout according to new design

  * Add Question filtering to display only possible types

  * Fix case of block stopping when selecting answer during complex speech animation

  * Make list element text overflow ellipsis visible

  * Fix Peedy Cancel button positioning
- Fix scrolling on edit intervention page. [PiotrSokoliński]
- [CIAS-301] - Fix peedy start position (#137) [Michał Śnieć, msniec]

  * Fix peedy start position

  * CR chanegs
- [CIAS-305] - Branching between interventions (#135) [Jakub Zygmunt]

  * Add divider

  * Add next session info

  * Add branching interventions component

  * Add branching layout

  * Add tests

  * Move messages to layout

  * Fix imports

  * Style variable picker

  * Code refactor

  * Fix styles

  * Fix next session styles

  * Fix import

  * Update snapshots

  * CR changes

  * Update snapshot

  * Remove Fragment

  * Change Dropdown to clickable

  * Update snap

  * Remove wrong files
- [CIAS-300] - Add intervention list items actions (#136) [Jakub
  Zygmunt]

  * Add intervention list actions

  * Fix test

  * Fix messages

  * Change Column height value
- Fix lint. [PiotrSokoliński]
- CR changes v2. [PiotrSokoliński]
- CR changes. [PiotrSokoliński]
- Hide edit features on narrator tab active. [PiotrSokoliński]
- [CIAS-277] - Add sharing pannel (#133) [Piotr Sokoliński]

  add sharing panel
- [CIAs-296] - Set correct peedy respondent position (#131) [Michał
  Śnieć, msniec]

  * Set correct peedy respondent position

  * fix snaphots

  * Fix spelling
- [CIAS-302] - Fix fetchProblem (#132) [Jakub Zygmunt]

  * Move useInjectSaga

  * Inject Sagas with compose
- [CIAS-297] - List all interventions in a single
  inteview/topic/problem/study/poll (#130) [Jakub Zygmunt, Michał Śnieć
  <michal.sniec@htdevelopers.com>    * resolve conflicts    * change url
  pattern    * change intervention to interventions    * Add
  interventions list in ProblemDetails    * Fix tests    * Rename prop
  * fix lint and tests    * update snapshots    * Merge    * small fixes
  * small fixes    * Udpate snapshot    * CR changes    * Changes from
  CR    * Add useLayoutEffect    * Update snapshots    * Refactor
  imports    * Refactor imports    * Change problemId prop    * Add id
  prop in test    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>, PiotrSokoliński, msniec]

  * WIP multi-sessions

  * Display and create multi interventions

  * CR chanes

  * add useFilter hook

  * Display and create multi interventions (#124)

  * Display and create multi interventions

  * CR chanes

  * CR chanegs
- Cias 181 main (#125) [Piotr Sokoliński]

  Refactor logic to handle interventions and sessions
- Fix issue with undefined url request (#129) [michal-grzelak]

  * Request to undefined audio url is no longer made
- [CIAS-295] - Reloading question in preview mode (#128) [Jakub Zygmunt]

  * Fix reloading question layout

  * Remove useless statement
- [CIAS-294] - Add logo to navbar (#126) [Jakub Zygmunt]

  * Remove useless assets

  * Add .env to .gitignore

  * Add CIAS logo to navbar

  * Update snapshot

  * Remove .env from cache

  * Imports refactor
- [CIAS-286] - Add possibility to preview on mobile (#119) [Piotr
  Sokoliński]

  Add possibility to preview on mobile
- [HOTFIX] - Fix styles in quill (#123) [Piotr Sokoliński]

  Fix styles in quill
- [CIAS-291] - Fix question image resize (#121) [Jakub Zygmunt]

  * Fix image size in question

  * Fix image width

  * Update snapshot
- [CIAS-293] Fix Quill blur event bug (#122) [michal-grzelak]

  * Fix Quill blur event being fired when clicking on the toolbar (BUG not fixed till today)

  * Make Quill editor bubbles to have z-index property only when it is focused
- Fix wrong prop types on PreviewButton (#120) [michal-grzelak]

  * Fix prop types validation error on edit page for Preview button on navbar
- [CIAS-156] Read question at the beginning (#118) [michal-grzelak]

  * Extract instantiating block to utils

  * Implement TTS generation from question

  * Provide a logic for reading a from_question at the beginning
- [CIAS-285] - Add setting to show number in VisualAnalogueScale (#116)
  [Michał Śnieć, msniec]

  * Add setting to show number in VisualAnalogueScale

  * Dispay number dependant on setting for a reasercher

  * Code review changes
- [CIAS-284] - Session preview from current slide (#115) [Jakub Zygmunt]

  * Add preview current slide

  * Add reset intervention redux action

  * Add reset intervention handler

  * Restore AppSlider

  * Refactor route

  * Extract PreviewButton

  * PreviewButton refactor

  * Rename value prop
- Hotfix change background (#117) [Michał Śnieć, msniec]
- Add indicator about intervention being saved (#114) [Michał Śnieć,
  msniec]
- [CIAS-288] Continue button greyed out when answer is required and no
  answer provided (#113) [michal-grzelak]

  * Make Continue button greyed out when Question is required and there is no answer

  * Fix PropTypes error in Grid and Textbox Questions
- [CIAS-283] Number input width and validation (#112) [michal-grzelak]

  * Fix Column typo

  * Add onValidation function for input

  * Change input width and placeholder

  * Display message on number validation error for NumberQuestion
- [CIAS-282] - Centering labels under visual anlogue scale (#111) [Jakub
  Zygmunt]

  * Fix labels centered under component

  * Refactor labels in edit mode

  * Move label style to general.js

  * Rename style
- Fix scale values (#110) [Jakub Zygmunt]
- Set correct navbar icon (#109) [Michał Śnieć, msniec]
- [CIAS-276] - Create special participant dashboard (#107) [Jakub
  Zygmunt]

  * Define routes based on roles

  * Fix routes

  * Add mock data dashboard view

  * Remove admin option in participant view

  * Add dashboard title

  * Update tests

  * Remove useless files

  * Update snapshot

  * Fix wrong merged file

  * Add admin access to preview mode

  * Refactor dashboard components

  * Update snapshot

  * Fix interventions filter

  * Fix snapshots and code refactor

  * Fix test snapshot
- Merge pull request #108 from HTD-Health/CIAS-177_TTS. [michal-grzelak]

  [CIAS-177] TTS
- Fix Speech onFinish glitch. [Michal Grzelak]
- Handle speech block for preview. [Michal Grzelak]
- Remove animation dependency. [Michal Grzelak]
- Make BodyAnimation fully use hook logic. [Michal Grzelak]
- Make BodyAnimation fully working. [Michal Grzelak]
- Import hooks from CharacterAnim to Edit implementation. [Michal
  Grzelak]
- Add loading button for speech when text changes. [Michal Grzelak]
- Hide play button on focus. [Michal Grzelak]
- Handle array speech and changing between the urls. [Michal Grzelak]
- Update Speech block instantiate method. [Michal Grzelak]
- Update filter function to remove whitespace strings. [Michal Grzelak]
- Update index.html title tag. [Michal Grzelak]
- Fix prop validation to string array. [Michal Grzelak]
- Change text in Speech block to array of strings. [Michal Grzelak]
- Refactor navbar (#106) [Michał Śnieć, msniec]

  * Refactor navbar

  * Fix snapshot

  * Code review changes

  * Remove not needed prop

  * Fix tests
- [CiAS-271] - Add preview for entire intervention (#102) [Piotr
  Sokoliński]

  Add preview for entire intervention
- Hide settings where there are no questions (#105) [Michał Śnieć,
  msniec]

  * Hide settings where there are no questions

  * FIx

  * Code review changes
- [CIAS-89] - Add users list (#104) [Michał Śnieć, msniec]

  * Add users list

  * Code review changes

  * Fix tests
- [CIAS-234] - Change dashbord accoding to new UI (#103) [Jakub-Zygmunt,
  msniec]

  * Add labels without logic

  * Add labels without logic

  * Add filter logic

  * Fix filter interventions with multiple criteria

  * Refactor StatusFilter

  * Remove uselessmessage

  * Change label color if active
- [CIAS-272] - Edit question view with same style as fill view (#101)
  [Jakub-Zygmunt]

  * Fix Single Answer

  * Space independent of position over question

  * Fix Multi Answer

  * Fix TextBox

  * Fix Number Question

  * Fix Grid Question

  * Fix Visual Analog Scale Question

  * Fix Visual Analog Scale Question

  * Fix Url Question

  * Fix Image Video Question

  * Update snapshots

  * Fix placeholders in draggable mode
- Show floating button only on scroll (#100) [Piotr Sokoliński,
  PiotrSokoliński]
- DEV -> MASTER (#148) [Jakub-Zygmunt, Michal Grzelak, Michał Śnieć,
  PiotrSokoliński, PiotrSokoliński, PiotrSokoliński
  <piotr.sokolinski@htdevelopers.com>    * [CIAS-272] - Edit question
  view with same style as fill view (#101)    * Fix Single Answer    *
  Space independent of position over question    * Fix Multi Answer    *
  Fix TextBox    * Fix Number Question    * Fix Grid Question    * Fix
  Visual Analog Scale Question    * Fix Visual Analog Scale Question
  * Fix Url Question    * Fix Image Video Question    * Update snapshots
  * Fix placeholders in draggable mode    * [CIAS-234] - Change dashbord
  accoding to new UI (#103)    * Add labels without logic    * Add
  labels without logic    * Add filter logic    * Fix filter
  interventions with multiple criteria    * Refactor StatusFilter    *
  Remove uselessmessage    * Change label color if active    Co-
  authored-by: msniec <45016936+msniec@users.noreply.github.com>    *
  [CIAS-89] - Add users list (#104)    * Add users list    * Code review
  changes    * Fix tests    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * Hide settings where there are no
  questions (#105)    * Hide settings where there are no questions    *
  FIx    * Code review changes    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * [CiAS-271] - Add preview for
  entire intervention (#102)    Add preview for entire intervention    *
  Refactor navbar (#106)    * Refactor navbar    * Fix snapshot    *
  Code review changes    * Remove not needed prop    * Fix tests    Co-
  authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>    * Change
  text in Speech block to array of strings    * Fix prop validation to
  string array    * Update index.html title tag    * Update filter
  function to remove whitespace strings    * Update Speech block
  instantiate method    * Handle array speech and changing between the
  urls    * Hide play button on focus    * Add loading button for speech
  when text changes    * Import hooks from CharacterAnim to Edit
  implementation    * Make BodyAnimation fully working    * Make
  BodyAnimation fully use hook logic    * Remove animation dependency
  * Handle speech block for preview    * Fix Speech onFinish glitch    *
  [CIAS-276] - Create special participant dashboard (#107)    * Define
  routes based on roles    * Fix routes    * Add mock data dashboard
  view    * Remove admin option in participant view    * Add dashboard
  title    * Update tests    * Remove useless files    * Update snapshot
  * Fix wrong merged file    * Add admin access to preview mode    *
  Refactor dashboard components    * Update snapshot    * Fix
  interventions filter    * Fix snapshots and code refactor    * Fix
  test snapshot    * Set correct navbar icon (#109)    Co-authored-by:
  Michał Śnieć <michal.sniec@htdevelopers.com>    * Fix scale values
  (#110)    * [CIAS-282] - Centering labels under visual anlogue scale
  (#111)    * Fix labels centered under component    * Refactor labels
  in edit mode    * Move label style to general.js    * Rename style
  * [CIAS-283] Number input width and validation (#112)    * Fix Column
  typo    * Add onValidation function for input    * Change input width
  and placeholder    * Display message on number validation error for
  NumberQuestion    * [CIAS-288] Continue button greyed out when answer
  is required and no answer provided (#113)    * Make Continue button
  greyed out when Question is required and there is no answer    * Fix
  PropTypes error in Grid and Textbox Questions    * Add indicator about
  intervention being saved (#114)    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * Hotfix change background (#117)
  Co-authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>    *
  [CIAS-284] - Session preview from current slide (#115)    * Add
  preview current slide    * Add reset intervention redux action    *
  Add reset intervention handler    * Restore AppSlider    * Refactor
  route    * Extract PreviewButton    * PreviewButton refactor    *
  Rename value prop    * [CIAS-285] - Add setting to show number in
  VisualAnalogueScale (#116)    * Add setting to show number in
  VisualAnalogueScale    * Dispay number dependant on setting for a
  reasercher    * Code review changes    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * [CIAS-156] Read question at the
  beginning (#118)    * Extract instantiating block to utils    *
  Implement TTS generation from question    * Provide a logic for
  reading a from_question at the beginning    * Fix wrong prop types on
  PreviewButton (#120)    * Fix prop types validation error on edit page
  for Preview button on navbar    * [CIAS-293] Fix Quill blur event bug
  (#122)    * Fix Quill blur event being fired when clicking on the
  toolbar (BUG not fixed till today)    * Make Quill editor bubbles to
  have z-index property only when it is focused    * [CIAS-291] - Fix
  question image resize (#121)    * Fix image size in question    * Fix
  image width    * Update snapshot    * [HOTFIX] - Fix styles in quill
  (#123)    Fix styles in quill    * [CIAS-286] - Add possibility to
  preview on mobile (#119)    Add possibility to preview on mobile    *
  [CIAS-294] - Add logo to navbar (#126)    * Remove useless assets    *
  Add .env to .gitignore    * Add CIAS logo to navbar    * Update
  snapshot    * Remove .env from cache    * Imports refactor    *
  [CIAS-295] - Reloading question in preview mode (#128)    * Fix
  reloading question layout    * Remove useless statement    * Fix issue
  with undefined url request (#129)    * Request to undefined audio url
  is no longer made    * Cias 181 main (#125)    Refactor logic to
  handle interventions and sessions    * [CIAS-297] - List all
  interventions in a single inteview/topic/problem/study/poll (#130)
  * WIP multi-sessions    * Display and create multi interventions    *
  CR chanes    * add useFilter hook    * Display and create multi
  interventions (#124)    * Display and create multi interventions    *
  CR chanes    * CR chanegs    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * resolve conflicts    * change url
  pattern    * change intervention to interventions    * Add
  interventions list in ProblemDetails    * Fix tests    * Rename prop
  * fix lint and tests    * update snapshots    * Merge    * small fixes
  * small fixes    * Udpate snapshot    * CR changes    * Changes from
  CR    * Add useLayoutEffect    * Update snapshots    * Refactor
  imports    * Refactor imports    * Change problemId prop    * Add id
  prop in test    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>, msniec, msniec
  <45016936+msniec@users.noreply.github.com>    * [CIAS-302] - Fix
  fetchProblem (#132)    * Move useInjectSaga    * Inject Sagas with
  compose    * [CIAs-296] - Set correct peedy respondent position (#131)
  * Set correct peedy respondent position    * fix snaphots    * Fix
  spelling    Co-authored-by: Michał Śnieć
  <michal.sniec@htdevelopers.com>    * [CIAS-277] - Add sharing pannel
  (#133)    add sharing panel    * hide edit features on narrator tab
  active    * CR changes    * CR changes v2    * fix lint    *
  [CIAS-300] - Add intervention list items actions (#136)    * Add
  intervention list actions    * Fix test    * Fix messages    * Change
  Column height value    * [CIAS-305] - Branching between interventions
  (#135)    * Add divider    * Add next session info    * Add branching
  interventions component    * Add branching layout    * Add tests    *
  Move messages to layout    * Fix imports    * Style variable picker
  * Code refactor    * Fix styles    * Fix next session styles    * Fix
  import    * Update snapshots    * CR changes    * Update snapshot    *
  Remove Fragment    * Change Dropdown to clickable    * Update snap
  * Remove wrong files    * [CIAS-301] - Fix peedy start position (#137)
  * Fix peedy start position    * CR chanegs    Co-authored-by: Michał
  Śnieć <michal.sniec@htdevelopers.com>    * fix scrolling on edit
  intervention page    * [CIAS-273] reflections (#142)    * Add
  Reflection-Speech block switching logic    * Add Reflection block    *
  Add get reflection data logic    * Add Reflections audio playing logic
  * Fix audio not playing when animation is turned off    * Fix bug with
  lottie animation remaining after changing screens when it is disabled
  * Add reflections in Reflection block    * Hide reflection when there
  is no text    * Update Question by proper index (prevent bug when
  update is not finished and user switches a Question)    * Update
  Speech/Reflection block layout according to new design    * Add
  Question filtering to display only possible types    * Fix case of
  block stopping when selecting answer during complex speech animation
  * Make list element text overflow ellipsis visible    * Fix Peedy
  Cancel button positioning    * [CIAS-318] - Hide unimplemented
  elements (#143)    * Add env var and statements    * Update snapshot
  * Move appStage    * Add extra object in answers creation (#146)
  Co-authored-by: Michał Śnieć <michal.sniec@htdevelopers.com>    * fix
  useFilter (#145)    Co-authored-by: PiotrSokoliński
  <piotr.sokolinski@htdevelopers.com>, msniec
  <45016936+msniec@users.noreply.github.com>    Co-authored-by: Piotr
  Sokoliński <37448494+PiotrSokolinski@users.noreply.github.com>]

  * show floating button only on scroll (#100)
- [CIAS-266] - Display correct intervention status (#97) [Michał Śnieć,
  msniec]

  * Display correct intervention status

  * I18n messages

  * Remove console.log

  * Code review changes
- Change favicon size (#98) [Michał Śnieć, msniec]
- [CIAS-265] - Add interventions filtering (#96) [Michał Śnieć, msniec]

  * Add interventions filtering

  * Remove not needed package
- [CIAS-260] - Add link to intervention (#95) [Piotr Sokoliński]

  add link to intervention
- [CIAS-248] - Proceed button depending on settings (#89) [Jakub-
  Zygmunt, msniec]

  * Add proceed button statement

  * Fix GridAnswer update prev state

  * Clean code

  * Use isNullOrUndefined function
- Fix animation preview and replacing character. [PiotrSokoliński]
- Add favicon (#94) [Michał Śnieć, msniec]
- Accept shorter YT URL (#92) [Michał Śnieć, msniec]
- [CIAS-262] - Move analogue scale description to the outside (#91)
  [Michał Śnieć, msniec]

  * Move anologue scale description to the outside

  * Increase margin
- Change question to screen (#88) [Michał Śnieć, msniec]
- [CIAS-254] - GridAnswer unification (#86) [Jakub-Zygmunt]

  * Fix grid view

  * Fix table scrolling
- Make peedy stay in parent container (#87) [Michał Śnieć, msniec]

  * Make peedy stay in parent container

  * Code review changes
- [CIAS-250] - Handle required setting on respondent screen (#85)
  [Michał Śnieć, PiotrSokoliński, msniec]

  * WIP

  * Finish wok with required setting

  * Remove console log

  * enlarge logo

  * enlarge logo on login page
- Fix border input on error. [PiotrSokoliński]
- [CIAS-242] - Unification question edition aswering (#74) [Jakub-
  Zygmunt]

  * Change answer container from question edit panel

  * Change background-color

  * Remove hardcoded styles

  * Refactor answer and edit panel

  * Fix Peddy position on first render

  * Code refactor

  * Update snapshots

  * Fix textAlign prop

  * Fix paddings

  * Fix UrlPreview width

  * Update snapshots

  * Change back button message

  * Fix i18n and buttons

  * Fix TextBox width

  * Revert changes

  * Remove variable check before update

  * Fix components styling

  * Fix variables check

  * Fix GridQuestion width

  * Fix answer page margins
- [CIAS-251] Navbar dropdown styling (#83) [michal-grzelak]

  * Style navbar dropdown

  * Add outsideClickHandler to navbar dropdown

  * Add bold on hover

  * Make dropdown appear on user name and lastname click
- Style login page (#82) [Piotr Sokoliński]

  Style login page
- Fix ui without interventions (#78) [Michał Śnieć, msniec]
- Login on enter (#81) [Michał Śnieć, msniec]
- [CIAS-247] Add displaying of image and video on Answer Page (#80)
  [michal-grzelak]

  * Add diplaying of image and video on Answer Page

  * Change width of video player on Answer Page

  * Extract aspect ratio to const
- [CIAS-246] - Remove autosize from the navbar (#79) [Michał Śnieć,
  msniec]

  * Remove autosize from navbar

  * Code review changes
- [CIAS-228] - Cloning question returns error (#70) [Jakub-Zygmunt]

  * Fix check variable uniqueness per question

  * Update snapshot

  * Update snapshot

  * Fix duplicate question redux

  * Add question copy error alert

  * Remove loader from copy
- Remove console logs. [PiotrSokoliński]
- Hide elements on peddy draggable. [PiotrSokoliński]
- Some system fixes. [PiotrSokoliński]
- [CIAS-127] - Animate head (#73) [Piotr Sokoliński]

  Animate head
- [CIAS-243] - Remove username field (#75) [Michał Śnieć, msniec]

  * Remove username field

  * Update snapshot
- CR changes. [PiotrSokoliński]
- Allow to delete block. [PiotrSokoliński]
- Fix useMemo function and its dependency array. [Michal Grzelak]
- Optimize SpeechBlock options with useMemo. [Michal Grzelak]
- Optimize animation loading in audioHelper. [Michal Grzelak]
- Clean audio on speech end. [Michal Grzelak]
- Fix display issue with announce and search animations. [Michal
  Grzelak]
- Add all animations for speech. [Michal Grzelak]
- Handle reverse animation for speech. [Michal Grzelak]
- Handle initial and changing of speech animation. [Michal Grzelak]
- Handle loading all speech animations. [Michal Grzelak]
- Add initial speech animation changing. [Michal Grzelak]
- Add contributors in README. [Michal Grzelak]
- Update webpack dotenv config for dev and prod. [Michal Grzelak]
- Move dotenv from dev to base webpack. [Michal Grzelak]
- Remove systemvars from webpack. [Michal Grzelak]
- Procfile rename. [Michal Grzelak]
- Add procfile and restore .env. [Michal Grzelak]
- Remove .env. [Michal Grzelak]
- Add systemvars to dotenv. [Michal Grzelak]
- Restore heroku postbuild. [Michal Grzelak]
- Update heroku postbuild. [Michal Grzelak]
- Remove dotenv from prod. [Michal Grzelak]
- Set dotenv systemvars to true for prod. [Michal Grzelak]
- Update HomePage loader logic. [Michal Grzelak]
- Fix TargetQuestionChooser tests. [Michal Grzelak]
- Remove unnecessary intervention list request and refactor
  displayPatternTargetText. [Michal Grzelak]
- Make variable list tile display as plain text. [Michal Grzelak]
- Add missing safety check for intervention target index. [Michal
  Grzelak]
- Fix NextScreen selection and proper name in the dropdown displaying.
  [Michal Grzelak]
- Fetch interventions in the branching tab. [Michal Grzelak]
- Add selecting intervention as a target case value. [Michal Grzelak]
- * Restore missing update formula case * Change width of target
  ArrowDropdown * Update onClick update formula object structure.
  [Michal Grzelak]
- Fix the structure to match with backend and extract htmlToText method.
  [Michal Grzelak]
- [CIAS-128] - Animate Peedy for respondent (#58) [msniec]

  Animate Peedy for respondent
- [CIAS-218] - Fix previous question button during answering
  intervention (#64) [Jakub-Zygmunt]

  * Enable previous question for SingleQuestion

  * Fix GridQuestion previous case

  * Fix number previous case

  * Fix SingleQuestion check answer

  * Fix condition statement

  * Fix enable user to acces previous question without answer

  * Fix name -> var: name

  * Replace delete with omit
- Fix disable components for editor (#65) [Jakub-Zygmunt]
- CR changes. [PiotrSokoliński]
- Fix some issues after internal review. [PiotrSokoliński]
- Refactor alerts to not use unnecessary reducer. [PiotrSokoliński]
- [CIAS-204 & CIAS-205] add answer component question information and
  url (#57) [Jakub-Zygmunt]

  * Add number question answer component

  * Change variable to var

  * Add QuestionOption

  * Fix initial state

  * Fix number input validation

  * Remove right margin

  * Update snapshots

  * Change parameter source

  * Add information question answer case

  * Add url component

  * Add UrlPreview component

  * Add link preview component

  * Add url validator

  * Add link preview on edit page

  * Fix validator regex

  * Add overflow ellipsis

  * Fix UrlPreview title

  * Restore space between imports

  * Fix information continue case

  * Fix UrlPreview component

  * Fix package version

  * Fix validator statement return

  * Extract function

  * Fix link preview animation

  * Fix imports

  * Fix snapshots
- [CIAS-225] Animate speech (#60) [michal-grzelak]

  * Add initial version of speech animation

  * Change stop animation to as useEffect cleanup

  * Restore audio_url
- Restore audio_url. [Michal Grzelak]
- Change stop animation to as useEffect cleanup. [Michal Grzelak]
- Add initial version of speech animation. [Michal Grzelak]
- [CIAS-223]  - Add subtitle field (#56) [Piotr Sokoliński]

  add subtitle field
- Clear answer values when question type doesn't change (#61) [Michał
  Śnieć, msniec]
- Update snapshots. [PiotrSokoliński]
- Add requried toggle and proceed button. [PiotrSokoliński]
- [CIAS-208] - Reorder request (#53) [Piotr Sokoliński]

  Reorder request
- [CIAS-201] - add answer component question number (#52) [Jakub-
  Zygmunt]

  * Add number question answer component

  * Change variable to var

  * Add QuestionOption

  * Fix initial state

  * Fix number input validation

  * Remove right margin

  * Update snapshots

  * Change parameter source

  * Fix mr prop passing to ApprovableInput

  * Fix payload parse

  * Update snapshots

  * Fix parse value to string
- Position-fix. [Michał Śnieć]
- [CIAS-209] Run speech for respondent (#54) [michal-grzelak]

  * Change way of audio handling

  * Fix NoContent width bug

  * Fix AnswerPage Single and Multi Question to display HTML text

  * Add all types of block handling in CharacterAnim and separate them; prepare basic handling for speech block

  * Extend audio wrapper

  * Add initial Start button for AsnwerPage in order to allow autoplay of audio

  * Stop audio when changing questions

  * Handle starting intervention by reducer

  * Handle settings for voice in AnswerPage

  * Handle initial block logic

  * Edit test generators to check for a container
- [CIAS-218] - Peedy move animation (#42) [Michał Śnieć, msniec]

  * Initial work witth peedy movement

  WIP

  WIP

  WIP

  WIP

  WIP

  * Set animation positions

  Fix snapshots

  * Code review changes

  * Code review changes
- [CIAS-203] - Add answer component question scale (#50) [Jakub Zygmunt,
  Jakub-Zygmunt]

  * Add multiple answer component

  * Use QuestionTypes instead of hardcoded strings

  * Remove console.log

  * Add multiple question component

  * Simplification of the code

  * Fix adding repetitive answers

  * Fix imports

  * Add answer scale question component

  * Add custom handle component

  * Fix tests

  * Fix imports

  * Refactor handle component

  * Fix slider tests

  * Code refactor
- [CIAS-200] - Add text box answer component (#51) [Jakub-Zygmunt]

  * Add text box answer component

  * Fix component prop
- Fix package.json. [PiotrSokoliński]
- CR chagnes. [PiotrSokoliński]
- Add body animations. [PiotrSokoliński]
- Add more animations. [PiotrSokoliński]
- Refactor approvable input. [Michal Grzelak]
- Make sure that tolltip always has max width of its content. [Michal
  Grzelak]
- Fix multi question update function. [Michal Grzelak]
- Fix variable typo. [Michal Grzelak]
- Restyle MultiQuestion for Quill. [Michal Grzelak]
- Fix radio button margin not updating and add transparent border to
  input. [Michal Grzelak]
- Make eslint disable prettier. [Michal Grzelak]
- Style Single line Question and fix Quill styling. [Michal Grzelak]
- Remove checks from Approvable Input and fix quill blur handle. [Michal
  Grzelak]
- Updat Question styles for Safari. [Michal Grzelak]
- Clamp 2nd line of Question title. [Michal Grzelak]
- Extract intervention reducer. [PiotrSokoliński]
- [CIAS-221] - Display intervention in dashboard (#45) [Michał Śnieć,
  msniec]

  * Display intervention in dashboard

  * Code review changes

  * Remove not needed imports
- Set alert dismiss id only when it exists. [Michal Grzelak]
- Refactor Register alert. [Michal Grzelak]
- Add auto alert dismiss. [Michal Grzelak]
- Add variable name validator for all types of questions. [Michal
  Grzelak]
- Add alerts reducer and display alert on duplicate variable name.
  [Michal Grzelak]
- [CIAS-202] - Add answer component question grid (#46) [Jakub Zygmunt,
  Jakub-Zygmunt]

  * Add multiple answer component

  * Use QuestionTypes instead of hardcoded strings

  * Remove console.log

  * Add multiple question component

  * Simplification of the code

  * Fix adding repetitive answers

  * Fix imports
- Add proper tests for loader. [Michal Grzelak]
- Refactor UrlQuestion. [Michal Grzelak]
- Fix Url Question not setting url. [Michal Grzelak]
- Make switch statement shorter => remove unnecessary code from switch.
  [Michal Grzelak]
- Fix Button styling for new Spinner styles. [Michal Grzelak]
- Style the spinner. [Michal Grzelak]
- Add loader for question list. [Michal Grzelak]
- Add loader component and add it to intervention page. [Michal Grzelak]
- Add loader for button during intervention creating. [Michal Grzelak]
- Remove temporary CreateIntervention page and move intervention
  creation to separate reducer and saga. [Michal Grzelak]
- [CIAS-130] - Add rich text editor (#39) [Michał Śnieć, msniec]

  * Add rich text editor

  * Code review changes

  * Code review changes

  * Change color to one from theme
- Add multiple answer component (#41) [Jakub Zygmunt, Jakub-Zygmunt]

  * Add multiple answer component

  * Use QuestionTypes instead of hardcoded strings

  * Remove console.log
- [CIAS-210]  - Display narrator to respondent (#38) [Piotr Sokoliński]

  Display narrator to respondent
- Set block color to grey when setting is disabled. [Michal Grzelak]
- Refactor Accordion (make color and labels independent => user can set
  own values) and move BlockTypes messages to global messages. [Michal
  Grzelak]
- Add audio wrapper and change button positioning technique. [Michal
  Grzelak]
- Add play button to speech block. [Michal Grzelak]
- Refactor block types => extract to separate component. [Michal
  Grzelak]
- Refactor Tabs => move to Tabs folder. [Michal Grzelak]
- [CIAS-171] - Add reordering of front side (#35) [Piotr Sokoliński]

  add reordering on front side
- Move Settings to BranchingTab. [Michal Grzelak]
- Return cached list on error when there is one. [Michal Grzelak]
- Change Spinner style to string interpolation. [Michal Grzelak]
- Add tests. [Michal Grzelak]
- Do not display Spinner when there is cached list. [Michal Grzelak]
- Add loader for intervention list. [Michal Grzelak]
- Make Spinner more generic => allow to adjust color. [Michal Grzelak]
- Refactor setter function and return to question chooser view after
  selecting selected intervention. [Michal Grzelak]
- Adjust badge to have possibility of solid bg. [Michal Grzelak]
- Add badge to intervention list and apply styles. [Michal Grzelak]
- Display basic intervention list. [Michal Grzelak]
- Create basic logic for displaying intervention list view in a dropdown
  chooser. [Michal Grzelak]
- [CIAS-195] - Add settings for each question (#34) [Piotr Sokoliński]

  Add settings for each question
- Design fixes (#32) [Michał Śnieć, msniec]
- [CIAS-150] - Answer intervention page (#29) [Michał Śnieć, msniec]

  * Initial work on answerr intervention page

  * Fix tests

  * Make answer page according to API

  * Code review changes

  * Fix snapshots
- [HOTFIX] Fix snapshots. [Michal Grzelak]
- Add tests for VAraibleChooser and TargetQuestionChooser. [Michal
  Grzelak]
- Add jest types to vs code intellisense. [Michal Grzelak]
- Remove default props from dropdown. [Michal Grzelak]
- Extract onClick logic to a function. [Michal Grzelak]
- Remove unused intervention variable. [Michal Grzelak]
- Remove styled.js from TargetQuestionChooser and VariableChooser.
  [Michal Grzelak]
- Remove global messages from default settings. [Michal Grzelak]
- Update snapshots. [Michal Grzelak]
- Change formula input to onBlur. [Michal Grzelak]
- Grey out not possible target Question (same question, next screen on
  last question etc.) [Michal Grzelak]
- Fix ArrowDropdown not opening when there are adjacent multiple
  elements. [Michal Grzelak]
- Remove default value assignment from MultiQuestion. [Michal Grzelak]
- Refactor outside click detection. [Michal Grzelak]
- Add maximum width for the variable chooser. [Michal Grzelak]
- Add no content display to VariableChooser. [Michal Grzelak]
- Add variable choosing from modal/select funcionality. [Michal Grzelak]
- Fix width error. [Michal Grzelak]
- Fix dropdown toggling and refactor code. [Michal Grzelak]
- Add basic target selection funcionality. [Michal Grzelak]
- Fix opacity and separate text opacity from background opacity. [Michal
  Grzelak]
- Add dropdown [WIP] [Michal Grzelak]
- Add displaying of cases, add possibility to remove case and to edit
  case matching value. [Michal Grzelak]
- Add new bin svg and polish some styles. [Michal Grzelak]
- Add possiblity to add new cases. [Michal Grzelak]
- Update snpashots. [Michal Grzelak]
- Add possibility to enter and update formula. [Michal Grzelak]
- Add i18n messages. [Michal Grzelak]
- Make value empty for grid. [Michal Grzelak]
- Add missing margin to Visual Analogue Scale. [Michal Grzelak]
- Fix snapshot test. [PiotrSokoliński]
- Update snapshots. [PiotrSokoliński]
- Add tests. [PiotrSokoliński]
- Add global checkbox for narrator globally. [PiotrSokoliński]
- Add checkboxes to toggle narrator globally. [PiotrSokoliński]
- Add settings page. [PiotrSokoliński]
- Initial work on general settings. [PiotrSokoliński]
- [CIAS-172] - Make login possible by email (#28) [Michał Śnieć, msniec]

  * Make login possible by email

  * Fix test
- [CIAS-148] - Register page (#26) [Michał Śnieć, msniec]

  * Initial work on register page

  * Fix tests

  * Fix HTTP method

  * Not required inputs

  * Remove console logs

  * Remove middle name field

  * Add information about created account

  * Code review changes
- [CIAS-166] - Editing intervention name (#27) [Piotr Sokoliński]

  Editing intervention name
- Update snapshot. [Michal Grzelak]
- Add max input width. [Michal Grzelak]
- Remove unnecessary justify. [Michal Grzelak]
- Fix Url tests. [Michal Grzelak]
- Fix CR comments. [Michal Grzelak]
- Fix merge issues. [Michal Grzelak]
- Fix test, update snapshots. [Michal Grzelak]
- Remove leftover code. [Michal Grzelak]
- Add padding for varaible inputs. [Michal Grzelak]
- Make ApprovableInput not break when placed not in Row. [Michal
  Grzelak]
- Update snapshot. [Michal Grzelak]
- Add variable duplicate value validation. [Michal Grzelak]
- Add null check. [Michal Grzelak]
- Update snapshot. [Michal Grzelak]
- Add Badge in the QuestionListItem. [Michal Grzelak]
- Add variable to VisualAnalogueScale. [Michal Grzelak]
- Add variable to UrlQuestion. [Michal Grzelak]
- Update Number Question with variable name. [Michal Grzelak]
- Add variable value and name to Grid Question. [Michal Grzelak]
- Remove variable component. [Michal Grzelak]
- Add variable to Textbox question. [Michal Grzelak]
- Fix SingleQuestion variable structure and export variable to another
  component (for settings purposes) [Michal Grzelak]
- Update test snapshots. [Michal Grzelak]
- Add global messages for question types. [Michal Grzelak]
- Update misleading constant name. [Michal Grzelak]
- Add UPDATE_VARIABLE constant to all components. [Michal Grzelak]
- Add globalMessages. [Michal Grzelak]
- Change the variable editing in Single Question and change structure of
  newly created Questions. [Michal Grzelak]
- Update snapshots. [Michal Grzelak]
- Fix input size changing by few px on focus. [Michal Grzelak]
- Remove variable name from answers in Single Question. [Michal Grzelak]
- Add variable name and value to Single and Multi Question types.
  [Michal Grzelak]
- Fix flickering issue caused by loadable. [Michal Grzelak]
- Add Badge component and BadgeInput. [Michal Grzelak]
- Add deleting questions. [PiotrSokoliński]
- WIP:deleting question. [PiotrSokoliński]
- Add copying. [PiotrSokoliński]
- Merge pull request #23 from HTD-Health/show-login-errors. [msniec]

  Show login erorrs
- Code review changes. [Michał Śnieć]
- Fix tests. [Michał Śnieć]
- Show login erorrs. [Michał Śnieć]
- Show login erorrs (#23) [Michał Śnieć, msniec]

  * Show login erorrs

  * Fix tests

  * Code review changes
- Merge pull request #22 from HTD-Health/CIAS-155. [msniec]

  [CIAS-155] - Add user dashboard
- Code review changes. [Michał Śnieć]
- Fix tests. [Michał Śnieć]
- Styling changes. [Michał Śnieć]
- Add user dashboard. [Michał Śnieć]
- Add url screen, change button to add question. [PiotrSokoliński]
- Fix some styles and add more possible animations. [PiotrSokoliński]
- Add initial animations. [PiotrSokoliński]
- CR changes. [PiotrSokoliński]
- Add and fix tests. [PiotrSokoliński]
- Add possibility to add narrator in top-left corner. [PiotrSokoliński]
- Update test snap. [Michal Grzelak]
- Merge fixes. [Michal Grzelak]
- Add addBlock option. [Michal Grzelak]
- Rename Step to Block. [Michal Grzelak]
- Add narrator block settings. [Michal Grzelak]
- Add step types object with color map. [Michal Grzelak]
- Add margin to a Collapse component. [Michal Grzelak]
- Fix test issue. [Michal Grzelak]
- Add Accordion component. [Michal Grzelak]
- Add possibility to add information screen. [PiotrSokoliński]
- Fix switching settings between questions. [PiotrSokoliński]
- [CIAS-132] - Prepare settings (#16) [Piotr Sokoliński,
  PiotrSokoliński]

  * remove select state from redux, fix margins

  * make gear icon click more ux friendly

  * add settings to video and image

  * fix lint and add tests
- [CIAS-41] Image screen (#13) [Piotr Sokoliński]

  Image screen
- [CIAS-17] question structure json (#14) [michal-grzelak]

  * Update structure of Question Data

  * Change size of settings sidebar

  * Add key props to questions

  * Add delete row/column to a grid question

  * Make bin visiblity only on table header hover, not for every cell

  * Remove spacing between button and table

  * Fix Visual Analogue Scale structure

  * Update Grid structure

  * Change variable/value to string from int [hotfix]

  * Add missing change from int to string in add column
- Add alt to image. [PiotrSokoliński]
- Add possbility to add video. [PiotrSokoliński]
- [CIAS-122] question settings (#12) [michal-grzelak]

  * Update uqestion list item according to designs

  * Add question settings toggling functionality

  * [WIP] Create base settings toggling funcionality

  * Add transition property

  * Remove unnecessary transitions

  * Add Switch component

  * Change regular to Text to H3

  * Update switch value assigning

  * Update test snapshot

  * Update params in update settings method

  * Change switch to use props value instead of function

  * Change mapDispatchToProps to object form instead of function

  * Change ternary to conditional rendering

  * Change Object.assign({}) to ES6 shallow copy

  * Remove unnecessary dispatchToProps

  * Add action.js for settings and use object shorthand property for mapDispatchToProps

  * Move settings from left to right side

  * Add animation to the sidebar
- Fix min-width. [PiotrSokoliński]
- Refactor media queries. [PiotrSokoliński]
- Add jsconfig file to redirect on absolute paths. [PiotrSokoliński]
- Change props order so that user can override default settings. [Michal
  Grzelak]
- Update snapshots and change input transparent border. [Michal Grzelak]
- Add VisualAnalogueQuestion screen. [Michal Grzelak]
- Add Slider library and component. [Michal Grzelak]
- Add Visual Analogue Scale qwuestion type. [Michal Grzelak]
- Rename StyledTR to StripedTR and add stripe placement props. [Michal
  Grzelak]
- Update snapshots. [Michal Grzelak]
- Update new grid question initial object. [Michal Grzelak]
- Add cache functionality for intervention. [Michal Grzelak]
- Update Grid Question component with add/update row and column
  functionality. [Michal Grzelak]
- Grid Question in progress. [Michal Grzelak]
- Add initial Grid Question component. [Michal Grzelak]
- Add basic Table component. [Michal Grzelak]
- Add Grid question type. [Michal Grzelak]
- Remove eslint indent rule, becasue of prettier conflict. [Michal
  Grzelak]
- Change single and multi answer input to be oneline. [Michal Grzelak]
- Delete config.yml. [Damian Skoneczny]
- Github Actions. [Damian Skoneczny]
- Merge pull request #6 from HTD-Health/CIAS-37_number_question.
  [michal-grzelak]

  [CIAS-37] Number question slide/screen
- Use missing parameter in new Question instantiating. [Michal Grzelak]
- Extract onBlur method. [Michal Grzelak]
- Extract on input change function. [Michal Grzelak]
- Extract new question message to intl. [Michal Grzelak]
- Slightly change pull request template. [Michal Grzelak]
- Rename question creation function. [Michal Grzelak]
- Style NumberQuestion component. [Michal Grzelak]
- Add keyboard types to input and add approvable regular input. [Michal
  Grzelak]
- Add numeric validator. [Michal Grzelak]
- Change question POST method to generate question in edit page and send
  that value. [Michal Grzelak]
- Remove unused constants. [Michal Grzelak]
- Add NumberQuestion handling on edit screen. [Michal Grzelak]
- Add NumberQuestion component. [Michal Grzelak]
- Add number question type and its list color. [Michal Grzelak]
- [CIAS-34] Update Textbox question constant to proper name. [Michal
  Grzelak]
- [CIAS-34] Rename constants to proper values. [Michal Grzelak]
- [CIAS-34] Finish textbox question and remove unnecessary. [Michal
  Grzelak]
- [CIAS-34] Add base Textbox question type page. [Michal Grzelak]
- [CIAS-34] Add placeholder to ApprovableInput. [Michal Grzelak]
- [CIAS-34] Add chooser toggle closing after creating a question and
  remove cursor pointer from question title. [Michal Grzelak]
- [CIAS-34] Remove unnecessary comments messages from single and multi
  questions. [Michal Grzelak]
- [CIAS-34] Add Textbox QuestionType. [Michal Grzelak]
- Remove redux-persist. [Michal Grzelak]
- Add mini persist functionality. [Michal Grzelak]
- Return API URL variable for base url. [Michal Grzelak]
- Hard set url. [Michal Grzelak]
- Hard set api url. [Michal Grzelak]
- Move Dotenv to dev webpack. [Michal Grzelak]
- Add console log for environment variable [TEST] [Michal Grzelak]
- Handle unauthorized log out. [Michal Grzelak]
- Add heroku post build. [Michal Grzelak]
- Add jsdoc to column width calculation. [Michal Grzelak]
- Fix double saga firing. [Michal Grzelak]
- Reorganize login page imports. [Michal Grzelak]
- Change react redux version, add logout dispatch on unauthorized.
  [Michal Grzelak]
- Change question structure in accordance with new backend update.
  [Michal Grzelak]
- Add axios interceptor. [Michal Grzelak]
- Reorganize imports. [Michal Grzelak]
- Export magic values to const variables. [Michal Grzelak]
- Update duplicate color on Circle and change email to username (backend
  change) [Michal Grzelak]
- Remove unnecessary file. [Michal Grzelak]
- Export breakpoints to global theme variables. [Michal Grzelak]
- Fix test errors. [Michal Grzelak]
- Rename button, add cursor pointer on hover. [Michal Grzelak]
- Add base for update question request. [Michal Grzelak]
- Code refactor. [Michal Grzelak]
- Add temporary intervention creattion funcionality and token
  assignment. [Michal Grzelak]
- Remove unused comments. [Michal Grzelak]
- Rename Create Intervention to EditIntervention. [Michal Grzelak]
- Add axios. [Michal Grzelak]
- Rename QuestionTypes to QuestionData. [Michal Grzelak]
- Add TextArea component. [Michal Grzelak]
- Create base Single and Multi questions. [Michal Grzelak]
- Add select question funcionality. [Michal Grzelak]
- Fix question positioning. [Michal Grzelak]
- Change redux state shape. [Michal Grzelak]
- Fix linter issue. [Michal Grzelak]
- Remove BaseIntervention. [Michal Grzelak]
- Update Intervention names and create question add box. [Michal
  Grzelak]
- Change app background to white, add hoverable box. [Michal Grzelak]
- Create base CreateInterventionPage. [Michal Grzelak]
- Add H3, Circle and Comment component, Update Row component and Log
  page for new styles. [Michal Grzelak]
- Update base component styles props. [Michal Grzelak]
- Update intervention models. [Michal Grzelak]
- Add Intervention models. [Michal Grzelak]
- Add fonts to global styles, add new components (Box, H1, Img) and add
  padding props. [Michal Grzelak]
- Add font assets. [Michal Grzelak]
- Add svg assets. [Michal Grzelak]
- Update Column width calculation formula and and breakpoints to  Login
  page. [Michal Grzelak]
- Remove lint error, rename align to flex and add media queries to
  Column component. [Michal Grzelak]
- Reorganize root sagas and interventions folder structure. [Michal
  Grzelak]
- Edit Row, Column styles to be more generic. [Michal Grzelak]
- Add empty CreateIntervention page. [Michal Grzelak]
- Add missing underscore in saga watch action name. [Michal Grzelak]
- Rename button style to Wrapper. [Michal Grzelak]
- Rename colors and add themeColors variable. [Michal Grzelak]
- Rename wrong i18n variable name. [Michal Grzelak]
- Add missing login page translations. [Michal Grzelak]
- Add dotenv and replace hardcoded url with environment variable.
  [Michal Grzelak]
- Remove unnecessary code from generated reducer test. [Michal Grzelak]
- Add false directory to .gitignore. [Michal Grzelak]
- Add .vscode to .gitignore. [Michal Grzelak]
- Extract placeholders on login page to messages.js. [Michal Grzelak]
- Set token for every '*_SUCCESS' action. [Michal Grzelak]
- Change PR template. [Michal Grzelak]
- Fix login reducer test error. [Michal Grzelak]
- Redirect to home after login. [Michal Grzelak]
- Create protected route mechanism. [Michal Grzelak]
- Remove Align, injkect intl in LoginPage. [Michal Grzelak]
- Remove formatted message from login page and add border-radius to
  Input component. [Michal Grzelak]
- Create base styles, add Column, Fill, Align components. [Michal
  Grzelak]
- Add initial login funcionality. [Michal Grzelak]
- Add LoginPage skeleton, auth reducer and basic Card and Input
  components. [Michal Grzelak]
- Add theme variables. [Michal Grzelak]
- Add auth, and language reducer to persist whitelist. [Michal Grzelak]
- Add .vscode launch config. [Michal Grzelak]
- Add empty login page. [Michal Grzelak]
- Add 'router' state to blacklist in react-persist. [Michal Grzelak]
- Rearrange persistor object creation. [Michal Grzelak]
- Add and configure redux-persist. [Michal Grzelak]
- Move lint to build workflow and add missing cache restoration in test
  step. [Michal Grzelak]
- Update circleci config. [Michal Grzelak]
- Add .circleci/config.yml. [michal-grzelak]
- Add circleci config and remove unnecessary `clean` script from
  package.json. [Michal Grzelak]
- Ignore jest coverage threshold for now. [Michal Grzelak]
- Remove unnecessary files and update README. [Michal Grzelak]
- Remove default example. [Michal Grzelak]
- Initial commit. [Michal Grzelak]


