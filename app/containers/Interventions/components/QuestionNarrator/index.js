import React, { useReducer } from 'react';
import Draggable from 'react-draggable';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import useAnimationHelper from 'utils/animationsHelpers/useAnimationHelper';
import useAudioHelper from 'utils/animationsHelpers/useAudioHelper';
import useDidUpdateEffect from 'utils/useDidUpdateEffect';
import useResizeObserver from 'utils/useResizeObserver';
import {
  setAnimationStopPosition,
  updatePreviewAnimation,
  makeSelectCurrentNarratorBlockIndex,
  makeSelectDraggable,
  makeSelectAnimationPosition,
  makeSelectPreviewData,
} from 'global/reducers/localState';
import {
  speechType,
  bodyAnimationType,
  headAnimationType,
} from 'models/Narrator/BlockTypes';
import { makeSelectAudioInstance } from 'global/reducers/globalState';

import { elements } from 'theme';
import { NarratorContainer, lottieStyles } from './styled';
import { saveNarratorMovement } from '../QuestionSettings/Settings/actions';
import { CHARACTER_SIZE } from './utils';
import { reducer, initialState, UPDATE } from './reducer';

const QuestionNarrator = ({
  questionId,
  draggable,
  setOffset,
  animationPositionStored,
  updateNarratorPreviewAnimation,
  previewData,
  animationBoundaries,
  settings,
  savePosition,
  currentBlockIndex,
  audioInstance,
}) => {
  const { width, height } = useResizeObserver({
    targetRef: animationBoundaries,
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchUpdate = newState =>
    dispatch({
      type: UPDATE,
      newState,
    });

  const onBlockFinish = () => {
    clearAnimationBlock();
    cleanAudio();

    dispatchUpdate({
      currentData: getIdleAnimation(),
      currentBlockIndex: 0,
    });

    if (previewData.animation !== 'standStill')
      updateNarratorPreviewAnimation('standStill');
  };

  const {
    getInitialBodyOrHeadAnimation,
    handleBodyOrHeadAnimationBlock,
    clearAnimationBlock,
    animationRef,
    fetchBodyAndHeadAnimations,
    getIdleAnimation,
  } = useAnimationHelper(
    [previewData],
    dispatchUpdate,
    onBlockFinish,
    state.currentData,
  );

  const {
    getInitialSpeechAnimation,
    cleanAudio,
    handleAudioBlock,
    decideIfPlaySpeechAnimation,
    fetchAudioAnimations,
    stopSpeech,
  } = useAudioHelper(
    [previewData],
    dispatchUpdate,
    state.currentData,
    state.currentBlockIndex,
    animationRef.current,
    onBlockFinish,
    {},
    settings,
    audioInstance,
  );

  const getInitialData = () => {
    if (previewData) {
      switch (previewData.type) {
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

  const handlePreview = () => {
    switch (previewData.type) {
      case headAnimationType:
      case bodyAnimationType:
        if (settings.animation) handleBodyOrHeadAnimationBlock();
        break;

      case speechType:
        handleAudioBlock();
        break;

      default:
        break;
    }
  };

  const fetchJSON = async () => {
    await fetchBodyAndHeadAnimations();
    await fetchAudioAnimations();

    dispatchUpdate({
      currentData: getInitialData(),
      currentBlockIndex: 0,
    });
  };

  useDidUpdateEffect(() => {
    if (previewData.animation) {
      fetchJSON();

      return stopSpeech;
    }
  }, [previewData.animation]);

  useDidUpdateEffect(() => {
    if (settings.animation) {
      const { anim } = animationRef.current;
      anim.stop();
    }
    updateNarratorPreviewAnimation('standStill');
  }, [questionId]);

  useDidUpdateEffect(() => {
    if (draggable) updateNarratorPreviewAnimation('standStill');
  }, [draggable]);

  useDidUpdateEffect(() => {
    handlePreview();
  }, [state.currentData]);

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

  const handleSaveOffset = (x, y) => {
    const containerWidthWithBorders = width + 2;
    const scaleX = Math.max(
      1,
      elements.draggableContainerSize / containerWidthWithBorders,
    );
    if (scaleX > 1) {
      const isCharacterOnTheRightHandSide = x > 0.5 * containerWidthWithBorders;
      const characterSizeOffset = isCharacterOnTheRightHandSide
        ? CHARACTER_SIZE.width * scaleX - CHARACTER_SIZE.width
        : 0;
      const posX = Math.ceil(x * scaleX + characterSizeOffset);
      savePosition(currentBlockIndex, questionId, { x: posX, y });
      setOffset(posX, y);
    } else {
      savePosition(currentBlockIndex, questionId, { x, y });
      setOffset(x, y);
    }
  };

  const getPosition = () => {
    const posY = Math.min(
      height !== 0 ? height - 100 : Number.POSITIVE_INFINITY,
      animationPositionStored.y,
    );
    const containerWidthWithBorders = width + 2;
    const scaleX = Math.min(
      1,
      containerWidthWithBorders / elements.draggableContainerSize,
    );

    if (scaleX >= 1) {
      return {
        x: animationPositionStored.x,
        y: posY,
      };
    }

    const isCharacterOnTheRightHandSide =
      animationPositionStored.x > 0.5 * elements.draggableContainerSize;
    const characterSizeOffset = isCharacterOnTheRightHandSide
      ? CHARACTER_SIZE.width - CHARACTER_SIZE.width * scaleX
      : 0;
    return {
      x: Math.min(
        Math.floor(animationPositionStored.x * scaleX - characterSizeOffset),
        elements.draggableContainerSize - CHARACTER_SIZE.width,
      ),
      y: posY,
    };
  };

  return (
    <NarratorContainer canBeDragged={draggable} width={CHARACTER_SIZE.width}>
      <Draggable
        onStop={(_, { x, y }) => handleSaveOffset(x, y)}
        position={getPosition()}
        disabled={!draggable}
        bounds="parent"
      >
        <div>
          {settings.animation && (
            <Lottie
              ref={animationRef}
              options={defaultOptions}
              height={CHARACTER_SIZE.height}
              width={CHARACTER_SIZE.width}
              style={lottieStyles}
              isClickToPauseDisabled
              isStopped={
                previewData.animation === 'standStill' ||
                !decideIfPlaySpeechAnimation()
              }
            />
          )}
        </div>
      </Draggable>
    </NarratorContainer>
  );
};

QuestionNarrator.propTypes = {
  draggable: PropTypes.bool,
  setOffset: PropTypes.func,
  animationPositionStored: PropTypes.object,
  questionId: PropTypes.string,
  updateNarratorPreviewAnimation: PropTypes.func,
  previewData: PropTypes.object,
  animationBoundaries: PropTypes.any,
  settings: PropTypes.object,
  savePosition: PropTypes.func,
  currentBlockIndex: PropTypes.number,
  audioInstance: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  draggable: makeSelectDraggable(),
  animationPositionStored: makeSelectAnimationPosition(),
  previewData: makeSelectPreviewData(),
  currentBlockIndex: makeSelectCurrentNarratorBlockIndex(),
  audioInstance: makeSelectAudioInstance(),
});

const mapDispatchToProps = {
  setOffset: setAnimationStopPosition,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
  savePosition: saveNarratorMovement,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionNarrator);
