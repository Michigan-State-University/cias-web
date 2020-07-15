import React, { useEffect, useRef, useReducer } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import Lottie from 'react-lottie';

import { bodyAnimationType, speechType } from 'models/Narrator/BlockTypes';
import AudioWrapper from 'utils/audioWrapper';
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
  currentData: null,
  currentBlockIndex: 0,
};

const lottieStyles = {
  margin: 'none',
};

const CharacterAnim = ({ blocks, quesitonId, settings }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const audio = useRef(new AudioWrapper());

  const animationRef = useRef(null);
  const loadedAnimations = useRef([]);

  const loadAnimations = async () => {
    const allAnimationsData = [];
    const uniqAnimations = uniqBy(
      blocks.filter(block => block.animation),
      'animation',
    );
    await Promise.all(
      uniqAnimations.map(async ({ animation, type }) => {
        const data = await import(`assets/animations/${animation}.json`);
        allAnimationsData.push({
          type,
          name: animation,
          animationData: data,
          pause: getPause(animation),
          isAutoRest: autoRestAnimations.includes(animation),
        });
      }),
    );
    return allAnimationsData;
  };

  const getInitialData = () => {
    if (blocks.length) {
      switch (blocks[0].type) {
        case speechType:
          return blocks[0];
        default:
          break;
      }
    }

    return loadedAnimations.current[0];
  };

  useEffect(() => {
    stopSpeech();

    const fetch = async () => {
      const allAnimationsData = await loadAnimations();
      loadedAnimations.current = allAnimationsData;
      dispatch({
        type: UPDATE,
        newState: {
          currentData: getInitialData(),
          currentBlockIndex: 0,
        },
      });
    };
    fetch();
  }, [quesitonId]);

  const changeBlock = () => {
    if (animationRef.current) {
      const { anim } = animationRef.current;
      anim.removeEventListener('complete', changeBlock);
    }

    audio.current.clean();

    const nextIndex = state.currentBlockIndex + 1;
    const nextBlock = blocks[nextIndex];

    if (nextBlock) {
      switch (nextBlock.type) {
        case bodyAnimationType:
          changeAnimation(nextBlock, nextIndex);
          break;
        case speechType:
          changeSpeech(nextBlock, nextIndex);
          break;
        default:
          break;
      }
    }
  };

  const changeAnimation = (nextBlock, nextIndex) => {
    const nextAnim = loadedAnimations.current.find(
      anim => anim.name === (nextBlock ? nextBlock.animation : undefined),
    );
    dispatch({
      type: UPDATE,
      newState: {
        currentData: nextAnim,
        currentBlockIndex: nextIndex,
      },
    });
  };

  const changeSpeech = (nextBlock, nextIndex) => {
    dispatch({
      type: UPDATE,
      newState: {
        currentData: nextBlock,
        currentBlockIndex: nextIndex,
      },
    });
  };

  const reverseAnimation = () => {
    setTimeout(() => {
      if (animationRef.current) {
        const { anim } = animationRef.current;
        if (!get(state.currentData, 'isAutoRest', false)) {
          anim.setDirection(-1);
          anim.play();
          anim.removeEventListener('complete', reverseAnimation);
          anim.addEventListener('complete', changeBlock);
        } else {
          anim.removeEventListener('complete', reverseAnimation);
          changeBlock();
        }
      }
    }, get(state.currentData, 'pause', 0));
  };

  const handleBodyAnimationBlock = () => {
    const { anim } = animationRef.current;
    if (state.currentData) {
      anim.addEventListener('complete', reverseAnimation);
      anim.play();
    } else anim.stop();
  };

  const handleSpeechBlock = () => {
    audio.current.onLoaded(onSpeechReady);
    audio.current.onEnded(onSpeechEnded);
    audio.current.onError(onSpeechEnded);

    audio.current.setSrc(state.currentData.audio_url);
  };

  const onSpeechReady = () => audio.current.play();

  const onSpeechEnded = () => changeBlock();

  const stopSpeech = () => {
    audio.current.clean();
    audio.current.stop();
  };

  useDidUpdateEffect(() => {
    if (state.currentData)
      switch (state.currentData.type) {
        case bodyAnimationType:
          if (!settings.animation) changeBlock();
          else handleBodyAnimationBlock();

          break;

        case speechType:
          if (!settings.voice) changeBlock();
          else handleSpeechBlock();

          break;

        default:
          break;
      }
  }, [state.currentData, state.currentBlockIndex]);

  const defaultOptions = {
    renderer: 'svg',
    autoloadSegments: false,
    loop: false,
    autoplay: false,
    ...(settings.animation &&
    state.currentData &&
    state.currentData.animationData
      ? {
          name: state.currentData.name,
          animationData: state.currentData.animationData,
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
        isStopped={!state.currentData || !state.currentData.animationData}
      />
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
  quesitonId: PropTypes.string,
  settings: PropTypes.object,
};

export default CharacterAnim;
