import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import {
  addAnswerImageRequest,
  questionImageSaga,
  makeSelectLoader,
  makeSelectError,
} from 'global/reducers/questions';
import globalMessages from 'global/i18n/globalMessages';

import Divider from 'components/Divider';
import { Comment } from 'components/Text';
import Button from 'components/Button';
import ErrorAlert from 'components/ErrorAlert';
import Row from 'components/Row';
import ImageUpload from 'components/ImageUpload';
import messages from './messages';

const AnswerImageUploadModal = ({ closeModal, answerId }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  useInjectSaga({ key: 'questionImage', saga: questionImageSaga });

  const loading = useSelector(makeSelectLoader('updateQuestionLoading'));
  const error = useSelector(makeSelectError('updateQuestionError'));

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleAddImage = (imageData) => {
    setImage(imageData.image);
    setImageUrl(imageData.imageUrl);
  };

  const handleDeleteImage = () => {
    if (imageUrl) {
      window.URL.revokeObjectURL(imageUrl);
    }
    setImage(null);
    setImageUrl(null);
  };

  const handleUpload = () => {
    if (image && answerId) {
      dispatch(
        addAnswerImageRequest({
          image,
          answerId,
          imageUrl,
        }),
      );
      closeModal();
    }
  };

  return (
    <>
      <Comment>{formatMessage(messages.description)}</Comment>
      <Divider mt={16} mb={40} />
      <ImageUpload
        image={imageUrl}
        onAddImage={handleAddImage}
        onDeleteImage={handleDeleteImage}
        acceptedFormats={['JPG', 'PNG', 'GIF']}
        loading={loading}
      />
      {error && <ErrorAlert errorText={error} mt={16} />}
      <Row mt={56} gap={16}>
        <Button
          width="auto"
          px={30}
          title={formatMessage(messages.upload)}
          loading={loading}
          onClick={handleUpload}
          disabled={!image}
        />
        <Button
          light
          width="auto"
          px={30}
          title={formatMessage(globalMessages.cancel)}
          onClick={closeModal}
        />
      </Row>
    </>
  );
};

AnswerImageUploadModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  answerId: PropTypes.string.isRequired,
};

export default AnswerImageUploadModal;
