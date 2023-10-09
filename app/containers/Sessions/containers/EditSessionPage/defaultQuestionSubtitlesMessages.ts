import { defineMessages } from 'react-intl';

export const scope =
  'app.containers.EditSessionPag.DefaultQuestionSubtitlesMessages';

export default defineMessages<string>({
  'Question::ParticipantReport': {
    id: `${scope}.Question::ParticipantReport`,
    defaultMessage:
      '<p>Would you like to receive a report generated from your responses?</p>',
  },
});
