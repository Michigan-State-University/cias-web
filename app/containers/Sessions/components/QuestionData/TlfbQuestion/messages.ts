import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TlfbEvents';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Question Information',
  },
  substancesTitle: {
    id: `${scope}.substancesTitle`,
    defaultMessage: 'Substances with groups',
  },
  questionTitle: {
    id: `${scope}.questionTitle`,
    defaultMessage: 'Question title',
  },
  headTitle: {
    id: `${scope}.headTitle`,
    defaultMessage: 'Head Question',
  },
  substanceTitle: {
    id: `${scope}.substanceTitle`,
    defaultMessage: 'Substance Question',
  },
  questionTitlePlaceholder: {
    id: `${scope}.questionTitlePlaceholder`,
    defaultMessage: 'E.g. Sample question title',
  },
  headTitlePlaceholder: {
    id: `${scope}.headTitlePlaceholder`,
    defaultMessage:
      'E.g. Mark the days when you used substances, specify its type and amount',
  },
  substanceTitlePlaceholder: {
    id: `${scope}.substanceTitlePlaceholder`,
    defaultMessage: 'E.g. Did you consume any substances on that day?',
  },
  addNewSubstance: {
    id: `${scope}.addNewSubstance`,
    defaultMessage: 'Add new substance',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
});
