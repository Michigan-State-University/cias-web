# Narrator Block Types and Animation Wire Values

**When to load:** Working with narrator block authoring on questions — reading or writing block `type` discriminators, choosing animation enum members, or handling feedback actions.

## Quick Summary

Each question's `narrator.blocks` array is a discriminated union of eight block types, keyed by the `type` string from `NarratorBlockTypes`. Body and head animation blocks accept members from their respective enums (`BodyAnimation`, `HeadAnimation`). Speech-bearing blocks (Speech, ReadQuestion, Reflection, ReflectionFormula) carry a `SpeechAnimation` value instead. Pause and Feedback blocks fix their animation field to `BodyAutoRestAnimation.STAND_STILL` (`'standStill'`). Feedback blocks also carry an `EFeedbackAction` value.

**Answers questions like:**
- What are all the valid `type` discriminator strings a narrator block can have?
- Which TypeScript interface does a `'Speech'` block map to?
- What are the wire values for Peedy's body and head animations?
- What `EFeedbackAction` values can a feedback block carry?
- What `SpeechAnimation` values are available for audio-bearing blocks?

**Common scenarios:** authoring or parsing a question's narrator blocks array, building the block-type selector UI, mapping a block `type` to its editor interface, validating animation field values.

---

## Block Types — Wire Discriminators and Typed Interfaces _(src: app/models/Narrator/NarratorBlockTypes.ts, app/models/Narrator/Narrator.ts)_

The `NarratorBlock` union type selects its concrete interface via the `type` field. Each block also extends `IBaseBlock` which carries `type`, `animation: NarratorAnimation`, and `endPosition: Position`.

| `NarratorBlockTypes` key | Wire string (`type`) | Typed interface | `animation` field type | Notes |
|---|---|---|---|---|
| `BODY_ANIMATION` | `'BodyAnimation'` | `IBodyAnimationBlock` | `BodyAnimation` | Pure character body motion; no audio |
| `HEAD_ANIMATION` | `'HeadAnimation'` | `IHeadAnimationBlock` | `HeadAnimation` | Pure character head motion; no audio |
| `SPEECH` | `'Speech'` | `ISpeechBlock` | `SpeechAnimation` | Extends `IBaseAudioBlock`; carries TTS text + audio URLs |
| `READ_QUESTION` | `'ReadQuestion'` | `IReadQuestionBlock` | `SpeechAnimation` | Extends `IBaseAudioBlock`; `action` is fixed to `EFeedbackAction.NO_ACTION` |
| `REFLECTION` | `'Reflection'` | `IReflectionBlock` | `SpeechAnimation` | Extends `IBaseAudioBlock`; references a prior `question_id` + `reflections[]` |
| `REFLECTION_FORMULA` | `'ReflectionFormula'` | `IReflectionFormulaBlock` | `SpeechAnimation` | Extends `IBaseAudioBlock`; evaluates formula matches via `reflections[]` |
| `PAUSE` | `'Pause'` | `IPauseBlock` | `BodyAutoRestAnimation.STAND_STILL` (`'standStill'`) | Carries `pauseDuration: number`; animation is fixed |
| `FEEDBACK` | `'Feedback'` | `IFeedbackBlock` | `BodyAutoRestAnimation.STAND_STILL` (`'standStill'`) | Carries `action: EFeedbackAction`; animation is fixed |

Audio-bearing blocks (`ISpeechBlock`, `IReadQuestionBlock`, `IReflectionBlock`, `IReflectionFormulaBlock`) all extend `IBaseAudioBlock`, which adds `sha256[]`, `audio_urls[]`, `audios_base64[]`, `text?`, `originalText?`, and `action: EFeedbackAction`.

---

## EFeedbackAction — Wire Values _(src: app/models/Narrator/FeedbackActions.ts)_

Used on `IBaseAudioBlock.action` and `IFeedbackBlock.action`.

| Key | Wire string |
|---|---|
| `SHOW_SPECTRUM` | `'SHOW_SPECTRUM'` |
| `SHOW_USER_VALUE` | `'SHOW_USER_VALUE'` |
| `SHOW_LOWER_VALUE` | `'SHOW_LOWER_VALUE'` |
| `SHOW_HIGHER_VALUE` | `'SHOW_HIGHER_VALUE'` |
| `NO_ACTION` | `'NO_ACTION'` |

