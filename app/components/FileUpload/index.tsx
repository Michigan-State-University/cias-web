import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import Box from 'components/Box';
import TextButton from 'components/Button/TextButton';
import Dropzone from 'components/Dropzone';
import Text from 'components/Text';
import Loader from 'components/Loader';

import { MAX_FILE_SIZE } from 'global/constants';
import { colors, borders } from 'theme';

import messages from './messages';

type Props = {
  onAddFile: (files: File[]) => void;
  acceptedFormats?: string;
  loading?: boolean;
  label?: string;
};

export const FileUpload = ({
  onAddFile,
  acceptedFormats,
  label,
  loading = false,
}: Props) => {
  const { formatMessage } = useIntl();

  const handleDrop = useCallback(
    (newFiles: File[]) => {
      onAddFile(newFiles);
    },
    [onAddFile],
  );

  const handleReject = (response: any) => {
    toast.error(response?.errors?.message || formatMessage(messages.error));
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDropAccepted: handleDrop,
    onDropRejected: handleReject,
    multiple: true,
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
        padding={12}
        withShadow={isDragActive}
        style={{
          position: 'relative',
          pointerEvents: loading ? 'none' : 'all',
        }}
        {...getRootProps()}
      >
        <Box display="flex" justify="center" align="center">
          {!loading && (
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
          <input {...getInputProps()} />
        </Box>
      </Dropzone>
    </>
  );
};

export default FileUpload;
