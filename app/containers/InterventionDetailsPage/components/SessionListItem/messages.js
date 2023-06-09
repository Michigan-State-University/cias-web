/*
 * SessionListItem Messages
 *
 * This contains all the text for the SessionListItem container.
 */
import { defineMessages } from 'react-intl';
import { draft, closed, archived } from 'models/Status/StatusTypes';

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
  inviteLabel: {
    id: `${scope}.inviteLabel`,
    defaultMessage: 'Invite Participants',
  },
  tooltip: {
    id: `${scope}.tooltip`,
    defaultMessage:
      'You can invite participants only to the published interventions.',
  },
  [`tooltip-${draft}`]: {
    id: `${scope}.tooltip`,
    defaultMessage:
      "You can't invite participants to the draft sessions. Publish intervention to activate invitations.",
  },
  [`tooltip-${closed}`]: {
    id: `${scope}.tooltip`,
    defaultMessage:
      'This intervention has been closed. You can invite participants only to the active, published interventions.',
  },
  [`tooltip-${archived}`]: {
    id: `${scope}.tooltip`,
    defaultMessage:
      'This intervention has been archived. You can invite participants only to the active, published interventions.',
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
