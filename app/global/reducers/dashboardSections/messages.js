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
  filterError: {
    id: `${scope}.filterError`,
    defaultMessage: `Couldn't fetch chart data`,
  },
  editSectionError: {
    id: `${scope}.editSectionError`,
    defaultMessage: `Failed to edit section! Check {properties} {propertiesCount, plural,
       one {property}
       other {properties}
     }.`,
  },
  reorderError: {
    id: `${scope}.reorderError`,
    defaultMessage: `Couldn't reorder dashboard sections`,
  },
  chartReorderError: {
    id: `${scope}.chartReorderError`,
    defaultMessage: `Couldn't reorder charts`,
  },
  filterChartDataError: {
    id: `${scope}.filterChartDataError`,
    defaultMessage: `There was an error fetching charts data`,
  },
});
