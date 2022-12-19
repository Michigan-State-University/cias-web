import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DefaultSettings';

export default defineMessages({
  resetAnimationPosition: {
    id: `${scope}.resetAnimationPosition`,
    defaultMessage: 'Reset Narrator to previous block position',
  },
  addNameVariable: {
    id: `${scope}.addNameVariable`,
    defaultMessage: '+ Add Name Variable',
  },
  speechPlaceholder: {
    id: `${scope}.speechPlaceholder`,
    defaultMessage: 'Enter speech here...',
  },
  noQuestions: {
    id: `${scope}.noQuestions`,
    defaultMessage: 'No questions available',
  },
});
