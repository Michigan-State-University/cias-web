import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TlfbQuestionAnswer';

export default defineMessages({
  addSubstance: {
    id: `${scope}.addSubstance`,
    defaultMessage: 'Add another substance',
  },
  substanceSelectLabel: {
    id: `${scope}.substanceSelectLabel`,
    defaultMessage: 'Substance name',
  },
  amountLabel: {
    id: `${scope}.amountLabel`,
    defaultMessage: 'Amount',
  },
  amountPlaceholder: {
    id: `${scope}.amountPlaceholder`,
    defaultMessage: 'Provide amount',
  },
  removeItem: {
    id: `${scope}.removeItem`,
    defaultMessage: 'Remove item {index}',
  },
});
