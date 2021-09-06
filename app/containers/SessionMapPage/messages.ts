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
    defaultMessage: 'Show screens only with branching',
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
  zoomInLabel: {
    id: `${scope}.zoomInLabel`,
    defaultMessage: 'Zoom In',
  },
  zoomOutLabel: {
    id: `${scope}.zoomOutLabel`,
    defaultMessage: 'Zoom Out',
  },
  redirectionTo: {
    id: `${scope}.sessionNo`,
    defaultMessage: 'Redirection to Session {no}',
  },
  sessionNo: {
    id: `${scope}.sessionNo`,
    defaultMessage: 'Session {no}',
  },
  switchSession: {
    id: `${scope}.switchSession`,
    defaultMessage:
      '<p style="font-size: 10px;">In <span style="font-weight: bold;">“Session Map”</span> you can see only one session. Switch a session to see its map.</p>',
  },
});
