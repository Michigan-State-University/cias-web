import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';

import {
  makeSelectLiveChatInterventionId,
  ChatWidgetReducer,
  chatWidgetReducerKey,
  setChatDisabled,
} from 'global/reducers/chatWidget';

import { LiveChatParticipantPanel } from 'containers/LiveChatParticipantPanel';

import { Container } from './styled';

export const ChatWidget = () => {
  const liveChatInterventionId = useSelector(
    makeSelectLiveChatInterventionId(),
  );

  const globalDispatch = useDispatch();

  // @ts-ignore
  useInjectReducer({ key: chatWidgetReducerKey, reducer: ChatWidgetReducer });

  useEffect(
    () => () => {
      globalDispatch(setChatDisabled());
    },
    [],
  );

  if (!liveChatInterventionId) return null;

  return (
    <Container>
      <LiveChatParticipantPanel interventionId={liveChatInterventionId} />
    </Container>
  );
};

export default ChatWidget;
