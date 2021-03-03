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
  addNameVariableButton: {
    id: `${scope}.addNameVariableButton`,
    defaultMessage: "+ Insert 'name' variable",
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
});
