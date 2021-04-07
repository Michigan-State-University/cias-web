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
});
