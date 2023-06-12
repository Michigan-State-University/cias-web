/**
 *
 * UploadFileButton
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import { useDropzone } from 'react-dropzone';

import { themeColors } from 'theme';

import Loader from 'components/Loader';
import Box from 'components/Box';
import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';

const UploadFileButton = ({
  icon,
  children,
  onUpload,
  textProps,
  accept,
  className,
  dropzoneProps,
  iconProps,
  isLoading,
  disabled,
  ...restProps
}) => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    multiple: false,
    noKeyboard: true,
    accept,
    noClick: true,
    disabled,
    ...dropzoneProps,
  });

  useEffect(() => {
    const { multiple } = getInputProps();
    if (!isEmpty(acceptedFiles))
      onUpload(multiple ? acceptedFiles : head(acceptedFiles));
  }, [acceptedFiles]);

  return (
    <Box
      {...getRootProps()}
      className={className}
      disabled={disabled}
      {...restProps}
    >
      {isLoading && <Loader type="inline" />}
      {!isLoading && (
        <>
          <input {...getInputProps()} />
          <Row align="center" onClick={open} clickable disabled={disabled}>
            {icon && <Img src={icon} alt="upload" mr={10} {...iconProps} />}
            <Text {...textProps}>{children}</Text>
          </Row>
        </>
      )}
    </Box>
  );
};

UploadFileButton.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  onUpload: PropTypes.func,
  textProps: PropTypes.object,
  accept: PropTypes.string,
  className: PropTypes.string,
  dropzoneProps: PropTypes.object,
  iconProps: PropTypes.object,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

UploadFileButton.defaultProps = {
  textProps: {
    color: themeColors.secondary,
    fontWeight: 'bold',
  },
};

export default UploadFileButton;
