import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors, themeColors } from 'theme';
import { makeSelectLiveChatSetup } from 'global/reducers/liveChat';

import H2 from 'components/H2';
import Box from 'components/Box';
import Text from 'components/Text';
import Spinner from 'components/Spinner';

import messages from '../messages';
import ChatDialog from '../components/ChatDialog';
import ContactDetails from '../components/ContactDetails';
import ParticipantUsefulLinks from '../components/ParticipantUsefulLinks';

type NarratorUnavailableDialogProps = {
  onMinimizeDialog: () => void;
};

const NarratorUnavailableDialog = ({
  onMinimizeDialog,
}: NarratorUnavailableDialogProps) => {
  const { formatMessage } = useIntl();
  const liveChatSetup = useSelector(makeSelectLiveChatSetup());

  const chatDialogHoc = (content: React.ReactNode) => (
    <ChatDialog
      header={
        <Text fontSize="14px" color={themeColors.primary}>
          {formatMessage(messages.navigatorUnavailable)}
        </Text>
      }
      onMinimize={onMinimizeDialog}
    >
      {content}
    </ChatDialog>
  );

  if (!liveChatSetup)
    return chatDialogHoc(<Spinner color={themeColors.primary} />);

  const { contactEmail, participantLinks, phone, noNavigatorAvailableMessage } =
    liveChatSetup;

  return chatDialogHoc(
    <>
      <Box
        px={20}
        py={32}
        textAlign="center"
        display="flex"
        align="center"
        direction="column"
        overflow="auto"
      >
        <H2> {noNavigatorAvailableMessage}</H2>
        <Box height="2px" bg={colors.linkWater} width="56px" my={16} />
        <ContactDetails phone={phone} contactEmail={contactEmail} />
        {Boolean(participantLinks.length) && (
          <ParticipantUsefulLinks participantLinks={participantLinks} />
        )}
      </Box>
    </>,
  );
};

export default NarratorUnavailableDialog;
