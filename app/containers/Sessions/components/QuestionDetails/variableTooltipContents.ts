import { defineMessages } from 'react-intl';

import { QuestionTypes } from 'models/Question';

export const scope = 'app.components.QuestionDetails.variableTooltipContents';

export const variableTooltipContents = defineMessages<string>({
  [QuestionTypes.PARTICIPANT_REPORT]: {
    id: `${scope}.Question::ParticipantReport`,
    defaultMessage:
      'Score of this variable will equal 1 if the participant answers Yes. Otherwise it will equal 0.',
  },
  [QuestionTypes.FILE_UPLOAD]: {
    id: `${scope}.Question::FileUpload`,
    defaultMessage:
      'In branching and formulas this variable holds the number of files the participant uploaded, so "> 0" means a file was attached. In the exported CSV the same variable holds a protected link to the file.',
  },
  [QuestionTypes.PHONE]: {
    id: `${scope}.Question::Phone`,
    defaultMessage:
      'Score of this variable will equal 1 if the participant provides and confirms a phone number. Otherwise it will equal 0.',
  },
});
