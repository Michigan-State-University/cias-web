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
  percentGoTo: {
    id: `${scope}.percentGoTo`,
    defaultMessage: '% go to',
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
  showRandomization: {
    id: `${scope}.showRandomization`,
    defaultMessage: 'Show randomization',
  },
  hideRandomization: {
    id: `${scope}.hideRandomization`,
    defaultMessage: 'Hide randomization',
  },
});
