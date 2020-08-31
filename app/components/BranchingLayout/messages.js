import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BranchingLayout';

export default defineMessages({
  formula: {
    id: `${scope}.formula`,
    defaultMessage: 'Formula',
  },
  formulaPlaceholder: {
    id: `${scope}.formulaPlaceholder`,
    defaultMessage: 'Enter formula here...',
  },
  newCase: {
    id: `${scope}.newCase`,
    defaultMessage: '+ Add another case',
  },
  addVariable: {
    id: `${scope}.addVariable`,
    defaultMessage: '+ From list',
  },
  if: {
    id: `${scope}.if`,
    defaultMessage: 'If',
  },
  goTo: {
    id: `${scope}.goTo`,
    defaultMessage: 'go to',
  },
});