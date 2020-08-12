import React, { useState, useEffect, useReducer, useLayoutEffect } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import Draggable from 'react-draggable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  speechType,
  bodyAnimationType,
  headAnimationType,
} from 'models/Narrator/BlockTypes';
import useDidUpdateEffect from 'utils/useDidUpdateEffect';
import {
  setAnimationStopPosition,
  updatePreviewAnimation,
} from 'containers/Interventions/containers/EditInterventionPage/actions';
import useAnimationHelper from 'containers/AnswerInterventionPage/animationsHelpers/animationHelper';
import useAudioHelper from 'containers/AnswerInterventionPage/animationsHelpers/audioHelper';

import { NarratorContainer } from './styled';
import {
  makeSelectDraggable,
  makeSelectAnimationPosition,
  makeSelectPreviewData,
} from './selectors';

const lottieStyles = {
  margin: 'none',
};

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

const QuestionNarrator = ({
  questionId,
  draggable,
  setOffset,
  animationPositionStored,
  updateNarratorPreviewAnimation,
  previewData,
  animationBoundaries,
}) => {
  const [height, setHeight] = useState(0);
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
    handleSpeechBlock,
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
        handleBodyOrHeadAnimationBlock();
        break;

      case speechType:
        handleSpeechBlock();
        break;

      default:
        break;
    }
  };

  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const fetchJSON = async () => {
    await fetchBodyAndHeadAnimations();
    await fetchAudioAnimations();

    dispatchUpdate({
      currentData: getInitialData(),
      currentBlockIndex: 0,
    });
  };

  useEffect(() => {
    if (previewData.animation) {
      fetchJSON();

      return stopSpeech;
    }
  }, [previewData.animation]);

  useLayoutEffect(() => {
    const cur = animationBoundaries.current;
    if (cur) {
      const { clientHeight } = cur;
      setHeight(clientHeight);
    }
  });

  useDidUpdateEffect(() => {
    const { anim } = animationRef.current;
    anim.stop();
    updateNarratorPreviewAnimation('standStill');
  }, [questionId]);

  useDidUpdateEffect(() => {
    if (draggable) updateNarratorPreviewAnimation('standStill');
  }, [draggable]);

  useEffect(() => {
    setDragPosition(animationPositionStored);
  }, [animationPositionStored]);

  useDidUpdateEffect(() => {
    handlePreview();
  }, [state.currentData]);

  const decideIfLoopAnimation = () =>
    get(state, 'currentData.type', 'none') === speechType &&
    get(state, 'currentData.isLoop', false);

  const getAnimationOptions = () => {
    if (state.currentData && state.currentData.animationData) {
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

  const getPosition = () => {
    if (dragPosition) {
      return {
        x: dragPosition.x,
        y: Math.min(height - 100, dragPosition.y),
      };
    }
  };

  return (
    <NarratorContainer canBeDragged={draggable}>
      <Draggable
        onStop={(_, { x, y }) => setOffset(x, y)}
        onDrag={(_, { x, y }) => setDragPosition({ x, y })}
        position={getPosition()}
        disabled={!draggable}
        bounds="parent"
      >
        <div>
          <Lottie
            ref={animationRef}
            options={defaultOptions}
            height={100}
            width={100}
            style={lottieStyles}
            isClickToPauseDisabled
            isStopped={
              !!draggable ||
              previewData.animation === 'standStill' ||
              !decideIfPlaySpeechAnimation()
            }
          />
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
};

const mapStateToProps = createStructuredSelector({
  draggable: makeSelectDraggable(),
  animationPositionStored: makeSelectAnimationPosition(),
  previewData: makeSelectPreviewData(),
});

const mapDispatchToProps = {
  setOffset: setAnimationStopPosition,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionNarrator);
