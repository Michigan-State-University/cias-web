import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import Box from 'components/Box';
import TextButton from 'components/Button/TextButton';
import Dropzone from 'components/Dropzone';
import Text from 'components/Text';
import Loader from 'components/Loader';
import { FileDisplayItem } from 'components/FileDisplayItem';

import { AppFile } from 'models/File';
import { MAX_FILE_SIZE } from 'global/constants';
import { colors, borders } from 'theme';

import messages from './messages';

type CommonProps = {
  acceptedFormats?: string | string[];
  loading?: boolean;
  label?: string;
};

type MultipleFilesProps = CommonProps & {
  multiple: true;
  value: AppFile[];
  onUpload: (files: File[]) => void;
};

type SingleFileProps = CommonProps & {
  multiple: false;
  value: Nullable<AppFile>;
  onUpload: (file: File) => void;
};

export type FileUploadProps = MultipleFilesProps | SingleFileProps;

export const FileUpload = ({
  acceptedFormats,
  label,
  loading = false,
  multiple,
  value,
  onUpload,
}: FileUploadProps) => {
  const { formatMessage } = useIntl();

  const canUploadFile = !loading && (multiple || !value);
  const shouldDisplayFile = !loading && !multiple && value;

  const handleDrop = useCallback(
    (newFiles: File[]) => {
      if (!multiple) onUpload(newFiles[0]);
      else onUpload(newFiles);
    },
    [multiple, onUpload],
  );

  const handleReject = (response: any) => {
    toast.error(response?.errors?.message || formatMessage(messages.error));
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDropAccepted: handleDrop,
    onDropRejected: handleReject,
    multiple,
    noKeyboard: true,
    accept: acceptedFormats,
    noClick: true,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <>
      {label && (
        <Text mb={12} fontSize={13} lineHeight={1}>
          {label}
        </Text>
      )}
      <Dropzone
        border={`${borders.borderWidth} dashed ${colors.perwinkleCrayola}`}
        width="100%"
        padding={shouldDisplayFile ? 5 : 12}
        withShadow={isDragActive}
        style={{
          position: 'relative',
          pointerEvents: loading ? 'none' : 'all',
        }}
        {...getRootProps()}
      >
        <Box display="flex" justify="center" align="center">
          {canUploadFile && (
            <>
              <TextButton
                onClick={open}
                buttonProps={{
                  color: colors.jungleGreen,
                  textDecoration: 'underline',
                }}
              >
                <FormattedMessage {...messages.upload} />
              </TextButton>
              <Text textOpacity={0.5} color={colors.bluewood}>
                <FormattedMessage {...messages.dragAndDrop} />
              </Text>
            </>
          )}
          {loading && <Loader type="inline" size={21} />}
          {shouldDisplayFile && (
            <Box
              display="flex"
              justify="between"
              bg={colors.lightBlue}
              borderRadius="5px"
              padding="9px 12px"
              width="100%"
              fontWeight="bold"
            >
              <FileDisplayItem
                // @ts-ignore
                fileInfo={{ name: value.name, url: value.url }}
              />
            </Box>
          )}
          <input {...getInputProps()} />
        </Box>
      </Dropzone>
    </>
  );
};

export default FileUpload;
