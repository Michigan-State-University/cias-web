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
    defaultMessage: `{chartType, select, bar_chart {Bar Chart Settings} percentage_bar_chart {Bar Chart Settings} pie_chart {Pie Chart Settings} other {}}`,
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
  chartSettingsStaleMinAnsweredBlocked: {
    id: `${scope}.chartSettingsStaleMinAnsweredBlocked`,
    defaultMessage:
      'Data collection cannot start while the minimum answered items is higher than the number of variables the formula references. Lower the minimum first — once collection starts, the chart can no longer be edited.',
  },
  chartSettingsNotEditableInfo: {
    id: `${scope}.chartSettingsNotEditableInfo`,
    defaultMessage: `Data are being collected. <span style='color: #D2371D;'>From this moment you can not introduce any changes to the chart</span>.`,
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
    defaultMessage: '+ Add variable',
  },
  chartSettingsIntervalType: {
    id: `${scope}.chartSettingsIntervalType`,
    defaultMessage: '<b>Time Interval</b>',
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
    defaultMessage: `{chartType, select, bar_chart {The maximum Y-axis value will be the highest number of participants that match the criteria over the given time period} percentage_bar_chart {The maximum Y-axis value will be 100%} other {}}`,
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
    defaultMessage: `{chartStatus, select, draft {Draft} data_collection {Data Collection} published {Published} other {}}`,
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
  startDateLabel: {
    id: `${scope}.startDateLabel`,
    defaultMessage: 'Date from (optional)',
  },
  endDateLabel: {
    id: `${scope}.endDateLabel`,
    defaultMessage: 'Date to (optional)',
  },
  chartValiditySettingsLabel: {
    id: `${scope}.chartValiditySettingsLabel`,
    defaultMessage: '<b>Participant validity</b>',
  },
  chartValiditySingleInstrumentHint: {
    id: `${scope}.chartValiditySingleInstrumentHint`,
    defaultMessage:
      'Controls which participants this chart counts. A participant who answers too few of the formula variables is shown as their own Invalid / Insufficient Data category rather than dropped from the chart.',
  },
  chartValidityMinAnsweredLabel: {
    id: `${scope}.chartValidityMinAnsweredLabel`,
    defaultMessage: 'Minimum answered items (variables) required',
  },
  chartValidityMinAnsweredOutOf: {
    id: `${scope}.chartValidityMinAnsweredOutOf`,
    defaultMessage: 'out of {variableCount}',
  },
  chartValidityMinAnsweredHint: {
    id: `${scope}.chartValidityMinAnsweredHint`,
    defaultMessage:
      '0 turns the check off. The count covers every variable in the formula - a Single question is one variable, a Multiple question one per option.',
  },
  chartValidityStaleMinAnsweredNotice: {
    id: `${scope}.chartValidityStaleMinAnsweredNotice`,
    defaultMessage:
      'The minimum is set to {minAnswered}, but the formula now has only {variableCount} {variableCount, plural, one {variable} other {variables}}. No participant can meet it — lower the minimum.',
  },
  chartValidityThresholdLabel: {
    id: `${scope}.chartValidityThresholdLabel`,
    defaultMessage: 'Positive Despite Missing Data',
  },
  chartValidityThresholdHint: {
    id: `${scope}.chartValidityThresholdHint`,
    defaultMessage:
      "When checked, a participant below the minimum still counts if their score (missing answers count as 0) already matches one of the chart's cases - they can never land in the default category. Leave unchecked and they are classified as Invalid / Insufficient Data.",
  },
  barChartTooltipPopulation: {
    id: `${scope}.barChartTooltipPopulation`,
    defaultMessage: 'Population: {value}',
  },
  barChartTooltipMatched: {
    id: `${scope}.barChartTooltipMatched`,
    defaultMessage: 'Matched: {value}',
  },
  barChartTooltipNotMatched: {
    id: `${scope}.barChartTooltipNotMatched`,
    defaultMessage: 'Not matched: {value}',
  },
  barChartTooltipInvalid: {
    id: `${scope}.barChartTooltipInvalid`,
    defaultMessage: 'Invalid / Insufficient Data: {value}',
  },
  barChartTooltipInvalidWithShare: {
    id: `${scope}.barChartTooltipInvalidWithShare`,
    defaultMessage: 'Invalid / Insufficient Data: {value} ({share}%)',
  },
});
