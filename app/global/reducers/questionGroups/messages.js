import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.questionGroups';

export default defineMessages({
  changeGroupName: {
    id: `${scope}.changeGroupName`,
    defaultMessage: 'Cannot change group name',
  },
  groupError: {
    id: `${scope}.groupError`,
    defaultMessage: 'Cannot group question',
  },
  reorderError: {
    id: `${scope}.reorderError`,
    defaultMessage: 'Cannot reorder groups!',
  },
  shareError: {
    id: `${scope}.shareError`,
    defaultMessage: 'Cannot share questions!',
  },
  shareSuccess: {
    id: `${scope}.shareSuccess`,
    defaultMessage: 'Successfully shared questions',
  },
  duplicateGroupsSuccess: {
    id: `${scope}.duplicateGroupsSuccess`,
    defaultMessage: 'Successfully duplicated question groups',
  },
  duplicateGroupsError: {
    id: `${scope}.duplicateGroupsError`,
    defaultMessage: 'Failed to duplicate question groups',
  },
});
