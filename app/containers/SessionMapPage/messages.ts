/*
 * SessionMapPage Messages
 *
 * This contains all the text for the SessionMapPage components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SessionMapPage';

export default defineMessages({
  sessionMap: {
    id: `${scope}.sessionMap`,
    defaultMessage: 'Session Map',
  },
  sessionMapComment: {
    id: `${scope}.sessionMapComment`,
    defaultMessage:
      'The session map is a tool that allows you to see the entire survey process.',
  },
  showWithBranchingOnly: {
    id: `${scope}.showWithBranchingOnly`,
    defaultMessage: 'Only show screens with branching',
  },
  afterPreview: {
    id: `${scope}.afterPreview`,
    defaultMessage: 'After user preview session',
  },
  showDetails: {
    id: `${scope}.showDetails`,
    defaultMessage: 'Show details',
  },
  screenNo: {
    id: `${scope}.screenNo`,
    defaultMessage: 'Screen {no}',
  },
  tlfbAssessment: {
    id: `${scope}.tlfbAssessment`,
    defaultMessage: 'TLFB Assessment',
  },
  tlfb: {
    id: `${scope}.tlfb`,
    defaultMessage: 'TLFB',
  },
  timelineFollowback: {
    id: `${scope}.timelineFollowback`,
    defaultMessage: 'Timeline Followback',
  },
  zoomInLabel: {
    id: `${scope}.zoomInLabel`,
    defaultMessage: 'Zoom In',
  },
  zoomOutLabel: {
    id: `${scope}.zoomOutLabel`,
    defaultMessage: 'Zoom Out',
  },
  redirectionTo: {
    id: `${scope}.redirectionTo`,
    defaultMessage: 'Redirection to Session {no}',
  },
  sessionNo: {
    id: `${scope}.sessionNo`,
    defaultMessage: 'Session {no}',
  },
  switchSession: {
    id: `${scope}.switchSession`,
    defaultMessage: `<p style='font-size: 10px;'>In <span style='font-weight: bold;'>“Session Map”</span> you can see only one session. Switch a session to see its map.</p>`,
  },
  downloadSessionMap: {
    id: `${scope}.downloadSessionMap`,
    defaultMessage: 'Download map as SVG',
  },
  withBackgroundCheckbox: {
    id: `${scope}.withBackgroundCheckbox`,
    defaultMessage: 'With background',
  },
  answersErrorToastMessage: {
    id: `${scope}.answersErrorToastMessage`,
    defaultMessage: 'Could not fetch preview session answers.',
  },
  collapseNodeTitle: {
    id: `${scope}.collapseNodeTitle`,
    defaultMessage: 'Screens without branching',
  },
  collapseNodeBody: {
    id: `${scope}.collapseNodeBody`,
    defaultMessage:
      'Screens from {firstCollapsedScreenNo} {to} {lastCollapsedScreenNo} are excluding branching, so they are hidden now. Uncheck the checkbox above the session map to see hidden screens.',
  },
  to: {
    id: `${scope}.to`,
    defaultMessage: 'to',
  },
});
