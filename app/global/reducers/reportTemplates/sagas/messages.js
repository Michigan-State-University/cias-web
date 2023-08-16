/*
 * Report Templates Messages
 *
 * This contains all the text for the ReportTemplates saga.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ReportTemplates';

export default defineMessages({
  duplicateReportTemplateSuccess: {
    id: `${scope}.duplicateReportTemplateSuccess`,
    defaultMessage: 'Successfully duplicated the report template',
  },
  duplicateReportTemplateFailure: {
    id: `${scope}.duplicateReportTemplateFailure`,
    defaultMessage: 'Failed to duplicate the report template',
  },
  addReportTemplateSuccess: {
    id: `${scope}.addReportTemplateSuccess`,
    defaultMessage: 'Successfully added the report template',
  },
  addReportTemplateFailure: {
    id: `${scope}.addReportTemplateFailure`,
    defaultMessage: 'Failed to add the report template',
  },
  deleteReportTemplateSuccess: {
    id: `${scope}.deleteReportTemplateSuccess`,
    defaultMessage: 'Successfully deleted the report template',
  },
  deleteReportTemplateFailure: {
    id: `${scope}.deleteReportTemplateFailure`,
    defaultMessage: 'Failed to delete the report template',
  },
  deleteReportTemplateLogoFailure: {
    id: `${scope}.deleteReportTemplateLogoFailure`,
    defaultMessage: 'Failed to delete the report template logo',
  },
  generateTestReportSuccess: {
    id: `${scope}.generateTestReportSuccess`,
    defaultMessage:
      'Test Report generation is in progress. You will receive an email with Test Report as an attachment when finished.',
  },
  generateTestReportFailure: {
    id: `${scope}.generateTestReportFailure`,
    defaultMessage: 'Failed to generate Test Report.',
  },
});
