import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useConversationChannel } from 'utils/useConversationChannel';

import {
  closeConversation,
  makeSelectNavigatorUnavailable,
  makeSelectOpenedConversationId,
  makeSelectLiveChatLoader,
  makeSelectLiveChatSetup,
} from 'global/reducers/liveChat';

import ChatIcon from './components/ChatIcon';
import ConversationChatDialog from './containers/ConversationChatDialog';
import NarratorUnavailableDialog from './containers/NarratorUnavailableDialog';
import NavigatorArrivedPopover from './components/NavigatorArrivedPopover';

export type Props = {
  interventionId: string;
};

export const LiveChatParticipantPanel = ({ interventionId }: Props) => {
  const dispatch = useDispatch();

  const [navigatorArrivedPopoverVisible, setNavigatorArrivedPopoverVisible] =
    useState(false);

  const [dialogMinimized, setDialogMinimized] = useState(true);
  const toggleDialog = () => {
    setDialogMinimized(!dialogMinimized);
    setNavigatorArrivedPopoverVisible(false);
  };
  const minimizeDialog = () => setDialogMinimized(true);

  const conversationChannel = useConversationChannel(interventionId);
  const navigatorUnavailable = useSelector(makeSelectNavigatorUnavailable());
  const conversationId = useSelector(makeSelectOpenedConversationId());
  const liveChatLoading = useSelector(
    makeSelectLiveChatLoader('liveChatSetup'),
  );
  const liveChatSetup = useSelector(makeSelectLiveChatSetup());

  const { fetchLiveChatSetup } = conversationChannel;

  useEffect(() => {
    if (!liveChatSetup && !dialogMinimized && !liveChatLoading) {
      fetchLiveChatSetup();
    }
  }, [dialogMinimized]);

  useEffect(
    () => () => {
      dispatch(closeConversation());
    },
    [interventionId],
  );

  const showNavigatorArrivedPopover = useCallback(() => {
    // show information if navigator became available (navigatorUnavailable changed)
    // and participant had helping materials shown at the moment
    if (!navigatorUnavailable && !dialogMinimized && !conversationId) {
      setDialogMinimized(true);
      setNavigatorArrivedPopoverVisible(true);
    } else {
      setNavigatorArrivedPopoverVisible(false);
    }
  }, [navigatorUnavailable]);

  useEffect(showNavigatorArrivedPopover, [showNavigatorArrivedPopover]);

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
      {navigatorArrivedPopoverVisible && <NavigatorArrivedPopover />}
      <ChatIcon
        online={liveChatActive}
        panelMinimized={dialogMinimized}
        onClick={toggleDialog}
      />
    </>
  );
};
