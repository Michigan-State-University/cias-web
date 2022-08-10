import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { colors, themeColors } from 'theme';
import { makeSelectLiveChatSetup } from 'global/reducers/liveChat';

import { useConversationChannel } from 'utils/useConversationChannel';

import H2 from 'components/H2';
import Box from 'components/Box';
import Text from 'components/Text';
import Spinner from 'components/Spinner';
// import FileDisplayItem from 'components/FileDisplayItem';

import messages from '../messages';
import ChatDialog from '../components/ChatDialog';
import ContactDetails from '../components/ContactDetails';
import ParticipantUsefulLinks from '../components/ParticipantUsefulLinks';

type NarratorUnavailableDialogProps = {
  conversationChannel: ReturnType<typeof useConversationChannel>;
  onMinimizeDialog: () => void;
};

const NarratorUnavailableDialog = ({
  conversationChannel,
  onMinimizeDialog,
}: NarratorUnavailableDialogProps) => {
  const { fetchNavigatorSetup } = conversationChannel;
  const { formatMessage } = useIntl();
  const liveChatSetup = useSelector(makeSelectLiveChatSetup());

  useEffect(() => {
    if (!liveChatSetup) {
      fetchNavigatorSetup();
    }
  }, [liveChatSetup]);

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
        textAlign="center"
        display="flex"
        align="center"
        direction="column"
      >
        <H2 mt={30}> {noNavigatorAvailableMessage}</H2>
        <Box height="2px" bg={colors.linkWater} width="56px" my={16} />
        <ContactDetails phone={phone} contactEmail={contactEmail} />
        <Text color={colors.bluewood} textOpacity={0.7} mt={24} mb={8}>
          {formatMessage(messages.usefulLinks)}
        </Text>
        {Boolean(participantLinks.length) && (
          <ParticipantUsefulLinks participantLinks={participantLinks} />
        )}
        {/* WATING FOR BACKEND */}
        {/* <Text color={colors.bluewood} textOpacity={0.7} mt={24} mb={8}>
          {formatMessage(messages.downloadInstructions)}
        </Text> */}
      </Box>
      {/* <Row bg={colors.lightBlue} width="100%" padding="12px" align="center">
        <FileDisplayItem fileInfo={fileInfo}/>
      </Row> */}
    </>,
  );
};

export default NarratorUnavailableDialog;
