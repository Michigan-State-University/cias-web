/*
 * QuestionVideo Messages
 *
 * This contains all the text for the QuestionVideo component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.QuestionVideo';

export default defineMessages({
  videoText: {
    id: `${scope}.videoText`,
    defaultMessage: 'Use videos from YouTube or Vimeo. Paste link here.',
  },
});
