import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useConversationChannel } from 'utils/useConversationChannel';

import { makeSelectNavigatorUnavailable } from 'global/reducers/liveChat';

import ChatIcon from './components/ChatIcon';
import ConversationChatDialog from './containers/ConversationChatDialog';
import NarratorUnavailableDialog from './containers/NarratorUnavailableDialog';

export type Props = {
  interventionId: string;
};

export const LiveChatParticipantPanel = ({ interventionId }: Props) => {
  const [dialogMinimized, setDialogMinimized] = useState(true);
  const toggleDialog = () => setDialogMinimized(!dialogMinimized);
  const minimizeDialog = () => setDialogMinimized(true);

  const conversationChannel = useConversationChannel(interventionId);

  const navigatorUnavailable = useSelector(makeSelectNavigatorUnavailable());

  const sharedProps = {
    interventionId,
    onMinimizeDialog: minimizeDialog,
  };

  return (
    <>
      {!dialogMinimized && !navigatorUnavailable && (
        <ConversationChatDialog
          conversationChannel={conversationChannel}
          {...sharedProps}
        />
      )}
      {!dialogMinimized && navigatorUnavailable && (
        <NarratorUnavailableDialog {...sharedProps} />
      )}
      <ChatIcon
        online={!navigatorUnavailable}
        panelMinimized={dialogMinimized}
        onClick={toggleDialog}
      />
    </>
  );
};
