/*
 * TextMessageCases
 *
 * This contains all the text for the TextMessageCases.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TextMessageCases';

export default defineMessages({
  if: {
    id: `${scope}.if`,
    defaultMessage: 'If',
  },
  sectionCaseContentHeader: {
    id: `${scope}.sectionCaseContentHeader`,
    defaultMessage: 'The text in the SMS is:',
  },
  sectionCaseContentPlaceholder: {
    id: `${scope}.sectionCaseContentPlaceholder`,
    defaultMessage: 'Enter text here',
  },
  addCaseButton: {
    id: `${scope}.addCaseButton`,
    defaultMessage: '+ Add next case',
  },
  formulaMatchLookup: {
    id: `${scope}.formulaMatchLookup`,
    defaultMessage: 'If formula {formulaMatch}',
  },
  case: {
    id: `${scope}.case`,
    defaultMessage: 'Case {index}',
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
