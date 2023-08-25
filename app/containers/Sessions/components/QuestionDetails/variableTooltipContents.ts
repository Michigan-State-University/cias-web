import { defineMessages } from 'react-intl';

import { QuestionTypes } from 'models/Question';

export const scope = 'app.components.QuestionDetails.variableTooltipContents';

export const variableTooltipContents = defineMessages({
  [QuestionTypes.PARTICIPANT_REPORT]: {
    id: `${scope}.${QuestionTypes.PARTICIPANT_REPORT}`,
    defaultMessage:
      'Score of this variable will equal 1 if the participant answers Yes. Otherwise it will equal 0.',
  },
  [QuestionTypes.PHONE]: {
    id: `${scope}.${QuestionTypes.PHONE}`,
    defaultMessage:
      'Score of this variable will equal 1 if the participant provides and confirms a phone number. Otherwise it will equal 0.',
  },
});
