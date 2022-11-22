import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors } from 'theme';

import { ConversationChannel } from 'utils/useConversationChannel';

import globalMessages from 'global/i18n/globalMessages';
import {
  makeSelectCallOutNavigatorUnlockTime,
  makeSelectCancellingCallOut,
} from 'global/reducers/liveChat';

import H2 from 'components/H2';
import Box from 'components/Box';
import Text from 'components/Text';
import CountdownCircleTimer from 'components/CountdownCircleTimer';
import Button from 'components/Button';

import ChatDialog from '../components/ChatDialog';
import CallOutNavigatorButton from '../components/CallOutNavigatorButton';
import messages from '../messages';
import { CALL_OUT_NAVIGATOR_LIMIT_MS } from '../constants';

type NarratorUnavailableDialogProps = {
  conversationChannel: ConversationChannel;
  onMinimizeDialog: () => void;
};

const CallOutNavigatorTimerDialog = ({
  conversationChannel,
  onMinimizeDialog,
}: NarratorUnavailableDialogProps) => {
  const { formatMessage } = useIntl();

  const { cancelCallOut } = conversationChannel;

  const callOutNavigatorUnlockTime = useSelector(
    makeSelectCallOutNavigatorUnlockTime(),
  );
  const cancellingCallOut = useSelector(makeSelectCancellingCallOut());

  if (!callOutNavigatorUnlockTime) return null;

  return (
    <>
      <ChatDialog
        header={<CallOutNavigatorButton disabled />}
        onMinimize={onMinimizeDialog}
      >
        <Box
          px={20}
          py={32}
          textAlign="center"
          display="flex"
          align="center"
          direction="column"
          overflow="auto"
        >
          <H2>{formatMessage(messages.waitingForNavigator)}</H2>
          <Box height="2px" bg={colors.linkWater} width="56px" my={16} />
          <Text
            color={colors.bluewood}
            textOpacity={0.7}
            mb={32}
            lineHeight="22px"
          >
            {formatMessage(messages.notificationSent)}
          </Text>
          <CountdownCircleTimer
            endTime={callOutNavigatorUnlockTime}
            rangeMs={CALL_OUT_NAVIGATOR_LIMIT_MS}
          />
          <Button
            onClick={cancelCallOut}
            loading={cancellingCallOut}
            mt={32}
            px={56}
            light
            title={formatMessage(globalMessages.cancel)}
            width="auto"
          />
        </Box>
      </ChatDialog>
    </>
  );
};

export default CallOutNavigatorTimerDialog;
