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
    id: `${scope}.participant`,
    defaultMessage: 'Participant Report',
  },
  [reportFor.thirdParty]: {
    id: `${scope}.third_party`,
    defaultMessage: 'Third Party Report',
  },
  [reportFor.henryFordHealth]: {
    id: `${scope}.henry_ford_health`,
    defaultMessage: "Henry Ford Health's Report",
  },
});
