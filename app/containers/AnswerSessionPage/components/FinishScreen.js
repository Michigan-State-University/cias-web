import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FinishScreenLayout from '../layouts/FinishScreenLayout';

const FinishScreen = ({ selectAnswer, formatMessage }) => {
  useEffect(() => selectAnswer(), []);
  return <FinishScreenLayout formatMessage={formatMessage} />;
};

FinishScreen.propTypes = {
  selectAnswer: PropTypes.func,
  formatMessage: PropTypes.func,
};

export default FinishScreen;
