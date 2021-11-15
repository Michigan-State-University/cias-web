import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SuperadminConsolePage';

export default defineMessages({
  resetAudioButton: {
    id: `${scope}.resetAudioButton`,
    defaultMessage: 'Recreate All Audio',
  },
  resetAudioModalHeader: {
    id: `${scope}.resetAudioModalHeader`,
    defaultMessage: 'Recreate Audio',
  },
  resetAudioModalContent: {
    id: `${scope}.resetAudioModalContent`,
    defaultMessage:
      'Are you sure you want to perform this action? The costs for recreating audio will apply.',
  },
});
