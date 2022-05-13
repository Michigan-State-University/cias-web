import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Feedback';

export default defineMessages({
  startValue: {
    id: `${scope}.startValue`,
    defaultMessage: 'Least',
  },
  endValue: {
    id: `${scope}.endValue`,
    defaultMessage: 'Most',
  },
  addVariable: {
    id: `${scope}.addVariable`,
    defaultMessage: 'Add variable',
  },
  spectrumHeader: {
    id: `${scope}.spectrumHeader`,
    defaultMessage: 'End-User Value',
  },
  formulaPlaceholder: {
    id: `${scope}.formulaPlaceholder`,
    defaultMessage:
      'Enter formula here... (You can use mathematical operators +, -, *, /)',
  },
  newCase: {
    id: `${scope}.newCase`,
    defaultMessage: '+ Add another case',
  },
  if: {
    id: `${scope}.if`,
    defaultMessage: 'If',
  },
  equalsTo: {
    id: `${scope}.equalsTo`,
    defaultMessage: 'end user value is',
  },
  feedbackLabel: {
    id: `${scope}.feedbackLabel`,
    defaultMessage: 'This is your feedback value presented on a slider scale:',
  },
});
