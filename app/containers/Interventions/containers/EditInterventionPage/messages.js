import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EditInterventionPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'e-Intervention New',
  },
  addScreen: {
    id: `${scope}.addScreen`,
    defaultMessage: '+ Add new screen',
  },
  newQuestionMessage: {
    id: `${scope}.newQuestionMessage`,
    defaultMessage:
      'I can address any health behaviour. For example, I might ask a patient if they are a daily smoker.',
  },
  errors: {
    duplicateVariable: {
      id: `${scope}.duplicateVariable`,
      defaultMessage: 'This variable name is already in use!',
    },
    copyError: {
      id: `${scope}.copyError`,
      defaultMessage: 'Cannot copy the screren!',
    },
  },
});
