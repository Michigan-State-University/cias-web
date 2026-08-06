# Question Types and Answer Type Wire Values

**When to load:** Looking up the exact `Question::X` or `Answer::X` discriminator string for any question or answer type in the CIAS domain.

## Quick Summary

Every question and answer in CIAS carries a `type` field whose value is a namespaced Ruby-style string discriminator (e.g. `Question::Single`, `Answer::Slider`). These strings are the canonical wire format exchanged between the Rails API and the frontend. The `QuestionTypes` enum defines the question discriminators; the `AnswerType` enum defines the answer discriminators. Most answerable question types have a directly paired answer type sharing the same suffix (e.g. `Question::Slider` ↔ `Answer::Slider`); non-answerable display types (Information, ExternalLink, Feedback, Finish, ParticipantReport) still carry answer-type counterparts used for recording interaction state.

**Answers questions like:**
- What is the wire value for a slider question?
- Which discriminator string does a TLFB calendar question use?
- What answer types exist for Henry Ford integration questions?
- Does `Question::Information` have a paired answer type?

**Common scenarios:** Writing a Redux reducer switch, filtering questions by type in a saga, building a type guard for a specific question shape, interpreting API payloads from the backend.

---

## Question Type Discriminators _(src: app/models/Question/QuestionTypes.ts)_

The `GenericQuestion<VType, TBody, TSettings>` interface carries `type: VType extends QuestionTypes` as its discriminator field _(src: app/models/Question/Question.ts)_.

| Wire value | Enum member | Notes |
|---|---|---|
| `Question::Single` | `SINGLE` | Single-choice question with selectable answer options |
| `Question::Multiple` | `MULTIPLE` | Multi-select choice question |
| `Question::FreeResponse` | `FREE_RESPONSE` | Open-text input |
| `Question::Number` | `NUMBER` | Numeric input |
| `Question::Slider` | `SLIDER` | Visual analog / range slider |
| `Question::Grid` | `GRID` | Matrix / table format question |
| `Question::Date` | `DATE` | Date picker |
| `Question::Phone` | `PHONE` | Phone number input; carries `timeRanges[]` on the TS type |
| `Question::Currency` | `CURRENCY` | Currency amount input |
| `Question::Name` | `NAME` | First / last name input |
| `Question::Information` | `INFORMATION` | Read-only display; no participant-supplied answer |
| `Question::ExternalLink` | `EXTERNAL_LINK` | Link to an external resource |
| `Question::Feedback` | `FEEDBACK` | Displays computed feedback to the participant |
| `Question::Finish` | `FINISH` | Session end screen; carries optional `nextSessionId` |
| `Question::ThirdParty` | `THIRD_PARTY` | External integration question (e.g. report triggers) |
| `Question::ParticipantReport` | `PARTICIPANT_REPORT` | Generated report question |
| `Question::TlfbConfig` | `TLFB_CONFIG` | TLFB instrument — configures calendar range |
| `Question::TlfbEvents` | `TLFB_EVENTS` | TLFB instrument — defines event types |
| `Question::TlfbQuestion` | `TLFB_QUESTION` | TLFB instrument — the actual calendar fill |
| `Question::HenryFord` | `HENRY_FORD_QUESTION` | Henry Ford Health System integration question |
| `Question::HenryFordInitial` | `HENRY_FORD_INITIAL` | Henry Ford initial screen question |
| `Question::Sms` | `SMS_QUESTION` | SMS-specific question (within SMS sessions) |
| `Question::SmsInformation` | `SMS_INFORMATION_QUESTION` | SMS read-only / informational question |

The constant array `TLFB_QUESTION_TYPES` groups `Question::TlfbConfig`, `Question::TlfbEvents`, and `Question::TlfbQuestion` for TLFB-related filtering _(src: app/models/Question/QuestionTypes.ts)_.

---

## Answer Type Discriminators _(src: app/models/Answer/AnswerType.ts)_

The `GenericAnswer<V, T>` interface carries `type: V extends AnswerType` as its discriminator field _(src: app/models/Answer/Answer.ts)_.

| Wire value | Enum member | Paired question type |
|---|---|---|
| `Answer::Single` | `SINGLE` | `Question::Single` |
| `Answer::Multiple` | `MULTIPLE` | `Question::Multiple` |
| `Answer::FreeResponse` | `FREE_RESPONSE` | `Question::FreeResponse` |
| `Answer::Number` | `NUMBER` | `Question::Number` |
| `Answer::Slider` | `SLIDER` | `Question::Slider` |
| `Answer::Grid` | `GRID` | `Question::Grid` |
| `Answer::Date` | `DATE` | `Question::Date` |
| `Answer::Phone` | `PHONE` | `Question::Phone` |
| `Answer::Currency` | `CURRENCY` | `Question::Currency` |
| `Answer::Name` | `NAME` | `Question::Name` |
| `Answer::Information` | `INFORMATION` | `Question::Information` |
| `Answer::ExternalLink` | `EXTERNAL_LINK` | `Question::ExternalLink` |
| `Answer::Feedback` | `FEEDBACK` | `Question::Feedback` |
| `Answer::ParticipantReport` | `PARTICIPANT_REPORT` | `Question::ParticipantReport` |
| `Answer::ThirdParty` | `THIRD_PARTY` | `Question::ThirdParty` |
| `Answer::HenryFord` | `HENRY_FORD` | `Question::HenryFord` |

The `AnswerType` enum as observed at scan time has no entries for TLFB question types, `Question::HenryFordInitial`, `Question::Sms`, or `Question::SmsInformation`.

---

## Session Type Discriminators _(src: app/models/Session/Session.ts)_

Questions live within sessions, which are themselves discriminated by their `type` field:

| Wire value | Enum member | Description |
|---|---|---|
| `Session::Classic` | `CLASSIC_SESSION` | Question-based interactive session |
| `Session::Sms` | `SMS_SESSION` | Scheduled text message delivery session |
| `Session::CatMh` | `CAT_SESSION` | Computerized Adaptive Testing for Mental Health |
| `Session::ResearchAssistant` | `RA_SESSION` | Research assistant session |

`Question::Sms` and `Question::SmsInformation` are relevant only within `Session::Sms` sessions.

---

## Discriminator Field Placement

Both `GenericQuestion` and `GenericAnswer` use a `type` field typed to their respective enum, making the wire string the TypeScript discriminant for narrowing union members _(src: app/models/Question/Question.ts, app/models/Answer/Answer.ts)_. The `Question` union type and `Answer` union type in those files list every concrete subtype indexed by these discriminators.
