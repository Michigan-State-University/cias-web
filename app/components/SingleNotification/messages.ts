import { defineMessages } from 'react-intl';

export const scope = 'app.components.SingleNotification';

export default defineMessages({
  newNarratorWasSetTitle: {
    id: `${scope}.newNarratorWasSetTitle`,
    defaultMessage: 'Narrator Changed!',
  },
  newNarratorWasSetContentBeforeName: {
    id: `${scope}.newNarratorWasSetContentBeforeName`,
    defaultMessage: '<b>The narrator in</b>',
  },
  newNarratorWasSetContentAfterName: {
    id: `${scope}.newNarratorWasSetContentBeforeName`,
    defaultMessage: '<b>has been changed properly.</b>',
  },
});
