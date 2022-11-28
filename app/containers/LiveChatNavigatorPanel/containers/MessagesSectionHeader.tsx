import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import ArchiveIcon from 'assets/svg/archive2.svg';
import DownloadIcon from 'assets/svg/download-icon.svg';
import TranscriptIcon from 'assets/svg/transcript-icon.svg';

import { ArchiveConversationData } from 'utils/useConversationChannel';
import { getFileUrl } from 'utils/getApiFileUrl';
import { FILE_GENERATION_TIME_FORMAT } from 'utils/dayjs';

import i18nGlobalMessages from 'global/i18n/globalMessages';
import {
  makeSelectArchivingConversation,
  makeSelectOpenedConversation,
  generateConversationTranscriptRequest,
} from 'global/reducers/liveChat';

import Icon from 'components/Icon';
import Text from 'components/Text';
import TextButton from 'components/Button/TextButton';
import Row from 'components/Row';
import FileDownload from 'components/FileDownload';
import { ModalType, useModal } from 'components/Modal';
import { Tooltip } from 'components/Tooltip';

import i18nMessages from '../messages';
import SectionHeader from '../components/SectionHeader';

export type Props = {
  onArchiveConversation?: (data: ArchiveConversationData) => void;
};

const topFunctionButtonProps = {
  display: 'flex',
  align: 'center',
  gap: 8,
  fontWeight: 'medium',
};

const MessageSectionHeader = ({ onArchiveConversation }: Props) => {
  const { formatMessage } = useIntl();

  const conversation = useSelector(makeSelectOpenedConversation());
  const archivingConversation = useSelector(makeSelectArchivingConversation());
  const dispatch = useDispatch();

  const archiveConversation = () => {
    if (onArchiveConversation && conversation) {
      onArchiveConversation({
        conversationId: conversation.id,
      });
    }
  };

  const {
    openModal: openArchiveConfirmationModal,
    Modal: ArchiveConfirmationModal,
  } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(i18nMessages.archiveConfirmationModalMessage),
      content: (
        <Text textAlign="center">
          {formatMessage(i18nMessages.archiveConfirmationModalContent)}
        </Text>
      ),
      confirmAction: archiveConversation,
    },
  });

  const { archivedAt, transcript } = conversation ?? {};

  const canGenerateTranscript =
    !archivedAt ||
    !transcript ||
    dayjs(transcript.createdAt).isBefore(archivedAt);

  const generateTranscript = () => {
    if (conversation) {
      dispatch(generateConversationTranscriptRequest(conversation.id));
    }
  };

  return (
    <>
      <ArchiveConfirmationModal />
      <SectionHeader title={formatMessage(i18nMessages.message)} px={24}>
        {conversation && (
          <Row align="center" gap={24}>
            <Tooltip
              id={`conversation-transcript-generated-at-${
                transcript?.createdAt ?? ''
              }`}
              text={`${formatMessage(i18nGlobalMessages.lastCsvDate)}${dayjs(
                transcript?.createdAt,
              ).format(FILE_GENERATION_TIME_FORMAT)}`}
              visible={!!transcript}
            >
              <FileDownload
                url={getFileUrl(transcript?.url ?? '')}
                disabled={!transcript}
                {...topFunctionButtonProps}
              >
                <TextButton
                  buttonProps={topFunctionButtonProps}
                  disabled={!transcript}
                >
                  <Icon
                    src={DownloadIcon}
                    alt={formatMessage(i18nMessages.downloadTranscriptIconAlt)}
                  />
                  <Text>{formatMessage(i18nMessages.downloadTranscript)}</Text>
                </TextButton>
              </FileDownload>
            </Tooltip>
            <TextButton
              buttonProps={topFunctionButtonProps}
              onClick={generateTranscript}
              disabled={!canGenerateTranscript}
            >
              <Icon
                alt={formatMessage(i18nMessages.generateTranscriptIconAlt)}
                src={TranscriptIcon}
              />
              <Text>{formatMessage(i18nMessages.generateTranscript)}</Text>
            </TextButton>
            {!archivedAt && onArchiveConversation && (
              <TextButton
                loading={archivingConversation}
                onClick={openArchiveConfirmationModal}
                buttonProps={topFunctionButtonProps}
                spinnerProps={{
                  size: 22,
                }}
              >
                <Icon
                  src={ArchiveIcon}
                  alt={formatMessage(i18nMessages.archiveIconAlt)}
                />
                <Text>{formatMessage(i18nMessages.archive)}</Text>
              </TextButton>
            )}
          </Row>
        )}
      </SectionHeader>
    </>
  );
};

export default MessageSectionHeader;
