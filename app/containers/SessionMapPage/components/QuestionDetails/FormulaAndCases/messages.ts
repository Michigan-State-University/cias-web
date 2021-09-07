/*
 * FormulaAndCases Messages
 *
 * This contains all the text for the FormulaAndCases components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FormulaAndCases';

export default defineMessages({
  branchingFormulaAndCases: {
    id: `${scope}.branchingFormulaAndCases`,
    defaultMessage: 'Branching formula & cases',
  },
  feedbackFormulaAndCases: {
    id: `${scope}.feedbackFormulaAndCases`,
    defaultMessage: 'Feedback formula & cases',
  },
  if: {
    id: `${scope}.if`,
    defaultMessage: `if {match}`,
  },
  endUserValueIs: {
    id: `${scope}.endUserValueIs`,
    defaultMessage: `end user value is {endUserValue}`,
  },
  goTo: {
    id: `${scope}.goTo`,
    defaultMessage: `{probability} go to {subtarget}`,
  },
});
