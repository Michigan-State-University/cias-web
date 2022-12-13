import React from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { borders, colors } from 'theme';
import JsonFile from 'assets/svg/file-icons/json_file.svg';

import { MAX_FILE_SIZE } from 'global/constants';

import Text from 'components/Text';
import Img from 'components/Img';
import Box from 'components/Box';
import Button from 'components/Button';
import Dropzone from 'components/Dropzone';

import messages from './messages';
import FileInputValue from './FileInputValue';

export type Props = {
  value: File[];
  onChange: (value: File[]) => void;
  multiple?: boolean;
  instruction?: string;
} & Pick<DropzoneOptions, 'accept'>;

const FileInput = ({
  value,
  onChange,
  multiple,
  instruction,
  accept,
}: Props) => {
  const { formatMessage } = useIntl();

  const handleDrop = (newFiles: File[]) => {
    onChange([...value, ...newFiles]);
  };

  const handleReject: DropzoneOptions['onDropRejected'] = (response) => {
    toast.error(
      response[0]?.errors[0]?.message ||
        formatMessage(messages.dragAndDropError),
    );
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDropAccepted: handleDrop,
    onDropRejected: handleReject,
    noKeyboard: true,
    accept,
    noClick: true,
    maxSize: MAX_FILE_SIZE,
    multiple,
  });

  const removeFile = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  const filesSelected = Boolean(value.length);

  return (
    <Dropzone
      border={`${borders.borderWidth} ${filesSelected ? 'solid' : 'dashed'} ${
        colors.perwinkleCrayola
      }`}
      width="100%"
      withShadow={isDragActive}
      bg={filesSelected ? undefined : colors.linkWater}
      style={{
        position: 'relative',
        pointerEvents: 'all',
      }}
      {...getRootProps()}
    >
      <Box
        display="flex"
        align={filesSelected ? 'stretch' : 'center'}
        justify={filesSelected ? 'start' : 'center'}
        direction="column"
        height={248}
        overflow="auto"
        boxSizing="border-box"
        padding={filesSelected ? 8 : 32}
        gap={filesSelected ? 8 : 0}
      >
        <input {...getInputProps()} />
        {!filesSelected && (
          <>
            <Img mb={24} src={JsonFile} alt="file" />
            <Text fontWeight="bold" mb={8}>
              {instruction ?? formatMessage(messages.dragAndDropInstructions)}
            </Text>
            <Box my={8} display="flex" align="center">
              <Box width={32} height={1} bg={colors.grey} />
              <Text color={colors.grey} mx={12}>
                {formatMessage(messages.or)}
              </Text>
              <Box width={32} height={1} bg={colors.grey} />
            </Box>
          </>
        )}
        {filesSelected &&
          value.map((file, index) => (
            <FileInputValue file={file} onRemove={() => removeFile(index)} />
          ))}
        {(multiple || !filesSelected) && (
          <Button
            light
            title={formatMessage(messages.browseFiles)}
            px={32}
            width="auto"
            flexShrink={0}
            onClick={open}
          />
        )}
      </Box>
    </Dropzone>
  );
};

export default FileInput;
