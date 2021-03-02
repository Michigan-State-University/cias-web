/*
 * TextMessagesFormula
 *
 * This contains all the text for the TextMessagesFormula.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TextMessagesFormula';

export default defineMessages({
  addVariable: {
    id: `${scope}.addVariable`,
    defaultMessage: '+ Add variable',
  },
  formula: {
    id: `${scope}.formula`,
    defaultMessage: 'Formula',
  },
  formulaPlaceholder: {
    id: `${scope}.formulaPlaceholder`,
    defaultMessage:
      'Enter formula here... (You can use mathematical operators +, -, *, /)',
  },
});
