import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const FinishScreen = ({ selectAnswer }) => {
  useEffect(() => selectAnswer(), []);
  return <></>;
};

FinishScreen.propTypes = {
  selectAnswer: PropTypes.func,
};

export default FinishScreen;
