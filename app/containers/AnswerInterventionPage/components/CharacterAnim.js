import React, { useEffect, useRef, useReducer } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import Lottie from 'react-lottie';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';
import getPause from 'utils/animations/getPause';
import { autoRestAnimations } from 'utils/animations/animationsNames';

import { NarratorContainer } from './styled';

const UPDATE = 'UPDATE';

const reducer = (state, action) => {
  const { type, newState } = action;
  switch (type) {
    case UPDATE:
      return newState;
    default:
      return state;
  }
};

const initialState = {
  currentAnimation: null,
  currentBlockIndex: 0,
};

const lottieStyles = {
  margin: 'none',
};

const CharacterAnim = ({ blocks, quesitonId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const animationRef = useRef(null);
  const loadedAnimations = useRef([]);

  const loadAnimations = async () => {
    const allAnimationsData = [];
    const uniqAnimations = uniqBy(blocks, 'animation');
    await Promise.all(
      uniqAnimations.map(async ({ animation }) => {
        const data = await import(`assets/animations/${animation}.json`);
        allAnimationsData.push({
          name: animation,
          animationData: data,
          pause: getPause(animation),
          isAutoRest: autoRestAnimations.includes(animation),
        });
      }),
    );
    return allAnimationsData;
  };

  useEffect(() => {
    const fetch = async () => {
      const allAnimationsData = await loadAnimations();
      loadedAnimations.current = allAnimationsData;
      dispatch({
        type: UPDATE,
        newState: {
          currentAnimation: allAnimationsData[0],
          currentBlockIndex: 0,
        },
      });
    };
    fetch();
  }, [quesitonId]);

  const changeAnimation = () => {
    const nextIndex = state.currentBlockIndex + 1;
    const nextBlock = blocks[nextIndex];
    const nextAnim = loadedAnimations.current.find(
      anim => anim.name === (nextBlock ? nextBlock.animation : undefined),
    );
    dispatch({
      type: UPDATE,
      newState: {
        currentAnimation: nextAnim,
        currentBlockIndex: nextIndex,
      },
    });

    if (animationRef.current) {
      const { anim } = animationRef.current;
      anim.removeEventListener('complete', changeAnimation);
    }
  };

  const reverseAnimation = () => {
    setTimeout(() => {
      if (animationRef.current) {
        const { anim } = animationRef.current;
        if (!get(state.currentAnimation, 'isAutoRest', false)) {
          anim.setDirection(-1);
          anim.play();
          anim.removeEventListener('complete', reverseAnimation);
          anim.addEventListener('complete', changeAnimation);
        } else {
          anim.removeEventListener('complete', reverseAnimation);
          changeAnimation();
        }
      }
    }, get(state.currentAnimation, 'pause', 0));
  };

  useDidUpdateEffect(() => {
    const { anim } = animationRef.current;
    if (state.currentAnimation) {
      anim.addEventListener('complete', reverseAnimation);
      anim.play();
    } else anim.stop();
  }, [state.currentAnimation, state.currentBlockIndex]);

  const defaultOptions = {
    renderer: 'svg',
    autoloadSegments: false,
    loop: false,
    autoplay: false,
    ...(state.currentAnimation
      ? {
          name: state.currentAnimation.name,
          animationData: state.currentAnimation.animationData,
        }
      : {}),
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
        // eslint-disable-next-line no-extra-boolean-cast
        isStopped={!Boolean(state.currentAnimation)}
      />
    </NarratorContainer>
  );
};

CharacterAnim.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({ type: PropTypes.string, animation: PropTypes.string }),
  ),
  quesitonId: PropTypes.string,
};

export default CharacterAnim;
