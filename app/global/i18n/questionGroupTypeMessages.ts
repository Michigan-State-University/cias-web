import { defineMessages } from 'react-intl';

import { GroupType } from 'models/QuestionGroup';

export const scope = 'app.global.QuestionGroupType';

export default defineMessages<GroupType>({
  [GroupType.PLAIN]: {
    id: `${scope}.QuestionGroup::Plain`,
    defaultMessage: 'Plain',
  },
  [GroupType.FINISH]: {
    id: `${scope}.QuestionGroup::Finish`,
    defaultMessage: 'Finish',
  },
  [GroupType.TLFB]: {
    id: `${scope}.QuestionGroup::Tlfb`,
    defaultMessage: 'Timeline Followback',
  },
});
