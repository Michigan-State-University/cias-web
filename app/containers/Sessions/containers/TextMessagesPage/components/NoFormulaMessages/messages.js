import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TextMessageCases';

export default defineMessages({
  label: {
    id: `${scope}.label`,
    defaultMessage: 'The text in the SMS is:',
  },
  textMessagePlaceholder: {
    id: `${scope}.textMessagePlaceholder`,
    defaultMessage: 'Enter text here',
  },
  attachmentNoFormulaLabel: {
    id: `${scope}.attachmentNoFormulaLabel`,
    defaultMessage: 'Attachment in the SMS is:',
  },
});
