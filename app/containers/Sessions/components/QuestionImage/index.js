import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'redux-injectors';

import { makeSelectIsNarratorTab } from 'global/reducers/localState';
import {
  makeSelectSelectedQuestion,
  addQuestionImageRequest,
  deleteQuestionImageRequest,
  addQuestionImageSaga,
  deleteQuestionImageSaga,
} from 'global/reducers/questions';

import ImageUpload from 'components/ImageUpload';

export const QuestionImage = ({
  addImage,
  deleteImage,
  selectedQuestion: { id, image_url: imageUrl },
  isNarratorTab,
  disabled,
}) => {
  useInjectSaga({ key: 'addQuestionImage', saga: addQuestionImageSaga });
  useInjectSaga({ key: 'deleteQuestionImage', saga: deleteQuestionImageSaga });

  const handleDrop = image => {
    addImage({
      image: image.image,
      imageUrl: image.imageUrl,
      selectedQuestionId: id,
    });
  };

  const handleRemove = () => deleteImage({ selectedQuestionId: id });

  return (
    <ImageUpload
      image={imageUrl}
      disabled={disabled || isNarratorTab}
      onAddImage={handleDrop}
      onDeleteImage={handleRemove}
    />
  );
};

QuestionImage.propTypes = {
  addImage: PropTypes.func,
  deleteImage: PropTypes.func,
  selectedQuestion: PropTypes.shape({
    id: PropTypes.string,
    image_url: PropTypes.string,
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
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(QuestionImage);
