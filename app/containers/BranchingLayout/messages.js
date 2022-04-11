import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BranchingLayout';

export default defineMessages({
  formula: {
    id: `${scope}.formula`,
    defaultMessage: 'Formula',
  },
  case: {
    id: `${scope}.case`,
    defaultMessage: 'Case { index }',
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
    defaultMessage: '+ Add variable',
  },
  if: {
    id: `${scope}.if`,
    defaultMessage: 'If',
  },
  goTo: {
    id: `${scope}.goTo`,
    defaultMessage: 'go to',
  },
  percentGoTo: {
    id: `${scope}.percentGoTo`,
    defaultMessage: 'go to',
  },
  else: {
    id: `${scope}.else`,
    defaultMessage: 'In every other case go to { message }',
  },
  nextScreen: {
    id: `${scope}.nextScreen`,
    defaultMessage: 'following screen',
  },
  nextSession: {
    id: `${scope}.nextSession`,
    defaultMessage: 'following session',
  },
  percentagesSumInvalid: {
    id: `${scope}.percentagesSumInvalid`,
    defaultMessage: 'Sum of random branching percentages must equal 100%',
  },
  addRandomization: {
    id: `${scope}.addRandomization`,
    defaultMessage: 'Add randomization',
  },
  hideRandomization: {
    id: `${scope}.hideRandomization`,
    defaultMessage: 'Hide randomization',
  },
  deleteCaseHeader: {
    id: `${scope}.deleteCaseHeader`,
    defaultMessage: 'Delete Case',
  },
  deleteCaseMessage: {
    id: `${scope}.deleteCaseMessage`,
    defaultMessage:
      'Are you sure you want to delete this Case? It will not be possible to recover it later.',
  },
});
