import { defineMessages } from 'react-intl';
import { feedbackActions } from 'models/Narrator/FeedbackActions';

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
    defaultMessage: 'Subtitle',
  },
  proceed_button: {
    id: `${scope}.proceed_button`,
    defaultMessage: 'Proceed button',
  },
  required: {
    id: `${scope}.required`,
    defaultMessage: 'Required',
  },
  animation: {
    id: `${scope}.animation`,
    defaultMessage: 'Display Character',
  },
  voice: {
    id: `${scope}.voice`,
    defaultMessage: 'Voice',
  },
  selectQuestion: {
    id: `${scope}.selectQuestion`,
    defaultMessage: 'Select Screen',
  },
  nextScreen: {
    id: `${scope}.nextScreen`,
    defaultMessage: 'Next Screen',
  },
  speechPlaceholder: {
    id: `${scope}.speechPlaceholder`,
    defaultMessage: 'Enter speech here...',
  },
  replaceCharacter: {
    id: `${scope}.replaceCharacter`,
    defaultMessage: 'Replace character',
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
  addReflection: {
    id: `${scope}.addReflection`,
    defaultMessage: 'Add Reflection',
  },
  warningMessage: {
    id: `${scope}.warningMessage`,
    defaultMessage: `Bear in mind that you can't edit the question when you are working with the character.`,
  },
  characterBlocked: {
    id: `${scope}.characterBlocked`,
    defaultMessage: `Open any of the blocks to replace the character.`,
  },
  characterMovable: {
    id: `${scope}.characterMovable`,
    defaultMessage: `You can now replace the character by dragging it.`,
  },
  [feedbackActions.showSpectrum]: {
    id: `${scope}.${feedbackActions.showSpectrum}`,
    defaultMessage: 'Show Spectrum',
  },
  [feedbackActions.showUserValue]: {
    id: `${scope}.${feedbackActions.showUserValue}`,
    defaultMessage: 'Show End-User Value',
  },
  [feedbackActions.showLowerValue]: {
    id: `${scope}.${feedbackActions.showLowerValue}`,
    defaultMessage: 'Show Lower Value',
  },
  [feedbackActions.showHigherValue]: {
    id: `${scope}.${feedbackActions.showHigherValue}`,
    defaultMessage: 'Show Higher Value',
  },
  [feedbackActions.noAction]: {
    id: `${scope}.${feedbackActions.noAction}`,
    defaultMessage: 'Manual positioning',
  },
  selectAction: {
    id: `${scope}.selectAction`,
    defaultMessage: 'Select Feedback Action',
  },
  selectActionPosition: {
    id: `${scope}.selectActionPosition`,
    defaultMessage: 'Select Character Position',
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
    defaultMessage: 'narrator will say:',
  },
  formulaHeader: {
    id: `${scope}.formulaHeader`,
    defaultMessage: 'Formula',
  },
  addVariable: {
    id: `${scope}.addVariable`,
    defaultMessage: 'Add variable',
  },
});
