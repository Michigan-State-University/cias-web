import React from 'react';
import { useIntl } from 'react-intl';

import Icon from 'components/Icon';

import chatIconOnline from 'assets/svg/chat-active.svg';
import chatIconOffline from 'assets/svg/chat-inactive.svg';

import messages from '../messages';
import { ChatIconButton } from './styled';
import { LIVE_CHAT_ICON_ID } from '../constants';

type Props = {
  online: boolean;
  panelMinimized: boolean;
  onClick: () => void;
};

export const ChatIcon = ({ online, panelMinimized, onClick }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <ChatIconButton
      id={LIVE_CHAT_ICON_ID}
      onClick={onClick}
      title={formatMessage(
        panelMinimized ? messages.openPanelTitle : messages.minimizePanelTitle,
      )}
    >
      <Icon
        src={online ? chatIconOnline : chatIconOffline}
        alt={formatMessage(messages.iconAlt)}
      />
    </ChatIconButton>
  );
};

export default ChatIcon;
