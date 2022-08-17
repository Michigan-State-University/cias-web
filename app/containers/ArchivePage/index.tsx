import React from 'react';
import { useIntl } from 'react-intl';

import AppContainer from 'components/Container';

import i18nMessages from './messages';

export const ArchivePage = () => {
  const { formatMessage } = useIntl();

  return (
    <AppContainer
      display="flex"
      direction="column"
      align="center"
      height="100%"
      py={54}
      pageTitle={formatMessage(i18nMessages.pageTitle)}
      $maxWidth="100%"
    >
      Archive
    </AppContainer>
  );
};

export default ArchivePage;
