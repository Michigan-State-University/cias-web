/**
 *
 * UploadFileButton
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import head from 'lodash/head';
import { useDropzone } from 'react-dropzone';

import Box from 'components/Box';
import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';
import { themeColors } from 'theme';

const UploadFileButton = ({
  icon,
  children,
  onUpload = () => {},
  textProps,
  ...restProps
}) => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    multiple: false,
    noKeyboard: true,
    accept: '.csv',
    noClick: true,
  });

  useEffect(() => {
    if (acceptedFiles) onUpload(head(acceptedFiles));
  }, [acceptedFiles]);

  return (
    <Box {...getRootProps()} {...restProps}>
      <input {...getInputProps()} />
      <Row align="center" onClick={open} clickable>
        {icon && <Img src={icon} alt="upload" mr={10} />}
        <Text {...textProps}>{children}</Text>
      </Row>
    </Box>
  );
};

UploadFileButton.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  onUpload: PropTypes.func,
  textProps: PropTypes.object,
};

UploadFileButton.defaultProps = {
  textProps: {
    color: themeColors.secondary,
    fontWeight: 'bold',
  },
};

export default UploadFileButton;
