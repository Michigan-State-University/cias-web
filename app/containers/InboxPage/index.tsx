import React from 'react';
import { useIntl } from 'react-intl';

import LiveChat from 'containers/LiveChat';
import AppContainer from 'components/Container';
import Box from 'components/Box';

import messages from './messages';

export const InboxPage = () => {
  const { formatMessage } = useIntl();
  return (
    <AppContainer
      justify="center"
      display="flex"
      height="100%"
      py={54}
      pageTitle={formatMessage(messages.pageTitle)}
    >
      <Box width="100%" display="flex" justify="center">
        <LiveChat chatMessages={[]} />
      </Box>
    </AppContainer>
  );
};

export default InboxPage;
