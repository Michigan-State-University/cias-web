import { defineMessages } from 'react-intl';

import { QuestionTypes } from 'models/Question';

export const scope =
  'app.containers.EditSessionPag.DefaultQuestionSubtitlesMessages';

export default defineMessages<string>({
  [QuestionTypes.PARTICIPANT_REPORT]: {
    id: `${scope}.Question::ParticipantReport`,
    defaultMessage:
      '<p>Would you like to receive a report generated from your responses?</p>',
  },
  [QuestionTypes.SMS_QUESTION]: {
    id: `${scope}.Question::Sms`,
    defaultMessage: 'Enter SMS text here',
  },
  [QuestionTypes.SMS_INFORMATION_QUESTION]: {
    id: `${scope}.Question::SmsInformation`,
    defaultMessage: 'Enter SMS text here',
  },
});
