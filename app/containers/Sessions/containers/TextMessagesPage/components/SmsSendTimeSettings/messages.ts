import { defineMessages } from 'react-intl';

export const scope = 'app.components.SmsSendTimeSettings';

export default defineMessages({
  timeOfTheMessage: {
    id: `${scope}.timeOfTheMessage`,
    defaultMessage: 'Time of the message',
  },
  preferredByParticipant: {
    id: `${scope}.preferredByParticipant`,
    defaultMessage: 'Use preferred by participant time window',
  },
  exactTimeByResearcher: {
    id: `${scope}.exactTimeByResearcher`,
    defaultMessage: 'Exact time defined by researcher',
  },
  timeRangeByResearcher: {
    id: `${scope}.timeRangeByResearcher`,
    defaultMessage: 'Time window defined by researcher',
  },
  exactTime: {
    id: `${scope}.exactTime`,
    defaultMessage: 'Exact time',
  },
  from: {
    id: `${scope}.from`,
    defaultMessage: 'From',
  },
  to: {
    id: `${scope}.to`,
    defaultMessage: 'To',
  },
  time: {
    id: `${scope}.time`,
    defaultMessage: 'Time',
  },
});
