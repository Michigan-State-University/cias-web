import React, { useRef, useState, useEffect, useReducer } from 'react';
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
import getPause from 'utils/animations/getPause';
import { autoRestAnimations } from 'utils/animations/animationsNames';
import {
  setAnimationStopPosition,
  updatePreviewAnimation,
} from 'containers/Interventions/containers/EditInterventionPage/actions';
import useAnimationHelper from 'containers/AnswerInterventionPage/animationsHelpers/animationHelper';
import useAudioHelper from 'containers/AnswerInterventionPage/animationsHelpers/audioHelper';

import { NarratorContainer } from './styled';
import {
  makeSelectPreviewAnimation,
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
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchUpdate = newState =>
    dispatch({
      type: UPDATE,
      newState,
    });

  const changeBlock = () => {};

  const {
    getInitialBodyOrHeadAnimation,
    changeAnimation,
    handleBodyOrHeadAnimationBlock,
    getIdleAnimation,
    clearAnimationBlock,
    animationRef,
    fetchBodyAndHeadAnimations,
  } = useAnimationHelper(
    [previewData],
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
    [previewData],
    dispatchUpdate,
    state.currentData,
    state.currentBlockIndex,
    animationRef.current,
    changeBlock,
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
    loop: false,
    autoplay: false,
    ...getAnimationOptions(),
  };

  return (
    <NarratorContainer canBeDragged={draggable}>
      <Draggable
        onStop={(_, { x, y }) => setOffset(x, y)}
        onDrag={(_, { x, y }) => setDragPosition({ x, y })}
        position={dragPosition}
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
            isStopped={!!draggable || previewData.animation === 'standStill'}
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
