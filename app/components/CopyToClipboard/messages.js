import { defineMessages } from 'react-intl';

export const scope = 'app.components.CopyToClipboard';

export default defineMessages({
  copied: {
    id: `${scope}.copied`,
    defaultMessage: 'Copied!',
  },
  generateLink: {
    id: `${scope}.generateLink`,
    defaultMessage: 'Generate the link',
  },
  linkCopied: {
    id: `${scope}.linkCopied`,
    defaultMessage: 'Link copied!',
  },
});
