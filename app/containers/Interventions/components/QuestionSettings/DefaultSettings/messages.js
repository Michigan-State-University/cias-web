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
});
