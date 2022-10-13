import React, { useReducer } from 'react';
import Draggable from 'react-draggable';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useIntl } from 'react-intl';

import { useAsync } from 'utils/useAsync';
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
import { makeSelectInterventionStatus } from 'global/reducers/intervention';
import { canEdit } from 'models/Status/statusPermissions';
import { CHARACTER_CONFIGS } from 'models/Character';

import { elements } from 'theme';
import messages from 'containers/AnswerSessionPage/messages';
import { NarratorContainer, CharacterActiveIndicator } from './styled';
import { saveNarratorMovement } from '../QuestionSettings/Settings/actions';
import { reducer, initialState, UPDATE } from './reducer';

const QuestionNarrator = ({
  questionId,
  setOffset,
  animationPositionStored,
  updateNarratorPreviewAnimation,
  previewData,
  animationBoundaries,
  settings,
  savePosition,
  currentBlockIndex,
  audioInstance,
  interventionStatus,
}) => {
  const { formatMessage } = useIntl();
  const { width, height } = useResizeObserver({
    targetRef: animationBoundaries,
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchUpdate = (newState) =>
    dispatch({
      type: UPDATE,
      newState,
    });

  const draggable = useSelector(makeSelectDraggable());

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
    settings.character,
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
  };

  useAsync(
    fetchJSON,
    () =>
      dispatchUpdate({
        currentData: getInitialData(),
        currentBlockIndex: 0,
      }),
    {
      deps: [previewData.animation, settings.character],
      conditions: [previewData.animation, settings.character],
      cleanUpFunction: stopSpeech,
    },
  );

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

  const characterConfig = CHARACTER_CONFIGS[settings.character];
  const { height: characterHeight, width: characterWidth } =
    characterConfig.size;

  const handleSaveOffset = (x, y) => {
    const containerWidthWithBorders = width + 2;
    const scaleX = Math.max(
      1,
      elements.draggableContainerSize / containerWidthWithBorders,
    );
    if (scaleX > 1) {
      const isCharacterOnTheRightHandSide = x > 0.5 * containerWidthWithBorders;
      const characterSizeOffset = isCharacterOnTheRightHandSide
        ? characterWidth * scaleX - characterWidth
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
      height !== 0 ? height - characterHeight : Number.POSITIVE_INFINITY,
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
      ? characterWidth - characterWidth * scaleX
      : 0;
    return {
      x: Math.min(
        Math.floor(animationPositionStored.x * scaleX - characterSizeOffset),
        elements.draggableContainerSize - characterWidth,
      ),
      y: posY,
    };
  };

  const editingPossible = draggable && canEdit(interventionStatus);

  return (
    <NarratorContainer canBeDragged={editingPossible} width={characterWidth}>
      {settings.animation && (
        <Draggable
          onStop={(_, { x, y }) => handleSaveOffset(x, y)}
          position={getPosition()}
          disabled={!editingPossible}
          bounds="parent"
          handle="#lottie"
        >
          <CharacterActiveIndicator
            $active={editingPossible}
            $characterConfig={characterConfig}
          >
            <div id="lottie">
              <Lottie
                ref={animationRef}
                options={defaultOptions}
                height={characterHeight}
                width={characterWidth}
                style={characterConfig.lottieStyles}
                isClickToPauseDisabled
                isStopped={
                  previewData.animation === 'standStill' ||
                  !decideIfPlaySpeechAnimation()
                }
                ariaLabel={formatMessage(messages.narratorAlt)}
              />
            </div>
          </CharacterActiveIndicator>
        </Draggable>
      )}
    </NarratorContainer>
  );
};

QuestionNarrator.propTypes = {
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
  interventionStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  animationPositionStored: makeSelectAnimationPosition(),
  previewData: makeSelectPreviewData(),
  currentBlockIndex: makeSelectCurrentNarratorBlockIndex(),
  audioInstance: makeSelectAudioInstance(),
  interventionStatus: makeSelectInterventionStatus(),
});

const mapDispatchToProps = {
  setOffset: setAnimationStopPosition,
  updateNarratorPreviewAnimation: updatePreviewAnimation,
  savePosition: saveNarratorMovement,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(QuestionNarrator);
