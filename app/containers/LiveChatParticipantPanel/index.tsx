import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useConversationChannel } from 'utils/useConversationChannel';

import {
  closeConversation,
  makeSelectNavigatorUnavailable,
  makeSelectOpenedConversationId,
} from 'global/reducers/liveChat';

import ChatIcon from './components/ChatIcon';
import ConversationChatDialog from './containers/ConversationChatDialog';
import NarratorUnavailableDialog from './containers/NarratorUnavailableDialog';

export type Props = {
  interventionId: string;
};

export const LiveChatParticipantPanel = ({ interventionId }: Props) => {
  const dispatch = useDispatch();

  const [dialogMinimized, setDialogMinimized] = useState(true);
  const toggleDialog = () => setDialogMinimized(!dialogMinimized);
  const minimizeDialog = () => setDialogMinimized(true);

  const conversationChannel = useConversationChannel(interventionId);

  const navigatorUnavailable = useSelector(makeSelectNavigatorUnavailable());
  const conversationId = useSelector(makeSelectOpenedConversationId());

  useEffect(
    () => () => {
      dispatch(closeConversation());
    },
    [interventionId],
  );

  const sharedProps = {
    conversationChannel,
    interventionId,
    onMinimizeDialog: minimizeDialog,
  };

  const liveChatActive = Boolean(conversationId) || !navigatorUnavailable;

  return (
    <>
      {!dialogMinimized && liveChatActive && (
        <ConversationChatDialog {...sharedProps} />
      )}
      {!dialogMinimized && !liveChatActive && (
        <NarratorUnavailableDialog {...sharedProps} />
      )}
      <ChatIcon
        online={liveChatActive}
        panelMinimized={dialogMinimized}
        onClick={toggleDialog}
      />
    </>
  );
};
