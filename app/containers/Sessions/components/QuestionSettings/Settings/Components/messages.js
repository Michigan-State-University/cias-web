import { defineMessages } from 'react-intl';

import { EFeedbackAction } from 'models/Narrator/FeedbackActions';
import { NarratorSettingsKey } from 'models/Narrator';

export const scope = 'app.containers.DefaultSettings';

export default defineMessages({
  type: {
    id: `${scope}.type`,
    defaultMessage: 'Type',
  },
  typePlaceholder: {
    id: `${scope}.typePlaceholder`,
    defaultMessage: 'Question type',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Title',
  },
  video: {
    id: `${scope}.video`,
    defaultMessage: 'Video',
  },
  image: {
    id: `${scope}.image`,
    defaultMessage: 'Image',
  },
  subtitle: {
    id: `${scope}.subtitle`,
    defaultMessage: 'Main Text',
  },
  narrator_skippable: {
    id: `${scope}.narrator_skippable`,
    defaultMessage: 'Skippable Narrator',
  },
  text_limit: {
    id: `${scope}.text_limit`,
    defaultMessage: 'Text limit',
  },
  proceed_button: {
    id: `${scope}.proceed_button`,
    defaultMessage: 'Continue Button',
  },
  required: {
    id: `${scope}.required`,
    defaultMessage: 'Required',
  },
  [NarratorSettingsKey.ANIMATION]: {
    id: `${scope}.${NarratorSettingsKey.ANIMATION}`,
    defaultMessage: 'Display Narrator',
  },
  [NarratorSettingsKey.VOICE]: {
    id: `${scope}.${NarratorSettingsKey.VOICE}`,
    defaultMessage: 'Voice',
  },
  [NarratorSettingsKey.EXTRA_SPACE_FOR_NARRATOR]: {
    id: `${scope}.${NarratorSettingsKey.EXTRA_SPACE_FOR_NARRATOR}`,
    defaultMessage: 'Extra space for Narrator',
  },
  selectQuestion: {
    id: `${scope}.selectQuestion`,
    defaultMessage: 'Select Screen',
  },
  speechPlaceholder: {
    id: `${scope}.speechPlaceholder`,
    defaultMessage: 'Enter speech here...',
  },
  replaceCharacter: {
    id: `${scope}.replaceCharacter`,
    defaultMessage: 'Replace Narrator',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  show_number: {
    id: `${scope}.show_number`,
    defaultMessage: 'Show number',
  },
  reflectionToggle: {
    id: `${scope}.reflectionToggle`,
    defaultMessage: 'Use Reflection',
  },
  formulaToggle: {
    id: `${scope}.formulaToggle`,
    defaultMessage: 'Use Formula',
  },
  chooseQuestion: {
    id: `${scope}.chooseQuestion`,
    defaultMessage: 'Choose Question',
  },
  questionNotFound: {
    id: `${scope}.questionNotFound`,
    defaultMessage: 'Question not found. Choose a different one.',
  },
  addReflection: {
    id: `${scope}.addReflection`,
    defaultMessage: 'Add Reflection',
  },
  warningMessage: {
    id: `${scope}.warningMessage`,
    defaultMessage: `You <warningColor>cannot edit content</warningColor> on the screen while working with the Narrator.`,
  },
  characterBlocked: {
    id: `${scope}.characterBlocked`,
    defaultMessage: `Open any block to reposition the Narrator.`,
  },
  characterMovable: {
    id: `${scope}.characterMovable`,
    defaultMessage: `Click and drag the Narrator to move it.<br>Only the start and end positions will be recorded.
`,
  },
  characterMoveDisabled: {
    id: `${scope}.characterMoveDisabled`,
    defaultMessage: `Narrator replacing is disabled for that intervention status.`,
  },
  [EFeedbackAction.SHOW_SPECTRUM]: {
    id: `${scope}.${EFeedbackAction.SHOW_SPECTRUM}`,
    defaultMessage: 'Show Spectrum',
  },
  [EFeedbackAction.SHOW_USER_VALUE]: {
    id: `${scope}.${EFeedbackAction.SHOW_USER_VALUE}`,
    defaultMessage: 'Show End-User Value',
  },
  [EFeedbackAction.SHOW_LOWER_VALUE]: {
    id: `${scope}.${EFeedbackAction.SHOW_LOWER_VALUE}`,
    defaultMessage: 'Show Lower Value',
  },
  [EFeedbackAction.SHOW_HIGHER_VALUE]: {
    id: `${scope}.${EFeedbackAction.SHOW_HIGHER_VALUE}`,
    defaultMessage: 'Show Higher Value',
  },
  [EFeedbackAction.NO_ACTION]: {
    id: `${scope}.${EFeedbackAction.NO_ACTION}`,
    defaultMessage: 'Manual positioning',
  },
  selectAction: {
    id: `${scope}.selectAction`,
    defaultMessage: 'Select Feedback Action',
  },
  selectActionPosition: {
    id: `${scope}.selectActionPosition`,
    defaultMessage: 'Select Narrator Position',
  },
  speechAnimation: {
    id: `${scope}.speechAnimation`,
    defaultMessage: 'Select Speech Animation',
  },
  formulaPlaceholder: {
    id: `${scope}.formulaPlaceholder`,
    defaultMessage:
      'Enter formula here... (You can use mathematical operators +, -, *, /)',
  },
  newCase: {
    id: `${scope}.newCase`,
    defaultMessage: '+ Add another case',
  },
  if: {
    id: `${scope}.if`,
    defaultMessage: 'If',
  },
  equalsTo: {
    id: `${scope}.equalsTo`,
    defaultMessage: 'Narrator will say:',
  },
  formulaHeader: {
    id: `${scope}.formulaHeader`,
    defaultMessage: 'Formula',
  },
  addVariable: {
    id: `${scope}.addVariable`,
    defaultMessage: 'Add variable',
  },
  blockRemovalConfirmation: {
    id: `${scope}.blockRemovalConfirmation`,
    defaultMessage: 'Are you sure you want to disable {setting} setting?',
  },
  blockRemovalConfirmationDescription: {
    id: `${scope}.blockRemovalConfirmationDescription`,
    defaultMessage:
      'Those block types will be removed in this question and their data will be wiped out',
  },
  textLimitSettingsPlaceholder: {
    id: `${scope}.textLimitSettingsPlaceholder`,
    defaultMessage: 'E.g. 250',
  },
  deleteBlockHeader: {
    id: `${scope}.deleteBlockHeader`,
    defaultMessage: 'Delete Block',
  },
  deleteBlockMessage: {
    id: `${scope}.deleteBlockMessage`,
    defaultMessage:
      'Are you sure you want to delete this Block? It will not be possible to recover it later.',
  },
  addNewFormula: {
    id: `${scope}.addNewFormula`,
    defaultMessage: 'Add new formula',
  },
  formula: {
    id: `${scope}.formula`,
    defaultMessage: 'Formula { index }',
  },
  copyFormula: {
    id: `${scope}.copyFormula`,
    defaultMessage: 'Copy formula',
  },
});
