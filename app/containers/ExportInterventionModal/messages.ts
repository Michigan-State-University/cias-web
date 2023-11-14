import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ExportInterventionModal';

export default defineMessages({
  exportInterventionModalTitle: {
    id: `${scope}.exportInterventionModalTitle`,
    defaultMessage: 'Export intervention',
  },
  exportInterventionModalDescription: {
    id: `${scope}.exportInterventionModalDescription`,
    defaultMessage:
      'Use this button to export intervention setup to a single file. Depending on intervention size, this action may take a while. We will notify you via e-mail once this action is finished.',
  },
  exportInterventionModalFileGeneratedDescription: {
    id: `${scope}.exportInterventionModalFileGeneratedDescription`,
    defaultMessage:
      'Download already generated file or use update button if there were any changes in this intervention since the current file was created.',
  },
  exportInterventionModalGenerateButtonTitle: {
    id: `${scope}.exportInterventionModalGenerateButtonTitle`,
    defaultMessage: 'Export intervention',
  },
});
