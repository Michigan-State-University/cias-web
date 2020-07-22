import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import get from 'lodash/get';
import Lottie from 'react-lottie';

import {
  bodyAnimationType,
  speechType,
  headAnimationType,
} from 'models/Narrator/BlockTypes';
import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import Draggable from 'react-draggable';
import { NarratorContainer } from './styled';
import useMoveHelper from '../animationsHelpers/useMoveHelperHook';
import useAudioHelper from '../animationsHelpers/audioHelper';
import useAnimationHelper from '../animationsHelpers/animationHelper';

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
  currentData: null,
  currentBlockIndex: 0,
};

const lottieStyles = {
  margin: 'none',
};

const CharacterAnim = ({
  blocks,
  questionId,
  settings,
  animationContainer,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchUpdate = newState =>
    dispatch({
      type: UPDATE,
      newState,
    });

  const changeBlock = async prevIndex => {
    clearAnimationBlock();

    cleanAudio();
    const nextIndex =
      (isNumber(prevIndex) ? prevIndex : state.currentBlockIndex) + 1;
    const nextBlock = blocks[nextIndex];
    if (nextBlock) {
      await moveAnimation(nextBlock);
      switch (nextBlock.type) {
        case bodyAnimationType:
        case headAnimationType:
          changeAnimation(nextBlock, nextIndex);
          break;
        case speechType:
          changeSpeech(nextBlock, nextIndex);
          break;
        default:
          break;
      }
    } else {
      const nextAnim = getIdleAnimation();
      dispatchUpdate({
        currentData: nextAnim,
        currentBlockIndex: nextIndex,
      });
    }
  };

  const {
    getInitialBodyOrHeadAnimation,
    changeAnimation,
    handleBodyOrHeadAnimationBlock,
    getIdleAnimation,
    clearAnimationBlock,
    animationRef,
    fetchBodyAndHeadAnimations,
  } = useAnimationHelper(
    blocks,
    dispatchUpdate,
    changeBlock,
    state.currentData,
  );

  const {
    changeSpeech,
    getInitialSpeechAnimation,
    cleanAudio,
    handleSpeechBlock,
    decideIfPlaySpeechAnimation,
    fetchAudioAnimations,
    stopSpeech,
  } = useAudioHelper(
    blocks,
    dispatchUpdate,
    state.currentData,
    state.currentBlockIndex,
    animationRef.current,
    changeBlock,
  );

  const { animationPos, moveAnimation, fetchMoveAnimations } = useMoveHelper(
    animationContainer,
    blocks,
    dispatchUpdate,
  );

  const getInitialData = () => {
    if (blocks.length) {
      switch (blocks[0].type) {
        case speechType:
          return getInitialSpeechAnimation();

        case headAnimationType:
        case bodyAnimationType:
          return getInitialBodyOrHeadAnimation();

        default:
          break;
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await moveAnimation(blocks[0]);
      await fetchBodyAndHeadAnimations();
      await fetchAudioAnimations();
      await fetchMoveAnimations();
      dispatchUpdate({
        currentData: getInitialData(),
        currentBlockIndex: 0,
      });
    };
    fetch();
    return stopSpeech;
  }, [questionId]);

  useDidUpdateEffect(() => {
    if (state.currentData)
      switch (state.currentData.type) {
        case headAnimationType:
        case bodyAnimationType:
          if (!settings.animation) changeBlock();
          else handleBodyOrHeadAnimationBlock();
          break;

        case speechType:
          if (!settings.voice) changeBlock();
          else handleSpeechBlock();
          break;

        default:
          break;
      }
  }, [state.currentData, state.currentBlockIndex]);

  const decideIfLoopAnimation = () =>
    get(state, 'currentData.type', 'none') === speechType &&
    get(state, 'currentData.isLoop', false);

  const getAnimationOptions = () => {
    if (
      settings.animation &&
      state.currentData &&
      state.currentData.animationData
    ) {
      const isSpeechType = state.currentData.type === 'Speech';

      return {
        name: state.currentData.name,
        animationData: isSpeechType
          ? state.currentData.animationData[state.currentData.currentAnimation]
          : state.currentData.animationData,
      };
    }
    return {};
  };

  const defaultOptions = {
    renderer: 'svg',
    autoloadSegments: false,
    loop: decideIfLoopAnimation(),
    autoplay: false,
    ...getAnimationOptions(),
  };

  return (
    <NarratorContainer>
      <Draggable disabled position={animationPos}>
        <Lottie
          ref={animationRef}
          options={defaultOptions}
          height={100}
          width={100}
          style={lottieStyles}
          isClickToPauseDisabled
          isStopped={
            !state.currentData ||
            !state.currentData.animationData ||
            !decideIfPlaySpeechAnimation()
          }
        />
      </Draggable>
    </NarratorContainer>
  );
};

CharacterAnim.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ type: PropTypes.string, animation: PropTypes.string }),
      PropTypes.shape({
        type: PropTypes.string,
        text: PropTypes.string,
        audio_url: PropTypes.string,
      }),
    ]),
  ),
  questionId: PropTypes.string,
  settings: PropTypes.object,
  animationContainer: PropTypes.shape({ current: PropTypes.any }),
};

export default CharacterAnim;
