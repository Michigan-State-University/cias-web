import { defineMessages } from 'react-intl';

export const scope = 'app.global.QuestionGroupType';

export default defineMessages({
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
