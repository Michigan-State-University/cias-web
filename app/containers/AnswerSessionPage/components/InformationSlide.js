import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const InformationSlide = ({ selectAnswer }) => {
  useEffect(() => selectAnswer(), []);
  return <></>;
};

InformationSlide.propTypes = {
  selectAnswer: PropTypes.func,
};

export default InformationSlide;
