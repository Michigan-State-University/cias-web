import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { borders, colors } from 'theme';
import { MAX_FILE_SIZE } from 'global/constants';
import {
  importInterventionRequest,
  importInterventionSaga,
  makeSelectInterventionsLoader,
  makeSelectInterventionsError,
} from 'global/reducers/interventions';

import jsonFile from 'assets/svg/file-icons/json_file.svg';

import Divider from 'components/Divider';
import Text, { Comment } from 'components/Text';
import Img from 'components/Img';
import Box from 'components/Box';
import Button from 'components/Button';
import Dropzone from 'components/Dropzone';
import ErrorAlert from 'components/ErrorAlert';
import Loader from 'components/Loader';

import messages from './messages';

type Props = {
  closeModal: () => void;
};

const ImportModalContent = ({ closeModal }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  useInjectSaga({ key: 'importIntervention', saga: importInterventionSaga });

  const loading = useSelector(
    makeSelectInterventionsLoader('importIntervention'),
  );
  const error = useSelector(makeSelectInterventionsError('importIntervention'));

  const handleDrop = (files: File[]) => {
    dispatch(importInterventionRequest(files[0], { onSuccess: closeModal }));
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
    accept: '.json',
    noClick: true,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <>
      <Comment>{formatMessage(messages.uploadIntervention)}</Comment>
      <Divider mt={16} mb={40} />
      <Dropzone
        border={`${borders.borderWidth} dashed ${colors.perwinkleCrayola}`}
        width="100%"
        withShadow={isDragActive}
        bg={colors.linkWater}
        style={{
          position: 'relative',
          pointerEvents: 'all',
        }}
        {...getRootProps()}
      >
        <Box
          display="flex"
          align="center"
          justify="center"
          direction="column"
          minHeight={248}
          boxSizing="border-box"
          padding={32}
        >
          {!loading && (
            <>
              <Img mb={24} src={jsonFile} alt="file" />
              <Text fontWeight="bold" mb={8}>
                {formatMessage(messages.dragAndDropInstructions)}
              </Text>
              <Box my={8} display="flex" align="center">
                <Box width={32} height={1} bg={colors.grey} />
                <Text color={colors.grey} mx={12}>
                  {formatMessage(messages.or)}
                </Text>
                <Box width={32} height={1} bg={colors.grey} />
              </Box>
              <Button
                light
                title={formatMessage(messages.browseFiles)}
                px={32}
                width="auto"
                onClick={open}
              />

              <input {...getInputProps()} />
            </>
          )}
          {loading && <Loader type="inline" />}
        </Box>
      </Dropzone>
      {error && <ErrorAlert errorText={error} mt={16} />}
    </>
  );
};

export default ImportModalContent;
