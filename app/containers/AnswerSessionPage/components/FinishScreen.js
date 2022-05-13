import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FinishScreenLayout from '../layouts/FinishScreenLayout';

const FinishScreen = ({ selectAnswer, formatMessage, question }) => {
  useEffect(() => selectAnswer(), []);
  return (
    <FinishScreenLayout question={question} formatMessage={formatMessage} />
  );
};

FinishScreen.propTypes = {
  question: PropTypes.object,
  selectAnswer: PropTypes.func,
  formatMessage: PropTypes.func,
};

export default FinishScreen;
