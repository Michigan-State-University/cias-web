import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import Button from 'components/Button';
import ConfirmationBox from 'components/ConfirmationBox';

import messages from '../messages';

export const ResetAudioUI = ({ resetAudio, isLoading }) => {
  const { formatMessage } = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onResetAudio = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ConfirmationBox
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        description={formatMessage(messages.resetAudioModalHeader)}
        content={formatMessage(messages.resetAudioModalContent)}
        confirmAction={resetAudio}
      />
      <Button onClick={onResetAudio} loading={isLoading}>
        {formatMessage(messages.resetAudioButton)}
      </Button>
    </>
  );
};

ResetAudioUI.propTypes = {
  resetAudio: PropTypes.func,
  isLoading: PropTypes.bool,
};
