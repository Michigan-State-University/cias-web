import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BranchingLayout';

export default defineMessages({
  formula: {
    id: `${scope}.formula`,
    defaultMessage: 'Formula',
  },
  formulaPlaceholder: {
    id: `${scope}.formulaPlaceholder`,
    defaultMessage:
      'Enter formula here... (You can use mathematical operators +, -, *, /)',
  },
  newCase: {
    id: `${scope}.newCase`,
    defaultMessage: '+ Add case',
  },
  addVariable: {
    id: `${scope}.addVariable`,
    defaultMessage: 'Add variable',
  },
  if: {
    id: `${scope}.if`,
    defaultMessage: 'If',
  },
  goTo: {
    id: `${scope}.goTo`,
    defaultMessage: 'go to',
  },
  else: {
    id: `${scope}.else`,
    defaultMessage: 'In every other case go to { message }',
  },
  nextScreen: {
    id: `${scope}.nextScreen`,
    defaultMessage: 'Next Screen',
  },
  nextSession: {
    id: `${scope}.nextSession`,
    defaultMessage: 'Next Session',
  },
});
