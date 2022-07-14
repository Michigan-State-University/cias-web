import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useConversationChannel } from 'utils/useConversationChannel';

import {
  closeConversation,
  makeSelectCreatingConversation,
  makeSelectCurrentInterlocutorId,
  makeSelectOpenedConversation,
  makeSelectOpenedConversationMessages,
} from 'global/reducers/liveChat';

import ChatIcon from './components/ChatIcon';
import ConversationChatDialog from './components/ConversationChatDialog';

export type Props = {
  interventionId: string;
};

export const LiveChatParticipantPanel = ({ interventionId }: Props) => {
  const dispatch = useDispatch();

  const { sendMessage, readMessage, createConversation } =
    useConversationChannel();

  const [dialogMinimized, setDialogMinimized] = useState(true);
  const toggleDialog = () => setDialogMinimized(!dialogMinimized);
  const minimizeDialog = () => setDialogMinimized(true);

  const conversation = useSelector(makeSelectOpenedConversation());
  const messages = useSelector(makeSelectOpenedConversationMessages());
  const currentInterlocutorId = useSelector(makeSelectCurrentInterlocutorId());
  const creatingConversation = useSelector(makeSelectCreatingConversation());

  useEffect(
    () => () => {
      dispatch(closeConversation());
    },
    [interventionId],
  );

  const handleSendMessage = (content: string) => {
    if (conversation && currentInterlocutorId) {
      sendMessage({
        conversationId: conversation.id,
        content,
        interlocutorId: currentInterlocutorId,
      });
    } else {
      createConversation({
        firstMessageContent: content,
        interventionId,
      });
    }
  };

  return (
    <>
      {!dialogMinimized && (
        <ConversationChatDialog
          conversation={conversation}
          messages={messages}
          currentInterlocutorId={currentInterlocutorId}
          creatingConversation={creatingConversation}
          onMinimizeDialog={minimizeDialog}
          onSendMessage={handleSendMessage}
          onReadMessage={readMessage}
        />
      )}
      <ChatIcon
        online
        panelMinimized={dialogMinimized}
        onClick={toggleDialog}
      />
    </>
  );
};
