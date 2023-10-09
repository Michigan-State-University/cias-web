import { defineMessages } from 'react-intl';

import { GroupType } from 'models/QuestionGroup';

export const scope = 'app.global.QuestionGroupType';

export default defineMessages<GroupType>({
  'QuestionGroup::Plain': {
    id: `${scope}.QuestionGroup::Plain`,
    defaultMessage: 'Plain',
  },
  'QuestionGroup::Finish': {
    id: `${scope}.QuestionGroup::Finish`,
    defaultMessage: 'Finish',
  },
  'QuestionGroup::Tlfb': {
    id: `${scope}.QuestionGroup::Tlfb`,
    defaultMessage: 'Timeline Followback',
  },
});
