/*
 * QuestionTranscript Messages
 *
 * This contains all the text for the QuestionTranscript container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.QuestionTranscript';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Narrator Transcription',
  },
  emptyState: {
    id: `${scope}.emptyState`,
    defaultMessage: 'No Transcription for that Question!',
  },
});
