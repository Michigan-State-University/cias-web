import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import head from 'lodash/head';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Row from 'components/Row';
import Img from 'components/Img';
import H3 from 'components/H3';
import Dropzone from 'components/Dropzone';
import Column from 'components/Column';
import Text from 'components/Text';
import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';
import imagePlaceholder from 'assets/svg/image-placeholder.svg';
import { themeColors, borders } from 'theme';
import bin from 'assets/svg/bin-red.svg';

import { makeSelectDraggable } from 'containers/Interventions/components/QuestionNarrator/selectors';
import {
  addQuestionImage,
  deleteQuestionImage,
} from '../../containers/EditInterventionPage/actions';
import { makeSelectSelectedQuestion } from '../../containers/EditInterventionPage/selectors';
import { ImageWrapper } from './styled';
import messages from './messages';

export const QuestionImage = ({
  addImage,
  deleteImage,
  selectedQuestion: { id, image_url: imageUrl },
  intl: { formatMessage },
  draggable,
}) => {
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
    <Box mt={10}>
      {draggable && (
        <ImageWrapper>
          <Img src={imageUrl} alt="image" height="100%" width="100%" />
        </ImageWrapper>
      )}
      {!draggable && (
        <HoverableBox
          width="100%"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          clickable={false}
          px={21}
          py={14}
        >
          <Row justify="between" align="center" width="100%">
            <ImageWrapper>
              <Img src={imageUrl} alt="image" height="100%" width="100%" />
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
  draggable: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  draggable: makeSelectDraggable(),
});

const mapDispatchToProps = {
  addImage: addQuestionImage,
  deleteImage: deleteQuestionImage,
};

export const QuestionImageWithIntl = injectIntl(QuestionImage);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionImageWithIntl);
