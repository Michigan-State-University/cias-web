import React, { FC, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import {
  ParticipantUpload,
  ParticipantUploadConfig,
  getUploadDeletionReason,
  ParticipantUploadFailure,
  isUploadPending,
  isUploadRemoved,
} from 'models/ParticipantUpload';

import { formatFileSize, formatMimeFileFormatList } from 'utils/formatters';

import { Alert, AlertType } from 'components/Alert';
import Box from 'components/Box';
import Column from 'components/Column';
import { FileUpload } from 'components/FileUpload';
import Input from 'components/Input';
import Loader from 'components/Loader';
import Row from 'components/Row';
import Text from 'components/Text';
import { TextButton } from 'components/Button';

import messages, { fileUploadErrorMessages } from './fileUploadMessages';

export type Props = {
  config: Nullable<ParticipantUploadConfig>;
  uploads: ParticipantUpload[];
  showFileDescription: boolean;
  onUpload: (file: File, description: string) => void;
  onRemove: (uploadId: string) => void;
  uploading: boolean;
  removingId: Nullable<string>;
  errorCode: Nullable<ParticipantUploadFailure>;

  scanTakingLong: boolean;
  disabled?: boolean;
};

const FileUploadQuestionLayout: FC<Props> = ({
  config,
  uploads,
  showFileDescription,
  onUpload,
  onRemove,
  uploading,
  removingId,
  errorCode,
  scanTakingLong,
  disabled,
}) => {
  const { formatMessage } = useIntl();

  const [description, setDescription] = useState('');

  const acceptedFormats = useMemo(
    () => [
      ...(config?.allowedContentTypes ?? []),
      ...(config?.acceptedExtensions ?? []).map((extension) => `.${extension}`),
    ],
    [config],
  );

  const countedUploads = uploads.filter((upload) => !isUploadRemoved(upload));
  const limitReached =
    !!config && countedUploads.length >= config.maxFilesPerQuestion;

  const handleUpload = (file: File) => {
    onUpload(file, description);
    setDescription('');
  };

  const renderUpload = (upload: ParticipantUpload) => {
    if (isUploadRemoved(upload)) {
      return (
        <Alert
          key={upload.id}
          type={AlertType.WARNING}
          data-cy="participant-upload-rejected"
          content={formatMessage(
            fileUploadErrorMessages[getUploadDeletionReason(upload)],
            { filename: upload.originalFilename },
          )}
        />
      );
    }

    const pending = isUploadPending(upload);

    let statusMessage = messages.scanClean;
    if (pending) {
      statusMessage = scanTakingLong
        ? messages.scanTakingLong
        : messages.scanInProgress;
    }

    return (
      <Row
        key={upload.id}
        justify="between"
        align="center"
        gap={12}
        bg={colors.lightBlue}
        borderRadius="8px"
        px={16}
        py={12}
        data-cy={
          pending ? 'participant-upload-pending' : 'participant-upload-clean'
        }
      >
        <Column gap={4}>
          <Text fontWeight="bold" fontSize={14} lineHeight={1.3} data-private>
            {upload.originalFilename}
          </Text>
          {!!upload.description && (
            <Text fontSize={13} lineHeight={1.3} data-private>
              {upload.description}
            </Text>
          )}
          <Row align="center" gap={8}>
            {pending && <Loader type="inline" size={14} />}
            <Text fontSize={13} lineHeight={1.3} color={themeColors.text}>
              {formatMessage(statusMessage)}
            </Text>
          </Row>
          <Text fontSize={12} lineHeight={1.3} textOpacity={0.6}>
            {formatFileSize(upload.byteSize, 1)}
          </Text>
        </Column>
        {removingId === upload.id ? (
          <Loader type="inline" size={16} />
        ) : (
          <TextButton
            onClick={() => onRemove(upload.id)}
            disabled={disabled}
            buttonProps={{ color: themeColors.warning }}
          >
            {formatMessage(messages.removeFile)}
          </TextButton>
        )}
      </Row>
    );
  };

  return (
    <Box width="100%" padding={15}>
      <Column gap={16}>
        {uploads.map(renderUpload)}

        {!limitReached && (
          <>
            {showFileDescription && (
              <Column gap={6}>
                <Text fontSize={13} lineHeight={1.3}>
                  {formatMessage(messages.descriptionLabel)}
                </Text>
                <Input
                  type="singleline"
                  value={description}
                  onChange={({
                    target: { value },
                  }: React.ChangeEvent<HTMLInputElement>) =>
                    setDescription(value)
                  }
                  placeholder={formatMessage(messages.descriptionPlaceholder)}
                  disabled={disabled || uploading}
                  data-cy="participant-upload-description"
                />
              </Column>
            )}

            <Box data-cy="participant-upload-dropzone">
              <FileUpload
                value={null}
                onUpload={handleUpload}
                acceptedFormats={acceptedFormats}
                maxSize={config?.maxSizeBytes}
                label={formatMessage(messages.uploadLabel)}
                loading={uploading}
                disabled={disabled || !config}
                error={
                  errorCode
                    ? formatMessage(fileUploadErrorMessages[errorCode])
                    : undefined
                }
              />
            </Box>

            {!!config && (
              <Column gap={2}>
                <Text fontSize={12} lineHeight={1.3} textOpacity={0.6}>
                  {formatMessage(messages.acceptedFormats, {
                    formats: formatMimeFileFormatList(acceptedFormats),
                  })}
                </Text>
                <Text fontSize={12} lineHeight={1.3} textOpacity={0.6}>
                  {formatMessage(messages.maxSize, {
                    maxSize: formatFileSize(config.maxSizeBytes),
                  })}
                </Text>
              </Column>
            )}
          </>
        )}

        {limitReached && !disabled && (
          <Text fontSize={13} lineHeight={1.3} textOpacity={0.6}>
            {formatMessage(messages.limitReached)}
          </Text>
        )}
      </Column>
    </Box>
  );
};

export default FileUploadQuestionLayout;
