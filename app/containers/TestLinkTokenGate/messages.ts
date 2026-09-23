import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TestLinkTokenGate';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Test link not usable',
  },
  expiredHeader: {
    id: `${scope}.expiredHeader`,
    defaultMessage: 'This test link has expired',
  },
  expiredText: {
    id: `${scope}.expiredText`,
    defaultMessage:
      'Test links are short-lived. No session was started from this link. Copy a fresh test link from the intervention and open it straight away.',
  },
  invalidHeader: {
    id: `${scope}.invalidHeader`,
    defaultMessage: 'This test link is not valid',
  },
  invalidText: {
    id: `${scope}.invalidText`,
    defaultMessage:
      'The link could not be recognised, so it cannot be used for a test run. No session was started from this link. Copy a fresh test link from the intervention and open it straight away.',
  },
  unavailableHeader: {
    id: `${scope}.unavailableHeader`,
    defaultMessage: 'We could not check this test link',
  },
  unavailableText: {
    id: `${scope}.unavailableText`,
    defaultMessage:
      'No session was started from this link. Reload the page to try again.',
  },
});
