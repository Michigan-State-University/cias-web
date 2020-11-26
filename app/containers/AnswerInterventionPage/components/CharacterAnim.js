import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import get from 'lodash/get';
import Lottie from 'react-lottie';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';
import useMoveHelper from 'utils/animationsHelpers/useMoveHelper';
import useAudioHelper from 'utils/animationsHelpers/useAudioHelper';
import useAnimationHelper from 'utils/animationsHelpers/useAnimationHelper';
import { useAsync } from 'utils/useAsync';
import {
  bodyAnimationType,
  speechType,
  headAnimationType,
  reflectionType,
  readQuestionBlockType,
  pauseType,
  feedbackBlockType,
  reflectionFormulaType,
} from 'models/Narrator/BlockTypes';

import Draggable from 'react-draggable';
import usePauseHelper from 'utils/animationsHelpers/usePauseHelper';
import { NarratorContainer } from './styled';
import useFeedbackHelper from '../animationsHelpers/feedbackHelper';

const UPDATE = 'UPDATE';

const reducer = (state, action) => {
  const { type, newState } = action;
  switch (type) {
    case UPDATE:
      return { ...state, ...newState };
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
  changeIsAnimationOngoing,
  setFeedbackSettings,
  feedbackScreenSettings: { sliderRef },
  audioInstance,
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
      const newPosition = calculatePosition(
        nextBlock.action,
        nextBlock.endPosition,
      );

      await moveAnimation({ ...nextBlock, endPosition: newPosition });
      switch (nextBlock.type) {
        case bodyAnimationType:
        case headAnimationType:
          changeAnimation(nextBlock, nextIndex);
          break;

        case speechType:
        case reflectionType:
        case readQuestionBlockType:
        case reflectionFormulaType:
          changeSpeech(nextBlock, nextIndex);
          break;

        case pauseType:
          changePauseBlock(nextBlock, nextIndex);
          break;

        case feedbackBlockType:
          changeFeedback(nextBlock, nextIndex);
          break;

        default:
          await changeBlock(nextIndex);
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
    loadedAnimations,
  } = useAnimationHelper(
    blocks,
    dispatchUpdate,
    changeBlock,
    state.currentData,
  );

  const {
    handlePauseBlock,
    getInitialPauseAnimation,
    changePauseBlock,
  } = usePauseHelper(
    blocks,
    state.currentData,
    dispatchUpdate,
    changeBlock,
    getIdleAnimation,
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
    audioInstance,
  );

  const {
    getInitialFeedbackData,
    changeFeedback,
    handleFeedbackBlock,
    calculatePosition,
  } = useFeedbackHelper(
    blocks,
    dispatchUpdate,
    changeBlock,
    state.currentData,
    setFeedbackSettings,
    sliderRef,
    animationRef.current,
    loadedAnimations,
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
        case readQuestionBlockType:
        case reflectionFormulaType:
          return getInitialSpeechAnimation();

        case headAnimationType:
        case bodyAnimationType:
          return getInitialBodyOrHeadAnimation();

        case pauseType:
          return getInitialPauseAnimation();

        case feedbackBlockType:
          return getInitialFeedbackData();

        default:
          break;
      }
    }
  };
  const fetchData = async () => {
    if (blocks[0]) {
      const newPosition = calculatePosition(
        blocks[0].action,
        blocks[0].endPosition,
      );

      await moveAnimation({ ...blocks[0], endPosition: newPosition });
    }
    await fetchBodyAndHeadAnimations();
    await fetchAudioAnimations();
    await fetchMoveAnimations();
  };

  useAsync(
    fetchData,
    () =>
      dispatchUpdate({
        currentData: getInitialData(),
        currentBlockIndex: 0,
      }),
    { useDeps: [questionId, previewMode], cleanUpFunction: stopSpeech },
  );

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
        case readQuestionBlockType:
        case reflectionFormulaType:
          if (!settings.voice) changeBlock();
          else handleAudioBlock();
          break;

        case pauseType:
          handlePauseBlock();
          break;

        case feedbackBlockType:
          handleFeedbackBlock();
          break;

        default:
          break;
      }
  }, [state.currentData, state.currentBlockIndex]);

  useEffect(() => {
    changeIsAnimationOngoing(blocks.length !== 0);
  }, [questionId]);

  useEffect(() => {
    if (state.currentBlockIndex === blocks.length) {
      changeIsAnimationOngoing(false);
    }
  }, [state.currentBlockIndex, blocks.length]);

  const decideIfLoopAnimation = () =>
    (get(state, 'currentData.type', 'none') === speechType ||
      get(state, 'currentData.type', 'none') === reflectionType ||
      get(state, 'currentData.type', 'none') === readQuestionBlockType ||
      get(state, 'currentData.type', 'none') === reflectionFormulaType) &&
    get(state, 'currentData.isLoop', false);

  const getAnimationOptions = () => {
    if (
      settings.animation &&
      state.currentData &&
      state.currentData.animationData
    ) {
      const isSpeechType =
        state.currentData.type === speechType ||
        state.currentData.type === reflectionType ||
        state.currentData.type === readQuestionBlockType ||
        state.currentData.type === reflectionFormulaType;

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
  changeIsAnimationOngoing: PropTypes.func,
  setFeedbackSettings: PropTypes.func,
  feedbackScreenSettings: PropTypes.object,
  audioInstance: PropTypes.object,
};

export default CharacterAnim;
