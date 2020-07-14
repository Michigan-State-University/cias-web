import React, { useRef, useState, useEffect } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';
import getPause from 'utils/animations/getPause';
import { autoRestAnimations } from 'utils/animations/animationsNames';

import Draggable from 'react-draggable';
import { setAnimationStopPosition } from 'containers/Interventions/containers/EditInterventionPage/actions';
import { NarratorContainer } from './styled';
import {
  makeSelectPreviewAnimation,
  makeSelectDraggable,
  makeSelectAnimationPosition,
} from './selectors';

const lottieStyles = {
  margin: 'none',
};

const QuestionNarrator = ({
  animation,
  draggable,
  setOffset,
  animationPositionStored,
}) => {
  const [loadedAnimations, setLoadedAnimations] = useState([]);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const fetchJSON = async () => {
    if (!loadedAnimations.find(anim => anim.name === animation)) {
      const data = await import(`assets/animations/${animation}.json`);
      setLoadedAnimations([
        ...loadedAnimations,
        {
          name: animation,
          animationData: data,
          pause: getPause(animation),
          isAutoRest: autoRestAnimations.includes(animation),
        },
      ]);
    }
  };

  useEffect(() => {
    if (animation) {
      fetchJSON();
    }
  }, [animation]);

  useEffect(() => {
    setDragPosition(animationPositionStored);
  }, [animationPositionStored]);

  useDidUpdateEffect(() => {
    const { anim } = animationRef.current;
    if (animation) anim.play();
    else anim.stop();
  }, [animation]);

  const currentAnimation = loadedAnimations.find(
    anim => anim.name === animation,
  );

  const getCurrentAnimation = () => ({
    name: currentAnimation.name,
    animationData: currentAnimation.animationData,
  });

  const defaultOptions = {
    renderer: 'svg',
    autoloadSegments: false,
    loop: false,
    autoplay: false,
    ...(currentAnimation ? getCurrentAnimation() : {}),
  };

  const completeCallback = () => {
    setTimeout(() => {
      if (animationRef.current) {
        const { anim } = animationRef.current;
        if (!get(currentAnimation, 'isAutoRest', false)) {
          anim.setDirection(-1);
          anim.play();
        }
        anim.removeEventListener('complete', completeCallback);
      }
    }, get(currentAnimation, 'pause', 0));
  };

  return (
    <NarratorContainer canBeDragged={draggable}>
      <Draggable
        onStop={(_, { x, y }) => setOffset(x, y)}
        onDrag={(_, { x, y }) => setDragPosition({ x, y })}
        position={dragPosition}
        disabled={!draggable}
      >
        <div>
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
        </div>
      </Draggable>
    </NarratorContainer>
  );
};

QuestionNarrator.propTypes = {
  animation: PropTypes.string,
  draggable: PropTypes.bool,
  setOffset: PropTypes.func,
  animationPositionStored: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  animation: makeSelectPreviewAnimation(),
  draggable: makeSelectDraggable(),
  animationPositionStored: makeSelectAnimationPosition(),
});

const mapDispatchToProps = {
  setOffset: setAnimationStopPosition,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionNarrator);
