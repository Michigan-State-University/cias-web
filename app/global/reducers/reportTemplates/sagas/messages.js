/*
 * Report Templates Messages
 *
 * This contains all the text for the ReportTemplates saga.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ReportTemplates';

export default defineMessages({
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
});
