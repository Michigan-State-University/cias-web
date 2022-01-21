import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TlfbEvents';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: `Events Screen Informations`,
  },
  eventsScreenTitle: {
    id: `${scope}.eventsScreenTitle`,
    defaultMessage: 'Events Screen Title',
  },
  eventsScreenTitlePlaceholder: {
    id: `${scope}.eventsScreenTitlePlaceholder`,
    defaultMessage: 'e.g. Preparing the calendar',
  },
  eventsScreenQuestion: {
    id: `${scope}.eventsScreenQuestion`,
    defaultMessage: 'Events Screen Question',
  },
  eventsScreenQuestionPlaceholder: {
    id: `${scope}.eventsScreenQuestionPlaceholder`,
    defaultMessage:
      'e.g. Mark events in the calendar, eg. birthdays, religious holidays etc.',
  },
});
