import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import get from 'lodash/get';
import Lottie from 'react-lottie';

import {
  bodyAnimationType,
  speechType,
  headAnimationType,
  reflectionType,
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
  previewMode,
  answers,
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
        case reflectionType:
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
    handleAudioBlock,
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
    answers,
    settings,
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
        case reflectionType:
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
  }, [questionId, previewMode]);

  useDidUpdateEffect(() => {
    if (state.currentData)
      switch (state.currentData.type) {
        case headAnimationType:
        case bodyAnimationType:
          if (!settings.animation) changeBlock();
          else handleBodyOrHeadAnimationBlock();
          break;

        case speechType:
        case reflectionType:
          if (!settings.voice) changeBlock();
          else handleAudioBlock();
          break;

        default:
          break;
      }
  }, [state.currentData, state.currentBlockIndex]);

  const decideIfLoopAnimation = () =>
    (get(state, 'currentData.type', 'none') === speechType ||
      get(state, 'currentData.type', 'none') === reflectionType) &&
    get(state, 'currentData.isLoop', false);

  const getAnimationOptions = () => {
    if (
      settings.animation &&
      state.currentData &&
      state.currentData.animationData
    ) {
      const isSpeechType =
        state.currentData.type === speechType ||
        state.currentData.type === reflectionType;

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

  const isStopped =
    !state.currentData ||
    !state.currentData.animationData ||
    !decideIfPlaySpeechAnimation();

  return (
    <NarratorContainer>
      {settings.animation && (
        <Draggable disabled position={animationPos}>
          <Lottie
            ref={animationRef}
            options={defaultOptions}
            height={100}
            width={100}
            style={lottieStyles}
            isClickToPauseDisabled
            isStopped={isStopped}
          />
        </Draggable>
      )}
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
  animationContainer: PropTypes.shape({
    clientWidth: PropTypes.number,
    clientHeight: PropTypes.number,
  }),
  previewMode: PropTypes.string,
  answers: PropTypes.object,
};

export default CharacterAnim;
