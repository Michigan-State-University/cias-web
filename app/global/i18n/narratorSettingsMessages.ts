import { defineMessages } from 'react-intl';

import { NarratorSettingsKey } from 'models/Narrator';

export const scope = 'app.global.NarratorSettings';

export default defineMessages<NarratorSettingsKey>({
  voice: {
    id: `${scope}.voice`,
    defaultMessage: 'Voice',
  },
  animation: {
    id: `${scope}.animation`,
    defaultMessage: 'Display Narrator',
  },
  extra_space_for_narrator: {
    id: `${scope}.extra_space_for_narrator`,
    defaultMessage: 'Extra Space for Narrator',
  },
  character: {
    id: `${scope}.character`,
    defaultMessage: 'Character',
  },
});
