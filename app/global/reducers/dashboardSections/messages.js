/*
 * DashboardSections reducer/saga Messages
 *
 * This contains all the text for the DashboardSections reducer/saga component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.dashboardSections';

export default defineMessages({
  deleteDashboardSectionSuccess: {
    id: `${scope}.deleteDashboardSectionSuccess`,
    defaultMessage: 'Section deleted successfully!',
  },
  deleteDashboardSectionError: {
    id: `${scope}.deleteDashboardSectionError`,
    defaultMessage: 'Failed to delete Section!',
  },
  cloneSuccess: {
    id: `${scope}.cloneSuccess`,
    defaultMessage: 'Chart has been cloned successfully',
  },
  cloneError: {
    id: `${scope}.cloneError`,
    defaultMessage: 'Failed to clone chart!',
  },
  editSectionError: {
    id: `${scope}.editSectionError`,
    defaultMessage:
      'Failed to edit section! Problem in those properties: {properties}.',
  },
});