`IReadQuestionBlock` constrains `action` to `EFeedbackAction.NO_ACTION` only. All other audio blocks accept any `EFeedbackAction` member.

---

## Body Animation Enums _(src: app/models/Narrator/Animation.ts)_

`BodyAnimation = BodyAutoRestAnimation | BodyReverseAnimation`. Used on `IBodyAnimationBlock.animation`.

**`BodyAutoRestAnimation` wire values:** `'standStill'`, `'greet'`, `'confused'`, `'reading'`, `'doMagic'`, `'getAttention'`, `'search'`, `'surprised'`, `'flyIn'`, `'flyOut'`, `'process'`, `'idle'`, `'turnPage'`, `'openBook'`, `'closeBook'`, `'announce'`, `'pointLeftUp'`, `'pointRightUp'`, `'pointUp'`, `'restShoulderRubbing'`, `'restStretching'`, `'restWeightShift'`, `'think'`, `'uncertain'`, `'wave'`, `'congratulate'`

**`BodyReverseAnimation` wire values:** `'uncertain'`, `'wave'`, `'pointLeft'`, `'pointRight'`, `'pointDown'`, `'pointUp'`, `'explain'`, `'congratulate'`, `'listen'`, `'suggest'`, `'think'`, `'write'`

`IPauseBlock` and `IFeedbackBlock` fix their `animation` to `BodyAutoRestAnimation.STAND_STILL` (`'standStill'`) regardless of the body animation enum.

---

## Head Animation Enums _(src: app/models/Narrator/Animation.ts)_

`HeadAnimation = HeadAutoRestAnimation | HeadReverseAnimation`. Used on `IHeadAnimationBlock.animation`.

**`HeadAutoRestAnimation` wire values:** `'blink'`, `'acknowledge'`, `'acknowledgeThoughtful'`, `'decline'`, `'declineAnnoyed'`, `'declineThoughtful'`, `'pleased'`, `'hearBothEars'`, `'yawn'`, `'eatCracker'`, `'browsUp'`, `'sad'`, `'suggest'`, `'wearSunglasses'`

**`HeadReverseAnimation` wire values:** `'browsUp'`, `'sad'`, `'hearLeftEar'`, `'hearRightEar'`, `'wearSunglasses'`, `'lookDown'`, `'lookDownAndBlink'`, `'glanceUp'`, `'glanceDown'`, `'glanceLeft'`, `'glanceRight'`

---

## SpeechAnimation Enum _(src: app/models/Narrator/Animation.ts)_

Used as the `animation` field on all four audio-bearing block interfaces (`ISpeechBlock`, `IReadQuestionBlock`, `IReflectionBlock`, `IReflectionFormulaBlock`).

| Key | Wire string |
|---|---|
| `REST` | `'rest'` |
| `EXPLAIN` | `'explain'` |
| `POINT_UP` | `'pointUp'` |
| `POINT_DOWN` | `'pointDown'` |
| `POINT_LEFT` | `'pointLeft'` |
| `POINT_RIGHT` | `'pointRight'` |
| `READ` | `'read'` |
| `WRITE` | `'write'` |
| `LISTEN` | `'listen'` |
| `ANNOUNCE` | `'announce'` |
| `SEARCH` | `'search'` |
| `SUGGEST` | `'suggest'` |
| `THINK` | `'think'` |
| `OTOH_LEFT_HAND` | `'otohLeftHand'` |
| `OTOH_RIGHT_HAND` | `'otohRightHand'` |

---

## NarratorSettings and CharacterType _(src: app/models/Narrator/NarratorSettings.ts, app/models/Character/index.ts)_

The `Narrator` interface carries a `settings: NarratorSettings` object alongside `blocks`. `NarratorSettings` has `voice: boolean`, `animation: boolean`, `extra_space_for_narrator?: boolean`, and `character: CharacterType`.

`CharacterType` wire values: `'emmi'`, `'peedy'`, `'crystal'`.
