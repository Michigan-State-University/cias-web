import React from 'react';
import { useIntl } from 'react-intl';
import { AxiosError } from 'axios';
import byteSize from 'byte-size';

import { AppFile } from 'models/File';

import {
  MMS_ACCEPTED_FILE_FORMATS,
  MMS_LARGE_IMAGE_FILE_FORMATS,
  MMS_MAX_FILE_SIZE,
  MMS_MAX_LARGE_IMAGE_FILE_SIZE_MAP,
  MMS_MAX_NON_LARGE_IMAGE_FILE_FORMAT_SIZE,
} from 'global/constants';

import FileUpload from 'components/FileUpload';
import Column from 'components/Column';
import Text from 'components/Text';

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
          <Column>
            <Text>
              {formatMessage(messages.maxImageFileSize)}
              <ul>
                {MMS_LARGE_IMAGE_FILE_FORMATS.map((format) => (
                  <li>{format}</li>
                ))}
              </ul>
              {formatMessage(messages.is, {
                maxSize: byteSize(MMS_MAX_FILE_SIZE, {
                  precision: 2,
                }).toString(),
              })}
              <br />
              {formatMessage(messages.maxOtherFileSize, {
                maxSize: byteSize(MMS_MAX_NON_LARGE_IMAGE_FILE_FORMAT_SIZE, {
                  precision: 0,
                }).toString(),
              })}
            </Text>
          </Column>
        }
      />
    </>
  );
};
