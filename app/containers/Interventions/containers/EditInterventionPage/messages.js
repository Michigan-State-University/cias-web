import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EditInterventionPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'e-Intervention New',
  },
  newQuestionMessage: {
    id: `${scope}.newQuestionMessage`,
    defaultMessage: 'Enter main text of the slide here',
  },
  errors: {
    duplicateVariable: {
      id: `${scope}.duplicateVariable`,
      defaultMessage: 'This variable name is already in use!',
    },
    copyError: {
      id: `${scope}.copyError`,
      defaultMessage: 'Cannot copy the screen!',
    },
  },
});
