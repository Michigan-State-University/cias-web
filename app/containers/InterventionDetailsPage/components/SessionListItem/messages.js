/*
 * SessionListItem Messages
 *
 * This contains all the text for the SessionListItem container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SessionListItem';

export default defineMessages({
  duplicateHere: {
    id: `${scope}.duplicateHere`,
    defaultMessage: 'Duplicate here',
  },
  copy: {
    id: `${scope}.copy`,
    defaultMessage: 'Duplicate internally',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  pasteSession: {
    id: `${scope}.pasteSession`,
    defaultMessage: 'Paste session in this intervention',
  },
  reportsCount: {
    id: `${scope}.reportsCount`,
    defaultMessage: '{count} reports',
  },
  wcagDescription: {
    id: `${scope}.wcagDescription`,
    defaultMessage: 'Tile of Session: {name}',
  },
  estimateTime: {
    id: `${scope}.estimateTime`,
    defaultMessage: 'Estimate time to complete',
  },
  min: {
    id: `${scope}.min`,
    defaultMessage: 'min',
  },
});
