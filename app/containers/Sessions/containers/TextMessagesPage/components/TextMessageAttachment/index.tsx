import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { AxiosError } from 'axios';
import byteSize from 'byte-size';

import { themeColors } from 'theme';

import { AppFile } from 'models/File';

import {
  MMS_ACCEPTED_FILE_FORMATS,
  MMS_LARGE_IMAGE_FILE_FORMATS,
  MMS_MAX_FILE_SIZE,
  MMS_MAX_LARGE_IMAGE_FILE_SIZE_MAP,
  MMS_MAX_NON_LARGE_IMAGE_FILE_FORMAT_SIZE,
} from 'global/constants';

import { formatMimeFileFormat } from 'utils/formatters';

import FileUpload from 'components/FileUpload';
import Column from 'components/Column';
import Text from 'components/Text';
import { TextButton } from 'components/Button';

import messages from '../NoFormulaMessages/messages';

export type Props = {
  attachment: Nullable<AppFile>;
  loading: boolean;
  onAdd: (file: File) => void;
  onDelete: () => void;
  editingPossible: boolean;
  error: Nullable<AxiosError>;
};

export const TextMessageAttachment: React.FC<Props> = ({
  attachment,
  loading,
  onAdd,
  onDelete,
  editingPossible,
  error,
}) => {
  const { formatMessage } = useIntl();

  const [allFormatsVisible, setAllFormatsVisible] = useState(false);

  const formattedLargeImageFileFormats = useMemo(
    () => MMS_LARGE_IMAGE_FILE_FORMATS.map(formatMimeFileFormat),
    [],
  );

  const formattedAcceptedFileFormats = useMemo(
    () => MMS_ACCEPTED_FILE_FORMATS.map(formatMimeFileFormat),
    [],
  );

  return (
    <>
      <FileUpload
        acceptedFormats={MMS_ACCEPTED_FILE_FORMATS}
        label={formatMessage(messages.attachmentLabel)}
        loading={loading}
        value={attachment}
        onUpload={onAdd}
        onRemoveFile={onDelete}
        error={error?.response?.data?.message}
        disabled={!editingPossible}
        maxSize={MMS_MAX_NON_LARGE_IMAGE_FILE_FORMAT_SIZE}
        maxSizeMap={MMS_MAX_LARGE_IMAGE_FILE_SIZE_MAP}
        tooltipContent={
          <Column align="start">
            <Text>
              {formatMessage(messages.maxLargeImageFileSize, {
                formats: formattedLargeImageFileFormats.join(', '),
                maxSize: byteSize(MMS_MAX_FILE_SIZE, {
                  precision: 2,
                }).toString(),
              })}
            </Text>
            <Text mt={12}>
              {formatMessage(messages.maxOtherFileSize, {
                maxSize: byteSize(MMS_MAX_NON_LARGE_IMAGE_FILE_FORMAT_SIZE, {
                  precision: 0,
                }).toString(),
              })}
            </Text>
            {!allFormatsVisible && (
              <TextButton
                buttonProps={{ py: 16, px: 0, color: themeColors.secondary }}
                onClick={() => setAllFormatsVisible(true)}
              >
                {formatMessage(messages.viewAllSupportedFileFormats)}
              </TextButton>
            )}
            {allFormatsVisible && (
              <>
                <Text mt={12}>
                  {formatMessage(messages.allSupportedFormats)}
                </Text>
                <Text opacity={0.8}>
                  {formattedAcceptedFileFormats.join(', ')}
                </Text>
              </>
            )}
          </Column>
        }
        onHideTooltip={() => setAllFormatsVisible(false)}
      />
    </>
  );
};
