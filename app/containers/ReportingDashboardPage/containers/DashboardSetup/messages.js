/*
 * DashboardSetup Messages
 *
 * This contains all the text for the DashboardSetup component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.DashboardSetup';

export default defineMessages({
  dashboardSectionsHeader: {
    id: `${scope}.dashboardSectionsHeader`,
    defaultMessage: 'Dashboard Sections',
  },
  addNewSection: {
    id: `${scope}.addNewSection`,
    defaultMessage: '+ Add next section',
  },
  inputSectionNamePlaceholder: {
    id: `${scope}.inputSectionNamePlaceholder`,
    defaultMessage: 'Enter Section name',
  },
  inputSectionDescriptionPlaceholder: {
    id: `${scope}.inputSectionDescriptionPlaceholder`,
    defaultMessage: 'Add section description here',
  },
  addChart: {
    id: `${scope}.addChart`,
    defaultMessage: 'Select new chart to add',
  },
  pieChart: {
    id: `${scope}.pieChart`,
    defaultMessage: 'Pie Chart',
  },
  barChart: {
    id: `${scope}.barChart`,
    defaultMessage: 'Bar Chart',
  },
  pieChartHelper: {
    id: `${scope}.pieChartHelper`,
    defaultMessage: 'Show relation between different groups',
  },
  barChartHelper: {
    id: `${scope}.barChartHelper`,
    defaultMessage: 'Show people falling into cut off value',
  },
  chartSettingsDelete: {
    id: `${scope}.chartSettingsDelete`,
    defaultMessage: 'Delete',
  },
  chartSettingsStartCollectButton: {
    id: `${scope}.chartSettingsStartCollectButton`,
    defaultMessage: 'Start data collection',
  },
  chartSettingsStartCollectHelper: {
    id: `${scope}.chartSettingsStartCollectHelper`,
    defaultMessage: 'Start data collection',
  },
  chartSettingsNameLabel: {
    id: `${scope}.chartSettingsNameLabel`,
    defaultMessage: 'Chart Name (If empty field will not be displayed)',
  },
  chartSettingsNamePlaceholder: {
    id: `${scope}.chartSettingsNamePlaceholder`,
    defaultMessage: 'Enter chart name',
  },
  chartSettingsDescriptionLabel: {
    id: `${scope}.chartSettingsDescriptionLabel`,
    defaultMessage: 'Chart Description  (If empty field will not be displayed)',
  },
  chartSettingsDescriptionPlaceholder: {
    id: `${scope}.chartSettingsDescriptionPlaceholder`,
    defaultMessage: 'Enter chart description',
  },
  chartSettingsFormulaLabel: {
    id: `${scope}.chartSettingsFormulaLabel`,
    defaultMessage: 'Formula *',
  },
  chartSettingsFormulaDescription: {
    id: `${scope}.chartSettingsFormulaDescription`,
    defaultMessage: 'Enter Formula',
  },
  pieChartHeader: {
    id: `${scope}.pieChartHeader`,
    defaultMessage: 'Pie Chart Settings',
  },
});
