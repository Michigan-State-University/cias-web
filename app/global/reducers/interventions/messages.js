import { defineMessages } from 'react-intl';

export const scope = 'app.globals.reducers.interventions';

export default defineMessages({
  defaultError: {
    id: `${scope}.defaultError`,
    defaultMessage: 'Something went wrong.',
  },
  duplicateError: {
    id: `${scope}.duplicateError`,
    defaultMessage: 'There was an error during duplicating the Intervention!',
  },
  copyError: {
    id: `${scope}.copyError`,
    defaultMessage: 'There was an error during copying the Intervention!',
  },
  duplicateSuccess: {
    id: `${scope}.duplicateSuccess`,
    defaultMessage:
      'CIAS is copying your intervention. We will send you an e-mail when this process has been finished.',
  },
  copySuccess: {
    id: `${scope}.copySuccess`,
    defaultMessage: `CIAS is copying your intervention. We will send an e-mail to {
      userCount, plural,
      one {researcher}
      other {researchers}
    } when this process has been finished.`,
  },
  importSuccess: {
    id: `${scope}.importSuccess`,
    defaultMessage:
      'CIAS is importing your intervention. We will send you an e-mail when this process has been finished.',
  },
  importError: {
    id: `${scope}.importError`,
    defaultMessage: 'There was a problem with intervention import',
  },
  starInterventionError: {
    id: `${scope}.starInterventionError`,
    defaultMessage: 'There was an error staring the intervention',
  },
  unstarInterventionError: {
    id: `${scope}.unstarInterventionError`,
    defaultMessage: 'There was an error unstaring the intervention',
  },
});
