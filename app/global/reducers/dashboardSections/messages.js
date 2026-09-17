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
    defaultMessage: `Failed to edit section! Check {properties} {propertiesCount, plural, one {property} other {properties}}.`,
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
  regenerateChartSuccess: {
    id: `${scope}.regenerateChartSuccess`,
    defaultMessage: `Chart regeneration has started. You'll get an email when it finishes - refresh the page then to see the updated chart.`,
  },
  regenerateChartError: {
    id: `${scope}.regenerateChartError`,
    defaultMessage: `Couldn't start regenerating this chart.`,
  },
  regenerateChartStillRunning: {
    id: `${scope}.regenerateChartStillRunning`,
    defaultMessage: `This chart is taking longer than usual to regenerate. It is still running - reload the page later to see the result.`,
  },
  editChartError: {
    id: `${scope}.editChartError`,
    defaultMessage: `Failed to save the chart — your last change was reverted.`,
  },
});
