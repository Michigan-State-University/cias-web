import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ParticipantInterventionsPage';

export default defineMessages({
  myInterventions: {
    id: `${scope}.myInterventions`,
    defaultMessage: 'My interventions',
  },
  modules: {
    id: `${scope}.modules`,
    defaultMessage: 'Modules: ',
  },
  completion: {
    id: `${scope}.completion`,
    defaultMessage: 'Completion: ',
  },
  noDataMessage: {
    id: `${scope}.noDataMessage`,
    defaultMessage:
      'Welcome to CIAS! If you are invited to any interventions, you will be able to find them here.',
  },
  noAccessTooltip: {
    id: `${scope}.noAccessTooltip`,
    defaultMessage: `You got invited to intervention that you don't have access for. Contact your researcher to get access.`,
  },
  pausedInterventionTooltip: {
    id: `${scope}.pausedInterventionTooltip`,
    defaultMessage: `This study has been temporarily paused. Please try again later.`,
  },
});
