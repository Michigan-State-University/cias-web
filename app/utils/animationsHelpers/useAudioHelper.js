/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { useRef } from 'react';
import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import toPairs from 'lodash/toPairs';
import * as Sentry from '@sentry/browser';

import {
  readQuestionBlockType,
  reflectionFormulaType,
  reflectionType,
  speechType,
} from 'models/Narrator/BlockTypes';
import { speechAnimations } from 'utils/animations/animationsNames';

const animationTimeout = 200;

const useAudioHelper = (
  blocks,
  dispatchUpdate,
  currentData,
  currentIndex,
  animationCurrent,
  changeBlock,
  answers,
  settings,
  audioInstance,
) => {
  const loadedSpeechAnimations = useRef([]);

  const fetchAudioAnimations = async () => {
    loadedSpeechAnimations.current = await loadSpeechAnimations();
  };

  const loadSpeechAnimations = async () => {
    const speechBlocks = filter(
      blocks,
      ({ type }) =>
        type === speechType ||
        type === reflectionType ||
        type === readQuestionBlockType ||
        type === reflectionFormulaType,
    );

    const uniqAnimations = uniqBy(
      speechBlocks.filter((block) => block.animation),
      'animation',
    );

    const animations = [];
    if (settings.animation && blocks.length) {
      await Promise.all(
        uniqAnimations.map(async ({ animation }) => {
          const animationNames = toPairs(
            speechAnimations[animation].animations,
          );
          const animationsData = {};

          for (const [key, value] of animationNames) {
            if (key === 'end' && speechAnimations[animation].isEndReversed)
              animationsData.end = animationsData.start;
            else
              animationsData[key] = await import(
                `assets/animations/${value}.json`
              );
          }

          animations.push({
            name: animation,
            animationData: animationsData,
            isEndReversed: speechAnimations[animation].isEndReversed,
          });
        }),
      );
    }

    return animations;
  };

  const changeSpeech = (nextBlock, nextIndex) => {
    const speechData = getSpeechData(nextIndex);

    if (speechData)
      dispatchUpdate({
        currentData: getSpeechData(nextIndex),
        currentBlockIndex: nextIndex,
      });
  };

  const getReflectionData = (block) => {
    const { target_value: targetValue } = block;

    let reflections = [];

    if (Array.isArray(targetValue)) reflections = targetValue;
    else if (targetValue instanceof Object) reflections.push(targetValue);

    return {
      audio_urls: [],
      reflections,
      sha256: [],
    };
  };

  const getSpeechData = (index) => {
    const block = blocks[index ?? 0];

    const speechData = loadedSpeechAnimations.current.find(
      (anim) => anim.name === (block ? block.animation : undefined),
    );
    const initialAnimation =
      speechData && speechData.animationData.start ? 'start' : 'speech';

    switch (block.type) {
      case speechType:
      case readQuestionBlockType:
        return {
          ...block,
          ...speechData,
          currentAnimation: initialAnimation,
          isLoop: initialAnimation !== 'start',
          currentAudioIndex: 0,
        };

      case reflectionFormulaType:
      case reflectionType:
        return {
          ...block,
          ...speechData,
          ...getReflectionData(block),
          initialAnimation,
          currentAnimation: initialAnimation,
          isLoop: initialAnimation !== 'start',
          currentAudioIndex: 0,
          currentReflectionIndex: 0,
        };

      default:
        return undefined;
    }
  };

  const cleanAudio = () => audioInstance.clean();

  const handleAudioBlock = () => {
    if (currentData.currentAnimation === 'start') {
      const { anim } = animationCurrent;

      anim.addEventListener('complete', updateAnimation);
      playAnimation();
    } else if (currentData.currentAnimation === 'speech') {
      switch (currentData.type) {
        case speechType:
        case readQuestionBlockType:
          handleSpeech(currentData.audio_urls);
          break;

        case reflectionFormulaType:
        case reflectionType:
          handleSpeech(
            currentData.reflections.length
              ? currentData.reflections[currentData.currentReflectionIndex]
                  .audio_urls
              : [],
          );
          break;

        default:
          break;
      }
    } else if (currentData.currentAnimation === 'end') {
      const { anim } = animationCurrent;

      anim.addEventListener('complete', nextBlock);
      playAnimation();
    }
  };

  const getInvalidText = ({
    text,
    currentAudioIndex,
    type,
    currentReflectionIndex,
    reflections,
  }) => {
    switch (type) {
      case speechType:
      case readQuestionBlockType:
        return text[currentAudioIndex];

      case reflectionFormulaType:
      case reflectionType:
        return reflections[currentReflectionIndex].text[currentAudioIndex];
      default:
        return type;
    }
  };

  const handleAudioError = () => {
    const text = getInvalidText(currentData);
    Sentry.captureMessage(`Issue with audio with text: ${text}`, 'error');
  };

  const handleSpeech = (audioUrls) => {
    audioInstance.onPlay(playAnimation);
    audioInstance.onLoaded(onSpeechReady);
    audioInstance.onEnded(() => onSpeechEnded(audioUrls));
    audioInstance.onError(() => {
      handleAudioError();
      onSpeechEnded(audioUrls);
    });

    if (!audioUrls.length || !audioUrls[currentData.currentAudioIndex])
      onSpeechEnded(audioUrls);
    else
      audioInstance.setSrc(
        `https://api-msu.cias.app/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsxTlRFeU1USmhOaTFpWTJKaExUUmhZMlF0WWpBM1pTMDFPV0U0WldJM05EUmtNMllHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--50b2233dc23b023a9c9512ebc1bdacc0bc17709a/c15890010641727f33d0f7339a0b2f8a8a8f9d81aeeb84ef65e477756415909a.mp3`,
      );
  };

  const nextBlock = () => {
    const { anim } = animationCurrent;
    anim.removeEventListener('complete', nextBlock);

    setTimeout(speechEndUpdate, animationTimeout);
  };

  const updateAnimation = () => {
    const { anim } = animationCurrent;
    anim.removeEventListener('complete', updateAnimation);

    const { currentAnimation } = currentData;
    let nextAnimation = '';

    if (currentAnimation === 'start') nextAnimation = 'speech';
    else if (currentAnimation === 'speech') nextAnimation = 'end';

    dispatchUpdate({
      currentData: {
        ...currentData,
        currentAnimation: nextAnimation,
        isLoop: nextAnimation === 'speech',
      },
      currentBlockIndex: currentIndex,
    });
  };

  const playAnimation = () => {
    if (settings.animation) {
      const { anim } = animationCurrent;

      if (currentData.currentAnimation === 'end' && currentData.isEndReversed) {
        anim.goToAndStop(anim.totalFrames - 1, true);
        anim.setDirection(-1);
      }

      anim.play();
    }
  };

  const onSpeechReady = () => audioInstance.start();

  const onSpeechEnded = (audioUrls) => {
    cleanAudio();

    if (hasMoreAudio(audioUrls)) moveToNextAudio();
    else finishSpeech();
  };

  const hasMoreAudio = (audioUrls) => {
    const audioLength = audioUrls.length;

    return audioLength > currentData.currentAudioIndex + 1;
  };

  const hasMoreReflections = () => {
    const reflectionsLength = currentData.reflections.length;

    return reflectionsLength > currentData.currentReflectionIndex + 1;
  };

  const moveToNextAudio = () => {
    stopAnimation();
    audioInstance.pause();

    dispatchUpdate({
      currentData: {
        ...currentData,
        currentAudioIndex: currentData.currentAudioIndex + 1,
      },
      currentBlockIndex: currentIndex,
    });
  };

  const finishSpeech = () => {
    stopAnimation();

    setTimeout(() => {
      if (settings.animation && currentData.animationData.end)
        updateAnimation();
      else speechEndUpdate();
    }, animationTimeout);
  };

  const speechEndUpdate = () => {
    switch (currentData.type) {
      case speechType:
      case readQuestionBlockType:
        changeBlock();
        break;

      case reflectionFormulaType:
      case reflectionType:
        if (hasMoreReflections())
          dispatchUpdate({
            currentData: {
              ...currentData,
              currentAnimation: currentData.initialAnimation,
              currentAudioIndex: 0,
              currentReflectionIndex: currentData.currentReflectionIndex + 1,
            },
            currentBlockIndex: currentIndex,
          });
        else changeBlock();
        break;

      default:
        break;
    }
  };

  const stopSpeech = () => {
    audioInstance.clean();
    audioInstance.stop();
  };

  const stopAnimation = () => {
    if (settings.animation) {
      const { anim } = animationCurrent;
      anim.stop();
    }
  };

  const decideIfPlaySpeechAnimation = () =>
    !(
      currentData &&
      (currentData.type === speechType ||
        currentData.type === reflectionType ||
        currentData.type === readQuestionBlockType ||
        currentData.type === reflectionFormulaType) &&
      (audioInstance.paused || audioInstance.stopped) &&
      currentData.currentAnimation !== 'start' &&
      currentData.currentAnimation !== 'end'
    );

  return {
    changeSpeech,
    getInitialSpeechAnimation: getSpeechData,
    cleanAudio,
    handleAudioBlock,
    decideIfPlaySpeechAnimation,
    stopSpeech,
    fetchAudioAnimations,
    loadedSpeechAnimations,
  };
};

export default useAudioHelper;
