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
});
