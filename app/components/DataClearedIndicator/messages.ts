import { defineMessages } from 'react-intl';

export const scope = 'app.components.DataClearedIndicator';

export default defineMessages({
  dataCleared: {
    id: `${scope}.dataCleared`,
    defaultMessage: 'Data cleared',
  },
  tooltipContext: {
    id: `${scope}.tooltipContext`,
    defaultMessage:
      'All sensitive data associated with this intervention has been removed, this includes user answers and generated report files.',
  },
});
