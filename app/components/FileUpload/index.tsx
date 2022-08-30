import React, { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import Tooltip from 'components/Tooltip';

import { AppFile } from 'models/File';
import { MAX_FILE_SIZE } from 'global/constants';
import { colors, borders, themeColors } from 'theme';
import binNoBg from 'assets/svg/bin-no-bg.svg';
import questionMark from 'assets/svg/grey-question-mark.svg';

import messages from './messages';

type CommonProps = {
  acceptedFormats?: string | string[];
  loading?: boolean;
  label?: string;
  tooltipContent?: JSX.Element;
  error?: string;
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
  tooltipContent,
  error,
}: FileUploadProps) => {
  const { formatMessage } = useIntl();

  const [inputError, setInputError] = useState(error);

  useEffect(() => {
    setInputError(error);
  }, [error]);

  const clearInputError = () => setInputError(undefined);

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
      <Box display="flex" align="center" mb={12}>
        {label && (
          <Text fontSize={13} lineHeight={1}>
            {label}
          </Text>
        )}
        {tooltipContent && (
          <Tooltip
            id="file-upload-tooltip"
            ml={label && 8}
            icon={questionMark}
            content={tooltipContent}
            place="right"
          />
        )}
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
    </>
  );
};

export default FileUpload;
