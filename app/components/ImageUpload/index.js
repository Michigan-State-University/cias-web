import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import head from 'lodash/head';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import Box from 'components/Box';
import Column from 'components/Column';
import Dropzone from 'components/Dropzone';
import H3 from 'components/H3';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';

import bin from 'assets/svg/bin-red.svg';
import imagePlaceholder from 'assets/svg/image-placeholder.svg';

import { themeColors, borders, colors } from 'theme';

import { compose } from 'redux';
import Loader from 'components/Loader';
import { ImageWrapper } from './styled';
import messages from './messages';

const ImageUpload = ({
  onAddImage,
  onDeleteImage,
  isPreview,
  image,
  loading,
  intl: { formatMessage },
  disabled,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleDrop = useCallback(newFiles => {
    const img = head(newFiles);
    onAddImage({
      image: img,
      imageUrl: window.URL.createObjectURL(img),
    });
  }, []);

  const handleReject = () => toast.error(formatMessage(messages.error));

  const handleRemove = () => onDeleteImage();

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDropAccepted: handleDrop,
    onDropRejected: handleReject,
    multiple: false,
    noKeyboard: true,
    accept: 'image/jpeg, image/png, image/gif',
    noClick: true,
    maxSize: 5242880,
  });

  if (!image || typeof image !== 'string')
    return (
      <Dropzone
        border={`${borders.borderWidth} dashed ${themeColors.text}`}
        bg={themeColors.highlight}
        width="100%"
        padding={50}
        withShadow={isDragActive}
        style={{
          position: 'relative',
          pointerEvents: loading ? 'none' : 'all',
        }}
        {...getRootProps()}
      >
        {(loading || disabled) && (
          <Column
            display="flex"
            align="center"
            position="absolute"
            width="100%"
            height="100%"
            top="0px"
            left="0px"
          >
            <Box
              width="100%"
              height="100%"
              position="absolute"
              bg={colors.white}
              zIndex={1}
              opacity={0.5}
              disabled={disabled}
            />
            {loading && <Loader type="inline" zIndex={2} />}
          </Column>
        )}
        <Column display="flex" align="center" position="relative">
          <input {...getInputProps()} />
          <Img src={imagePlaceholder} alt="image" />
          <Row mt={22} mb={12}>
            {!isDragActive && (
              <H3
                color={themeColors.secondary}
                textDecoration="underline"
                cursor="pointer"
                onClick={open}
              >
                <FormattedMessage {...messages.upload} />
              </H3>
            )}
            <H3>
              <FormattedMessage
                {...messages[isDragActive ? 'drop' : 'header']}
              />
            </H3>
          </Row>
          <Row>
            <Text textOpacity={0.5}>
              <FormattedMessage {...messages.subheader} />
            </Text>
          </Row>
        </Column>
      </Dropzone>
    );

  return (
    <Box mt={10} width="100%">
      {(isPreview || disabled) && (
        <ImageWrapper>
          <Img src={image} alt="image" height="100%" width="100%" />
        </ImageWrapper>
      )}
      {!isPreview && !disabled && (
        <HoverableBox
          width="100%"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          clickable={false}
          px={21}
          py={14}
        >
          <Row justify="center" align="center" width="100%">
            <ImageWrapper>
              <Img src={image} alt="image" maxHeight="50vh" maxWidth="100%" />
            </ImageWrapper>
            <Box
              onClick={handleRemove}
              clickable
              visibility={hovered ? 'visible' : 'hidden'}
              ml={15}
            >
              <Img src={bin} alt="bin-icon" />
            </Box>
          </Row>
        </HoverableBox>
      )}
    </Box>
  );
};

ImageUpload.propTypes = {
  onAddImage: PropTypes.func,
  onDeleteImage: PropTypes.func,
  isPreview: PropTypes.bool,
  loading: PropTypes.bool,
  intl: intlShape,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
};

export default compose(
  memo,
  injectIntl,
)(ImageUpload);
