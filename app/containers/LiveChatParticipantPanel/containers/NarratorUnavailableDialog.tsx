import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { colors, themeColors } from 'theme';

import {
  makeSelectCallingOutNavigator,
  makeSelectLiveChatSetup,
  makeSelectCallOutNavigatorUnlockTime,
} from 'global/reducers/liveChat';

import { ConversationChannel } from 'utils/useConversationChannel';

import H2 from 'components/H2';
import Box from 'components/Box';
import Spinner from 'components/Spinner';
import { ModalType, useModal } from 'components/Modal';
import { Tooltip } from 'components/Tooltip';
import Text from 'components/Text';

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
  const callOutNavigatorUnlockTime = useSelector(
    makeSelectCallOutNavigatorUnlockTime(),
  );

  const { Modal, openModal, closeModal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.callOutTheNavigator),
      content: formatMessage(messages.callOutTheNavigatorModalContent),
      hideCloseButton: true,
      confirmationButtonColor: themeColors.primary,
      confirmationButtonText: formatMessage(messages.yesIReallyNeedHelp),
      cancelButtonStyles: {
        light: true,
        inverted: false,
      },
      maxWidth: 510,
      contentContainerStyles: {
        px: 20,
        py: 20,
      },
      confirmAction: callOutNavigator,
      closeOnConfirm: false,
      loading: callingOutNavigator,
    },
  });

  useEffect(() => {
    if (callOutNavigatorUnlockTime) {
      closeModal();
    }
  }, [callOutNavigatorUnlockTime]);

  const { contactEmail, participantLinks, phone, noNavigatorAvailableMessage } =
    liveChatSetup ?? {};

  const callOutNavigatorDisabled =
    Boolean(callOutNavigatorUnlockTime) &&
    dayjs().isBefore(callOutNavigatorUnlockTime);

  return (
    <>
      <Modal />
      <ChatDialog
        header={
          liveChatSetup && (
            <Tooltip
              id="call-out-navigator-disabled-tooltip"
              visible={callOutNavigatorDisabled}
              content={
                <Text fontSize={12} maxWidth={232} lineHeight="20px">
                  {formatMessage(messages.youJustCalledTheNavigator, {
                    timeLeft: dayjs(callOutNavigatorUnlockTime).fromNow(),
                  })}
                </Text>
              }
            >
              <CallOutNavigatorButton
                onClick={openModal}
                disabled={callOutNavigatorDisabled}
              />
            </Tooltip>
          )
        }
        onMinimize={onMinimizeDialog}
      >
        {!liveChatSetup && <Spinner color={themeColors.primary} />}
        {liveChatSetup && (
          <Box
            px={20}
            py={32}
            textAlign="center"
            display="flex"
            align="center"
            direction="column"
            overflow="auto"
          >
            <H2>{noNavigatorAvailableMessage}</H2>
            <Box height="2px" bg={colors.linkWater} width="56px" my={16} />
            <ContactDetails phone={phone} contactEmail={contactEmail} />
            {Boolean(participantLinks?.length) && (
              <ParticipantUsefulLinks participantLinks={participantLinks!} />
            )}
          </Box>
        )}
      </ChatDialog>
    </>
  );
};

export default NarratorUnavailableDialog;
