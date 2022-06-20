import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';

import {
  makeSelectLiveChatEnabled,
  ChatWidgetReducer,
  chatWidgetReducerKey,
  setChatEnabled,
} from 'global/reducers/chatWidget';

import ChatIcon from './ChatIcon';
import { Container } from './styled';

export const ChatWidget = () => {
  const liveChatEnabled = useSelector(makeSelectLiveChatEnabled());

  const globalDispatch = useDispatch();

  // @ts-ignore
  useInjectReducer({ key: chatWidgetReducerKey, reducer: ChatWidgetReducer });

  useEffect(
    () => () => {
      globalDispatch(setChatEnabled(false));
    },
    [],
  );

  if (!liveChatEnabled) return null;

  return (
    <Container>
      <ChatIcon online />
    </Container>
  );
};

export default ChatWidget;
