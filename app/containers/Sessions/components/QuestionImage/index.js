import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, useIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'redux-injectors';

import { makeSelectIsNarratorTab } from 'global/reducers/localState';
import {
  makeSelectSelectedQuestion,
  addQuestionImageRequest,
  deleteQuestionImageRequest,
  updateQuestionImageRequest,
  questionImageSaga,
} from 'global/reducers/questions';

import { colors } from 'theme';

import ImageUpload from 'components/ImageUpload';
import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import OriginalTextHover from 'components/OriginalTextHover';

import messages from './messages';

export const QuestionImage = ({
  addImage,
  deleteImage,
  updateImage,
  selectedQuestion: {
    id,
    image_url: imageUrl,
    image_alt: imageAlt,
    original_text: originalText,
  },
  isNarratorTab,
  disabled,
}) => {
  const { formatMessage } = useIntl();
  useInjectSaga({ key: 'questionImage', saga: questionImageSaga });

  const handleDrop = (image) => {
    addImage({
      image: image.image,
      imageUrl: image.imageUrl,
    });
  };

  const handleRemove = () => deleteImage({ selectedQuestionId: id });

  const handleUpdateDescription = (description) => {
    updateImage(id, description);
  };

  return (
    <Column>
      <ImageUpload
        image={imageUrl}
        disabled={disabled || isNarratorTab}
        onAddImage={handleDrop}
        onDeleteImage={handleRemove}
      />
      <Box mt={20} bg={colors.linkWater}>
        <OriginalTextHover
          id={`question-${id}-image`}
          text={originalText?.image_description}
          position="relative"
          iconProps={{
            position: 'absolute',
            right: 12,
            bottom: 12,
          }}
        >
          <ApprovableInput
            type="multiline"
            value={imageAlt ?? ''}
            onCheck={handleUpdateDescription}
            placeholder={formatMessage(messages.logoDescriptionPlaceholder)}
            rows="4"
          />
        </OriginalTextHover>
      </Box>
    </Column>
  );
};

QuestionImage.propTypes = {
  addImage: PropTypes.func,
  deleteImage: PropTypes.func,
  updateImage: PropTypes.func,
  selectedQuestion: PropTypes.shape({
    id: PropTypes.string,
    image_url: PropTypes.string,
    image_alt: PropTypes.string,
    original_text: PropTypes.object,
  }),
  isNarratorTab: PropTypes.bool,
  disabled: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  isNarratorTab: makeSelectIsNarratorTab(),
});

const mapDispatchToProps = {
  addImage: addQuestionImageRequest,
  deleteImage: deleteQuestionImageRequest,
  updateImage: updateQuestionImageRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect)(QuestionImage);
