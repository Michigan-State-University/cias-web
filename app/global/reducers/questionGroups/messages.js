import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.questionGroups';

export default defineMessages({
  changeGroupName: {
    id: `${scope}.changeGroupName`,
    defaultMessage: 'Cannot change group name',
  },
  groupError: {
    id: `${scope}.groupError`,
    defaultMessage:
      'Something goes wrong while grouping. Please check that you not trying to group TLFB with other groups.',
  },
  reorderError: {
    id: `${scope}.reorderError`,
    defaultMessage: 'Cannot reorder groups!',
  },
  shareError: {
    id: `${scope}.shareError`,
    defaultMessage:
      'Something goes wrong while sharing copy. Please check that you not trying to share copy of TLFB with other groups.',
  },
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage:
      'Something goes wrong while duplicating. Please check that you not trying to duplicate TLFB with other groups.',
  },
  shareSuccess: {
    id: `${scope}.shareSuccess`,
    defaultMessage: 'Successfully shared questions',
  },
});
