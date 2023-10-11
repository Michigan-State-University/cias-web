import { defineMessages } from 'react-intl';

import { NarratorSettingsKey } from 'models/Narrator';

export const scope = 'app.global.NarratorSettings';

export default defineMessages<NarratorSettingsKey>({
  [NarratorSettingsKey.VOICE]: {
    id: `${scope}.voice`,
    defaultMessage: 'Voice',
  },
  [NarratorSettingsKey.ANIMATION]: {
    id: `${scope}.animation`,
    defaultMessage: 'Display Narrator',
  },
  [NarratorSettingsKey.EXTRA_SPACE_FOR_NARRATOR]: {
    id: `${scope}.extra_space_for_narrator`,
    defaultMessage: 'Extra Space for Narrator',
  },
  [NarratorSettingsKey.CHARACTER]: {
    id: `${scope}.character`,
    defaultMessage: 'Character',
  },
});
