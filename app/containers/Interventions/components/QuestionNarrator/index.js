import React, { useRef, useState, useEffect } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import { NarratorContainer } from './styled';
import { makeSelectPreviewAnimation } from './selectors';
import { getPause } from './helpers';

const lottieStyles = {
  margin: 'none',
  marginLeft: '50px',
};

const QuestionNarrator = ({ animation }) => {
  const [loadedAnimations, setLoadedAnimations] = useState([]);
  const animationRef = useRef(null);

  const fetchJSON = async () => {
    if (!loadedAnimations.find(anim => anim.name === animation)) {
      const data = await import(`./Animations/${animation}.json`);
      setLoadedAnimations([
        ...loadedAnimations,
        {
          name: animation,
          path: `./Animations/${animation}.json`,
          animationData: data,
          pause: getPause(animation),
        },
      ]);
    }
  };

  useEffect(() => {
    if (animation) {
      fetchJSON();
    }
  }, [animation]);

  useDidUpdateEffect(() => {
    const { anim } = animationRef.current;
    if (animation) anim.play();
    else anim.stop();
  }, [animation]);

  const currentAnimation = loadedAnimations.find(
    anim => anim.name === animation,
  );

  const defaultOptions = {
    renderer: 'svg',
    autoloadSegments: false,
    loop: false,
    autoplay: false,
    ...(currentAnimation
      ? {
          name: currentAnimation.name,
          path: currentAnimation.path,
          animationData: currentAnimation.animationData,
        }
      : {}),
  };

  const completeCallback = () => {
    setTimeout(() => {
      if (animationRef.current) {
        const { anim } = animationRef.current;
        anim.setDirection(-1);
        anim.play();
        anim.removeEventListener('complete', completeCallback);
      }
    }, get(currentAnimation, 'pause', 0));
  };

  return (
    <NarratorContainer>
      <Lottie
        ref={animationRef}
        options={defaultOptions}
        height={100}
        width={100}
        style={lottieStyles}
        isClickToPauseDisabled
        eventListeners={[
          {
            eventName: 'complete',
            callback: completeCallback,
          },
        ]}
      />
    </NarratorContainer>
  );
};

QuestionNarrator.propTypes = {
  animation: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  animation: makeSelectPreviewAnimation(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(QuestionNarrator);
