import { SCHEDULE_OPTIONS } from 'global/reducers/intervention';
import { defineMessages } from 'react-intl';

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
  [SCHEDULE_OPTIONS.afterFill]: {
    id: `${scope}.${[SCHEDULE_OPTIONS.afterFill]}`,
    defaultMessage:
      'This module will be available when you finish previous module',
  },
  [SCHEDULE_OPTIONS.exactDate]: {
    id: `${scope}.${[SCHEDULE_OPTIONS.exactDate]}`,
    defaultMessage:
      'This module will be available on <secondaryColorBold>{scheduleAt}</secondaryColorBold> and when you finish previous module',
  },
  [SCHEDULE_OPTIONS.daysAfterFill]: {
    id: `${scope}.${[SCHEDULE_OPTIONS.daysAfterFill]}`,
    defaultMessage:
      'This module will be available <secondaryColorBold>{schedulePayload} days</secondaryColorBold> after filling in the previous module',
  },
  [SCHEDULE_OPTIONS.daysAfter]: {
    id: `${scope}.${[SCHEDULE_OPTIONS.daysAfter]}`,
    defaultMessage:
      'This module will be available when you finish previous module and <secondaryColorBold>{schedulePayload} day</secondaryColorBold> after previous session is available',
  },
  [SCHEDULE_OPTIONS.daysAfterDate]: {
    id: `${scope}.${[SCHEDULE_OPTIONS.daysAfterDate]}`,
    defaultMessage:
      'This module will be available <secondaryColorBold>{schedulePayload} days</secondaryColorBold> after date provided in previous session in this intervention',
  },
});
