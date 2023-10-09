/*
 * SessionSchedule Messages
 *
 * This contains all the text for the SessionSchedule component.
 */

import { defineMessages } from 'react-intl';

import { SessionSchedule } from 'models/Session';

export const scope = 'app.components.SessionSchedule';

export default defineMessages({
  info: {
    id: `${scope}.info`,
    defaultMessage: 'If this session is next in the sequence',
  },
  sessionSchedulingHelp: {
    id: `${scope}.sessionSchedulingHelp`,
    defaultMessage: `Schedule when each session of your intervention is sent to participants. Learn more <a href='https://www.cias.app/_files/ugd/afc5c9_44a2c4b39b5e431daf98acdb4d61aa36.pdf' target='_blank'>here</a>. For more help resources, visit <a href='https://www.cias.app/resources' target='_blank'>www.cias.app/resources</a>.`,
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send ',
  },
  [SessionSchedule.DAYS_AFTER]: {
    id: `${scope}.${SessionSchedule.DAYS_AFTER}`,
    defaultMessage:
      'Send email invitation [X] days after previous session scheduled date',
  },
  [SessionSchedule.DAYS_AFTER_FILL]: {
    id: `${scope}.${[SessionSchedule.DAYS_AFTER_FILL]}`,
    defaultMessage:
      'Send email invitation [X] days after previous session completed date',
  },
  [SessionSchedule.DAYS_AFTER_DATE]: {
    id: `${scope}.${[SessionSchedule.DAYS_AFTER_DATE]}`,
    defaultMessage:
      'Send email invitation [X] days after a date provided by participant',
  },
  [SessionSchedule.EXACT_DATE]: {
    id: `${scope}.${[SessionSchedule.EXACT_DATE]}`,
    defaultMessage: 'Send email invitation on exact date',
  },
  [SessionSchedule.AFTER_FILL]: {
    id: `${scope}.${[SessionSchedule.AFTER_FILL]}`,
    defaultMessage:
      'Send email invitation immediately after previous session completion',
  },
  [SessionSchedule.IMMEDIATELY]: {
    id: `${scope}.${SessionSchedule.IMMEDIATELY}`,
    defaultMessage:
      'Start session immediately after previous session completion',
  },
  daysAfterInfo: {
    id: `${scope}.daysAfterInfo`,
    defaultMessage: 'days after previous session scheduled date.',
  },
  daysAfterFillInfo: {
    id: `${scope}.daysAfterFillInfo`,
    defaultMessage: 'days after previous session completed date.',
  },
  daysAfterDateInfo: {
    id: `${scope}.daysAfterDateInfo`,
    defaultMessage: 'days after a date provided by participant',
  },
  exactDateInfo: {
    id: `${scope}.exactDateInfo`,
    defaultMessage: 'on exact date',
  },
  enterNumber: {
    id: `${scope}.enterNumber`,
    defaultMessage: 'Enter number',
  },
  default: {
    id: `${scope}.default`,
    defaultMessage: 'Select option',
  },
  timeInfo: {
    id: `${scope}.timeInfo`,
    defaultMessage: '*The information will be sent at',
  },
  daysAfterDateVariableEmpty: {
    id: `${scope}.daysAfterDateVariableEmpty`,
    defaultMessage: 'Choose variable',
  },
  daysAfterDateVariableInfo: {
    id: `${scope}.daysAfterDateVariableInfo`,
    defaultMessage: '(Date Screen variable which should be used)',
  },
});
