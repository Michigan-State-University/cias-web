import React from 'react';
import { useIntl } from 'react-intl';

import Icon from 'components/Icon';
import Box from 'components/Box';

import chatIconOnline from 'assets/svg/chat-active.svg';
import chatIconOffline from 'assets/svg/chat-inactive.svg';

import messages from './messages';

type Props = {
  online: boolean;
};

export const ChatIcon = ({ online }: Props) => {
  const { formatMessage } = useIntl();
  return (
    <Box cursor="pointer">
      <Icon
        src={online ? chatIconOnline : chatIconOffline}
        alt={formatMessage(messages.iconAlt)}
      />
    </Box>
  );
};

export default ChatIcon;
