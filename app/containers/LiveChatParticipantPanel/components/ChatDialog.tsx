import React, { PropsWithChildren, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import minimizeIcon from 'assets/svg/minimize.svg';
import fileIcon from 'assets/svg/file.svg';

import Row from 'components/Row';
import Box from 'components/Box';
import ActionIcon from 'components/ActionIcon';
import { ImageButton } from 'components/Button';
import Tooltip from 'components/Tooltip';
import Spinner from 'components/Spinner';

import {
  makeSelectLiveChatLoader,
  makeSelectParticipantFiles,
} from 'global/reducers/liveChat';

import { themeColors } from 'theme';

import ParticipantFilesPanel from './ParticipantFilesPanel';

import i18nMessages from '../messages';
import { ParticipantChatDialogContainer } from './styled';

export type Props = PropsWithChildren<{
  header: React.ReactNode;
  onMinimize: () => void;
}>;

const ChatDialog = ({ header, children, onMinimize }: Props) => {
  const { formatMessage } = useIntl();

  const [participantFilesVisible, setParticipantFilesVisible] = useState(false);
  const toggleParticipantFilesVisible = () =>
    setParticipantFilesVisible((prev) => !prev);

  const participantFiles = useSelector(makeSelectParticipantFiles());
  const isSetupLoading = useSelector(makeSelectLiveChatLoader('liveChatSetup'));

  const participantFilesButtonTitle = formatMessage(
    i18nMessages[
      participantFilesVisible ? 'hideParticipantFiles' : 'showParticipantFiles'
    ],
  );

  return (
    <ParticipantChatDialogContainer>
      <Row align="center" justify="between" gap={12} pb={16}>
        {header}
        <Box display="flex" align="center">
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
          {children}
        </>
      )}
    </ParticipantChatDialogContainer>
  );
};

export default ChatDialog;
