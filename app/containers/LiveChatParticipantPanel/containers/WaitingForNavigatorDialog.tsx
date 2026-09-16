import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors } from 'theme';

import { ConversationChannel } from 'utils/useConversationChannel';

import {
  makeSelectCallingOutNavigator,
  makeSelectCallOutNavigatorUnlockTime,
  makeSelectCancellingCallOut,
  makeSelectLiveChatSetup,
} from 'global/reducers/liveChat';

import H2 from 'components/H2';
import Box from 'components/Box';
import Text from 'components/Text';
import Button from 'components/Button';
import Column from 'components/Column';
import Row from 'components/Row';

import ChatDialog from '../components/ChatDialog';
import CallOutNavigatorButton from '../components/CallOutNavigatorButton';
import messages from '../messages';
import ContactDetails from '../components/ContactDetails';
import ParticipantUsefulLinks from '../components/ParticipantUsefulLinks';

type WaitingForNavigatorDialogProps = {
  conversationChannel: ConversationChannel;
  onMinimizeDialog: () => void;
};

const WaitingForNavigatorDialog = ({
  conversationChannel,
  onMinimizeDialog,
}: WaitingForNavigatorDialogProps) => {
  const { formatMessage } = useIntl();

  const { cancelCallOut, callOutNavigator } = conversationChannel;

  const callOutNavigatorUnlockTime = useSelector(
    makeSelectCallOutNavigatorUnlockTime(),
  );
  const cancellingCallOut = useSelector(makeSelectCancellingCallOut());
  const callingOutNavigator = useSelector(makeSelectCallingOutNavigator());
  const {
    phone,
    contactEmail,
    participantLinks,
    messagePhone,
    contactMessage,
  } = useSelector(makeSelectLiveChatSetup()) ?? {};

  const nextCallOutAvailable = !callOutNavigatorUnlockTime;

  return (
    <ChatDialog
      header={<CallOutNavigatorButton disabled />}
      onMinimize={onMinimizeDialog}
    >
      <Box
        pt={16}
        pb={32}
        px={16}
        mx={-16}
        textAlign="center"
        display="flex"
        align="center"
        direction="column"
        overflow="auto"
      >
        <H2 lineHeight="24px" whiteSpace="pre-line">
          {formatMessage(
            messages[
              nextCallOutAvailable ? 'navigatorNotFound' : 'workingOnRequest'
            ],
          )}
        </H2>
        <Box height="2px" bg={colors.linkWater} width="56px" my={16} />
        <Text
          color={colors.bluewood}
          textOpacity={0.7}
          lineHeight="22px"
          mx={nextCallOutAvailable ? 0 : 32}
        >
          {formatMessage(
            messages[nextCallOutAvailable ? 'call988' : 'call988or911'],
          )}
        </Text>
        {!nextCallOutAvailable && (
          <Button
            onClick={cancelCallOut}
            loading={cancellingCallOut}
            my={32}
            px={30}
            flexShrink={0}
            light
            title={formatMessage(messages.cancelRequest)}
            width="auto"
          />
        )}
        {nextCallOutAvailable && (
          <Row my={32} gap={8} width="100%">
            <Button
              onClick={cancelCallOut}
              loading={cancellingCallOut}
              light
              title={formatMessage(messages.endRequest)}
            />
            <Button
              onClick={callOutNavigator}
              loading={callingOutNavigator}
              title={formatMessage(messages.iWillWait)}
            />
          </Row>
        )}
        <Column px={32} align="center">
          <ContactDetails
            phone={phone}
            contactEmail={contactEmail}
            messagePhone={messagePhone}
            contactMessage={contactMessage}
          />
          <ParticipantUsefulLinks participantLinks={participantLinks} />
        </Column>
      </Box>
    </ChatDialog>
  );
};

export default WaitingForNavigatorDialog;
