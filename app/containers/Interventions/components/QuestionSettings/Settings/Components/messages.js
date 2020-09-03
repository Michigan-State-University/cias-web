import { defineMessages } from 'react-intl';

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
    defaultMessage: 'Animation',
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
  peedyBlocked: {
    id: `${scope}.peedyBlocked`,
    defaultMessage: `Open any of the blocks to replace the character.`,
  },
  peedyeMovable: {
    id: `${scope}.peedyeMovable`,
    defaultMessage: `You can now replace the character by dragging it.`,
  },
});
