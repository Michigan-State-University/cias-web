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
  deleteError: {
    id: `${scope}.copyError`,
    defaultMessage: 'Cannot delete the screen!',
  },
  reorderError: {
    id: `${scope}.reorderError`,
    defaultMessage: 'Cannot reorder screens!',
  },
});
