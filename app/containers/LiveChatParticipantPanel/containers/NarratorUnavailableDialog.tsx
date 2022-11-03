import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors, themeColors } from 'theme';
import MegaphoneIcon from 'assets/svg/megaphone.svg';

import { makeSelectLiveChatSetup } from 'global/reducers/liveChat';

import H2 from 'components/H2';
import Box from 'components/Box';
import Text from 'components/Text';
import Spinner from 'components/Spinner';
import { ImageButton } from 'components/Button';

import ChatDialog from '../components/ChatDialog';
import ContactDetails from '../components/ContactDetails';
import ParticipantUsefulLinks from '../components/ParticipantUsefulLinks';
import messages from '../messages';

type NarratorUnavailableDialogProps = {
  onMinimizeDialog: () => void;
};

const NarratorUnavailableDialog = ({
  onMinimizeDialog,
}: NarratorUnavailableDialogProps) => {
  const { formatMessage } = useIntl();
  const liveChatSetup = useSelector(makeSelectLiveChatSetup());

  const { contactEmail, participantLinks, phone, noNavigatorAvailableMessage } =
    liveChatSetup ?? {};

  return (
    <ChatDialog
      header={
        liveChatSetup && (
          <ImageButton
            onClick={() => console.log('will open summon navigator dialog')}
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
  );
};

export default NarratorUnavailableDialog;
