/*
 * Sidebar Messages
 *
 * This contains all the text for the Sidebar container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Sidebar';

export default defineMessages({
  sidebarNavigationHeader: {
    id: `${scope}.sidebarNavigationHeader`,
    defaultMessage: 'CIAS Panel',
  },
  showSidebarButtonLabel: {
    id: `${scope}.showSidebarButtonLabel`,
    defaultMessage: 'Hover to show sidebar',
  },
  showSidebarIcon: {
    id: `${scope}.showSidebarIcon`,
    defaultMessage: 'Show sidebar icon',
  },
});
