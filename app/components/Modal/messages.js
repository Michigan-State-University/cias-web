import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Modal';

export default defineMessages({
  closeButtonLabel: {
    id: `${scope}.closeButtonLabel`,
    defaultMessage: 'Close window',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  confirmCanceling: {
    id: `${scope}.confirmCanceling`,
    defaultMessage: `Confirm`,
  },
  defaultDescription: {
    id: `${scope}.defaultDescription`,
    defaultMessage: 'Are you sure you want to perform this action?',
  },
});
