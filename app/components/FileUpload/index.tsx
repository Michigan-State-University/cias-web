import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormattedMessage, useIntl } from 'react-intl';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import bytes from 'bytes';

import Box from 'components/Box';
import TextButton from 'components/Button/TextButton';
import Dropzone from 'components/Dropzone';
import Text from 'components/Text';
import Loader from 'components/Loader';
import { ImageButton } from 'components/Button';
import FileBox from 'components/FileBox';
import { HelpIconTooltip } from 'components/HelpIconTooltip';
import Column from 'components/Column';

import { AppFile } from 'models/File';
import { MAX_FILE_SIZE } from 'global/constants';
import { colors, borders, themeColors } from 'theme';
import binNoBg from 'assets/svg/bin-no-bg.svg';

import messages from './messages';
import { formatFileErrorMessage } from './utils';

export type FileFormat = string;

type CommonProps = {
  acceptedFormats?: string | string[];
  loading?: boolean;
  label?: string;
  tooltipContent?: ReactNode;
  error?: string;
  disabled?: boolean;
  maxSize?: number;
  // Will look up in maxSizeMap if there is a restriction for selected file type.
  // If not found, will use maxSize or MAX_FILE_SIZE if not provided (by default)
  // Please use all lowercase keys!
  maxSizeMap?: Map<FileFormat, number>;
};

type MultipleFilesProps = CommonProps & {
  multiple: true;
  value: AppFile[];
  onUpload: (files: File[]) => void;
  onRemoveFile?: (id: string) => void;
};

type SingleFileProps = CommonProps & {
  multiple?: false;
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
  tooltipContent,
  error,
  disabled,
  maxSize = MAX_FILE_SIZE,
  maxSizeMap,
}: FileUploadProps) => {
  const { formatMessage } = useIntl();

  const [inputError, setInputError] = useState(error);

  useEffect(() => {
    setInputError(error);
  }, [error]);

  const clearInputError = () => setInputError(undefined);

  const canUploadFile = !loading && (multiple || !value);
  const shouldDisplayFile = !loading && !multiple && value;

  const deleteIcon = (id: string, deleting?: boolean) => {
    if (!onRemoveFile) return null;
    if (deleting) return <Loader type="inline" size={18} />;
    return (
      <ImageButton
        src={binNoBg}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          onRemoveFile(id);
        }}
        title={formatMessage(messages.deleteFile)}
        disabled={disabled}
        iconProps={{
          width: 16,
          height: 16,
        }}
        showHoverEffect
      />
    );
  };

  const validateFileSize = (file: File) => {
    const maxSizeByFormat = maxSizeMap?.get(file.type.toLowerCase()) ?? maxSize;
    if (file.size > maxSizeByFormat) {
      setInputError(
        formatMessage(messages.fileTooLargeCustomValidation, {
          maxSize: bytes(maxSizeByFormat),
        }),
      );
      return false;
    }
    return true;
  };

  const handleDrop = useCallback<
    NonNullable<DropzoneOptions['onDropAccepted']>
  >(
    (newFiles) => {
      if (!multiple) {
        const file = newFiles[0];
        if (!file) return;

        const isFileValid = validateFileSize(file);
        if (isFileValid) onUpload(file);
        return;
      }

      const validFiles = newFiles.filter((file) => validateFileSize(file));
      onUpload(validFiles);
    },
    [multiple, onUpload, maxSize, maxSizeMap],
  );

  const handleReject: DropzoneOptions['onDropRejected'] = (fileRejections) => {
    setInputError(formatFileErrorMessage(formatMessage, fileRejections));
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDropAccepted: handleDrop,
    onDropRejected: handleReject,
    multiple,
    noKeyboard: true,
    accept: acceptedFormats,
    noClick: true,
    disabled,
  });

  return (
    <>
      <Box display="flex" align="center" mb={12}>
        <HelpIconTooltip
          id="file-upload-tooltip"
          tooltipContent={tooltipContent}
        >
          {label && (
            <Text fontSize={13} lineHeight={1}>
              {label}
            </Text>
          )}
        </HelpIconTooltip>
      </Box>
      <Dropzone
        border={
          inputError
            ? `${borders.borderWidth} solid ${themeColors.alert}`
            : `${borders.borderWidth} dashed ${colors.perwinkleCrayola}`
        }
        width="100%"
        padding={shouldDisplayFile ? 5 : 15}
        withShadow={isDragActive}
        style={{
          position: 'relative',
          pointerEvents: loading ? 'none' : 'all',
        }}
        {...getRootProps()}
        onBlur={clearInputError}
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
                disabled={disabled}
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
              extraIcons={deleteIcon(value.id)}
            />
          )}
          <input {...getInputProps()} />
        </Box>
      </Dropzone>
      <AnimatePresence initial={false}>
        {inputError && (
          <motion.div exit={{ opacity: 0 }} key="file-upload-error-box">
            <Box mt={12}>
              <Text color={themeColors.alert} fontWeight="bold">
                {inputError}
              </Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      {multiple && (
        <Column
          width="calc(100% + 16px)"
          maxHeight={110}
          overflow="auto"
          pr={16}
          mt={16}
          gap={8}
        >
          {/* @ts-ignore */}
          {value.map(({ url, name, id, deleting }) => (
            <FileBox
              name={name}
              url={url}
              key={id}
              extraIcons={deleteIcon(id, deleting)}
              maxHeight={44}
              minHeight={44}
            />
          ))}
        </Column>
      )}
    </>
  );
};

export default FileUpload;
