import { defineMessages } from 'react-intl';

export const scope = 'app.global.DefaultTlfbTitles';

export default defineMessages({
  'Question::TlfbConfig': {
    id: `${scope}.Question::TlfbConfig`,
    defaultMessage: 'Config',
  },
  'Question::TlfbEvents': {
    id: `${scope}.Question::TlfbEvents`,
    defaultMessage: 'Events',
  },
  'Question::TlfbQuestion': {
    id: `${scope}.Question::TlfbQuestion`,
    defaultMessage: 'Questions',
  },
});
