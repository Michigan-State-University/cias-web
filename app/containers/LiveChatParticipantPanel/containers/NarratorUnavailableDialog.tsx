import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors, themeColors } from 'theme';
import MegaphoneIcon from 'assets/svg/megaphone.svg';

import {
  makeSelectCallingOutNavigator,
  makeSelectLiveChatSetup,
  makeSelectWaitingForNavigator,
} from 'global/reducers/liveChat';

import { ConversationChannel } from 'utils/useConversationChannel';

import H2 from 'components/H2';
import Box from 'components/Box';
import Text from 'components/Text';
import Spinner from 'components/Spinner';
import { ImageButton } from 'components/Button';
import { ModalType, useModal } from 'components/Modal';

import ChatDialog from '../components/ChatDialog';
import ContactDetails from '../components/ContactDetails';
import ParticipantUsefulLinks from '../components/ParticipantUsefulLinks';
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
  const waitingForNavigator = useSelector(makeSelectWaitingForNavigator());

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
    if (waitingForNavigator) {
      closeModal();
    }
  }, [waitingForNavigator]);

  const { contactEmail, participantLinks, phone, noNavigatorAvailableMessage } =
    liveChatSetup ?? {};

  return (
    <>
      <Modal />
      <ChatDialog
        header={
          liveChatSetup && (
            <ImageButton
              onClick={openModal}
              src={MegaphoneIcon}
              title={formatMessage(messages.callOutTheNavigator)}
              display="flex"
              align="center"
              gap={6}
              padding={0}
            >
              <Text color={themeColors.secondary}>
                {formatMessage(messages.callOutTheNavigator)}
              </Text>
            </ImageButton>
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
