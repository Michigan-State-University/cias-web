import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import Box from 'components/Box';
import TextButton from 'components/Button/TextButton';
import Dropzone from 'components/Dropzone';
import Text from 'components/Text';
import Loader from 'components/Loader';
import { ImageButton } from 'components/Button';
import FileBox from 'components/FileBox';

import { AppFile } from 'models/File';
import { MAX_FILE_SIZE } from 'global/constants';
import { colors, borders } from 'theme';
import binNoBg from 'assets/svg/bin-no-bg.svg';

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
  onRemoveFile?: never;
};

type SingleFileProps = CommonProps & {
  multiple: false;
  value: Nullable<AppFile>;
  onUpload: (file: File) => void;
  onRemoveFile?: () => void;
};

export type FileUploadProps = MultipleFilesProps | SingleFileProps;

export const FileUpload = ({
  acceptedFormats,
  label,
  loading = false,
  value,
  multiple,
  onUpload,
  onRemoveFile,
}: FileUploadProps) => {
  const { formatMessage } = useIntl();

  const canUploadFile = !loading && (multiple || !value);
  const shouldDisplayFile = !loading && !multiple && value;

  const deleteIcon = onRemoveFile ? (
    <ImageButton
      src={binNoBg}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onRemoveFile();
      }}
      title={formatMessage(messages.deleteFile)}
      disabled={false}
      iconProps={{
        width: 16,
        height: 16,
      }}
      showHoverEffect
    />
  ) : null;

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
        padding={shouldDisplayFile ? 5 : 15}
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
          {!loading && !multiple && value && (
            <FileBox
              name={value.name}
              url={value.url}
              padding="8px 12px"
              width="100%"
              fontWeight="bold"
              extraIcons={deleteIcon ? [deleteIcon] : []}
            />
          )}
          <input {...getInputProps()} />
        </Box>
      </Dropzone>
    </>
  );
};

export default FileUpload;
