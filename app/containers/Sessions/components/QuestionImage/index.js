import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import head from 'lodash/head';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useDropzone } from 'react-dropzone';

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
import { makeSelectIsNarratorTab } from 'global/reducers/localState';
import { themeColors, borders } from 'theme';
import { useInjectSaga } from 'redux-injectors';
import {
  makeSelectSelectedQuestion,
  addQuestionImageRequest,
  deleteQuestionImageRequest,
  addQuestionImageSaga,
  deleteQuestionImageSaga,
} from 'global/reducers/questions';

import { ImageWrapper } from './styled';
import messages from './messages';

export const QuestionImage = ({
  addImage,
  deleteImage,
  selectedQuestion: { id, image_url: imageUrl },
  intl: { formatMessage },
  isNarratorTab,
}) => {
  useInjectSaga({ key: 'addQuestionImage', saga: addQuestionImageSaga });
  useInjectSaga({ key: 'deleteQuestionImage', saga: deleteQuestionImageSaga });
  const [hovered, setHovered] = useState(false);

  const handleDrop = useCallback(newFiles => {
    const img = head(newFiles);
    addImage({
      image: img,
      imageUrl: window.URL.createObjectURL(img),
      selectedQuestionId: id,
    });
  }, []);

  // eslint-disable-next-line no-alert
  const handleReject = () => alert(formatMessage(messages.error));

  const handleRemove = () => deleteImage({ selectedQuestionId: id });

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDropAccepted: handleDrop,
    onDropRejected: handleReject,
    multiple: false,
    noKeyboard: true,
    accept: 'image/jpeg, image/png, image/gif',
    noClick: true,
    maxSize: 5242880,
  });

  if (typeof imageUrl !== 'string' || !imageUrl)
    return (
      <Dropzone
        border={`${borders.borderWidth} dashed ${themeColors.text}`}
        bg={themeColors.highlight}
        width="100%"
        padding={50}
        withShadow={isDragActive}
        {...getRootProps()}
      >
        <Column display="flex" align="center">
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
      {isNarratorTab && (
        <ImageWrapper>
          <Img src={imageUrl} alt="image" height="100%" width="100%" />
        </ImageWrapper>
      )}
      {!isNarratorTab && (
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
              <Img
                src={imageUrl}
                alt="image"
                maxHeight="50vh"
                maxWidth="100%"
              />
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

QuestionImage.propTypes = {
  addImage: PropTypes.func,
  deleteImage: PropTypes.func,
  selectedQuestion: PropTypes.shape({
    id: PropTypes.string,
    image_url: PropTypes.string,
  }),
  formatMessage: PropTypes.func,
  intl: intlShape,
  isNarratorTab: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  isNarratorTab: makeSelectIsNarratorTab(),
});

const mapDispatchToProps = {
  addImage: addQuestionImageRequest,
  deleteImage: deleteQuestionImageRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(QuestionImage);
