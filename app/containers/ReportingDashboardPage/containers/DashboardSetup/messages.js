/*
 * DashboardSetup Messages
 *
 * This contains all the text for the DashboardSetup component.
 */
import { defineMessages } from 'react-intl';

import { ChartStatus, ChartTypeDto } from 'global/reducers/dashboardSections';

import { themeColors } from 'theme';

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
  addNewCase: {
    id: `${scope}.addNewCase`,
    defaultMessage: '+ Add next case',
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
  chartSettingsHeader: {
    id: `${scope}.chartSettingsHeader`,
    defaultMessage: `{chartType, select,
      ${ChartTypeDto.NUMERIC_BAR_CHART} {Bar Chart Settings}
      ${ChartTypeDto.PERCENTAGE_BAR_CHART} {Bar Chart Settings}
      ${ChartTypeDto.PIE_CHART} {Pie Chart Settings}
    }`,
  },
  chartSettingsDelete: {
    id: `${scope}.chartSettingsDelete`,
    defaultMessage: 'Delete',
  },
  chartSettingsStartCollectButton: {
    id: `${scope}.chartSettingsStartCollectButton`,
    defaultMessage: 'Start data collection',
  },
  chartSettingsPublishButton: {
    id: `${scope}.chartSettingsPublishButton`,
    defaultMessage: 'Publish chart',
  },
  chartSettingsNotEditableInfo: {
    id: `${scope}.chartSettingsNotEditableInfo`,
    defaultMessage: `Data are being collected. <span style="color: ${themeColors.warning};">From this moment you can not introduce any changes to the chart</span>.`,
  },
  chartSettingsPublishInfo: {
    id: `${scope}.chartSettingsPublishInfo`,
    defaultMessage:
      'You can review the final chart layout and publish it to a wider audience.',
  },
  chartSettingsNameLabel: {
    id: `${scope}.chartSettingsNameLabel`,
    defaultMessage: '<b>Chart Name</b> (If empty, field will not be displayed)',
  },
  chartSettingsNamePlaceholder: {
    id: `${scope}.chartSettingsNamePlaceholder`,
    defaultMessage: 'Enter chart name',
  },
  chartSettingsDescriptionLabel: {
    id: `${scope}.chartSettingsDescriptionLabel`,
    defaultMessage:
      '<b>Chart Description</b> (If empty, field will not be displayed)',
  },
  chartSettingsDescriptionPlaceholder: {
    id: `${scope}.chartSettingsDescriptionPlaceholder`,
    defaultMessage: 'Enter chart description',
  },
  chartSettingsFormulaLabel: {
    id: `${scope}.chartSettingsFormulaLabel`,
    defaultMessage: '<b>Formula *</b>',
  },
  chartSettingsAddVariable: {
    id: `${scope}.chartSettingsAddVariable`,
    defaultMessage: 'Add variable',
  },
  chartSettingsChartValues: {
    id: `${scope}.chartSettingsChartValues`,
    defaultMessage: '<b>Chart Values</b>',
  },
  chartSettingsChartValuesNumericOption: {
    id: `${scope}.chartSettingsChartValuesNumericOption`,
    defaultMessage: 'Numeric',
  },
  chartSettingsChartValuesPercentageOption: {
    id: `${scope}.chartSettingsChartValuesPercentageOption`,
    defaultMessage: 'Percentage',
  },
  chartSettingsChartValuesDescription: {
    id: `${scope}.chartSettingsChartValuesDescription`,
    defaultMessage: `{chartType, select,
      ${ChartTypeDto.NUMERIC_BAR_CHART} {The maximum Y-axis value will be the highest number of participants
                                      that match the criteria over the given time period}
      ${ChartTypeDto.PERCENTAGE_BAR_CHART} {The maximum Y-axis value will be 100%}
    }`,
  },
  chartSettingsTrendLineOption: {
    id: `${scope}.chartSettingsTrendLineOption`,
    defaultMessage: 'Display Trend Line',
  },
  chartSettingsFormulaPlaceholder: {
    id: `${scope}.chartSettingsFormulaPlaceholder`,
    defaultMessage: 'Enter Formula',
  },
  chartSettingsCopy: {
    id: `${scope}.chartSettingsCopy`,
    defaultMessage: 'Duplicate chart',
  },
  chartFormulaCaseLabelPlaceholder: {
    id: `${scope}.chartFormulaCaseLabelPlaceholder`,
    defaultMessage: 'Enter label',
  },
  chartFormulaCaseIf: {
    id: `${scope}.chartFormulaCaseIf`,
    defaultMessage: 'If formula',
  },
  chartFormulaCaseEquals: {
    id: `${scope}.chartFormulaCaseEquals`,
    defaultMessage: 'label is:',
  },
  barChartFormulaCaseEquals: {
    id: `${scope}.barChartFormulaCaseEquals`,
    defaultMessage: 'participant matches criteria',
  },
  chartFormulaOtherCase: {
    id: `${scope}.chartFormulaOtherCase`,
    defaultMessage: 'If results don’t match any cases then label is',
  },
  barChartFormulaOtherCase: {
    id: `${scope}.barChartFormulaOtherCase`,
    defaultMessage: "If other, participant doesn't match criteria",
  },
  chartStatus: {
    id: `${scope}.chartStatus`,
    defaultMessage: `{chartStatus, select,
      ${ChartStatus.DRAFT} {Draft}
      ${ChartStatus.DATA_COLLECTION} {Data Collection}
      ${ChartStatus.PUBLISHED} {Published}
    }`,
  },
  noChartsData: {
    id: `${scope}.noChartsData`,
    defaultMessage: 'No charts data',
  },
  deleteChartModalHeader: {
    id: `${scope}.deleteChartModalHeader`,
    defaultMessage: 'Delete Chart',
  },
  deleteChartModalMessage: {
    id: `${scope}.deleteChartModalMessage`,
    defaultMessage:
      'Are you sure you want to delete this chart? It will not be possible to recover it later.',
  },
  dashboardSectionsError: {
    id: `${scope}.dashboardSectionsError`,
    defaultMessage:
      'There was an issue with collecting your chart data. Please contact us at cias@msu.edu',
  },
});
