/*
 * InterventionBranching Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.InterventionBranching';

export default defineMessages({
  nextSession: {
    id: `${scope}.nextSession`,
    defaultMessage: 'Next Session:',
  },
  useFormula: {
    id: `${scope}.useFormula`,
    defaultMessage: 'Use formula',
  },
  newCase: {
    id: `${scope}.newCase`,
    defaultMessage: 'Add another case',
  },
  formulaPlaceholder: {
    id: `${scope}.formulaPlaceholder`,
    defaultMessage: 'Enter formula here...',
  },
  formula: {
    id: `${scope}.formula`,
    defaultMessage: 'According to the formula below',
  },
  selectSession: {
    id: `${scope}.selectQuestion`,
    defaultMessage: 'Select session',
  },
});
