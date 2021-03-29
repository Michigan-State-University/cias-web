/*
 * TargetQuestionChooser Messages
 *
 * This contains all the text for the TargetQuestionChooser container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TargetQuestionChooser';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Next Screen',
  },
  sessionListHeader: {
    id: `${scope}.sessionListHeader`,
    defaultMessage: 'Sessions in',
  },
  interventionsListHeader: {
    id: `${scope}.interventionsListHeader`,
    defaultMessage: 'Your Interventions',
  },
  questionGroupsListHeader: {
    id: `${scope}.questionGroupsListHeader`,
    defaultMessage: 'Question Groups in ',
  },
  selectedInterventionBadge: {
    id: `${scope}.selectedInterventionBadge`,
    defaultMessage: 'Current',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back',
  },
  select: {
    id: `${scope}.select`,
    defaultMessage: 'Paste here',
  },
  noValidQuestionGroups: {
    id: `${scope}.noValidQuestionGroups`,
    defaultMessage: 'No valid question groups to copy to',
  },
  copyInternally: {
    id: `${scope}.copyInternally`,
    defaultMessage: 'Paste to Current',
  },
  sessions: {
    id: `${scope}.sessions`,
    defaultMessage: 'Sessions',
  },
  interventions: {
    id: `${scope}.interventions`,
    defaultMessage: 'Interventions',
  },
  noSessions: {
    id: `${scope}.noSessions`,
    defaultMessage: 'No Sessions',
  },
});
