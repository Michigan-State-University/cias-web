/*
 * ReportTile Messages
 *
 * This contains all the text for the ReportTile.
 */

import { defineMessages } from 'react-intl';
import { reportFor } from 'models/GeneratedReport';

export const scope = 'app.containers.ReportTile';

export default defineMessages({
  download: {
    id: `${scope}.download`,
    defaultMessage: 'Download Report',
  },
  [reportFor.participant]: {
    id: `${scope}.${reportFor.participant}`,
    defaultMessage: 'Participant Report',
  },
  [reportFor.thirdParty]: {
    id: `${scope}.${reportFor.thirdParty}`,
    defaultMessage: 'Third Party Report',
  },
});
