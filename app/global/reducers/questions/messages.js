import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.questions';

export default defineMessages({
  duplicateVariable: {
    id: `${scope}.duplicateVariable`,
    defaultMessage: 'This variable name is already in use!',
  },
  reservedVariable: {
    id: `${scope}.reservedVariable`,
    defaultMessage: 'This variable name is reserved!',
  },
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage: 'Cannot copy the screen!',
  },
  deleteSuccess: {
    id: `${scope}.deleteSuccess`,
    defaultMessage:
      'Successfully deleted the selected {count, plural, ' +
      'one {screen}' +
      'other {screens}' +
      '}!',
  },
  deleteError: {
    id: `${scope}.deleteError`,
    defaultMessage:
      'Failed to delete the selected {count, plural, ' +
      'one {screen}' +
      'other {screens}' +
      '}!',
  },
  reorderError: {
    id: `${scope}.reorderError`,
    defaultMessage: 'Cannot reorder screens!',
  },
  copySuccess: {
    id: `${scope}.copySuccess`,
    defaultMessage: 'Copied screen successfully!',
  },
  variableUpdateQueued: {
    id: `${scope}.variableUpdateQueued`,
    defaultMessage:
      'Variable references are being updated. Please refresh the page in a moment to see the results.',
  },
  variableUpdateInProgress: {
    id: `${scope}.variableUpdateInProgress`,
    defaultMessage:
      'Cannot update question variable while references update is in progress. Please try again in a few moments.',
  },
  answerOptionUpdateQueued: {
    id: `${scope}.answerOptionUpdateQueued`,
    defaultMessage:
      'Answer option references are being updated. Please refresh the page in a moment to see the results.',
  },
  answerOptionUpdateInProgress: {
    id: `${scope}.answerOptionUpdateInProgress`,
    defaultMessage:
      'Cannot update question answer option while references update is in progress. Please try again in a few moments.',
  },
});
