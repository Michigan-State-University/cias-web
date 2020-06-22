import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

import animationData from './Animations/YzwpWaK.json';

import { NarratorContainer } from './styled';

const lottieStyles = {
  margin: 'none',
  marginLeft: '50px',
};

const QuestionNarrator = () => {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData,
  };
  const animation = useRef(null);

  return (
    <NarratorContainer>
      <Lottie
        ref={animation}
        options={defaultOptions}
        height={100}
        width={100}
        style={lottieStyles}
        isClickToPauseDisabled
        isStopped
      />
    </NarratorContainer>
  );
};

// QuestionNarrator.propTypes = {};

export default QuestionNarrator;
