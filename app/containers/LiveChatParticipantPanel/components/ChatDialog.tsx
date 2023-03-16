import React, { PropsWithChildren, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import minimizeIcon from 'assets/svg/minimize.svg';
import fileIcon from 'assets/svg/file.svg';
import greenQuestionMark from 'assets/svg/green-question-mark.svg';

import Row from 'components/Row';
import Box from 'components/Box';
import ActionIcon from 'components/ActionIcon';
import { ImageButton } from 'components/Button';
import Tooltip from 'components/Tooltip';
import Spinner from 'components/Spinner';
import Column from 'components/Column';

import {
  makeSelectLiveChatLoader,
  makeSelectLiveChatSetup,
  makeSelectParticipantFiles,
} from 'global/reducers/liveChat';

import { themeColors } from 'theme';

import ParticipantFilesPanel from './ParticipantFilesPanel';

import i18nMessages from '../messages';
import { CHAT_DIALOG_HEADER_CONTENT_HEIGHT } from '../constants';
import { BoxWithUnderShadow, ParticipantChatDialogContainer } from './styled';
import ContactDetails from './ContactDetails';

export type Props = PropsWithChildren<{
  header: React.ReactNode;
  onMinimize: () => void;
  showContactDetailsButton?: boolean;
}>;

const ChatDialog = ({
  header,
  children,
  onMinimize,
  showContactDetailsButton,
}: Props) => {
  const { formatMessage } = useIntl();

  const [participantFilesVisible, setParticipantFilesVisible] = useState(false);
  const [contactDetailsVisible, setContactDetailsVisible] = useState(false);
  const toggleParticipantFilesVisible = () =>
    setParticipantFilesVisible((prev) => !prev);
  const toggleContactDetailsVisible = () =>
    setContactDetailsVisible((prev) => !prev);

  const participantFiles = useSelector(makeSelectParticipantFiles());
  const isSetupLoading = useSelector(makeSelectLiveChatLoader('liveChatSetup'));

  const liveChatSetup = useSelector(makeSelectLiveChatSetup());

  const { contactEmail, phone, messagePhone, contactMessage } =
    liveChatSetup ?? {};

  const participantFilesButtonTitle = formatMessage(
    i18nMessages[
      participantFilesVisible ? 'hideParticipantFiles' : 'showParticipantFiles'
    ],
  );

  const contactDetailsButtonTitle = formatMessage(
    i18nMessages[
      contactDetailsVisible ? 'hideContactDetails' : 'showContactDetails'
    ],
  );

  return (
    <ParticipantChatDialogContainer>
      <Row
        align="center"
        justify={header ? 'between' : 'end'}
        gap={12}
        pb={16}
        boxSizing="content-box"
        height={CHAT_DIALOG_HEADER_CONTENT_HEIGHT}
      >
        {header}
        <Box display="flex" align="center">
          {showContactDetailsButton && (
            <Tooltip
              id="show-or-hide-contact-details-tooltip"
              text={contactDetailsButtonTitle}
            >
              <ImageButton
                showHoverEffect
                src={greenQuestionMark}
                onClick={toggleContactDetailsVisible}
                title={contactDetailsButtonTitle}
                isActive={contactDetailsVisible}
                styles={{
                  padding: '8px',
                }}
              />
            </Tooltip>
          )}
          {!isEmpty(participantFiles) && (
            <Tooltip
              id="show-or-hide-participant-files-tooltip"
              text={participantFilesButtonTitle}
            >
              <ImageButton
                showHoverEffect
                src={fileIcon}
                onClick={toggleParticipantFilesVisible}
                title={participantFilesButtonTitle}
                mr={8}
                isActive={participantFilesVisible}
                styles={{
                  padding: '8px',
                }}
              />
            </Tooltip>
          )}
          <ActionIcon
            iconSrc={minimizeIcon}
            onClick={onMinimize}
            ariaText={formatMessage(i18nMessages.minimizePanelTitle)}
            height={24}
            width={24}
            mr={0}
          />
        </Box>
      </Row>
      {isSetupLoading ? (
        <Spinner color={themeColors.primary} />
      ) : (
        <>
          {participantFilesVisible && participantFiles?.length && (
            <ParticipantFilesPanel participantFiles={participantFiles} />
          )}
          {contactDetailsVisible && (
            <BoxWithUnderShadow>
              <Column align="center">
                <ContactDetails
                  contactEmail={contactEmail}
                  messagePhone={messagePhone}
                  phone={phone}
                  contactMessage={contactMessage}
                />
              </Column>
            </BoxWithUnderShadow>
          )}
          {children}
        </>
      )}
    </ParticipantChatDialogContainer>
  );
};

export default ChatDialog;
