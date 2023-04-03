import { defineMessages } from 'react-intl';

import { SessionSchedule } from 'models/Session';

export const scope = 'app.containers.UserInterventionPage';

export default defineMessages({
  chooseIntervention: {
    id: `${scope}.chooseIntervention`,
    defaultMessage: 'Choose the session that you would like to fill in',
  },
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
  [SessionSchedule.AFTER_FILL]: {
    id: `${scope}.${[SessionSchedule.AFTER_FILL]}`,
    defaultMessage:
      'This module will be available when you finish previous module',
  },
  [SessionSchedule.EXACT_DATE]: {
    id: `${scope}.${[SessionSchedule.EXACT_DATE]}`,
    defaultMessage:
      'This module will be available on <secondaryColorBold>{scheduleAt}</secondaryColorBold> and when you finish previous module',
  },
  [SessionSchedule.DAYS_AFTER_FILL]: {
    id: `${scope}.${[SessionSchedule.DAYS_AFTER_FILL]}`,
    defaultMessage:
      'This module will be available <secondaryColorBold>{schedulePayload} days</secondaryColorBold> after filling in the previous module',
  },
  [SessionSchedule.DAYS_AFTER]: {
    id: `${scope}.${[SessionSchedule.DAYS_AFTER]}`,
    defaultMessage:
      'This module will be available when you finish previous module and <secondaryColorBold>{schedulePayload} day</secondaryColorBold> after previous session is available',
  },
  [SessionSchedule.DAYS_AFTER_DATE]: {
    id: `${scope}.${[SessionSchedule.DAYS_AFTER_DATE]}`,
    defaultMessage:
      'This module will be available <secondaryColorBold>{schedulePayload} days</secondaryColorBold> after date provided in previous session in this intervention',
  },
  [SessionSchedule.IMMEDIATELY]: {
    id: `${scope}.${[SessionSchedule.IMMEDIATELY]}`,
    defaultMessage:
      'This module will start immediately when you finish previous module',
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
