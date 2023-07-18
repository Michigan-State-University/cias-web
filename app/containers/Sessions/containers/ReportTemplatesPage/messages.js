import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ReportTemplatesPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Report Templates',
  },
  reportsEmpty: {
    id: `${scope}.reportsEmpty`,
    defaultMessage: 'No reports yet!',
  },
  reorderIconAlt: {
    id: `${scope}.reorderIconAlt`,
    defaultMessage: 'Reorder icon',
  },
  reportsError: {
    id: `${scope}.reportsError`,
    defaultMessage:
      'Some error occurred during fetching of the report templates',
  },
  addReportButton: {
    id: `${scope}.addReportButton`,
    defaultMessage: '+ Add new report template',
  },
  settingsHeader: {
    id: `${scope}.settingsHeader`,
    defaultMessage: 'Report Settings',
  },
  reportSettingsHelp: {
    id: `${scope}.reportSettingsHelp`,
    defaultMessage: `You can send PDF's to participants and third parties. Click <a href="https://www.cias.app/_files/ugd/afc5c9_1991a91265054184819f8632193e65cc.pdf" target="_blank">here</a> to see a step-by-step guide. For more help resources, visit <a href="https://www.cias.app/resources" target="_blank">www.cias.app/resources</a>.`,
  },
  sectionSettingsHeader: {
    id: `${scope}.sectionSettingsHeader`,
    defaultMessage: 'Section Settings',
  },
  settingsDownloadReportButton: {
    id: `${scope}.settingsDownloadReportButton`,
    defaultMessage: 'Download test report',
  },
  settingsReportFor: {
    id: `${scope}.settingsReportFor`,
    defaultMessage: 'Report for:',
  },
  settingsReportForParticipant: {
    id: `${scope}.settingsReportForParticipant`,
    defaultMessage: 'Participant',
  },
  settingsReportFor3rdParty: {
    id: `${scope}.settingsReportFor3rdParty`,
    defaultMessage: '3rd Party',
  },
  settingsReportForHenryFordHealth: {
    id: `${scope}.settingsReportForHenryFordHealth`,
    defaultMessage: 'Henry Ford',
  },
  settingsLogo: {
    id: `${scope}.settingsLogo`,
    defaultMessage: 'Put logo on the report',
  },
  settingsName: {
    id: `${scope}.settingsName`,
    defaultMessage: 'Use Different Name in the Panel',
  },
  settingsNamePlaceholder: {
    id: `${scope}.settingsNamePlaceholder`,
    defaultMessage: 'Enter report name',
  },
  settingsDeleteReportTemplateButton: {
    id: `${scope}.settingsDeleteReportTemplateButton`,
    defaultMessage: 'Delete Report Template',
  },
  deleteTemplateSectionButton: {
    id: `${scope}.deleteTemplateSectionButton`,
    defaultMessage: 'Delete Section',
  },
  sectionCaseTitleToggle: {
    id: `${scope}.sectionCaseTitleToggle`,
    defaultMessage: 'Section Title',
  },
  sectionCaseTitleHeader: {
    id: `${scope}.sectionCaseTitleHeader`,
    defaultMessage: 'The Title of the Section is:',
  },
  sectionCaseTitlePlaceholder: {
    id: `${scope}.sectionCaseTitlePlaceholder`,
    defaultMessage: 'Enter Title here',
  },
  sectionCaseContentHeader: {
    id: `${scope}.sectionCaseContentHeader`,
    defaultMessage: 'The text in the report is:',
  },
  sectionCaseContentPlaceholder: {
    id: `${scope}.sectionCaseContentPlaceholder`,
    defaultMessage: 'Enter Text here',
  },
  sectionCaseImageHeader: {
    id: `${scope}.sectionCaseImageHeader`,
    defaultMessage: 'Image in the report is:',
  },
  previewCaseRadio: {
    id: `${scope}.previewCaseRadio`,
    defaultMessage: 'Preview this case',
  },
  formulaMatchLookup: {
    id: `${scope}.formulaMatchLookup`,
    defaultMessage: 'If formula {formulaMatch}',
  },
  addCaseButton: {
    id: `${scope}.addCaseButton`,
    defaultMessage: '+ Add next case',
  },
  addVariableButton: {
    id: `${scope}.addVariableButton`,
    defaultMessage: '+ Add variable',
  },
  addSectionButton: {
    id: `${scope}.addSectionButton`,
    defaultMessage: '+ Add next section',
  },
  emptySection: {
    id: `${scope}.emptySection`,
    defaultMessage: 'Empty Section',
  },
  caseTitle: {
    id: `${scope}.caseTitle`,
    defaultMessage: 'Case {index}',
  },
  reportHeaderPlaceholder: {
    id: `${scope}.reportHeaderPlaceholder`,
    defaultMessage: "Enter report's Summary",
  },
  formula: {
    id: `${scope}.formula`,
    defaultMessage: 'Formula',
  },
  formulaPlaceholder: {
    id: `${scope}.formulaPlaceholder`,
    defaultMessage:
      'Enter formula here... (You can use mathematical operators +, -, *, /)',
  },
  addVariable: {
    id: `${scope}.addVariable`,
    defaultMessage: 'Add variable',
  },
  if: {
    id: `${scope}.if`,
    defaultMessage: 'If formula',
  },
  deleteReportTemplateHeader: {
    id: `${scope}.deleteReportTemplateHeader`,
    defaultMessage: 'Delete Report Template',
  },
  deleteReportTemplateMessage: {
    id: `${scope}.deleteReportTemplateMessage`,
    defaultMessage:
      'Are you sure you want to delete this Report Template? It will not be possible to recover it later.',
  },
  deleteReportTemplateSectionHeader: {
    id: `${scope}.deleteReportTemplateSectionHeader`,
    defaultMessage: 'Delete Report Template Section',
  },
  deleteReportTemplateSectionMessage: {
    id: `${scope}.deleteReportTemplateSectionMessage`,
    defaultMessage:
      'Are you sure you want to delete this Report Template Section? It will not be possible to recover it later.',
  },
  deleteSectionCaseHeader: {
    id: `${scope}.deleteSectionCaseHeader`,
    defaultMessage: 'Delete Case',
  },
  deleteSectionCaseMessage: {
    id: `${scope}.deleteSectionCaseMessage`,
    defaultMessage:
      'Are you sure you want to delete this Case? It will not be possible to recover it later.',
  },
  hfhReportTypeTooltipContent: {
    id: `${scope}.hfhReportTypeTooltipContent`,
    defaultMessage:
      "This report was set up for Henry Ford, but the owner of the intervention turned off HF access, so you have to change the report's destination because for now the report won't be sent to anyone. If the owner turns on the HF access then you will be able to send the report to HF again.",
  },
});
