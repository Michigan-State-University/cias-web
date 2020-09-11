/*
 * InterventionSchedule Messages
 *
 * This contains all the text for the InterventionSchedule component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.InterventionSchedule';

export default defineMessages({
  info: {
    id: `${scope}.info`,
    defaultMessage: 'If this session is next in the sequence',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send ',
  },
  daysAfter: {
    id: `${scope}.daysAfter`,
    defaultMessage: 'Send [X] days after previous session scheduled date',
  },
  daysAfterFill: {
    id: `${scope}.daysAfterFill`,
    defaultMessage: 'Send [X] days after previous session completed date',
  },
  exactDate: {
    id: `${scope}.exactDate`,
    defaultMessage: 'Send on exact date',
  },
  daysAfterInfo: {
    id: `${scope}.daysAfterInfo`,
    defaultMessage: 'days after previous session scheduled date.',
  },
  daysAfterFillInfo: {
    id: `${scope}.daysAfterFillInfo`,
    defaultMessage: 'days after previous session completed date.',
  },
  exactDateInfo: {
    id: `${scope}.exactDateInfo`,
    defaultMessage: 'on exact date',
  },
  enterNumber: {
    id: `${scope}.enterNumber`,
    defaultMessage: 'Enter number',
  },
  chooseDate: {
    id: `${scope}.chooseDate`,
    defaultMessage: 'Choose date',
  },
  default: {
    id: `${scope}.default`,
    defaultMessage: 'Select option',
  },
  timeInfo: {
    id: `${scope}.timeInfo`,
    defaultMessage: '*The information will be sent at 12.00 AM [UTC -5]',
  },
});
