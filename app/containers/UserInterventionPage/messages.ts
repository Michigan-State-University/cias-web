import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserInterventionPage';

export default defineMessages({
  backToInterventions: {
    id: `${scope}.backToInterventions`,
    defaultMessage: 'Back to my interventions',
  },
  estimatedTime: {
    id: `${scope}.estimatedTime`,
    defaultMessage:
      'Estimated time to complete <secondaryColorBold>{time} min</secondaryColorBold>',
  },
  helpingMaterials: {
    id: `${scope}.helpingMaterials`,
    defaultMessage: 'Additional resources for you:',
  },
  sessionFilledNTimes: {
    id: `${scope}.sessionFilledNTimes`,
    defaultMessage:
      'Session filled: <secondaryColorBold>{count} {count, plural, ' +
      'one {time}' +
      'other {times}' +
      '}</secondaryColorBold>',
  },
  fillAgain: {
    id: `${scope}.fillAgain`,
    defaultMessage: 'Fill again',
  },
});
