import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import { useIntl } from 'react-intl';

import { LanguageDirection } from 'global/types/locale';

import useFeedbackHelper from 'utils/animationsHelpers/useFeedbackHelper';
import usePauseHelper from 'utils/animationsHelpers/usePauseHelper';
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
import { CHARACTER_CONFIGS } from 'models/Character';

import AnimationPlayer from 'components/AnimationPlayer';

import { setCurrentBlockIndex } from 'containers/AnswerSessionPage/actions';

import { NarratorContainer } from './styled';
import messages from '../messages';

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

const CharacterAnim = ({
  blocks,
  questionId,
  settings,
  animationContainer,
  previewMode,
  changeIsAnimationOngoing,
  setFeedbackSettings,
  feedbackScreenSettings: { sliderRef },
  audioInstance,
  dynamicElementsDirection,
}) => {
  const { formatMessage } = useIntl();
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchUpdate = (newState) =>
    dispatch({
      type: UPDATE,
      newState,
    });

  const isRtl = dynamicElementsDirection === LanguageDirection.RTL;

  const globalDispatch = useDispatch();

  // actions
  const setCurrentBlockIndexAction = (index) =>
    globalDispatch(setCurrentBlockIndex(index));

  const changeBlock = async (prevIndex) => {
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
    settings.character,
  );

  const { handlePauseBlock, getInitialPauseAnimation, changePauseBlock } =
    usePauseHelper(
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
    isRtl,
  );
  const { animationPos, moveAnimation, fetchMoveAnimations } = useMoveHelper(
    animationContainer,
    blocks,
    dispatchUpdate,
    settings.character,
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
    await Promise.all([
      await fetchBodyAndHeadAnimations(),
      await fetchAudioAnimations(),
      await fetchMoveAnimations(),
    ]);
  };

  useAsync(
    fetchData,
    () => {
      setCurrentBlockIndexAction(-1);
      dispatchUpdate({
        currentData: getInitialData(),
        currentBlockIndex: 0,
      });
    },
    { deps: [questionId, previewMode], cleanUpFunction: stopSpeech },
  );

  useDidUpdateEffect(() => {
    if (state.currentData) {
      setCurrentBlockIndexAction(state.currentBlockIndex);

      switch (state.currentData.type) {
        case headAnimationType:
        case bodyAnimationType:
          if (!settings.animation) changeBlock();
          else handleBodyOrHeadAnimationBlock();
          break;

        case readQuestionBlockType:
        case speechType:
        case reflectionType:
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

  const displayNarrator = settings.animation && Boolean(blocks.length);

  const characterConfig = CHARACTER_CONFIGS[settings.character];

  return (
    <NarratorContainer>
      {displayNarrator && (
        <Draggable disabled position={animationPos}>
          <div>
            {/* AnimationPlayer must be wrapped with an additional div element
            because Draggable uses ref to control it's child under the hood
            which conflicts with animationRef passed to AnimationPlayer */}
            <AnimationPlayer
              ref={animationRef}
              options={defaultOptions}
              characterConfig={characterConfig}
              isClickToPauseDisabled
              isStopped={isStopped}
              ariaLabel={formatMessage(messages.narratorAlt)}
            />
          </div>
        </Draggable>
      )}
    </NarratorContainer>
  );
};

CharacterAnim.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string,
      endPosition: PropTypes.object,
      type: PropTypes.string,
    }),
  ),
  questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  settings: PropTypes.object,
  animationContainer: PropTypes.shape({
    clientWidth: PropTypes.number,
    clientHeight: PropTypes.number,
  }),
  previewMode: PropTypes.string,
  changeIsAnimationOngoing: PropTypes.func,
  setFeedbackSettings: PropTypes.func,
  feedbackScreenSettings: PropTypes.object,
  audioInstance: PropTypes.object,
  dynamicElementsDirection: PropTypes.string,
};

export default CharacterAnim;
