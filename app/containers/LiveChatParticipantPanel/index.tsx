import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useIntl } from 'react-intl';

import { useConversationChannel } from 'utils/useConversationChannel';
import { htmlToPlainText } from 'utils/htmlToPlainText';

import {
  closeConversation,
  makeSelectNavigatorUnavailable,
  makeSelectOpenedConversationId,
  makeSelectLiveChatLoader,
  makeSelectLiveChatSetup,
} from 'global/reducers/liveChat';

import { sessionReducer, getSessionSaga } from 'global/reducers/session';

import {
  makeSelectCurrentQuestion,
  makeSelectInterventionStarted,
  makeSelectUserSession,
} from 'containers/AnswerSessionPage/selectors';

import ChatIcon from './components/ChatIcon';
import ConversationChatDialog from './containers/ConversationChatDialog';
import NarratorUnavailableDialog from './containers/NarratorUnavailableDialog';
import NavigatorArrivedPopover from './components/NavigatorArrivedPopover';

import messages from './messages';

export type Props = {
  interventionId: string;
};

export const LiveChatParticipantPanel = ({ interventionId }: Props) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

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
  const currentQuestion = useSelector(makeSelectCurrentQuestion());
  const interventionStarted = useSelector(makeSelectInterventionStarted());
  const userSession = useSelector(makeSelectUserSession());

  const sessionName = userSession?.sessionName;

  useInjectReducer({ key: 'session', reducer: sessionReducer });
  useInjectSaga({ key: 'getSession', saga: getSessionSaga });

  const { fetchLiveChatSetup, isConnected, changeScreenTitle } =
    conversationChannel;

  useEffect(() => {
    if (!isConnected || !conversationId) return;

    if (!sessionName) {
      changeScreenTitle({
        conversationId,
        currentScreenTitle: formatMessage(messages.interventionPageTitle),
      });
      return;
    }
    const currentQuestionSubtitle =
      currentQuestion?.settings?.subtitle && currentQuestion?.subtitle
        ? htmlToPlainText(currentQuestion?.subtitle)
        : null;

    const currentQuestionTitle =
      currentQuestion?.settings?.title && currentQuestion?.title
        ? htmlToPlainText(currentQuestion?.title)
        : null;

    const screenTitle = !interventionStarted
      ? formatMessage(messages.initialScreen)
      : currentQuestionSubtitle ||
        currentQuestionTitle ||
        formatMessage(messages.noTitle);

    if (sessionName) {
      changeScreenTitle({
        conversationId,
        currentScreenTitle: formatMessage(messages.currentScreenTitle, {
          sessionName,
          screenTitle,
        }),
      });
    }
  }, [
    currentQuestion,
    interventionStarted,
    sessionName,
    isConnected,
    conversationId,
  ]);

  useEffect(() => {
    if (!isConnected) return;
    if (!liveChatSetup && !dialogMinimized && !liveChatLoading) {
      fetchLiveChatSetup();
    }
  }, [dialogMinimized, isConnected]);

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
