import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors, themeColors } from 'theme';

import {
  makeSelectCallingOutNavigator,
  makeSelectLiveChatSetup,
  makeSelectWaitingForNavigator,
} from 'global/reducers/liveChat';

import { ConversationChannel } from 'utils/useConversationChannel';

import H2 from 'components/H2';
import Box from 'components/Box';
import Spinner from 'components/Spinner';
import Text from 'components/Text';
import Column from 'components/Column';

import ChatDialog from '../components/ChatDialog';
import ContactDetails from '../components/ContactDetails';
import ParticipantUsefulLinks from '../components/ParticipantUsefulLinks';
import CallOutNavigatorButton from '../components/CallOutNavigatorButton';
import messages from '../messages';

type NarratorUnavailableDialogProps = {
  conversationChannel: ConversationChannel;
  onMinimizeDialog: () => void;
};

const NarratorUnavailableDialog = ({
  conversationChannel,
  onMinimizeDialog,
}: NarratorUnavailableDialogProps) => {
  const { callOutNavigator } = conversationChannel;
  const { formatMessage } = useIntl();

  const liveChatSetup = useSelector(makeSelectLiveChatSetup());
  const callingOutNavigator = useSelector(makeSelectCallingOutNavigator());
  const isWaitingForNavigator = useSelector(makeSelectWaitingForNavigator());

  const {
    contactEmail,
    participantLinks,
    phone,
    noNavigatorAvailableMessage,
    messagePhone,
    contactMessage,
    hasAssignedNavigators,
  } = liveChatSetup ?? {};

  return (
    <ChatDialog
      header={
        liveChatSetup &&
        hasAssignedNavigators && (
          <CallOutNavigatorButton
            onClick={callOutNavigator}
            loading={callingOutNavigator}
            disabled={isWaitingForNavigator}
          />
        )
      }
      onMinimize={onMinimizeDialog}
    >
      {!liveChatSetup && <Spinner color={themeColors.primary} />}
      {liveChatSetup && (
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
          <H2>{noNavigatorAvailableMessage}</H2>
          <Column px={32} align="center">
            <Text
              color={colors.bluewood}
              textOpacity={0.7}
              mt={16}
              lineHeight="22px"
            >
              {formatMessage(messages.call988or911)}
            </Text>
            <Box height="2px" bg={colors.linkWater} width="56px" mt={16} />
            <ContactDetails
              phone={phone}
              contactEmail={contactEmail}
              messagePhone={messagePhone}
              contactMessage={contactMessage}
            />
            <ParticipantUsefulLinks participantLinks={participantLinks} />
          </Column>
        </Box>
      )}
    </ChatDialog>
  );
};

export default NarratorUnavailableDialog;
