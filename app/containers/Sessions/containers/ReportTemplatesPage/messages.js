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
});
