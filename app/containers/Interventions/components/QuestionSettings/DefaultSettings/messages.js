import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DefaultSettings';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Title',
  },
  video: {
    id: `${scope}.video`,
    defaultMessage: 'Video',
  },
  image: {
    id: `${scope}.image`,
    defaultMessage: 'Image',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  animation: {
    id: `${scope}.animation`,
    defaultMessage: 'Animation',
  },
  narrator: {
    id: `${scope}.narrator`,
    defaultMessage: 'Narrator',
  },
  voice: {
    id: `${scope}.voice`,
    defaultMessage: 'Voice',
  },
});
